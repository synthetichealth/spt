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
  const [config, setConfig] = useState({});
  const [configAsArgs, setConfigAsArgs] = useState(false);

  const [keepModuleString, setKeepModuleString] = useState();

  const [exportFormats, setExportFormats] = useState([]);
  const [dataReqs, setDataReqs] = useState([]);

  return (
    <React.Fragment>
      <Question1 exportFormats={exportFormats} setExportFormats={setExportFormats} /> <br/> <br/>
      { exportFormats.length > 0 && <Question2 dataReqs={dataReqs} setDataReqs={setDataReqs} /> }
      { dataReqs.includes("keep") && <KeepModuleBuilder setKeepModuleString={setKeepModuleString} showDownload={false} /> }
      { dataReqs.includes("demographic") && <ArgBuilder args={args} setArgs={setArgs} onlyGroup="Demographic" shouldRenderArgs={false} /> }
      { dataReqs.includes("geographic") && <ArgBuilder args={args} setArgs={setArgs} onlyGroup="Geographic" shouldRenderArgs={false} /> }
      { dataReqs.length > 0 && "How to run it options" }
    </React.Fragment>
    );
}

const Question1 = props => {
  const { exportFormats, setExportFormats } = props;

  const [showLessCommonOptions, setShowLessCommonOptions] = useState(false);

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
      <ToggleButton value="fhir" aria-label="FHIR">
        HL7® FHIR® R4
      </ToggleButton>
      <ToggleButton value="fhir_stu3" aria-label="FHIR STU3">
        HL7® FHIR® STU 3
      </ToggleButton>
      <ToggleButton value="fhir_dstu2" aria-label="FHIR DSTU2">
        HL7® FHIR® DSTU 2
      </ToggleButton>
      <ToggleButton value="bulk_fhir" aria-label="FHIR Bulk Data">
        FHIR® Bulk Data
      </ToggleButton>
      <ToggleButton value="ccda" aria-label="CCDA">
        C-CDA
      </ToggleButton>
      <ToggleButton value="csv" aria-label="CSV">
        CSV
      </ToggleButton>

      { showLessCommonOptions && <React.Fragment>
        <ToggleButton value="text" aria-label="Text">
          Text
        </ToggleButton>
        <ToggleButton value="cpcds" aria-label="CPCDS">
          CPCDS
        </ToggleButton>
        <ToggleButton value="cpcds" aria-label="CPCDS">
          CMS BFD
        </ToggleButton>
        <ToggleButton value="cpcds" aria-label="CPCDS">
          Symptoms
        </ToggleButton>

        <ToggleButton value="cpcds" aria-label="CPCDS">
          VA CDW
        </ToggleButton>

      </React.Fragment>
      }
    </ToggleButtonGroup>
    { !showLessCommonOptions && 
        <Button onClick={() => setShowLessCommonOptions(true)} style={{ textTransform: "none" }}>
          Show less common options
        </Button>
      }

    </React.Fragment>
    );
}

const Question2 = props => {
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

    </React.Fragment>
    );
}

export default memo(Customizer);
