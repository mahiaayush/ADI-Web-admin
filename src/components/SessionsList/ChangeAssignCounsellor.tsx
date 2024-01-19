import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    NativeSelect,
    InputLabel
  } from "@material-ui/core";
  import "../CounselloApplication/DetailScreen.css";
  import { useEffect, useState } from "react";
  import PayrollListAction from '../../store/actions/PayrollListAction'
  import http from "../../utils/http";
  import { useDispatch, useSelector } from "react-redux";
  import { useParams } from "react-router-dom";
  import { getCounsellorOverview } from "../../store/actions/counsellorOverViewAction";
  import {
    ADMIN_API_ENDPOINT_V2, POST_UPGRADE_PAYROLL, UPDATE_SESSION_COUNSELLOR_URL
  } from '../../store/constants';
import { getSessionLogs } from "src/store/actions/sessionLogsAction";
import moment from "moment";
import { CancelSessionAction } from "src/store/actions/CancelSessionAction";
import { getLocalTime } from "src/utils/utility";
import { getChangeCounsellorList } from "src/store/actions/GetChangeCounsellorListAction";
import sessionsDetailAction from "src/store/actions/sessionsDetailAction";
  
  export default function ChangeAssignCounsellor({ changeAssignPopup, setChangeAssignPopup, ScheduleId, assign, ScheduleDate, StartTime, EndTime, ApplicationId, CscAllocationId, pakage }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [counsellor, setCounsellor] = useState(null);
    const [csiteMapperId, setCsiteMapperId] = useState();
    const [counselorListing, setCounselorListing] = useState(null);

    useEffect(() => {
          if (ApplicationId === null && (CscAllocationId !== null || CscAllocationId !== "")) {
            dispatch(getChangeCounsellorList(ScheduleId, CscAllocationId));
          } else {
            dispatch(getChangeCounsellorList(ScheduleId, ApplicationId));
          } 
    }, [])

    const counsellorList = useSelector(
        (state: any) =>
          state.changeCounsellorList.getChangeCounsellorListResponse.data
      );   

      useEffect(() => {
        let newList = [];
        if (pakage.includes("SA")) {
          newList = counsellorList?.AvailableCounselors?.filter(item => item?.SessionType === "SA")
        } else {
          newList = counsellorList?.AvailableCounselors?.filter(item => item?.SessionType === "DO")
        }
        setCounselorListing(newList)
      }, [counsellorList])

      const handleCounsellor = (item) => {
        if (csiteMapperId === null) {
          setCounsellor(CscAllocationId);
        } else {
          setCounsellor(item);
        }
          const index = counselorListing?.findIndex(x => x.ApplicationId === item);
                setCsiteMapperId(counselorListing?.[index]?.CsiteMapperId)
      };

    const SubmitHandler = async () => {
          try {
            const res = await http.patch(
              `${ADMIN_API_ENDPOINT_V2}${UPDATE_SESSION_COUNSELLOR_URL}`,
              { "ScheduleId": parseInt(ScheduleId, 10), 
              "ApplicationId": counsellor,
               "CsiteMapperId": csiteMapperId,
               "ChangeCounselor": assign ? "N" : "Y"
              }
            );
            if (res.data.status === true) {
            setChangeAssignPopup(false);
            dispatch(sessionsDetailAction(ScheduleId));
            }
          } catch (error) {
            console.log("error", error);
          }
        }

    return (
      <>
        <Dialog open={changeAssignPopup} className="aprovelPop" onClose={() => setChangeAssignPopup(false)}>
        <DialogTitle>{assign ? "Assign Counsellor" : "Change Counsellor" }</DialogTitle>
        <DialogContentText color="dimgrey">
            { assign ? "The counsellor is not assigned to the learner yet, Please choose from the list below." : "Are you sure to change the current counsellor and assign the new one to this learner." } 
               </DialogContentText>
               <DialogContentText color="dimgrey">
               {counselorListing?.length > 0 ? (
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
                {counselorListing?.map((item, index) => (
                  <option key={index.toString()} value={item?.ApplicationId}>
                    {`${item.Counselor} - (${item.PayrollId})  --  (${item?.SessionType})`}
                  </option>
                ))}
              </NativeSelect>
            </>
          ) : (
            <div>Sorry...No Counsellors Available!</div>
          )}
             {/* This cancel the session */}
               </DialogContentText>
          <DialogActions>
            <Button autoFocus onClick={() => setChangeAssignPopup(false)}>
              Close
            </Button>
            {counselorListing?.length > 0 && <Button autoFocus variant="contained" onClick={SubmitHandler}>
              {assign ? "Assign" : "Change"}
            </Button>}
          </DialogActions>
        </Dialog>
      </>
    );
  }