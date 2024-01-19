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
import { getCourseEligibilityMaster, saveCourseEligibilityMaster, updateCourseEligibilityMaster } from "src/store/actions/CourseEligibilityAction";

const initialCourseEligibility = {
  Eligibility: ""
}
const courseEligibilityValidator = {
  validator: {
    Eligibility: (value = "") => !!value.trim()
  },
  errorMessage: {
    Eligibility: "Please fill Eligibility"
  }
}

export default function AddCourseEligibilityMasterPopup({ openImport, setOpenImport, CourseEligibilityId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courseEligibilityData, setCourseEligibilityData] = useState(initialCourseEligibility);
  const { validator, errorMessage } = courseEligibilityValidator;
  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCourseEligibilityData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](courseEligibilityData[field])
    } else {
      isValid = Object.keys(courseEligibilityData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && courseEligibilityData[field]?.length > 0) {
      isValid = validator[field](courseEligibilityData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allCourseEligibilityMasterData = useSelector(
    (state: any) => state?.getCourseEligibilityMaster?.CourseEligibilityMasterResponse?.data
  )
  console.log("allCourseEligibilityMasterData ==>", allCourseEligibilityMasterData, CourseEligibilityId)
  useEffect(() => {
    if (CourseEligibilityId > 0) {
      const rowData = allCourseEligibilityMasterData?.rows?.find((itm) => itm?.CourseEligibilityId === CourseEligibilityId);
      console.log("rowData", rowData);
      setCourseEligibilityData({
        Eligibility: rowData?.Eligibility
      })
    }
  }, [CourseEligibilityId])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", CourseEligibilityId);
    if (CourseEligibilityId > 0) {
      // Update Dispatcher
      dispatch(updateCourseEligibilityMaster(CourseEligibilityId, courseEligibilityData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseEligibilityData(initialCourseEligibility)
          setOpenImport(!openImport);
          dispatch(getCourseEligibilityMaster(pageNo, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", courseEligibilityData)
      // Save Dispatcher
      dispatch(saveCourseEligibilityMaster(courseEligibilityData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseEligibilityData(initialCourseEligibility)
          setOpenImport(!openImport);
          dispatch(getCourseEligibilityMaster(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(CourseEligibilityId === 0) ? 'Add' : 'Edit'} Course Eligibility </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <InputLabel required id="demo-simple-select-label">Eligibility</InputLabel>
                  <TextField
                    id="Eligibility"
                    name="Eligibility"
                    value={courseEligibilityData.Eligibility}
                    onChange={handleChange}
                    error={!fieldValidate("Eligibility")}
                    helperText={handleErrorMessage("Eligibility")}
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
                {(CourseEligibilityId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
