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
import { getStreamMaster, saveStreamMaster, updateStreamMaster } from "src/store/actions/StreamAction";

const initialStreamMaster = {
  StreamName: ''
}
const subjectMasterValidator = {
  validator: {
    StreamName: (value = "") => value?.trim()?.length > 1
  },
  errorMessage: {
    StreamName: "Please fill Stream Name"
  }
}

export default function AddStreamMasterPopup({ openImport, setOpenImport, StreamId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subjectMasterData, setStreamMasterData] = useState(initialStreamMaster);
  const { validator, errorMessage } = subjectMasterValidator;
  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setStreamMasterData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](subjectMasterData[field])
    } else {
      isValid = Object.keys(subjectMasterData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && subjectMasterData[field]?.length > 0) {
      isValid = validator[field](subjectMasterData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allStreamMasterData = useSelector(
    (state: any) => state?.getStreamMaster?.StreamMasterResponse?.data
  )
  useEffect(() => {
    if (StreamId > 0) {
      const rowData = allStreamMasterData?.rows?.find((itm) => itm?.StreamId === StreamId);
      setStreamMasterData({
        "StreamName": rowData?.StreamName,
      })
    }
  }, [StreamId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (StreamId > 0) {
      // Update Dispatcher
      dispatch(updateStreamMaster(StreamId, subjectMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setStreamMasterData(initialStreamMaster)
          setOpenImport(!openImport);
          dispatch(getStreamMaster(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveStreamMaster(subjectMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setStreamMasterData(initialStreamMaster)
          setOpenImport(!openImport);
          dispatch(getStreamMaster(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }

  return (
    <div id="dsdds">
      <Dialog open={openImport} fullWidth={true} maxWidth="sm">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(StreamId === 0) ? 'Add' : 'Edit'} Stream Master </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <InputLabel required id="demo-simple-select-label">Stream Name</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={subjectMasterData.StreamName}
                    name="StreamName"
                    error={!fieldValidate("StreamName")}
                    helperText={handleErrorMessage("StreamName")}
                    onChange={handleChange}
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
                {(StreamId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
