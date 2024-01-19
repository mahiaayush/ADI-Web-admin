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
  Color,
  InputLabel
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "src/store";
import { CreateCity, EditCity, getCityType, getStateIdList } from "src/store/actions/getCityAction";
import toast from "react-hot-toast";

const EditCityPopup = ({ openEdit, setOpenEdit, stateCity_Id, state_Id, city_Id,
  city_m, page_no, limit_no, editFlag }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [stateCityId, setStateCityId] = useState(stateCity_Id);
  const [stateId, setStateId] = useState(state_Id);
  const [cityId, setCityId] = useState(city_Id);
  const [city, setCity] = useState(city_m);
  const [message, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: null,
    message: ''
  })

  const displayMessage = (obj: { type: Color, message: string }) => {
    setMessage(obj)
    setIsMessage(true);
  }

  const submitData = async () => {
    let data; let message; let error;
    console.log("edit flag----->", editFlag);

    if (editFlag) {
      const fetchedData = await dispatch(EditCity(stateCityId, stateId, cityId, city));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
      dispatch(getCityType(page + 1, limit)).then(() => setIsLoading(false));
    } else {
      const fetchedData = await dispatch(CreateCity(stateId, cityId, city));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
      dispatch(getCityType(page + 1, limit)).then(() => setIsLoading(false));
    }
    console.log("return data", data, "message", message, "error----->", error);
    
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(error)
    }
  }
  useEffect(() => {
    dispatch(getStateIdList());
  }, []);

  const stateIdList = useSelector(
    (state: any) => state?.getStateIdList?.stateIdResponse?.data
  )
  const regCityName = (e) => {
    setCity(e.target.value);
    if (e.target.value) {
      const regex = /^[a-zA-Z].*/;
      if (regex.test(e.target.value.charAt(0))) {
        setIsMessage(false);
      } else {
        displayMessage({ type: 'warning' as unknown as Color, message: 'First Character of City not start with numeric' });
      }
    } else {
      setIsMessage(false);
    }
  }
  // Submit  Button ON/OFF
  const check = () => {
    let value = true
    if (stateId && cityId && !message && city && city.length >= 2) {
      value = false
    } else {
      value = true
    }
    return value
  }

  return (
    <div>
      <Dialog open={openEdit} maxWidth="sm" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit City Type" : "Add City type"}</h2>
          {message ? <><Alert severity={MessageObj?.type}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">StateName</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  select
                  size="small"
                  placeholder={stateId}
                  value={stateId === null ? " " : stateId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setStateId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {stateId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(stateIdList).length > 0 && stateIdList.map((option) => (
                    <option key={option.StateId} value={option.StateId}>
                      {option.StateName}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">CityId</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={cityId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setCityId(e.target.value)}
                  helperText="Required a number"
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">City</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={city}
                  sx={{ width: '100%' }}
                  onChange={(e) => regCityName(e)}
                  helperText="City length should be greater than 2"
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
export { EditCityPopup }