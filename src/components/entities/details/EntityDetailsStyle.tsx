import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  activeStatus: {
    marginTop: theme.spacing(5)
  },
  formGroup: {
    marginTop: theme.spacing(4)
  }
}));