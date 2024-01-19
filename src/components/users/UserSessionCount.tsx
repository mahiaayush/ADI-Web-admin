import { Link as RouterLink } from "react-router-dom";
import * as React from "react";
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
  Table,
  TextField,
  CardHeader,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMemo, useState, useEffect } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { useDispatch, useSelector } from "src/store";
import AddCircleOutlineSharp from "@material-ui/icons/AddCircleOutlineSharp";
import CounsellorCountAction from "../../store/actions/CounsellorCountAction";
import PastCounsellorCountAction from "../../store/actions/PastCounsellorCountAction";
import { getLocalTime } from "src/utils/utility";
import { DateRangePicker, DateRange } from "@material-ui/lab";
import moment from "moment";

const useStyles = makeStyles({
  topheader: {
    paddingTop: "10px",
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

const UserSessionCount = () => {
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [scheduleId, setScheduleId] = useState<number>();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDate1, setStartDate1] = useState(null);
  const [endDate1, setEndDate1] = useState(null);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const [value1, setValue1] = React.useState<DateRange<Date>>([null, null]);
  const currDate = moment(new Date()).format("YYYY-MM-DD");

  useEffect(() => {
    dispatch(CounsellorCountAction(startDate, endDate));
    // dispatch(PastCounsellorCountAction(startDate1, endDate1));
  }, []);

  useEffect(() => {
    if ((startDate && endDate !== "") || (startDate === null && endDate === null)) {
      setIsLoading(true);
      dispatch(CounsellorCountAction(startDate, endDate)).then(() => setIsLoading(false));
    }
  }, [startDate, endDate]);
  useEffect(() => {
    if ((startDate1 && endDate1 !== "") || (startDate1 === null && endDate1 === null)) {
      setIsLoading(true);
      dispatch(PastCounsellorCountAction(startDate1, endDate1)).then(() => setIsLoading(false));
    }
  }, [startDate1, endDate1]);

  const counsellorCountData = useSelector(
    (state) => state?.CounsellorCounts?.counsellorCountsResponse
  );
  const pastCounsellorCountData = useSelector(
    (state) => state?.PastCounsellorCounts?.pastCounsellorCountsResponse
  );

  const myObj2 = counsellorCountData?.data?.activeUsersCount;
  let activeUser = [];
  if (myObj2) {
    activeUser = Object.entries(myObj2);
  }
  const myObj1 = counsellorCountData?.data?.scheduledSessionsCount;
  let scheduledSession = [];
  if (myObj1) {
    scheduledSession = Object.entries(myObj1);
  }

  const myObj3 = pastCounsellorCountData?.data?.inactiveUsersCount;
  let inactiveUser = [];
  if (myObj3) {
    inactiveUser = Object.entries(myObj3);
  }

  const myObj = pastCounsellorCountData.data?.completedSessionsCount;
  let completedSession = [];
  if (myObj) {
    completedSession = Object.entries(myObj);
  }
  const handleDateSelect = (val) => {
    setValue(val);
    // if (val[0] !== null && val[1] !== null) {
      setStartDate(moment(val[0]).format("YYYY-MM-DD") === "Invalid date" ? null : moment(val[0]).format("YYYY-MM-DD"));
      setEndDate(moment(val[1]).format("YYYY-MM-DD") === "Invalid date" ? null : moment(val[1]).format("YYYY-MM-DD"));
    // }
  };
  const handleDateSelect1 = (val) => {
    setValue1(val);
    // if (val[0] !== null && val[1] !== null) {
      setStartDate1(moment(val[0]).format("YYYY-MM-DD") === "Invalid date" ? null : moment(val[0]).format("YYYY-MM-DD"));
      setEndDate1(moment(val[1]).format("YYYY-MM-DD") === "Invalid date" ? null : moment(val[1]).format("YYYY-MM-DD"));
    // }
  };
  const label = "Total Count";

  const HeadingTable = (arr, text) => {
    return (
     
 <>
        <Typography
          color="textPrimary"
          variant="h5"
          style={{ marginBottom: "1%", marginLeft: "2%", marginTop: "1%" }}
        >
          {text}
        </Typography>
        <Table className="learnerListing">
          <table style={{ width: "100%" }}>
            <tr>
              {arr && arr.map((item) => {
                  return item[0] === "totalPlanCount" ? (
                    <th>{label}</th>
                  ) : (
                    <th>{item[0]}</th>
                  );
                })}
            </tr>
            <tr>{arr && arr.map((item) => <td>{item[1]}</td>)}</tr>
          </table>
        </Table>
      </>
     
    );
  };

  return (
    <div>
       <Box sx={{ mt: 3 }}>
        <Card style={{ marginBottom: "2%" }}>
          <div style={{ marginRight: "10px", padding: "10px", float: "right" }}>
            <DateRangePicker
              startText="Start"
              endText="End"
              value={value}
              maxDate={currDate}
              onChange={(newValue) => {
                handleDateSelect(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} helperText="" size="small" />
                  <Box sx={{ mx: 1 }}> to </Box>
                  <TextField {...endProps} helperText="" size="small" />
                </>
              )}
            />
          </div>
          {HeadingTable(activeUser, "Subscribed Users")}
        </Card>
        <Card>{HeadingTable(scheduledSession, "Scheduled Session")}</Card>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card style={{ marginBottom: "2%" }}>
          <div style={{ marginRight: "10px", padding: "10px", float: "right" }}>
            <DateRangePicker
              startText="Start"
              endText="End"
              value={value1}
              maxDate={currDate}
              onChange={(newValue) => {
                handleDateSelect1(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} helperText="" size="small" />
                  <Box sx={{ mx: 1 }}> to </Box>
                  <TextField {...endProps} helperText="" size="small" />
                </>
              )}
            />
          </div>
          {HeadingTable(inactiveUser, "Expired Subscriptions")}
        </Card>
        <Card>{HeadingTable(completedSession, "Completed Session")}</Card>
      </Box>
     
    </div>
    
  );
};

export default UserSessionCount;
