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
import { getSubjectMaster, saveSubjectMaster, updateSubjectMaster } from "src/store/actions/SubjectAction";

const initialSubjectMaster = {
  SubjectName: ''
}
const subjectMasterValidator = {
  validator: {
    SubjectName: (value = "") => value.trim().length >= 2,
  },
  errorMessage: {
    SubjectName: "Please fill Course Level Name"
  }
}

export default function AddSubjectMasterPopup({ openImport, setOpenImport, SubjectId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subjectMasterData, setSubjectMasterData] = useState(initialSubjectMaster);
  const { validator, errorMessage } = subjectMasterValidator;
  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setSubjectMasterData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](subjectMasterData[field])
    } else {
      isValid = Object.keys(subjectMasterData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && subjectMasterData[field]?.length > 0) {
      isValid = validator[field](subjectMasterData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allSubjectMasterData = useSelector(
    (state: any) => state?.getSubjectMaster?.SubjectMasterResponse?.data
  )
  useEffect(() => {
    if (SubjectId > 0) {
      const rowData = allSubjectMasterData?.rows?.find((itm) => itm?.SubjectId === SubjectId);
      setSubjectMasterData({
        "SubjectName": rowData?.SubjectName,
      })
    }
  }, [SubjectId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (SubjectId > 0) {
      // Update Dispatcher
      dispatch(updateSubjectMaster(SubjectId, subjectMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setSubjectMasterData(initialSubjectMaster)
          setOpenImport(!openImport);
          dispatch(getSubjectMaster(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveSubjectMaster(subjectMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setSubjectMasterData(initialSubjectMaster)
          setOpenImport(!openImport);
          dispatch(getSubjectMaster(pageNo + 1, limit));
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
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(SubjectId === 0) ? 'Add' : 'Edit'} SubjectMaster </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <InputLabel required id="demo-simple-select-label">Title</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={subjectMasterData.SubjectName}
                    name="SubjectName"
                    error={!fieldValidate("SubjectName")}
                    helperText={handleErrorMessage("SubjectName")}
                    onChange={handleChange}
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
                {(SubjectId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
