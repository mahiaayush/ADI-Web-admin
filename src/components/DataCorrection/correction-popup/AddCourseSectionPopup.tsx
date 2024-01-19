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
import { getCatagory, saveCatagory, updateCatagory } from "src/store/actions/CatagoryAction";
import { getCourseSection, saveCourseSection, updateCourseSection } from "src/store/actions/CourseSectionAction";

const initialCourseSection = {
  CourseId: 0,
  SectionTitle: '',
  SectionDesc: '',
  PrecedenceOrder: 0,
  Status: 'A',
}
const StatusOptions = [
  { Status: 'A', Lebel: 'Active' },
  { Status: 'I', Lebel: 'Inactive' }
]
const courseSectionValidator = {
  validator: {
    CourseId: (value = "") => /^\d+\.?\d*$/.test(value),
    SectionTitle: (value = "") => !!value.trim(),
    SectionDesc: (value = "") => !!value.trim(),
    PrecedenceOrder: (value: string = "") => {
      return parseInt(value, 10) >= 0
    }
  },
  errorMessage: {
    CourseId: 'Please select valid course',
    SectionTitle: 'Please fill valide Section Title',
    SectionDesc: 'Please fill valide Section Description',
    PrecedenceOrder: "Please fill valid order number",
  }
}

export default function AddCourseSectionPopup({ openImport, setOpenImport, SectionId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [courseSectionData, setCourseSectionData] = useState(initialCourseSection);
  const { validator, errorMessage } = courseSectionValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCourseSectionData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](courseSectionData[field])
    } else {
      isValid = Object.keys(courseSectionData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && courseSectionData[field]?.length > 0) {
      isValid = validator[field](courseSectionData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allCourseSectionData = useSelector(
    (state: any) => state?.getCourseSection?.CourseSectionResponse?.data
  )
  useEffect(() => {
    dispatch(getCourseList());
  }, []);
  const CourseListData = useSelector(
    (state: any) => state?.getCourseList?.CourseListResponse?.data
  )
  useEffect(() => {
    if (SectionId > 0) {
      const rowData = allCourseSectionData?.rows?.find((itm) => itm?.SectionId === SectionId);
      console.log("rowData", rowData);
      setCourseSectionData({
        CourseId: rowData?.CourseId,
        SectionTitle: rowData?.SectionTitle,
        SectionDesc: rowData?.SectionDesc,
        PrecedenceOrder: rowData?.PrecedenceOrder,
        Status: rowData?.Status
      })
    }
  }, [SectionId])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", SectionId);
    if (SectionId > 0) {
      // Update Dispatcher
      dispatch(updateCourseSection(SectionId, courseSectionData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseSectionData(initialCourseSection)
          setOpenImport(!openImport);
          dispatch(getCourseSection(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", courseSectionData)
      // Save Dispatcher
      dispatch(saveCourseSection(courseSectionData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseSectionData(initialCourseSection)
          setOpenImport(!openImport);
          dispatch(getCourseSection(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(SectionId === 0) ? 'Add' : 'Edit'} Course-Section </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Course</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="CourseId"
                    name="CourseId"
                    value={courseSectionData.CourseId}
                    placeholder="Course "
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
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
                  <InputLabel required id="demo-simple-select-label">Section Title</InputLabel>
                  <TextField
                    id="SectionTitle"
                    name="SectionTitle"
                    value={courseSectionData.SectionTitle}
                    onChange={handleChange}
                    error={!fieldValidate("SectionTitle")}
                    helperText={handleErrorMessage("SectionTitle")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Section Description</InputLabel>
                  <TextField
                    id="SectionDesc"
                    name="SectionDesc"
                    value={courseSectionData.SectionDesc}
                    onChange={handleChange}
                    error={!fieldValidate("SectionDesc")}
                    helperText={handleErrorMessage("SectionDesc")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Order</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="PrecedenceOrder"
                    value={courseSectionData.PrecedenceOrder}
                    onChange={handleChange}
                    error={!fieldValidate("PrecedenceOrder")}
                    helperText={handleErrorMessage("PrecedenceOrder")}
                    type="number"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="Status"
                    name="Status"
                    value={courseSectionData.Status}
                    label="Status "
                    placeholder="Status "
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      StatusOptions?.length > 0
                      && StatusOptions?.map((item) => (<MenuItem value={item?.Status}>{item?.Lebel}</MenuItem>))
                    }
                  </Select>
                </Grid>
              </Grid>
              <Button
                sx={{ mt: 2, float: 'right' }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(SectionId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
