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
import { useState } from 'react'
import { useDispatch } from "src/store";
import { CreateAccomodationType, EditAccomodationType, getAccomodationType } from "src/store/actions/AccomodationTypeAction";
import toast from "react-hot-toast";

const EditAccomodationTypePopup = ({ openEdit, setOpenEdit, amType_Id, amtype_Name, editFlag, Page_n, limit_page }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(Page_n);
  const [limit, setLimit] = useState(limit_page);
  const [isLoading, setIsLoading] = useState(true);
  const [amTypeId, setAmTypeId] = useState(amType_Id);
  const [amtypeName, setAmtypeName] = useState(amtype_Name);
  const [message, setIsMessage] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(!editFlag);
  const [MessageObj, setMessage] = useState({
    type: 'success',
    message: ''
    // deiails: { Inserted: 0, Updated: 0, ErrorInRow: 0, ErrorMessage: '' }
  })

  const displayMessage = (obj: { type: string, message: string }) => {
    setMessage(obj)
    setIsMessage(true);
    setTimeout(() => { setIsMessage(false) }, 5000);
  }

  const submitData = async () => {
    let data; let message; let error;
    console.log("edit flag----->", editFlag);

    if (editFlag) {
      const fetchedData = await dispatch(EditAccomodationType(amTypeId, amtypeName));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateAccomodationType(amtypeName));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getAccomodationType(page + 1, limit)).then(() => setIsLoading(false));
    console.log("return data", data, "message", message, "error----->", error);
    if (!error) {
      setOpenEdit(!openEdit);
      toast.success(message)
    } else {
      toast.error(error)
    }
  }
  const amtypeNameEdit = (e) => {
    setAmtypeName(e.target.value);
    if (e.target.value) {
      const regex = /^[a-zA-Z].*/;
      if (regex.test(e.target.value.charAt(0))) {
        setIsMessage(false);
        if (e.target.value.length >= 6 && e.target.value.length <= 12) {
          setButtonDisabled(false)
        } else {
          setButtonDisabled(true)
        }
      } else {
        setIsMessage(true);
        setAlertType('warning');
        const obj = {
          type: 'warning',
          message: "First character not start with numerical"
        }
        setMessage(obj)
      }
    } else {
      setIsMessage(false);
    }
  }

  return (
    <div>
      <Dialog open={openEdit} maxWidth="sm" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Accomodation Type" : "Add Accomodation Type"}</h2>
          {message ? <><Alert severity={alertType}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={12}>
                <InputLabel required id="demo-simple-label">AmtypeName</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={amtypeName}
                  inputProps={{ maxLength: 12 }}
                  sx={{ width: '100%' }}
                  onChange={(e) => amtypeNameEdit(e)}
                  helperText="Length between 6 & 12"
                />
              </Grid>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  sx={{ float: 'right' }}
                  onClick={() => submitData()}
                  disabled={buttonDisabled}
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
export { EditAccomodationTypePopup }