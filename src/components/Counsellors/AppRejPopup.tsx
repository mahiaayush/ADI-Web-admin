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
import { getSessionList } from "src/store/actions/sessionListAction";
import {
  ADMIN_API_ENDPOINT_V2, PUT_VOID_BILL
} from '../../store/constants';
import { getLearnerSessionList } from "src/store/actions/learnerSessionListAction";

export default function AppRejPopup({
  ScheduleId,
  Reason,
  openPopupReject,
  setOpenPopupReject,
  smId
}) {
  const { id } = useParams();
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
        setData(res.data.message)
        if (smId) {
          dispatch(getLearnerSessionList("60", "", null, smId, id))
        } else {
          dispatch(getSessionList(id, '60', '', ''));
        }      
      } 
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleYes = () => {
    if (Reason === "Reject") {
      SubmitHandler();
    }
  };

  return (
    <>
      <Dialog open={openPopupReject} className="aprovelPop" onClose={handleClose}>
        <DialogTitle>
          {" "}
          {Reason === "Reject" ? "Reject" : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="dimgrey">
            {Reason === "Reject" ? "Please Fill the Reason to Reject this Session" : ""}
            <DialogContentText>
              {Reason === "Reject" ? "The Bill will be Generated Void." : ""}
            </DialogContentText>
          </DialogContentText>
          <DialogContentText color="dimgrey">
            {Reason === "Reject"
              ? ""
              : "Are you sure to Approve?"}
          </DialogContentText>
          {Reason === "Reject" && (
            <textarea
            className="text"
            name="textarea"
            value={rejectText}
            onChange={(e) => setRejectText(e.target.value)} 
            />)}
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
