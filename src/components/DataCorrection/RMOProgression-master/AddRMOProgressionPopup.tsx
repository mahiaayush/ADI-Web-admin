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
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "src/store";
import { CreateRMOProgression, EditRMOProgression, getRMOProgression, getRMORegcarCodeList } from "src/store/actions/RMOProgressionAction";
import toast from "react-hot-toast";

const EditRMOProgressionPopup = ({ openEdit, setOpenEdit, bmregcar_Id, regcar_code, benchmar_kHPW,
  benchmar_kHPD, Page_n, limit_page, editFlag }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(Page_n);
  const [limit, setLimit] = useState(limit_page);
  const [isLoading, setIsLoading] = useState(true);
  const [progregcarId, setProgregcarId] = useState(bmregcar_Id);
  const [regcarCode, setRegcarCode] = useState(regcar_code);
  const [progPath, setProgPath] = useState(benchmar_kHPW);
  const [progOrder, setProgOrder] = useState(benchmar_kHPD);
  const [message, setIsMessage] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [MessageObj, setMessage] = useState({
    type: 'success',
    message: ''
    // deiails: { Inserted: 0, Updated: 0, ErrorInRow: 0, ErrorMessage: '' }
  })

  const displayMessage = (obj: { type: string, message: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }

  const submitData = async () => {
    let data; let message; let error;
    if (editFlag) {
      const fetchedData = await dispatch(EditRMOProgression(progregcarId, regcarCode, progPath, progOrder));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateRMOProgression(regcarCode, progPath, progOrder));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getRMOProgression(page + 1, limit)).then(() => setIsLoading(false));
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  const checks = () => {
    let value = true
    if (regcarCode && progPath > 0 && progOrder > 0 && progOrder <= 127) {
      value = false
    } else {
      value = true
    }
    return value
  }
  useEffect(() => {
    dispatch(getRMORegcarCodeList());
  }, []);

  const RMOPRegCodeData = useSelector(
    (state: any) => state?.getRegCodeList?.RMOPRegCodeResponse?.data
  )
  return (
    <div>
      <Dialog open={openEdit} maxWidth="sm" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit RMOProgression" : "Add RMOProgression"}</h2>
          {message ? <><Alert severity={alertType} style={{ wordBreak: 'break-all' }}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-select-label">RegcarTitle</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  select
                  size="small"
                  value={typeof regcarCode === null ? "" : regcarCode}
                  inputProps={{ maxLength: 12 }}
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    setRegcarCode(e.target.value);
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {regcarCode === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(RMOPRegCodeData).length > 0 && RMOPRegCodeData.map((option) => (
                    <option key={option.RegcarCode} value={option.RegcarCode}>
                      {option.RegcarTitle}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-select-label">ProgPath</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={progPath}
                  type="number"
                  inputProps={{ maxLength: 12 }}
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    setProgPath(e.target.value)
                  }}
                  helperText="Required number"
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-select-label">ProgOrder</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={progOrder}
                  inputProps={{ maxLength: 4 }}
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    setProgOrder(e.target.value)
                  }}
                  helperText="Required number <= 127"
                />
              </Grid>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  sx={{ float: 'right' }}
                  onClick={() => submitData()}
                  disabled={checks()}
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
export { EditRMOProgressionPopup }