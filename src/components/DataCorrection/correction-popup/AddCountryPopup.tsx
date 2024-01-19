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
  CircularProgress,
  FormHelperText,
  Autocomplete
} from "@material-ui/core";
import type { ChangeEvent } from 'react';
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "src/store";
import toast from "react-hot-toast";
import { getCountry, saveCountry, updateCountry } from "src/store/actions/GlobalMasterCountryAction";

const initialCountry = {
  CountryId: '',
  ShortName: '',
  LongName: '',
  ISO3: '',
  ISO4217: '',
  NumCode: '',
  UNMember: '',
  CallingCode: '',
  CCTLD: '',
  SaPreference: 'Y',
  StatusFlag: 'A'
}
const SaPreferenceOptions = [
  { SaPreference: 'Y', Lebel: 'Y' },
  { SaPreference: 'N', Lebel: 'N' }
]
const StatusFlagOptions = [
  { StatusFlag: 'A', Lebel: 'Active' },
  { StatusFlag: 'I', Lebel: 'Inactive' }
]

const CountryValidator = {
  validator: {
    CountryId: (value = "") => /^[A-Z]{2}$/.test(value),
    ShortName: (value = "") => /^[A-Za-z]+$/.test(value),
    LongName: (value = "") => value?.trim()?.length >= 2,
    ISO3: (value = "") => /^[A-Z]{3}$/.test(value),
    ISO4217: (value = "") => /^[A-Z]{3}$/.test(value),
    NumCode: (value = "") => /^[0-9]+$/.test(value),
    UNMember: (value = "") => value?.trim()?.length >= 2,
    CallingCode: (value = "") => value?.trim()?.length >= 2,
    CCTLD: (value = "") => /^\.[a-z]+$/.test(value),
  },
  errorMessage: {
    CountryId: "Please fill valid CountryId",
    ShortName: "Please fill valid ShortName",
    LongName: "Please fill valid LongName",
    ISO3: "Please fill valid ISO3",
    ISO4217: "Please fill valid ISO4217",
    NumCode: "Please fill valid NumCode",
    UNMember: "Please fill valid UNMember",
    CallingCode: "Please fill valid CallingCode",
    CCTLD: "Please fill valid CCTLD",
  }
}

export default function AddCountryPopup({ openImport, setOpenImport, CountryId = '', pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [CountryData, setCountryData] = useState(initialCountry);
  const { validator, errorMessage } = CountryValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCountryData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](CountryData[field])
    } else {
      isValid = Object.keys(CountryData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && CountryData[field]?.length > 0) {
      isValid = validator[field](CountryData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allCountryData = useSelector(
    (state: any) => state?.getMasterCountry?.countryResponse?.data
  )
  useEffect(() => {
    if (CountryId !== "") {
      const rowData = allCountryData?.rows?.find((item) => item?.CountryId === CountryId);
      setCountryData({
        "CountryId": rowData?.CountryId,
        "ShortName": rowData?.ShortName,
        "LongName": rowData?.LongName,
        "ISO3": rowData?.ISO3,
        "ISO4217": rowData?.ISO4217,
        "NumCode": rowData?.NumCode,
        "UNMember": rowData?.UNMember,
        "CallingCode": rowData?.CallingCode,
        "CCTLD": rowData?.CCTLD,
        "SaPreference": rowData?.SaPreference,
        "StatusFlag": rowData?.StatusFlag
      })
    }
  }, [CountryId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (CountryId !== "") {
      // Update Dispatcher
      dispatch(updateCountry(CountryId, CountryData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCountryData(initialCountry)
          setOpenImport(!openImport);
          dispatch(getCountry(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      dispatch(saveCountry(CountryData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCountryData(initialCountry)
          setOpenImport(!openImport);
          dispatch(getCountry(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }

  return (
    <div id="dsdds">
      <Dialog open={openImport} fullWidth={true} maxWidth="sm">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(false)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(CountryId === "") ? 'Add' : 'Edit'} Country </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">CountryID</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CountryId"
                    value={CountryData.CountryId}
                    onChange={handleChange}
                    error={!fieldValidate("CountryId")}
                    helperText={handleErrorMessage("CountryId")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    disabled={!(CountryId === "")}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">ShortName</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={CountryData.ShortName}
                    name="ShortName"
                    error={!fieldValidate("ShortName")}
                    helperText={handleErrorMessage("ShortName")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">LongName</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="LongName"
                    value={CountryData.LongName}
                    onChange={handleChange}
                    error={!fieldValidate("LongName")}
                    helperText={handleErrorMessage("LongName")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">ISO3</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="ISO3"
                    value={CountryData.ISO3}
                    onChange={handleChange}
                    error={!fieldValidate("ISO3")}
                    helperText={handleErrorMessage("ISO3")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">ISO4217</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="ISO4217"
                    value={CountryData.ISO4217}
                    onChange={handleChange}
                    error={!fieldValidate("ISO4217")}
                    helperText={handleErrorMessage("ISO4217")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">NumCode</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="NumCode"
                    value={CountryData.NumCode}
                    onChange={handleChange}
                    error={!fieldValidate("NumCode")}
                    helperText={handleErrorMessage("NumCode")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">UNMember</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="UNMember"
                    value={CountryData.UNMember}
                    onChange={handleChange}
                    error={!fieldValidate("UNMember")}
                    helperText={handleErrorMessage("UNMember")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">CallingCode</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CallingCode"
                    value={CountryData.CallingCode}
                    onChange={handleChange}
                    error={!fieldValidate("CallingCode")}
                    helperText={handleErrorMessage("CallingCode")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">CCTLD</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CCTLD"
                    value={CountryData.CCTLD}
                    onChange={handleChange}
                    error={!fieldValidate("CCTLD")}
                    helperText={handleErrorMessage("CCTLD")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel id="demo-simple-select-label">SaPreference</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="SaPreference"
                    name="SaPreference"
                    value={CountryData.SaPreference}
                    placeholder="SaPreference "
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      SaPreferenceOptions?.length > 0
                      && SaPreferenceOptions?.map((item) => (<MenuItem value={item?.SaPreference}>{item?.Lebel}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={4}>
                  <InputLabel id="demo-simple-select-label">StatusFlag</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="StatusFlag"
                    name="StatusFlag"
                    value={CountryData.StatusFlag}
                    placeholder="StatusFlagOptions "
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      StatusFlagOptions?.length > 0
                      && StatusFlagOptions?.map((item) => (<MenuItem value={item?.StatusFlag}>{item?.Lebel}</MenuItem>))
                    }
                  </Select>
                </Grid>
              </Grid>
              <Button
                sx={{ mt: 2, float: 'right' }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(CountryId === "") ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
