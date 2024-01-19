import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Box,
  Card,
  Tooltip,
  IconButton,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import { makeStyles } from "@material-ui/core/styles";
import { useMemo, useState, useEffect } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { RootStateOrAny } from "react-redux";
import { useDispatch, useSelector } from "../../store";
import AddCircleOutlineSharp from "@material-ui/icons/AddCircleOutlineSharp";
import AddCardAllocation from "./AddOfflineSales";

const useStyles = makeStyles({
  topheader: {
    paddingTop: "16px",
    position: "relative",
  },
  tablebackground: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "4px",
    position: "relative",
    boxShdow: "0px 1px 2px #ddd",
    marginTop: "24px",
  },
  tableTab: {
    width: "100%",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  tabbing: {
    borderBottom: "2px solid #fff",
  },
  active: {
    borderBottom: "2px solid #5664d2",
    color: "#5664d2",
  },
  usertooltip: {
    position: "absolute",
    right: "0px",
    top: "16px",
  },
  clickable: {
    cursor: "pointer",
    background: "transparent",
    textDecoration: "none !important",
    textAlign: "left",
    fontSize: "14px",
    textTransform: "capitalize",
    padding: "0",
  },
});

const OfflineSalesList = () => {
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const classes = useStyles();
  return (
    <div>
      <Container className="userIndex">
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
            Offline Sales List
          </Typography>
          <Tooltip title="Add" className={classes.usertooltip}>
            <IconButton
              aria-label="add"
              size="small"
              onClick={() => setAddDialog(true)}
            >
              <AddCircleOutlineSharp color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Card>
           
            {addDialog && (
              <AddCardAllocation addDialog={addDialog} setAddDialog={setAddDialog} />
            )}
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default OfflineSalesList;
