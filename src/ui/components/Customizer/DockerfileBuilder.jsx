import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';

import { saveFile } from './utils';

import { Paper, TextField, Autocomplete, Button, Switch, Select, MenuItem } from '@mui/material';

import ArgBuilder, { renderArgs } from './ArgBuilder';

import { buildConfigFile } from './ConfigFileBuilder';

import { BashCodeBlock } from './BashCodeBlock';

// https://github.com/squirrellyjs/squirrelly if we need something more robust
const DOCKERFILE_TEMPLATE = `
FROM eclipse-temurin:20-jdk

# --insecure is for mitre only
# -L means follow redirects
RUN curl --insecure -L -O https://github.com/synthetichealth/synthea/releases/download/master-branch-latest/synthea-with-dependencies.jar
%%CONFIG_FILE%% %%KEEP_MODULE%%
CMD %%ARGS%%
`

const buildFileInDockerRun = (fileContent, targetFileName) => {
  if (!fileContent) return "";

  const fileLines = fileContent.replaceAll('"', '\\"').split('\n');

  const runCmdLines = fileLines.map((line, i) => {
    if (i == 0) {
      return `\nRUN echo ${line} \\`;
    } else {
      return `${line} \\`
    }
  });

  runCmdLines.push(` > ${targetFileName}\n`);
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
        <BashCodeBlock code={dockerfile} singleLine={true}/>
        {/* use Bash since no Docker highlighting supported */}
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
    </div>
  );
}



export default memo(DockerfileBuilder);
