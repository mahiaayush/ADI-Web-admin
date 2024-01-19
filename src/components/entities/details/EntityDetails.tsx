import {
  Box,
  Breadcrumbs,
  Container,
  Grid, Card,
  Link, Typography,
  FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel
} from '@material-ui/core';
import { useDispatch, useSelector } from '../../../store';
import { Link as RouterLink, useParams } from 'react-router-dom';
import EntityAddress from './EntityAddress';
import EntityAdministrators from './EntityAdministrators';
import EntityPlanDetails from './EntityPlanDetails';
import EntityCount from './EntityCount';
import EntityInfo from './EntityInfo';
// import EntityUserRemove from './EntityUserRemove';
import React, { useState, useEffect } from 'react';
import useStyles from './EntityDetailsStyle';
import http from "src/utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  UPDATE_ENTITY_ANALYTICS_STATUS,
} from "src/store/constants";
import { getEntityDetail, setEntityStatus } from '../../../store/actions/entityAction';
// import { getEntityAssignedPackage } from '../../../store/actions/entityAssignedPackageAction';
// import { getEntityItemDetail } from "../../../store/actions/GetEntityItemDetailAction";
import ErrorResponse from './ErrorResponse';
import CircularProgress from '@material-ui/core/CircularProgress';
import ConfirmStatus from './ConfirmStatus';
import toast from 'react-hot-toast';
import './EntityCount.css';
import { POST_ENTITY_VERIFY } from 'src/store/RbacConstants';

const EntityDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { entity } = useSelector(state => state.entity);
  const [isLoading, setIsLoading] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [confirmEntityAnalytics, setConfirmEntityAnalytics] = useState<boolean>(false)
  const [checked, setChecked] = useState(false);

  const handleGetEntity = () => {
    setIsLoading(true)
    dispatch(getEntityDetail(id)).then(() => setIsLoading(false))
  }
  useEffect(() => {
    handleGetEntity()
  }, [id]);

  useEffect(() => {
    if (entity?.detail && (entity.detail.isAnalytics === "Y" || entity.detail.isAnalytics === "N")) {
      setChecked(entity.detail.isAnalytics === "Y")
    }
  }, [entity.detail.isAnalytics])

  const url = window.location.href;
  const entityId = url.substring(url.lastIndexOf('/') + 1);
  // useEffect(() => {
  //   dispatch(getEntityAssignedPackage(entityId)); 
  // }, [entityId]);

  // useEffect(() => {
  //   dispatch(getEntityItemDetail(entityId));
  // }, [entityId]);

  // const entityItemDetail = useSelector(
  //   state => state?.entityItemDetail?.entityItemDetail?.data
  // );

  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  
  const classes = useStyles();
  const [status, setStatus] = useState('');
  const toggleEntityAnalytics = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked(event.target.checked);
    setConfirmEntityAnalytics(true)
  };
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value !== "Pending") {
      const actionValue = event.target.value;
      const statusValue = (actionValue) => {
        switch (actionValue) {
            case 'Approved': return 'A';
            case 'Denied': return 'D';
            case 'In Progress': return 'C';
            default: return ''
        }
    }
      
      setStatus(statusValue(actionValue) as string);
      setConfirmDialog(true);
    }
  };
  const handelConfirmStatus = () => {
    dispatch(setEntityStatus(entity.detail.EntityRequestId, entity.detail.EntityId, status)).then((data: any) => {
      if (data?.status) {
        setConfirmDialog(false);
        handleGetEntity()
      } else {
        toast.error(data?.message)
      }
    })
  }

  const handelConfirmEntityAnalyticsStatus = async () => {
    const isAnalyticsChanged = checked ? "Y" : "N";
    if (isAnalyticsChanged !== entity.detail.isAnalytics) {
      try {
        const res = await http.patch(
          `${ADMIN_API_ENDPOINT_V2}${UPDATE_ENTITY_ANALYTICS_STATUS}`,
          {
            EntityId: id,
            isAnalytics: isAnalyticsChanged,
          }
        );
        if (res.data.status === true) {
          setConfirmEntityAnalytics(false);
          dispatch(getEntityDetail(id));
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  }

  const selectStatus = entity.detail.EntityStatus;
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 2,
      }}
    >
      <Container>
        {confirmDialog && (
          <ConfirmStatus
            open={confirmDialog}
            onClose={() => setConfirmDialog(false)}
            onSubmit={handelConfirmStatus}
          />
        )}
         {confirmEntityAnalytics && (
          <ConfirmStatus
            displayText={checked ? "Do you want to enable Entity Analytics ?" : "Do you want to disable Entity Analytics ?"}
            open={confirmEntityAnalytics}
            onClose={() => { setConfirmEntityAnalytics(false); setChecked(!checked) }}
            onSubmit={handelConfirmEntityAnalyticsStatus}
          />
        )}
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item xs={8}>
            <Typography color="textPrimary" variant="h5">
              Entity Details
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/entity"
                variant="subtitle2"
              >
                Entities
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Entity Details
              </Typography>
            </Breadcrumbs>
          </Grid>
          {entity.detail.EntityTypeName === "SCHOOL" && (
              <FormControl
                size="small"
                variant="outlined"
                className={classes.formGroup}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={toggleEntityAnalytics}
                    />
                  }
                  label="Entity Analytics"
                />
              </FormControl>
            )}
          {!isLoading && entity.error === null && (
            <Grid item xs={2}>
              <FormControl
                size="small"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel
                  id="demo-simple-select-outlined-label"
                  className="ActionButtonSessions"
                >
                  Action
                </InputLabel>
                { (roleAllowedApis.filter(itm => itm.apiKey === POST_ENTITY_VERIFY).length > 0) 
        && (
                <Select
                  MenuProps={{ className: classes.activeStatus }}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectStatus || "Pending"}
                  onChange={handleChange}
                  label="Action"
                  className="selectAction"
                >
                  <MenuItem value="Pending">Select Action</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Denied">Denied</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                </Select>
        )}
              </FormControl>
            </Grid>
          )}
        </Grid>
        {isLoading ? (
          <Card className="errorMessage" sx={{ mt: 3, minHeight: 366 }}>
            {" "}
            <CircularProgress />{" "}
          </Card>
        ) : entity.error !== null ? (
          <ErrorResponse error={entity.error} />
        ) : (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item md={4} xl={3} xs={12}>
                <Grid item xs={12}>
                  <EntityInfo lstEntity={entity.detail} />
                </Grid>
                <Grid item xs={12} sx={{ mt: 3 }}>
                  <EntityAddress lstEntity={entity.detail} />
                </Grid>
              </Grid>
              <Grid item md={8} xl={9} xs={12}>
                <Grid container spacing={3}>
                  <EntityCount lstEntity={entity.detail} />
                </Grid>
                <Grid item xs={12} sx={{ mt: 3 }}>
                  <EntityAdministrators lstEntity={entity.detail.EntityAdmin} />
                </Grid>
                <Grid item xs={12} sx={{ mt: 3 }}>
                  {entity.detail.EntityTypeName === "SCHOOL" && entity.detail.EntityStatus === "Approved" && (
                      <EntityPlanDetails
                        Type={entity.detail.EntityTypeName}
                        SchoolName={entity.detail.EntityName}
                        StudentCount={
                          entity.detail.EntityUserCount.StudentCount
                        }
                      />
                    )}
                </Grid>
                {/* <Grid
                    item
                    xs={12}
                    sx={{ mt: 3 }}
                  >
                    <EntityUserRemove />
                  </Grid> */}
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};
export default EntityDetails;