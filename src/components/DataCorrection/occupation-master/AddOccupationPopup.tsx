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
import { CreateOccupationMaster, EditOccupationMaster, getOccupationMaster } from "src/store/actions/getMasterOccupationAction";
import toast from "react-hot-toast";

const EditOccupationPopup = ({ openEdit, setOpenEdit, onetsoc_Code, onetsoc_Title, onetsoc_Desc, editFlag, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [onetsocCode, setOnetsocCode] = useState(onetsoc_Code);
  const [onetsocTitle, setOnetsocTitle] = useState(onetsoc_Title);
  const [onetsocDesc, setOnetsocDesc] = useState(onetsoc_Desc);
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
      const fetchedData = await dispatch(EditOccupationMaster(onetsocCode, onetsocTitle, onetsocDesc));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateOccupationMaster(onetsocCode, onetsocTitle, onetsocDesc));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getOccupationMaster(page + 1, limit)).then(() => setIsLoading(false));

    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  const check = () => {
    let value = true
    if (onetsocCode && onetsocCode?.length > 1 && onetsocTitle && onetsocTitle?.length > 2 && onetsocDesc && onetsocDesc?.length > 2) {
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
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Occupation Master" : "Add Occupation Master"}</h2>
          {message ? <><Alert severity="success"><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">OnetsocCode</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={onetsocCode}
                  sx={{ width: '100%' }}
                  onChange={(e) => setOnetsocCode(e.target.value)}
                  helperText="OnetsocCode length should be greater than 1"
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">OnetsocTitle</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={onetsocTitle}
                  sx={{ width: '100%' }}
                  onChange={(e) => setOnetsocTitle(e.target.value)}
                  helperText="OnetsocTitle length should be greater than 2"
                />
              </Grid>
              <Grid item md={12}>
                <InputLabel required id="demo-simple-label">OnetsocDesc</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  multiline={true}
                  rows="4"
                  size="small"
                  value={onetsocDesc}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setOnetsocDesc(e.target.value)}
                  helperText="OnetsocDesc length should be greater than 2"
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
export { EditOccupationPopup }