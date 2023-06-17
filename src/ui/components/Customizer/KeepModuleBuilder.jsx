import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';

import { saveFile } from './utils';


import { Paper, TextField, Autocomplete, Button, Switch, Select, MenuItem } from '@mui/material';

const KEEP_TEMPLATE = {
  "name": "Generated Keep Module",
  "states": {
    "Initial": {
      "type": "Initial",
      "name": "Initial",
      "conditional_transition": [
        {
          "transition": "Keep",
          "condition": {
            "condition_type": "And",
            "conditions": [
            ]
          }
        },
        {
          "transition": "Terminal"
        }
      ]
    },
    "Terminal": {
      "type": "Terminal",
      "name": "Terminal"
    },
    "Keep": {
      "type": "Terminal",
      "name": "Keep"
    }
  },
  "gmf_version": 2
}

const CONDITION_TEMPLATE = {
    "condition_type": "Active Condition",
    "codes": [
      {
        "system": "SNOMED-CT",
        "code": "1234",
        "display": "" // set display to empty string so it doesn't crash the UI
      }
    ]
  };

const getConditions = m => m['states']['Initial']['conditional_transition'][0]['condition']['conditions'];

const setConditionType = (m, type) => m['states']['Initial']['conditional_transition'][0]['condition']['condition_type'] = type;

const clone = obj => JSON.parse(JSON.stringify(obj)); // simple deep copy to make sure a template never changes

const buildKeepModule = (keeps, any) => {

  const keepModule = clone(KEEP_TEMPLATE); 

  setConditionType(keepModule, any ? "Or" : "And")

  const keepConditions = getConditions(keepModule);

  for (const keep of keeps) {
    // keep = { type, value }

    const newCondition = clone(CONDITION_TEMPLATE);


    newCondition['codes'][0]['code'] = keep.value;

    switch (keep.type) {
    case 'allergy':
      newCondition['condition_type'] = 'Active Allergy';
      newCondition['codes'][0]['system'] = 'SNOMED-CT';
      break;
    case 'condition':
      newCondition['condition_type'] = 'Active Condition';
      newCondition['codes'][0]['system'] = 'SNOMED-CT';
      break;
    case 'medication':
      newCondition['condition_type'] = 'Active Medication';
      newCondition['codes'][0]['system'] = 'RxNorm';
      break;
    case 'procedure':
      // technically we do not have "Procedure Performed"
      // but the way they are stored in the HealthRecodrd means
      // we can use Active Condition instead
      newCondition['condition_type'] = 'Active Condition';
      newCondition['codes'][0]['system'] = 'SNOMED-CT';
      break;

    }


    keepConditions.push(newCondition);
  }

  return JSON.stringify(keepModule, null, 2);
}

const KeepModuleBuilder = (props) => {
  const classes = useStyles();

  const [any, setAny] = useState(false); // true = ANY(Or), false = ALL(And)
  const [keeps, setKeeps] = useState([]);

  const [type, setType] = useState('condition');
  const [value, setValue] = useState('');

  const { setKeepModuleString, showDownload } = props;

  const handleChange = () => {};
  const addCurrent = () => {
    if (value) {
      let string;

      if (type == 'medication') {
        string = `Active Medication: RxNorm ${value}`
      } else {
        string = `Active ${type[0].toUpperCase()}${type.slice(1)}: SNOMED-CT ${value}`;
      }
      const newKeep = { type, value, string };

      const updatedKeeps = [
        ...keeps,
        newKeep
      ];
      setKeeps(updatedKeeps);
      setKeepModuleString(buildKeepModule(updatedKeeps, any));
      setValue('');
    }
  };

  // TODO: read from concepts? 

  // ALL OF vs ANY OF

  // Active Condition or Procedure
  // Active Allergy
  // Active Medication

  // Attributes and Observations would be nice, but those need 2 parameters (code/value)
  // whereas the above only need one (code)

  return (<div className={classes.collection}> <h3>Keep Module Builder</h3> 
    This is only for basic keep modules. For anything more complex than this, 
    please use the <a href="https://synthetichealth.github.io/module-builder">Module Builder</a>.<br/>

    ALL OF <Switch onChange={e => setAny(e.target.checked)} /> ANY OF <br />
    <Select
      label="Type"
      defaultValue="condition"
      onChange={e => setType(e.target.value)}
    >
      <MenuItem value="allergy">Active Allergy</MenuItem>
      <MenuItem value="condition">Active Condition</MenuItem>
      <MenuItem value="medication">Active Medication</MenuItem>
      <MenuItem value="procedure">Procedure Performed</MenuItem>
    </Select>
    <TextField 
            name="value"
            label="Code"
            variant="outlined"
            value={value}
            onChange={e => setValue(e.target.value)} 
            />
    <Button variant="text" onClick={addCurrent}>+</Button>
    <ul>
    <li> Keep patients matching <b>{ any ? "Any" : "All" }</b> of the following criteria: </li>
    { keeps.map((k, i) => <DisplayForKeep index={i} keep={k} />) } 
    </ul>
    { showDownload && <Button variant="text" onClick={() => saveFile(buildKeepModule(keeps, any), 'keep.json')}>Download</Button> }
    </div>);
}

const DisplayForKeep = props => {
  return (<li key={props.index}>{props.keep.string}</li>)
}

export default memo(KeepModuleBuilder);