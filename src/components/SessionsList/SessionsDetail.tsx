import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Box,
  Card,
  CircularProgress,
  Button,
} from "@material-ui/core";
import Moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import { Star, StarBorder, ArrowBackIos } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store";
import { makeStyles } from "@material-ui/core/styles";
import ActionPlan from "../ActionPlan/ActionPlan";
import CareerSuccessionPlan from "../CSP/CareerSuccessionPlan";
import sessionsDetailAction from "src/store/actions/sessionsDetailAction";
import { getLocalTime } from "src/utils/utility";
import SessionsLogs from "./SessionsLogs";
import CancelSessionPop from "./CancelSessionPop";
import SessionListVoidBill from "../SessionListing/SessionListVoidBill";
import ChangeAssignCounsellor from "./ChangeAssignCounsellor";
import CareerSuccessPlan from "../CSMP/CareerSuccessPlan";

const useStyles = makeStyles({
  topheader: {
    paddingTop: "16px",
    position: "relative",
  },
  backArrow: {
    marginTop: "8px",
    cursor: "pointer",
  },
  normal: {
    background: "transparent",
    textDecoration: "none !important",
    cursor: "pointer",
    paddingRight: "0",
    border: "none",
  },
  circularProgressLoadingClass: {
    "min-height": "80vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
  }
});

const SessionsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [sessionLogsPop, setSessionLogsPop] = useState(false);
  const [cancelSessionPop, setCancelSessionPop] = useState(false);
  const [voidBillPop, setVoidBillPop] = useState(false);
  const [actionPlanPop, setActionPlanPop] = useState(false);
  const [cspFlag, setCspFlag] = useState(false);
  const [assign, setAssign] = useState(false);
  const [csmpFlag, setCsmpFlag] = useState(false);
  const [changeAssignPopup, setChangeAssignPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SessionData = useSelector(
    (state: any) => state.sessionsDataResult.sessionsDetailResult.data.data
  );
  const classes = useStyles();

  const SessionLogHandler = () => {
    setSessionLogsPop(true);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(sessionsDetailAction(id)).then(() => setLoading(false));
  }, []);

  const AssignCounsellorHandler = () => {
      setChangeAssignPopup(true);
      setAssign(true);
  }

  const ChangeCounsellorHandler = () => {
      setChangeAssignPopup(true);
      setAssign(false);
  }

  const backHandler = () => {
    navigate("/sessions")
  };

  const StartTimeNew = `${Moment.utc(SessionData?.ScheduleDate).format(
    "YYYY-MM-DD"
  )}T${SessionData?.SessionStartTime}Z`;
  const EndTimeNew = `${Moment.utc(SessionData?.ScheduleDate).format(
    "YYYY-MM-DD"
  )}T${SessionData?.SessionEndTime}Z`;

  const SelectedOptions = SessionData?.feedbackdata?.SelectedOptions;

  const AllOptions = SessionData?.feedbackdata?.AllOptions?.Options;

  const Rating = SessionData?.feedbackdata?.Rating;

  function checkSelectedOption(OptionId) {
    const output = SelectedOptions.filter((item2) => item2.OptionId === OptionId); 
    if (output.length !== 0) {
      return true
    }
    return false
  }
  const utcCurrent = Moment.utc().format();

  const StringConstants = {
    premiumPersonify: "PREMIUM-PERSONIFY",
    csmp: "PREMIUM-CSMP"
  }

  return (
    <><Container className="userIndex">
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
            Session Detail
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link
              color="textPrimary"
              component={RouterLink}
              to="/sessions"
              variant="subtitle2"
            >
              Sessions
            </Link>
            <Typography color="textSecondary" variant="subtitle2">
              Session Detail
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
            {SessionData?.LearnerName}
            </Typography>
          </Breadcrumbs>
        </Grid>
        {(typeof SessionData !== "undefined" && !loading) ? <Box sx={{ mt: 3 }}>
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              <div className="DetailScreenSessionsMain">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ArrowBackIos
                    className={classes.backArrow}
                    onClick={() => backHandler()}
                  />
                  <h2>{SessionData?.LearnerName}</h2>
                </div>
                <div className="DetailScreenSessionsMainInn sessionsDetailTog">
                  <div className="sessionsDetailTog">
                    <p>
                      <span>Learner Name:</span> {SessionData?.LearnerName}
                    </p>
                    <p>
                      <span>Grade: </span> {SessionData?.LearnerGrade !== "" ? SessionData?.LearnerGrade : "NA"}
                    </p>
                    <p>
                      <span>School: </span> {SessionData?.SchoolName !== "" ? SessionData?.SchoolName : "NA"}
                    </p>
                    <p>
                      <span>Personality Animal: </span> {SessionData?.PersonalityAnimal !== "" ? SessionData?.PersonalityAnimal : "NA"}
                    </p>
                    <p>
                  <span>Rating: </span> {SessionData?.feedbackdata?.Rating !== "" ? ([...Array(5)].map((item, i) => (i + 1 <= Rating ? (
                    <Star key={i.toString()} />
                  ) : (
                    <StarBorder key={i.toString()} />
                  )))) : "NA"}
              </p>
                    <p>
                      <span>Notes: </span>{SessionData?.Notes !== "" ? SessionData?.Notes : "NA"}
                    </p>
                    <p>
                      <span>Room Name: </span>{(SessionData?.RoomName !== "" && SessionData?.RoomName !== null) ? SessionData?.RoomName : "NA"}
                    </p>
                    
                  </div>
                  <div className="sessionsDetailTog">
                    <p>
                      <span>Package: </span> {SessionData?.Package}
                    </p>
                   {SessionData?.packageID !== StringConstants?.premiumPersonify && SessionData?.packageID !== StringConstants.csmp && <p>
                      <span>Task (Assigned/Completed):</span>{" "}
                      {SessionData?.TaskAssignedCount} /{" "}
                      {SessionData?.TaskCompletedCount}
                    </p>}
                    <p>
                      <span>Meeting-Id:</span> {SessionData?.MeetingId !== "" ? SessionData?.MeetingId : "NA"}
                    </p>
                    <p>
                      <span>Schedule-Id:</span> {id}
                    </p>
                    <p><span>{SessionData?.packageID !== StringConstants?.premiumPersonify && SessionData?.packageID !== StringConstants.csmp ? "Action Plan: " : "CSP Status: "}</span>{SessionData?.packageID !== StringConstants?.premiumPersonify && SessionData?.ActionPlan?.ActionPlanId !== "" ? <button className={classes.normal} type="button" onClick={() => setActionPlanPop(true)}>AP</button> : (SessionData?.CSP?.CspId !== "" && SessionData?.CSP?.CspId !== null) && SessionData?.CSP?.Status === "Published" ? "PUBLISHED" : "NA"}</p>
                   {SessionData?.packageID === StringConstants?.premiumPersonify && SessionData?.CSP?.CspId && SessionData?.CSP?.Status === "Published" && <p>
                    <span>CSP: </span><button className={`${classes.normal} cspCsmpClass`} type="button" onClick={() => setCspFlag(true)}>CSP</button> 
                </p> }
                {SessionData?.packageID === StringConstants?.csmp && SessionData?.CSP?.CspId && SessionData?.CSP?.Status === "Published" && <p>
                    <span>CSP: </span><button className={`${classes.normal} cspCsmpClass`} type="button" onClick={() => setCsmpFlag(true)}>CSP</button> 
                </p> }
                <p>
                    <span>Review: </span> {SessionData?.feedbackdata?.Review !== "" ? SessionData?.feedbackdata?.Review : "NA"}
                </p>
                {SessionData?.EntityId !== "PC" && <p>
                      <span>Entity Name: </span> {SessionData?.EntityName}
                    </p>}
                  </div>
                </div>
                <div className="feedbackBoxMain">
              <h2>{SessionData?.feedbackdata?.Question}</h2>
              <div className="feedbackBoxInn">
                  {AllOptions?.map((item, index) => (
                <div className="parent-divfd">
                  <label htmlFor={item.OptionId}>{item.OptionName}</label>
                  <input type="checkbox" readOnly key={item.OptionId} checked={checkSelectedOption(item.OptionId)} />
                </div>
              ))}
              </div>
              </div>
                <div className="session-Details">
                  <div className="upcomingSessionBorder">   
                    <div className="upcomingSessionInnerBox">
                      {getLocalTime(SessionData?.ScheduleDate)[7]}
                    </div>
                  </div>
                  <div className="d-flexClassdetail">
                    <h5>
                      {getLocalTime(StartTimeNew)[1]}-
                      {getLocalTime(EndTimeNew)[1]}
                    </h5>
                    <h5>{SessionData?.CounselorName}</h5>
                    <h5>{SessionData?.Agenda}</h5>
                    <h5>{SessionData?.SubAgenda}</h5>
                    <h5>{SessionData?.SessionStatus}</h5>
                    <h5>{SessionData?.SessionSubstatus === "NO_SHOW" ? "NO SHOW" : SessionData?.SessionSubstatus === "NOT_COMPLETED" ? "NOT COMPLETED" : SessionData?.SessionSubstatus === "COMPLETED" ? "COMPLETED" : SessionData?.SessionSubstatus }</h5>
                    <h5>{SessionData?.Language}</h5>
                  </div>
                  <div className="d-flexClassdetailContentMain">
                    <div className="d-flexClassdetailBtns">
                      {(SessionData?.CounselorName === "" 
                      || SessionData?.CounselorName === null) && (SessionData?.SessionStatus === "SCHEDULED"
                      && (SessionData?.SessionSubstatus === null || SessionData?.SessionSubstatus === "" || SessionData?.SessionSubstatus === "REASSIGNED BY LMC")) && (utcCurrent < EndTimeNew) && (
                        <Button
                          variant="contained"
                          className="watch-button"
                          style={{ textDecoration: "none" }}
                          onClick={AssignCounsellorHandler}
                        >
                          Assign Counsellor
                        </Button>
                      )}
                      {(SessionData?.CounselorName !== "")
                        && SessionData?.SessionStatus === "SCHEDULED"
                        && (SessionData?.SessionSubstatus === null || SessionData?.SessionSubstatus === "" || SessionData?.SessionSubstatus === "REASSIGNED BY LMC") && (utcCurrent < EndTimeNew) && (
                          <Button
                            variant="contained"
                            className="watch-button"
                            style={{ textDecoration: "none" }}
                            onClick={ChangeCounsellorHandler}
                          >
                            Change Counsellor
                          </Button>
                        )}
                      {SessionData?.SessionStatus === "SCHEDULED"
                        && SessionData?.SessionSubstatus === "COMPLETED" && (
                          <Button
                            variant="contained"
                            className="watch-button"
                            style={{ textDecoration: "none" }}
                            onClick={() => setVoidBillPop(true)}
                          >
                            Void Bill
                          </Button>
                        )}
                        {SessionData?.SessionStatus === "SCHEDULED" && (SessionData?.SessionSubstatus === null || SessionData?.SessionSubstatus === "" || SessionData?.SessionSubstatus === "REASSIGNED BY LMC") && SessionData?.SessionStatus !== "CANCELED" && (
                          <Button
                            variant="contained"
                            className="watch-button"
                            style={{ textDecoration: "none" }}
                            onClick={() => setCancelSessionPop(true)}
                          >
                            Cancel Session
                          </Button>
                        )}
                      <Button
                        variant="contained"
                        className="watch-button"
                        style={{ textDecoration: "none" }}
                        onClick={SessionLogHandler}
                      >
                        Session-Logs
                      </Button>
                      
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Card>
          <SessionListVoidBill
            openPopupReject={voidBillPop}
            setOpenPopupReject={setVoidBillPop}
            ScheduleId={id}
          />
          {sessionLogsPop && <SessionsLogs
            sessionLogsPop={sessionLogsPop}
            setSessionLogsPop={setSessionLogsPop}
            ScheduleId={id}
          />}
          {cancelSessionPop && <CancelSessionPop
            cancelSessionPop={cancelSessionPop}
            setCancelSessionPop={setCancelSessionPop}
            ScheduleId={id}
          />}
          {actionPlanPop && <ActionPlan open={actionPlanPop} scheduleId={id} setOpen={setActionPlanPop} />}
          {cspFlag && <CareerSuccessionPlan open={cspFlag} scheduleId={id} userSid={SessionData?.SubscriberUserId} setOpen={setCspFlag} />}
          {changeAssignPopup && <ChangeAssignCounsellor changeAssignPopup={changeAssignPopup} setChangeAssignPopup={setChangeAssignPopup} ScheduleId={id} assign={assign} ScheduleDate={SessionData?.ScheduleDate} StartTime={StartTimeNew} EndTime={EndTimeNew} ApplicationId={SessionData?.ApplicationId} CscAllocationId={SessionData?.CscAllocationId} pakage={SessionData?.packageID} />}
          {
            csmpFlag && <CareerSuccessPlan open={csmpFlag} scheduleId={id} setOpen={setCsmpFlag} userSid={SessionData?.SubscriberUserId} />
          }
        </Box> : <div className={classes.circularProgressLoadingClass}><CircularProgress /></div>}
      </Container> 
    </>
  );
};
export default SessionsDetail;
