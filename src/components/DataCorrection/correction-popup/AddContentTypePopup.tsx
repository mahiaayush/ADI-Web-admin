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
import { getContentType, saveContentType, updateContentType } from "src/store/actions/ContentTypeAction";

const initialContentType = {
  ContentTypeTitle: '',
  Status: 'A',
}
const contentStatus = [
  { Status: 'A', Lebel: 'Active' },
  { Status: 'I', Lebel: 'Inactive' }
]
const contentTypeValidator = {
  validator: {
    ContentTypeTitle: (value = "") => !!value.trim(),
    Status: (value = "") => !!value.trim(),
  },
  errorMessage: {
    Status: "Please select Valid Status",
    ContentTypeTitle: "Please fill valid Question"
  }
}

export default function AddContentTypePopup({ openImport, setOpenImport, ContentTypeId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [contentTypeData, setContentTypeData] = useState(initialContentType);
  const { validator, errorMessage } = contentTypeValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setContentTypeData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](contentTypeData[field])
    } else {
      isValid = Object.keys(contentTypeData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && contentTypeData[field]?.length > 0) {
      isValid = validator[field](contentTypeData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allContentTypeData = useSelector(
    (state: any) => state?.getContentType?.ContentTypeResponse?.data
  )

  useEffect(() => {
    if (ContentTypeId > 0) {
      const rowData = allContentTypeData?.rows?.find((itm) => itm?.ContentTypeId === ContentTypeId);
      console.log("rowData", rowData);
      setContentTypeData({
        "ContentTypeTitle": rowData?.ContentTypeTitle,
        "Status": rowData?.Status
      })
    }
  }, [ContentTypeId])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", ContentTypeId);
    if (ContentTypeId > 0) {
      // Update Dispatcher
      dispatch(updateContentType(ContentTypeId, contentTypeData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setContentTypeData(initialContentType)
          setOpenImport(!openImport);
          dispatch(getContentType(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", contentTypeData)
      // Save Dispatcher
      dispatch(saveContentType(contentTypeData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setContentTypeData(initialContentType)
          setOpenImport(!openImport);
          dispatch(getContentType(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(ContentTypeId === 0) ? 'Add' : 'Edit'} Content-Type </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Content-Type Title</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="ContentTypeTitle"
                    value={contentTypeData.ContentTypeTitle}
                    onChange={handleChange}
                    error={!fieldValidate("ContentTypeTitle")}
                    helperText={handleErrorMessage("ContentTypeTitle")}
                    type="test"
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
                    value={contentTypeData.Status}
                    label="Status "
                    placeholder="Status "
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      contentStatus?.length > 0
                      && contentStatus?.map((item) => (<MenuItem value={item?.Status}>{item?.Lebel}</MenuItem>))
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
                {(ContentTypeId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
