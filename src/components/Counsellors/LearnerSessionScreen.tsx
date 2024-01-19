import { Card, Button, Dialog,
  DialogTitle,
  DialogActions } from "@material-ui/core";
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

const LearnerSessionScreen = (props) => {
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
}

const changeCounsellorHandler = (ScheduleId) => {
  props.setScheduleId(ScheduleId);
  props.setReasonPopup("Change Counsellor");
  props.setOpenPopup(true);
}

const assignCounsellorHandler = (ScheduleId, ScheduleDate, StartTime, EndTime) => {
  props.setScheduleId(ScheduleId);
  props.setScheduleId(ScheduleId);
  props.setScheduleDate(ScheduleDate);
  props.setStartTime(StartTime);
  props.setEndTime(EndTime);
  props.setReasonPopup("Assign Counsellor");
  props.setOpenPopup(true);
}

const RejectReason = (ScheduleId) => {
  props.setScheduleId(ScheduleId);
  props.setReasonPopup("Reject");
  props.setVoidPop(true);
}

const changeScheduledCounsellorHandler = (ScheduleId, ScheduleDate, StartTime, EndTime, ApplicationId, CscAllocationId) => {
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
}

const showActionPlan = (id) => {
  props.setActionPlanScheduleId(id); 
  props.setActionPlan(true);
}

const lstUpcomingSess = useSelector(
  state => state?.learnerSessionsList?.learnerSessions?.list
);
const lstUpcomingSessCount = useSelector(
  state => state?.learnerSessionsList?.learnerSessions?.count
);

const toggleCollapse = (ScheduleId) => {
  if (dropOn === ScheduleId) {
    setDropOn(false);
  } else {
    setDropOn(ScheduleId);
  }
};

// useEffect(() => {
//   setIsLoading(true); console.log(id)
//   dispatch(
//     getSessionList(id, /* sessions.paginationToken, */ "60", "", search)
//   ).then(() => setIsLoading(false));
  
//   if (isLimitChange) setInitialLimit(limit);
//   if (isSearchChange) setInitialSearch(search);
// }, [page, limit, search]);

useEffect(() => {
  setPage(0);
}, []);

const showSessionLogs = (id) => {
  console.log("id", id)
  dispatch(getSessionLogs(id))
      .then(() => setIsLoading(false));
  setAddDialog(true);
}

const setDialogClose = () => {
  setAddDialog(false);
};

const lstSessionLogs = useSelector(
  state => state?.sessionLogs?.sessionLogs?.list
);

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
                            {getLocalTime(item?.SessionStartTime)[1] !== 'Invalid date' ? getLocalTime(item?.SessionStartTime)[1] : "Start time not found"} -{' '}
                            {getLocalTime(item?.SessionEndTime)[1] !== 'Invalid date' ? getLocalTime(item?.SessionEndTime)[1] : "End time not found"}
                            {/* {Moment(item?.SessionStartTime).format('LT')} -{' '}
                            {Moment(item?.SessionEndTime).format('LT')} */}
                          </li>
                          <li>{item?.Name}</li>
                          <li>{item?.ZohoplanId}</li>
                          <li>{item?.AgendaTitle}</li>
                          <li>{item?.SessionDuration ? (item?.SessionDuration).substring(0, 5) : ""}</li>
                          <li>{item?.Status}</li>
                          <li>{item?.SubStatus === "NO_SHOW" ? "NO SHOW" : item?.SubStatus === "NOT_COMPLETED" ? "NOT COMPLETED" : item?.SubStatus}</li>
                          <li>{item?.['Language_Name.LanguageName']}</li>
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
                            { (item.Status === "SCHEDULED" && item.SubStatus !== "COMPLETED" && item.SubStatus !== "NOT_COMPLETED" && item.SubStatus !== "NO_SHOW" && item.current) ? <>
                                <Button variant="contained" className="watch-button" onClick={() => cancelHandler(item.ScheduleId)}>
                                <span style={{ marginRight: "10px" }}><CancelPresentation /></span> Cancel Session
                              </Button>
                              </> : "" }
                            {
                             item.SubStatus !== "COMPLETED" && item.SubStatus !== "NO_SHOW" && item.current && item.Status === "SCHEDULED" && (Moment.utc().format() < item?.SessionEndTime) && <>
                              {/* <Button variant="contained" className="watch-button" onClick={() => cancelHandler(item.ScheduleId)}>
                              <span style={{ marginRight: "10px" }}><CancelPresentation /></span> Cancel Session
                            </Button>
                            <br /> */}
                            <Button variant="contained" className="watch-button" onClick={() => changeScheduledCounsellorHandler(item.ScheduleId, item.ScheduleDate, item.SessionStartTime, item.SessionEndTime, item?.['Master_Map_Id.ApplicationId'], item?.CscAllocationId)}>
                              <Videocam /> Change Counsellor
                            </Button>
                              </>
                            }
                            {
                              item.Status === "COMPLETED" && <>
                              {/* <Button variant="contained" className="watch-button" onClick={() => cancelHandler(item.ScheduleId)}>
                              <span style={{ marginRight: "10px" }}><CancelPresentation /></span> Cancel Session
                            </Button> */}<br />
                            {item.ChangeCounselor !== "Y" ? <Button variant="contained" className="watch-button " onClick={() => changeCounsellorHandler(item.ScheduleId)}>
                              <Videocam /> Change Counsellor
                            </Button> : <Button variant="contained" className="watch-button disabled">
                              <Videocam /> Change Counsellor
                            </Button> } 
                              </>
                            }
                            {/* {
                             item.SubStatus !== "COMPLETED" && item.SubStatus !== "NO_SHOW" && item.current && !item?.['Master_Map_Id.ApplicationId'] && item.Status === "SCHEDULED" && <Button variant="contained" className="watch-button " onClick={() => assignCounsellorHandler(item.ScheduleId, item.ScheduleDate, item.SessionStartTime, item.SessionEndTime)}>
                              <AssignmentInd /> Assign Counsellor
                            </Button>
                            } */}
                            {
                              (item.ZohoBillId !== null && item.VoidBillReason === null) ? <> <br />
                            <Button variant="contained" className="watch-button" onClick={() => RejectReason(item.ScheduleId)}>
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
                            <li className="notesTextLi">{item?.Notes}</li>
                          </ol>
                        )}
                      </div>
                    ))}
                  </div></> : "" }
                </div>))}</> : <div className="upcomingSessionBorder">
                    <div className="upcomingSessionInnerBox">No Record Found.</div>
                  </div> }

                  {addDialog && <><Dialog open={addDialog} className="sessionLogs rightSideFloatingBar" onClose={setDialogClose}>
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
export default LearnerSessionScreen;
