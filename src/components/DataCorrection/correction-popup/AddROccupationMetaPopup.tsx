import * as React from "react";
import {
  DialogContent,
  Grid,
  TextField,
  TextareaAutosize,
  Button,
  Dialog,
  Alert,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "src/store";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { CreateROccupationMeta, EditROccupationMeta, getROccupationMeta } from "src/store/actions/ROccupationMetaAction";
import { getRMORegcarCodeList } from "src/store/actions/RMOProgressionAction";
import toast from "react-hot-toast";

const initialOccupationMeta = {
  RegcarCode: '',
  MetaProperies: '',
}
const occupationMetaDataValidator = {
  validator: {
    MetaProperies: (value = "") => value?.trim()?.length >= 2,
    RegcarCode: (value = "") => value?.trim()?.length >= 2,
  },
  errorMessage: {
    RegcarCode: "Please select",
    MetaProperies: 'Please fill Json format'
  }
}

export default function AddROccupationMetaPopup({ openImport, setOpenImport, RegcarMetaId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const [occupationMetaData, setOccupationMetaData] = useState(initialOccupationMeta);
  const { validator, errorMessage } = occupationMetaDataValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setOccupationMetaData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](occupationMetaData[field])
    } else {
      isValid = Object.keys(occupationMetaData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && occupationMetaData[field]?.length > 0) {
      isValid = validator[field](occupationMetaData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allOccupationMetaData = useSelector(
    (state: any) => state?.getROccupationMeta?.ROccupationMetaResponse?.data
  )

  useEffect(() => {
    dispatch(getRMORegcarCodeList());
  }, []);
  const RegcarCodeListData = useSelector(
    (state: any) => state?.getRegCodeList?.RMOPRegCodeResponse?.data
  )

  useEffect(() => {
    if (RegcarMetaId > 0) {
      const rowData = allOccupationMetaData?.rows?.find((itm) => itm?.RegcarMetaId === RegcarMetaId);
      setOccupationMetaData({
        RegcarCode: rowData?.RegcarCode,
        MetaProperies: rowData?.MetaProperies,
      })
    }
  }, [RegcarMetaId])
  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isJsonString(occupationMetaData?.MetaProperies)) {
      toast.error("Invalid Metaproperty, it should be JSON format.")
    } else if (RegcarMetaId > 0) {
      // Update Dispatcher
      dispatch(EditROccupationMeta(RegcarMetaId, occupationMetaData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setOccupationMetaData(initialOccupationMeta)
          setOpenImport(!openImport);
          dispatch(getROccupationMeta(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(CreateROccupationMeta(occupationMetaData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setOccupationMetaData(initialOccupationMeta)
          setOpenImport(!openImport);
          dispatch(getROccupationMeta(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }

  return (
    <div>
      <Dialog open={openImport} maxWidth="md" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(RegcarMetaId === 0) ? 'Add' : 'Edit'} Occupation Meta </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Regcar Title</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="RegcarCode"
                    name="RegcarCode"
                    value={occupationMetaData.RegcarCode}
                    placeholder="RegcarTitle "
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("RegcarCode")}
                    size="small"
                    required
                  >
                    {
                      RegcarCodeListData?.length > 0
                      && RegcarCodeListData?.map((item) => (<MenuItem value={item?.RegcarCode}>{item?.RegcarTitle}</MenuItem>))
                    }
                  </Select>

                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Meta Properies</InputLabel>
                  <TextField
                    id="MetaProperies"
                    name="MetaProperies"
                    value={occupationMetaData.MetaProperies}
                    onChange={handleChange}
                    error={!fieldValidate("MetaProperies")}
                    helperText={handleErrorMessage("MetaProperies")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                sx={{ float: "right" }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(RegcarMetaId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}