import React, { Fragment } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';

import InfoIcon from '@mui/icons-material/Info';

import FILTER_PRESETS from './FilterPresets';
import usePatientViewerSettings from './usePatientViewerSettings';

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
  // { key: "Hide Resolved Conditions", defaultValue: false, type: "boolean",
  //   description: "If true, conditions with an abatement date will be hidden" },
  // { key: "Hide Stopped Medications", defaultValue: false, type: "boolean",
  //   description: "If true, medications with a status of 'stopped' will be hidden" },
  ...Object.entries(FILTER_PRESETS).map(([key, value]) => ({
    key,
    description: value.description,
    type: 'boolean',
  })),
];

const Settings = () => {
  const [open, setOpen] = React.useState(false);
  const { settings, setFilterPreset } = usePatientViewerSettings();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeBoolean = (evt) => {
    setFilterPreset(evt.target.name, evt.target.checked);
  };

  const fields = [];
  for (const configOpt of CONFIG_OPTIONS) {
    const key = configOpt.key;

    if (configOpt.type == 'separator') {
      fields.push(<hr />);
    } else if (configOpt.type == 'header') {
      fields.push(<Typography component="h4"> {configOpt.key}</Typography>);
    } else if (configOpt.type == 'boolean') {
      fields.push(
        <Fragment key={key}>
          {key}
          <Checkbox
            id={key}
            name={key}
            label={key}
            checked={settings.filterPresets[key] ?? configOpt.defaultValue}
            onChange={handleChangeBoolean}
          />
          <Tooltip title={configOpt.description} disableInteractive>
            <span>
              <Button disabled>
                <InfoIcon fontSize="small" />
              </Button>
            </span>
          </Tooltip>
          <br />
        </Fragment>,
      );
    } else {
      fields.push(
        <Fragment key={key}>
          <TextField
            id={key}
            name={key}
            type={configOpt.type}
            label={key}
            defaultValue={configOpt.defaultValue}
            variant="outlined"
          />
          <Tooltip title={configOpt.description} disableInteractive>
            <span>
              <Button disabled>
                <InfoIcon fontSize="small" />
              </Button>
            </span>
          </Tooltip>
          <br />
        </Fragment>,
      );
    }
  }

  return (
    <div>
      <Button style={{ position: 'relative', float: 'right' }} onClick={handleOpen}>
        <SettingsIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" component="pre">
            {fields}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Settings;
