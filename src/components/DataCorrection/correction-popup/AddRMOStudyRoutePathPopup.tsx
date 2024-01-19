import * as React from "react";
import {
  Dialog,
  DialogContent,
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
import { getStudyRoutePath, saveStudyRoutePath, updateStudyRoutePath } from "src/store/actions/RMOStudyRoutePathAction";
import { getStreamMasterList } from "src/store/actions/StreamAction";
import { getListSubjectMaster } from "src/store/actions/SubjectAction";

const initialStudyRoutePath = {
  SrregcarId: '',
  StreamId: 0,
  SubjectId: 0,
  SrpOrder: 0
}
const studyRoutePathValidator = {
  validator: {
    SrpId: (value = "") => /^\d+\.?\d*$/.test(value),
    SrregcarId: (value = "") => !!value.trim(),
    StreamId: (value = "") => /^\d+\.?\d*$/.test(value),
    SubjectId: (value = "") => /^\d+\.?\d*$/.test(value),
    SrpOrder: (value = "") => /^\d+\.?\d*$/.test(value)
  },
  errorMessage: {
    SrpId: 'Please select valid study route path',
    SrregcarId: 'Please fill valide Id',
    SrpOrder: 'Please fill valide Order number',
  }
}

export default function AddRMOStudyRoutePathPopup({ openImport, setOpenImport, SrpId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [studyRoutePathData, setStudyRoutePathData] = useState(initialStudyRoutePath);
  const { validator, errorMessage } = studyRoutePathValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setStudyRoutePathData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](studyRoutePathData[field])
    } else {
      isValid = Object.keys(studyRoutePathData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && studyRoutePathData[field]?.length > 0) {
      isValid = validator[field](studyRoutePathData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allStudyRoutePathData = useSelector(
    (state: any) => state?.getStudyRoutePathData?.StudyRoutePathResponse?.data
  )
  
  useEffect(() => {
    dispatch(getStreamMasterList());
    dispatch(getListSubjectMaster());
  }, []);
  const StreamListData = useSelector(
    (state: any) => state?.getStreamMasterList?.StreamMasterListResponse?.data
  )
  const SubjectListData = useSelector(
    (state: any) => state?.getSubjectMasterList?.SubjectMasterListResponse?.data
  )

  useEffect(() => {
    if (SrpId > 0) {
      const rowData = allStudyRoutePathData?.rows?.find((itm) => itm?.SrpId === SrpId);
      setStudyRoutePathData({
        SrregcarId: rowData?.SrregcarId,
        StreamId: rowData?.StreamId,
        SubjectId: rowData?.SubjectId,
        SrpOrder: rowData?.SrpOrder
      })
    }
  }, [SrpId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (SrpId > 0) {
      // Update Dispatcher
      dispatch(updateStudyRoutePath(SrpId, studyRoutePathData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setStudyRoutePathData(initialStudyRoutePath)
          setOpenImport(!openImport);
          dispatch(getStudyRoutePath(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveStudyRoutePath(studyRoutePathData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setStudyRoutePathData(initialStudyRoutePath)
          setOpenImport(!openImport);
          dispatch(getStudyRoutePath(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(SrpId === 0) ? 'Add' : 'Edit'} Study Route Path </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Srregcar Id</InputLabel>
                  <TextField
                    id="SrregcarId"
                    name="SrregcarId"
                    value={studyRoutePathData.SrregcarId}
                    onChange={handleChange}
                    error={!fieldValidate("SrregcarId")}
                    helperText={handleErrorMessage("SrregcarId")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Stream Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="StreamId"
                    name="StreamId"
                    value={studyRoutePathData.StreamId}
                    placeholder="Stream "
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("StreamId")}
                    required
                  >
                    {
                      StreamListData?.length > 0
                      && StreamListData?.map((item) => (<MenuItem value={item?.StreamId}>{item?.StreamName}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Subject Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="SubjectId"
                    name="SubjectId"
                    value={studyRoutePathData.SubjectId}
                    placeholder="Subject "
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("SubjectId")}
                    required
                  >
                    {
                      SubjectListData?.length > 0
                      && SubjectListData?.map((item) => (<MenuItem value={item?.SubjectId}>{item?.SubjectName}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Srp Order</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="SrpOrder"
                    value={studyRoutePathData.SrpOrder}
                    onChange={handleChange}
                    error={!fieldValidate("SrpOrder")}
                    helperText={handleErrorMessage("SrpOrder")}
                    type="number"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                sx={{ float: "right" }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(SrpId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
