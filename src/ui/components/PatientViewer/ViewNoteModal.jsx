import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const noteTextStyle = {
  fontFamily: 'inherit',
  m: 0,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

const ViewNoteModal = ({ text, buttonLabel = 'View full note', title = 'Note' }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button size="small" onClick={handleOpen} sx={{ mt: 1, textTransform: 'none' }}>
        {buttonLabel}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <Box component="pre" sx={noteTextStyle}>
            {text}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ViewNoteModal.propTypes = {
  buttonLabel: PropTypes.string,
  text: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ViewNoteModal;
