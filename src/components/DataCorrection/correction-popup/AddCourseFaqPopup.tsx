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
import { getCourseFaq, getCourseList, saveCourseFaq, updateCourseFaq } from "src/store/actions/CourseFaqAction";

const initialCourseFaq = {
  CourseId: 0,
  QuestionText: '',
  AnswerText: '',
  FaqOrder: 0
}
const courseFaqValidator = {
  validator: {
    CourseId: (value = "") => /^\d+\.?\d*$/.test(value),
    QuestionText: (value = "") => !!value.trim(),
    AnswerText: (value = "") => !!value.trim(),
    FaqOrder: (value = "") => parseInt(value, 10) < 128,
  },
  errorMessage: {
    CourseId: "Please select Valid Am-Type",
    QuestionText: "Please fill valid Question",
    AnswerText: "Please fill valid Answer",
    FaqOrder: "Please fill valid order, it should be less then 128"
  }
}

export default function AddCourseFaqPopup({ openImport, setOpenImport, FaqId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [courseFaqData, setCourseFaqData] = useState(initialCourseFaq);
  const { validator, errorMessage } = courseFaqValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCourseFaqData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](courseFaqData[field])
    } else {
      isValid = Object.keys(courseFaqData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && courseFaqData[field]?.length > 0) {
      isValid = validator[field](courseFaqData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allCourseFaqData = useSelector(
    (state: any) => state?.getCourseFaq?.CourseFaqResponse?.data
  )
  useEffect(() => {
    dispatch(getCourseList());
  }, []);

  useEffect(() => {
    if (FaqId > 0) {
      const rowData = allCourseFaqData?.rows?.find((itm) => itm?.FaqId === FaqId);
      console.log("rowData", rowData);
      setCourseFaqData({
        "CourseId": rowData?.CourseId,
        "QuestionText": rowData?.QuestionText,
        "AnswerText": rowData?.AnswerText,
        "FaqOrder": rowData?.FaqOrder
      })
    }
  }, [FaqId])

  const CourseListData = useSelector(
    (state: any) => state?.getCourseList?.CourseListResponse?.data
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", FaqId);
    if (FaqId > 0) {
      // Update Dispatcher
      dispatch(updateCourseFaq(FaqId, courseFaqData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseFaqData(initialCourseFaq)
          setOpenImport(!openImport);
          dispatch(getCourseFaq(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", courseFaqData)
      // Save Dispatcher
      dispatch(saveCourseFaq(courseFaqData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseFaqData(initialCourseFaq)
          setOpenImport(!openImport);
          dispatch(getCourseFaq(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(FaqId === 0) ? 'Add' : 'Edit'} Course-FAQ </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Course</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="EntitysubtypeId"
                    name="CourseId"
                    value={courseFaqData.CourseId}
                    placeholder="Course "
                    sx={{ width: '100%' }}
                    size="small"
                    onChange={handleChange}
                    error={!fieldValidate("CourseId")}
                    required
                  >
                    {
                      CourseListData?.length > 0
                      && CourseListData?.map((item) => (<MenuItem value={item?.courseId}>{item?.courseTitle}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Order</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="FaqOrder"
                    value={courseFaqData.FaqOrder}
                    onChange={handleChange}
                    error={!fieldValidate("FaqOrder")}
                    helperText={handleErrorMessage("FaqOrder")}
                    type="number"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Question</InputLabel>
                  <TextField
                    required
                    style={{ height: '60px', width: '100%' }}
                    value={courseFaqData.QuestionText}
                    name="QuestionText"
                    size="small"
                    error={!fieldValidate("QuestionText")}
                    helperText={handleErrorMessage("QuestionText")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Answer</InputLabel>
                  <TextField
                    style={{ height: '60px', width: '100%' }}
                    name="AnswerText"
                    value={courseFaqData.AnswerText}
                    size="small"
                    error={!fieldValidate("AnswerText")}
                    helperText={handleErrorMessage("AnswerText")}
                    onChange={handleChange}
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
                {(FaqId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
