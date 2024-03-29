import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';

import { saveFile } from './utils';

import { Paper, TextField, Autocomplete, Button, Switch, Select, MenuItem,
         Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import ArgBuilder, { renderArgs } from './ArgBuilder';

import { buildConfigFile } from './ConfigFileBuilder';

import { BashCodeBlock } from './BashCodeBlock';

// https://github.com/squirrellyjs/squirrelly if we need something more robust
const DOCKERFILE_TEMPLATE = `
FROM eclipse-temurin:20-jdk

# add --insecure for a quick fix if your network requires certificates
# -L means follow redirects
RUN curl -L -O https://github.com/synthetichealth/synthea/releases/download/master-branch-latest/synthea-with-dependencies.jar
%%CONFIG_FILE%% %%KEEP_MODULE%%
CMD %%ARGS%%
`

const buildFileInDockerRun = (fileContent, targetFileName) => {
  if (!fileContent) return "";

  const fileLines = fileContent.replaceAll("'", "'\"'\"'") // yes this is real. https://stackoverflow.com/a/1250279
                               .split('\n');

  const runCmdLines = fileLines.map((line, i) => {
    if (i == 0) {
      // if line is `abc` --> `RUN printf 'abc \n\`
      return `\nRUN printf '${line}\\n\\`;
    } else {
      return `${line} \\n\\`
    }
  });

  runCmdLines.push(` ' > ${targetFileName}\n`);
  return runCmdLines.join('\n');
}

const DockerfileBuilder = (props) => {
  const classes = useStyles();

  const { args, config, configAsArgs, keepModuleString } = props;

  const myArgs = JSON.parse(JSON.stringify(args)); // deep copy

  let dockerfile = DOCKERFILE_TEMPLATE;

  if (keepModuleString) {
    dockerfile = dockerfile.replace("%%KEEP_MODULE%%", buildFileInDockerRun(keepModuleString, "keep.json"));

    myArgs['keepModule'] = 'keep.json';
  } else {
     dockerfile = dockerfile.replace("%%KEEP_MODULE%%", "");
  }

  if (configAsArgs || Object.keys(config).length === 0) {
    dockerfile = dockerfile.replace("%%CONFIG_FILE%%", "");
  } else {
    const configFileString = buildConfigFile(config);
    if (configFileString) {
      dockerfile = dockerfile.replace("%%CONFIG_FILE%%", buildFileInDockerRun(configFileString, "custom.properties"));
      myArgs['configFile'] = 'custom.properties';
    } else {
      dockerfile = dockerfile.replace("%%CONFIG_FILE%%", "");
    }
  }

  dockerfile = dockerfile.replace("%%ARGS%%", renderArgs('java -jar synthea-with-dependencies.jar', myArgs, configAsArgs ? config : undefined));

  return (
    <div className={classes.collection}>
      <h3>Dockerfile</h3>
      <br />

      <Paper elevation={2} >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            View Dockerfile
          </AccordionSummary>
          <AccordionDetails>
            <BashCodeBlock code={dockerfile} singleLine={true}/>
            {/* use Bash since no Docker highlighting supported */}
          </AccordionDetails>
        </Accordion>
      </Paper>
      <br/>

      <Button variant="contained" onClick={() => saveFile(dockerfile, 'Dockerfile')} style={{textTransform: "none"}}>Download Dockerfile</Button>

      <br/>
      <hr />

      <h3>Run Synthea on Docker:</h3>

      <p>Open powershell or terminal, navigate to where you downloaded the above Dockerfile, and run the following commands:</p>

      <p>1. Create your customized Synthea Docker container, we'll call it <code>syntheadocker</code>:</p>
      <BashCodeBlock code="docker build --tag syntheadocker - < Dockerfile" />
      <br />

      <p>2. Create an output folder for synthetic data called <code>docker_output</code>:</p>
      <BashCodeBlock code="mkdir docker_output" singleLine={true} />
      <br />

      <p>3. Run the container pointing to your output folder:</p>
      <BashCodeBlock code="docker run -v ./docker_output:/output -it syntheadocker" />
      <br />
      you should see output similar to the following:
    <pre>
    Scanned 60 modules and 36 submodules.<br/>
    Loading submodule modules/breast_cancer/tnm_diagnosis.json<br/>
    Loading submodule modules/allergies/allergy_incidence.json<br/>
    Loading submodule modules/dermatitis/moderate_cd_obs.json<br/>
    ...<br/>
    Loading module modules/opioid_addiction.json<br/>
    Loading module modules/dialysis.json<br/>
    ...<br/>
    Loading module modules/hypertension.json<br/>
    Running with options:<br/>
    Population: 1<br/>
    Seed: 1570658792125<br/>
    Provider Seed:1570658792125<br/>
    Location: Massachusetts<br/>
    Min Age: 0<br/>
    Max Age: 140<br/>
    1 -- Arthur650 Carroll471 (39 y/o M) Southwick, Massachusetts <br/>
    {"{alive=1, dead=0}"}
    </pre>
    <br/>
    Once the process completes, your <code>docker_output</code> folder will contain a subfolder for each output format selected. 

    You can review these files in your text editor of choice, 
    or use the <a href="#/record_viewer" target="_blank">Patient Viewer</a> 
    to quickly view the contents of a FHIR JSON file.
    </div>
  );
}



export default memo(DockerfileBuilder);
