import { useState } from 'react'
import type { ChangeEvent } from 'react';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { userValidator } from '../../../utils/validations'
import { useDispatch } from '../../../store'
import { createExternalUser } from '../../../store/actions/externalUserAction'
import toast from 'react-hot-toast';
import 'react-phone-input-2/lib/material.css'

const initialUser = {
  given_name: '',
  family_name: '',
  username: '',
  phone_number: '',
  email: '',
  send: 'I',
  qualification: '',
}

const ExternalUserDialog = ({ onBack = () => { }, onClose = () => { }, onSubmit = () => { } }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialUser);
  const [showError, setShowError] = useState(false);
  const { validator, errorMessage } = userValidator;

  const handleChange = (e: ChangeEvent<any>) => {
    const { name: field, value, checked } = e.target
    if (field === 'send') {
      setUser((prevState) => ({ ...prevState, send: checked ? 'A' : 'I' }))
      return;
    }
    setUser({ ...user, [field]: value })
  }

  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](user[field])
    } else {
      isValid = Object.keys(user).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }

  const handleError = (field: string) => {
    return showError && !validate(field);
  }

  const handleErrorMessage = (field: string) => {
    return showError && !validate(field) ? errorMessage[field] : '';
  }

  const handleAdd = () => {
    let userData: any;
    let phoneNumberU: any;
    if (validate()) {
      setShowError(false);
      const lengthPhoneNumber = user.phone_number.length;

      console.log("lengthPhoneNumber", lengthPhoneNumber)

      if (lengthPhoneNumber > 10) {
        const valueCk = user.phone_number.substring(0, 3);
        const valueCk1 = user.phone_number.substring(0, 1);

        if (valueCk === '+91') {
          phoneNumberU = user.phone_number;
          userData = { ...user, phone_number: phoneNumberU }
          console.log("")
        } else if (valueCk !== '+91' && valueCk1 === '0') {
          phoneNumberU = `+91${user.phone_number.substring(1)}`;
          userData = { ...user, phone_number: phoneNumberU }
        } else {
          userData = `+91${user}`;
        }
      } else {
        const phoneNumberEl = `+91${user.phone_number}`
        userData = { ...user, phone_number: phoneNumberEl }
      }
        
      dispatch(createExternalUser(userData)).then((data: any) => {
        if (data?.status) {
          toast.success(data?.message);
          onSubmit();
          onClose();
        } else {
          data?.message === `"phone_number" length must be 13 characters long` ? toast.error("Only 10 digits allowed for Phone Number") : toast.error(data?.message)
        }
      })
    } else {
      setShowError(true);
    }
  }

  return (
    <>
      <DialogContent>
        <DialogContentText>Enter the details of user</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          size="small"
          label="First Name"
          name="given_name"
          type="text"
          fullWidth
          value={user.given_name}
          onChange={handleChange}
          error={handleError('given_name')}
          helperText={handleErrorMessage('given_name')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Last Name"
          name="family_name"
          type="text"
          fullWidth
          value={user.family_name}
          onChange={handleChange}
          error={handleError('family_name')}
          helperText={handleErrorMessage('family_name')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Username"
          name="username"
          type="text"
          fullWidth
          value={user.username}
          onChange={handleChange}
          error={handleError('username')}
          helperText={handleErrorMessage('username')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Email Address"
          name="email"
          type="email"
          fullWidth
          value={user.email}
          onChange={handleChange}
          error={handleError('email')}
          helperText={handleErrorMessage('email')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          fullWidth
          type="text"
          label="Phone Number"
          name="phone_number"
          onChange={handleChange}
          value={user.phone_number}
          // error={!validate('phone_number')}
          error={handleError('phone_number')}
          helperText={handleErrorMessage('phone_number')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Qualification"
          name="qualification"
          type="text"
          fullWidth
          value={user.qualification}
          onChange={handleChange}
          error={handleError('qualification')}
          helperText={handleErrorMessage('qualification')}
          required
        />
        <Box sx={{ p: 3 }}>
          <Typography
            variant="subtitle2"
          >
            SEND Status
          </Typography>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            Special educational needs and disability
          </Typography>
          <Box sx={{ ml: -1 }}>
            <Switch
              checked={user.send === 'A'}
              onChange={handleChange}
              color="primary"
              name="send"
              required
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onBack} color="primary" variant="outlined">
          Back
        </Button>
        <Button onClick={handleAdd} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </>
  )
}

ExternalUserDialog.propTypes = {
  onSubmit: PropTypes.func,
}

export default ExternalUserDialog;