import { useState } from 'react'
import type { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { userValidator } from '../../../utils/validations'
import InternalUserDialog from './InternalUser'
import ExternalUserDialog from './ExternalUser'
import './addUser.css'

const AddUserDialog = ({ open = false, onClose = () => {}, onSubmit = () => {} }) => {
  const [showError, setShowError] = useState(false);
  const [step, setStep] = useState(0);
  const [type, setType] = useState('');
  const { validator, errorMessage } = userValidator;

  const handleBack = () => {
    setStep(0);
  }

  const handleError = () => {
    return showError && !validator.type(type);
  }

  const handleErrorMessage = () => {
    return showError && !validator.type(type) ? errorMessage.type : '';
  }

  const handleType = () => {
    if (validator.type(type)) {
      setShowError(false)
      setStep(1)
    } else {
      setShowError(true)
    }
  }

  return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: step === 1 ? 'add_user user_detail' : 'add_user user_type' }}
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        {step === 1 ? type === 'Internal'
          ? <InternalUserDialog onBack={handleBack} onClose={onClose} onSubmit={onSubmit} />
          : <ExternalUserDialog onBack={handleBack} onClose={onClose} onSubmit={onSubmit} />
        : <>
          <DialogContent className="user_type_select">
          <DialogContentText>Select user type</DialogContentText>
            <TextField
              margin="dense"
              label="User Type"
              name="type"
              type="text"
              fullWidth
              select
              value={type}
              onChange={(e: ChangeEvent<any>) => setType(e.target.value)}
              error={handleError()}
              helperText={handleErrorMessage()}
              required
            >
              <MenuItem value="Internal">Internal</MenuItem>
              <MenuItem value="External">External</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleType}
              color="primary"
              variant="contained"
            >
              Next
            </Button>
          </DialogActions>
        </>}
      </Dialog>
  )
}

AddUserDialog.propTypes = {
  open: PropTypes.bool.isRequired
}

export default AddUserDialog
