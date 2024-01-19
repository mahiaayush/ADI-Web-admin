import * as React from "react";
import {
  DialogContent,
  Grid,
  TextField,
  Button,
  Dialog,
  Alert,
  InputLabel,
} from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from "src/store";
import { CreateExamTypeMaster, EditExamTypeMaster, getExamTypeMaster } from "src/store/actions/getExamTypeAction";
import toast from "react-hot-toast";
import { Color } from "../CourseSectionCorrection";

const EditExamTypePopup = ({ openEdit, setOpenEdit, examType_Id, examType_Name, editFlag, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [examTypeId, setExamTypeId] = useState(examType_Id);
  const [examTypeName, setExamTypeName] = useState(examType_Name);
  const [message, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: null,
    message: ''
  })

  const displayMessage = (obj: { type: Color, message: string }) => {
    setMessage(obj)
    setIsMessage(true);
  }

  const submitData = async () => {
    let data; let message; let error;

    if (editFlag) {
      const fetchedData = await dispatch(EditExamTypeMaster(examTypeId, examTypeName));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateExamTypeMaster(examTypeName));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getExamTypeMaster(page, limit)).then(() => setIsLoading(false));
    
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  const ExamTypeName = (e) => {
    setExamTypeName(e.target.value);
    if (e.target.value) {
      const regex = /^[a-zA-Z].*/;
      if (regex.test(e.target.value.charAt(0))) {
        setIsMessage(false);
      } else {
        displayMessage({ type: 'warning' as unknown as Color, message: 'First Character not start with numeric' });
      }
    } else {
      setIsMessage(false);
    }
  }

  const check = () => {
    let value = true
    if (!message && examTypeName && examTypeName?.length > 2) {
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
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Exam Type Master" : "Add Exam Type Master"}</h2>
          {message ? <><Alert severity={MessageObj?.type}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={12}>
                <InputLabel required id="demo-simple-label">ExamTypeName</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={examTypeName}
                  sx={{ width: '100%' }}
                  onChange={(e) => ExamTypeName(e)}
                  helperText="ExamTypeName length should be greater than 2"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
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
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}
export { EditExamTypePopup }