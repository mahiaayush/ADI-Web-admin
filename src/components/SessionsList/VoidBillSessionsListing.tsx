import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
  } from "@material-ui/core";
  import "../CounselloApplication/DetailScreen.css";
  import { useEffect, useState } from "react";
  import http from "../../utils/http";
  import { useDispatch } from "react-redux";
  import { useParams } from "react-router-dom";
  import {
    ADMIN_API_ENDPOINT_V2, PUT_VOID_BILL
  } from '../../store/constants';
import sessionsListAction from "src/store/actions/sessionsListAction";
  
  export default function VoidBillSessionsListing({
    ScheduleId,
    openPopupReject,
    setOpenPopupReject,
    startDate,
    endDate,
    sessionStatus,
    sessionSubStatus,
    manualSearchCounsellor,
    manualSearchLearner,
    manualSearchMeeting,
    limit,
    page
  }) {
    const [rejectText, setRejectText] = useState(''); 
    const [data, setData] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (data === 'An error occured while Void Bill on ZOHO.') {
        setOpenPopupReject(true);
        } else {
        setOpenPopupReject(false);
        setRejectText('');
        setData('');
        }
    }, [data])
  
    const handleClose = () => {
      setOpenPopupReject(false);
      setRejectText('');
      setData('');
    }
    
    const SubmitHandler = async () => {
      try {
        const res = await http.put(
          `${ADMIN_API_ENDPOINT_V2}${PUT_VOID_BILL}`,
          {
            "ScheduleId": ScheduleId,
            "VoidbillReason": rejectText
        },
        );
        if (res.data.status) {
          setData(res.data.message);
          if (res.data.message === "Bill rejected successfully.") {
            dispatch(
                sessionsListAction(
                  startDate,
                  endDate,
                  sessionStatus,
                  sessionSubStatus,
                  manualSearchCounsellor,
                  manualSearchLearner,
                  manualSearchMeeting,
                  limit,
                  page + 1
              )
            );  
        setOpenPopupReject(false);
        setRejectText('');
        setData('');
          } 
       } 
      } catch (error) {
        console.log('error', error);
      }
    };
  
    const handleYes = () => {
        SubmitHandler();
    };
  
    return (
      <>
        <Dialog open={openPopupReject} className="aprovelPop" onClose={handleClose}>
          <DialogTitle>
              Reject
          </DialogTitle>
          <DialogContent>
            <DialogContentText color="dimgrey">
              Please Fill the Reason to Reject this Session
              <DialogContentText>
                The Bill will be Generated Void.
              </DialogContentText>
            </DialogContentText>
            <DialogContentText color="dimgrey">
              Are you sure to Approve
            </DialogContentText>
              <textarea
              className="text"
              name="textarea"
              value={rejectText}
              onChange={(e) => setRejectText(e.target.value)} 
              />
          </DialogContent>
  
          <DialogActions>
          <DialogContentText color="red">
            {data === 'An error occured while Void Bill on ZOHO.' && data}
          </DialogContentText>
            <Button onClick={handleClose}>No</Button>
            <Button className={rejectText.trim().length === 0 ? "disableBtnYes" : ""} onClick={handleYes} variant="contained" autoFocus>
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }