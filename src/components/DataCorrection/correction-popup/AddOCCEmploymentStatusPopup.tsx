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
import { getCourseType } from "src/store/actions/CourseTypeAction";
import { getRMORegcarCodeList } from "src/store/actions/RMOProgressionAction";
import { getEmploymentStatusList } from "src/store/actions/EmploymentStatusAction";
import { DeleteOutline } from "@material-ui/icons";
import { CreateRMOEmployment, EditRMOEmployment, getRMOEmployment } from "src/store/actions/RMOEmploymentStatusAction";
import _ from "lodash";

const initialEmpStatus = {
  RegcarCode: '',
  EmploymentStatusId: []
}
const empStatusValidator = {
  validator: {
    RegcarCode: (value = "") => value?.trim()?.length >= 3,
    EmploymentStatusId: (value = []) => value.length > 0
  },
  errorMessage: {
    RegcarCode: "Please fill valid RagcarCode",
    EmploymentStatusId: "Please fill valid Employ status",
  }
}

export default function AddOCCEmploymentStatusPopup({ openAdd, setOpenAdd, EmpStatusRegcarId = 0, page = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [empStatusData, setEmpStatusData] = useState(initialEmpStatus);
  const [statusfields, setStatusfields] = useState([{ statusId: 0 }])
  const addMoreStatus = (val:number = 0) => {
    setStatusfields([...statusfields, { statusId: val }])
  } 
  const removeFields = (index) => {
    const data = [...statusfields];
    data.splice(index, 1)
    empStatusData.EmploymentStatusId.splice(index, 1);
    setStatusfields(data)
  }
  const { validator, errorMessage } = empStatusValidator;
  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setEmpStatusData((prevState) => ({ ...prevState, [field]: value }))
  }
   const handleChangeStatus = (index: number, e) => {
    let statusfieldsData = [];
    const changeData = _.cloneDeep(empStatusData);
    changeData.EmploymentStatusId[index] = parseInt(e.target.value, 10);
    statusfieldsData = _.cloneDeep(statusfields);
    statusfieldsData[index] = parseInt(e.target.value, 10);
    setStatusfields(statusfieldsData)
    setEmpStatusData(changeData);
   }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](empStatusData[field])
    } else {
      isValid = Object.keys(empStatusData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && empStatusData[field]?.length > 0) {
      isValid = validator[field](empStatusData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const AllRMOEmploymentData = useSelector(
    (state: any) => state?.getRMOEmployment?.RMOEmploymentResponse?.data
  )
  useEffect(() => {
    if (EmpStatusRegcarId > 0) {
      const rowData = AllRMOEmploymentData?.rows?.find((itm) => itm?.EmpStatusRegcarId === EmpStatusRegcarId);
      const editData = rowData?.EmploymentStatus?.map((item: any) => ({
        statusId: item?.EmploymentStatusId
      }))
      
      setStatusfields(editData);
      setEmpStatusData({
        "RegcarCode": rowData?.RegcarCode,
        "EmploymentStatusId": [...rowData?.EmploymentStatus?.map((item: any) => item?.EmploymentStatusId)] 
      })
    }
  }, [EmpStatusRegcarId])
  useEffect(() => {
    dispatch(getRMORegcarCodeList());
    dispatch(getEmploymentStatusList());
  }, []);

  const RMOPRegCodeData = useSelector(
    (state: any) => state?.getRegCodeList?.RMOPRegCodeResponse?.data
  )
  const EmploymentStatusData = useSelector(
    (state: any) => state?.getEmploymentStatusList?.EmploymentStatusListResponse?.data
  )
  const handleSubmit = (e) => {
    e.preventDefault()
    if (EmpStatusRegcarId > 0) {
      // Update Dispatcher
      dispatch(EditRMOEmployment(EmpStatusRegcarId, empStatusData)).then((res: any) => {
        if (res.data?.isSuccess) {
          toast.success(res.data?.message)
          setEmpStatusData(initialEmpStatus)
          setOpenAdd(!openAdd);
          dispatch(getRMOEmployment(page + 1, limit));
        } else {
          toast.error(res?.data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(CreateRMOEmployment(empStatusData)).then((res: any) => {
        if (res?.data?.isSuccess) {
          toast.success(res?.data?.message)
          setEmpStatusData(initialEmpStatus)
          setOpenAdd(!openAdd);
          dispatch(getRMOEmployment(page + 1, limit));
        } else {
          toast.error(res?.data?.message)
        }
      })
    }
  }

  return (
    <div id="dsdds">
      <Dialog open={openAdd} fullWidth={true} maxWidth="sm">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenAdd(!openAdd)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(EmpStatusRegcarId === 0) ? 'Add' : 'Edit'} Employement Status</h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <InputLabel required id="demo-simple-label">RegcarTitle</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="RegcarCode"
                    name="RegcarCode"
                    value={empStatusData.RegcarCode}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("RegcarCode")}
                    required
                  >
                  { Object.keys(RMOPRegCodeData).length > 0 && RMOPRegCodeData.map((item) => (
                      <MenuItem value={item?.RegcarCode}>{item?.RegcarTitle}</MenuItem>
                      )) }
                  </Select>
                </Grid>
                {statusfields.map((element, index) => (
                  <><Grid item md={10}>
                    <InputLabel required id="demo-simple-select-label">Status</InputLabel>
                  <TextField
                    select
                    required
                    id="outlined-basic"
                    variant="outlined"
                    value={element.statusId}
                    size="small"
                    sx={{ width: '100%' }}
                    SelectProps={{ native: true }}
                    onChange={(event) => handleChangeStatus(index, event)}
                  >
                    <option key="-1" value="-1">Please select </option>
                    {Object.keys(EmploymentStatusData).length > 0 && EmploymentStatusData.map((option) => (
                      <option key={option.EmploymentStatusId} value={option.EmploymentStatusId}>
                        {option.EmploymentStatusName}
                      </option>
                    ))}
                  </TextField>                    
                  </Grid>
                  <Grid item md={2}>
                    {(statusfields.length !== 1) ? <Button sx={{ mt: 2, marginTop: '25px' }} onClick={() => removeFields(index)}><DeleteOutline /></Button> : '' }
                    </Grid>
                  </>
                ))}
                <Grid item md={12} sx={{ mt: 2, textAlign: 'right' }}>
                <Button sx={{ mt: 2, float: 'left' }} onClick={() => addMoreStatus(0)} variant="contained" color="primary">Add More ++ </Button>
                </Grid>
              </Grid>
              <Button
                sx={{ mt: 2, float: 'right' }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(EmpStatusRegcarId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
