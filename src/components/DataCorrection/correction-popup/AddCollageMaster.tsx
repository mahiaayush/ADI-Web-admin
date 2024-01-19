import * as React from "react";
import {
  Dialog,
  DialogContent,
  Alert,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  Autocomplete,
  Stack,
  CircularProgress,
  FormHelperText
} from "@material-ui/core";
import type { ChangeEvent } from 'react';
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "src/store";
import { getCollageMaster, importCollegeMaster, saveCollegeMaster, updateCollegeMaster } from '../../../store/actions/getCollegeMasterAction';
import { getAffilitionMaster } from "src/store/actions/getAffiliationAction";
import { getEntitySubType } from "src/store/actions/getEntitySubTypeAction";
import { getMasterEntity, getMasterEntityList } from "src/store/actions/getMasterEntityAction";
import toast from "react-hot-toast";
import isEmail from 'validator/es/lib/isEmail';
import { AlertMessage, Color } from "./AlertMessage";

const initialCollage = {
  "EntityId": '',
  "EntitysubtypeId": '',
  "ProjStudent": 0,
  "ProjIntstudent": 0,
  "GeoSize": '',
  "AcceptanceRate": 0,
  "EntityAbout": '',
  "EntityEstd": '',
  "EntityEmail": '',
  "EntityPhone": '',
  "AffiliationId": 0,
  "EntityLatlon": '',
  "GeoTemp": '',
  "GeoAirport": '',
  "GeoLcity": '',
  "WSOption": '',
  "WSEPH": ''
}
const collageValidator = {
  validator: {
    EntityId: (value = "") => value?.trim()?.length >= 8,
    EntitysubtypeId: (value = "") => /^\d+\.?\d*$/.test(value),
    GeoSize: (value = "") => /^\d+\.?\d*$/.test(value),
    EntityAbout: (value = "") => value?.trim()?.length >= 2,
    EntityEstd: (value = "") => /^\d+\.?\d*$/.test(value),
    EntityEmail: (value = "") => isEmail(value),
    EntityPhone: (value = "") => /[a-zA-Z0-9()+ ]/.test(value),
    AffiliationId: (value = "") => parseInt(value, 10) > 0,
    AcceptanceRate: (value = "") => parseInt(value, 10) > 0,
    ProjStudent: (value = "") => /^\d+\.?\d*$/.test(value),
    ProjIntstudent: (value = "") => /^\d+\.?\d*$/.test(value),
    WSOption: (value = "") => value?.trim()?.length > 1,
    WSEPH: (value = "") => /^\d+\.?\d*$/.test(value),
    EntityLatlon: (value = "") => /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.test(value),

  },
  errorMessage: {
    EntityId: "Please select valid Entity.",
    EntitysubtypeId: "Please select Valid Entitysubtype",
    GeoSize: "Please fill GeoSize",
    EntityAbout: "Please fill About Entity",
    EntityEstd: "Please fill Entity Estd",
    EntityEmail: "Please fill valid Entity Email",
    EntityPhone: "Please fill valid Entity Phone",
    EntityLatlon: "Please fill valid location IE: Lat, Lon",
    AffiliationId: "Please select valid Affilitation",
    ProjStudent: 'Please fill valid Proj-Student Number.',
    ProjIntstudent: 'Please fill valid Proj-Intstudent Number.',
    WSOption: "Please fill valid WSOption",
    WSEPH: "Please fill valid WSEPH"
  }
}

