import { Button, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../store";
import { selectedCounsellorList } from "../../store/actions/SelectedCounsellorListAction";
import { useMemo, useState, useEffect } from "react";
import LernerScreen from "./LernerScreen";
import SessionScreen from "./SessionScreen";
import FeedbackScreen from "./FeedbackScreen";
import CounsellorOverview from "./CounsellorOverview";
import ProfileTab from "./ProfileTab";
import AppicationScreen from "./ApplicationScreen";
import AvailabilityScreen from "./Availability"
import ActionPlan from "../ActionPlan/ActionPlan";

const tabs = [
  {
    label: "Overview",
    value: "overview",
  },
  {
    label: "Profile",
    value: "profile",
  },
  {
    label: "Availability",
    value: "Availability",
  },
  /* {
    label: "Calendar",
    value: "calendar",
  }, */
  {
    label: "Learners",
    value: "learners",
  },
  {
    label: "Sessions",
    value: "sessions",
  },
  {
    label: "Feedback",
    value: "feedback",
  },
 /*  {
    label: "Application",
    value: "application",
  }, */
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
    // paddingTop: "20px",
    marginTop: "16px",
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
const TabScreen = ({ setCounsellorName = (value) => (value), newUsers = 0 }) => {
  const dispatch = useDispatch();
  const { counsellors } = useSelector((state) => state.SelectedCounsellorList);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [overview, setOverview] = useState(true);
  const [profile, setProfile] = useState(false);
  const [calender, setCalender] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [learners, setLearners] = useState(false);
  const [sessions, setSessions] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [application, setApplication] = useState(false);
  const [feedbackDetailScreen, setFeedbackDetailScreen] = useState(false);
  const [learnerDetailScreen, setLearnerDetailScreen] = useState(false);
  const [actionPlan, setActionPlan] = useState(false);
  const [scheduleId, setScheduleId] = useState(null);

  const [activeTab, setActiveTab] = useState<number>(0);

  const tabHandler = (type, id: number) => {
    if (id === 0) {
      setOverview(true);
      setProfile(false);
      // setCalender(false);
      setLearners(false);
      setLearnerDetailScreen(false);
      setSessions(false);
      setFeedback(false);
      setFeedbackDetailScreen(false);
      // setApplication(false);
      setAvailability(false)
    }
    if (id === 1) {
      setOverview(false);
      setProfile(true);
      // setCalender(false);
      setLearners(false);
      setLearnerDetailScreen(false);
      setSessions(false);
      setFeedback(false);
      setFeedbackDetailScreen(false);
      // setApplication(false);
      setAvailability(false)
    }
    if (id === 2) {
      setOverview(false);
      setProfile(false);
      setAvailability(true)
      setLearners(false);
      setLearnerDetailScreen(false);
      setSessions(false);
      setFeedback(false);
      setFeedbackDetailScreen(false);
      // setApplication(false);
      // setAvailability(false)
    }
    if (id === 3) {
      setOverview(false);
      setProfile(false);
      // setCalender(false);
      setLearners(true);
      setLearnerDetailScreen(false);
      setSessions(false);
      setFeedback(false);
      setFeedbackDetailScreen(false);
      // setApplication(false);
      setAvailability(false)
    }
    if (id === 4) {
      setOverview(false);
      setProfile(false);
      // setCalender(false);
      setLearners(false);
      setLearnerDetailScreen(false);
      setSessions(true);
      setFeedback(false);
      setFeedbackDetailScreen(false);
      // setApplication(false);
      setAvailability(false)
    }
    if (id === 5) {
      setOverview(false);
      setProfile(false);
      // setCalender(false);
      setLearners(false);
      setLearnerDetailScreen(false);
      setSessions(false);
      setFeedback(true);
      setFeedbackDetailScreen(false);
      // setApplication(false);
      setAvailability(false)
    }
    if (id === 6) {
      setOverview(false);
      setProfile(false);
      // setCalender(false);
      setLearners(false);
      setLearnerDetailScreen(false);
      setSessions(false);
      setFeedback(false);
      setFeedbackDetailScreen(false);
      // setApplication(true);
      setAvailability(false)
    }
    /* if (id === 7) {
      setOverview(false);
      setProfile(false);
      setCalender(false);
      setLearners(false);
      setSessions(false);
      setFeedback(false);
      setApplication(false);
      setAvailability(true)
    } */

    setActiveTab(id);
  };
  useEffect(() => {
    setPage(0);
  }, [newUsers]);

  const classes = useStyles();

  return (
    <>
      <Tabs
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
            className={activeTab === ind ? classes.active : classes.tabbing}
            onClick={() => tabHandler(tab.value, ind)}
          />
        ))}
      </Tabs>

      <div className="custome-data">
        <CounsellorOverview overview={overview} setCounsellorName={setCounsellorName} activeTab={activeTab} />
        <ProfileTab profile={profile} activeTab={activeTab} />
        <LernerScreen learners={learners} learnerDetailScreen={learnerDetailScreen} setLearnerDetailScreen={setLearnerDetailScreen} setScheduleId={setScheduleId} setActionPlan={setActionPlan} activeTab={activeTab} />
        <SessionScreen sessions={sessions} setScheduleId={setScheduleId} setActionPlan={setActionPlan} activeTab={activeTab} />
        <FeedbackScreen feedback={feedback} feedbackDetailScreen={feedbackDetailScreen} setFeedbackDetailScreen={setFeedbackDetailScreen} activeTab={activeTab} />
        <AppicationScreen application={application} />
        <AvailabilityScreen availability={availability} />
        {
          actionPlan && <ActionPlan open={actionPlan} scheduleId={scheduleId} setOpen={setActionPlan} />
        }
      </div>
    </>
  );
};
export default TabScreen;