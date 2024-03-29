import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';

import { STATES } from './constants';

import { Autocomplete, TextField, Stack } from '@mui/material';

import { CONFIG_OPTIONS } from './ConfigFileBuilder';

import { BashCodeBlock } from './BashCodeBlock'

const ageArrayToString = array => {
  if (!Array.isArray(array)) return undefined;

  if (!array[0] || !array[1]) return undefined;

  return array[0] + "-" + array[1];
}

const COMMAND_LINE_ARGS = {
  population: { display: "Population", type: "number", flag: "-p", group: "Basic" },
  state: { display: "State", type: "select", options: STATES, flag: null, group: "Geographic" },
  city: { display: "City", type: "text", flag: null, group: "Geographic" },
  gender: { display: "Gender", type: "select", options: ['M', 'F'], flag: "-g", group: "Demographic" },
  age: { display: "Age", type: "range", flag: "-a", group: "Demographic", rangeToString: ageArrayToString},

  seed: { display: "Seed", type: "number", flag: "-s", group: "Reproducibility" },
  clinicianSeed: { display: "Clinician Seed", type: "number", flag: "-cs", group: "Reproducibility" },
  referenceDate: { display: "Reference Date (YYYYMMDD)", type: "text", flag: "-r", group: "Reproducibility" },

   // [-o overflowPopulation] (boolean)

  keepModule: { flag: "-k", group: "Hidden" },
  configFile: { flag: "-c", group: "Hidden" },

   // [-d localModulesDirPath]
   // [-i initialPopulationSnapshotPath]
   // [-u updatedPopulationSnapshotPath]
   // [-t updateTimePeriodInDays]
   // [-k keepMatchingPatientsPath]
   // [-ps singlePatientSeed]
   // [-e endDate] // [-E futureEndDate]
   // -m flag oh no
};

const GROUP_DESCRIPTIONS = {
  'Basic': "Enter the desired number of records in your population. Defaults to 1 if not specified.",
  'Geographic': "Select the geographic region to generate patients for. Synthea can only run for one state or one city" +
  " at a time, defaulting to the state of Massachusetts",
  'Demographic': "By default Synthea will generate patients matching the demographic characteristics " + 
  " of the selected geographic region based on the US Census. These settings allow you to define alternate demographics.",
  'Reproducibility': (
    <Fragment>Synthea allows users to exactly recreate a dataset when the same input parameters 
      are provided to the same version of Synthea. 
      At minimum, a <code>seed</code>, <code>clinician seed</code>, and <code>reference date</code> must be provided.
      The <code>seed</code> and <code>clinician seed</code> are used to pick random numbers used in the simulation, so
      the seeds chosen do not translate directly into specific results; they just need to be kept the same between runs.
      Some examples for using this are to grow/age a population over time, or to change something else in the simulation 
      and see how that change impacts the results over time.
      <br/>
      See <a href="https://github.com/synthetichealth/synthea/wiki/Recreating-a-Dataset" target="_blank">
      https://github.com/synthetichealth/synthea/wiki/Recreating-a-Dataset</a> for more information.</Fragment>),
};

export const renderArgs = (command, argsState, configState = undefined, ) => {
  let argString = command;

  for (const [key, argDef] of Object.entries(COMMAND_LINE_ARGS)) {
    let value = argsState[key];
    if (Array.isArray(value) && argDef['rangeToString']) {
      value = argDef['rangeToString'](value);
    }
    if (value == null) {
      continue;
    }
    // value might be a boolean
    const trimmedValue = value.trim ? value.trim() : value;

    if (argDef.flag) {
      argString = argString + ' ' + argDef.flag + ' ' + trimmedValue;
    } else {
      argString = argString + ' ' + trimmedValue;
    } 
  }

  if (configState) {
    for (const configOpt of CONFIG_OPTIONS) {
      const key = configOpt.key;
      const value = configState[key];
      // don't bother listing it if it's just the default value
      if (value == null || value === configOpt.defaultValue) {
        continue;
      }

      const trimmedValue = value.trim ? value.trim() : value;
      argString = argString + ' --' + key + '=' + trimmedValue;
    }
  }

  return argString;
}

const ArgBuilder = (props) => {
  const classes = useStyles();

  const { args, setArgs, onlyRenderFields=false, onlyGroup=undefined } = props;
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

  const handleChangeSelect = (name, value) => {
    // force all falsy values to undefined, so the setArgs below deletes this key
    if (!value) {
      value = undefined;
    }
    setArgs({
      ...args,
      [name]: value
    });
  }

  const handleChangeRange = (name, index, value) => {
    const valueArray = name in args ? args[name] : [];
    valueArray[index] = value;

    setArgs({
      ...args,
      [name]: valueArray
    });
  }

  const shouldBeDisabled = (key, args) => {
    if (key != "city") return false;
    if (args.state) return false;
    return true;
  }

  const fields = {}; // String (groupName) => Array<InputField (argField)>

  // map args/fields into groups
  const argGroups = {};
  for (const [key, arg] of Object.entries(COMMAND_LINE_ARGS)) {
    const group = arg.group;
    if (!(group in argGroups)) {
      argGroups[group] = {};
    }
    argGroups[group][key] = arg;
  }

  for (const [groupName, group] of Object.entries(argGroups)) {
    if (groupName == 'Hidden') continue;

    if (onlyGroup && (groupName != onlyGroup)) continue;

    fields[groupName] = [];

    for (const [key, arg] of Object.entries(group)) {

      if (arg.type == 'select') {
        fields[groupName].push((<Autocomplete
            disablePortal
            sx={{ width: 200 }}
            key={key}
            name={key}
            display="inline"
            onChange={(evt, value) => handleChangeSelect(key, value)}
            options={arg.options}
            renderInput={(params) => <TextField {...params} label={arg.display} />}
          />));
      } else if (arg.type == 'range') {
            fields[groupName].push((<TextField
                      key={`${key} Min`}
                      id={`${key} Min`}
                      name={`${key} Min`}
                      disabled={shouldBeDisabled(key, args)}
                      type="number"
                      label={`${arg.display} Min`}
                      variant="outlined"
                      display="inline"
                      onChange={(evt) => handleChangeRange(key, 0, evt.target.value)}
                      />));
            fields[groupName].push((<TextField
                      key={`${key} Max`}
                      id={`${key} Max`}
                      name={`${key} Max`}
                      disabled={shouldBeDisabled(key, args)}
                      type="number"
                      label={`${arg.display} Max`}
                      variant="outlined"
                      display="inline"
                      onChange={(evt) => handleChangeRange(key, 1, evt.target.value)}
                      />));
      } else {
            fields[groupName].push((<TextField
                      key={key}
                      id={key}
                      name={key}
                      disabled={shouldBeDisabled(key, args)}
                      type={arg.type}
                      label={arg.display}
                      variant="outlined"
                      display="inline"
                      onChange={handleChange}
                      />));
      }
    }
  }

  return (
    <div className={classes.collection}>
      { !onlyRenderFields && <h3>Command-line Argument Builder</h3> }
      { Object.entries(fields).map(([groupName, argFieldArray]) => { return <div key={groupName}>
        <h5 style={{margin: "2rem 0 0.5rem 0"}}>{groupName} Settings</h5>
        {GROUP_DESCRIPTIONS[groupName]}
        <Stack direction="row" spacing={3}>
            {argFieldArray}
        </Stack>
      </div>}) }
      <br />
      { !onlyRenderFields && <BashCodeBlock code={renderArgs('java -jar synthea-with-dependencies.jar', args)} /> }
    </div>
  );
}

export default memo(ArgBuilder);
