import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

function AlertDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const { title, content, callback } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCallback = () => {
    setOpen(false);
    callback();
  };

  return (
    <>
      <DeleteIcon
        fontSize={'small'}
        color="error"
        classes={{ root: classes.icon }}
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCallback} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AlertDialog.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};
export default AlertDialog;
