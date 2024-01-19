import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './styles';

function Modal({
  open = false,
  children = <></>,
  title = 'Dialog',
  actions = <></>,
  classes = {},
  onClose = () => {},
  showClose = true,
}) {
  const styles = useStyles();

  return (
    <Dialog open={open} classes={classes}>
      <DialogTitle>
        {title}
        <IconButton aria-label="close" className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}

export default Modal;
