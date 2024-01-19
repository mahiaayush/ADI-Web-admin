import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import "../CounselloApplication/DetailScreen.css";
import MenuItem from "@material-ui/core/MenuItem";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import http from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { cognito } from "../../../config";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_SESSION_SLOTS_OVERRIDE_LISTING,
} from "../../store/constants";
import { makeStyles } from "@material-ui/styles";
import { DatePicker } from "@material-ui/lab";
import moment from "moment";
import sessionSlotsOverrideListingAction from "src/store/actions/SessionSlotsOverrideAction";

export default function AddSessionOverride({ addDialog, setAddDialog }) {
  const dispatch = useDispatch();
  const useStyles = makeStyles({
    flexParentClass: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    childIInd: {
      textAlign: "right",
      fontWeight: 600,
      fontSize: "20px",
      margin: "0 auto",
    },
    chileTextField: {
      width: "65%",
    },
  });
  const [user, setUser] = useState({
    OverrideDate: "",
    StartTime: "",
    EndTime: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");

  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  yesterday.setHours(0);
  yesterday.setMinutes(0);
  yesterday.setSeconds(0);
  tomorrow.setHours(0);
  tomorrow.setMinutes(0);
  tomorrow.setSeconds(0);
  const [overrideDate, setOverrideDate] = useState(tomorrow);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [showLabel, setShowLabel] = useState(true);
  const currDate = moment(overrideDate).format("YYYY-MM-DD");
  const Times = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
  ];
  const Etimes = [];
  if (startTime !== undefined) {
    const index = Times.indexOf(startTime);
    for (let i = index + 1; i < Times.length; i++) {
      Etimes.push(Times[i]);
    }
  }
  const handleAdd = async () => {
    // const newObj = { ...user }
    setError("");
    setSucessMessage("");
    const startT = currDate.concat(" ", startTime);
    const sdate = new Date(startT);
    const stime = sdate.toISOString().substring(11, 16);
    const endT = currDate.concat(" ", endTime);
    const edate = new Date(endT);
    const etime = edate.toISOString().substring(11, 16);
    const postObj = {
      OverrideDate: currDate,
      StartTime: stime,
      EndTime: etime,
    };
    let res;
    try {
      res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${GET_SESSION_SLOTS_OVERRIDE_LISTING}`,
        postObj
      );
      console.log("resresres", res);
      if (res.data.status === true) {
        setSucessMessage(res?.data?.message);
        dispatch(sessionSlotsOverrideListingAction(null, 1, 10, null, null));
        setTimeout(() => {
          setAddDialog(false);
        }, 1000);
      }
    } catch (error) {
      console.log("resresres", res);
      console.log("error", error?.response?.data?.message);
      setError(error?.response?.data?.message);
    }
  };
  return (
    <>
      <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
        <DialogContent style={{ width: "400px", height: "240px" }}>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            Enter Session Override Date and Time
          </DialogContentText>
          <DatePicker
            inputFormat="dd-MM-yyyy"
            onChange={(date) => setOverrideDate(date)}
            minDate={yesterday}
            value={overrideDate}
            renderInput={(params) => <TextField {...params} helperText="" />}
          />
          <TextField
            margin="dense"
            size="small"
            label={showLabel ? "Start Time" : ""}
            name="StartTime"
            value={startTime}
            onChange={(e: ChangeEvent<any>) => setStartTime(e.target.value)}
            type="text"
            select
            fullWidth
            required
          >
            <MenuItem value="">Select Start Time</MenuItem>
            {Times && Times.length > 0
              ? Times.map((data) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <TextField
            margin="dense"
            size="small"
            fullWidth
            type="text"
            label={showLabel ? "End Time" : ""}
            name="EndTime"
            value={endTime}
            onChange={(e: ChangeEvent<any>) => setEndTime(e.target.value)}
            select
            required
          >
            <MenuItem value="">Select End Time</MenuItem>
            {Etimes && Etimes.length > 0
              ? Etimes.map((data) => (
                  <MenuItem key={data} value={data}>
                    {data}
                  </MenuItem>
                ))
              : null}
          </TextField>
        </DialogContent>
        <DialogActions>
          <h5
            style={{
              color: "red",
              justifyContent: "center",
              marginLeft: "20px",
            }}
          >
            {error}
          </h5>
          <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setAddDialog(false)}
          >
            Close
          </Button>
          <Button color="primary" variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
