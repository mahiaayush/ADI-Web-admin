import {
  Paper,
  Breadcrumbs,
  Button,
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Switch
} from '@material-ui/core';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { userValidator } from '../../../utils/validations'
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../store';
import { getExternalUserDetail, updateExternalUser } from '../../../store/actions/externalUserAction';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  send: 'I',
  qualification: '',
}

const ExternalEditUser: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetail } = useSelector(state => state.externalUser);
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(initialUser)

  useEffect(() => {
    setIsLoading(true)
    dispatch(getExternalUserDetail(id)).then(() => setIsLoading(false))
  }, [id]);

  useEffect(() => {
    const userData = userDetail.detail
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
      send: userData.UserSend || "I",
      qualification: userData.UserQualification || ""
    })
  }, []);

  const navigate = useNavigate();
  const { validator, errorMessage } = userValidator;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: field, value, checked } = e.target
    if (field === 'send') {
      setUser((prevState) => ({ ...prevState, send: checked ? "A" : "I" }))
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
    const valueCk = user.phone_number.substr(0, 3)
    if (validate()) {
      const userData = { ...user, phone_number: valueCk === '+91' ? user.phone_number : `+91${user.phone_number}` }
      dispatch(updateExternalUser(id, userData)).then((data: any) => {
        if (data?.status) {
          toast.success(data?.message)
          navigate(`/user/external/${id}`)
        } else {
          toast.error(data?.message)
        }
      })
    }
  };

  return (
    <Box sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',
      py: 2
    }}
    >
      <Container>
        <Grid
          container
          justifyContent="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textPrimary"
              variant="h5"
            >
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
                to={`/user/external/${id}`}
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
          {isLoading
            ? <div className="loading"><CircularProgress /></div>
            : <form onSubmit={handleSubmit} noValidate>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  sm={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="First Name"
                    name="given_name"
                    onChange={handleChange}
                    value={user.given_name}
                    error={!validate('given_name')}
                    helperText={handleErrorMessage('given_name')}
                    required
                  />
                </Grid>

                <Grid
                  item
                  sm={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="family_name"
                    onChange={handleChange}
                    value={user.family_name}
                    error={!validate('family_name')}
                    helperText={handleErrorMessage('family_name')}
                    required
                  />
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    value={user.email}
                  />
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    type="text"
                    label="Phone Number"
                    name="phone_number"
                    onChange={handleChange}
                    value={user.phone_number}
                    error={!validate('phone_number')}
                    helperText={handleErrorMessage('phone_number')}
                    required
                  />
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    onChange={handleChange}
                    value={user.country}
                  />
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="State/Region"
                    name="region"
                    onChange={handleChange}
                    value={user.region}
                  />
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Address 1"
                    name="address_line_one"
                    onChange={handleChange}
                    value={user.address_line_one}
                  />
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    label="Address 2"
                    name="address_line_two"
                    onChange={handleChange}
                    value={user.address_line_two}
                  />
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={12}
                >
                  <TextField
                    fullWidth
                    type="text"
                    label="Qualification"
                    name="qualification"
                    onChange={handleChange}
                    value={user.qualification}
                  />
                </Grid>
              </Grid>
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
                    checked={user.send === "A"}
                    onChange={handleChange}
                    color="primary"
                    name="send"
                  />
                </Box>
              </Box>
              <Button
                color="primary"
                type="submit"
                variant="contained"
              >
                Update User
              </Button>
            </form>}
        </Box>
      </Container>
    </Box>
  );
};

export default ExternalEditUser;