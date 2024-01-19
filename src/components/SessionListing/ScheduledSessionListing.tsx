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
    Table
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMemo, useState, useEffect } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { useDispatch, useSelector } from "src/store";
import AddCircleOutlineSharp from '@material-ui/icons/AddCircleOutlineSharp';
import ScheduledSessionListingAction from "src/store/actions/ScheduledSessionListingAction";
import { getLocalTime } from "src/utils/utility";
import moment from "moment";

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
      padding: "0"
    }
  });

  interface UserObject {
    ScheduledOn: Date;
    CreatedOnDate: Date;
    BillId: string; 
    ScheduleId: number;
    VoidBillReason: string;
    SessionStartTime: Date;
    SessionEndTime: Date;
  }

const ScheduledSessionListing = () => {
    const [addDialog, setAddDialog] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const [scheduleId, setScheduleId] = useState<number>();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const classes = useStyles();
    const dispatch = useDispatch();   

    useEffect(() => {
      setIsLoading(true);
      dispatch(
        ScheduledSessionListingAction(
          page + 1,
          limit,
          startDate,
          endDate   
        )
      ).then(() => setIsLoading(false));
    }, [limit, page]);
  
    useEffect(() => {
      if (startDate && endDate) { 
        setIsLoading(true);
        dispatch(
          ScheduledSessionListingAction(
              1,
              limit,
              startDate,
              endDate   
          )
        ).then(() => setIsLoading(false));
      }
    }, [startDate, endDate])

    const scheduledSessionListData = useSelector(
      state => state?.scheduledSessionListing?.scheduledSessionListingResponse
    )
   //  console.log("sesssiondata", scheduledSessionListData) 
  const myObj = scheduledSessionListData?.data?.planCounts;
  let arr = []
  if (myObj) {
     arr = Object.entries(myObj);
  }

          const ScheduledOn = (row: UserObject) => {
            return (
              getLocalTime(row.ScheduledOn)[4]
            );
          };
          const SessionStartTime = (row: UserObject) => {
            return (
              getLocalTime(row.SessionStartTime)[1] !== 'Invalid date' ? getLocalTime(row.SessionStartTime)[1] : ""
            );
          };
          const SessionEndTime = (row: UserObject) => {
            return (
              getLocalTime(row.SessionEndTime)[1] !== 'Invalid date' ? getLocalTime(row.SessionEndTime)[1] : ""
            );
          };
          
    const columns = useMemo(
        () => [
          {
            Header: "Room Name",
            // id: "InterviewerId",
            accessor: 'RoomName',
          },
          {
            Header: "Counsellor",
            accessor: "Counselor"
          },
          {
            Header: "Learner",
            accessor: "Learner",
          },
          {
            Header: "Scheduled Date",
            accessor: ScheduledOn,
          },
          {
            Header: "Session Start Time",
            accessor: SessionStartTime,
          },
          {
            Header: "Session End Time",
            accessor: SessionEndTime,
          },
          {
            Header: "Status",
            accessor: "Status",
          },
        ],
        []
      );

    return (
      <div>
        <Container className="userIndex">
          <Grid item xs={12} position="relative" className={classes.topheader}>
            <Typography color="textPrimary" variant="h5">
             Scheduled Session 
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/counselling-dashboard"
                variant="subtitle2"
              >
                Counselling Dashboard
              </Link>
              <Typography
                color="textSecondary"
                variant="subtitle2"
                style={{ cursor: "pointer" }}
              >
                Sessions
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Table className="learnerListing">
              <table style={{ width: "100%", marginBottom: "2%" }}>
                <tr>
                  <th>Total Counts</th>
                  {arr && arr.map((item) => <th>{item[0]}</th>)}
                </tr>
                <tr>
                  <td>{scheduledSessionListData?.data?.found}</td>
                  {arr && arr.map((item) => <td>{item[1]}</td>)}
                </tr>
              </table>
            </Table>
            <Card>
              <Grid
                item
                className="counsellorApplicationListTable filterdataContner"
              >
                {scheduledSessionListData?.data?.scheduledSessionData?.length ? (
                  <EnhancedTable
                    columns={columns}
                    data={scheduledSessionListData.data.scheduledSessionData}
                    totalCount={scheduledSessionListData.data.found}
                    //  isLoading={isLoading}
                    //  manualGlobalFilter={true}
                    //  singleStep={true}
                    //  search={search}
                    //  setSearch={setSearch}
                    limit={limit}
                    setLimit={setLimit}
                    currentPage={page}
                    setPage={setPage}
                    //  rating={rating}
                    //  setRating={setRating}
                    manualPagination={true}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                ) : (
                  <EnhancedTable
                    columns={columns}
                    data={[]}
                    totalCount={0}
                    isLoading={isLoading}
                    //  manualGlobalFilter={true}
                    //  singleStep={true}
                    //  search={search}
                    //  setSearch={setSearch}
                    limit={limit}
                    setLimit={setLimit}
                    currentPage={page}
                    setPage={setPage}
                    //  rating={rating}
                    //  setRating={setRating}
                    manualPagination={true}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                )}
              </Grid>
            </Card>
          </Box>
        </Container>
      </div>
    );
}

export default ScheduledSessionListing;