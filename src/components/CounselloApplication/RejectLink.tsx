import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
} from "@material-ui/core";

import "./DetailScreen.css";

export default function AlertDialog(data) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} className="rejectLink">
        Reject
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="title">Reject application</DialogTitle>
        <DialogContent>
          <DialogContentText color="dimgrey">
            Provide feedback for the counsellor
          </DialogContentText>

          <textarea className="text" />

          <DialogContentText color="dimgrey">
            Rejecting this application will end the application process for this
            candidate.
            <DialogContentText className="approveapplicationcontent">
              The counsellor will be notified
            </DialogContentText>
          </DialogContentText>
          <DialogContentText className="approveapplicationcontentlast">
            Are you sure want to do this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No, don&apos;t Reject</Button>
          <Button onClick={handleClose} variant="contained" autoFocus>
            Yes, reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
