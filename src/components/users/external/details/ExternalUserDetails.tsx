import { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
  Button,
  DialogContentText,
} from '@material-ui/core';
import ExternalUserContactDetails from './ExternalUserContactDetails';
import ExternalUserLMCJourney from './ExternalUserLMCJourney';
import ExternalUserEvents from './ExternalUserEvents';
// import ExternalUserDataManagement from './ExternalUserDataManagement';
import ExternalUserLinkedAccounts from './ExternalUserLinkedAccounts';
import { useDispatch, useSelector } from '../../../../store';
import {
  getExternalUserDetail, enableExternalUser,
  disableExternalUser, globalSignOutExternalUser,
  externalResetPassword, getExternalUserEntities,
  externalUserAuthEvents
} from '../../../../store/actions/externalUserAction';
import Modal from '../../../common/reusable/Modal'
import toast from 'react-hot-toast'

const ExternalUserEntityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userDetail, userEntities, authEvents } = useSelector(state => state.externalUser);
  const [isLoading, setIsLoading] = useState(false)

  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [enableModal, setEnableModal] = useState(false);
  const [disableModal, setDisableModal] = useState(false);
  const [globalSignOutModal, setGlobalSignOutModal] = useState(false);

  const handleGetUser = () => {
    setIsLoading(true);
    dispatch(getExternalUserDetail(id)).then(() => setIsLoading(false))
  }

  const getUserEntityList = () => {
    if (userDetail.detail?.Username) {
      dispatch(getExternalUserEntities(userDetail.detail?.UserSid))
    }
  }

  useEffect(() => {
    handleGetUser()
  }, [id]);

  useEffect(() => {
    getUserEntityList()
    if (userDetail.detail?.Username) {
      dispatch(externalUserAuthEvents(id))
    }
  }, [userDetail]);

  const handleResetPassword = () => {
    dispatch(externalResetPassword(id)).then((data: any) => {
      if (data?.status) {
        setResetPasswordModal(false);
        handleGetUser()
      } else {
        toast.error(data?.message)
      }
    })
  }

  const handleEnableUser = () => {
    dispatch(enableExternalUser(id)).then((data: any) => {
      if (data?.status) {
        setEnableModal(false);
        handleGetUser()
      } else {
        toast.error(data?.message)
      }
    })
  }
  const handleDisableUser = () => {
    dispatch(disableExternalUser(id)).then((data: any) => {
      if (data?.status) {
        setDisableModal(false);
        handleGetUser()
      } else {
        toast.error(data?.message)
      }
    })
  }
  const handleGlobalSignOutUser = () => {
    dispatch(globalSignOutExternalUser(id)).then((data: any) => {
      if (data?.status) {
        setGlobalSignOutModal(false);
        handleGetUser()
      } else {
        toast.error(data?.message)
      }
    })
  }

  // const userLMCJourney = { profile: 'LMC General', personality: 'Polar bear', skills: 'Leadership', interest: 'Internet' };

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
          <Grid
            item
            xs={6}
          >
            <Typography
              color="textPrimary"
              variant="h5"
            >
              User Details
            </Typography>
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{ mt: 1 }}
            >
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/user"
                variant="subtitle2"
              >
                Users
              </Link>
              <Typography
                color="textSecondary"
                variant="subtitle2"
              >
                External
              </Typography>
            </Breadcrumbs>
          </Grid>
          {!isLoading && !userDetail.error && <Grid item>
            <Button
              variant="contained"
              onClick={() => setResetPasswordModal(true)}
            >
              Reset Password
            </Button>
            {userDetail.detail.UserEnabled ? <Button
              variant="outlined"
              onClick={() => setDisableModal(true)}
              sx={{ ml: 1 }}
            >
              Disable User
            </Button>
              : <Button
                variant="contained"
                onClick={() => setEnableModal(true)}
                sx={{ ml: 1 }}
              >
                Enable User
              </Button>}
            <Button
              variant="contained"
              onClick={() => setGlobalSignOutModal(true)}
              sx={{ ml: 1 }}
            >
              Global Sign Out
            </Button>
          </Grid>}
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xl={6}
              xs={12}
            >
              <Grid
                item
                xs={12}
              >
                <ExternalUserContactDetails data={userDetail.detail} />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ mt: 3 }}
              >
                <ExternalUserEvents AuthEvents={authEvents.list} />
              </Grid>
            </Grid>
            <Grid
              item
              md={6}
              xl={6}
              xs={12}
            >
              <Grid
                item
                xs={12}
              >
                <ExternalUserLMCJourney data={userDetail.detail.UserLmcJourney} />
              </Grid>
              {/* <Grid
                item
                xs={12}
                sx={{ mt: 3 }}
              >
                <ExternalUserDataManagement />
              </Grid> */}
              <Grid
                item
                xs={12}
                sx={{ mt: 3 }}
              >
                <ExternalUserLinkedAccounts LinkedAccounts={userEntities.list} userLinkedAccountsList={getUserEntityList} userSID={userDetail.detail?.UserSid} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {resetPasswordModal && <Modal
        open={resetPasswordModal}
        title="Reset Password"
        onClose={() => setResetPasswordModal(false)}
        actions={<>
          <Button variant="outlined" color="secondary" onClick={() => setResetPasswordModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleResetPassword}>Confirm</Button>
        </>}
      >
        <DialogContentText>Are you sure you want to <b>Reset Password</b> ?</DialogContentText>
      </Modal>}
      {enableModal && <Modal
        open={enableModal}
        title="Enable User"
        onClose={() => setEnableModal(false)}
        actions={<>
          <Button variant="outlined" color="secondary" onClick={() => setEnableModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEnableUser}>Confirm</Button>
        </>}
      >
        <DialogContentText>Are you sure you want to <b>Enable</b> this user?</DialogContentText>
      </Modal>}
      {disableModal && <Modal
        open={disableModal}
        title="Disable User"
        onClose={() => setDisableModal(false)}
        actions={<>
          <Button variant="outlined" color="secondary" onClick={() => setDisableModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDisableUser}>Confirm</Button>
        </>}
      >
        <DialogContentText>Are you sure you want to <b>Disable</b> this user?</DialogContentText>
      </Modal>}
      {globalSignOutModal && <Modal
        open={globalSignOutModal}
        title="Global Sign Out"
        onClose={() => setGlobalSignOutModal(false)}
        actions={<>
          <Button variant="outlined" color="secondary" onClick={() => setGlobalSignOutModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleGlobalSignOutUser}>Confirm</Button>
        </>}
      >
        <DialogContentText>Are you sure you want to <b>Global Sign Out</b> this user?</DialogContentText>
      </Modal>}
    </Box>
  );
};
export default ExternalUserEntityDetails;