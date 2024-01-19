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
import { CreateOccupationSalary, EditOccupationSalary, getOccupationSalary } from "src/store/actions/OccupationSalaryAction";
import { getRMORegcarCodeList } from "src/store/actions/RMOProgressionAction";
import toast from "react-hot-toast";

const AddOccupationSalaryPopup = ({ openEdit, setOpenEdit, salregcar_Id, regcar_Code, salregcar_Fn, salregcar_Val, editFlag, Page_n, limit_page, }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(Page_n);
  const [limit, setLimit] = useState(limit_page);
  const [isLoading, setIsLoading] = useState(true);
  const [salregcarId, setSalregcarId] = useState(salregcar_Id);
  const [regcarCode, setRegcarCode] = useState(regcar_Code);
  const [salregcarFn, setSalregcarFn] = useState(salregcar_Fn);
  const [salregcarVal, setSalregcarVal] = useState(salregcar_Val);
  const [message, setIsMessage] = useState(false);
  const [alertType, setAlertType] = useState(null);
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
      const fetchedData = await dispatch(EditOccupationSalary(salregcarId, regcarCode, salregcarFn, salregcarVal));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateOccupationSalary(regcarCode, salregcarFn, salregcarVal));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getOccupationSalary(page + 1, limit)).then(() => setIsLoading(false));
    setOpenEdit(!openEdit)
    if (!error) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  const salregcarFnInput = [
    {
      value: "Select",
      label: "Select"
    },
    {
      value: "E",
      label: "E"
    },
    {
      value: "M",
      label: "M"
    },
    {
      value: "S",
      label: "S"
    }
  ]
  const checks = () => {
    let value = true
    if (regcarCode && salregcarFn && salregcarFn !== "Select" && salregcarVal) {
      value = false
    } else {
      value = true
    }
    return value
  }
  useEffect(() => {
    dispatch(getRMORegcarCodeList());
  }, []);
  const RegcarCodeListData = useSelector(
    (state: any) => state?.getRegCodeList?.RMOPRegCodeResponse?.data
  )

  return (
    <div>
      <Dialog open={openEdit} maxWidth="sm" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Occupation Salary" : "Add Occupation Salary"}</h2>
          {message ? <><Alert severity={alertType}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>
            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6} sx={{ marginBottom: '20px' }}>
                <InputLabel required id="demo-simple-select-label">RegcarTitle</InputLabel>
                <TextField
                  id="RegcarTitle"
                  select
                  value={regcarCode}
                  sx={{ width: '100%' }}
                  size="small"
                  onChange={(e) => setRegcarCode(e.target.value)}
                  SelectProps={{ native: true, }}
                >
                  {regcarCode === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(RegcarCodeListData).length > 0 && RegcarCodeListData.map((option) => (
                    <option key={option.RegcarTitle} value={option.RegcarCode}>
                      {option.RegcarTitle}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-select-label">SalregcarFn</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  select
                  variant="outlined"
                  size="small"
                  value={salregcarFn}
                  sx={{ width: '100%' }}
                  onChange={(e) => setSalregcarFn(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select your salregcarFn"
                >
                  {salregcarFnInput.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-select-label">SalregcarVal</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={salregcarVal}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setSalregcarVal(e.target.value)}
                  helperText="Required a number"
                />
              </Grid>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  sx={{ float: 'right' }}
                  onClick={() => submitData()}
                  disabled={checks()}
                >
                  {editFlag ? 'Update' : 'Save'}
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
export { AddOccupationSalaryPopup }