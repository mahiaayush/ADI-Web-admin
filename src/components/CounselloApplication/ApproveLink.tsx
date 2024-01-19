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
      <Button onClick={handleClickOpen} className="approveLink">
        Approve
      </Button>
      <Dialog open={open}>
        <DialogTitle className="title">Approve application</DialogTitle>

        <DialogContent>
          <DialogContentText color="dimgrey">
            Approving the application means the counsellor is ready to be
            interviwed.
            <DialogContentText className="approveapplicationcontent">
              The counsellor will be notified
            </DialogContentText>
          </DialogContentText>

          <DialogContentText className="approveapplicationcontentlast">
            Are you sure you wnat to do this ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>No. dont approve</Button>
          <Button onClick={handleClose} variant="contained" autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
