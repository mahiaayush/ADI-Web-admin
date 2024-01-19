import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import PropTypes from 'prop-types'

const ConfirmDelete = ({ open = false, onClose = () => { }, onSubmit = () => { }, error = "" }) => {
    // This popup will be called on delete override slots action and remove interviewer
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <>
        <DialogContent className="user_type_select">
          <h3>Are you sure you want to delete ?</h3>
        </DialogContent>
        <DialogActions>
        <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          {error === "" && <Button
            color="primary"
            variant="contained"
            onClick={onSubmit}
          >
            Confirm
          </Button> }
        </DialogActions>
      </>
    </Dialog>
  )
}

ConfirmDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ConfirmDelete;
