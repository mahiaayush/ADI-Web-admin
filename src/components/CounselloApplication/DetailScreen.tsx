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
} from "@material-ui/core";
import { useState, useEffect } from "react";
import "./DetailScreen.css";
import Approve from "./Approve";
import Reject from "./Reject";
import { flexbox } from "@material-ui/system";
import { useDispatch, useSelector } from "../../store";
import {
  ADMIN_API_ENDPOINT,
  GET_COUNSELLOR_API_DATA,
} from "../../store/constants";
import axios from "axios";
import http from "src/utils/http";
import moment from "moment";
import { DetailAction } from "src/store/actions/DetailAction";
import TabApp from "./TabApp";
import InterviewFeedbackForm from "./InterviewFeedbackForm";

const DetailScreen = (props) => {
  const dispatch = useDispatch();
  // const [getCounsellorData, setGetCounsellorData] = useState("");
  const [statusText, setStatusText] = useState("")
  // const [buttonshow, setButtonshow] = useState(true);
  // const [onlyactionbtn, setOnlyactionbtn] = useState(true);
  const [isfeedback, setIsfeedback] = useState("");
  const [popupText, setPopupText] = useState("");
  const [displayMsg, setDisplayMsg] = useState("");
  const [displayBtn, setDisplayBtn] = useState("");
  const [loading, setLoading] = useState(false);

  const { detailReducer } = useSelector((state: any) => state);
  const getCounsellorData = detailReducer?.DetailActionResponse?.data;

  const getFeedbackData = getCounsellorData.APPLICATION_STATUS;
  // @ts-ignore
  const { APPLICATION_STATUS, TEST_STATUS, APPLICATION_FEEDBACK, INTERVIEW_STATUS, DOCUMENT_STATUS, INTERVIEW_FEEDBACK, AGREEMENT_STATUS, TRAINING_STATUS, ASSIGNMENT_STATUS, MOCK_SESSION_STATUS, PROFILE_STATUS, PROFILE_FEEDBACK, AVAILABILITY_STATUS, AVAILABILITY_FEEDBACK, COMMERCIAL_STATUS, IS_DOC_SKIP } = getCounsellorData;
  // const id = "5dde8076-33b8-4901-8358-3dcb7352c565";
  const id = useParams();
  const sid = id.id;
  useEffect(() => {
    setLoading(true);
    dispatch(DetailAction(sid)).then(() => setLoading(false))
    if (APPLICATION_STATUS === 'SUBMITTED' && TEST_STATUS === 'NOT INITIATED' && INTERVIEW_STATUS === 'NOT INITIATED' && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Application submitted');
      localStorage.setItem('popupText', 'Approving the application means the counsellor is ready to give the initial screening test.');
      localStorage.setItem('displayButton', 'Both');
      setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("Both");
      setDisplayMsg("Application submitted")
    } else if (APPLICATION_STATUS === 'DENIED' && TEST_STATUS === 'NOT INITIATED' && INTERVIEW_STATUS === 'NOT INITIATED' && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Application rejected');
      localStorage.setItem('popupText', 'Approving the application means the counsellor is ready to give the initial screening test');
      localStorage.setItem('displayButton', 'Approved');
      setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("Approved");
      setDisplayMsg("Application rejected")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'Pending' && INTERVIEW_STATUS === 'NOT INITIATED' && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Test initiated');
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Test initiated")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'In Progress' && INTERVIEW_STATUS === 'NOT INITIATED' && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Test in progress');
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Test in progress")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'DENIED' && INTERVIEW_STATUS === 'NOT INITIATED' && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Test scores denied');
      // localStorage.setItem('popupText', 'Approving the Test Result means the counsellor is ready for interview.');
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Test scores denied")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'INITIATED' && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Please schedule the interview for counsellor');
      localStorage.setItem('displayButton', 'ScheduleButton');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("ScheduleButton");
      setDisplayMsg("Please schedule the interview for counsellor")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'SCHEDULED' && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Interview scheduled');
      localStorage.setItem('displayButton', 'FormButton');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("FormButton");
      setDisplayMsg("Interview scheduled")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && DOCUMENT_STATUS === 'INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Waiting for counsellor to upload the documents');
      localStorage.setItem('displayButton', 'none');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("none");
      setDisplayMsg("Waiting for counsellor to upload the documents")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'FAILED' && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Counsellor failed in interview process');
      // localStorage.setItem('popupText', 'Approving the Interview means counselor is ready for submit the documents.');
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Counsellor failed in interview process")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && DOCUMENT_STATUS === 'SUBMITTED' && AGREEMENT_STATUS === 'NOT INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Please verify the counsellor documents');
      localStorage.setItem('popupText', 'Approving the documents means the counsellor is ready to accept the agreement.');
      localStorage.setItem('displayButton', 'DocumentButton');
      setPopupText("Approving the documents means the counsellor is ready to accept the agreement.");
      setDisplayBtn("DocumentButton");
      setDisplayMsg("Please verify the counsellor documents")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && DOCUMENT_STATUS === 'SUBMITTED' && IS_DOC_SKIP === "Y" && AGREEMENT_STATUS === 'INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Counsellor till now not accepted the agreement.');
      localStorage.setItem('displayButton', 'None'); 
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Counsellor till now not accepted the agreement.")  
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Counsellor till now not accepted the agreement.');
      localStorage.setItem('displayButton', 'None'); 
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Counsellor till now not accepted the agreement.")  
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && DOCUMENT_STATUS === 'DENIED' && AGREEMENT_STATUS === 'NOT INITIATED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Documents rejected by counsellor.');
      // localStorage.setItem('popupText', 'Approving the documents means the counsellor is ready to accept the agreement.');
      localStorage.setItem('displayButton', 'DocumentButton'); 
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("DocumentButton");
      setDisplayMsg("Documents rejected by counsellor.")  
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Counsellor still not accepted the commercial');
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Counsellor still not accepted the commercial")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Please choose commercial for counsellor');
      localStorage.setItem('displayButton', 'PricingButton');  
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("PricingButton");
      setDisplayMsg("Please choose commercial for counsellor")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Training not initiated by counsellor');
      // localStorage.setItem('popupText', 'Approving the Training means the counsellor is ready to give the Assignment.');
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Training not initiated by counsellor")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Training initiated');
      // localStorage.setItem('popupText', 'Approving the Training means the counsellor is ready to give the Assignment.');
      localStorage.setItem('displayButton', 'TrainingButton');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("TrainingButton");
      setDisplayMsg("Training initiated")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'FAILED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Training failed');
      // localStorage.setItem('popupText', 'Approving the Training means the counsellor is ready to give the Assignment.');
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Training failed")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'Pending' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Assignment initiated');
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Assignment initiated")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'In Progress' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Assignment test is in progress');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      // setDisplayBtn("Both");
      setDisplayMsg("Assignment test is in progress")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'Complete' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Assignment test completed by counsellor');
      // localStorage.setItem('popupText', 'Approving the Assignment marks means the counsellor is ready to take the mock session.')
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Assignment test completed by counsellor")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && MOCK_SESSION_STATUS === 'INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Please schedule a mock-Session for counsellor');
      localStorage.setItem('displayButton', 'MockSchedule');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("MockSchedule");
      setDisplayMsg("Please schedule a mock-Session for counsellor")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'DENIED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Assignment failed');
      // localStorage.setItem('popupText', 'Approving the Assignment marks means the counsellor is ready to take the mock session.')
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Assignment failed")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && MOCK_SESSION_STATUS === 'SCHEDULED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Mock-session scheduled');
      localStorage.setItem('popupText', 'Approving the mock-session means the counsellor is ready to update profile.');
      localStorage.setItem('displayButton', 'Both');
      setPopupText("Approving the mock-session means the counsellor is ready to update profile.");
      setDisplayBtn("Both");
      setDisplayMsg("Mock-session scheduled")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && MOCK_SESSION_STATUS === 'DENIED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      localStorage.setItem('displayMsg', 'Mock session rejected');
      localStorage.setItem('popupText', 'Approving the mock session means the counsellor is ready to update profile.');
      localStorage.setItem('displayButton', 'Approved');
      setPopupText("Approving the mock session means the counsellor is ready to update profile.");
      setDisplayBtn("Approved");
      setDisplayMsg("Mock session rejected")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && MOCK_SESSION_STATUS === 'APPROVED' && ((PROFILE_STATUS === 'NOT INITIATED' || PROFILE_STATUS === 'SAVED') && (AVAILABILITY_STATUS === 'NOT INITIATED' || AVAILABILITY_STATUS === 'SAVED'))) {
      localStorage.setItem('displayMsg', 'Counsellor not submitted the profile and availability');
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Counsellor not submitted the profile and availability")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && MOCK_SESSION_STATUS === 'APPROVED' && PROFILE_STATUS === 'SUBMITTED') {
      localStorage.setItem('displayMsg', 'Profile submited');
      localStorage.setItem('popupText', 'Are you sure to approve the counsellor profile.');
      localStorage.setItem('displayButton', 'Both');
      setPopupText("Are you sure to approve the counsellor profile.");
      setDisplayBtn("Both");
      setDisplayMsg("Profile submited")
     } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && MOCK_SESSION_STATUS === 'APPROVED' && PROFILE_STATUS === 'DENIED') {
      localStorage.setItem('displayMsg', 'Profile rejected.');
      localStorage.setItem('popupText', 'Are you sure to approve the counsellor profile.');
      localStorage.setItem('displayButton', 'Approved');
      setPopupText("Are you sure to approve the counsellor profile.");
      setDisplayBtn("Approved");
      setDisplayMsg("Profile rejected.")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && MOCK_SESSION_STATUS === 'APPROVED' && AVAILABILITY_STATUS === 'SUBMITTED') {
      localStorage.setItem('displayMsg', 'Availability submited');
      localStorage.setItem('popupText', 'Are you sure to approve the counsellor profile.');
      localStorage.setItem('displayButton', 'Both');
      setPopupText("Are you sure to approve the counsellor profile.");
      setDisplayBtn("Both");
      setDisplayMsg("Availability submited")
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && MOCK_SESSION_STATUS === 'APPROVED' && AVAILABILITY_STATUS === 'DENIED') {
      localStorage.setItem('displayMsg', 'Availability rejected');
      localStorage.setItem('popupText', 'Are you sure to approve the counsellor profile.');
      localStorage.setItem('displayButton', 'Approved');
      setPopupText("Are you sure to approve the counsellor profile.");
      setDisplayBtn("Approved");
      setDisplayMsg("Availability rejected")
     } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && COMMERCIAL_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && MOCK_SESSION_STATUS === 'APPROVED' && AVAILABILITY_STATUS === 'APPROVED' && PROFILE_STATUS === 'APPROVED') {
      localStorage.setItem('displayMsg', 'Counsellor On-Boarding Successful.');
      localStorage.setItem('displayButton', 'None');
      // setPopupText("Approving the application means the counsellor is ready to give the initial screening test.");
      setDisplayBtn("None");
      setDisplayMsg("Counsellor On-Boarding Successful.")
      console.log("ddd")
    } else {
      localStorage.setItem('displayMsg', '');
      localStorage.setItem('popupText', '');
      localStorage.setItem('displayButton', '');
      setPopupText("");
      setDisplayBtn("");
      setDisplayMsg("")
    }
  }, [APPLICATION_STATUS, TEST_STATUS, APPLICATION_FEEDBACK, INTERVIEW_STATUS, DOCUMENT_STATUS, INTERVIEW_FEEDBACK, AGREEMENT_STATUS, TRAINING_STATUS, ASSIGNMENT_STATUS, MOCK_SESSION_STATUS, PROFILE_STATUS, PROFILE_FEEDBACK, AVAILABILITY_STATUS, AVAILABILITY_FEEDBACK, COMMERCIAL_STATUS])
  
  // @ts-ignore
  const myObject = {
    "APPLICATION_STATUS": APPLICATION_STATUS,
    "INTERVIEW_STATUS": INTERVIEW_STATUS,
    "TRAINING_STATUS": TRAINING_STATUS,
    "PROFILE_STATUS": PROFILE_STATUS,
    "AVAILABILITY_STATUS": AVAILABILITY_STATUS,
  }

  let i = 0;
  let userStatus = "";
  const objectLength = Object.keys(myObject).length;

  for (i; i < objectLength; i++) {
    if (myObject[Object.keys(myObject)[i]] !== "DENIED" || myObject[Object.keys(myObject)[i]] !== "FAILED") {
      userStatus = Object.keys(myObject)[i];
      break;
    }
  }
  userStatus = `${userStatus.slice(0, -6)}FEEDBACK`;

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 2,
      }}
    >
      <Grid sx={{ ml: 2 }}>
        <Typography color="textPrimary" variant="h5">
          Counsellor application - {
            // @ts-ignore
            <span>{getCounsellorData.FIRST_NAME}</span>
          } {
            // @ts-ignore
            <span sx={{ mr: 20 }}>{getCounsellorData.LAST_NAME}</span>
          }
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>        
            <Link color="textPrimary" component={RouterLink} to="/counsellor-application-list">
             Counsellor Application
          </Link>
          <Typography color="textSecondary" variant="subtitle2">
        {getCounsellorData.FIRST_NAME}
            </Typography>

        </Breadcrumbs>
        <TabApp popupText={popupText} displayMsg={displayMsg} displayBtn={displayBtn} loading={loading} />
        
      </Grid>
    </Box>
  );
};

export default DetailScreen;