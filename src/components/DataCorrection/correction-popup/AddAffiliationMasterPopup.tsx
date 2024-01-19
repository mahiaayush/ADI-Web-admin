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
import { getAffiliationMaster, saveAffiliationMaster, updateAffiliationMaster } from "src/store/actions/AffilitionAction";

const initialAffiliationMaster = {
  AffiliationTitle: ''
}
const affiliationMasterValidator = {
  validator: {
    AffiliationTitle: (value = "") => value?.trim()?.length > 1
  },
  errorMessage: {
    AffiliationTitle: "Please fill Affiliation Title"
  }
}

export default function AddAffiliationMasterPopup({ openImport, setOpenImport, AffiliationId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [affiliationMasterData, setAffiliationMasterData] = useState(initialAffiliationMaster);
  const { validator, errorMessage } = affiliationMasterValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setAffiliationMasterData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](affiliationMasterData[field])
    } else {
      isValid = Object.keys(affiliationMasterData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && affiliationMasterData[field]?.length > 0) {
      isValid = validator[field](affiliationMasterData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allAffiliationMasterData = useSelector(
    (state: any) => state?.getAffiliationMaster?.AffiliationMasterResponse?.data
  )
  console.log("allAffiliationMasterData ==>", allAffiliationMasterData, AffiliationId)
  useEffect(() => {
    if (AffiliationId > 0) {
      const rowData = allAffiliationMasterData?.rows?.find((itm) => itm?.AffiliationId === AffiliationId);
      console.log("rowData", rowData);
      setAffiliationMasterData({
        "AffiliationTitle": rowData?.AffiliationTitle,
      })
    }
  }, [AffiliationId])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", AffiliationId);
    if (AffiliationId > 0) {
      // Update Dispatcher
      dispatch(updateAffiliationMaster(AffiliationId, affiliationMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setAffiliationMasterData(initialAffiliationMaster)
          setOpenImport(!openImport);
          dispatch(getAffiliationMaster(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", affiliationMasterData)
      // Save Dispatcher
      dispatch(saveAffiliationMaster(affiliationMasterData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setAffiliationMasterData(initialAffiliationMaster)
          setOpenImport(!openImport);
          dispatch(getAffiliationMaster(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(AffiliationId === 0) ? 'Add' : 'Edit'} AffiliationMaster </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <InputLabel required id="demo-simple-select-label">Title</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={affiliationMasterData.AffiliationTitle}
                    name="AffiliationTitle"
                    error={!fieldValidate("AffiliationTitle")}
                    helperText={handleErrorMessage("AffiliationTitle")}
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
                {(AffiliationId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
