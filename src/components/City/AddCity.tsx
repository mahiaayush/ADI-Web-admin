import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    NativeSelect,
    TextField,
  } from "@material-ui/core";
  import MenuItem from '@material-ui/core/MenuItem'
  import "../CounselloApplication/DetailScreen.css";
  import type { ChangeEvent } from 'react';
  import { useEffect, useState } from "react";
  import { RootStateOrAny } from "react-redux";
  import { useDispatch, useSelector } from "../../store";
  import { makeStyles } from "@material-ui/styles";
  import { getRegionListAction } from "src/store/actions/GetRegionListAction";
  import { getCityListAction } from "src/store/actions/GetCityListAction";
  import { getStateListAction } from "src/store/actions/GetStateListAction";
  import {
    ADMIN_API_ENDPOINT_V2, CITY_DATA
  } from '../../store/constants';
  import http from "../../utils/http";
  
  export default function AddCity({
    addDialog,
    setAddDialog,
  }) {
    const dispatch = useDispatch();
   
    const useStyles = makeStyles({
      flexParentClass: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      },
      childIInd: {
        textAlign: "right", 
        fontWeight: 600, 
        fontSize: "20px",
        margin: "0 auto"
      },
      chileTextField: {
        width: "70%",
      }
    });

    const [cityName, setCityName] = useState('');
    const [regionID, setRegionID] = useState(null);
    const [stateID, setStateID] = useState(null);
    useEffect(() => {
        dispatch(getRegionListAction(null, null, null, null, null, 'A'));
    }, [])

    useEffect(() => {
      dispatch(getStateListAction(null, null, null, null, null));
    }, [])

    const stateListData = useSelector(
      (state: any) =>
        state?.GetStateList?.getStateListResponse?.data?.stateData
    );

      const regionListData = useSelector(
    (state: any) =>
      state?.GetRegionList?.getRegionListResponse?.data?.regionData
  );

  //  const regionIDs = regionListData?.map(item => item.RegionId);

    const validations = () => {
        if (cityName.length === 0 || cityName.trim() === "" || !regionID) {
            return true;
        }
        return false;
    }
    
    const [error, setError] = useState('');
    const [successMessage, setSucessMessage] = useState("");
    const handleAdd = async () => {
      setError('')
      setSucessMessage('')
      const cityObj = {
        "cityName": cityName,
        "regionId": regionID,
        "stateId": stateID,
      }
      if (!validations()) { 
        let res;
        try {
              res = await http.post(
            `${ADMIN_API_ENDPOINT_V2}${CITY_DATA}`, cityObj,
          );
          console.log("resresres", res)
          if (res.data.status === true) {
            setSucessMessage(res?.data?.message);
            dispatch(getCityListAction(1, 10, null, null, null));
            setTimeout(() => {
              setAddDialog(false);
            }, 1000);
          } 
        } catch (error) {
          console.log("resresres", res)
          console.log('error', error);
          setError(error?.response?.data?.message)
        }
    } else {
        setError('City Name must only contain alpha-numeric characters')
      }
    };

    const classes = useStyles();

    return (
        <>
        <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText sx={{ mb: 3 }} style={{ fontWeight: 700, textAlign: "center" }}>Enter The Details Of City</DialogContentText>
          <TextField
            margin="dense"
            size="small"
            label="City Name"
            name="CityName"
            type="text"
            fullWidth
            value={cityName}
            onChange={(e: ChangeEvent<any>) => setCityName(e.target.value)}
            required
          />  
          <TextField
            margin="dense"
            size="small"
            fullWidth
            type="number"
            label="Region"
            name="Region"
            value={regionID}
            onChange={(e: ChangeEvent<any>) => setRegionID(e.target.value)}
            select
            required
          >
            <MenuItem value="">Select Region</MenuItem>
            {regionListData && regionListData.length > 0
              ? regionListData.map((data) => (
                  <MenuItem key={data?.RegionId} value={data?.RegionId}>
                    {data?.RegionName}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <TextField
            margin="dense"
            size="small"
            fullWidth
            type="number"
            label="State"
            name="State"
            value={stateID}
            onChange={(e: ChangeEvent<any>) => setStateID(e.target.value)}
            select
            required
          >
            <MenuItem value="">Select State</MenuItem>
            {stateListData && stateListData.length > 0
              ? stateListData.map((data) => (
                  <MenuItem key={data?.StateId} value={data?.StateId}>
                    {data?.StateName}
                  </MenuItem>
                ))
              : null}
          </TextField>
        </DialogContent>
        <DialogActions>
        <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
        <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button color="primary" variant="outlined" onClick={() => setAddDialog(false)}>
            Close
          </Button>
          <Button color="primary" variant="contained" onClick={handleAdd} disabled={validations()}>
            Add
          </Button>
        </DialogActions>
        </Dialog>
      </>
    );
  }