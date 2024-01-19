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
import { getAccomodation, saveAccomodation, updateAccomodation } from "src/store/actions/AccomodationAction";
import { getEntitySubType } from "src/store/actions/getEntitySubTypeAction";
import { getMasterEntity } from "src/store/actions/getMasterEntityAction";
import toast from "react-hot-toast";
import { getCourseFaq, getCourseList, saveCourseFaq, updateCourseFaq } from "src/store/actions/CourseFaqAction";
import { getCourseAsset, saveCourseAsset, updateCourseAsset } from "src/store/actions/CourseAssetAction";

const initialCourseAsset = {
  CourseId: 0,
  AssetType: 0,
  BackingFile: '',
  Status: 'A'
}
const courseStatus = [
  { Status: 'A', Lebel: 'Active' },
  { Status: 'I', Lebel: 'Inactive' }
]
const courseAssetValidator = {
  validator: {
    CourseId: (value = "") => /^\d+\.?\d*$/.test(value),
    AssetType: (value = "") => /^\d+\.?\d*$/.test(value),
    BackingFile: (value = "") => !!value.trim()
  },
  errorMessage: {
    CourseId: "Please select Valid Course",
    AssetType: "Please select Valid Asset-Type",
    BackingFile: "Please fill valid Question"
  }
}

export default function AddCourseAssetPopup({ openImport, setOpenImport, CourseAssetId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [courseAssetData, setCourseAssetData] = useState(initialCourseAsset);
  const { validator, errorMessage } = courseAssetValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCourseAssetData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](courseAssetData[field])
    } else {
      isValid = Object.keys(courseAssetData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && courseAssetData[field]?.length > 0) {
      isValid = validator[field](courseAssetData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allCourseAssetData = useSelector(
    (state: any) => state?.getCourseAsset?.CourseAssetResponse?.data
  )
  useEffect(() => {
    dispatch(getCourseList());
  }, []);

  useEffect(() => {
    if (CourseAssetId > 0) {
      const rowData = allCourseAssetData?.rows?.find((itm) => itm?.CourseAssetId === CourseAssetId);
      console.log("rowData", rowData);
      setCourseAssetData({
        "CourseId": rowData?.CourseId,
        "AssetType": rowData?.AssetType,
        "BackingFile": rowData?.BackingFile,
        "Status": rowData?.Status
      })
    }
  }, [CourseAssetId])

  const CourseListData = useSelector(
    (state: any) => state?.getCourseList?.CourseListResponse?.data
  )
  const AccomodationTypeData = [{ value: 1, type: 'Image' }, { value: 2, type: 'Video' }, { value: 3, type: 'Certificate' }]
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", CourseAssetId);
    if (CourseAssetId > 0) {
      // Update Dispatcher
      dispatch(updateCourseAsset(CourseAssetId, courseAssetData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseAssetData(initialCourseAsset)
          setOpenImport(!openImport);
          dispatch(getCourseAsset(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", courseAssetData)
      // Save Dispatcher
      dispatch(saveCourseAsset(courseAssetData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseAssetData(initialCourseAsset)
          setOpenImport(!openImport);
          dispatch(getCourseAsset(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(CourseAssetId === 0) ? 'Add' : 'Edit'} Course-Asset </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Course</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="EntitysubtypeId"
                    name="CourseId"
                    value={courseAssetData.CourseId}
                    label="Course "
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
                  <InputLabel required id="demo-simple-select-label">AssetType</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="EntitysubtypeId"
                    name="AssetType"
                    value={courseAssetData.AssetType}
                    label="AssetType "
                    placeholder="AssetType "
                    sx={{ width: '100%' }}
                    size="small"
                    onChange={handleChange}
                    error={!fieldValidate("AssetType")}
                    required
                  >{
                      AccomodationTypeData?.length > 0
                      && AccomodationTypeData?.map((item) => (<MenuItem value={item?.value}>{item?.type}</MenuItem>))
                    }
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">BackingFile</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={courseAssetData.BackingFile}
                    name="BackingFile"
                    error={!fieldValidate("BackingFile")}
                    helperText={handleErrorMessage("BackingFile")}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="Status"
                    name="Status"
                    value={courseAssetData.Status}
                    placeholder="Status "
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      courseStatus?.length > 0
                      && courseStatus?.map((item) => (<MenuItem value={item?.Status}>{item?.Lebel}</MenuItem>))
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
                {(CourseAssetId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
