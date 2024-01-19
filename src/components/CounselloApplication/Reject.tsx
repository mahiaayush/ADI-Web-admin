import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@material-ui/core";
import "./DetailScreen.css";
import { ADMIN_UPDATE_ICSC_STATUS } from "src/store/constants";
import { useState } from "react";
// import http from "../../utils/http";
import { rejectAction } from "src/store/actions/DetailScreenAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { DetailAction } from "src/store/actions/DetailAction";

export default function RejectButton(getDetailsData) {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  // const [counsellorStatus, setCounsellorStatus] = useState('DENIED');
  const [disable, setDisable] = useState(true)
  const [characterCount, setCharacterCount] = useState(0);

  const dispatch = useDispatch();
  const getData = useSelector((state) => state);
  const { APPLICATION_ID, CURRENT_STATAUS, INTERVIEW_STATUS, TRAINING_STATUS } = getDetailsData;
  let counsellorStatus;
  if (CURRENT_STATAUS === "INTERVIEW_STATUS" || CURRENT_STATAUS === "TRAINING_STATUS") {
    counsellorStatus = "FAILED";
  } else {
    counsellorStatus = "DENIED";
  }

  const applicationStatus = {
    Key: CURRENT_STATAUS,
    Value: counsellorStatus
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // here we send feedback
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value.trim().length !== 0) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  };

  const handleReject = () => {
    // INTERVIEW_STATUS TRAINING_STATUS
    // const Feedback = {
    //   Key: "APPLICATION_FEEDBACK",
    //   Value: value
    // };
    dispatch(rejectAction(APPLICATION_ID, applicationStatus, value));
    handleClose();
    setTimeout(() => dispatch(DetailAction(id)), 2000);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ ml: 1, borderRadius: 25 }}
      >
        Reject
      </Button>

      <Dialog open={open} className="aprovelPop" onClose={handleClose}>
        <DialogTitle>Reject application</DialogTitle>
        <DialogContent>
          <DialogContentText color="dimgrey">
            Provide feedback for the counsellor
          </DialogContentText>
          <textarea
            className="text"
            name="textarea"
            value={value}
            onChange={(e) => handleChange(e)}
          />
          <DialogContentText color="dimgrey">
            Rejecting this application will end the application process for this
            candidate.
            <DialogContentText>
              The counsellor will be notified
            </DialogContentText>
          </DialogContentText>

          <DialogContentText color="dimgrey">
            Are you sure want to do this?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>No, don&apos;t Reject</Button>
          <Button onClick={handleReject} disabled={disable} variant="contained" autoFocus>
            Yes, reject
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
