import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react';
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import MenuItem from '@material-ui/core/MenuItem'
import DialogContentText from '@material-ui/core/DialogContentText'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { userValidator } from '../../../utils/validations'
import { useDispatch, useSelector } from '../../../store'
import { createInternalUser, getInternalUsersList } from '../../../store/actions/internalUserAction'
import InternalUserRoleAction from "../../../store/actions/InternalUserRolesAction";
import toast from 'react-hot-toast';
import 'react-phone-input-2/lib/material.css';

const initialUser = {
  given_name: '',
  family_name: '',
  email: '',
  phone_number: '',
  country: '',
  region: '',
  address_line_one: '',
  address_line_two: '',
  organization: '',
  empcode: '',
  department: '',
  designation: '',
  roleId: '',
}

const InternalUserDialog = ({ onBack = () => { }, onClose = () => { }, onSubmit = () => { } }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(initialUser);
  const [showError, setShowError] = useState(false);
  const { validator, errorMessage } = userValidator;

  useEffect(() => {
    dispatch(InternalUserRoleAction());
  }, [])

  const Role = useSelector(state => state?.internalUserRole?.internalUserRoleResponse?.data?.data)

  const handleChange = (e: ChangeEvent<any>) => {
    const { name: field, value } = e.target
    setUser({ ...user, [field]: value })
  }

  const validate = (field?: string) => {
    console.log("fieldfieldstrg", field)
    let isValid = true
    if (field) {
      console.log("validatorerrorMessage", validator, errorMessage, field)
      isValid = validator[field](user[field])
    } else {
      isValid = Object.keys(user).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }

  const handleError = (field: string) => {
    console.log("field", field)
    return showError && !validate(field);
  }

  const handleErrorMessage = (field: string) => {
    return showError && !validate(field) ? errorMessage[field] : '';
  }

  const handleAdd = () => {
    const valueCk = user.phone_number.substr(0, 3)
    if (validate()) {
      setShowError(false);
      const userData = { ...user, phone_number: valueCk === '+91' ? user.phone_number : `+91${user.phone_number}` }
      dispatch(createInternalUser(userData)).then((data: any) => {
        if (data?.status) {
          toast.success(data?.message);
          dispatch(getInternalUsersList(1, 10));
          onSubmit();
          onClose();
        } else {
          toast.error(data?.message);
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
          label="Country"
          name="country"
          type="text"
          fullWidth
          value={user.country}
          onChange={handleChange}
          error={handleError('country')}
          helperText={handleErrorMessage('country')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Region/State"
          name="region"
          type="text"
          fullWidth
          value={user.region}
          onChange={handleChange}
          error={handleError('region')}
          helperText={handleErrorMessage('region')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Address Line 1"
          name="address_line_one"
          type="text"
          fullWidth
          value={user.address_line_one}
          onChange={handleChange}
          error={handleError('address_line_one')}
          helperText={handleErrorMessage('address_line_one')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Address Line 2"
          name="address_line_two"
          type="text"
          fullWidth
          value={user.address_line_two}
          onChange={handleChange}
          error={handleError('address_line_two')}
          helperText={handleErrorMessage('address_line_two')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Organization"
          name="organization"
          type="text"
          fullWidth
          value={user.organization}
          onChange={handleChange}
          error={handleError('organization')}
          helperText={handleErrorMessage('organization')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Employee Code"
          name="empcode"
          type="text"
          fullWidth
          value={user.empcode}
          onChange={handleChange}
          error={handleError('empcode')}
          helperText={handleErrorMessage('empcode')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Department"
          name="department"
          type="text"
          fullWidth
          value={user.department}
          onChange={handleChange}
          error={handleError('department')}
          helperText={handleErrorMessage('department')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Designation"
          name="designation"
          type="text"
          fullWidth
          value={user.designation}
          onChange={handleChange}
          error={handleError('designation')}
          helperText={handleErrorMessage('designation')}
          required
        />
        <TextField
          margin="dense"
          size="small"
          label="Role"
          name="roleId"
          type="text"
          fullWidth
          value={user.roleId}
          onChange={handleChange}
          error={handleError('roleId')}
          helperText={handleErrorMessage('roleId')}
          select
          required
        >
          <MenuItem value="">Select Role</MenuItem>
                            {Role && Role.length > 0 ? Role.map((data) => (
                                        <MenuItem key={data.RoleId} value={data.RoleId}>{data.RoleName}</MenuItem>
                                    )) : null} 
        </TextField>
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

InternalUserDialog.propTypes = {
  onSubmit: PropTypes.func,
}

export default InternalUserDialog;
