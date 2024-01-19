import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  NativeSelect,
  InputLabel,
} from "@material-ui/core";
import "../CounselloApplication/DetailScreen.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelSessionAction } from "src/store/actions/CancelSessionAction";
import { ChangeCounsellorAction } from "src/store/actions/ChangeCounsellorAction";
import { getChangeCounsellorList } from "src/store/actions/GetChangeCounsellorListAction";
import http from "src/utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  UPDATE_SESSION_COUNSELLOR_URL,
} from "src/store/constants";
import { useParams } from "react-router";
import { getSessionList } from '../../store/actions/sessionListAction';
import moment from "moment";
import { getLocalTime } from '../../utils/utility';

export default function Popup({ ScheduleId, ScheduleDate, StartTime, EndTime, ApplicationId, Reason, openPopup, setOpenPopup, pakage }) {
  const [success, setSucces] = useState(false);
  const [counsellor, setCounsellor] = useState(null);
  const [csiteMapperId, setCsiteMapperId] = useState();
  const [counselorListing, setCounselorListing] = useState([]);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenPopup(false);
  };

  const { id } = useParams();

  const submitHandler = async () => {
    if (counsellor !== null && counsellor !== "") {
      try {
        const res = await http.patch(
          `${ADMIN_API_ENDPOINT_V2}${UPDATE_SESSION_COUNSELLOR_URL}`,
          { "ScheduleId": ScheduleId, 
          "ApplicationId": counsellor,
           "CsiteMapperId": csiteMapperId,
           "ChangeCounselor": Reason === "Change Scheduled Counsellor" ? "Y" : "N"
         }
        );
        if (res.data.status === true) {
          handleClose();

          dispatch(getSessionList(id, '60', '', ''));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleYes = () => {
    if (Reason === "Cancel") {
      dispatch(CancelSessionAction(ScheduleId));
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (Reason === "Change Counsellor") {
      dispatch(ChangeCounsellorAction(ScheduleId));
      handleClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (Reason === "Change Scheduled Counsellor" || Reason === "Assign Counsellor") {
      submitHandler();
    }
  };

  useEffect(() => {
    const currDate = moment(ScheduleDate).format('YYYY-MM-DD'); // here using moment and getLocalTime for time conversion
    const stime = getLocalTime(StartTime)[5] 
    const etime = getLocalTime(EndTime)[5]
    if (Reason === "Change Scheduled Counsellor") {
      dispatch(getChangeCounsellorList(ScheduleId, ApplicationId));
    }
    if (Reason === "Assign Counsellor") {
      dispatch(getChangeCounsellorList(ScheduleId, null));
    }
  }, [Reason, openPopup]);

  const counsellorList = useSelector(
    (state: any) =>
      state.changeCounsellorList.getChangeCounsellorListResponse.data
  );

  useEffect(() => {
    let newList = [];
    if (pakage?.includes("SA")) {
      newList = counsellorList?.AvailableCounselors?.filter(item => item?.SessionType === "SA")
    } else {
      newList = counsellorList?.AvailableCounselors?.filter(item => item?.SessionType === "DO")
    }
    setCounselorListing(newList)
  }, [counsellorList])
  
  const handleCounsellor = (item) => {
    setCounsellor(item);
      const index = counselorListing?.findIndex(x => x.ApplicationId === item);
            setCsiteMapperId(counselorListing[index]?.CsiteMapperId)
  };

  return (
    <>
      <Dialog open={openPopup} className="aprovelPop" onClose={handleClose}>
        <DialogTitle>
          {" "}
          {Reason === "Cancel"
            ? "Cancel Session"
            : Reason === "Change Counsellor"
            ? "Change Counsellor"
            : Reason === "Assign Counsellor" ? "Assign Counsellor" : "Change Scheduled Counsellor"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="dimgrey">
            {Reason === "Cancel"
              ? "Are you sure, you want to cancel this session ?"
              : Reason === "Change Counsellor" && counselorListing?.length > 0
              ? "This will enable refresh booking."
              : Reason === "Assign Counsellor" && counselorListing?.length > 0
              ? "This will assign counsellor to you"
               : counselorListing?.length > 0 ? "This will change your counsellor" : ""}
               </DialogContentText>
           {counselorListing?.length > 0 && <DialogContentText>
              The counsellor will be notified.
            </DialogContentText> } 
          
          {(Reason === "Change Scheduled Counsellor" || Reason === "Assign Counsellor")
          && (counselorListing?.length > 0 ? (
            <>
              <InputLabel id="demo-simple-select-label">
                Select Counsellor
              </InputLabel>
              <NativeSelect
                id="demo-simple-select"
                style={{ width: "100%", marginBottom: "10px" }}
                onChange={(e) => handleCounsellor(e.target.value)}
                value={counsellor}
              >
                <option value="">Select Counsellor</option>
                {counselorListing.map((item, index) => (
                  <option key={index.toString()} value={item.ApplicationId}>
                    {`${item.Counselor} - (${item.PayrollId})  --  (${item?.SessionType})`}
                  </option>
                ))}
              </NativeSelect>
            </>
          ) : (
            <div>Sorry...No Counsellors Available!</div>
          ))}
          
          {counselorListing?.length > 0 && <DialogContentText color="dimgrey"> Are you sure want to do this? </DialogContentText> }
          
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleYes} variant="contained" autoFocus disabled={Reason === "Assign Counsellor" && counselorListing?.length === 0}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}