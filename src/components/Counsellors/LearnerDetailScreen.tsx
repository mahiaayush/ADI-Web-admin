import { CircularProgress, Grid } from "@material-ui/core";
import { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router";
import {
  ArrowBackIos
} from "@material-ui/icons";
import { useDispatch, useSelector } from "../../store";
import { getLearnersDetails } from "../../store/actions/learnerDetailsAction";
import { getLearnerSessionList } from "../../store/actions/learnerSessionListAction";
import { makeStyles } from '@material-ui/core/styles';
import LearnerSessionScreen from "./LearnerSessionScreen";
import { AllActionPlansAction } from "src/store/actions/AllActionPlansAction";
import Popup from "./Popup";
import ActionPlan from "../ActionPlan/ActionPlan";
import CareerSuccessionPlan from "../CSP/CareerSuccessionPlan";
import CareerSuccessPlan from "../CSMP/CareerSuccessPlan";
import { CounsellorLearnerDetailAction } from "src/store/actions/CounsellorLearnersDetailAction";
import { getPersonifyCspAction } from "src/store/actions/GetPersonifyCspAction";
import AppRejPopup from "./AppRejPopup";

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
    middleBox: {
      width: "10%",
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
    display: "flex"
  },
  normal: {
    background: "transparent",
    textDecoration: "none !important",
    cursor: "pointer",
    paddingRight: "0",
    border: "none",
    // fontWeight: "bold"
  },
  spinnerClass: {
    marginTop: "100px",
    marginLeft: "50px",
    textAlign: "center"
  },
});

