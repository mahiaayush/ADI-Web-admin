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
import { getCourseMaster, saveCourseMaster, updateCourseMaster } from "src/store/actions/CourseMasterAction";
import { getStreamMasterList } from "src/store/actions/StreamAction";
import { getCourseTypeList } from "src/store/actions/CourseTypeAction";
import { getCourseLevelList } from "src/store/actions/CourseDetailsAction";
import { getCareerCourseLevelList } from "src/store/actions/CareerCourseLevelAction";

const courseStatus = [
  { Status: 'A', Lebel: 'Active' },
  { Status: 'I', Lebel: 'Inactive' }
]
const initialCourseMaster = {
  StreamId: '',
  CoursetypeId: '',
  CourselevelId: '',
  CourseTitle: '',
  CourseAlias: '',
  CourseDesc: '',
  CourseDuration: '',
  CourseEligibilityQualification: '',
  CourseEligibilitySubject: '',
  CourseEligibilityMark: '',
  Status: 'A'
}
const courseTypeValidator = {
  validator: {
    StreamId: (value = "") => /^\d+\.?\d*$/.test(value),
    CoursetypeId: (value = "") => /^\d+\.?\d*$/.test(value),
    CourselevelId: (value = "") => /^\d+\.?\d*$/.test(value),
    CourseTitle: (value = "") => value.trim().length >= 2,
    CourseAlias: (value = "") => value.trim().length >= 2,
    CourseDesc: (value = "") => value.trim().length >= 2,
    CourseDuration: (value = "") => value.trim().length >= 2,
    CourseEligibilityQualification: (value = "") => value.trim().length >= 2,
    CourseEligibilitySubject: (value = "") => value.trim().length >= 2,
    CourseEligibilityMark: (value = "") => value.trim().length >= 2,
    Status: (value = "") => ['A', 'I'].includes(value.trim())
  },
  errorMessage: {
    StreamId: 'Kindly choose valid Stream',
    CoursetypeId: 'Kindly choose valid Course type',
    CourselevelId: 'Kindly choose valid Course Level',
    CourseTitle: 'Kindly fill valid Course Title',
    CourseAlias: 'Kindly fill valid Course Alias',
    CourseDesc: 'Kindly fill valid Course Description',
    CourseDuration: 'Kindly fill valid Course Duration',
    CourseEligibilityQualification: 'Kindly fill valid Course Qualification',
    CourseEligibilitySubject: 'Kindly fill valid Course Subject',
    CourseEligibilityMark: 'Kindly fill valid Course Mark',
    Status: 'Kindly choose valid Course Status'
  }
}

