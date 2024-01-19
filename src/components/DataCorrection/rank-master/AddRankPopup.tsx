import * as React from "react";
import {
  DialogContent,
  Grid,
  TextField,
  Button,
  Dialog,
  Alert,
  Color,
  InputLabel
} from '@material-ui/core'
import { useState } from 'react'
import { useDispatch } from "src/store";
import { CreateRankMaster, EditRankMaster, getRankPages } from '../../../store/actions/getRankAction';
import toast from "react-hot-toast";

const EditRankPopup = ({ openEdit, setOpenEdit, rankorgId, rankorgName, statusValue, editFlag, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(rankorgName);
  const [status, setStatus] = useState(statusValue);
  const [message, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: null,
    message: ''
  })

  const displayMessage = (obj: { type: Color, message: string }) => {
    setIsMessage(true);
    setMessage(obj)
  }

  const submitData = async () => {
    let data; let message; let error;
    if (editFlag) {
      const fetchedData = await dispatch(EditRankMaster(rankorgId, name, status));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateRankMaster(name, status));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getRankPages(page + 1, limit)).then(() => setIsLoading(false));
    setName(null);
    setStatus(null);

    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(data?.message)
    } else {
      toast.error(data?.message)
    }
  }
  const statusInput = [
    {
      value: "Select",
      label: "Select",
    },
    {
      value: "A",
      label: "Active",
    },
    {
      value: "I",
      label: "Inactive",
    },
  ]

  const regcarName = (e) => {
    setName(e.target.value);
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
    if (!message && name && name.length >= 2 && status && status !== "Select") {
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
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => {
            setOpenEdit(!openEdit)
            setName(null);
            setStatus(null);
          }}
          >x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Rank Master" : "Add Rank Master"}</h2>
          {message ? <><Alert severity={MessageObj?.type}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">RankorgName</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={name}
                  sx={{ width: '100%' }}
                  inputProps={{ maxLength: 300 }}
                  onChange={regcarName}
                  helperText="Length < 300"
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
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select your status"
                >
                  {statusInput.map((option) => (
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
export { EditRankPopup }