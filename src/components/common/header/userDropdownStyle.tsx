import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  userDropdownMain: {
    width: "210px",
    position: "relative",
    margin: "-18px 0 -18px 150px",
  },
  userDropdownarea: {
    width: "100%",
  },
  listclass: {
    padding: "15px",
    borderBottom: "1px solid #eee",
    fontSize: "16px",
    "&:hover": {
      color: "#000",
    },
    "&:last-child": {
      border: "0px",
    },
  },
  userDropdown: {
    background: "rgb(0 0 0 / 75%)",
    width: "100%",
    justifyContent: "space-between",
    border: "4px",
    height: "56px",
    color: "#fff",
    padding: "0px 20px",
    fontSize: "16px",
    borderRadius: 0,
    '&:hover': {
      background: "rgb(0 0 0 / 80%)",
    }
  },
}))

export default useStyles;