const LearnerDetailScreen = (props) => {
  const { userSid } = useParams();
  // const currentCounsellorUserSid = localStorage.getItem('currentCounsellorUserSid');
  // const userSid = currentCounsellorUserSid;
  const learnerId = props.learnerID;
  const subscribeId = props.SubId;
  const dispatch = useDispatch();
  const { learners } = useSelector((state) => state.learnerList);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLimit, setInitialLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [dropOn, setDropOn] = useState(false);
  const [initialSearch, setInitialSearch] = useState("");
  const [activeTab, setActiveTab] = useState<number>(0);
  const smassociationId = learnerId;
  const [upcoming, setUpcoming] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const [voidPop, setVoidPop] = useState(false);
  const [reasonPopup, setReasonPopup] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [scheduleDate, setScheduleDate] = useState(null);
  const [applicationId, setApplicationId] = useState(null);
  const [actionPlanOpen, setActionPlanOpen] = useState(false);
  const [scheduledId, setScheduledId] = useState(null);
  const [cspFlag, setCspFlag] = useState(false);
  const [personifyCspFlag, setPersonifyCspFlag] = useState(false);
  const [personifyCspSid, setPersonifyCspSid] = useState(null);
  const [csmpOpen, setCsmpOpen] = useState(false);
  const [actionPlanArr, setActionPlanArr] = useState([]);
  const location = useLocation();
  const url = location.pathname;
  const hash = url.substring(url.lastIndexOf("/") + 1);

  const lstLearnerDetails = useSelector(
    state => state?.dashboardLearnerDetails?.learnersDetails?.list[0]
  );
  const counsellorLearnerDetail = useSelector(
    state => state?.counsellorLearnersDetail?.counsellorLearnersDetail?.data
  )
  const personifyCsp = useSelector(
    state => state?.GetPersonifyCsp?.getPersonifyCspResponse?.data
  )

  let personifyCspdata = [];
  if (personifyCsp && personifyCsp?.length) {
     personifyCspdata = [...personifyCsp];
    personifyCspdata.sort((a, b) => a.AgendaId - b.AgendaId);
  }
  //   useEffect(() => {
//     if (typeof InterviewTitles !== 'undefined') {
//       const dataVal = JSON.parse(JSON.stringify(InterviewTitles));
//       dataVal.map((item, index) => {
//         return item.value = 0
//       })
//     setTitleData(dataVal)
//   }
// }, [InterviewTitles])

  useEffect(() => {
     dispatch(CounsellorLearnerDetailAction(subscribeId))
  }, [])
  useEffect(() => {
     dispatch(getPersonifyCspAction(smassociationId, subscribeId, hash))
  }, [])
  useEffect(() => {
    if (lstLearnerDetails?.ActionPlan) {
      const dataArray = JSON.parse(JSON.stringify(lstLearnerDetails?.ActionPlan))
      setActionPlanArr(dataArray) 
    }
  }, [lstLearnerDetails?.ActionPlan])

  let Sid;
  if (counsellorLearnerDetail && counsellorLearnerDetail?.CSP?.length > 0) {
    Sid = counsellorLearnerDetail?.CSP[0]?.ScheduleId;
  }
  const learnerAllActionplans = useSelector(
    (state: any) => state?.learnerActionPlans?.learnerAllActionplans?.data
  )

  const OldActionPlanHandler = (items) => {
    setScheduledId(items?.ScheduleId)
    setActionPlanOpen(true);
  }
  
  // useEffect(() => {
  //   setIsLoading(true);
  //   dispatch(
  //     getLearnersDetails()
  //   ).then(() => setIsLoading(false));
  // }, [page, limit, search]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getLearnerSessionList("60", "", search, smassociationId, hash)
    ).then(() => setIsLoading(false));
  }, [page, limit, search]);

  useEffect(() => {
    dispatch(AllActionPlansAction(smassociationId, hash, subscribeId)) 
  }, []);

  const openActionPlan = (val) => {
    props.setScheduleId(val.ScheduleId);
    props.setActionPlan(true);
  }
   
  const personifyCspHandler = (val) => {
    setPersonifyCspSid(val?.ScheduleId)
    setPersonifyCspFlag(true);
  }
  const classes = useStyles();

  const backHandler = () => {
    props.setLearnerDetailScreen(false);
  }

  const StringConstants = {
    premiumPersonify: "PREMIUM-PERSONIFY",
    premiumIgnitor: "PREMIUM-IGNITOR",
    premiumCsmp: "PREMIUM-CSMP"
  }

  return (
      isLoading ? <div className={classes.spinnerClass}><CircularProgress /> </div>
      : <Grid item xs={12} className="headerBoxes">
      <div className="main-div-tag">
        <div>
          <ArrowBackIos
            className={classes.backArrow}
            onClick={() => backHandler()}
          />
        </div>
        <div className={classes.learnerNameHead}>
          {counsellorLearnerDetail?.LearnerFirstName}{" "}
          {counsellorLearnerDetail?.LearnerLastName}
        </div>
      </div>

      <div className="main-div clickonfirstname">
        <div className="clickonfirstname">
          <p>
            <span>Name:</span> {counsellorLearnerDetail?.LearnerFirstName}{" "}
            {counsellorLearnerDetail?.LearnerLastName}
          </p>
          <p>
            <span>Grade:</span>{" "}
            {counsellorLearnerDetail?.Grade
              ? counsellorLearnerDetail?.Grade
              : "Not Available"}
          </p>
          <p>
            <span>School:</span>{" "}
            {counsellorLearnerDetail?.SchoolName
              ? counsellorLearnerDetail?.SchoolName
              : "Not Available"}
          </p>
          <p>
            <span>Personality Animal:</span>{" "}
            {counsellorLearnerDetail?.PersonalityAnimal
              ? counsellorLearnerDetail?.PersonalityAnimal
              : "Not Available"}
          </p>
          {counsellorLearnerDetail?.EntityId !== "PC" && <p>
            <span>Entity Name: </span> {counsellorLearnerDetail?.EntityName ? counsellorLearnerDetail?.EntityName : "Not Available"}
          </p>}
         
        </div>
        <div className="secondpart clickonfirstname ">
          <p>
            <span>Package:</span> {counsellorLearnerDetail?.Plan}
          </p>
          {counsellorLearnerDetail?.ZohoPlanId === StringConstants.premiumPersonify && counsellorLearnerDetail?.CSP[0]?.CspId && counsellorLearnerDetail?.CSP[0]?.Status === "Published" && (
              <p>
                <span>CSP: </span>
                <button
                  className={`${classes.normal} cspCsmpClass`}
                  type="button"
                  onClick={() => setCspFlag(true)}
                >
                  CSP
                </button>
              </p>
            )}
             {(counsellorLearnerDetail?.ZohoPlanId === StringConstants.premiumPersonify || counsellorLearnerDetail?.ZohoPlanId === StringConstants.premiumCsmp) && counsellorLearnerDetail?.CSP?.length === 0 && (
              <p>
                <span>CSP: </span>
                 Not Available
              </p>
            )}
        
          {counsellorLearnerDetail?.ZohoPlanId === StringConstants.premiumCsmp && counsellorLearnerDetail?.CSP[0]?.CsmpId && counsellorLearnerDetail?.CSP[0]?.Status === "Published" && (
              <p>
                <span>CSP: </span>
                <button
                  className={`${classes.normal} cspCsmpClass`}
                  type="button"
                  onClick={() => setCsmpOpen(true)}
                >
                  CSP
                </button>
              </p>
            )}

        {counsellorLearnerDetail?.ZohoPlanId === StringConstants.premiumPersonify && (
              <p className={classes.actionPlanMainP}>
                <span>ALL CSP&apos;s: </span>  &nbsp;
                {personifyCspdata?.length > 0 ? (
                    <div className={classes.actionPlanMainDiv}>
                      {personifyCspdata.map((csp, ind) => {
                        return (
                          <button
                            className={`${classes.normal} cspCsmpClass`}
                            type="button"
                            onClick={() => personifyCspHandler(csp)}
                          >
                            CSP{ind + 1} <span>|</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    `CSP's Not Available`
                  )}
              </p>
            )}
          {counsellorLearnerDetail?.ZohoPlanId !== StringConstants.premiumIgnitor && counsellorLearnerDetail?.ZohoPlanId !== StringConstants.premiumPersonify && counsellorLearnerDetail?.ZohoPlanId !== StringConstants.premiumCsmp && (
              <>
                <p>
                  {" "}
                  <span>Tasks (complete / total):</span>{" "}
                  {learnerAllActionplans?.Task?.TaskCompletedCount} /{" "}
                  {learnerAllActionplans?.Task?.TaskAssignedCount}{" "}
                </p>
                <p className={classes.actionPlanMainP}>
                  <span>Action Plan:</span> &nbsp;
                  {counsellorLearnerDetail?.ActionPlan?.length > 0 ? (
                    <div className={classes.actionPlanMainDiv}>
                      {counsellorLearnerDetail?.ActionPlan.sort(
                        (a, b) => a.AgendaId - b.AgendaId
                      ).map((acpl, ind) => {
                        return (
                          <button
                            className={`${classes.normal} cspCsmpClass`}
                            type="button"
                            onClick={() => openActionPlan(acpl)}
                          >
                            AP{acpl?.AgendaOrder} <span>|</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    `Not Available`
                  )}
                </p>
                <p className={classes.actionPlanMainP}>
                  <span>All Action Plans:</span> &nbsp;
                  {learnerAllActionplans?.actionPlan?.length > 0 ? (
                    <div className={classes.actionPlanMainDiv}>
                      {learnerAllActionplans?.actionPlan?.map((acpls, indx) => {
                        return (
                          <button
                            className={`${classes.normal} cspCsmpClass`}
                            type="button"
                            onClick={() => OldActionPlanHandler(acpls)}
                          >
                            AP{acpls?.AgendaOrder} <span>|</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    `Not Available`
                  )}
                </p>
              </>
            )}
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
        setReasonPopup={setReasonPopup}
        setActionPlan={props.setActionPlan}
        setActionPlanScheduleId={props.setScheduleId}
        setVoidPop={setVoidPop}
      />
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        ScheduleId={scheduleId}
        StartTime={startTime}
        EndTime={endTime}
        ScheduleDate={scheduleDate}
        ApplicationId={applicationId}
        Reason={reasonPopup}
        pakage={counsellorLearnerDetail?.ZohoPlanId}
      />
      {actionPlanOpen && (
        <ActionPlan
          open={actionPlanOpen}
          scheduleId={scheduledId}
          setOpen={setActionPlanOpen}
        />
      )}
      {cspFlag && (
        <CareerSuccessionPlan
          open={cspFlag}
          scheduleId={Sid}
          userSid={hash}
          setOpen={setCspFlag}
        />
      )}
       {personifyCspFlag && (
        <CareerSuccessionPlan
          open={personifyCspFlag}
          scheduleId={personifyCspSid}
          userSid={hash}
          setOpen={setPersonifyCspFlag}
        />
      )}
      {csmpOpen && (
        <CareerSuccessPlan
          open={csmpOpen}
          scheduleId={Sid}
          userSid={hash}
          setOpen={setCsmpOpen}
        />
      )}
        <AppRejPopup  
        ScheduleId={scheduleId}
        Reason={reasonPopup}
        openPopupReject={voidPop}
        setOpenPopupReject={setVoidPop}
        smId={smassociationId}
        />
    </Grid>
  );
};
export default LearnerDetailScreen;
