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
import ActiveUsersAction from "../../store/actions/ActiveUsersAction";
import { getLocalTime } from "src/utils/utility";

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
    planExpiryDate: Date;
    LearnerName: string; 
    PlanName: string;
  }

const ActiveUserListing = () => {
    const [addDialog, setAddDialog] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const [scheduleId, setScheduleId] = useState<number>();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();   

    useEffect(() => {
        setIsLoading(true);
        dispatch(
          ActiveUsersAction(
            startDate,
            endDate,
            page + 1,
            limit,
            search,
            sortBy?.[0]?.id,
            sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'desc' : 'asc'  
          )
        ).then(() => setIsLoading(false));
      }, [limit, page, search, sortBy]);
    
      useEffect(() => {
          setIsLoading(true);
          dispatch(
            ActiveUsersAction(
                startDate,
                endDate,
                 1,
                 limit,
                 search,
                 sortBy?.[0]?.id,
                 sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'desc' : 'asc'    
            )
          ).then(() => setIsLoading(false));
      }, [startDate, endDate])
      
    const activeUserListData = useSelector(
      state => state?.ActiveUsers?.activeUsersResponse
    )
    // console.log(activeUserListData)
        const planExpiryDate = (row: UserObject) => {
            return (
              getLocalTime(row.planExpiryDate)[0].replaceAll('/', '-')
            );
          };

          const LearnerName = (row: UserObject) => {
            return (
              <span>{row.LearnerName}</span>
            );
          };

          const PlanName = (row: UserObject) => {
            return (
              <span>{row.PlanName}</span>
            );
          };

    const columns = useMemo(
        () => [
          {
            Header: "Learner Name",
            accessor: LearnerName,
            id: "LearnerName",
            width: 200
          },
          {
            Header: "Plan Name",
            accessor: PlanName,
            id: "PlanName"
          },
          {
            Header: "Plan Expiry Date",
            accessor: planExpiryDate,
            id: "planExpiryDate"
          },
        ],
        []
      );

      const myObj = activeUserListData?.data?.PlanCounts;
      let arr = []
      if (myObj) {
         arr = Object.entries(myObj);
      }

    return (
      <div>
        <Container className="userIndex">
          {/* <Grid item xs={12} position="relative" className={classes.topheader}> */}
            {/* <Typography color="textPrimary" variant="h5">
              Subscribed Users List
            </Typography> */}
            {/* <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/dashboard/counselling-dashboard"
                variant="subtitle2"
              >
                Dashboard
              </Link>
              <Typography
                color="textSecondary"
                variant="subtitle2"
                style={{ cursor: "pointer" }}
              >
                Subscribed Users
              </Typography>
            </Breadcrumbs> */}
          {/* </Grid> */}
          <Box sx={{ mt: 3 }}>
            <Table className="learnerListing premiumUserList">
              <table style={{ width: "100%", marginBottom: "2%" }}>
                <tr>
                  <th>Total Counts</th>
                  {arr && arr.map((item) => <th>{item[0]}</th>)}
                </tr>
                <tr>
                  <td>{activeUserListData.data.found}</td>
                  {arr && arr.map((item) => <td>{item[1]}</td>)}
                </tr>
              </table>
            </Table>
            <Card>
              <Grid
                item
                className="counsellorApplicationListTable filterdataContner"
              >
                {activeUserListData?.data?.ActiveUsers?.length > 0 ? (
                  <EnhancedTable
                    columns={columns}
                    data={activeUserListData?.data?.ActiveUsers}
                    totalCount={activeUserListData?.data?.found}
                    isLoading={isLoading}
                     manualGlobalFilter={true}
                    //  singleStep={true}
                     search={search}
                     setSearch={setSearch}
                    limit={limit}
                    setLimit={setLimit}
                    currentPage={page}
                    setPage={setPage}
                    //  rating={rating}
                    //  setRating={setRating}
                    manualPagination={true}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setSortedBy={setSortBy}
                    sortedBy={sortBy}
                    manualSortBy={true}
                  />
                ) : (
                  <EnhancedTable
                    columns={columns}
                    data={[]}
                    totalCount={0}
                    isLoading={isLoading}
                    //  manualGlobalFilter={true}
                    //  singleStep={true}
                    search={search}
                    setSearch={setSearch}
                    limit={limit}
                    setLimit={setLimit}
                    currentPage={page}
                    setPage={setPage}
                    //  rating={rating}
                    //  setRating={setRating}
                    manualPagination={true}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    setSortedBy={setSortBy}
                    sortedBy={sortBy}
                    manualSortBy={true}
                  />
                )}
              </Grid>
            </Card>
          </Box>
        </Container>
      </div>
    );
}

export default ActiveUserListing;