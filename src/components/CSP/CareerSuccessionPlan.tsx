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
import { CounsellorCareerSuccessionPlan } from "src/store/actions/CounselorCareerSuccessionPlan";
import moment from "moment";
import { getLocalTime } from "src/utils/utility";

export default function CareerSuccessionPlan(props) {
  const [openToggele, setOpenToggle] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [swotAnalysisForm, setSwotAnalysisForm] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    props.setOpen(false);
  };

  React.useEffect(() => {
    setIsLoading(true);
    dispatch(CounsellorCareerSuccessionPlan(props.scheduleId, props.userSid)).then(() => setIsLoading(false));
  }, []);
  
  const CounserllorCspResponse = useSelector((state: any) => state?.counselorCareerSuccessionPlan?.counselorCareerSuccessionPlanResponse);

      const ToggleAccordian = currPlan => {
        if (openToggele?.[currPlan] === true) {
          setOpenToggle({ [currPlan]: false });
        } else {
          setOpenToggle({ [currPlan]: true });
        }
      };

  const showAgendaCount = val => {
    switch (val) {
      case 'PREMIUM IGNITOR':
        return 1;
        break;
      case 'PREMIUM PATHWAY':
        return 3;
        break;
      case 'PREMIUM PURSUIT':
        return 5;
        break;
      default:
        return null
    }
  };

  const formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 })

  return (
    <div>
     <Dialog fullScreen open={props.open} onClose={handleClose}>
            {CounserllorCspResponse && !isLoading ? (
              <>
                <AppBar sx={{ position: "relative" }}>
                  <Toolbar>
                    <Typography
                      sx={{ ml: 0, flex: 1 }}
                      variant="h6"
                      component="div"
                    >
                      {CounserllorCspResponse?.data?.userData?.LEARNER_GIVEN_NAME}{" "}
                      {CounserllorCspResponse?.data?.userData?.LEARNER_FAMILY_NAME}
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
                      {/* <FaCompass className="ap-icon" /> */}
                      <h4 className="font-weight-bold mt-0 mb-0">
                        {CounserllorCspResponse?.data?.userData?.PLAN_NAME}
                      </h4>
                    </div>
                    <div className="session-count">
                      Session:
                      <span className="font-weight-bold">
                        &nbsp;{CounserllorCspResponse?.data?.cspData?.length} of{" "}
                        {CounserllorCspResponse?.data?.userData?.CURRENT_CSP_ORDER}
                      </span>
                    </div>
                  </div>
                  <div className="headwrap">
                    <div className="detail">
                      {/* <FaCompass className="ap-icon" /> */}
                      <span className="font-weight-bold">
                        Status:{" "}
                        {CounserllorCspResponse?.data?.cspData?.[CounserllorCspResponse?.data?.userData?.CURRENT_CSP_ORDER - 1]?.STATUS === "P"
                          ? "Published"
                          : "Unpublished"}
                      </span>
                    </div>
                  </div>
                  <div className="headwrap pt-0">
                    <div className="detail">
                      {/* <FaCompass className="ap-icon" /> */}
                      <span className="font-weight-bold">
                        Last Updated:{" "}
                        {
                          getLocalTime(
                            CounserllorCspResponse?.data?.cspData?.[0]?.CREATED_ON
                          )[3]
                        }
                      </span>
                    </div>
                  </div>
                  <Divider />
                  <div className="box">
                    {/* <div className="box-header">
                      <h3>{ActionPlanData.Agenda}</h3>
                      <h3>{ActionPlanData.SubAgenda}</h3>
                    </div> */}
                    <div className="content-box">
                      <div className="fieldGroup">
                        <h4 className="mb-0 mt-0">SESSION STATUS</h4>
                        <FormControlLabel
                          value="Attended"
                          control={
                            <Radio
                              checked={
                                CounserllorCspResponse?.data?.cspData?.[CounserllorCspResponse?.data?.userData?.CURRENT_CSP_ORDER - 1]
                                  ?.SESSION_STATUS === "A"
                              }
                              disabled
                            />
                          }
                          label="Attended"
                        />
                        <FormControlLabel
                          value="Unattended"
                          control={
                            <Radio
                              checked={
                                CounserllorCspResponse?.data?.cspData?.[CounserllorCspResponse?.data?.userData?.CURRENT_CSP_ORDER - 1]
                                  ?.SESSION_STATUS !== "A"
                              }
                              disabled
                            />
                          }
                          label="Not attended"
                        />
                      </div>
                      <div className="fieldGroup">
                        <h4 className="mb-0 mt-0">MEETING STATUS</h4>
                        <FormControlLabel
                          value="Attended"
                          control={
                            <Radio
                              checked={
                                CounserllorCspResponse?.data?.cspData?.[CounserllorCspResponse?.data?.userData?.CURRENT_CSP_ORDER - 1]
                                  ?.MEETING_STATUS === "C"
                              }
                              disabled
                            />
                          }
                          label="Completed"
                        />
                        <FormControlLabel
                          value="Unattended"
                          control={
                            <Radio
                              checked={
                                CounserllorCspResponse?.data?.cspData?.[CounserllorCspResponse?.data?.userData?.CURRENT_CSP_ORDER - 1]
                                  ?.MEETING_STATUS !== "C"
                              }
                              disabled
                            />
                          }
                          label="Not Completed"
                        />
                      </div>
                      <Divider />
                      <div className="fieldGroup">
                        <h3>PERSONALITY QUIZ FINDINGS</h3>
                        <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                          Personality Animal :{" "}
                        </h4>
                        <p>
                          &nbsp;{CounserllorCspResponse?.data?.userData?.ANML_NAME}
                        </p>
                        <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                          Interests :{" "}
                        </h4>
                        <p>
                          &nbsp;{CounserllorCspResponse?.data?.userData?.INTERESTS}
                        </p>
                        <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                          Skills :
                        </h4>
                        <p>
                          &nbsp;{CounserllorCspResponse?.data?.userData?.SKILLS}
                        </p>
                        {/* <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                          Career Recommendations :
                        </h4>
                        <p>&nbsp;PILOT</p> */}
                      </div>
                      <Divider />
                      {CounserllorCspResponse?.data?.cspData?.length >= 1 && (
                        <div
                          className="box-header"
                          role="button"
                          onClick={() => ToggleAccordian(1)}
                          tabIndex={0}
                          onKeyDown={() => ToggleAccordian(1)}
                        >
                          <h3>Plan {CounserllorCspResponse?.data?.cspData?.[0].AGENDA_ORDER} - {CounserllorCspResponse?.data?.cspData?.[0].AGENDA_TITLE}</h3>
                          <h3>{CounserllorCspResponse?.data?.cspData?.[0].STATUS === "P" ? "Published" : "Draft"}</h3>
                        </div>
                      )}
                      {openToggele?.["1"] === true && CounserllorCspResponse?.data?.cspData?.length >= 1 && (
                          <>
                            <div className="fieldGroup">
                              <h3>Self Discovery</h3>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                                Work experience :{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[0]
                                    .P1_WORK_EXP
                                }{" "}
                                years
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                                Industries Worked On :{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[0]?.P1_INDUSTRIES?.join(', ')}
                              </p>
                              <h3>Counsellor Remarks</h3>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                                Session Summary :{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[0]
                                    .ALL_SESSION_SUMMARY
                                }
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                                Next Step :{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[0]
                                    .ALL_NEXT_STEP
                                }
                              </p>
                            </div>
                          </>
                        )}
                      <Divider />
                      {CounserllorCspResponse?.data?.cspData?.length >= 2 && (
                        <div
                          className="box-header"
                          role="button"
                          onClick={() => { ToggleAccordian(2); setSwotAnalysisForm(false); }}
                          tabIndex={0}
                          onKeyDown={() => { ToggleAccordian(2); setSwotAnalysisForm(false); }}
                        >
                           <h3>Plan {CounserllorCspResponse?.data?.cspData?.[1].AGENDA_ORDER} - {CounserllorCspResponse?.data?.cspData?.[1].AGENDA_TITLE}</h3>
                           <h3>{CounserllorCspResponse?.data?.cspData?.[1].STATUS === "P" ? "Published" : "Draft"}</h3>
                        </div>
                      )}
                      {openToggele?.["2"] === true && CounserllorCspResponse?.data?.cspData?.length >= 2 && (
                          <>
                            {CounserllorCspResponse?.data?.cspData?.[1].P2_CAREER_DATA && CounserllorCspResponse?.data?.cspData?.[1].P2_CAREER_DATA.length > 0 && CounserllorCspResponse?.data?.cspData?.[1].P2_CAREER_DATA.map(
                              (item) => (
                                <Container
                                  maxWidth="lg"
                                  style={{
                                    padding: "0px",
                                    margin: "10px 10px 10px 10px",
                                    border: "1px solid black",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <div className="cspAccordianDv">
                                    <colgroup
                                      style={{
                                        margin: "10px auto 10px auto",
                                        padding: "10px",
                                      }}
                                    >
                                      <h1>{item.CareerTitle}</h1>
                                      <h2>
                                        Remuneration Expected:{" "}
                                        <b>
                                          ₹{formatter.format(item?.Remuneration?.[0]?.SALREGCAR_VAL)} - ₹
                                          {formatter.format(item?.Remuneration?.[1]?.SALREGCAR_VAL)}
                                        </b>
                                      </h2>
                                      <h2>Recommended Study Route:</h2>
                                      <ol>
                                        {item.StudyRoute && item.StudyRoute.length > 0 && item.StudyRoute.map((item1) => (
                                          <li>
                                            <span>{item1.STREAM_NAME}:{" "}</span>
                                            <span>{item1.SUBJECT_NAME}</span>
                                          </li>
                                        ))}
                                      </ol>
                                      <h2>College Shortlist:</h2>
                                      <article>
                                        {item.CourseCollege && item.CourseCollege.length > 0 && item.CourseCollege.map((item2) => (
                                          <>
                                            <h3>{item2.ENTITY_NAME}</h3>
                                            {item2.COURSE_TITLE && item2.COURSE_TITLE.length && item2.COURSE_TITLE.map((title) => (
                                               <button type="button">
                                               {title}
                                             </button>
                                            ))}
                                          </>
                                        ))}
                                      </article>
                                    </colgroup>
                                  </div>
                                </Container>
                              )
                            )}
                            <div className="fieldGroup">
                              <h3>Leading Employers</h3>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                                Employers names :{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[1]
                                    .P2_EMP_NAMES
                                }
                              </p>
                              <h3>Counsellor Remarks</h3>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                                Session Summary :{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[1]
                                    .ALL_SESSION_SUMMARY
                                }
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                                Next Step :{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[1]
                                    .ALL_NEXT_STEP
                                }
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                                Recommended Career Coaching Plans :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_CC_PLAN?.join(', ')}
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                                Recommended Learning Hub Courses :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_LH_COURSE?.join(', ')}
                              </p>
                              <div
                                className="swot-header"
                              >
                                <h3>&nbsp; SWOT Analysis :</h3>
                               {!swotAnalysisForm && <Button variant="outlined" onClick={() => setSwotAnalysisForm(true)}>+</Button>} 
                               {swotAnalysisForm && <Button variant="outlined" onClick={() => setSwotAnalysisForm(false)}>-</Button>} 
                               </div>
                             {swotAnalysisForm && (<><Divider />
                              <h4>STRENGTH</h4>
                              <Divider />
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                             1. What strengths do you see in yourself?
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SI}
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              Action Plan :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SIAP}
                              </p>
                              <div>
                             <h4 className="mb-0 mt-0">Action Plan Status</h4>
                              <FormControlLabel
                                value="Attended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SIAP_STATUS === "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Completed"
                              />
                              <FormControlLabel
                                value="Unattended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SIAP_STATUS !== "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Not Completed"
                              />
                              </div>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              2. What strengths do others see in you?
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SII}
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              Action Plan :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SIIAP}
                              </p>
                              <div>
                             <h4 className="mb-0 mt-0">Action Plan Status</h4>
                              <FormControlLabel
                                value="Attended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SIIAP_STATUS === "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Completed"
                              />
                              <FormControlLabel
                                value="Unattended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SIIAP_STATUS !== "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Not Completed"
                              />
                              </div>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                             3. What kind of competitive advantages you have? (like qualifications, work experience, networks, etc.)
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SIII}
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              Action Plan :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SIIIAP}
                              </p>
                              <div>
                             <h4 className="mb-0 mt-0">Action Plan Status</h4>
                              <FormControlLabel
                                value="Attended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SIIIAP_STATUS === "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Completed"
                              />
                              <FormControlLabel
                                value="Unattended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_SIIIAP_STATUS !== "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Not Completed"
                              />
                              </div>
                              <Divider />
                              <h3>WEAKNESS</h3>
                              <Divider />
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                             1. What areas do you think need improvement?
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_WI}
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              Action Plan :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_WIAP}
                              </p>
                              <div>
                             <h4 className="mb-0 mt-0">Action Plan Status</h4>
                              <FormControlLabel
                                value="Attended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_WIAP_STATUS === "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Completed"
                              />
                              <FormControlLabel
                                value="Unattended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_WIAP_STATUS !== "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Not Completed"
                              />
                              </div>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                             2. What areas do others think need improvement in you?
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_WII}
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              Action Plan :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_WIIAP}
                              </p>
                              <div>
                             <h4 className="mb-0 mt-0">Action Plan Status</h4>
                              <FormControlLabel
                                value="Attended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_WIIAP_STATUS === "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Completed"
                              />
                              <FormControlLabel
                                value="Unattended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_WIIAP_STATUS !== "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Not Completed"
                              />
                              </div>
                              <Divider />
                              <h3>OPPORTUNITIES</h3>
                              <Divider />
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                             1. Emerging trends in your industry :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OI}
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              Action Plan :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OIAP}
                              </p>
                              <div>
                             <h4 className="mb-0 mt-0">Action Plan Status</h4>
                              <FormControlLabel
                                value="Attended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OIAP_STATUS === "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Completed"
                              />
                              <FormControlLabel
                                value="Unattended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OIAP_STATUS !== "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Not Completed"
                              />
                              </div>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              2. Networking Opportunities :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OII}
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              Action Plan :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OIIAP}
                              </p>
                              <div>
                             <h4 className="mb-0 mt-0">Action Plan Status</h4>
                              <FormControlLabel
                                value="Attended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OIIAP_STATUS === "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Completed"
                              />
                              <FormControlLabel
                                value="Unattended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OIIAP_STATUS !== "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Not Completed"
                              />
                              </div>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                             3. Your Strengths & Weaknesses :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OIII}
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              Action Plan :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OIIIAP}
                              </p>
                              <div>
                             <h4 className="mb-0 mt-0">Action Plan Status</h4>
                              <FormControlLabel
                                value="Attended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OIIIAP_STATUS === "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Completed"
                              />
                              <FormControlLabel
                                value="Unattended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_OIIIAP_STATUS !== "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Not Completed"
                              />
                              </div>
                              <Divider />
                              <h3>THREATS</h3>
                              <Divider />
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              1. Obstacles that the learner is facing in their chosen field?
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_TI}
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              Action Plan :
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_TIAP}
                              </p>
                              <div>
                             <h4 className="mb-0 mt-0">Action Plan Status</h4>
                              <FormControlLabel
                                value="Attended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_TIAP_STATUS === "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Completed"
                              />
                              <FormControlLabel
                                value="Unattended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_TIAP_STATUS !== "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Not Completed"
                              />
                              </div>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              2. External impediments that the learner is facing in their chosen field?
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_TII}
                              </p>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                              Action Plan :
                              </h4> 
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_TIIAP}
                              </p>
                              <div>
                             <h4 className="mb-0 mt-0">Action Plan Status</h4>
                              <FormControlLabel
                                value="Attended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_TIIAP_STATUS === "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Completed"
                              />
                              <FormControlLabel
                                value="Unattended"
                                control={
                                  <Radio
                                    checked={
                                      CounserllorCspResponse?.data?.cspData?.[1]?.P2_SWOT_TIIAP_STATUS !== "C"
                                    }
                                    disabled
                                  />
                                }
                                label="Not Completed"
                              />
                              <Divider />
                              </div>
                             </> 
                              )} 
                            </div>
                          </>
                        )}
                      <Divider />
                      {CounserllorCspResponse?.data?.cspData?.length >= 3 && <div
                        className="box-header"
                        role="button"
                        onClick={() => ToggleAccordian(3)}
                        tabIndex={0}
                        onKeyDown={() => ToggleAccordian(3)}
                      >
                         <h3>Plan {CounserllorCspResponse?.data?.cspData?.[2].AGENDA_ORDER} - {CounserllorCspResponse?.data?.cspData?.[2].AGENDA_TITLE}</h3>
                         <h3>{CounserllorCspResponse?.data?.cspData?.[2].STATUS === "P" ? "Published" : "Draft"}</h3>
                      </div> }
                      {openToggele?.["3"] === true && CounserllorCspResponse?.data?.cspData?.length >= 3 && (
                          <>
                            <div className="fieldGroup">
                              <h3>Suggested Skill Building Activities</h3>
                              <h4 className="mb-0 mt-0" style={{ float: "left" }}>
                                Activity names :{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[2]
                                    .P3_ACTIVITIES
                                }
                              </p>
                              <h3>Suggested Competitive Exams</h3>
    
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[2]
                                    .P3_COMPEXAMS
                                }
                              </p>
                              <h3>Suggested Competitive Scholarships</h3>
    
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[2]
                                    .P3_SCHOLARSHIPS
                                }
                              </p>
                              <h3>Counsellor Remarks</h3>
                              <h4 className="mb-0 mt-0">Resume Review </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[2]
                                    .P3_RESUME_REVIEW
                                }
                              </p>
                              <h4 className="mb-0 mt-0">Session Summary </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[2]
                                    .ALL_SESSION_SUMMARY
                                }
                              </p>
                              <h4 className="mb-0 mt-0">Next Steps </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[2]
                                    .ALL_NEXT_STEP
                                }
                              </p>
                            </div>
                          </>
                        )}
                      <Divider />
                      {CounserllorCspResponse?.data?.cspData?.length >= 4 && <div
                        className="box-header"
                        role="button"
                        onClick={() => ToggleAccordian(4)}
                        tabIndex={0}
                        onKeyDown={() => ToggleAccordian(4)}
                      >
                        <h3>Plan {CounserllorCspResponse?.data?.cspData?.[3].AGENDA_ORDER} - {CounserllorCspResponse?.data?.cspData?.[3].AGENDA_TITLE}</h3>
                        <h3>{CounserllorCspResponse?.data?.cspData?.[3].STATUS === "P" ? "Published" : "Draft"}</h3>
                      </div> }
                      {openToggele?.["4"] === true && CounserllorCspResponse?.data?.cspData?.length >= 4 && (
                          <>
                            <div className="fieldGroup">
                              <h4 className="mb-0 mt-0">
                                Competitive Exams shortlisted{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[3]
                                    .P4_COMPEXAMS
                                }
                              </p>
                              <h4 className="mb-0 mt-0">Dream Colleges </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[3]?.P4_DREAM_COLLEGES?.join(', ')}
                              </p>
                              <h4 className="mb-0 mt-0">Best Fit Colleges </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[3]?.P4_BEST_FIT_COLLEGES?.join(', ')}
                              </p>
                              <h4 className="mb-0 mt-0">Safe Colleges </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[3]?.P4_SAFE_COLLEGES?.join(', ')}
                              </p>
                              <h4 className="mb-0 mt-0">Scholarships </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[3]?.P4_SCHOLARSHIPS
                                }
                              </p>
                              <h4 className="mb-0 mt-0">
                                Application Prerequisite & Process (LOR/SOP){" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[3]
                                    .P4_LOR_SOP
                                }
                              </p>
                              <h4 className="mb-0 mt-0">Application Timelines </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[3]
                                    .P4_APPLICATION_TIMELINE
                                }
                              </p>
                              <h4 className="mb-0 mt-0">
                                Budgeting/Education Loan{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[3]
                                    .P4_BE_LOAN
                                }
                              </p>
                              <h4 className="mb-0 mt-0">
                                Relevant WEF Employability Skills{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {CounserllorCspResponse?.data?.cspData?.[3]?.P4_WEF_EMPLOYABILITY_SKILLS?.join(', ')}
                              </p>
                              <h4 className="mb-0 mt-0">
                                Activities/Courses to build relevant WEF Skills{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[3]?.P4_ACTIVITYCOURSE_WEF_SKILLS
                                }
                              </p>
                              <h3>Counsellor Remarks</h3>
                              <h4 className="mb-0 mt-0">Session Summary </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[3]
                                    ?.ALL_SESSION_SUMMARY
                                }
                              </p>
                              <h4 className="mb-0 mt-0">Next Steps </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[3]
                                    ?.ALL_NEXT_STEP
                                }
                              </p>
                            </div>
                          </>
                        )}
                      <Divider />
                      {CounserllorCspResponse?.data?.cspData?.length >= 5 && <div
                        className="box-header"
                        role="button"
                        onClick={() => ToggleAccordian(5)}
                        tabIndex={0}
                        onKeyDown={() => ToggleAccordian(5)}
                      >
                        <h3>Plan {CounserllorCspResponse?.data?.cspData?.[4].AGENDA_ORDER} - {CounserllorCspResponse?.data?.cspData?.[4].AGENDA_TITLE}</h3>
                        <h3>{CounserllorCspResponse?.data?.cspData?.[4].STATUS === "P" ? "Published" : "Draft"}</h3>
                      </div>}
                      {openToggele?.["5"] === true && CounserllorCspResponse?.data?.cspData?.length === 5 && (
                          <>
                            <div className="fieldGroup">
                              <h3>Counsellor Remarks</h3>
                              <h4 className="mb-0 mt-0">SOP/LOR Feedback </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[4]
                                    ?.P5_SOP_LER_FEEDBACK
                                }
                              </p>
                              <h4 className="mb-0 mt-0">
                                LinkedIn Profile Feedback{" "}
                              </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[4]
                                    ?.P5_LINKEDIN_PROFILE_FEEDBACK
                                }
                              </p>
                              <h4 className="mb-0 mt-0">Suggested Career Blogs </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[4]
                                    ?.P5_CAREER_BLOGS
                                }
                              </p>
                              <h4 className="mb-0 mt-0">Session Summary </h4>
                              <p>
                                &nbsp;
                                {
                                  CounserllorCspResponse?.data?.cspData?.[4]
                                    ?.ALL_SESSION_SUMMARY
                                }
                              </p>
                            </div>
                          </>
                        )}
                    </div>
                  </div>
                </Container>
              </>
            ) : (
              <><div className="loading">
              <CircularProgress />
            </div></>
            )}
          </Dialog>
      
    </div>
  );
}