export default function AddCollageMaster({ openImport, setOpenImport, EntityclgId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [alertData, setAlertData] = useState<{ type: Color, message: string }>({
    type: 'success',
    message: ''
  })
  const [isAboutEntity, setIsAboutEntity] = useState(true);
  const [message, setIsMessage] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [collageData, setCollageData] = useState(initialCollage);
  const { validator, errorMessage } = collageValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCollageData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true;
    if (field) {
      isValid = validator[field](collageData[field])
    } else {
      isValid = Object.keys(collageData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && collageData[field]?.length > 0) {
      isValid = validator[field](collageData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allCollegeData = useSelector(
    (state: any) => state?.getCollege?.collegeMasterResponse?.data
  )

  useEffect(() => {
    dispatch(getMasterEntityList());
    dispatch(getAffilitionMaster());
    dispatch(getEntitySubType());
  }, []);

  useEffect(() => {
    if (EntityclgId > 0) {
      const rowData = allCollegeData?.rows?.find((itm) => itm?.EntityclgId === EntityclgId);
      setCollageData({
        "EntityId": rowData?.EntityId,
        "EntitysubtypeId": rowData?.EntitysubtypeId,
        "ProjStudent": rowData?.ProjStudent,
        "ProjIntstudent": rowData?.ProjIntstudent,
        "GeoSize": rowData?.GeoSize,
        "AcceptanceRate": rowData?.AcceptanceRate,
        "EntityAbout": rowData?.EntityAbout,
        "EntityEstd": rowData?.EntityEstd,
        "EntityEmail": rowData?.EntityEmail,
        "EntityPhone": rowData?.EntityPhone,
        "AffiliationId": rowData?.AffiliationId,
        "EntityLatlon": rowData?.EntityLatlon,
        "GeoTemp": rowData?.GeoTemp,
        "GeoAirport": rowData?.GeoAirport,
        "GeoLcity": rowData?.GeoLcity,
        "WSOption": rowData?.WSOption,
        "WSEPH": rowData?.WSEPH
      })
    }
  }, [EntityclgId])

  const masterEntityListData = useSelector(
    (state: any) => state?.getMasterEntityList?.masterEntityResponse?.data
  )

  const AffiliationData = useSelector(
    (state: any) => state?.getAffilition?.affilitionMasterResponse?.data
  )
  const EntitySubTypeData = useSelector(
    (state: any) => state?.getEntitySubType?.entitySubTypeResponse?.data
  );

  const filehander = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (EntityclgId > 0) {
      // Update Dispatcher
      dispatch(updateCollegeMaster(EntityclgId, collageData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCollageData(initialCollage)
          setOpenImport(!openImport);
          dispatch(getCollageMaster(pageNo + 1, limit));
        } else {
          setAlertData({
            type: 'error',
            message: data?.message
          })
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveCollegeMaster(collageData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCollageData(initialCollage)
          setOpenImport(!openImport);
          dispatch(getCollageMaster(pageNo + 1, limit));
        } else {
          setAlertData({
            type: 'error',
            message: data?.message
          })
        }
      })
    }
  }

  interface EntityList {
    EntityName: string;
    EntityId: string;
  }

  const defaultProps = {
    options: masterEntityListData,
    getOptionLabel: (option: EntityList) => option.EntityName,
  };

  return (
    <div id="addCollage">
      <Dialog open={openImport} fullWidth={true} maxWidth="xl">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(EntityclgId === 0) ? 'Add' : 'Edit'} College Master </h2>
          { alertData.message !== '' && <AlertMessage type={alertData.type} message={alertData.message} setAlertData={() => { setAlertData({ type: 'success', message: '' }) }} />}
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label2">Entity</InputLabel>
                  {masterEntityListData?.length > 0
                    ? <Autocomplete
                      {...defaultProps}
                      disablePortal
                      size="small"
                      id="combo-box-demo"
                      value={masterEntityListData.find((itm: any) => itm.EntityId === collageData?.EntityId)}
                      sx={{ width: 300 }}
                      onChange={(event: any, newValue: EntityList | null) => {
                        setCollageData({ ...collageData, EntityId: newValue?.EntityId });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    /> : <CircularProgress />}
                  <FormHelperText>{handleErrorMessage("EntityId")}</FormHelperText>
                </Grid>
                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label">Entity Sub-Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="EntitysubtypeId"
                    name="EntitysubtypeId"
                    value={collageData.EntitysubtypeId}
                    placeholder="Entity Sub-Type"
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("EntitysubtypeId")}
                    required
                  >
                    {
                      EntitySubTypeData?.length > 0
                      && EntitySubTypeData?.map((item) => (<MenuItem value={item?.EntitysubtypeId}>{item?.EntitysubtypeName}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("EntitysubtypeId")}</FormHelperText>
                </Grid>

                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label">About Entity</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={collageData.EntityAbout}
                    name="EntityAbout"
                    error={!fieldValidate("EntityAbout")}
                    helperText={handleErrorMessage("EntityAbout")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label1">Entity ESTD</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="EntityEstd"
                    value={collageData.EntityEstd}
                    error={!fieldValidate("EntityEstd")}
                    helperText={handleErrorMessage("EntityEstd")}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label">Entity Email</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="EntityEmail"
                    value={collageData.EntityEmail}
                    onChange={handleChange}
                    error={!fieldValidate("EntityEmail")}
                    helperText={handleErrorMessage("EntityEmail")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label">Entity Phone</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="EntityPhone"
                    value={collageData.EntityPhone}
                    onChange={handleChange}
                    error={!fieldValidate("EntityPhone")}
                    helperText={handleErrorMessage("EntityPhone")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>

                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label">GeoSize</InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="GeoSize"
                    value={collageData.GeoSize}
                    error={!fieldValidate("GeoSize")}
                    helperText={handleErrorMessage("GeoSize")}
                    onChange={handleChange}
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label">Affiliation</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="AffiliationId"
                    onChange={handleChange}
                    error={!fieldValidate("AffiliationId")}
                    value={collageData.AffiliationId}
                    placeholder="Affiliation"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  >
                    {
                      AffiliationData?.length > 0
                      && AffiliationData?.map((item) => (<MenuItem value={item?.AffiliationId}>{item?.AffiliationTitle}</MenuItem>))
                    }
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label">Acceptance Rate</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="AcceptanceRate"
                    value={collageData.AcceptanceRate}
                    error={!fieldValidate("AcceptanceRate")}
                    helperText={handleErrorMessage("AcceptanceRate")}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item md={3}>
                  <InputLabel id="demo-simple-select-label">GEO Temp</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="GeoTemp"
                    value={collageData.GeoTemp}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item md={3}>
                  <InputLabel id="demo-simple-select-label">GEO Airport</InputLabel>
                  <TextField
                    id="outlined-basic"
                    value={collageData.GeoAirport}
                    name="GeoAirport"
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item md={3}>
                  <InputLabel id="demo-simple-select-label">GEO Local City</InputLabel>
                  <TextField
                    id="outlined-basic"
                    value={collageData.GeoLcity}
                    name="GeoLcity"
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label">WS Option</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="WSOption"
                    value={collageData.WSOption}
                    onChange={handleChange}
                    error={!fieldValidate("WSOption")}
                    helperText={handleErrorMessage("WSOption")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label">WSEPH</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="WSEPH"
                    value={collageData.WSEPH}
                    onChange={handleChange}
                    error={!fieldValidate("WSEPH")}
                    helperText={handleErrorMessage("WSEPH")}
                    variant="outlined"
                    type="number"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label">Project Student</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="ProjStudent"
                    value={collageData.ProjStudent}
                    onChange={handleChange}
                    error={!fieldValidate("ProjStudent")}
                    helperText={handleErrorMessage("ProjStudent")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={3}>
                  <InputLabel required id="demo-simple-select-label">Project Intstudent</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="ProjIntstudent"
                    value={collageData.ProjIntstudent}
                    onChange={handleChange}
                    error={!fieldValidate("ProjIntstudent")}
                    helperText={handleErrorMessage("ProjIntstudent")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>

                <Grid item md={3}>
                  <InputLabel id="demo-simple-select-label">GMap Location (Lat, Lon)</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="EntityLatlon"
                    onChange={handleChange}
                    value={collageData.EntityLatlon}
                    error={!fieldValidate("EntityLatlon")}
                    helperText={handleErrorMessage("EntityLatlon")}
                    variant="outlined"
                    size="small"
                    required
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{ mt: 2, float: 'right' }}
                variant="contained"
                // onClick={validateFields}
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(EntityclgId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}