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
import { CreateDisciplineMaster, EditDisciplineMaster, getDisciplineMaster } from '../../../store/actions/getDisciplineAction';
import toast from "react-hot-toast";

const EditDisciplinePopup = ({ openEdit, setOpenEdit, disciplineId, disciplineName, page_no, limit_no, editFlag }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setDisciplineName] = useState(disciplineName);
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
      const fetchedData = await dispatch(EditDisciplineMaster(disciplineId, name));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateDisciplineMaster(name));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getDisciplineMaster(page + 1, limit)).then(() => setIsLoading(false));
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  const disciplineNameFun = (e) => {
    setDisciplineName(e.target.value);
    if (e.target.value) {
      const regex = /^[a-zA-Z].*/;
      if (regex.test(e.target.value.charAt(0))) {
        setIsMessage(false);
      } else {
        displayMessage({ type: 'warning' as unknown as Color, message: 'First Character of Discipline Name not start with numeric' });
      }
    } else {
      setIsMessage(false);
    }
  }
  const check = () => {
    let value = true
    if (!message && name) {
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
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Discipline Master" : "Add Discipline Master"}</h2>
          {message ? <><Alert severity={MessageObj?.type}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={12}>
                <InputLabel required id="demo-simple-label">DisciplineName</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={name}
                  sx={{ width: '100%' }}
                  inputProps={{ maxlength: 80 }}
                  onChange={(e) => disciplineNameFun(e)}
                  helperText="Discipline Name < 80 Characters"
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
export { EditDisciplinePopup }