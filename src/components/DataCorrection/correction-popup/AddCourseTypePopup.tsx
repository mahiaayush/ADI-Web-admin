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
import { getCourseType, saveCourseType, updateCourseType } from "src/store/actions/CourseTypeAction";

const initialCourseType = {
  CourseTypeName: ''
}
const courseTypeValidator = {
  validator: {
    CourseTypeName: (value = "") => value.trim().length >= 2
  },
  errorMessage: {
    CourseTypeName: "Please fill Course Type Name"
  }
}

export default function AddCourseTypeMasterPopup({ openImport, setOpenImport, CourseTypeId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courseTypeData, setCourseTypeData] = useState(initialCourseType);
  const { validator, errorMessage } = courseTypeValidator;
  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCourseTypeData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](courseTypeData[field])
    } else {
      isValid = Object.keys(courseTypeData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && courseTypeData[field]?.length > 0) {
      isValid = validator[field](courseTypeData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const AllCourseLevelData = useSelector(
    (state: any) => state?.getCourseType?.CourseTypeResponse?.data
  )
  useEffect(() => {
    if (CourseTypeId > 0) {
      const rowData = AllCourseLevelData?.rows?.find((itm) => itm?.CourseTypeId === CourseTypeId);
      setCourseTypeData({
        "CourseTypeName": rowData?.CourseTypeName,
      })
    }
  }, [CourseTypeId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (CourseTypeId > 0) {
      // Update Dispatcher
      dispatch(updateCourseType(CourseTypeId, courseTypeData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseTypeData(initialCourseType)
          setOpenImport(!openImport);
          dispatch(getCourseType(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveCourseType(courseTypeData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseTypeData(initialCourseType)
          setOpenImport(!openImport);
          dispatch(getCourseType(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(CourseTypeId === 0) ? 'Add' : 'Edit'} Course Type </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <InputLabel required id="demo-simple-select-label">Course Type Name</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={courseTypeData.CourseTypeName}
                    name="CourseTypeName"
                    error={!fieldValidate("CourseTypeName")}
                    helperText={handleErrorMessage("CourseTypeName")}
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
                {(CourseTypeId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
