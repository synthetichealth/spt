import React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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

const ViewFhirModal = ({ resource }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const sourceResource = resource?.__sourceResource || resource;

  return (
    <div style={{ textAlign: 'center' }}>
      <Link component="button" onClick={handleOpen}>
        [i]
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflow: 'scroll' }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            component="pre"
            style={{ fontFamily: 'monospace', fontSize: 12 }}
          >
            {JSON.stringify(sourceResource, null, 2)}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewFhirModal;
