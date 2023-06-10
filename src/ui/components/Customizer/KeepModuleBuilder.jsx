import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';

import { Paper, TextField, Autocomplete, Button, Switch, Select, MenuItem } from '@mui/material';

const KeepModuleBuilder = () => {
  const classes = useStyles();

  const [any, setAny] = useState(false); // true = ANY, false = ALL
  const [keeps, setKeeps] = useState([]);

  const [type, setType] = useState('condition');
  const [value, setValue] = useState();

  const handleChange = () => {};
  const addCurrent = () => {
    const newKeep = { type, value, string: `${type}: ${value}` };
    setKeeps([
      ...keeps,
      newKeep
    ]);
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
            onChange={e => setValue(e.target.value)} 
            />
    <Button variant="text" onClick={addCurrent}>+</Button>
    <ul>
    <li> Keep patients matching <b>{ any ? "Any" : "All" }</b> of the following criteria: </li>
    { keeps.map((k, i) => (<li key={i}>{k.string}</li>)) } 
    </ul>
    </div>);
}

export default memo(KeepModuleBuilder);