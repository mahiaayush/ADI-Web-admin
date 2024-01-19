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
import { getTaskstmtMaster, saveTaskstmtMaster, updateTaskstmtMaster } from "src/store/actions/TaskstmtAction";
import { getOccupationMasterList } from "src/store/actions/getMasterOccupationAction";

const initialTaskstmtMaster = {
  OnetsocCode: "",
  TaskTitle: "",
  TaskType: "",
}
const taskstmtMasterValidator = {
  validator: {
    OnetsocCode: (value = "") => value?.trim()?.length > 2,
    TaskTitle: (value = "") => value?.trim()?.length > 2,
    TaskType: (value = "") => value?.trim()?.length > 1,
  },
  errorMessage: {
    OnetsocCode: "Please fill Code",
    TaskTitle: "Please fill Title",
    TaskType: "Please fill Type",
  }
}

export default function AddTaskstmtMasterPopup({ openImport, setOpenImport, TaskstmtId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [taskstmtMasterData, setTaskstmtMasterData] = useState(initialTaskstmtMaster);
  const { validator, errorMessage } = taskstmtMasterValidator;
  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setTaskstmtMasterData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](taskstmtMasterData[field])
    } else {
      isValid = Object.keys(taskstmtMasterData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && taskstmtMasterData[field]?.length > 0) {
      isValid = validator[field](taskstmtMasterData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allTaskstmtMasterData = useSelector(
    (state: any) => state?.getTaskstmlMaster?.TaskstmlMasterResponse?.data
  )
  useEffect(() => {
    if (TaskstmtId > 0) {
      const rowData = allTaskstmtMasterData?.rows?.find((itm) => itm?.TaskstmtId === TaskstmtId);
      setTaskstmtMasterData({
        OnetsocCode: rowData?.OnetsocCode,
        TaskTitle: rowData?.TaskTitle,
        TaskType: rowData?.TaskType,
      })
    }
  }, [TaskstmtId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (TaskstmtId > 0) {
      // Update Dispatcher
      dispatch(updateTaskstmtMaster(TaskstmtId, taskstmtMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setTaskstmtMasterData(initialTaskstmtMaster)
          setOpenImport(!openImport);
          dispatch(getTaskstmtMaster(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveTaskstmtMaster(taskstmtMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setTaskstmtMasterData(initialTaskstmtMaster)
          setOpenImport(!openImport);
          dispatch(getTaskstmtMaster(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }
  useEffect(() => {
    dispatch(getOccupationMasterList());
  }, []);

  const OccupationMasterListData = useSelector(
    (state: any) => state?.getOccupationMasterList?.OccupationListResponse?.data
  )
  return (
    <div id="dsdds">
      <Dialog open={openImport} fullWidth={true} maxWidth="md">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(TaskstmtId === 0) ? 'Add' : 'Edit'} Task Statment Master </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">OnetsocTitle</InputLabel>
                  <TextField
                    select
                    required
                    id="OnetsocCode"
                    name="OnetsocCode"
                    value={taskstmtMasterData.OnetsocCode}
                    onChange={handleChange}
                    error={!fieldValidate("OnetsocCode")}
                    helperText={handleErrorMessage("OnetsocCode")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    SelectProps={{ native: true }}
                  >
                    {taskstmtMasterData.OnetsocCode === "" ? <option key="select" selected>{" "}</option> : null}
                    {OccupationMasterListData?.length > 0 && OccupationMasterListData.map((option) => (
                      <option key={option.OnetsocCode} value={option.OnetsocCode}>
                        {option.OnetsocTitle}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Task Title</InputLabel>
                  <TextField
                    id="TaskTitle"
                    name="TaskTitle"
                    value={taskstmtMasterData.TaskTitle}
                    onChange={handleChange}
                    error={!fieldValidate("TaskTitle")}
                    helperText={handleErrorMessage("TaskTitle")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Task-Type</InputLabel>
                  <TextField
                    id="TaskType"
                    name="TaskType"
                    value={taskstmtMasterData.TaskType}
                    onChange={handleChange}
                    error={!fieldValidate("TaskType")}
                    helperText={handleErrorMessage("TaskType")}
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
                {(TaskstmtId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
