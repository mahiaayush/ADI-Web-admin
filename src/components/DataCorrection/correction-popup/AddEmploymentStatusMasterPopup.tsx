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
  TextareaAutosize,
  CircularProgress,
  FormHelperText,
  Autocomplete
} from "@material-ui/core";
import type { ChangeEvent } from 'react';
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "src/store";
import toast from "react-hot-toast";
import { getEmploymentStatusMaster, saveEmploymentStatusMaster, updateEmploymentStatusMaster } from "src/store/actions/EmploymentStatusAction";

const initialEmploymentStatusMaster = {
  EmploymentStatusName: ""
}
const taskstmtMasterValidator = {
  validator: {
    EmploymentStatusName: (value = "") => value.trim().length >= 2
  },
  errorMessage: {
    EmploymentStatusName: "Please fill Employment Status Name",
  }
}

export default function AddEmploymentStatusMasterPopup({ openImport, setOpenImport, EmploymentStatusId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [employmentStatusMasterData, setEmploymentStatusMasterData] = useState(initialEmploymentStatusMaster);
  const { validator, errorMessage } = taskstmtMasterValidator;
  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setEmploymentStatusMasterData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](employmentStatusMasterData[field])
    } else {
      isValid = Object.keys(employmentStatusMasterData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && employmentStatusMasterData[field]?.length > 0) {
      isValid = validator[field](employmentStatusMasterData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allEmploymentStatusMasterData = useSelector(
    (state: any) => state?.getEmploymentStatusMaster?.EmploymentStatusMasterResponse?.data
  )
  useEffect(() => {
    if (EmploymentStatusId > 0) {
      const rowData = allEmploymentStatusMasterData?.rows?.find((itm) => itm?.EmploymentStatusId === EmploymentStatusId);
      setEmploymentStatusMasterData({
        EmploymentStatusName: rowData?.EmploymentStatusName
      })
    }
  }, [EmploymentStatusId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (EmploymentStatusId > 0) {
      // Update Dispatcher
      dispatch(updateEmploymentStatusMaster(EmploymentStatusId, employmentStatusMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setEmploymentStatusMasterData(initialEmploymentStatusMaster)
          setOpenImport(!openImport);
          dispatch(getEmploymentStatusMaster(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveEmploymentStatusMaster(employmentStatusMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setEmploymentStatusMasterData(initialEmploymentStatusMaster)
          setOpenImport(!openImport);
          dispatch(getEmploymentStatusMaster(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }

  return (
    <div id="dsdds">
      <Dialog open={openImport} fullWidth={true} maxWidth="sm">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(EmploymentStatusId === 0) ? 'Add' : 'Edit'} Employment Status Master </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <InputLabel required id="demo-simple-select-label">Employment Status Name</InputLabel>
                  <TextField
                    id="EmploymentStatusName"
                    name="EmploymentStatusName"
                    value={employmentStatusMasterData.EmploymentStatusName}
                    onChange={handleChange}
                    error={!fieldValidate("EmploymentStatusName")}
                    helperText={handleErrorMessage("EmploymentStatusName")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
              </Grid>

              <Button
                sx={{ mt: 2, float: 'right' }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(EmploymentStatusId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
