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
import { getRMOccupation, getRMOccupationList, saveRMOccupation, updateRMOccupation } from "src/store/actions/RMOccupationAction";
import { getOccupationMasterList } from "../../../store/actions/getMasterOccupationAction";

const initialRMOccupation = {
  RegcarCode: '',
  OnetsocCode: '',
  RegcarTitle: '',
  RegcarSlug: '',
  RegcarVideo: '',
  RegcarImvideo: '',
  RegcarImg: '',
  LmcDesc: '',
  RegcarKeywords: '',
  IsEmerging: 'N',
  RegcarStatus: 'A'
}
const RegcarStatusOptions = [
  { Status: 'A', Label: 'Active' },
  { Status: 'I', Label: 'Inactive' }
]
const IsEmergingOptions = [
  { Status: 'N', Label: 'No' },
  { Status: 'Y', Label: 'Yes' }
]
const RMOccupationValidator = {
  validator: {
    RegcarCode: (value = "") => /^\d*\.?\d*$/.test(value),
    OnetsocCode: (value = "") => !!value.trim(),
    RegcarTitle: (value = "") => !!value.trim(),
    RegcarSlug: (value = "") => !!value.trim(),
    RegcarVideo: (value = "") => !!value.trim(),
    RegcarImvideo: (value = "") => !!value.trim(),
    RegcarImg: (value = "") => !!value.trim(),
    LmcDesc: (value = "") => !!value.trim(),
    RegcarKeywords: (value = "") => !!value.trim()
  },
  errorMessage: {
    RegcarCode: 'Please fill valid RegcarCode',
    OnetsocCode: 'Please fill valid OnetsocCode',
    RegcarTitle: 'Please fill valid RegcarTitle',
    RegcarSlug: 'Please fill valid RegcarSlug',
    RegcarVideo: 'Please fill valid RegcarVideo',
    RegcarImvideo: 'Please fill valid RegcarImvideo',
    RegcarImg: 'Please fill valid RegcarImg',
    LmcDesc: 'Please fill valid LmcDesc',
    RegcarKeywords: 'Please fill valid RegcarKeywords'
  }
}

