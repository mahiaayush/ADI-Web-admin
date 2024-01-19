import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Box,
  Card,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import moment from 'moment';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "../../store";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { Star, StarBorder } from "@material-ui/icons";
import { getLocalTime } from "src/utils/utility";
import sessionsListAction from "src/store/actions/sessionsListAction";
import VoidBillSessionsListing from "./VoidBillSessionsListing";
import { useNavigate } from "react-router";
import { green, orange, red } from "@material-ui/core/colors";

const useStyles = makeStyles({
    topheader: {
      paddingTop: "16px",
      position: "relative",
    },
    
  });

  interface UserObject {
    ConsolerFirstName: string;
    ConsolerLastName: string;
    LearnerFamilyName: string;
    LearnerGivenName: string;
    EndTime: Date;
    StartTime: Date;
    ScheduleDate: Date;
    Rating: number;
    RoomName: String;
    Status: String;
    SubStatus: String;
    ScheduleId: number;
    ReferenceId: number;
  }

const Sessions = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [rating, setRating] = useState({ label: "Rating", value: null });
    const [sessionStatus, setSessionStatus] = useState({ label: "Select Status", value: null });
    const [sessionSubStatus, setSessionSubStatus] = useState({ label: "Select Sub-Status", value: null })
    const [optionDisable, setOptionDisable] = useState(true);
    const [manualSearchCounsellor, setManualSearchCounsellor] = useState('');
    const [manualSearchLearner, setManualSearchLearner] = useState('');
    const [manualSearchMeeting, setManualSearchMeeting] = useState('');
    const [scheduledId, setScheduledId] = useState(null);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const ViewLink = (row: UserObject) => {
      return (
        <FormControl size="small" variant="outlined">
          <InputLabel
            id="demo-simple-select-outlined-label"
            className="ActionButtonSessions"
          >
            Action
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Action"
            value="icon"
            className="selectAction"
          >
            <MenuItem value="icon">
              {" "}
              <MoreHorizRoundedIcon />{" "}
            </MenuItem>
            <MenuItem
              value="Add License"
              onClick={() => {
                setOpen(true);
                setScheduledId(row.ScheduleId);
              }}
              disabled={row.SubStatus !== "COMPLETED"}
            >
              <Button
                size="small"
                type="button"
                variant="text"
                color="primary"
                // onClick={() => {
                //   setOpen(true)
                //   setScheduledId(row.ScheduleId)
                // }}
                // disabled={row.SubStatus !== "COMPLETED"}
              >
                Void Bill
              </Button>
            </MenuItem>
            <MenuItem
              value="Map Item"
              onClick={() => navigate(`/SessionsDetail/${row.ScheduleId}`)}
            >
              <Button
                size="small"
                type="button"
                variant="text"
                color="primary"
                // onClick={() => navigate(`/SessionsDetail/${row.ScheduleId}`)}
              >
                Session Detail
              </Button>
            </MenuItem>
          </Select>
        </FormControl>
      );
  }

    const LearnerName = (row: UserObject) => {
        return (
          <span>
            {row.LearnerGivenName} {row.LearnerFamilyName}
          </span>
        );
      };

      const Status = (row: UserObject) => {
        return (
          <span
            className={
              (row.SubStatus === null 
                || row.SubStatus === "REASSIGNED BY LMC") 
                && (row.Status === "SCHEDULED" || row.Status === "RESCHEDULED")
                ? "status_badge-sessions scheduledSessions"
                : row.SubStatus === "NOT_COMPLETED" 
                || row.SubStatus === "NO_SHOW"
                ? "status_badge-sessions scheduled-notcompleted_noshow"
                : row.SubStatus === "COMPLETED"
                ? "status_badge-sessions scheduled-completed"
                : row.Status === "CANCELED BY LMC" 
                || row.Status === "CANCELED BY COUNSELOR" 
                || row.Status === "CANCELED BY USER"
                ? "status_badge-sessions cancelledSessions"
                : ""
            }
          >
            {row?.Status}
          </span>
        );
      };

      const SubStatus = (row: UserObject) => {
        return (
          <span
            className={
              row.SubStatus === "NO_SHOW" || row.SubStatus === "NOT_COMPLETED"
                ? "status_badge-sessions scheduled-notcompleted_noshow"
                : row.SubStatus === "COMPLETED"
                ? "status_badge-sessions scheduled-completed"
                : ""
            }
          >
            {row.SubStatus === "NO_SHOW"
              ? "NO SHOW"
              : row.SubStatus === "NOT_COMPLETED"
              ? "NOT COMPLETED"
              : row.SubStatus === "COMPLETED"
              ? "COMPLETED"
              : row.SubStatus}
          </span>
        );
      };

      const CounsellorName = (row: UserObject) => {
        return (
          <span>
            {row.ConsolerFirstName} {row.ConsolerLastName}
          </span>
        );
      };

      const TimeStartEnd = (row: UserObject) => {
          const startDate = `${moment.utc(row.ScheduleDate).format('YYYY-MM-DD')}T${row.StartTime}Z`
          const endDate = `${moment.utc(row.ScheduleDate).format('YYYY-MM-DD')}T${row.EndTime}Z`
          const localStartTime = getLocalTime(startDate)[1]
          const localEndTime = getLocalTime(endDate)[1]
          return (
            <span>{`${localStartTime}-${localEndTime}`}</span>
          )
      }

      const RatingColor = (len) => {
        if (len > 3) {
          return "green";
        } 
        if (len <= 3 && len > 1) {
          return "orange";
        }
        return "red";
      }

      const Rating = (row: UserObject) => {
        return (<span className="starClass">{[...Array(5)].map((item, i) => (i + 1 <= row.Rating ? (
          <Star key={i.toString()} style={{ color: `${RatingColor(row.Rating)}` }} />
        ) : (
          <StarBorder key={i.toString()} />
        )))}</span>)
      }

      const sessionsListData = useSelector(
        (state: any) => state?.sessionsListResult?.sessionsListResult?.data?.data?.SessionList
      )
      const sessionsListDataFound = useSelector(
        (state: any) => state?.sessionsListResult?.sessionsListResult?.data?.data?.TotalRecords
    )

    useEffect(() => {
      setIsLoading(true);
      const intervalIdentifier = setTimeout(() => {
        dispatch(sessionsListAction(
              startDate,
              endDate,
              sessionStatus.value,
              sessionSubStatus.value,
              manualSearchCounsellor,
              manualSearchLearner,
              manualSearchMeeting,
              limit,
              page + 1,
              sortBy?.[0]?.id,
              sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'
        )).then(() => setIsLoading(false))
      }, 1000);

      return () => { clearTimeout(intervalIdentifier) };
      }, [manualSearchCounsellor, manualSearchLearner, manualSearchMeeting, limit, sortBy, page, sessionStatus, sessionSubStatus]);
  
    useEffect(() => {
      setIsLoading(true);
      if (startDate && endDate !== "") { 
        dispatch(
            sessionsListAction(
              startDate,
              endDate,
              sessionStatus.value,
              sessionSubStatus.value,
              manualSearchCounsellor,
              manualSearchLearner,
              manualSearchMeeting,
              limit,
              page + 1,
              sortBy?.[0]?.id,
              sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'
          )
        ).then(() => setIsLoading(false))
      }
    }, [startDate, endDate])

    useEffect(() => {
        if (sessionStatus.value !== "SCHEDULED") {
            setOptionDisable(true)
            const newSubStatus = { label: "Select Sub-Status", value: null }
            setSessionSubStatus(newSubStatus);
        } else {
            setOptionDisable(false)
        }
    }, [sessionStatus])
  
    const columns = useMemo(
        () => [
          // {
          //   Header: "Room Name",
          //   id: "RoomName",
          //   accessor: "RoomName",
          //   width: 270
          // },
          {
            Header: "Counsellor",
            accessor: CounsellorName,
            width: 120
          },
          {
            Header: "Learner",
            accessor: LearnerName,
            width: 120
          },
          {
            Header: "Plan",
            accessor: "ZohoPlanName",
            width: 150,
            disableSortBy: true,
          },
          {
            Header: "Schedule Date",
            accessor: "ScheduleDate",
            Cell: props => getLocalTime(props.value)[0],
            width: 100
          },
          {
            Header: "Start-End",
            accessor: TimeStartEnd,
            disableSortBy: true,
          },
          {
            Header: "Rating",
            accessor: Rating,
            width: 100
          },
          {
            Header: "Status",
            accessor: Status,
            width: 190
          },
          {
          Header: "Sub-Status",
          id: "SubStatus",
          accessor: SubStatus,
          width: 130
          },
          {
            Header: 'Actions',
            id: ' ',
            accessor: ViewLink,
            disableSortBy: true,
            width: 100
        },
        ],
        []
      );

    return (
        <div>
            <Container className="userIndex">
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
            Sessions List
          </Typography>
        </Grid>
          <Box sx={{ mt: 3 }}>
          <Card> 
            <Grid item className="counsellorApplicationListTable filterdataContner sessionsListClass sessouserIndex">
            {sessionsListData ? <EnhancedTable
                columns={columns}
                data={sessionsListData}
                totalCount={sessionsListDataFound}
                isLoading={isLoading}
                manualGlobalFilter={true}
                singleStep={true}
                search={search}
                setSearch={setSearch}
                limit={limit}
                setLimit={setLimit}
                currentPage={page}
                setPage={setPage}
                sortedBy={sortBy}
                setSortedBy={setSortBy}
                rating={rating}
                setRating={setRating}
                manualPagination={true}
                manualSortBy={true}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                sessionStatus={sessionStatus}
                setSessionStatus={setSessionStatus}
                sessionSubStatus={sessionSubStatus}
                setSessionSubStatus={setSessionSubStatus}
                optionDisable={optionDisable}
                manualSearchCounsellor={manualSearchCounsellor}
                setManualSearchCounsellor={setManualSearchCounsellor}
                manualSearchLearner={manualSearchLearner}
                setManualSearchLearner={setManualSearchLearner}
                manualSearchMeeting={manualSearchMeeting}
                setManualSearchMeeting={setManualSearchMeeting}
            /> : <div style={{ margin: "50vh 0", display: 'flex', justifyContent: 'center' }}><CircularProgress /></div>}
            </Grid>
          </Card>
          <VoidBillSessionsListing
              openPopupReject={open}
              setOpenPopupReject={setOpen}
              ScheduleId={scheduledId}
              startDate={startDate}
              endDate={endDate}
              sessionStatus={sessionStatus.value}
              sessionSubStatus={sessionSubStatus.value}
              manualSearchCounsellor={manualSearchCounsellor}
              manualSearchLearner={manualSearchLearner}
              manualSearchMeeting={manualSearchMeeting}
              limit={limit}
              page={page}
          />
        </Box>
      </Container>
    </div>
    )
}

export default Sessions;