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
import { CreateCollegeEventMaster, EditCollegeEventMaster, getCollegeEventMaster } from "src/store/actions/getCollegeEventAction";
import { getMasterCollegeEntityList, getMasterEntityList } from "src/store/actions/getMasterEntityAction";
import toast from "react-hot-toast";

const EditCollegeEventPopup = ({ openEdit, setOpenEdit, collegeEvent_Id, entityCollege_Id, collegeEvent_Heading,
  Status, editFlag, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [collegeEventId, setCollegeEventId] = useState(collegeEvent_Id);
  const [entityCollegeId, setEntityCollegeId] = useState(entityCollege_Id);
  const [collegeEventHeading, setCollegeEventHeading] = useState(collegeEvent_Heading);
  const [status, setStatus] = useState(Status);
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
    console.log("edit flag----->", editFlag);

    if (editFlag) {
      const fetchedData = await dispatch(EditCollegeEventMaster(collegeEventId, entityCollegeId, collegeEventHeading,
        status));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateCollegeEventMaster(collegeEventId, entityCollegeId, collegeEventHeading,
        status));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getCollegeEventMaster(page, limit)).then(() => setIsLoading(false));
    console.log("return data", data, "message", message, "error----->", error);
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  useEffect(() => {
    dispatch(getMasterCollegeEntityList()).then(() => setIsLoading(false));
  }, [])

  const EntityListData = useSelector(
    (state: any) => state?.getMasterCollegeList?.collegeEntityListResponse?.data
  )
  const statusValue = [
    {
      value: 'Select',
      label: 'Select'
    },
    {
      value: 'A',
      label: 'Active'
    },
    {
      value: 'I',
      label: 'Inactive'
    }
  ]
  const checks = () => {
    let value = true
    if (entityCollegeId && collegeEventHeading && collegeEventHeading?.length > 2 && status && status !== "Select") {
      value = false
    } else {
      value = true
    }
    return value
  }

  return (
    <div>
      <Dialog open={openEdit} maxWidth="sm" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit College Event Master" : "Add College Event Master"}</h2>
          {message ? <><Alert severity="success"><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">EntityClgId</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  select
                  variant="outlined"
                  size="small"
                  value={entityCollegeId === null ? "" : entityCollegeId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setEntityCollegeId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {entityCollegeId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(EntityListData).length > 0 && EntityListData.map((option) => (
                    <option key={option.EntityClgId} value={option.EntityClgId}>
                      {option.EntityClgId}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">CollegeEventHeading</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={collegeEventHeading}
                  sx={{ width: '100%' }}
                  onChange={(e) => setCollegeEventHeading(e.target.value)}
                  helperText="Length should be greater than 2"
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">Status</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  select
                  variant="outlined"
                  size="small"
                  value={status}
                  sx={{ width: '100%' }}
                  onChange={(e) => setStatus(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {Object.keys(statusValue).length > 0 && statusValue.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  sx={{ float: 'right' }}
                  onClick={() => submitData()}
                  disabled={checks()}
                >
                  {editFlag ? "Update" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}
export { EditCollegeEventPopup }