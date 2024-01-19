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
import { CreateOccupationExpenses, EditOccupationExpenses, getOccupationExpenses } from "src/store/actions/OccupationExpensesAction";
import { getRMORegcarCodeList } from "src/store/actions/RMOProgressionAction";
import toast from "react-hot-toast";

const EditOccupationExpensesPopup = ({ openEdit, setOpenEdit, examregcar_Id, regcar_Code, expregcar_Fn, expregcar_Val,
  editFlag, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [examregcarId, setExamregcarId] = useState(examregcar_Id);
  const [regcarCode, setRegcarCode] = useState(regcar_Code);
  const [expregcarFn, setExpregcarFn] = useState(expregcar_Fn);
  const [expregcarVal, setExpregcarVal] = useState(expregcar_Val);
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
      const fetchedData = await dispatch(EditOccupationExpenses(examregcarId, regcarCode, expregcarFn, expregcarVal));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateOccupationExpenses(regcarCode, expregcarFn, expregcarVal));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getOccupationExpenses(page, limit)).then(() => setIsLoading(false));

    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  const expregcarFunc = [
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

  useEffect(() => {
    dispatch(getRMORegcarCodeList());
  }, []);

  const RMOPRegCodeData = useSelector(
    (state: any) => state?.getRegCodeList?.RMOPRegCodeResponse?.data
  )
  const check = () => {
    let value = true
    if (regcarCode && expregcarFn && expregcarFn !== "Select" && expregcarVal) {
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
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Occupation Expenses" : "Add Occupation Expenses"}</h2>
          {message ? <><Alert severity={alertType}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-select-label">RegcarCode</InputLabel>
                <TextField
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={regcarCode}
                  sx={{ width: '100%' }}
                  onChange={(e) => setRegcarCode(e.target.value)}
                  SelectProps={{ native: true }}
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
                <InputLabel required id="demo-simple-select-label">ExpregcarFn</InputLabel>
                <TextField
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={expregcarFn}
                  sx={{ width: '100%' }}
                  onChange={(e) => setExpregcarFn(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {expregcarFunc.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-select-label">ExpregcarVal</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={expregcarVal}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setExpregcarVal(e.target.value)}
                  helperText="Required numeric type Input"
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
export { EditOccupationExpensesPopup }