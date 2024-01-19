import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Box,
  Card,
} from "@material-ui/core";
import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "../../store";
import UserFeedbackListAction from "../../store/actions/UserFeedbackListAction";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { Star, StarBorder } from "@material-ui/icons";
import { getLocalTime } from "src/utils/utility";
import FeedbackDetailScreen from "../Counsellors/FeedbackDetailScreen";

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
    textDecoration: "none !important",
    textAlign: "left",
    fontSize: "14px",
    textTransform: "capitalize",
    padding: "0",
    backgroundColor: "white",
    color: "#5664d2",
  }
});

interface UserObject {
  FirstName: string;
  LastName: string;
  ScheduleId : string;
}

const Feedback = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rating, setRating] = useState({ label: "Rating", value: null });
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [scheduleId, setScheduleId] = useState(null)

  const FeedbackData = useSelector((state:any) => state.userFeedbackList.feedbackResponse.data);
  const FeedbackCount = useSelector((state:any) => state.userFeedbackList.feedbackResponse.found);

  const showDetails = (val) => {
    setScheduleId(val);
    setShowDetailPage(true)
  }
  
  useEffect(() => {
    setIsLoading(true);
    dispatch(
      UserFeedbackListAction(
        startDate,
        endDate,
        rating.value,
        search,
        limit,
        page + 1
      )
    ).then(() => setIsLoading(false));
  }, [rating, search, limit, page]);

  useEffect(() => {
    if (startDate && endDate !== "") { 
      setIsLoading(true);
      dispatch(
        UserFeedbackListAction(
          startDate,
          endDate,
          rating.value,
          search,
          limit
        )
      ).then(() => setIsLoading(false));
    }
  }, [startDate, endDate])

  const classes = useStyles();

  const FullName = (row: UserObject) => {
    return (
      <button type="button" className={classes.clickable} onClick={() => showDetails(row.ScheduleId)}>
        {row.FirstName} {row.LastName}
      </button>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "FeedbackId",
        id: "FeedbackId",
        accessor: 'FeedbackId',
      },
      {
        Header: "Name",
        accessor: FullName
      },
      {
        Header: "PlanName",
        accessor: "PlanName",
      },
      {
        Header: "Review",
        accessor: "Review",
      },
      {
        Header: "Feedback Date Time",
        accessor: "FeedbackDateTime",
        Cell: props => getLocalTime(props.value)[3]
      },
      {
        Header: "Selected Options",
        accessor: "SelectedOptions",
        Cell: ({ cell: { value } }) =>
          value.map((item, i) => (i !== value.length - 1 ? `${item.OptionName},` : `${item.OptionName}`))
      },
      {
        Header: "Rating",
        accessor: "Rating",
        Cell: ({ cell: { value } }) =>
          [...Array(5)].map((item, i) =>
            (i + 1 <= value ? <Star className={`${i}`} fontSize="small" /> : <StarBorder className={`${i}`} fontSize="small" />))
      }
    ],
    []
  );

  return (
    <div>
      <Container className="userIndex">
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
            Users Feedback
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
            <Typography color="textSecondary" variant="subtitle2" style={{ "cursor": showDetailPage && "pointer" }} onClick={() => setShowDetailPage(false)}>
              Feedback
            </Typography>
          </Breadcrumbs>
        </Grid>
        { !showDetailPage 
        ? <Box sx={{ mt: 3 }}>
          <Card>
            <Grid item className="counsellorApplicationListTable filterdataContner">
              <EnhancedTable
                columns={columns}
                data={FeedbackData}
                totalCount={FeedbackCount}
                isLoading={isLoading}
                manualGlobalFilter={true}
                // singleStep={true}
                search={search}
                setSearch={setSearch}
                limit={limit}
                setLimit={setLimit}
                currentPage={page}
                setPage={setPage}
                rating={rating}
                setRating={setRating}
                manualPagination={true}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </Grid>
          </Card>
        </Box>
        : <Box><FeedbackDetailScreen scheduledId={scheduleId} feedbackDetailScreen={showDetailPage} setFeedbackDetailScreen={setShowDetailPage} /></Box>}
        
      </Container>
    </div>
  );
};
export default Feedback;