export default function AddRMOccupationPopup({ openImport, setOpenImport, RegcarCode = "", pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef("");
  const [RMOccupationData, setRMOccupationData] = useState(initialRMOccupation);
  const { validator, errorMessage } = RMOccupationValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setRMOccupationData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](RMOccupationData[field])
    } else {
      isValid = Object.keys(RMOccupationData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && RMOccupationData[field]?.length > 0) {
      isValid = validator[field](RMOccupationData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allRMOccupationData = useSelector(
    (state: any) => state?.getRMOccupation?.RMOccupationResponse?.data
  )
  useEffect(() => {
    dispatch(getOccupationMasterList());
  }, []);

  const OccupationMasterListData = useSelector(
    (state: any) => state?.getOccupationMasterList?.OccupationListResponse?.data
  )
  useEffect(() => {
    if (RegcarCode.length > 0) {
      const rowData = allRMOccupationData?.rows?.find((itm) => itm?.RegcarCode === RegcarCode);
      setRMOccupationData({
        RegcarCode: rowData?.RegcarCode,
        OnetsocCode: rowData?.OnetsocCode,
        RegcarTitle: rowData?.RegcarTitle,
        RegcarSlug: rowData?.RegcarSlug,
        RegcarVideo: rowData?.RegcarVideo || "",
        RegcarImvideo: rowData?.RegcarImvideo || "",
        RegcarImg: rowData?.RegcarImg || "",
        LmcDesc: rowData?.LmcDesc || "",
        RegcarKeywords: rowData?.RegcarKeywords || "",
        IsEmerging: rowData?.IsEmerging,
        RegcarStatus: rowData?.RegcarStatus,
      })
    }
  }, [RegcarCode])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (RegcarCode.length > 0) {
      // Update Dispatcher
      dispatch(updateRMOccupation(RegcarCode, RMOccupationData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setRMOccupationData(initialRMOccupation)
          setOpenImport(!openImport);
          dispatch(getRMOccupation(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveRMOccupation(RMOccupationData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setRMOccupationData(initialRMOccupation)
          setOpenImport(!openImport);
          dispatch(getRMOccupation(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }

  return (
    <div id="dsdds">
      <Dialog open={openImport} fullWidth={true} maxWidth="lg">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(RegcarCode === "") ? 'Add' : 'Edit'} Occupation </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">RegcarCode</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="RegcarCode"
                    value={RMOccupationData.RegcarCode}
                    onChange={handleChange}
                    error={!fieldValidate("RegcarCode")}
                    helperText={handleErrorMessage("RegcarCode")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    disabled={!(RegcarCode === "")}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">OnetsocCode</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="OnetsocCode"
                    name="OnetsocCode"
                    value={RMOccupationData.OnetsocCode}
                    placeholder="OnetsocCode "
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("OnetsocCode")}
                    required
                  >
                    {
                      OccupationMasterListData?.length > 0
                      && OccupationMasterListData?.map((item) => (<MenuItem value={item?.OnetsocCode}>{item?.OnetsocTitle}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">RegcarTitle</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="RegcarTitle"
                    value={RMOccupationData.RegcarTitle}
                    onChange={handleChange}
                    error={!fieldValidate("RegcarTitle")}
                    helperText={handleErrorMessage("RegcarTitle")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">RegcarSlug</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="RegcarSlug"
                    value={RMOccupationData.RegcarSlug}
                    onChange={handleChange}
                    error={!fieldValidate("RegcarSlug")}
                    helperText={handleErrorMessage("RegcarSlug")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">RegcarVideo</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="RegcarVideo"
                    value={RMOccupationData.RegcarVideo}
                    onChange={handleChange}
                    error={!fieldValidate("RegcarVideo")}
                    helperText={handleErrorMessage("RegcarVideo")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">RegcarImvideo</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="RegcarImvideo"
                    value={RMOccupationData.RegcarImvideo}
                    onChange={handleChange}
                    error={!fieldValidate("RegcarImvideo")}
                    helperText={handleErrorMessage("RegcarImvideo")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">RegcarImg</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="RegcarImg"
                    value={RMOccupationData.RegcarImg}
                    onChange={handleChange}
                    error={!fieldValidate("RegcarImg")}
                    helperText={handleErrorMessage("RegcarImg")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">LmcDesc</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="LmcDesc"
                    value={RMOccupationData.LmcDesc}
                    onChange={handleChange}
                    error={!fieldValidate("LmcDesc")}
                    helperText={handleErrorMessage("LmcDesc")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">RegcarKeywords</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="RegcarKeywords"
                    value={RMOccupationData.RegcarKeywords}
                    onChange={handleChange}
                    error={!fieldValidate("RegcarKeywords")}
                    helperText={handleErrorMessage("RegcarKeywords")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel id="demo-simple-select-label">IsEmerging</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="IsEmerging"
                    name="IsEmerging"
                    value={RMOccupationData.IsEmerging}
                    placeholder="IsEmerging "
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      IsEmergingOptions?.length > 0
                      && IsEmergingOptions?.map((item) => (<MenuItem value={item?.Status}>{item?.Label}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={4}>
                  <InputLabel id="demo-simple-select-label">RegcarStatus</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="RegcarStatus"
                    name="RegcarStatus"
                    value={RMOccupationData.RegcarStatus}
                    placeholder="RegcarStatus "
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      RegcarStatusOptions?.length > 0
                      && RegcarStatusOptions?.map((item) => (<MenuItem value={item?.Status}>{item?.Label}</MenuItem>))
                    }
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <Button
                    variant="contained"
                    sx={{ float: "right" }}
                    disabled={!validate()}
                    color="primary"
                    type="submit"
                  >
                    {(RegcarCode === "") ? 'Save' : 'Update'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}