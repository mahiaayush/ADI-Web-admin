import * as React from "react";
import { Button, FormControlLabel, Radio, Checkbox, CircularProgress } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Close } from "@material-ui/icons";
import "../../assets/css/ActionPlan.css";
import { useDispatch, useSelector } from "../../store";
import { getLocalTime } from "src/utils/utility";
import getCSMPAction from "src/store/actions/getCSMPAction";

export default function CareerSuccessPlan(props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    props.setOpen(false);
  };

  React.useEffect(() => {
    setIsLoading(true);
    dispatch(getCSMPAction(props.scheduleId, props.userSid)).then(() => setIsLoading(false));
  }, []);

  const CsmpData = useSelector(
    (state: any) => state?.careerSuccessMembership?.CSMPResponse?.data
  );

  const cspData = CsmpData?.cspData?.[0];

  const userData = CsmpData?.userData;

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  });

  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={handleClose}>
        {CsmpData && !isLoading ? (
          <>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <Typography
                  sx={{ ml: 0, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  {userData?.LEARNER_GIVEN_NAME}{" "}
                  {userData?.LEARNER_FAMILY_NAME !== null 
                  && userData?.LEARNER_FAMILY_NAME}
                </Typography>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  style={{ paddingRight: "0px" }}
                >
                  <Close />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Container maxWidth="xl">
              <div className="headwrap">
                <div className="detail">
                  <h4 className="font-weight-bold mt-0 mb-0">
                    {userData?.PLAN_NAME}
                  </h4>
                </div>
                <div className="session-count">
                  Session:{" "}
                  <span className="font-weight-bold">
                    {cspData?.AGENDA_ORDER} of {cspData?.SESSION_ORDER_BY}
                  </span>
                </div>
              </div>
              <div className="headwrap">
                <div className="detail">
                  {/* <FaCompass className="ap-icon" /> */}
                  <span className="font-weight-bold">
                    Status:{" "}
                    {cspData?.STATUS === "P" ? "Published" : "Unpublished"}
                  </span>
                </div>
              </div>
              <div className="headwrap pt-0">
                <div className="detail">
                  {/* <FaCompass className="ap-icon" /> */}
                  <span className="font-weight-bold">
                    Last Updated: {getLocalTime(cspData?.MODIFIED_ON)[3]}
                  </span>
                </div>
              </div>
              <p>
                <span className="font-weight-bold">Animal Name:</span>{" "}
                {userData?.ANML_NAME}
              </p>
              <p>
                <span className="font-weight-bold">Interests:</span>{" "}
                {userData?.INTERESTS}
              </p>
              <p>
                <span className="font-weight-bold">Skills:</span>{" "}
                {userData?.SKILLS}
              </p>
              <p>
                <span className="font-weight-bold">Qualification:</span>{" "}
                {userData?.SUBSCRIBER_QUALIFICATION}
              </p>
              <Divider />
              <div className="box">
                <div className="box-header">
                  <h3>{cspData?.AGENDA_TITLE}</h3>
                </div>
                <div className="content-box">
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">Session Status</h4>
                    <FormControlLabel
                      value="Attended"
                      control={
                        <Radio
                          checked={cspData?.SESSION_STATUS === "A"}
                          disabled
                        />
                      }
                      label="Attended"
                    />
                    <FormControlLabel
                      value="Unattended"
                      control={
                        <Radio
                          checked={cspData?.SESSION_STATUS === "NA"}
                          disabled
                        />
                      }
                      label="Unattended"
                    />
                  </div>
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">Meeting Status</h4>
                    <FormControlLabel
                      value="Attended"
                      control={
                        <Radio
                          checked={cspData?.MEETING_STATUS === "C"}
                          disabled
                        />
                      }
                      label="Completed"
                    />
                    <FormControlLabel
                      value="Unattended"
                      control={
                        <Radio
                          checked={cspData?.MEETING_STATUS === "NC"}
                          disabled
                        />
                      }
                      label="Not Completed"
                    />
                  </div>
                  {userData?.GRADE_NO > 12 ? (
                    <>
                      <div className="fieldGroup">
                        <h4 className="mb-0 mt-0">Work Experience</h4>
                        <p>
                          {cspData?.WORK_EXP !== null ? cspData?.WORK_EXP : "-"}
                        </p>
                      </div>
                      <div className="fieldGroup">
                        <h4 className="mb-0 mt-0">Industries</h4>
                        <p>
                          {cspData?.INDUSTRIES !== null
                            ? cspData?.INDUSTRIES
                            : "-"}
                        </p>
                      </div>
                      <div className="fieldGroup">
                        <h4 className="mb-0 mt-0">Tertiary Education</h4>
                        <p>
                          {cspData?.TERTIARY_EDUCATION !== null
                            ? cspData?.TERTIARY_EDUCATION
                            : "-"}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="fieldGroup">
                        <h4 className="mb-0 mt-0">Educational Board</h4>
                        <p>
                          {cspData?.EDUCATIONAL_BOARD !== null
                            ? cspData?.EDUCATIONAL_BOARD
                            : "-"}
                        </p>
                      </div>
                      <div className="fieldGroup">
                        <h4 className="mb-0 mt-0">Educational Stream</h4>
                        <p>
                          {cspData?.EDUCATIONAL_STREAM !== null
                            ? cspData?.EDUCATIONAL_STREAM
                            : "-"}
                        </p>
                      </div>
                      <div className="fieldGroup">
                        <h4 className="mb-0 mt-0">State Board Name</h4>
                        <p>
                          {cspData?.STATE_BOARD_NAME !== null
                            ? cspData?.STATE_BOARD_NAME
                            : "-"}
                        </p>
                      </div>
                    </>
                  )}
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">Career Shortlisted</h4>
                  </div>
                  {cspData?.CAREER_DATA?.map((item) => (
                    <Container
                      maxWidth="lg"
                      style={{
                        padding: "0px",
                        margin: "10px 10px 10px 10px",
                        border: "1px solid black",
                        borderRadius: "8px",
                        width: "98%",
                      }}
                    >
                      <div className="cspAccordianDv">
                        <colgroup
                          style={{
                            margin: "10px auto 10px auto",
                            padding: "10px",
                          }}
                        >
                          <h1>{item?.CareerTitle}</h1>
                          <h2>
                            Remuneration Expected:{" "}
                            <b style={{ fontWeight: 400, fontSize: "10px" }}>
                              ₹
                              {formatter.format(
                                item?.Remuneration?.[0]?.SALREGCAR_VAL
                              )}{" "}
                              - ₹
                              {formatter.format(
                                item?.Remuneration?.[1]?.SALREGCAR_VAL
                              )}
                            </b>
                          </h2>
                          <h2>Recommended Study Route:</h2>
                          <div className="recStudyRouteDiv">
                            <ol>
                              {item?.StudyRoute?.map((route) => (
                                <li>
                                  {route?.STREAM_NAME}:{" "}
                                  <span>{route?.SUBJECT_NAME}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                          <h4 className="mb-0 mt-0">Functional Skills</h4>
                          <p>{item?.FunctionalSkills}</p>
                          <h4 className="mb-0 mt-0">People Skills</h4>
                          <p>{item?.PeopleSkills}</p>
                        </colgroup>
                      </div>
                    </Container>
                  ))}
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">
                      Recommended Career Coaching Plans
                    </h4>
                    {cspData?.CC_PLAN?.map((itm) => (
                      <p>{itm}</p>
                    ))}
                  </div>
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">Learning Hub Courses</h4>
                    {cspData?.LH_COURSE?.map((itm) => (
                      <p>{itm}</p>
                    ))}
                  </div>
                  <div className="fieldGroup">
                    <h4 className="mb-0 mt-0">Notes</h4>
                    <p>{cspData?.NOTES !== "" ? cspData?.NOTES : "-"}</p>
                  </div>
                </div>
              </div>
            </Container>
          </>
        ) : (
          <><><div className="loading">
          <CircularProgress />
        </div></></>
        )}
      </Dialog>
    </div>
  );
}
