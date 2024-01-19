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
// import MaximizeIcon from '@material-ui/core/Maximize';
import type { ChangeEvent } from 'react';
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "src/store";
// import { getCollageMaster, importCollegeMaster, saveCollegeMaster, updateCollegeMaster } from '../../../store/actions/getCollegeMasterAction';
import { getAccomodation, saveAccomodation, updateAccomodation } from "src/store/actions/AccomodationAction";
import { getMasterEntityList } from "src/store/actions/getMasterEntityAction";
import toast from "react-hot-toast";
import { getAccomodationTypeList } from "src/store/actions/AccomodationTypeAction";
//  
const initialAccomodation = {
  EntityId: '',
  AmTypeId: 0,
  AmInfo: '',
  AmCostMin: '',
  AmCostMax: ''
}
const accomodationValidator = {
  validator: {
    EntityId: (value = "") => value.trim().length >= 8,
    AmTypeId: (value = "") => /^\d+\.?\d*$/.test(value),
    AmInfo: (value = "") => !!value.trim(),
    AmCostMin: (value = "") => !!value.trim(),
    AmCostMax: (value = "") => !!value.trim()
  },
  errorMessage: {
    EntityId: "Please select Valid Entity",
    AmTypeId: "Please select Valid Am-Type",
    AmInfo: "Please fill About Entity",
    AmCostMin: "Please fill Entity Am-Minimum Cost",
    AmCostMax: "Please fill Entity Am-Maximum Cost"
  }
}

export default function AddAccomodationPopup({ openImport, setOpenImport, EntityAmId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accomodationData, setAccomodationData] = useState(initialAccomodation);
  const { validator, errorMessage } = accomodationValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setAccomodationData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](accomodationData[field])
    } else {
      isValid = Object.keys(accomodationData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && accomodationData[field]?.length > 0) {
      isValid = validator[field](accomodationData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allAccomodationData = useSelector(
    (state: any) => state?.getAccomodation?.AccomodationResponse?.data
  )
  console.log("allAccomodationData ==>", allAccomodationData, EntityAmId)

  useEffect(() => {
    dispatch(getAccomodationTypeList());
    dispatch(getMasterEntityList());
    // dispatch(); accomodation-type
  }, []);

  useEffect(() => {
    if (EntityAmId > 0) {
      const rowData = allAccomodationData?.rows?.find((itm) => itm?.EntityAmId === EntityAmId);
      console.log("rowData", rowData);
      setAccomodationData({
        "EntityId": rowData?.EntityId,
        "AmTypeId": rowData?.AmTypeId,
        "AmInfo": rowData?.AmInfo,
        "AmCostMin": rowData?.AmCostMin,
        "AmCostMax": rowData?.AmCostMax
      })
    }
  }, [EntityAmId])

  const AccomodationTypeListData = useSelector(
    (state: any) => state?.AccomodationTypeList?.AccomodationTypeListResponse?.data
  )
  console.log("AccomodationTypeListData::", AccomodationTypeListData)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", EntityAmId);
    if (EntityAmId > 0) {
      // Update Dispatcher
      dispatch(updateAccomodation(EntityAmId, accomodationData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setAccomodationData(initialAccomodation)
          setOpenImport(!openImport);
          dispatch(getAccomodation(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", accomodationData)
      // Save Dispatcher
      dispatch(saveAccomodation(accomodationData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setAccomodationData(initialAccomodation)
          setOpenImport(!openImport);
          dispatch(getAccomodation(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }

  const masterEntityListData = useSelector(
    (state: any) => state?.getMasterEntityList?.masterEntityResponse?.data
  )
  interface EntityList {
    EntityName: string;
    EntityId: string;
  }

  const defaultProps = {
    options: masterEntityListData,
    getOptionLabel: (option: EntityList) => option.EntityName,
  };

  return (
    <div id="dsdds">
      <Dialog open={openImport} fullWidth={true} maxWidth="md">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(EntityAmId === 0) ? 'Add' : 'Edit'} Accomodation </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label1">Entity Name</InputLabel>
                  {masterEntityListData?.length > 0
                    ? <Autocomplete
                      {...defaultProps}
                      disablePortal
                      size="small"
                      id="combo-box-demo"
                      value={masterEntityListData.find((itm: any) => itm.EntityId === accomodationData?.EntityId)}
                      sx={{ width: 280 }}
                      onChange={(event: any, newValue: EntityList | null) => {
                        setAccomodationData({ ...accomodationData, EntityId: newValue?.EntityId });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    /> : <CircularProgress />}
                  <FormHelperText>{handleErrorMessage("EntityId")}</FormHelperText>
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">AM-type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="EntitysubtypeId"
                    name="AmTypeId"
                    value={accomodationData.AmTypeId}
                    label="Accomodation Type"
                    placeholder="Accomodation Type"
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("AmTypeId")}
                    required
                  >
                    {
                      AccomodationTypeListData?.length > 0
                      && AccomodationTypeListData?.map((item) => (<MenuItem value={item?.AmTypeId}>{item?.AmTypeName}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("AmTypeId")}</FormHelperText>
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">AM Info</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={accomodationData.AmInfo}
                    name="AmInfo"
                    error={!fieldValidate("AmInfo")}
                    helperText={handleErrorMessage("AmInfo")}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>

                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">AM Min Cost</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="AmCostMin"
                    value={accomodationData.AmCostMin}
                    error={!fieldValidate("AmCostMin")}
                    helperText={handleErrorMessage("AmCostMin")}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">AM Max Cost</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="AmCostMax"
                    value={accomodationData.AmCostMax}
                    onChange={handleChange}
                    error={!fieldValidate("AmCostMax")}
                    helperText={handleErrorMessage("AmCostMax")}
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
                {(EntityAmId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
