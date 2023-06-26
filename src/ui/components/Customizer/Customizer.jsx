import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';


import { Paper, TextField, Autocomplete, Button, ButtonGroup, ToggleButtonGroup, ToggleButton, Switch, Select, MenuItem } from '@mui/material';

import ArgBuilder from './ArgBuilder';
import KeepModuleBuilder from './KeepModuleBuilder';
import ConfigFileBuilder from './ConfigFileBuilder';
import DockerfileBuilder from './DockerfileBuilder';


const Customizer = props => {
  const classes = useStyles();

  const [guidedMode, setGuidedMode] = useState(null);

  return (
    <div className={classes.customizerContainer}>
    <Paper elevation={3} className={classes.dashboardCard}>
      <h1>Synthea Customizer</h1>
      { guidedMode == null && (<ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={() => setGuidedMode(true)} style={{ display: "block", textTransform: "none", maxWidth: '300px'}}>
          <b>Use Guided Mode</b><br /><br />
          Guided Mode will step you through the most common Synthea configuration options and allow you to choose the ones that are relevant to you.<br/>
          This mode is recommended for first-time users or people who are not already familiar with all of the Synthea options.
        </Button>
        <Button onClick={() => setGuidedMode(false)} style={{ display: "block", textTransform: "none", maxWidth: '300px'}}>
        <b>Use Advanced Mode</b><br /><br />
        Advanced Mode shows all customization options on one page. Recommended for users who know exactly what customizations they want.
        </Button>
      </ButtonGroup>) }
      { guidedMode == true && <GuidedMode /> }
      { guidedMode == false && <AdvancedMode /> }
    </Paper>
  </div>);
}

const AdvancedMode = props => {
  const classes = useStyles();
  const [args, setArgs] = useState({});
  const [config, setConfig] = useState({});
  const [configAsArgs, setConfigAsArgs] = useState(false);

  const [keepModuleString, setKeepModuleString] = useState();

  return (
    <React.Fragment>
      <ArgBuilder args={args} setArgs={setArgs} />
      <ConfigFileBuilder config={config} setConfig={setConfig} configAsArgs={configAsArgs} setConfigAsArgs={setConfigAsArgs} />
      <KeepModuleBuilder setKeepModuleString={setKeepModuleString} />
      <DockerfileBuilder args={args} config={config} configAsArgs={configAsArgs} keepModuleString={keepModuleString}  />
    </React.Fragment>);
} 

// questions:
// 1. wizard vs advanced "show me every option"
// 2. what format of data do you need? FHIR, CSV, CCDA
// 3. specific data requirements?
//  - yes I need a certain condition
//  - yes i need a specific geographic location
// last. do you want to use docker?
//    

const GuidedMode = props => {

  const classes = useStyles();
  const [args, setArgs] = useState({});

  const [keepModuleString, setKeepModuleString] = useState();

  const [exportFormats, setExportFormats] = useState([]);
  const [dataReqs, setDataReqs] = useState([]);
  const [mode, setMode] = useState();

  return (
    <React.Fragment>
      <ExportFormatsQuestion exportFormats={exportFormats} setExportFormats={setExportFormats} /> <br/> <br/>
      { exportFormats.length > 0 && <DataReqsQuestion dataReqs={dataReqs} setDataReqs={setDataReqs} /> }
      { dataReqs.length > 0 && <ArgBuilder args={args} setArgs={setArgs} onlyGroup="Basic" onlyRenderFields={true} /> }
      { dataReqs.includes("keep") && <KeepModuleBuilder setKeepModuleString={setKeepModuleString} showDownload={false} /> }
      { dataReqs.includes("geographic") && <ArgBuilder args={args} setArgs={setArgs} onlyGroup="Geographic" onlyRenderFields={true} /> }
      { dataReqs.includes("demographic") && <ArgBuilder args={args} setArgs={setArgs} onlyGroup="Demographic" onlyRenderFields={true} /> }
      { dataReqs.includes("reproducibility") && <ArgBuilder args={args} setArgs={setArgs} onlyGroup="Reproducibility" onlyRenderFields={true} /> }
      { dataReqs.length > 0 && <GuidedModeHowToRun mode={mode} setMode={setMode} /> }
      { mode && <Instructions mode={mode} args={args} keepModuleString={keepModuleString} exportFormats={exportFormats} dataReqs={dataReqs} /> }
    </React.Fragment>
    );
}

