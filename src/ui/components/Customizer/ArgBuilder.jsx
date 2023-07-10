import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';

import { STATES } from './constants';

import { Autocomplete, TextField, Stack } from '@mui/material';

import { CONFIG_OPTIONS } from './ConfigFileBuilder';

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

export const renderArgs = (argsState, configState = undefined) => {
  let argString = 'java -jar synthea-with-dependencies.jar';

  for (const [key, argDef] of Object.entries(COMMAND_LINE_ARGS)) {
    let value = argsState[key];
    if (Array.isArray(value) && argDef['rangeToString']) {
      value = argDef['rangeToString'](value);
    }
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

  const fields = [];

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

    if (onlyGroup) {
      if (groupName != onlyGroup) continue;
    } else {
      fields.push(<h5 style={{margin: "2rem 0 0.5rem 0"}}>{groupName} Settings</h5>);
    }

    for (const [key, arg] of Object.entries(group)) {

      if (arg.type == 'select') {
        fields.push((<Autocomplete
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
            fields.push((<TextField
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
            fields.push((<TextField
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
            fields.push((<TextField
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
      { fields }
      <br />
      { !onlyRenderFields && <pre>{renderArgs(args)}</pre> }
    </div>
  );
}

export default memo(ArgBuilder);
