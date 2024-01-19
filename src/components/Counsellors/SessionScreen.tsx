import { Button, Card, Tab, Tabs, Grid, CircularProgress, } from "@material-ui/core";
import { KeyboardArrowUp } from "@material-ui/icons";
/* import Calendar from "react-calendar"; */
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "../../store";
import { selectedCounsellorList } from "../../store/actions/SelectedCounsellorListAction";
import { useMemo, useState, useEffect } from "react";
import UpcomingScreen from "./UpcomingScreen";
// import IgnitorScreen from "./IgnitorScreen";
import Popup from "./Popup";
import AppRejPopup from "./AppRejPopup";
/* import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; */

const tabs = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Ignitor",
    value: "ignitor",
  },
  {
    label: "Pursuit",
    value: "Pursuit",
  },
  {
    label: "Pathway",
    value: "pathway",
  },
];

const useStyles = makeStyles({
  topheader: {
    marginTop: "16x",
    paddingTop: "16px",
    position: "relative",
  },
  tablebackground: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "4px",
    position: "relative",
    boxShdow: "0px 1px 2px #ddd",
    marginTop: "24px",
  },
  tableTab: {
    width: "100%",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    background: "#fff",
    paddingTop: "20px",
  },
  tabbing: {
    borderBottom: "2px solid #fff",
  },
  active: {
    borderBottom: "2px solid #5664d2",
    color: "#5664d2",
  },
  usertooltip: {
    position: "absolute",
    right: "0px",
    top: "16px",
  },
});

interface UserObject {
  UserSid: string;
  Name: string;
}
const SessionScreen = (props) => {
  const dispatch = useDispatch();
  const { counsellors } = useSelector((state) => state.SelectedCounsellorList);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [upcoming, setUpcoming] = useState(true);
  const [ignitor, setIgnitor] = useState(null);
  const [pursuit, setPursuit] = useState(null);
  const [pathway, setPathway] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [value, onChange] = useState(new Date());
  const [activeTab, setActiveTab] = useState<number>(0);
  const [opOn, setOpon] = useState(false);
  const [oppastOn, setOppastOn] = useState(false);
  const [opDateRangeOn, setOpDateRangeOn] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [reasonPopup, setReasonPopup] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [applicationId, setApplicationId] = useState(null);
  const [openPopupReject, setOpenPopupReject] = useState(false);
  const [planName, setPlanName] = useState('');

  const tabHandler = (type, id: number) => {
    if (id === 0) {
      setUpcoming(true);
      setIgnitor(false);
      setPursuit(false);
      setPathway(false);
      setDateRange(false);
    }
    if (id === 1) {
      setUpcoming(false);
      setIgnitor(true);
      setPursuit(false);
      setPathway(false);
      setDateRange(false);
    }
    if (id === 2) {
      setUpcoming(false);
      setIgnitor(false);
      setPursuit(true);
      setPathway(false);
      setDateRange(false);
    }
    if (id === 3) {
      setUpcoming(false);
      setIgnitor(false);
      setPursuit(false);
      setPathway(true);
      setDateRange(false);
    }
    if (id === 4) {
      setUpcoming(false);
      setIgnitor(false);
      setPursuit(false);
      setPathway(false);
      setDateRange(true);
    }

    setActiveTab(id);
  };

  useEffect(() => {
    setPage(0);
  }, []);

  const toggleCollapseDateRangeOpen = () => {
    setOpDateRangeOn(true);
  };
  const toggleCollapseDateRangeClose = () => {
    setOpDateRangeOn(false);
  };
  const handleDateRangeClick = (value, plan, startDate, endDate) => {
    // dispatch(lcUpcomingSessions(value, plan, startDate, endDate));
    setOpon(false);
    setOppastOn(false);
    setOpDateRangeOn(false);
  };

  const classes = useStyles();
  return (
    <div>
      {props.sessions ? (
        <div>
          <div className="custome-data ">
            {/* <Tabs
              className={classes.tableTab}
              indicatorColor="primary"
              scrollButtons="auto"
              textColor="primary"
              value={tabs[activeTab].value}
              variant="scrollable"
            >
              {tabs.map((tab, ind) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                  className={
                    activeTab === ind ? classes.active : classes.tabbing
                  }
                  onClick={() => tabHandler(tab.value, ind)}
                />
              ))}
              <Button
                type="button"
                className="date-range-btn"
                onClick={() => toggleCollapseDateRangeOpen()}
              >
                DATE RANGE
              </Button>
            </Tabs> */}
            {opDateRangeOn && (
              <span className="dateRangeCalendar">
                {/* <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  selectsDisabledDaysInRange
                  inline
                />
                <span>
                  <button
                    type="submit"
                    onClick={() => toggleCollapseDateRangeClose()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => handleDateRangeClick("", "", startDate, endDate)}
                  >
                    Apply
                  </button>
                </span> */}
              </span>
            )}
            <UpcomingScreen
              upcoming={upcoming}
              setScheduleId={setScheduleId}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              setScheduleDate={setScheduleDate}
              setApplicationId={setApplicationId}
              setOpenPopup={setOpenPopup}
              setOpenPopupReject={setOpenPopupReject}
              setActionPlan={props.setActionPlan}
              setActionPlanScheduleId={props.setScheduleId}
              setReasonPopup={setReasonPopup}
              setPlanName={setPlanName}
            />
            {/* <IgnitorScreen
              ignitor={ignitor}
              setScheduleId={setScheduleId}
              setOpenPopup={setOpenPopup}
              setReasonPopup={setReasonPopup}
            /> */}
          </div>
        </div>
      ) : props.activeTab === 4 ? (
        <div className="loading">
        <CircularProgress />
      </div>
      ) : ("")}
      <AppRejPopup openPopupReject={openPopupReject} setOpenPopupReject={setOpenPopupReject} ScheduleId={scheduleId} Reason={reasonPopup} smId="" />
     { openPopup && <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} ScheduleId={scheduleId} StartTime={startTime} EndTime={endTime} ScheduleDate={scheduleDate} ApplicationId={applicationId} Reason={reasonPopup} pakage={planName} /> }
    </div>
  );
};
export default SessionScreen;
