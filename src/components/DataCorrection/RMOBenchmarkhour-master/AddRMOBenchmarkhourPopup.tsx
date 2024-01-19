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
import { CreateRMOBenchmarkhour, EditRMOBenchmarkhour, getRMOBenchmarkhour } from "src/store/actions/RMOBenchmarkhourAction";
import { getRMORegcarCodeList } from "src/store/actions/RMOProgressionAction";
import toast from "react-hot-toast";

const EditRMOBenchmarkhourPopup = ({ openEdit, setOpenEdit, bmregcar_Id, regcar_code, benchmar_kHPW,
  benchmar_kHPD, benchmar_kDPW, benchmar_kFN, editFlag, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [bmregcarId, setBmregcarId] = useState(bmregcar_Id);
  const [regcarcode, setRegcarcode] = useState(regcar_code);
  const [benchmarkHPW, setBenchmarkHPW] = useState(benchmar_kHPW);
  const [benchmarkHPD, setBenchmarkHPD] = useState(benchmar_kHPD);
  const [benchmarkDPW, setBenchmarkDPW] = useState(benchmar_kDPW);
  const [benchmarkFN, setBenchmarkFN] = useState(benchmar_kFN);
  const [message, setIsMessage] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(!editFlag);
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
      const fetchedData = await dispatch(EditRMOBenchmarkhour(bmregcarId, regcarcode, benchmarkHPW, benchmarkHPD,
        benchmarkDPW, benchmarkFN));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateRMOBenchmarkhour(regcarcode, benchmarkHPW, benchmarkHPD,
        benchmarkDPW, benchmarkFN));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }

    dispatch(getRMOBenchmarkhour(page, limit)).then(() => setIsLoading(false));

    setOpenEdit(!openEdit)
    if (!error) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  useEffect(() => {
    dispatch(getRMORegcarCodeList());
  }, []);

  const RMOPRegCodeData = useSelector(
    (state: any) => state?.getRegCodeList?.RMOPRegCodeResponse?.data
  )

  const checks = () => {
    let value = true
    if (regcarcode && benchmarkHPW && benchmarkHPD && benchmarkDPW && benchmarkFN && benchmarkFN !== "Select") {
      value = false
    } else {
      value = true
    }
    return value
  }
  const benchmarkFunc = [
    {
      value: "Select",
      label: "Select",
    },
    {
      value: "Min",
      label: "Min",
    },
    {
      value: "Max",
      label: "Max",
    },
  ]

  return (
    <div>
      <Dialog open={openEdit} maxWidth="md" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit RMOBenchmarkhour" : "Add RMOBenchmarkhour"}</h2>
          {message ? <><Alert severity={alertType}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">RegcarTitle</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={regcarcode}
                  inputProps={{ maxLength: 12 }}
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    setRegcarcode(e.target.value);
                  }}
                  SelectProps={{ native: true }}
                >
                  {regcarcode === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(RMOPRegCodeData).length > 0 && RMOPRegCodeData.map((option) => (
                    <option key={option.RegcarCode} value={option.RegcarCode}>
                      {option.RegcarTitle}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">BenchmarkHPW</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={benchmarkHPW}
                  inputProps={{ maxLength: 12 }}
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    setBenchmarkHPW(e.target.value)
                  }}
                  helperText="Required number"
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">BenchmarkHPD</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={benchmarkHPD}
                  inputProps={{ maxLength: 12 }}
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    setBenchmarkHPD(e.target.value)
                  }}
                  helperText="Required number"
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">BenchmarkDPW</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={benchmarkDPW}
                  inputProps={{ maxLength: 12 }}
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    setBenchmarkDPW(e.target.value)
                  }}
                  helperText="Required number"
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">BenchmarkFN</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  select
                  variant="outlined"
                  size="small"
                  value={benchmarkFN}
                  sx={{ width: '100%' }}
                  onChange={(e) => {
                    setBenchmarkFN(e.target.value)
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {benchmarkFunc.map((option) => (
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
                  disabled={checks()}
                  color="primary"
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
export { EditRMOBenchmarkhourPopup }