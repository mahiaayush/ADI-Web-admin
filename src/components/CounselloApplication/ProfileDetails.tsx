import { Link as RouterLink, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
  Breadcrumbs,
  Grid,
  Link,
  Button,
  CircularProgress
} from "@material-ui/core";
import {
  Article
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import PricingComponent from "./PricingComponent";
import "./DetailScreen.css";
import Approve from "./Approve";
import Reject from "./Reject";
import { flexbox } from "@material-ui/system";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  ADMIN_API_ENDPOINT,
  ADMIN_API_ENDPOINT_V2,
  GET_COUNSELLOR_API_DATA,
} from "../../store/constants";
import axios from "axios";
import http from "src/utils/http";
import moment from "moment";
import TabApp from "./TabApp";
import { makeStyles } from "@material-ui/core/styles";
import TestResultPopup from "./TestResultPopup";
import InterviewFeedbackForm from "./InterviewFeedbackForm";
import DocumentList from "./DocumentList";
import InterviewPopup from "./InterviewPopup";
import TrainingScorePopup from "./TrainingScorePopup";
import MockSessionScheduler from "./MockSessionScheduler";
import ViewCommercialPricing from "./ViewCommercialPricing";
import ViewFeedback from "./ViewFeedback";
import DownloadIcon from "@material-ui/icons/Download"
import { CSC_TEST_REPORT, GET_COMMERCIAL, GET_CSC_INTERVIEW_FEEDBACK } from "src/store/RbacConstants";

