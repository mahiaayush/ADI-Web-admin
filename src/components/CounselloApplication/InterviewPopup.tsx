import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    NativeSelect,
    TextField,
  } from "@material-ui/core";
  import { useEffect, useState } from "react";
  import { approveAction } from "src/store/actions/DetailScreenAction"
  import { DetailAction } from "src/store/actions/DetailAction";
  import moment from "moment";
  import { useDispatch, useSelector } from "react-redux";
  import { InterviewerListing, postMockInterviewDetails } from "src/store/actions/OnBoardingAction";
  import { DateTimePicker } from "@material-ui/lab";
  import { useParams } from "react-router";
  
  export default function InterviewPopup({
    openPopup,
    setOpenPopup,
    getCounsellorData
  }) {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    const [mockSessionDateTime, setMockSessionDateTime] = useState(tomorrow);
    const [selectedInterviewer, setSelectedInterviewer] = useState("1");
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(InterviewerListing());
    }, [])
  
    const interviewersList = useSelector((state:any) => state.interviewerOptions.interviewersListResponse.data);  
    useEffect(() => {
      setSelectedInterviewer(interviewersList[0]?.InterviewerId)
    }, [interviewersList])
    
    const handleClose = () => {
      setOpenPopup(false);
    }

    const handleAccept = () => {
      const InterviewStatus = {
        Key: "INTERVIEW_STATUS",
        Value: "SCHEDULED"
      }
      const interviewData = {
        "ApplicationId": getCounsellorData?.APPLICATION_ID,
        "InterviewerId": selectedInterviewer,
        "ScheduleDateTime": moment(mockSessionDateTime).utc()
      };
      dispatch(approveAction(getCounsellorData?.APPLICATION_ID, InterviewStatus));
      dispatch(postMockInterviewDetails(interviewData));
      setOpenPopup(false);
      setTimeout(() => dispatch(DetailAction(id)), 2000);
    }

    return (
      <>
        <Dialog open={openPopup} className="aprovelPop" onClose={handleClose}>
          <DialogTitle>
            Interview Booking
          </DialogTitle>
          <DialogContent dividers={true}>
          <DialogContentText>
              Please Book The Interview Session
              </DialogContentText>
          <>
            <DateTimePicker
            label="Mock Session Date Time"
            value={mockSessionDateTime}
            onChange={(e) => setMockSessionDateTime(e)}
            renderInput={(params) => <TextField {...params} helperText="" />}
            minDateTime={tomorrow}
            className="datePickerClass"
            />
            <div>
            <p style={{ "fontWeight": "bold", "textAlign": "left", "marginBottom": "0px" }}>Select Interviewer</p>
            <NativeSelect
              id="demo-simple-select"
              style={{ width: "100%" }}
              value={selectedInterviewer}
              onChange={(e) => setSelectedInterviewer(e.target.value)}
            >
              {
                interviewersList?.length > 0 && interviewersList.map((item) => (
                <option key={item.InterviewerId.toString()} value={parseInt(item.InterviewerId, 10)}>{item.InterviewerFirstName}{' '}{item.InterviewerLastName}</option>
                ))
              }
            </NativeSelect>
          </div>
          </>
          </DialogContent>  
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleAccept}>Submit</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }