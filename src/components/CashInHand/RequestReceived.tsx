import { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../common/reusable/Modal';
import requestReceived from '../../../public/images/request_received.png';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';

const useStyles = makeStyles({
  modal: {
    width: '100%',
    height: '100%',
    maxWidth: 500,
    minWidth: 300,
    minHeight: 250,
    maxHeight: 450,
  },
  successContainer: {
    paddingTop: '80px',
    display: 'flex',
    flexDirection: 'column',
    placeItems: 'center',
    height: '100%',
  },
  requestReceived: {
    position: 'relative',
  },
  checkIcon: {
    position: 'absolute',
    left: '29%',
    top: '28%',
    fontSize: 60,
    color: '#FFFFFF',
  },
});

const RequestRecieved = ({ open = false, onClose = () => {}, onSubmit = () => {} }) => {
  const styles = useStyles();
  const [showError, setShowError] = useState(false);
  const [step, setStep] = useState(0);
  const [type, setType] = useState('');

  const handleClose = () => {
    onSubmit();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      classes={{ paper: styles.modal }}
      title=""
      actions={
        <Button onClick={handleClose} variant="contained" color="primary" fullWidth>
          Done
        </Button>
      }
    >
      <div className={styles.successContainer}>
        <div className={styles.requestReceived}>
          <img src={requestReceived} alt="request received" />
          <DoneRoundedIcon className={styles.checkIcon} />
        </div>
        <Typography color="textPrimary" variant="h5" margin="dense">
          Request Received
        </Typography>
        <Typography color="textPrimary" variant="subtitle1" margin="dense" fontWeight="normal">
          It will take us 48 hours to complete your request
        </Typography>
      </div>
    </Modal>
  );
};

RequestRecieved.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default RequestRecieved;
