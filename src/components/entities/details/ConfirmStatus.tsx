import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import PropTypes from 'prop-types'

const ConfirmStatus = ({ displayText = "", open = false, onClose = () => { }, onSubmit = () => { } }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <>
        <DialogContent className="user_type_select">
          <h3>{displayText.trim() !== "" ? displayText : 'Are you sure to change the status ?'}</h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={onSubmit}
          >
            Confirm
          </Button>
        </DialogActions>
      </>
    </Dialog>
  )
}

ConfirmStatus.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ConfirmStatus;
