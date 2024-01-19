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
  TextareaAutosize
} from "@material-ui/core";
import type { ChangeEvent } from 'react';
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "src/store";
import toast from "react-hot-toast";
import { getMasterCountryList, getMasterState, saveMasterState, updateMasterState } from "src/store/actions/MasterStateAction";

const initialMasterState = {
    CountryId: '',
    StateName: '',
    StateCode: '',
}

const masterStateValidator = {
  validator: {
    CountryId: (value = "") => !!value?.trim(),
    StateName: (value = "") => /^[A-Za-z]/.test(value),
    StateCode: (value = "") => /^[A-Z]{2}$/.test(value),
    
  },
  errorMessage: {
    CountryId: 'Please select valid Country',
    StateName: 'Please fill valide state name',
    StateCode: "Please fill valid state code",
  }
}

export default function AddMasterStatePopup({ openImport, setOpenImport, StateId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [masterStateData, setMasterStateData] = useState(initialMasterState);
  const { validator, errorMessage } = masterStateValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setMasterStateData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](masterStateData[field])
    } else {
      isValid = Object.keys(masterStateData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && masterStateData[field]?.length > 0) {
      isValid = validator[field](masterStateData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allMasterStateData = useSelector(
    (state: any) => state?.MasterState?.MasterStateResponse?.data
  )
  useEffect(() => {
    dispatch(getMasterCountryList());
  }, []);
  const CountryListData = useSelector(
    (state: any) => state?.CountryID?.countryIdResponse?.data
  )
  useEffect(() => {
    if (StateId > 0) {
      const rowData = allMasterStateData?.rows?.find((itm) => itm?.StateId === StateId);
      setMasterStateData({
        CountryId: rowData?.CountryId,
        StateName: rowData?.StateName,
        StateCode: rowData?.StateCode
      })
    }
  }, [StateId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (StateId > 0) {
      // Update Dispatcher
      dispatch(updateMasterState(StateId, masterStateData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setMasterStateData(initialMasterState)
          setOpenImport(!openImport);
          dispatch(getMasterState(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveMasterState(masterStateData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setMasterStateData(initialMasterState)
          setOpenImport(!openImport);
          dispatch(getMasterState(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }

  return (
    <div id="dsdds">
      <Dialog open={openImport} fullWidth={true} maxWidth="md">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(StateId === 0) ? 'Add' : 'Edit'} Master State </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Country Short Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="CountryId"
                    name="CountryId"
                    value={masterStateData.CountryId}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("CountryId")}
                    required
                  >
                    {
                      CountryListData?.length > 0
                      && CountryListData?.map((item) => (<MenuItem value={item?.CountryId}>{item?.ShortName}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">State Name</InputLabel>
                  <TextField
                    id="StateName"
                    name="StateName"
                    value={masterStateData.StateName}
                    onChange={handleChange}
                    error={!fieldValidate("StateName")}
                    helperText={handleErrorMessage("StateName")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">State Code</InputLabel>
                  <TextField
                    id="StateCode"
                    name="StateCode"
                    value={masterStateData.StateCode}
                    onChange={handleChange}
                    error={!fieldValidate("StateCode")}
                    helperText={handleErrorMessage("StateCode")}
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
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(StateId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