const useStyles = makeStyles({
  cellWidth: {
    width: "330px",
  },
  circularProgressLoadingClass: {
    "min-height": "80vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
  },
  flexClassMain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  NowShowingBox: {
    border: "1px solid #2abe79",
    color: "#2abe79",
    textAlign: "center",
    fontWeight: 400,
    fontSize: "12px !important",
    display: "inline-block !important",
    padding: "2px 5px",
    cursor: "pointer",
    margin: "0px 0px 0px 15px"
  }
});

 const ProfileDetails = ({ counsellorDetails, popupText, displayMsg, displayBtn, loading }) => {
  const { detailReducer } = useSelector((state: any) => state);
  const getCounsellorData = detailReducer?.DetailActionResponse?.data;
  const [testStatus, setTestStatus] = useState(getCounsellorData?.TEST_STATUS);
  const [resultPop, setResultPop] = useState(false);
  const [assignmentPop, setAssignmentPop] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState(false);
  const [testResponse, setTestResponse] = useState({});
  const [showDocList, setShowDocList] = useState(false);
  const [interviewPopup, setInterviewPopup] = useState(false);
  const [trainingStats, setTrainingStats] = useState(false);
  const [scheduleButton, setScheduleButton] = useState(false);
  const [mockSchecule, setMockSchedule] = useState(false);
  const [pricingCounsellor, setPricingCounsellor] = useState(false);
  const [viewPricing, setViewPricing] = useState(false);
  const [viewFeedback, setViewFeedback] = useState(false);

  const tableRowStyle = { borderBottom: "1pt solid #e0e0e0" };
  const handleClickEvent = () => {
    setResultPop(true);
  }

  const handleScheduleInterview = () => {
    setScheduleButton(true);
  }

  const viewInterviewFeedback = () => {
    setViewFeedback(true);
  }

  const handleMockSession = () => {
    setMockSchedule(true);
  }

  const handlePricingStatus = () => {
    setPricingCounsellor(true);
  }

  const timeCurr = moment.utc().toISOString()

  const interviewTime = getCounsellorData?.interviewEndDate

  const compareDate = (datetime) => {
    const currentDate = moment().format();
    const datetoCompare = moment(datetime).format();
    if (datetoCompare >= currentDate) {
      return true;
    }
      return false;
  }

  const handleInterviewEvent = () => {
    setInterviewPopup(true)
  }

  const viewPricingCommercial = () => {
    setViewPricing(true)
  }

  const handlerFeedbackForm = () => {
    setFeedbackForm(true);
  }

  // @ts-ignore
  // const id = "5dde8076-33b8-4901-8358-3dcb7352c565";
  const id = useParams();
  const sid = id.id;
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )

  const classes = useStyles()

  return (
    <> 
      {(Object.keys(getCounsellorData).length !== 0 && !loading) ? counsellorDetails && (<Grid sx={{ display: "flex", columnGap: 5, mt: 5 }}>
        <Grid>
          <Card>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ mb: 3, ml: 2 }}
                    >
                      About
                    </Typography>
                  </TableCell>
                  {/* <TableCell><Button onClick={viewInterviewFeedback}>View Feeedback</Button></TableCell> */}
                  <TableCell>{" "}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      lineHeight="40px"
                    >
                      Application ID
                    </Typography>
                  </TableCell>
                  {
                    // @ts-ignore
                    <TableCell>{getCounsellorData.APPLICATION_ID}</TableCell>
                  }
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      lineHeight="40px"
                    >
                      Name
                    </Typography>
                  </TableCell>
                  {
                    // @ts-ignore
                    <TableCell>{getCounsellorData.NAME}</TableCell>
                  }
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      lineHeight="40px"
                    >
                      Email
                    </Typography>
                  </TableCell>
                  {
                    // @ts-ignore
                    <TableCell>{getCounsellorData.EMAIL}</TableCell>
                  }
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      variant="subtitle2"
                      lineHeight="40px"
                    >
                      Phone
                    </Typography>
                  </TableCell>
                  <TableCell>{getCounsellorData.PHONE_NUMBER}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      lineHeight="40px"
                    >
                      No. years Experience
                    </Typography>
                  </TableCell>
                  {
                    // @ts-ignore
                    <TableCell>{getCounsellorData.EXPERIENCE_YEAR}</TableCell>
                  }
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      lineHeight="40px"
                    >
                      LinkedIn Profile
                    </Typography>
                  </TableCell>
                  {
                    // @ts-ignore
                    <TableCell>{getCounsellorData.LINKEDIN_URL}</TableCell>
                  }
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Typography color="textPrimary" variant="subtitle2">
                      Professional Synopsis
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cellWidth}>
                    <span style={{ wordBreak: 'break-word' }}>{getCounsellorData?.ProfessionalSynopsis}</span>
                  </TableCell>
                </TableRow>

                {getCounsellorData?.CSC_TYPE === "INDIVIDUAL" && <TableRow>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      lineHeight="40px"
                    >
                     Counsellor CV
                    </Typography>
                  </TableCell>
                  {(getCounsellorData?.CSC_CV !== null && getCounsellorData?.CSC_CV !== "") ? <TableCell className={classes.cellWidth}>
                    <a href={getCounsellorData?.CSC_CV} placeholder="Download" download>Download File</a>
                  </TableCell> : <TableCell>Not Available</TableCell>}
                </TableRow>}
              </TableBody>
            </Table>
          </Card>

          {getCounsellorData?.Languages?.length > 0 ? (
            <Card
              sx={{
                marginTop: "40px",
              }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{ mb: 3, ml: 2 }}
                      //   sx={{ mb: 2.2, ml: 2 }}
                      >
                        Languages
                      </Typography>
                    </TableCell>
                  </TableRow>

                  {getCounsellorData?.Languages?.map((item, i) => {
                    return (
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {item}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })}

                </TableBody>
              </Table>
            </Card>) : " "}

          {getCounsellorData?.Expertise?.length > 0 ? (<Card
            sx={{
              marginTop: "40px",
            }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ mb: 3, ml: 2 }}
                    //   sx={{ mb: 2.2, ml: 2 }}
                    >
                      Expertise
                    </Typography>
                  </TableCell>
                </TableRow>

                {getCounsellorData?.Expertise?.map((item, i) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {item}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Grid sx={{ display: "flex", columnGap: 2 }}>
                          {/* <ApproveButton />
                <RejectButton />  */}
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )
                })}

              </TableBody>
            </Table>
          </Card>) : " "}

          {getCounsellorData?.Qualifications?.length > 0 ? (<Card
            sx={{
              marginTop: "40px",
            }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ mb: 3, ml: 2 }}
                    //   sx={{ mb: 2.2, ml: 2 }}
                    >
                      Qualifications
                    </Typography>
                  </TableCell>
                </TableRow>

                {getCounsellorData?.Qualifications?.map((item, i) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {item}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>) : " "}

        </Grid>

        <Grid>
          <Card>
            <Table>
              <TableBody>
                <TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ mb: 2.2, ml: 2 }}
                    >
                      Actions
                    </Typography>
                  </TableCell>  
                  {(getCounsellorData?.TEST_STATUS === "Complete" || getCounsellorData?.TEST_STATUS === "DENIED") && <TableCell><Button variant="outlined" onClick={handleClickEvent} sx={{ ml: 1, borderRadius: 25 }}>
                   Screening Test Result
          </Button></TableCell>}
          {(getCounsellorData?.ASSIGNMENT_STATUS === "Complete" || getCounsellorData?.ASSIGNMENT_STATUS === "DENIED") && <TableCell><Button variant="outlined" onClick={() => setAssignmentPop(true)} sx={{ ml: 1, borderRadius: 25 }}>
                   Assignment Result
          </Button></TableCell>} 
                </TableRow> 
                <TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                    {displayMsg === "Application submitted" ? <span>{moment(getCounsellorData?.APPLICATION_DATE).format('DD-MM-YYYY')}</span> : displayMsg === "Interview scheduled" ? <span>{moment(getCounsellorData?.INTERVIEW_DATE).format('DD-MM-YYYY')}</span> : displayMsg === "Mock-session scheduled" ? <span>{moment(getCounsellorData?.MOCK_SESSION_DATE).format('DD-MM-YYYY')}</span> : displayMsg === "Counsellor On-Boarding Successful." ? <span>{moment(getCounsellorData?.AVAILABILITY_DATE).format('DD-MM-YYYY')}</span> : <h6 className={classes.NowShowingBox}>NOW</h6>}
                    </Typography>
                  </TableCell>
                  <TableCell> {displayMsg}</TableCell>
                  {displayBtn === "Both" ? <TableCell>
                    <Grid sx={{ display: "flex", columnGap: 2 }}>
                      <Reject {...getCounsellorData} />
                      <Approve {...getCounsellorData} />
                    </Grid>
                  </TableCell> : <>
                    {displayBtn === "Approved" ? <TableCell>
                      <Grid sx={{ display: "flex", columnGap: 2 }}>
                        <Approve {...getCounsellorData} />
                      </Grid>
                    </TableCell> : <>
                    {(displayBtn === "FormButton" && !compareDate(interviewTime)) ? <TableCell><Button variant="outlined" onClick={handlerFeedbackForm} sx={{ ml: 1, borderRadius: 25 }}>
                   Interview Feedback-Form
          </Button></TableCell> : <>
               {displayBtn === "ScheduleButton" ? <TableCell>
                    <Grid sx={{ display: "flex", columnGap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleScheduleInterview}
                      sx={{ ml: 1, borderRadius: 25 }}
                    >
                      Schedule Interview
                    </Button></Grid>
                  </TableCell> : <>
                  {displayBtn === "DocumentButton" ? <TableCell>
                    <Grid sx={{ display: "flex", columnGap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setShowDocList(true)}
                      sx={{ ml: 1, borderRadius: 25 }}
                    >
                      Documents
                    </Button></Grid>
                  </TableCell> : <>
                  {(displayBtn === "MockSchedule") ? <TableCell>
                    <Grid sx={{ display: "flex", columnGap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handleMockSession}
                      sx={{ ml: 1, borderRadius: 25 }}
                    >
                      Mock-Session Schedule
                    </Button></Grid>
                  </TableCell> : <>
                  {(displayBtn === "PricingButton") ? <TableCell>
                    <Grid sx={{ display: "flex", columnGap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={handlePricingStatus}
                      sx={{ ml: 1, borderRadius: 25 }}
                    >
                      Commercial
                    </Button></Grid>
                  </TableCell> : <>{(displayBtn === "TrainingButton") ? <TableCell>
                    <Grid sx={{ display: "flex", columnGap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setTrainingStats(true)}
                      sx={{ ml: 1, borderRadius: 25 }}
                    >
                      Training Scores
                    </Button></Grid>
                  </TableCell> : <></>}
                  </>}             
                  </>}
                  </>}
                  </>}
                  </>}
                  </>}
                  </>}
                </TableRow>
                {getCounsellorData?.AVAILABILITY_STATUS === "APPROVED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.AVAILABILITY_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Availability approved by admin</TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.AVAILABILITY_STATUS === "DENIED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.AVAILABILITY_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Availability denied by admin</TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.PROFILE_STATUS === "APPROVED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.PROFILE_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Profile approved by admin</TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.PROFILE_STATUS === "DENIED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.PROFILE_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Profile denied by admin</TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.AVAILABILITY_STATUS === "SAVED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.AVAILABILITY_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Availability saved by counsellor</TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.MOCK_SESSION_STATUS === "APPROVED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.MOCK_SESSION_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Mock-Session passed by counsellor</TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.ASSIGNMENT_STATUS === "APPROVED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.ASSIGNMENT_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Assignment passed by counsellor</TableCell>
                  <TableCell><Button variant="outlined" onClick={() => setAssignmentPop(true)} sx={{ ml: 1, borderRadius: 25 }}>
                   Assignment Result
          </Button></TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.TRAINING_STATUS === "PASSED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.TRAINING_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Training passed by counsellor</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => setTrainingStats(true)}
                      sx={{ ml: 1, borderRadius: 25 }}
                    >
                      Training Scores
                    </Button>
                  </TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.TRAINING_STATUS === "FAILED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.TRAINING_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Training failed by counsellor</TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.COMMERCIAL_STATUS === "ACCEPTED" && getCounsellorData?.payrollFlag !== 'N' ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.COMMERCIAL_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Commercial accepted by counsellor</TableCell>
                  <TableCell>
                    {(roleAllowedApis.filter(itm => itm.apiKey === GET_COMMERCIAL).length > 0)
                    && (
                      <Button 
                      variant="outlined" 
                      onClick={viewPricingCommercial} 
                      sx={{ ml: 1, borderRadius: 25 }}
                      >
                      View Commercial
                    </Button>
                    )}
                    
                </TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.COMMERCIAL_STATUS === "INITIATED" && getCounsellorData?.payrollFlag !== 'N' ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.COMMERCIAL_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Commercial assigned to counsellor</TableCell>
                  <TableCell><Button variant="outlined" onClick={viewPricingCommercial} sx={{ ml: 1, borderRadius: 25 }}>
                   View Commercial
          </Button></TableCell>
                </TableRow></> : ""}
                {(getCounsellorData?.AGREEMENT_STATUS === "ACCEPTED" && getCounsellorData?.payrollFlag !== 'N') ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.AGREEMENT_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Agreement accepted by counsellor</TableCell>
                </TableRow></> : ""}
                {/* {getCounsellorData?.AGREEMENT_STATUS === "INITIATED" ? <><TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData.AGREEMENT_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Waiting till counsellor accept the agreement</TableCell>
                </TableRow></> : ""} */}
                {(getCounsellorData?.DOCUMENT_STATUS === "APPROVED" || getCounsellorData?.IS_DOC_SKIP === 'Y') ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.DOCUMENT_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  {(getCounsellorData?.IS_DOC_SKIP === 'Y' && getCounsellorData?.DOCUMENT_STATUS === "SUBMITTED") && <TableCell>Documents skipped by admin</TableCell>}
                  {getCounsellorData?.DOCUMENT_STATUS === "APPROVED" && <TableCell>Documents accepted by admin</TableCell>}
                  {getCounsellorData?.DOCUMENT_STATUS === "DENIED" && <TableCell>Documents rejected by admin</TableCell>}
                  <TableCell>
                  {(roleAllowedApis.filter(itm => itm.apiKey === GET_COMMERCIAL).length > 0)
                    && (
                    <Button variant="outlined" onClick={() => setShowDocList(true)} sx={{ ml: 1, borderRadius: 25 }}>
                   Documents
                  </Button>
                    )}
                  </TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.INTERVIEW_STATUS === "PASSED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.INTERVIEW_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Interview passed by counsellor</TableCell>
                  <TableCell>
                  {(roleAllowedApis.filter(itm => itm.apiKey === GET_CSC_INTERVIEW_FEEDBACK).length > 0)
                    && (
                    <Button variant="outlined" onClick={viewInterviewFeedback} sx={{ ml: 1, borderRadius: 25 }}>
                   Feedback Result
                  </Button>
                    )}
                  </TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.INTERVIEW_STATUS === "FAILED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.INTERVIEW_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Interview failed by counsellor</TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.TEST_STATUS === "APPROVED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.TEST_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Initial screening test passed by counsellor</TableCell>
                  <TableCell>
                  {(roleAllowedApis.filter(itm => itm.apiKey === CSC_TEST_REPORT).length > 0)
                    && (
                    <Button variant="outlined" onClick={handleClickEvent} sx={{ ml: 1, borderRadius: 25 }}>
                   Screening Test Result
                  </Button>
                    )}
                   </TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.APPLICATION_STATUS === "APPROVED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.APPLICATION_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Application submitted by counsellor</TableCell>
                  <TableCell>{" "}</TableCell>
                </TableRow></> : ""}
                {getCounsellorData?.APPLICATION_STATUS === "DENIED" ? <><TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData?.APPLICATION_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>Application denied by admin</TableCell>
                </TableRow></> : ""}
                {/* <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{moment(getCounsellorData.APPLICATION_DATE).format('DD-MM-YYYY')}</span>
                      }
                    </Typography>
                    
                  </TableCell>
                  <TableCell>Training Initiated</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => setTrainingStats(true)}
                      sx={{ ml: 1, borderRadius: 25 }}
                    >
                      Stats
                    </Button>
                  </TableCell>
                </TableRow> */}
                {/* {getCounsellorData?.DOCUMENT_STATUS === "NOT_APPROVED" ?  */}
                {/* <>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {
                        // @ts-ignore
                        <span>{getCounsellorData.INTERVIEW_DATE !== "" ? moment(getCounsellorData.INTERVIEW_DATE).format('DD-MM-YYYY') : ""}</span>
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>{" "}</TableCell>
                  <TableCell>{" "}</TableCell>
                </TableRow></>  */}
                {/* : ""} */}
                <TableRow style={tableRowStyle}>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {/* <ApproveLink />
                    <RejectLink /> */}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>

          {
            resultPop && <TestResultPopup testId={getCounsellorData?.testInvitationId} resultPop={resultPop} setResultPop={setResultPop} />
          }

          {
            assignmentPop && <TestResultPopup testId={getCounsellorData?.assigmentTestId} resultPop={assignmentPop} setResultPop={setAssignmentPop} />
          }

          {
            feedbackForm && <InterviewFeedbackForm getCounsellorData={getCounsellorData} feedbackForm={feedbackForm} setFeedbackForm={setFeedbackForm} />
          }

          {
            scheduleButton && <InterviewPopup openPopup={scheduleButton} setOpenPopup={setScheduleButton} getCounsellorData={getCounsellorData} />
          }

          {
            mockSchecule && <MockSessionScheduler openPopup={mockSchecule} setOpenPopup={setMockSchedule} getCounsellorData={getCounsellorData} />
          }

          {
            pricingCounsellor && <PricingComponent openPopup={pricingCounsellor} setOpenPopup={setPricingCounsellor} getCounsellorData={getCounsellorData} />
          }

          {
            viewPricing && <ViewCommercialPricing viewPricing={viewPricing} setViewPricing={setViewPricing} getCounsellorData={getCounsellorData} />
          }

          {
            viewFeedback && <ViewFeedback viewFeedback={viewFeedback} setViewFeedback={setViewFeedback} getCounsellorData={getCounsellorData} />
          }

          {getCounsellorData?.Certification?.length > 0 ? (<Card
            sx={{
              marginTop: "40px",
            }}
          >
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography
                      color="textPrimary"
                      variant="h5"
                      sx={{ mb: 2.2, ml: 2 }}
                    >
                      Certification
                    </Typography>
                  </TableCell>
                </TableRow>
                {getCounsellorData?.Certification?.map((item, i) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2">
                          {item}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}

              </TableBody>
            </Table>
          </Card>) : " "}
          {getCounsellorData?.Documents?.length > 0
            ? <Card
              sx={{
                marginTop: "40px"
              }}
            >
              <Table>
                <TableBody>
                  {/* <TableRow>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{ mb: 2.2, ml: 2 }}
                      >
                        Documents
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <div className="documentCard">
                    {getCounsellorData?.Documents.map((item, i) => {
                      return (
                        <div className="document_details">
                          <a href={`https://lyc-staticcontenet.s3.ap-south-1.amazonaws.com/cgc/${getCounsellorData.USER_SID}/doc/${item.DocumentName}`} rel="noreferrer" target="_blank"><Article className="articleIcon" />{' '} </a>
                          <div className="documentName">
                            {item.DocumentName}
                          </div>
                        </div>
                      )
                    })}
                  </div> */}
                  
                  {/* <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {getCounsellorData.Documents.length > 0 && getCounsellorData.Documents.map((itm) => (
                          <a className="docItm" href={`https://lyc-staticcontenet.s3.ap-south-1.amazonaws.com/cgc/${getCounsellorData.USER_SID}/doc/${itm.DocumentName}`} target="_blank" rel="noreferrer">{itm.DocumentName}</a>
                        ))}
                      </Typography>
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </Card>
            : ''}
            {/* {interviewPopup && <InterviewPopup openPopup={interviewPopup} setOpenPopup={setInterviewPopup} />} */}
            {showDocList && <DocumentList showDocList={showDocList} setShowDocList={setShowDocList} id={getCounsellorData.APPLICATION_ID} flag={getCounsellorData.payrollFlag} getCounsellorData={getCounsellorData} />}
            {trainingStats && <TrainingScorePopup showPopup={trainingStats} setShowPopup={setTrainingStats} id={getCounsellorData.APPLICATION_ID} status={getCounsellorData.TRAINING_STATUS} />}
        </Grid>
        
      </Grid>) : <div className={classes.circularProgressLoadingClass}><CircularProgress /></div>}
    </>
  );
};

export default ProfileDetails;