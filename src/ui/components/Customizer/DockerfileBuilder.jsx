import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';

import { saveFile } from './utils';

import { Paper, TextField, Autocomplete, Button, Switch, Select, MenuItem } from '@mui/material';

import ArgBuilder, { renderArgs } from './ArgBuilder';

import { buildConfigFile } from './ConfigFileBuilder';

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
    dockerfile = dockerfile.replace("%%CONFIG_FILE%%", buildFileInDockerRun(configFileString, "custom.properties"));

    myArgs['configFile'] = 'custom.properties';
  }

  dockerfile = dockerfile.replace("%%ARGS%%", renderArgs('java -jar synthea-with-dependencies.jar', myArgs, configAsArgs ? config : undefined));

  return (
    <div className={classes.collection}>
      <h3>Dockerfile</h3>
      <br />

      <Paper elevation={3} >
        <pre>
          {dockerfile}
        </pre>
      </Paper>
      <br/>

      <Button variant="contained" onClick={() => saveFile(dockerfile, 'Dockerfile')} style={{textTransform: "none"}}>Download Dockerfile</Button>

      <br/>
      <hr />

      <h3>Run Synthea on Docker:</h3>

      <p>Open powershell or terminal to where you downloaded the above Dockerfile and run the following commands to execute Synthea:</p>

      <pre>
        docker build --tag syntheadocker - &lt; Dockerfile <br/>
        mkdir docker_output <br/>
        docker run -v ./docker_output:/output -it syntheadocker <br/>
      </pre>
    </div>
  );
}



export default memo(DockerfileBuilder);
