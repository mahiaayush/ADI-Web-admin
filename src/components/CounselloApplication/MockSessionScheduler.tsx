import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    NativeSelect,
    TextField
  } from "@material-ui/core";
  import { useEffect, useState } from "react";
  import { approveAction } from "src/store/actions/DetailScreenAction"
  import { DetailAction } from "src/store/actions/DetailAction";
  import moment from "moment";
  import { postMockSessionDetails } from "src/store/actions/OnBoardingAction"
  import http from "../../utils/http";
  import { useDispatch, useSelector } from "react-redux";
  import { DateTimePicker } from "@material-ui/lab";
  import { useParams } from "react-router";
  
  export default function MockSessionScheduler({
    openPopup,
    setOpenPopup,
    getCounsellorData
  }) {
    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    const [mockSessionDate, setMockSessionDate] = useState(tomorrow);
    
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleClose = () => {
      setOpenPopup(false);
    }

    const handleAccept = () => {
        const mocksessionData1 = {
            "ApplicationId": getCounsellorData?.APPLICATION_ID,
            "ScheduleDateTime": moment(mockSessionDate).utc()
          };
          const mockSessionStatus = {
            Key: "MOCK_SESSION_STATUS",
            Value: "SCHEDULED"
          }
      dispatch(approveAction(getCounsellorData?.APPLICATION_ID, mockSessionStatus));
      dispatch(postMockSessionDetails(mocksessionData1));
      setOpenPopup(false);
      setTimeout(() => dispatch(DetailAction(id)), 2000)      
    }

    return (
      <>
        <Dialog open={openPopup} className="aprovelPop" onClose={handleClose}>
          <DialogTitle>
            Mock-Session Booking
          </DialogTitle>
          <DialogContent dividers={true}>
          <DialogContentText>
              Please Book The Mock Session for counsellor and student
              </DialogContentText>
          <>
            <DateTimePicker
            label="Mock Session Date Time"
            value={mockSessionDate}
            onChange={(e) => setMockSessionDate(e)}
            renderInput={(params) => <TextField {...params} helperText="" />}
            minDateTime={tomorrow}
            className="datePickerClass"
            />
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