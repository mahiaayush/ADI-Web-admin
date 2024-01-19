import { Card, Button,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Videocam,
  TextSnippet,
  CancelPresentation,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ListAlt,
  Money,
  AssignmentInd,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "../../store";
import { getSessionList } from "../../store/actions/sessionListAction";
import { getSessionLogs } from "../../store/actions/sessionLogsAction";
import Moment from 'moment';
import { getLocalTime } from '../../utils/utility';

const UpcomingScreen = (props) => {
const { id } = useParams();
const dispatch = useDispatch();
const { sessions } = useSelector((state) => state.sessionsList);
const [page, setPage] = useState(0);
const [limit, setLimit] = useState(10);
const [isLoading, setIsLoading] = useState(false);
const [initialLimit, setInitialLimit] = useState(10);
const [search, setSearch] = useState("");
const [initialSearch, setInitialSearch] = useState("");

const [activeTab, setActiveTab] = useState<number>(0);
const isLimitChange = limit !== initialLimit;
const isSearchChange = search !== initialSearch;
const isLastPage = page + 1 === Math.ceil(sessions.count / limit);
const [dropOn, setDropOn] = useState(false);

const [addDialog, setAddDialog] = useState<boolean>(false)

const cancelHandler = (ScheduleId) => {
  props.setScheduleId(ScheduleId);
  props.setReasonPopup("Cancel");
  props.setOpenPopup(true);
  props.setOpenPopupReject(false);
}

const changeCounsellorHandler = (ScheduleId) => {
  props.setScheduleId(ScheduleId);
  props.setReasonPopup("Change Counsellor");
  props.setOpenPopup(true);
  props.setOpenPopupReject(false);
}
const assignCounsellorHandler = (ScheduleId, ScheduleDate, StartTime, EndTime) => {
  props.setScheduleId(ScheduleId);
  props.setScheduleId(ScheduleId);
  props.setScheduleDate(ScheduleDate);
  props.setStartTime(StartTime);
  props.setEndTime(EndTime);
  props.setReasonPopup("Assign Counsellor");
  props.setOpenPopup(true);
  props.setOpenPopupReject(false);
}

const RejectReason = (item) => {
  props.setScheduleId(item?.ScheduleId);
  props.setReasonPopup("Reject");
  props.setOpenPopupReject(true);
  props.setOpenPopup(false);
  props.setPlanName(item?.PlanName)
}

const changeScheduledCounsellorHandler = (ScheduleId, ScheduleDate, StartTime, EndTime, ApplicationId, CscAllocationId, planName) => {
  props.setScheduleId(ScheduleId);
  props.setScheduleDate(ScheduleDate);
  props.setStartTime(StartTime);
  props.setEndTime(EndTime);
  if (ApplicationId === null && (CscAllocationId !== null || CscAllocationId !== "")) {
    props.setApplicationId(CscAllocationId)
  } else {
    props.setApplicationId(ApplicationId)
  }
  props.setReasonPopup("Change Scheduled Counsellor");
  props.setOpenPopup(true);
  props.setOpenPopupReject(false);
  props.setPlanName(planName)
}
const showActionPlan = (id) => {
  props.setActionPlanScheduleId(id); 
  props.setActionPlan(true);
}

const showSessionLogs = (id) => {
  dispatch(getSessionLogs(id))
      .then(() => setIsLoading(false));
  setAddDialog(true);
}

const setDialogClose = () => {
  setAddDialog(false);
};

const lstUpcomingSess = useSelector(
  state => state?.sessionsList?.sessions?.list
);
const lstUpcomingSessCount = useSelector(
  state => state?.sessionsList?.sessions?.count
);
const lstSessionLogs = useSelector(
  state => state?.sessionLogs?.sessionLogs?.list
);

const toggleCollapse = (ScheduleId) => {
  if (dropOn === ScheduleId) {
    setDropOn(false);
  } else {
    setDropOn(ScheduleId);
  }
};

useEffect(() => {
  setIsLoading(true);
  dispatch(
    getSessionList(id, /* sessions.paginationToken, */ "60", "", search)
  ).then(() => setIsLoading(false));
  
  if (isLimitChange) setInitialLimit(limit);
  if (isSearchChange) setInitialSearch(search);
}, [page, limit, search]);

useEffect(() => {
  setPage(0);
}, []);

  return (
    <Card>
      {props.upcoming ? (
        <div className="session-tab">
          {lstUpcomingSessCount > 0 ? <>
          {lstUpcomingSess && Object?.keys(lstUpcomingSess).map(dt => (<div key={dt}>
            {dt !== 'count' ? <>
                  <div className="upcomingSessionBorder">
                    <div className="upcomingSessionInnerBox">
                      {Moment((dt)).format('dddd')}{' '}
                      {Moment((dt)).format('LL')}
                    </div>
                  </div>
                  <div className="upcomingSessionListing">
                    {lstUpcomingSess[dt]?.map((item, ind) => (
                      <div className="aboveUlDiv">
                        <ul>
                          <li>
                            {getLocalTime(item?.SessionStartTime)[1]} -{' '}
                            {getLocalTime(item?.SessionEndTime)[1]}
                            {/* {Moment(item?.SessionStartTime).format('LT')} -{' '}
                            {Moment(item?.SessionEndTime).format('LT')} */}
                          </li>
                          {/* <li>{item?.Name.includes("null") ? item?.Name.split(" ")[0] : item?.Name}</li> */}
                          <li>{item?.LEARNER_GIVEN_NAME} {item?.LEARNER_FAMILY_NAME}</li>
                          <li>{item?.PlanName}</li>
                          <li>{item?.AgendaTitle}</li>
                          <li>{item?.SessionDuration ? (item?.SessionDuration).substring(0, 5) : ""}</li>
                          <li>{item?.Status}</li>
                          <li>{item?.SubStatus === "NO_SHOW" ? "NO SHOW" : item?.SubStatus === "NOT_COMPLETED" ? "NOT COMPLETED" : item?.SubStatus}</li>
                          <li>{item?.LanguageName}</li> 
                          {/* <li>
                            {Object.keys(lstLanguage.data).length !== 0 &&
                              lstLanguage.data.map(lang =>
                                lang?.Id === item?.LangId ? (
                                  <>{lang.Name} </>
                                ) : (
                                  ''
                                )
                              )}
                          </li> */}
                          <li>
                              <Button
                                role="button"
                                className="arrowDiv"
                                onClick={() => toggleCollapse(item.ScheduleId)}
                              >
                                Details
                                {dropOn === item.ScheduleId ? (
                                  <KeyboardArrowUp />
                                ) : (
                                  <KeyboardArrowDown />
                                )}
                              </Button>
                          </li>
                        </ul>
                        {dropOn === item.ScheduleId && (
                          <ol id={ind} className="notexTextUl">
                            <li>
                            {/* {item?.RecordBackingFile !== "" ? (
                            <Button variant="contained" className="watch-button" onClick={() => window.location.href = `https://lyc-staticcontenet.s3.ap-south-1.amazonaws.com/lyc-staticcontenet/SessionVideos/${item?.CscprofileId}/${item?.RecordBackingFile}`}>
                              <Videocam /> Watch
                            </Button>) : "" }<br />
                            <Button variant="contained" className="watch-button">
                              <TextSnippet /> Action Plan
                            </Button>
                            <br /> */}
                             {
                              item?.ActionPlanStatus === "P" && <>
                              <Button variant="contained" className="watch-button" onClick={() => showActionPlan(item.ScheduleId)}>
                              <span style={{ marginRight: "16px" }}><CancelPresentation /></span> Action Plan
                            </Button>
                            <br />
                              </>
                            }
                            { (item.Status === "SCHEDULED" && item.SubStatus === null && item.status !== "CANCELED") ? <>
                                <Button variant="contained" className="watch-button" onClick={() => cancelHandler(item.ScheduleId)}>
                                <span style={{ marginRight: "10px" }}><CancelPresentation /></span> Cancel Session
                              </Button>
                              </> : "" }
                            {
                              item.SubStatus !== "COMPLETED" && item.SubStatus !== "NO_SHOW" && item.SubStatus !== "NOT_COMPLETED" && item.Status === "SCHEDULED" && (Moment.utc().format() < item?.SessionEndTime) && <>
                              {/* <Button variant="contained" className="watch-button" onClick={() => cancelHandler(item.ScheduleId)}>
                              <span style={{ marginRight: "10px" }}><CancelPresentation /></span> Cancel Session
                            </Button>
                            <br /> */}
                            <br /><Button variant="contained" className="watch-button" onClick={() => changeScheduledCounsellorHandler(item.ScheduleId, item.ScheduleDate, item.SessionStartTime, item.SessionEndTime, item.CounselorApplicationId, item.CscAllocationId, item.PlanID)}>
                              <Videocam /> Change Counsellor
                            </Button>
                              </>
                            }
                            {/* {
                             item.SubStatus !== "COMPLETED" && item.SubStatus !== "NO_SHOW" && item.SubStatus !== "NOT_COMPLETED" && !item.CounselorApplicationId && item.Status === "SCHEDULED" && <Button variant="contained" className="watch-button " onClick={() => assignCounsellorHandler(item.ScheduleId, item.ScheduleDate, item.SessionStartTime, item.SessionEndTime)}>
                              <AssignmentInd /> Assign Counsellor
                            </Button>
                            } */}
                            {/* {
                              item.Status === "COMPLETED" && <>
                              <Button variant="contained" className="watch-button" onClick={() => cancelHandler(item.ScheduleId)}>
                              <span style={{ marginRight: "10px" }}><CancelPresentation /></span> Cancel Session
                            </Button><br />
                            {item.ChangeCounselor !== "Y" ? <Button variant="contained" className="watch-button " onClick={() => changeCounsellorHandler(item.ScheduleId)}>
                              <Videocam /> Change Counsellor
                            </Button> : <Button variant="contained" className="watch-button disabled">
                              <Videocam /> Change Counsellor
                            </Button> } 
                              </>
                            } */}
                            {
                              (item.ZohoBillId !== null && item.VoidBillReason === null) ? <> <br />
                            <Button variant="contained" className="watch-button" onClick={() => RejectReason(item)}>
                            <span style={{ marginRight: "10px" }}><Money /></span>Generate Void Bill
                            </Button>
                              </>
                              : <> <br /> <Button variant="contained" className="watch-button disabled">
                              <span style={{ marginRight: "10px" }}><Money /></span>Generate Void Bill
                              </Button>
                              </>
                              }
                              <br /><Button variant="contained" className="watch-button" onClick={() => showSessionLogs(item.ScheduleId)}>
                                <span style={{ marginRight: "16px" }}><ListAlt /></span> Session Logs
                              </Button>
                            </li>
                            <li className="notesTextLi" style={{ wordBreak: "break-word" }}>{item?.Notes}</li>
                            <li className="innerClassLi">
                             {item?.MeetingId !== null && <p>MeetingId - {item?.MeetingId}</p>}
                             <p>ScheduleId - {item?.ScheduleId}</p>
                             </li>
                            {/* <li style={{ margin: "0 0 0 auto" }}><span>MeetingId - {item?.MeetingId}</span></li>
                            <li style={{ margin: "0 0 0 auto" }}><span>ScheduleId - {item?.ScheduleId}</span></li> */}
                          </ol>
                        )}
                      </div>
                    ))}
                  </div></> : "" }
                </div>))}</> : <div className="upcomingSessionBorder">
                    <div className="upcomingSessionInnerBox">No Record Found.</div>
                  </div> }

                  {addDialog && <><Dialog open={addDialog} className="sessionLogs rightSideFloatingBar">
                    <DialogTitle>Session Logs</DialogTitle>
                        <table style={{ width: '100%' }} className="learnerListing">
                          {lstSessionLogs.length !== 0 ? <><tr>
                            <th>Room ID</th>
                            <th>Room Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration</th>
                          </tr> 
                          {lstSessionLogs.map(item => (
                          <tr>
                            <td>{item?.LogJson?.room_id}</td>
                            <td>{item?.LogJson?.room_name}</td>
                            <td>{Moment(item?.LogJson?.start_time).format("LT")}</td>
                            <td>{Moment(item?.LogJson?.end_time).format("LT")}</td>
                            <td>{(item?.SessionDuration).substring(0, 5)}</td>
                          </tr>))}</> : <tr>
                            <th>No records found</th>
                          </tr>}
                        </table>
                        <DialogActions>
                            <Button onClick={() => setDialogClose()} variant="contained">Close</Button>
                        </DialogActions>
                    </Dialog></>}
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};
export default UpcomingScreen;
