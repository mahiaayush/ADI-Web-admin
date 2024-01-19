import * as React from "react";
import {
  DialogContent,
  Grid,
  TextField,
  Button,
  Dialog,
  Alert,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "src/store";
import { CreateEntityCourses, EditEntityCourses, getCourseModeListApi, getEntityCourses } from "src/store/actions/getEntityCoursesAction";
import { getMasterEntityList } from "src/store/actions/getMasterEntityAction";
import toast from "react-hot-toast";
import { getCourseMasterList } from "src/store/actions/CourseMasterAction";

const EntityCoursesPopup = ({ openEdit, setOpenEdit, entitycourse_Id, entity_Id, course_Id, course_Fee,
  coursemode_Id, admission_Criteria, editFlag, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [entitycourseId, setEntitycourseId] = useState(entitycourse_Id);
  const [entityId, setEntityId] = useState(entity_Id);
  const [courseId, setCourseId] = useState(course_Id);
  const [courseFee, setCourseFee] = useState(course_Fee);
  const [coursemodeId, setCoursemodeId] = useState(coursemode_Id);
  const [admissionCriteria, setAdmissionCriteria] = useState(admission_Criteria);
  const [message, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: 'success',
    message: ''
  })

  const displayMessage = (obj: { type: string, message: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }

  const submitData = async () => {
    let data; let message; let error;

    if (editFlag) {
      const fetchedData = await dispatch(EditEntityCourses(entitycourseId, entityId, courseId, courseFee,
        coursemodeId, admissionCriteria));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateEntityCourses(entityId, courseId, courseFee,
        coursemodeId, admissionCriteria));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getEntityCourses(page + 1, limit)).then(() => setIsLoading(false));
    
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  useEffect(() => {
    dispatch(getCourseMasterList());
    dispatch(getCourseModeListApi());
    dispatch(getMasterEntityList());
  }, [])

  const CourseMasterListData = useSelector(
    (state: any) => state?.getCourseMasterList?.CourseMasterListResponse?.data
  )
  const CourseModeListData = useSelector(
    (state: any) => state?.getCourseModeList?.courseModeListResponse?.data
  )
  const EntityIdListData = useSelector(
    (state: any) => state?.getMasterEntityList?.masterEntityResponse?.data
  )

  // submit Button On/Off  
  const check = () => {
    let value = true
    if (entityId && courseId && courseFee && coursemodeId && admissionCriteria) {
      value = false
    } else {
      value = true
    }
    return value
  }

  return (
    <div>
      <Dialog open={openEdit} maxWidth="md" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Entity Course" : "Add Entity Course"}</h2>
          {message ? <><Alert severity="success"><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">EntityName</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setEntityId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {entityId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(EntityIdListData).length > 0 && EntityIdListData.map((option) => (
                    <option key={option.EntityId} value={option.EntityId}>
                      {option.EntityName}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">CourseTitle</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={courseId}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setCourseId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {courseId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(CourseMasterListData).length > 0 && CourseMasterListData.map((option) => (
                    <option key={option.CourseId} value={option.CourseId}>
                      {option.CourseTitle}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">CourseFee</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={courseFee}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setCourseFee(e.target.value)}
                  helperText="Required number"
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">Coursemode</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={coursemodeId}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setCoursemodeId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {coursemodeId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(CourseModeListData).length > 0 && CourseModeListData.map((option) => (
                    <option key={option.CoursemodeId} value={option.CoursemodeId}>
                      {option.CoursemodeName}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">AdmissionCriteria</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={admissionCriteria}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setAdmissionCriteria(e.target.value)}
                />
              </Grid>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  sx={{ float: 'right' }}
                  onClick={() => submitData()}
                  disabled={check()}
                >
                  {editFlag ? "Update" : "Save"}
                </Button>
              </Grid>
            </Grid>
            {/* <Grid container spacing={2}>
              
            </Grid> */}
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}
export { EntityCoursesPopup }