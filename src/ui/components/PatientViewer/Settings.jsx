import React, { useState, useEffect, Fragment } from 'react';

import useLocalStorage from "use-local-storage";

import SettingsIcon from '@mui/icons-material/Settings';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
 

import InfoIcon from '@mui/icons-material/Info';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CONFIG_OPTIONS = [
  // { key: "filters", defaultValue: "{}", 
  //   description: "TBD" },
  { key: "Hide Resolved Conditions", defaultValue: false, type: "boolean",
    description: "If true, conditions with an abatement date will be hidden" },  
  { key: "Hide Stopped Medications", defaultValue: false, type: "boolean",
    description: "If true, medications with a status of 'stopped' will be hidden" },
];

const Settings = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const hooks = {};
  for (const configOpt of CONFIG_OPTIONS) {
    const [configValue, setConfigValue] = useLocalStorage(configOpt.key, configOpt.defaultValue);

    hooks[configOpt.key] = { value: configValue, set: setConfigValue }
  }

  const handleChangeText = (evt) => {
    hooks[evt.target.name].set(evt.target.value)
  }

  const handleChangeBoolean = (evt) => {
    hooks[evt.target.name].set(evt.target.checked)
  }

  const fields = [];
  for (const configOpt of CONFIG_OPTIONS) {
    const key = configOpt.key;

    if (configOpt.type == 'boolean') {
      fields.push((<Fragment key={key}>
                    {key}
                      <Checkbox 
                        id={key} 
                        name={key} 
                        label={key}
                        defaultChecked={hooks[key].value ?? configOpt.defaultValue}
                        onChange={handleChangeBoolean} />
                      <Tooltip title={configOpt.description} disableInteractive>
                        <span>
                          <Button disabled><InfoIcon fontSize="small" /></Button>
                        </span>
                      </Tooltip>
                      <br />
                    </Fragment>));
    } else {
      fields.push((<Fragment key={key} >
                     <TextField
                        id={key}
                        name={key}
                        type={configOpt.type}
                        label={key}
                        defaultValue={hooks[key].value ?? configOpt.defaultValue}
                        variant="outlined"
                        onChange={handleChangeText}
                        />
                      <Tooltip title={configOpt.description} disableInteractive>
                        <span>
                          <Button disabled><InfoIcon fontSize="small" /></Button>
                        </span>
                      </Tooltip>
                      <br />
                    </Fragment>));

    }
  }

  return (
    <div>
      <Button style={{ position: 'relative', float: 'right' }} onClick={handleOpen}><SettingsIcon /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" component="pre">
            { fields }
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Settings;