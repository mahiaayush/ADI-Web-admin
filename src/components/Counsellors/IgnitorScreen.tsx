import { Card, Button } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Videocam,
  TextSnippet,
  CancelPresentation,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "../../store";
import { getSessionList } from "../../store/actions/sessionListAction";
import Moment from 'moment';
import { getLocalTime } from '../../utils/utility';

const IgnitorScreen = (props) => {
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

const lstUpcomingSess = useSelector(
  state => state?.sessionsList?.sessions?.list
);
const lstUpcomingSessCount = useSelector(
  state => state?.sessionsList?.sessions?.count
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
    getSessionList(id, /* sessions.paginationToken, */ "60", "ignitor", search)
  ).then(() => setIsLoading(false));
  
  if (isLimitChange) setInitialLimit(limit);
  if (isSearchChange) setInitialSearch(search);
}, [page, limit, search]);

useEffect(() => {
  setPage(0);
}, []);

  return (
    <Card>
      {props.ignitor ? (
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
                          <li>{item?.Name}</li>
                          <li>{item?.ZohoplanId}</li>
                          <li>{item?.AgendaTitle}</li>
                          <li>English - US</li>
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
                            { (item.Status !== "CANCELED BY LMC" || item.Status !== "CANCELED BY USER") ? <>
                                <Button variant="contained" className="watch-button" onClick={() => cancelHandler(item.ScheduleId)}>
                                <span style={{ marginRight: "10px" }}><CancelPresentation /></span> Cancel Session
                              </Button>
                              </> : "" }
                            {
                              item.Status === "COMPLETED" && <>
                              {/* <Button variant="contained" className="watch-button" onClick={() => cancelHandler(item.ScheduleId)}>
                              <CancelPresentation /> Cancel Session
                            </Button> */}<br />
                            <Button variant="contained" className="watch-button icon" onClick={() => changeCounsellorHandler(item.ScheduleId)}>
                              <Videocam /> Change Counsellor
                            </Button>
                              </>
                            }
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
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};
export default IgnitorScreen;
