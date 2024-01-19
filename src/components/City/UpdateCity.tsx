import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import "../CounselloApplication/DetailScreen.css";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { RootStateOrAny } from "react-redux";
import { useDispatch, useSelector } from "../../store";
import { makeStyles } from "@material-ui/styles";
import { getCityListAction } from "src/store/actions/GetCityListAction";
import { getRegionListAction } from "src/store/actions/GetRegionListAction";
import { getStateListAction } from "src/store/actions/GetStateListAction";
import { ADMIN_API_ENDPOINT_V2, CITY_DATA } from "../../store/constants";
import http from "../../utils/http";

export default function UpdateCity({
  updateDialog,
  setUpdateDialog,
  existingRegionId,
  cityID,
  existingData,
}) {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState("");
  const [regionID, setRegionID] = useState(null);
  const [stateID, setStateID] = useState(null);

  useEffect(() => {
    dispatch(getRegionListAction(null, null, null, null, null, 'A'));
  }, []);

  const regionListData = useSelector(
    (state: any) =>
      state?.GetRegionList?.getRegionListResponse?.data?.regionData
  );

  useEffect(() => {
    dispatch(getStateListAction(null, null, null, null, null));
  }, []);

  const stateListData = useSelector(
    (state: any) => state?.GetStateList?.getStateListResponse?.data?.stateData
  );

  const validations = () => {
    if (
      (cityName === existingData.CityName) && (regionID === existingData.RegionId) && (stateID === existingData.StateId)
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (existingData.CityName && existingData.RegionId && existingData.StateId && regionListData && stateListData) {
      setCityName(existingData.CityName);
      setRegionID(existingData.RegionId);
      setStateID(existingData.StateId);
    }
  }, [existingData, regionListData, stateListData])

  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");

  const handleAdd = async () => {
    setError("");
    setSucessMessage("");

    const cityObj = {
      "cityId": cityID,
      "cityName": cityName,
      "regionId": regionID,
      "stateId": stateID,
    };

    const postUpdateCityObj = Object.keys(cityObj)
      .filter((k) => cityObj[k] != null && cityObj[k] !== "")
      .reduce((a, k) => ({ ...a, [k]: cityObj[k] }), {});

    if (!validations()) {
      let res;
      try {
        res = await http.patch(
          `${ADMIN_API_ENDPOINT_V2}${CITY_DATA}`,
          postUpdateCityObj
        );
        console.log("resresres", res);
        if (res.data.status === true) {
          setSucessMessage(res?.data?.message);
          dispatch(getCityListAction(1, 10, null, null, null));
          setTimeout(() => {
            setUpdateDialog(false);
          }, 1000);
        }
      } catch (error) {
        console.log("resresres", res);
        console.log("error", error);
        setError(error?.response?.data?.message);
      }
    } else {
      setError("Some error occured");
    }
  };

  return (
    <>
      <Dialog open={updateDialog} onClose={() => setUpdateDialog(false)}>
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            Update The Details Of City
          </DialogContentText>
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
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setUpdateDialog(false)}
          >
            Close
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAdd}
            disabled={validations()}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
