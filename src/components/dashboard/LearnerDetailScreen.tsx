import {
  Container,
  Grid
} from "@material-ui/core";
import { useEffect, useState } from 'react';
import {
  ArrowBackIos
} from "@material-ui/icons";
import { useDispatch, useSelector } from "../../store";
import { getLearnersDetails } from "../../store/actions/learnerDetailsAction";
import { getLearnerSessionList } from "../../store/actions/learnerSessionListAction";
import { makeStyles } from '@material-ui/core/styles';
import LearnerSessionScreen from "../Counsellors/LearnerSessionScreen";
import Popup from "../Counsellors/Popup";
import AppRejPopup from "../Counsellors/AppRejPopup";
import ActionPlan from "../ActionPlan/ActionPlan";

const useStyles = makeStyles({
  topheader: {
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
    textTransform: "capitalize",
  },
  tableTab: {
    width: "100%",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
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
  topcouns: {
    padding: "0 0 0 0px",
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    margin: "0px",
  },
  countMainBox: {
    padding: "0px 10px 10px 0 !important",
    maxWidth: "14.28%",
    color: "#333",
    minHeight: "110px",
    "& h2": {
      margin: "0",
    },
    "& p": {
      margin: "0",
    },
    normal: {
      textDecoration: "none !important",
      cursor: "pointer",
      paddingRight: "0",
      border: "none",
      fontWeight: "bold"
    }
  },
  tpcounox: {
    backgroundColor: "#fff",
    paddingLeft: "10px",
    paddingRight: "0px",
    paddingTop: "5px",
    margin: "10px 0px 0px 0px",
    borderRadius: "8px",
    height: "100%"
  },
  learnerNameHead: {
    fontSize: "24px",
    textTransform: "capitalize",
  },
  backArrow: {
    marginTop: "8px",
    cursor: "pointer",
  },
  actionPlanMainDiv: {
    display: "flex",
    flexWrap: "wrap"
  },
  acplDiv: {
    fontWeight: "bold"
  },
  actionPlanMainP: {
    display: "block"
  },
  normal: {
    background: "transparent",
    textDecoration: "none !important",
    cursor: "pointer",
    paddingRight: "0",
    border: "none"
  }
});

const LearnerDetailScreen = (props) => {
  const id = "";
  const learnerID = props?.learnerId;
  const dispatch = useDispatch();
  const { learnersDetails } = useSelector((state) => state.dashboardLearnerDetails);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLimit, setInitialLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [upcoming, setUpcoming] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [reasonPopup, setReasonPopup] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [applicationId, setApplicationId] = useState(null);
  const [actionPlan, setActionPlan] = useState(false);
  const [openPopupReject, setOpenPopupReject] = useState(false);
  const [actionPlanScheduleId, setActionPlanScheduleId] = useState(null);

  const lstLearnerDetails = useSelector(
    state => state?.dashboardLearnerDetails?.learnersDetails?.list[0]
  );

  console.log("lstlearnerDetails", lstLearnerDetails);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getLearnersDetails()
    ).then(() => setIsLoading(false));
  }, [page, limit, search]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getLearnerSessionList("60", "", search, learnerID)
    ).then(() => setIsLoading(false));
  }, [page, limit, search]);

  useEffect(() => {
    setPage(0);
  }, []);
  const openActionPlan = (val) => {
    setActionPlanScheduleId(val.ScheduleId);
    setActionPlan(true);
  }
  const classes = useStyles();

  const backHandler = () => {
    props.setLearnerDetailScreen(false);
  }

  return (
    <div className="learnerDetailsMainDiv">
      <Container className="userIndex">
        <Grid item xs={12} className="headerBoxes">
          <div className="main-div-tag">
            <div>
              <ArrowBackIos className={classes.backArrow} onClick={() => backHandler()} />
            </div>
            <div className={classes.learnerNameHead}>
              {lstLearnerDetails?.FirstName} {lstLearnerDetails?.LastName}
            </div>
          </div>

          <div className="main-div clickonfirstname">
            <div className="clickonfirstname">
              <p>
                <span>Name :</span> {lstLearnerDetails?.FirstName} {lstLearnerDetails?.LastName}
              </p>
              <p>
                <span>Grade :</span> {lstLearnerDetails?.Grade ? lstLearnerDetails?.Grade : "Not Available"}
              </p>
              <p>
                <span>School :</span> {lstLearnerDetails?.SchoolName ? lstLearnerDetails?.SchoolName : "Not Available"}
              </p>
              <p>
                <span>Personality Animal :</span> {lstLearnerDetails?.PersonalityAnimal ? lstLearnerDetails?.PersonalityAnimal : "Not Available"}
              </p>
              {/* <p>
                    <span>Last Log in :</span> hh:mm dd/mm/yyyyy
                  </p>
                  <p>
                    <span>Primary PRofile(s) :</span> [Primary Firstname][Primary
                    Lastname]
                  </p> */}
            </div>
            <div className="secondpart clickonfirstname ">
              <p>
                <span>Premium Package :</span> {lstLearnerDetails?.PlanName}
              </p>
              {/* <p>
                    <span>Passport :</span> started
                  </p> */}
              <p>
                <span>Tasks (complete / total) :</span> {lstLearnerDetails?.TaskCompletedCount} / {lstLearnerDetails?.TaskAssignedCount}
              </p>
              <p className={classes.actionPlanMainP}>
                <span>Action Plan :</span> {lstLearnerDetails?.ActionPlan.length > 0 ? (
                  <div className={classes.actionPlanMainDiv}>
                    {lstLearnerDetails?.ActionPlan.map((acpl, ind) => {
                      return (
                        <button className={classes.normal} type="button" onClick={() => openActionPlan(acpl)}> AP{ind + 1} <span>|</span></button>
                      );
                    })}{' '}
                  </div>
                ) : (
                  'Not Available'
                )}
              </p>
              {/* <p>
                    <span>Career Acceletor Plan :</span> Draft
                  </p> */}
            </div>
          </div>

          {/* <div className="main-div">
                <Button className="mrbutton button-title">View Self-Discovery Report</Button>
                <Button className=" mrbutton button-title">View Passport</Button>
                <Button className="mrbutton button-title">View Tasks</Button>
                <Button className="button-title">Open C.A.P</Button>
              </div> */}
          <h3>Sessions</h3>
          <LearnerSessionScreen
            upcoming={upcoming}
            setScheduleId={setScheduleId}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            setScheduleDate={setScheduleDate}
            setApplicationId={setApplicationId}
            setOpenPopup={setOpenPopup}
            setOpenPopupReject={setOpenPopupReject}
            setReasonPopup={setReasonPopup}
            setActionPlan={setActionPlan}
            setActionPlanScheduleId={setActionPlanScheduleId}
          />
          {/* <AppRejPopup openPopupReject={openPopupReject} setOpenPopupReject={setOpenPopupReject} ScheduleId={scheduleId} Reason={reasonPopup} /> */}
          {/* <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} ScheduleId={scheduleId} StartTime={startTime} EndTime={endTime} ScheduleDate={scheduleDate} ApplicationId={applicationId} Reason={reasonPopup} /> */}
        </Grid>
      </Container>
      {
        actionPlan && <ActionPlan open={actionPlan} scheduleId={actionPlanScheduleId} setOpen={setActionPlan} />
      }
    </div>
  );
};
export default LearnerDetailScreen;