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
    CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMemo, useState, useEffect } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { useDispatch, useSelector } from "src/store";
import sessionSlotsOverrideListingAction from "src/store/actions/SessionSlotsOverrideAction";
import { ChangeSessionOverrideAction } from "src/store/actions/ChangeSessionOverride";
import { getLocalTime } from "src/utils/utility";
import AddCircleOutlineSharp from '@material-ui/icons/AddCircleOutlineSharp';
import AddSessionOverride from "./AddSessionOverride";
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import ConfirmDelete from './ConfirmDelete';
import { DELETE_UNIVERSAL_OVERRIDE, POST_UNIVERSAL_OVERRIDE } from "src/store/RbacConstants";

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
    OverrideId: Date;
    StartTime: Date;
    EndTime: Date;
  }

const SessionSlotsOverride = () => {
    const [addDialog, setAddDialog] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const [scheduleId, setScheduleId] = useState<number>();
    const classes = useStyles();
    const dispatch = useDispatch();   
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [overrideID, setOverrideID] = useState(null);
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

    useEffect(() => {
        setIsLoading(true);
        dispatch(sessionSlotsOverrideListingAction(
          search,
          page + 1,
          limit,
          sortBy?.[0]?.id,
          sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'desc' : 'asc'
        )).then(() => setIsLoading(false))
    }, [page, search, limit, sortBy])

    const sessionSlotsOverrideListData = useSelector(
      state => state?.sessionSlotsOverride?.sessionSlotsOverrideListingResponse?.data?.overRideData
    )

    const sessionSlotsOverrideListTotal = useSelector(
      state => state?.sessionSlotsOverride?.sessionSlotsOverrideListingResponse?.data?.TotalRecords
    )
    /**
    * GET ALL ALLOWED API List
    */
    const roleAllowedApis = useSelector(
      (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )

    const handleDelete = () => {
      dispatch(ChangeSessionOverrideAction(overrideID)).then(() => dispatch(sessionSlotsOverrideListingAction(
        search,
        page + 1,
        limit,
        sortBy?.[0]?.id,
        sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'desc' : 'asc'
      )))
      setConfirmDialog(false);
    }
    const DeleteHandler = (row: UserObject) => {
      return (
        <span>
        {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_UNIVERSAL_OVERRIDE).length > 0)
        && <Button onClick={() => { setOverrideID(row.OverrideId); setConfirmDialog(true) }}>
          <DeleteIcon color="action" />
        </Button>}
          </span>
      );
    };

    const StartTime = (row: UserObject) => {
      return (
        getLocalTime(row.StartTime)[1]
      );
    };

    const EndTime = (row: UserObject) => {
      return (
        getLocalTime(row.EndTime)[1]
      );
    };

    const columns = useMemo(
        () => [
          {
            Header: "Date",
            accessor: 'OverrideDate',
          },
          {
            Header: "Start Time",
            accessor: StartTime,
            disableSortBy: true,
          },
          {
            Header: "End Time",
            accessor: EndTime,
            disableSortBy: true,
          },
          {
            Header: "Action",
            accessor: DeleteHandler,
            disableSortBy: true,
          }
        ],
        [roleAllowedApis]
      );

    return (
      <div>
        <Container className="userIndex">
          {confirmDialog && (
            <ConfirmDelete
              open={confirmDialog}
              onClose={() => setConfirmDialog(false)}
              onSubmit={() => handleDelete()}
            />
          )}
          <Grid item xs={12} position="relative" className={classes.topheader}>
            <Typography color="textPrimary" variant="h5">
              Session Slots Override
            </Typography>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_UNIVERSAL_OVERRIDE).length > 0)
        && <Tooltip title="Add" className={classes.usertooltip}>
              <IconButton
                aria-label="add"
                size="small"
                onClick={() => setAddDialog(true)}
              >
                <AddCircleOutlineSharp color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>}
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Card>
              <Grid
                item
                className="counsellorApplicationListTable filterdataContner"
              >
                {sessionSlotsOverrideListData ? <EnhancedTable
                  columns={columns}
                  data={sessionSlotsOverrideListData}
                  totalCount={sessionSlotsOverrideListTotal}
                   isLoading={isLoading}
                   manualGlobalFilter={true}
                  //  singleStep={true}
                   search={search}
                   setSearch={setSearch}
                   limit={limit}
                   setLimit={setLimit}
                   sortedBy={sortBy}
                   setSortedBy={setSortBy}
                   currentPage={page}
                   setPage={setPage}
                  //  rating={rating}
                  //  setRating={setRating}
                   manualPagination={true}
                  //  setStartDate={setStartDate}
                  //  setEndDate={setEndDate}
                /> : <div style={{ margin: "50vh 0", display: 'flex', justifyContent: 'center' }}><CircularProgress /></div>}
              </Grid>
              {addDialog && (
                <AddSessionOverride
                  addDialog={addDialog}
                  setAddDialog={setAddDialog}
                />
              )}
            </Card>
          </Box>
        </Container>
      </div>
    );
}

export default SessionSlotsOverride;