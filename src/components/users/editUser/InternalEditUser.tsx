import {
  Box, Breadcrumbs,
  Button, Container,
  Grid,
  Link, Paper, TextField,
  Typography
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem'
import type { ChangeEvent, FC, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../store';
import { getInternalUserDetail, updateInternalUser } from '../../../store/actions/internalUserAction';
import InternalUserRoleAction from "../../../store/actions/InternalUserRolesAction";
import CircularProgress from '@material-ui/core/CircularProgress';
import { userValidator } from '../../../utils/validations';
import toast from 'react-hot-toast'
import 'react-phone-input-2/lib/material.css'
import removeHyphen from '../../common/reusable/removeHyphen';

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

const InternalEditUser: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetail } = useSelector(state => state.internalUser);
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(initialUser)

  useEffect(() => {
    dispatch(InternalUserRoleAction());
  }, [])

  const AllowedRoutes = useSelector(
    (state: any) => state?.allowedRoutesRes?.getAlllowedRoutesResponse?.data
  )
  const Role = useSelector(state => state?.internalUserRole?.internalUserRoleResponse?.data?.data)

  useEffect(() => {
    setIsLoading(true)
    dispatch(getInternalUserDetail(id)).then(() => setIsLoading(false))
  }, [id]);

  useEffect(() => {
    const userData = userDetail.detail;
    removeHyphen(userData);
    setUser({
      given_name: userData.UserGivenName,
      family_name: userData.UserFamilyName,
      email: userData.UserEmail,
      phone_number: userData.UserPhoneNumber,
      country: userData.UserCountry,
      region: userData.UserRegion,
      address_line_one: userData.UserAddressLineOne,
      address_line_two: userData.UserAddressLineTwo,
      organization: userData.UserOrganization,
      empcode: userData.UserEmpcode,
      department: userData.UserDepartment,
      designation: userData.UserDesignation,
      roleId: userData.roleId,
    })
  }, []);

  const navigate = useNavigate();
  const { validator, errorMessage } = userValidator;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: field, value, checked } = e.target
    if (field === 'SEND') {
      setUser((prevState) => ({ ...prevState, [field]: checked }))
      return;
    }
    setUser((prevState) => ({ ...prevState, [field]: value }))
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

  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valueCk = user.phone_number.substring(0, 3);
    const valueCk1 = user.phone_number.substring(0, 1);
    let userData;
    let phoneNumberU;
    if (validate()) {
      if (valueCk === '+91') {
        phoneNumberU = user.phone_number;
        userData = { ...user, phone_number: phoneNumberU }
      } else if (valueCk !== '+91' && valueCk1 === '0') {
        phoneNumberU = `+91${user.phone_number.substring(1)}`;
        userData = { ...user, phone_number: phoneNumberU }
      } else {
        const lengthPhoneNumber = user.phone_number.length;
        if (lengthPhoneNumber === 10) {
          phoneNumberU = `+91${user.phone_number}`;
          userData = { ...user, phone_number: phoneNumberU }
        }
      }
      dispatch(updateInternalUser(id, userData)).then((data: any) => {
        if (data?.status) {
          toast.success(data?.message)
          navigate(`/user/${id}`)
        } else {
          toast.error(data?.message)
        }
      })
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 2,
      }}
    >
      <Container>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item>
            <Typography color="textPrimary" variant="h5">
              Edit User
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/user"
                variant="subtitle2"
              >
                Users
              </Link>
              <Link
                color="textPrimary"
                component={RouterLink}
                to={`/user/${id}`}
                variant="subtitle2"
              >
                User Detail
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Edit 
              </Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, p: 3 }} component={Paper}>
          {isLoading ? (
            <div className="loading">
              {" "}
              <CircularProgress />{" "}
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={3}>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="given_name"
                    onChange={handleChange}
                    value={user.given_name}
                    error={!validate("given_name")}
                    helperText={handleErrorMessage("given_name")}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="family_name"
                    onChange={handleChange}
                    value={user.family_name}
                    error={!validate("family_name")}
                    helperText={handleErrorMessage("family_name")}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    value={user.email}
                    error={!validate("email")}
                    helperText={handleErrorMessage("email")}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  {/* <PhoneInput
                    inputClass="fullWidth"
                    enableSearch={true}
                    country="in"
                    value={user.phone_number}
                    onChange={(value, country: any) => {
                      setUser({ ...user, phone_number: `+${value}` })
                      setCountryCode(country.dialCode)
                    }}
                    isValid={(value, country: any) => {
                      const numberLen = (country.format.match(/\./g)).length;
                      let errorMessage: any;
                      if (value.slice(0, country.dialCode.length) === country.dialCode && value.length === numberLen) {
                        errorMessage = true
                      } else if (value === country.dialCode || value.length === 0) {
                        errorMessage = true
                      } else {
                        errorMessage = false
                      }
                      return errorMessage;
                    }}
                  /> */}
                  <TextField
                    fullWidth
                    type="text"
                    label="Phone Number"
                    name="phone_number"
                    onChange={handleChange}
                    value={user.phone_number}
                    error={!validate("phone_number")}
                    helperText={handleErrorMessage("phone_number")}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    onChange={handleChange}
                    value={user.country}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Region"
                    name="region"
                    onChange={handleChange}
                    value={user.region}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Address 1"
                    name="address_line_one"
                    onChange={handleChange}
                    value={user.address_line_one}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Address 2"
                    name="address_line_two"
                    onChange={handleChange}
                    value={user.address_line_two}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Organization"
                    name="organization"
                    onChange={handleChange}
                    value={user.organization}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Emp Code"
                    name="empcode"
                    onChange={handleChange}
                    value={user.empcode}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    onChange={handleChange}
                    value={user.department}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    fullWidth
                    label="Designation"
                    name="designation"
                    onChange={handleChange}
                    value={user.designation}
                    required
                  />
                </Grid>
                <Grid item sm={4} xs={12}>
                  <TextField
                    margin="dense"
                    label="Role"
                    name="roleId"
                    type="text"
                    fullWidth
                    value={user.roleId}
                    onChange={handleChange}
                    select
                    defaultValue={user.roleId}
                    required
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    {Role && Role.length && ( 
                       Role.map((data) => (
                          <MenuItem key={data.RoleId} value={data.RoleId} disabled={AllowedRoutes?.[0]?.ROLE_NAME !== "SUPER ADMIN"}>
                            {data.RoleName}
                          </MenuItem>
                        )))}
                  </TextField>
                </Grid>
              </Grid>
              <Button
                sx={{ mt: 2 }}
                color="primary"
                type="submit"
                variant="contained"
                disabled={!validate()}
              >
                Update User
              </Button>
            </form>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default InternalEditUser;