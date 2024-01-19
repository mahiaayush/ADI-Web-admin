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
import { getAccrediationMaster, saveAccrediationMaster, updateAccrediationMaster } from "src/store/actions/AccrediationAction";

const initialAccrediationMaster = {
  AccrediationTitle: ''
}
const accrediationMasterValidator = {
  validator: {
    AccrediationTitle: (value = "") => value.trim().length >= 2
  },
  errorMessage: {
    AccrediationTitle: "Please fill valid Accrediation Title"
  }
}

export default function AddAccrediationMasterPopup({ openImport, setOpenImport, AccrediationId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accrediationMasterData, setAccrediationMasterData] = useState(initialAccrediationMaster);
  const { validator, errorMessage } = accrediationMasterValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setAccrediationMasterData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](accrediationMasterData[field])
    } else {
      isValid = Object.keys(accrediationMasterData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && accrediationMasterData[field]?.length > 0) {
      isValid = validator[field](accrediationMasterData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allAccrediationMasterData = useSelector(
    (state: any) => state?.getAccrediationMaster?.AccrediationMasterResponse?.data
  )
  console.log("allAccrediationMasterData ==>", allAccrediationMasterData, AccrediationId)
  useEffect(() => {
    if (AccrediationId > 0) {
      const rowData = allAccrediationMasterData?.rows?.find((itm) => itm?.AccrediationId === AccrediationId);
      console.log("rowData", rowData);
      setAccrediationMasterData({
        "AccrediationTitle": rowData?.AccrediationTitle,
      })
    }
  }, [AccrediationId])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", AccrediationId);
    if (AccrediationId > 0) {
      // Update Dispatcher
      dispatch(updateAccrediationMaster(AccrediationId, accrediationMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setAccrediationMasterData(initialAccrediationMaster)
          setOpenImport(!openImport);
          dispatch(getAccrediationMaster(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", accrediationMasterData)
      // Save Dispatcher
      dispatch(saveAccrediationMaster(accrediationMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setAccrediationMasterData(initialAccrediationMaster)
          setOpenImport(!openImport);
          dispatch(getAccrediationMaster(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(AccrediationId === 0) ? 'Add' : 'Edit'} AccrediationMaster </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <InputLabel required id="demo-simple-select-label">Title</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={accrediationMasterData.AccrediationTitle}
                    name="AccrediationTitle"
                    error={!fieldValidate("AccrediationTitle")}
                    helperText={handleErrorMessage("AccrediationTitle")}
                    onChange={handleChange}
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
                {(AccrediationId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
