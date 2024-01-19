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
// import { getCollageMaster, importCollegeMaster, saveCollegeMaster, updateCollegeMaster } from '../../store/actions/getCollegeMasterAction';
import toast from "react-hot-toast";
import { AlertMessage, Color } from "../DataCorrection/correction-popup/AlertMessage";
import { getAllPossibleRoutes } from "src/store/actions/getAllowedRoutesAction";
import { getApiMaster, saveApi, updateApi } from "src/store/actions/ApiAction";

const initialApiData = {
  routeId: 0,
  apiEndpoint: '',
  method: '',
  apiKey: '',
  apiDesc: '',
  status: 'A'
}
const apiValidator = {
  validator: {
    routeId: (value = "") => parseInt(value, 10) > 0,
    apiEndpoint: (value = "") => value?.trim()?.length >= 4,
    method: (value = "") => value?.trim()?.length >= 3,
    apiKey: (value = "") => value?.trim()?.length >= 3,
    apiDesc: (value = "") => value?.trim()?.length >= 3,
    status: (value = "") => value?.trim()?.length >= 1,

  },
  errorMessage: {
    routeId: "Please select route.",
    apiEndpoint: "Please fill API EndPoint.",
    method: "Please Select",
    apiKey: "Please fill valid API Key",
    apiDesc: "Please fill valid API description",
    status: "Please Select",
  }
}

const methodsOptions = [
  "GET", "POST", "PUT", "PATHC", "DELETE"
];

const statusOptions = [
  {
    value: "A", Level: "Active"
  },
  {
    value: "I", Level: "InActive"
  }
]
export default function AddApis({ openImport, setOpenImport, id = 0, search = '', pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [alertData, setAlertData] = useState<{ type: Color, message: string }>({
    type: 'success',
    message: ''
  })
  const [apiData, setApiData] = useState(initialApiData);
  const { validator, errorMessage } = apiValidator;

  const handleChange = async (e: any) => {
    console.log("e.target", e.target)
    const { name: field, value, checked } = e.target
    setApiData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true;
    if (field) {
      isValid = validator[field](apiData[field])
    } else {
      isValid = Object.keys(apiData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && apiData[field]?.length > 0) {
      isValid = validator[field](apiData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allapiData = useSelector(
    (state: any) => state?.getApiMaster?.apiMasterResponse?.data
  )

  useEffect(() => {
    dispatch(getAllPossibleRoutes());
  }, []);

  useEffect(() => {
    if (id > 0) {
      const rowData = allapiData?.rows?.find((itm) => itm?.id === id);
      setApiData({
        routeId: rowData?.routeId,
        apiEndpoint: rowData?.apiEndpoint,
        method: rowData?.method,
        apiKey: rowData?.apiKey,
        apiDesc: rowData?.apiDesc,
        status: rowData?.status
      })
    }
  }, [id])

  const possibleRoutes = useSelector(
    (state: any) => state?.allPossibleRoutes?.getAllPossibleRotes?.data
  )
  
  let usableRoutes = [];
  if (possibleRoutes?.length > 0) {
    possibleRoutes?.map(item => {
      if (item.children.length > 0) {
        item.children.map(itm => {
          usableRoutes = [...usableRoutes, itm]
          return itm;
        })
      } else {
        usableRoutes = [...usableRoutes, item];
      } 
      return item;
    }) 
  }
  
  console.log("usableRoutes", usableRoutes)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (id > 0) {
      // Update Dispatcher
      dispatch(updateApi(id, apiData)).then((data: any) => {
        console.log("data", data)
        if (data?.status) {
          setApiData(initialApiData)
          setOpenImport(!openImport);
          dispatch(getApiMaster(pageNo + 1, limit, search));
          toast.success(data?.message)
        } else {
          setAlertData({
            type: 'error',
            message: data?.message
          })
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveApi(apiData)).then((data: any) => {
        if (data?.status) {
          toast.success(data?.message)
          setApiData(initialApiData)
          setOpenImport(!openImport);
          dispatch(getApiMaster(pageNo + 1, limit, search));
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

  return (
    <div id="addCollage">
      <Dialog open={openImport} fullWidth={true} maxWidth="md">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(id === 0) ? 'Add' : 'Edit'} Api </h2>
          { alertData.message !== '' && <AlertMessage type={alertData.type} message={alertData.message} setAlertData={() => { setAlertData({ type: 'success', message: '' }) }} />}
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Route</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="routeId"
                    name="routeId"
                    value={apiData.routeId}
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("routeId")}
                    required
                  >
                    { usableRoutes?.length > 0
                      && usableRoutes?.map(item => { 
                        return (
                            <MenuItem key={item.ROUTE_ID} value={item?.ROUTE_ID}>{item?.ROUTE_TITLE} </MenuItem>
                          )
                        })}
                    {/* { PossibleRoutes?.length > 0
                      && PossibleRoutes?.map(item => { 
                        item.children.length > 0
                        && item.children.map(itm => {
                          return (<MenuItem key={itm.ROUTE_ID} value={itm?.ROUTE_ID}>{itm?.ROUTE_TITLE} </MenuItem>)
                        })
                        })} */}
                  </Select>
                  <FormHelperText>{handleErrorMessage("routeId")}</FormHelperText>
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label1">Method</InputLabel>
                  <Select
                    id="outlined-basic"
                    name="method"
                    value={apiData.method}
                    error={!fieldValidate("method")}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  >
                    {
                      methodsOptions?.length > 0
                      && methodsOptions?.map((item) => (<MenuItem key={item} value={item}>{item}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("method")}</FormHelperText>
                </Grid>
                <Grid item md={4}>
                <InputLabel required id="demo-simple-select-label1">Status</InputLabel>
                  <Select
                    id="outlined-basic"
                    name="status"
                    value={apiData.status}
                    onChange={handleChange}
                    error={!fieldValidate("status")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  >
                    {
                      statusOptions?.length > 0
                      && statusOptions?.map((item) => (<MenuItem key={item.value} value={item.value}>{item.Level}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("status")}</FormHelperText>
                </Grid>
                
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">API Key</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={apiData.apiKey}
                    name="apiKey"
                    error={!fieldValidate("apiKey")}
                    helperText={handleErrorMessage("apiKey")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">API Endpoint</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={apiData.apiEndpoint}
                    name="apiEndpoint"
                    error={!fieldValidate("apiEndpoint")}
                    helperText={handleErrorMessage("apiEndpoint")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Description</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="apiDesc"
                    value={apiData.apiDesc}
                    onChange={handleChange}
                    error={!fieldValidate("apiDesc")}
                    helperText={handleErrorMessage("apiDesc")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
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
                {(id === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}