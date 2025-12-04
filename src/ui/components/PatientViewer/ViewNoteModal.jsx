import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

const ViewNoteModal = ({ text }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>View Note</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            style={{
              textAlign: 'left',
              whiteSpace: 'pre-wrap', // preserve whitespace and line breaks, but allow wrapping
              overflowWrap: 'break-word', // break long words when necessary
              wordBreak: 'break-word', // fall-back to break words if needed
              hyphens: 'auto',
            }}
          >
            {text.trim()}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewNoteModal;