export default function AddCourseMasterMasterPopup({ openImport, setOpenImport, CourseId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courseMasterData, setCourseMasterData] = useState(initialCourseMaster);
  const { validator, errorMessage } = courseTypeValidator;
  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCourseMasterData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](courseMasterData[field])
    } else {
      isValid = Object.keys(courseMasterData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && courseMasterData[field]?.length > 0) {
      isValid = validator[field](courseMasterData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const AllCourseLevelData = useSelector(
    (state: any) => state?.getCourseMaster?.CourseMasterResponse?.data
  )
  useEffect(() => {
    dispatch(getStreamMasterList());
    dispatch(getCourseTypeList());
    dispatch(getCareerCourseLevelList())
  }, [])
  const StreamListData = useSelector((state: any) => state?.getStreamMasterList?.StreamMasterListResponse?.data);
  const CourseTypeListData = useSelector((state: any) => state?.getCourseTypeList?.CourseTypeListResponse?.data);
  const CourseLevelListData = useSelector((state: any) => state?.getCareerCourseLevelList?.CareerCourseLevelListResponse?.data);

  console.log("AllCourseLevelData ==>", CourseLevelListData, CourseId)
  useEffect(() => {
    if (CourseId > 0) {
      const rowData = AllCourseLevelData?.rows?.find((itm) => itm?.CourseId === CourseId);
      console.log("rowData", rowData);
      setCourseMasterData({
        StreamId: rowData?.StreamId,
        CoursetypeId: rowData?.CoursetypeId,
        CourselevelId: rowData?.CourselevelId,
        CourseTitle: rowData?.CourseTitle,
        CourseAlias: rowData?.CourseAlias,
        CourseDesc: rowData?.CourseDesc,
        CourseDuration: rowData?.CourseDuration,
        CourseEligibilityQualification: rowData?.CourseEligibilityQualification,
        CourseEligibilitySubject: rowData?.CourseEligibilitySubject,
        CourseEligibilityMark: rowData?.CourseEligibilityMark,
        Status: rowData?.Status
      })
    }
  }, [CourseId])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", CourseId);
    if (CourseId > 0) {
      // Update Dispatcher
      dispatch(updateCourseMaster(CourseId, courseMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseMasterData(initialCourseMaster)
          setOpenImport(!openImport);
          dispatch(getCourseMaster(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", courseMasterData)
      // Save Dispatcher
      dispatch(saveCourseMaster(courseMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseMasterData(initialCourseMaster)
          setOpenImport(!openImport);
          dispatch(getCourseMaster(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(CourseId === 0) ? 'Add' : 'Edit'} Course Master </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Stream</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="EntitysubtypeId"
                    name="StreamId"
                    value={courseMasterData.StreamId}
                    error={!fieldValidate("StreamId")}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    required
                  >
                    {
                      StreamListData?.length > 0
                      && StreamListData?.map((item) => (<MenuItem value={item?.StreamId}>{item?.StreamName}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("StreamId")}</FormHelperText>
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Course Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="CoursetypeId"
                    name="CoursetypeId"
                    value={courseMasterData.CoursetypeId}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("CoursetypeId")}
                    required
                  >
                    {
                      CourseTypeListData?.length > 0
                      && CourseTypeListData?.map((item) => (<MenuItem value={item?.CourseTypeId}>{item?.CourseTypeName}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("CoursetypeId")}</FormHelperText>
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Course Level</InputLabel>
                  <Select
                    labelId="CourselevelId-label"
                    id="CourselevelId"
                    name="CourselevelId"
                    value={courseMasterData.CourselevelId}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("CourselevelId")}
                    required
                  >
                    {
                      CourseLevelListData?.length > 0
                      && CourseLevelListData?.map((item) => (<MenuItem value={item?.CourseLevelId}>{item?.CourseLevelName}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("CourselevelId")}</FormHelperText>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Course Title</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={courseMasterData.CourseTitle}
                    name="CourseTitle"
                    error={!fieldValidate("CourseTitle")}
                    helperText={handleErrorMessage("CourseTitle")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Course Alias</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={courseMasterData.CourseAlias}
                    name="CourseAlias"
                    error={!fieldValidate("CourseAlias")}
                    helperText={handleErrorMessage("CourseAlias")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Course Description</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={courseMasterData.CourseDesc}
                    name="CourseDesc"
                    error={!fieldValidate("CourseDesc")}
                    helperText={handleErrorMessage("CourseDesc")}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>

                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Course Duration</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={courseMasterData.CourseDuration}
                    name="CourseDuration"
                    error={!fieldValidate("CourseDuration")}
                    helperText={handleErrorMessage("CourseDuration")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Course Qualification</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={courseMasterData.CourseEligibilityQualification}
                    name="CourseEligibilityQualification"
                    error={!fieldValidate("CourseEligibilityQualification")}
                    helperText={handleErrorMessage("CourseEligibilityQualification")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Course Subject</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={courseMasterData.CourseEligibilitySubject}
                    name="CourseEligibilitySubject"
                    error={!fieldValidate("CourseEligibilitySubject")}
                    helperText={handleErrorMessage("CourseEligibilitySubject")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Course Mark</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={courseMasterData.CourseEligibilityMark}
                    name="CourseEligibilityMark"
                    error={!fieldValidate("CourseEligibilityMark")}
                    helperText={handleErrorMessage("CourseEligibilityMark")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="Status"
                    name="Status"
                    value={courseMasterData.Status}
                    placeholder="Status "
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("Status")}
                    required
                  >
                    {
                      courseStatus?.length > 0
                      && courseStatus?.map((item) => (<MenuItem value={item?.Status}>{item?.Lebel}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("Status")}</FormHelperText>
                </Grid>
              </Grid>
              <Button
                sx={{ mt: 2, float: 'right' }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(CourseId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
