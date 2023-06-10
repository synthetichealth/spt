import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';


import { TextField } from '@mui/material';

import { CONFIG_OPTIONS } from './ConfigFileBuilder';


const COMMAND_LINE_ARGS = {
  population: { display: "Population", type: "number", flag: "-p" },
  seed: { display: "Seed", type: "number", flag: "-s" },
  state: { display: "State", type: "text", flag: null },
  city: { display: "City", type: "text", flag: null }

         // [-cs clinicianSeed]
         // [-r referenceDate as YYYYMMDD]
         // [-g gender]
         // [-a minAge-maxAge]
         // [-o overflowPopulation]
         // [-c localConfigFilePath]
         // [-d localModulesDirPath]
         // [-i initialPopulationSnapshotPath]
         // [-u updatedPopulationSnapshotPath]
         // [-t updateTimePeriodInDays]
         // [-f fixedRecordPath]
         // [-k keepMatchingPatientsPath]
};

export const renderArgs = (argsState, configState = undefined) => {
  let argString = 'java -jar synthea-with-dependencies.jar';

  for (const [key, argDef] of Object.entries(COMMAND_LINE_ARGS)) {
    const value = argsState[key];
    if (value) {
      const argDef = COMMAND_LINE_ARGS[key];
      if (argDef.flag) {
        argString = argString + ' ' + argDef.flag + ' ' + value.trim();
      } else {
        argString = argString + ' ' + value.trim();
      }
    }
  }

  if (configState) {
    for (const configOpt of CONFIG_OPTIONS) {
      const key = configOpt.key;
      const value = configState[key];
      if (!value) {
        continue;
      }

      argString = argString + ' --' + key + '=' + value.trim();

    }
  }

  return argString;
}

const ArgBuilder = (props) => {
  const classes = useStyles();

  const { args, setArgs } = props;
  const handleChange = (evt) => {
    let value = evt.target.value;
    // force all falsy values to undefined, so the setArgs below deletes this key
    if (!value) {
      value = undefined;
    }
    setArgs({
      ...args,
      [evt.target.name]: value
    });
  }

  const shouldBeDisabled = (key, args) => {
    if (key != "city") return false;
    if (args.state) return false;
    return true;
  }

  const fields = [];

  for (const [key, arg] of Object.entries(COMMAND_LINE_ARGS)) {
    fields.push((<TextField 
                    key={key} 
                    id={key} 
                    name={key} 
                    disabled={shouldBeDisabled(key, args)} 
                    type={arg.type} 
                    label={arg.display} 
                    variant="outlined"
                    onChange={handleChange} 
                    />));
  }

  return (<div className={classes.collection}>
     <h3>Command-line Argument Builder</h3> <br />
     { fields }
     <br />
     <pre>{ renderArgs(args) }</pre>
   </div>);
}

export default memo(ArgBuilder);