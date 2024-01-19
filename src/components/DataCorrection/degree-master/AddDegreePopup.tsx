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
  Color,
  InputLabel
} from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from "src/store";
import { CreateDegreeMaster, EditDegreeMaster, getDegreeMaster } from "src/store/actions/getMasterDegreeAction";
import toast from "react-hot-toast";

const EditDegreePopup = ({ openEdit, setOpenEdit, degree_Id, degree_Name, is_Deleted, editFlag, page_no, limit_no, }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [degreeId, setDegreeId] = useState(degree_Id);
  const [degreeName, setDegreeName] = useState(degree_Name);
  const [isDeleted, setIsDeleted] = useState(is_Deleted);
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
      const fetchedData = await dispatch(EditDegreeMaster(degreeId, degreeName, isDeleted));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateDegreeMaster(degreeName, isDeleted));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getDegreeMaster(page + 1, limit)).then(() => setIsLoading(false));
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(error)
    }
  }
  const isDegreeInput = [
    {
      value: "Select",
      label: "Select",
    },
    {
      value: 1,
      label: 1,
    },
    {
      value: 0,
      label: 0,
    },
  ]

  const degreeNameFun = (e) => {
    setDegreeName(e.target.value);
    if (e.target.value) {
      const regex = /^[a-zA-Z].*/;
      if (regex.test(e.target.value.charAt(0))) {
        setIsMessage(false);
      } else {
        displayMessage({ type: 'warning' as unknown as Color, message: 'First Character of DegreeName not start with numeric' });
      }
    } else {
      setIsMessage(false);
    }
  }
  // submit Button On  
  const check = () => {
    let value = true
    if (!message && degreeName && degreeName.length > 2 && isDeleted && isDeleted !== "Select") {
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
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Degree Master" : "Add Degree Master"}</h2>
          {message ? <><Alert severity={MessageObj?.type}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">DegreeName</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={degreeName}
                  sx={{ width: '100%' }}
                  onChange={(e) => degreeNameFun(e)}
                  helperText="DegreeName length should be greater than 2"
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">IsDeleted</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  select
                  variant="outlined"
                  type="number"
                  size="small"
                  value={isDeleted}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setIsDeleted(e.target.value)}
                  SelectProps={{ native: true }}
                  helperText="Please Select [ 0 or 1 ]"
                >
                  {isDegreeInput.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
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
export { EditDegreePopup }