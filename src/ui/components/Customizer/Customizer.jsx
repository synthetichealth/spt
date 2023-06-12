import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';


import { Paper, TextField, Autocomplete, Button, Switch, Select, MenuItem } from '@mui/material';

import ArgBuilder from './ArgBuilder';
import KeepModuleBuilder from './KeepModuleBuilder';
import ConfigFileBuilder from './ConfigFileBuilder';
import DockerfileBuilder from './DockerfileBuilder';


const Customizer = props => {
  const classes = useStyles();
  const [args, setArgs] = useState({});
  const [config, setConfig] = useState({});
  const [configAsArgs, setConfigAsArgs] = useState(false);

  const [keepModuleString, setKeepModuleString] = useState();

  return (<div className={classes.customizerContainer}>
    <Paper elevation={3} className={classes.dashboardCard}>
      <h1>Synthea Customizer</h1>
      <ArgBuilder args={args} setArgs={setArgs} />
      <ConfigFileBuilder config={config} setConfig={setConfig} configAsArgs={configAsArgs} setConfigAsArgs={setConfigAsArgs} />
      <KeepModuleBuilder setKeepModuleString={setKeepModuleString} />
      <DockerfileBuilder args={args} config={config} configAsArgs={configAsArgs} keepModuleString={keepModuleString}  />
    </Paper>
  </div>);
}

// questions:
// 1. wizard vs advanced "show me every option"
// 2. specific data requirements?

const GuidedMode = props => {

  return null;
}


export default memo(Customizer);
