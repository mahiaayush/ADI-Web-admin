import * as React from "react";
import {
  DialogContent,
  Grid,
  TextField,
  Button,
  Dialog,
  Alert,
  Color,
  InputLabel,
} from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from "src/store";
import { CreateEventType, EditEventType, getEventType } from "src/store/actions/getEventTypeAction";
import toast from "react-hot-toast";

const EventTypePopup = ({ openEdit, setOpenEdit, eventtype_Id, eventtype_Name, editFlag, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [eventtypeId, setEventtypeId] = useState(eventtype_Id);
  const [eventtypeName, setEventtypeName] = useState(eventtype_Name);
  const [message, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: null,
    message: ''
  })

  const displayMessage = (obj: { type: Color, message: string }) => {
    setMessage(obj)
    setIsMessage(true);
    setTimeout(() => { setIsMessage(false) }, 5000);
  }

  const submitData = async () => {
    let data; let message; let error;

    if (editFlag) {
      const fetchedData = await dispatch(EditEventType(eventtypeId, eventtypeName));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateEventType(eventtypeName));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getEventType(page, limit)).then(() => setIsLoading(false));
    if (!error) {
      setOpenEdit(!openEdit);
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  const eventTypeName = (e) => {
    setEventtypeName(e.target.value);
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
    if (!message && eventtypeName && eventtypeName.length >= 4) {
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
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Event Type" : "Add Event type"}</h2>
          {message ? <><Alert severity={MessageObj?.type}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={12}>
                <InputLabel required id="demo-simple-label">EventtypeName</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={eventtypeName}
                  sx={{ width: '100%' }}
                  onChange={(e) => eventTypeName(e)}
                  helperText="EventTypeName Chararacter >= 4"
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
export { EventTypePopup }