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
import { getCareerCourseLevel, saveCareerCourseLevel, updateCareerCourseLevel } from "src/store/actions/CareerCourseLevelAction";

const initialCareerCourseLevelMaster = {
  CourseLevelName: ''
}
const subjectMasterValidator = {
  validator: {
    CourseLevelName: (value = "") => value?.trim()?.length > 1
  },
  errorMessage: {
    CourseLevelName: "Please fill Course Level Name"
  }
}

export default function AddCareerCourseLevelMasterPopup({ openImport, setOpenImport, CourseLevelId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subjectMasterData, setCareerCourseLevelMasterData] = useState(initialCareerCourseLevelMaster);
  const { validator, errorMessage } = subjectMasterValidator;
  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCareerCourseLevelMasterData((prevState) => ({ ...prevState, [field]: value }))
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

  const AllCourseLevelData = useSelector(
    (state: any) => state?.getCareerCourseLevel?.CareerCourseLevelResponse?.data
  )
  console.log("AllCourseLevelData ==>", AllCourseLevelData, CourseLevelId)
  useEffect(() => {
    if (CourseLevelId > 0) {
      const rowData = AllCourseLevelData?.rows?.find((itm) => itm?.CourseLevelId === CourseLevelId);
      console.log("rowData", rowData);
      setCareerCourseLevelMasterData({
        "CourseLevelName": rowData?.CourseLevelName,
      })
    }
  }, [CourseLevelId])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", CourseLevelId);
    if (CourseLevelId > 0) {
      // Update Dispatcher
      dispatch(updateCareerCourseLevel(CourseLevelId, subjectMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCareerCourseLevelMasterData(initialCareerCourseLevelMaster)
          setOpenImport(!openImport);
          dispatch(getCareerCourseLevel(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", subjectMasterData)
      // Save Dispatcher
      dispatch(saveCareerCourseLevel(subjectMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCareerCourseLevelMasterData(initialCareerCourseLevelMaster)
          setOpenImport(!openImport);
          dispatch(getCareerCourseLevel(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(CourseLevelId === 0) ? 'Add' : 'Edit'} Course Level </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <InputLabel required id="demo-simple-select-label">Course Level Name</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={subjectMasterData.CourseLevelName}
                    name="CourseLevelName"
                    error={!fieldValidate("CourseLevelName")}
                    helperText={handleErrorMessage("CourseLevelName")}
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
                {(CourseLevelId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