const ExportFormatsQuestion = props => {
  const { exportFormats, setExportFormats } = props;

  const [showLessCommonOptions, setShowLessCommonOptions] = useState(false);

  const formatsToShow = [
      { key: "fhir", display: "HL7® FHIR® R4" },
      { key: "bulk_fhir", display: "FHIR® Bulk Data" },
      { key: "ccda", display: "C-CDA" },
      { key: "csv", display: "CSV" },
      { key: "json", display: "JSON" },
    ];

  if (showLessCommonOptions) {
    formatsToShow.push(
      { key: "fhir_stu3", display: "HL7® FHIR® STU 3" },
      { key: "fhir_dstu2", display: "HL7® FHIR® DSTU 2" },
      { key: "text", display: "Text" },
      { key: "cpcds", display: "CPCDS" },
      { key: "bfd", display: "CMS BFD" },
      { key: "symptoms", display: "Symptoms" },
      { key: "cdw", display: "VA CDW" },
      );
  }

  return (
    <React.Fragment>
    Which data formats do you need?<br/>
    <ToggleButtonGroup
      size="large"
      color="primary"
      value={exportFormats}
      sx={{ flexWrap: "wrap"}} // allows wrapping onto 2 lines
      onChange={(evt, newFormats) => setExportFormats(newFormats)}
    >
     {formatsToShow.map(f => (<ToggleButton key={f.key} value={f.key} aria-label={f.display}>
                                {f.display}
                              </ToggleButton>)) }

    </ToggleButtonGroup>
    { !showLessCommonOptions && 
        <Button onClick={() => setShowLessCommonOptions(true)} style={{ textTransform: "none" }}>
          Show less common options
        </Button>
      }
       <br/> <br/>
    </React.Fragment>
    );
}

const DataReqsQuestion = props => {
  const { dataReqs, setDataReqs } = props;

  return (
    <React.Fragment>
    Which of the following data requirements apply to you?<br/>
    <ToggleButtonGroup
      size="large"
      color="primary"
      orientation="vertical"
      value={dataReqs}
      onChange={(evt, newReqs) => setDataReqs(newReqs)}
    >
      <ToggleButton value="keep">
        I need patients that meet certain clinical criteria. (Conditions, Observations, Procedures, etc)
      </ToggleButton>
      <ToggleButton value="geographic">
        I need a certain geographic location.
      </ToggleButton>
      <ToggleButton value="demographic">
        I need a population with specific demographics.
      </ToggleButton>
      <ToggleButton value="reproducibility">
        I need to re-create the same exact population multiple times.
      </ToggleButton>
      <ToggleButton value="none">
        None of these - I just need some records.
      </ToggleButton>

    </ToggleButtonGroup>
     <br/> <br/>
    </React.Fragment>
    );
}

const GuidedModeHowToRun = props => {
  const { mode, setMode } = props;

  return (
    <React.Fragment>
    How do you want to run Synthea?<br/>
    <ToggleButtonGroup
      size="large"
      color="primary"
      exclusive
      value={mode}
      onChange={(evt, newMode) => setMode(newMode)}
    >
      <ToggleButton value="docker" style={{ display: "block", textTransform: "none", maxWidth: '350px'}}>
        <b>Docker</b><br/>
        The Docker setup packages everything together and is a good choice for users whose desired changes are fully reflected above. The Docker setup of Synthea is generally easy to get running locally, but customization beyond the basics is difficult.<br/><br/>
        Requires Docker to be installed.
      </ToggleButton>
      <ToggleButton value="basic" style={{ display: "block", textTransform: "none", maxWidth: '350px'}}>
        <b>Basic Setup</b><br/>
        The Basic setup is recommended for users who want to get started quickly and do not anticipate making significant changes or customizations to Synthea.<br/><br/>
        Requires Java JDK 11 or higher to be installed.
      </ToggleButton>
      <ToggleButton value="developer" style={{ display: "block", textTransform: "none", maxWidth: '350px'}}>
        <b>Developer Setup</b><br/>
         The Developer setup is recommended for users who want the ability to fully modify and customize all aspects of Synthea.<br/><br/>
         Requires Git and Java JDK 11 or higher to be installed.
      </ToggleButton>

    </ToggleButtonGroup>
     <br/> <br/>
    mode is {mode}
    </React.Fragment>
    );
}

const Instructions = props => {
  const { mode, args, keepModuleString, exportFormats, dataReqs } = props;

  // TODO: build up config based on exprotFormats

  if (mode == 'docker') {
    return <DockerfileBuilder args={args} config={{}} configAsArgs={false} keepModuleString={keepModuleString} />
  } else if (mode == 'basic') {
    return "java -jar etc";
  } else {
    return "sorry about your gradle";
  }
}

export default memo(Customizer);
