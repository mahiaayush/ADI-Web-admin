import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import PropTypes from "prop-types";

const ConfirmApprove = (
  { open = false, onClose = () => {}, onSubmit = () => {}, flag = null, errorMessage = "" },
) => {
  // This popup will be called on approve or disapprove of cash management row
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <>
        <DialogContent className="user_type_select">
          <h3>
            {flag === 1
              ? "Are you sure do you want to Approve?"
              : "Are you sure do you want to Disapprove?"}
          </h3>
        </DialogContent>
        <DialogActions>
        <h5 style={{ color: "red", marginRight: "10px" }}>{errorMessage}</h5>
          <Button onClick={onClose} color="secondary" variant="outlined">
            {errorMessage ? "Cancel" : "No"}
          </Button>
          {errorMessage === "" && <Button color="primary" variant="contained" onClick={onSubmit}>
            Yes
          </Button>}
        </DialogActions>
      </>
    </Dialog>
  );
};

ConfirmApprove.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ConfirmApprove;
