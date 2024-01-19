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
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "src/store";
import toast from "react-hot-toast";
import { getOccupationQualification, saveOccupationQualification, updateOccupationQualification } from "src/store/actions/OccupationQualificationAction";
import { getRMORegcarCodeList } from "src/store/actions/RMOProgressionAction";
import { getStreamMasterList } from "src/store/actions/StreamAction";
import { getListSubjectMaster } from "src/store/actions/SubjectAction";

const initialOccupationQualification = {
  RegcarCode: '',
  StreamId: 0,
  SubjectId: 0
}

const OccupationQualificationValidator = {
  validator: {
    RegcarCode: (value = "") => value?.trim()?.length > 1,
    StreamId: (value = "") => /^\d+\.?\d*$/.test(value),
    SubjectId: (value = "") => /^\d+\.?\d*$/.test(value)
  },
  errorMessage: {
    RegcarCode: 'Please select valid Regcar Title',
    StreamId: 'Please fill valid Stream Title',
    SubjectId: 'Please fill valid Subject.',
  }
}

export default function AddOccupationQualificationPopup({ openImport, setOpenImport, QalregcarId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [OccupationQualificationData, setOccupationQualificationData] = useState(initialOccupationQualification);
  const { validator, errorMessage } = OccupationQualificationValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setOccupationQualificationData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](OccupationQualificationData[field])
    } else {
      isValid = Object.keys(OccupationQualificationData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && OccupationQualificationData[field]?.length > 0) {
      isValid = validator[field](OccupationQualificationData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allOccupationQualificationData = useSelector(
    (state: any) => state?.getOccupationQualification?.OccupationQualificationResponse?.data
  )
  
  useEffect(() => {
    dispatch(getRMORegcarCodeList());
    dispatch(getStreamMasterList());
    dispatch(getListSubjectMaster());
  }, []);
  const RMOPRegCodeData = useSelector(
    (state: any) => state?.getRegCodeList?.RMOPRegCodeResponse?.data
  )
  const SteamMasterData = useSelector(
    (state: any) => state?.getStreamMasterList?.StreamMasterListResponse?.data
  )
  const SubjectMasterData = useSelector(
    (state: any) => state?.getSubjectMasterList?.SubjectMasterListResponse?.data
  )
  useEffect(() => {
    if (QalregcarId > 0) {
      const rowData = allOccupationQualificationData?.rows?.find((item) => item?.QalregcarId === QalregcarId);
      setOccupationQualificationData({
        RegcarCode: rowData?.RegcarCode,
        StreamId: rowData?.StreamId,
        SubjectId: rowData?.SubjectId
      })
    }
  }, [QalregcarId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (QalregcarId > 0) {
      // Update Dispatcher
      dispatch(updateOccupationQualification(QalregcarId, OccupationQualificationData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setOccupationQualificationData(initialOccupationQualification)
          setOpenImport(!openImport);
          dispatch(getOccupationQualification(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveOccupationQualification(OccupationQualificationData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setOccupationQualificationData(initialOccupationQualification)
          setOpenImport(!openImport);
          dispatch(getOccupationQualification(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(QalregcarId === 0) ? 'Add' : 'Edit'} Occupation-Qualification </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Regcar Title</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="RegcarCode"
                    name="RegcarCode"
                    value={OccupationQualificationData.RegcarCode}
                    placeholder="OccupationQualification "
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("RegcarCode")}
                    required
                  >
                    {
                      RMOPRegCodeData?.length > 0
                      && RMOPRegCodeData?.map((item) => (<MenuItem value={item?.RegcarCode}>{item?.RegcarTitle}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Stream Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="StreamId"
                    name="StreamId"
                    value={OccupationQualificationData.StreamId}
                    placeholder="OccupationQualification "
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("StreamId")}
                    required
                  >
                    {
                      SteamMasterData?.length > 0
                      && SteamMasterData?.map((item) => (<MenuItem value={item?.StreamId}>{item?.StreamName}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Subject Title</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="SubjectId"
                    name="SubjectId"
                    value={OccupationQualificationData.SubjectId}
                    placeholder="OccupationQualification "
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("SubjectId")}
                    required
                  >
                    {
                      SubjectMasterData?.length > 0
                      && SubjectMasterData?.map((item) => (<MenuItem value={item?.SubjectId}>{item?.SubjectName}</MenuItem>))
                    }
                  </Select>
                </Grid>
              </Grid>
              <Button
                sx={{ float: "right" }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(QalregcarId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
