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
import { getCourseList } from "src/store/actions/CourseFaqAction";
import { getCourseExamination, getExaminationList, saveCourseExamination, updateCourseExamination } from "src/store/actions/CourseExaminationAction";
import { getCourseMasterList } from "src/store/actions/CourseMasterAction";

const initialCourseExamination = {
  CourseId: 0,
  ExamId: 0,
}

const CourseExaminationValidator = {
  validator: {
    CourseId: (value = "") => /^\d+\.?\d*$/.test(value),
    ExamId: (value = "") => /^\d+\.?\d*$/.test(value)
  },
  errorMessage: {
    CourseId: 'Please select valid course',
    ExamId: 'Please fill valid Exam '
  }
}

export default function AddCourseExaminationPopup({ openImport, setOpenImport, CourseExamId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [courseExaminationData, setCourseExaminationData] = useState(initialCourseExamination);
  const { validator, errorMessage } = CourseExaminationValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCourseExaminationData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](courseExaminationData[field])
    } else {
      isValid = Object.keys(courseExaminationData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && courseExaminationData[field]?.length > 0) {
      isValid = validator[field](courseExaminationData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allCourseExaminationData = useSelector(
    (state: any) => state?.getCourseExamination?.CourseExaminationResponse?.data
  )
  useEffect(() => {
    dispatch(getCourseMasterList()); 
    dispatch(getExaminationList())
  }, []);
  const CourseListData = useSelector(
    (state: any) => state?.getCourseMasterList?.CourseMasterListResponse?.data
  )
  console.log("CourseListData", CourseListData)

  const ExaminationList = useSelector(
    (state: any) => state?.getExaminationList?.ExaminationListResponse?.data
  )
  useEffect(() => {
    if (CourseExamId > 0) {
      const rowData = allCourseExaminationData?.rows?.find((itm) => itm?.CourseExamId === CourseExamId);
      console.log("rowData", rowData);
      setCourseExaminationData({
        CourseId: rowData?.CourseId,
        ExamId: rowData?.ExamId
      })
    }
  }, [CourseExamId])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", CourseExamId);
    if (CourseExamId > 0) {
      // Update Dispatcher
      dispatch(updateCourseExamination(CourseExamId, courseExaminationData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseExaminationData(initialCourseExamination)
          setOpenImport(!openImport);
          dispatch(getCourseExamination(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", courseExaminationData)
      // Save Dispatcher
      dispatch(saveCourseExamination(courseExaminationData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseExaminationData(initialCourseExamination)
          setOpenImport(!openImport);
          dispatch(getCourseExamination(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }
  const check = () => {
    let value = true
    if (courseExaminationData.CourseId && courseExaminationData.ExamId) {
      value = false
    } else {
      value = true
    }
    return value
  }

  return (
    <div id="dsdds">
      <Dialog open={openImport} fullWidth={true} maxWidth="md">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(CourseExamId === 0) ? 'Add' : 'Edit'} Course-Examination </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Course</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="EntitysubtypeId"
                    name="CourseId"
                    value={courseExaminationData.CourseId}
                    placeholder="Course "
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("CourseId")}
                    required
                  >
                    {
                      CourseListData?.length > 0
                      && CourseListData?.map((item) => (<MenuItem value={item?.CourseId}>{item?.CourseTitle}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Exam</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="ExamId"
                    name="ExamId"
                    value={courseExaminationData.ExamId}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("ExamId")}
                    required
                  >
                    {
                      ExaminationList?.length > 0
                      && ExaminationList?.map((item) => (<MenuItem value={item?.ExamId}>{item?.ExamLongName}</MenuItem>))
                    }
                  </Select>
                </Grid>
              </Grid>

              <Button
                sx={{ mt: 2, float: 'right' }}
                variant="contained"
                disabled={check()}
                color="primary"
                type="submit"
              >
                {(CourseExamId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
