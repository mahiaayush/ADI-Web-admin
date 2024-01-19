import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@material-ui/core";
import "./DetailScreen.css";
import { useState } from "react";
import { approveAction } from "src/store/actions/DetailScreenAction";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { DetailAction } from "src/store/actions/DetailAction";

export default function ApproveButton(getDetailsData) {
  const [open, setOpen] = useState(false);
  const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { APPLICATION_ID, APPLICATION_STATUS, TEST_STATUS, INTERVIEW_STATUS, DOCUMENT_STATUS, AGREEMENT_STATUS, ASSIGNMENT_STATUS, TRAINING_STATUS, MOCK_SESSION_STATUS, PROFILE_STATUS, AVAILABILITY_STATUS, CURRENT_STATAUS, COMMERCIAL_STATUS, IS_DOC_SKIP } = getDetailsData;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = () => {
    if ((APPLICATION_STATUS === 'SUBMITTED' || APPLICATION_STATUS === 'DENIED') && TEST_STATUS === 'NOT INITIATED' && INTERVIEW_STATUS === 'NOT INITIATED' && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      const applicationStatus = {
        Key: CURRENT_STATAUS,
        Value: "APPROVED"
      };
      dispatch(approveAction(APPLICATION_ID, applicationStatus));
      setTimeout(() => {
        dispatch(DetailAction(id))
      }, 1500);
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'DENIED' && INTERVIEW_STATUS === 'NOT INITIATED' && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      const testStatus = {
        Key: CURRENT_STATAUS,
        Value: "APPROVED"
      };
      const InterviewStatus = {
        Key: "INTERVIEW_STATUS",
        Value: "INITIATED"
      };
     
      dispatch(approveAction(APPLICATION_ID, testStatus));
      dispatch(approveAction(APPLICATION_ID, InterviewStatus));
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'INITIATED' && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      const InterviewStatus = {
        Key: "INTERVIEW_STATUS",
        Value: "SCHEDULED"
      }
      dispatch(approveAction(APPLICATION_ID, InterviewStatus));
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && (INTERVIEW_STATUS === 'SCHEDULED' || INTERVIEW_STATUS === 'FAILED') && DOCUMENT_STATUS === 'NOT INITIATED' && AGREEMENT_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      const InterviewStatus = {
        Key: "INTERVIEW_STATUS",
        Value: "PASSED"
      }
      dispatch(approveAction(APPLICATION_ID, InterviewStatus));
      const docStatus = {
        Key: "DOCUMENT_STATUS",
        Value: "INITIATED"
      }
      dispatch(approveAction(APPLICATION_ID, docStatus));
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === "SUBMITTED" || DOCUMENT_STATUS === "DENIED") && AGREEMENT_STATUS === 'NOT INITIATED' && TRAINING_STATUS === 'NOT INITIATED' && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      const documentStatus = {
        Key: "DOCUMENT_STATUS",
        Value: "APPROVED"
      }
      dispatch(approveAction(APPLICATION_ID, documentStatus));
      
      if (getDetailsData?.payrollFlag === "N") {
        const agreementStatus = {
          Key: "AGREEMENT_STATUS",
          Value: "ACCEPTED"
        }
        dispatch(approveAction(APPLICATION_ID, agreementStatus));
        const commercialStatus = {
          Key: "COMMERCIAL_STATUS",
          Value: "ACCEPTED"
        }
        dispatch(approveAction(APPLICATION_ID, commercialStatus));
        const trainingStatus = {
          Key: "TRAINING_STATUS",
          Value: "INITIATED"
        }
        dispatch(approveAction(APPLICATION_ID, trainingStatus));      
      } else {
        const agreementStatus = {
          Key: "AGREEMENT_STATUS",
          Value: "INITIATED"
        }
        dispatch(approveAction(APPLICATION_ID, agreementStatus));
      }
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && (TRAINING_STATUS === 'INITIATED' || TRAINING_STATUS === 'FAILED') && ASSIGNMENT_STATUS === 'NOT INITIATED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      const TrainingStatus = {
        Key: "TRAINING_STATUS",
        Value: "PASSED"
      };
      dispatch(approveAction(APPLICATION_ID, TrainingStatus));
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'DENIED' && MOCK_SESSION_STATUS === 'NOT INITIATED' && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      const AssigmentStatus = {
        Key: "ASSIGNMENT_STATUS",
        Value: "APPROVED"
      }
      const mockSessionStatus = {
        Key: "MOCK_SESSION_STATUS",
        Value: "INITIATED"
      }
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && (MOCK_SESSION_STATUS === 'SCHEDULED' || MOCK_SESSION_STATUS === 'DENIED') && PROFILE_STATUS === 'NOT INITIATED' && AVAILABILITY_STATUS === 'NOT INITIATED') {
      const MockSessiontatus = {
        Key: "MOCK_SESSION_STATUS",
        Value: "APPROVED"
      }
      dispatch(approveAction(APPLICATION_ID, MockSessiontatus));
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && MOCK_SESSION_STATUS === 'APPROVED' && (PROFILE_STATUS === 'SUBMITTED' || PROFILE_STATUS === 'DENIED')) {
      const profileStatus = {
        Key: "PROFILE_STATUS",
        Value: "APPROVED"
      }
      dispatch(approveAction(APPLICATION_ID, profileStatus));
    } else if (APPLICATION_STATUS === 'APPROVED' && TEST_STATUS === 'APPROVED' && INTERVIEW_STATUS === 'PASSED' && (DOCUMENT_STATUS === 'APPROVED' || IS_DOC_SKIP === "Y") && AGREEMENT_STATUS === 'ACCEPTED' && TRAINING_STATUS === 'PASSED' && ASSIGNMENT_STATUS === 'APPROVED' && MOCK_SESSION_STATUS === 'APPROVED' && (AVAILABILITY_STATUS === 'SUBMITTED' || AVAILABILITY_STATUS === 'DENIED')) {
      const availabilityStatus = {
        Key: "AVAILABILITY_STATUS",
        Value: "APPROVED"
      }
      dispatch(approveAction(APPLICATION_ID, availabilityStatus));
    }
    setOpen(false);
    setTimeout(() => {
      dispatch(DetailAction(id))
    }, 1500);
    };
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} className="approve">
        Approve
      </Button>

      <Dialog open={open} className="aprovelPop" onClose={handleClose}>
        <DialogTitle>Application Status</DialogTitle>
        <DialogContent>
          <DialogContentText color="dimgrey">
            {localStorage.getItem("popupText")}
            <DialogContentText>
              The counsellor will be notified
            </DialogContentText>
          </DialogContentText>
                </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, don&apos;t Approve</Button>
            <Button onClick={handleApprove} variant="contained" autoFocus>
              Approve
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}