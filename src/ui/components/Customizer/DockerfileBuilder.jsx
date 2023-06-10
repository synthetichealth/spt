import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';


import { Paper, TextField, Autocomplete, Button, Switch, Select, MenuItem } from '@mui/material';

import ArgBuilder, { renderArgs } from './ArgBuilder';

// https://github.com/squirrellyjs/squirrelly if we need something more robust
const DOCKERFILE_TEMPLATE = `
FROM eclipse-temurin:20-jdk

# --insecure is for mitre only
# -L means follow redirects
RUN curl --insecure -L -O https://github.com/synthetichealth/synthea/releases/download/master-branch-latest/synthea-with-dependencies.jar



CMD %%ARGS%%
`

const DockerfileBuilder = (props) => {
  const classes = useStyles();

  const { args, config, configAsArgs } = props;

  const dockerfile = DOCKERFILE_TEMPLATE.replace("%%ARGS%%", renderArgs(args, configAsArgs ? config : undefined));

  return (<div className={classes.collection}> 
    <h3>Dockerfile</h3> <br />

    <Paper elevation={3} >
      <pre>
        {dockerfile}
      </pre>
    </Paper>
    <br/>
    <Button variant="text" onClick={() => saveFile(dockerfile, 'Dockerfile')}>Download</Button>
    <br/>
    ---
    <br />
    Create and run with 
    <pre>
    docker build --tag syntheadocker - &lt; Dockerfile <br/>
    mkdir docker_output <br/>
    docker run -v ./docker_output:/output -it syntheadocker <br/>
    </pre>
   </div>);
}

const saveFile = async (content, filename) => {
  // from: https://stackoverflow.com/a/66079045
  const a = document.createElement('a');
  a.download = filename;
  const blob = new Blob([content], { type: 'text/plain' });
  a.href = URL.createObjectURL(blob);
  a.addEventListener('click', (e) => {
    setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
  });
  a.click();
};

export default memo(DockerfileBuilder);