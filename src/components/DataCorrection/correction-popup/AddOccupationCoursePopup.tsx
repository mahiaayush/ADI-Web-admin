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
} from '@material-ui/core'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "src/store";
import { saveOccupationCourse, getOccupationCourse, updateOccupationCourse } from "src/store/actions/RMOccupationCourseAction";
import { getRMORegcarCodeList } from "src/store/actions/RMOProgressionAction";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { getCourseMasterList } from "src/store/actions/CourseMasterAction";

const initialOccupationCourse = {
  CourseRegcarId: 0,
  RegcarCode: '',
  CourseId: 0,
}
const occupationCourseValidator = {
  validator: {
    CourseRegcarId: (value = "") => /^\d+\.?\d*$/.test(value),
    RegcarCode: (value = "") => !!value.trim(),
    CourseId: (value = "") => parseInt(value, 10) > 0,
  },
  errorMessage: {
    RegcarCode: 'Please fill valid RegcarCode',
    CourseId: 'Please fill valid CourseId',
  }
}

export default function AddOccupationCoursePopup({ openImport, setOpenImport, CourseRegcarId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [occupationCourseData, setOccupationCourseData] = useState(initialOccupationCourse);
  const { validator, errorMessage } = occupationCourseValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setOccupationCourseData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](occupationCourseData[field])
    } else {
      isValid = Object.keys(occupationCourseData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && occupationCourseData[field]?.length > 0) {
      isValid = validator[field](occupationCourseData[field])
    }
    return isValid;
  }

  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allOccupationCourseData = useSelector(
    (state: any) => state?.getOccupationCourse?.OccupationCourseResponse?.data
  )
  useEffect(() => {
    dispatch(getRMORegcarCodeList());
    dispatch(getCourseMasterList());
  }, []);

  const RMOPRegCodeData = useSelector(
    (state: any) => state?.getRegCodeList?.RMOPRegCodeResponse?.data
  )
  const CourseMasterData = useSelector(
    (state: any) => state?.getCourseMasterList?.CourseMasterListResponse?.data
  )

  useEffect(() => {
    if (CourseRegcarId > 0) {
      const rowData = allOccupationCourseData?.rows?.find((itm) => itm?.CourseRegcarId === CourseRegcarId);
      setOccupationCourseData({
        CourseRegcarId: rowData?.CourseRegcarId,
        RegcarCode: rowData?.RegcarCode,
        CourseId: rowData?.CourseId
      })
    }
  }, [CourseRegcarId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (CourseRegcarId > 0) {
      // Update Dispatcher
      dispatch(updateOccupationCourse(CourseRegcarId, occupationCourseData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setOccupationCourseData(initialOccupationCourse)
          setOpenImport(!openImport);
          dispatch(getOccupationCourse(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveOccupationCourse(occupationCourseData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setOccupationCourseData(initialOccupationCourse)
          setOpenImport(!openImport);
          dispatch(getOccupationCourse(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(CourseRegcarId === 0) ? 'Add' : 'Edit'} Occupation Course </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Regcar</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="RegcarCode"
                    name="RegcarCode"
                    value={occupationCourseData.RegcarCode}
                    placeholder="Regcar "
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
                  <InputLabel required id="demo-simple-select-label">Course</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="CourseId"
                    name="CourseId"
                    value={occupationCourseData.CourseId}
                    placeholder="Course "
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("CourseId")}
                    required
                  >
                    {
                      CourseMasterData?.length > 0
                      && CourseMasterData?.map((item) => (<MenuItem value={item?.CourseId}>{item?.CourseTitle}</MenuItem>))
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
                {(CourseRegcarId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
export { AddOccupationCoursePopup }