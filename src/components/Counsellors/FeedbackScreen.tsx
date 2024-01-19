import { Card, Grid, Table } from "@material-ui/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { getFeedbackList } from "../../store/actions/FeedbackListingAction";
import { useDispatch, useSelector } from "../../store";
import { SearchSharp, Star, StarBorder } from "@material-ui/icons";
import { getLocalTime } from "../../utils/utility";
import FeedbackDetailScreen from "./FeedbackDetailScreen";

const FeedbackScreen = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { feedback } = useSelector((state) => state.feedbackList);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLimit, setInitialLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [initialSearch, setInitialSearch] = useState("");
  const [scheduleID, setScheduleID] = useState(null);
  const isLimitChange = limit !== initialLimit;
  const isSearchChange = search !== initialSearch;

  const lstFeedbackListing = useSelector(
    (state) => state?.feedbackList?.feedback?.list
  );
  const lstFeedbackListingFound = useSelector(
    (state) => state?.feedbackList?.feedback?.count
  );

  const clickHandler = (id) => {
    props.setFeedbackDetailScreen(true);
    setScheduleID(id);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getFeedbackList(id, search)
    ).then(() => setIsLoading(false));
    if (isLimitChange) setInitialLimit(limit);
    if (isSearchChange) setInitialSearch(search);
  }, [page, limit, search]);

  const getFilterListing = (name) => {
    dispatch(
      getFeedbackList(id, /* learners.paginationToken, */ "", name)
    ).then(() => setIsLoading(false));
  };
  let propsFeedback;
  if (props.feedback === true && props.feedbackDetailScreen === false) {
    propsFeedback = (
      <Grid>
        <Card className="card">
          <div className="learners-heading">Feedback</div>
          <div className="upcomingSessionInnerBox learnersListHeader">
            <div className="learnerListHeaderLeft">
              Showing {lstFeedbackListingFound} Learners
            </div>
            <div className="learnerListHeaderRight">
              <input
                type="text"
                name="SearchName"
                placeholder="Search for learner name…"
                onChange={(e) => getFilterListing(e.target.value)}
              />
              <SearchSharp className="searchIcon" />
            </div>
          </div>
          {lstFeedbackListingFound > 0 ? (
            <Table className="learnerListing">
              <table className="table">
                <tr>
                  <th>Date Submitted</th>
                  <th>User</th>
                  <th>Package</th>
                  <th>Session #</th>
                  <th>Meeting ID</th>
                  <th>Rating</th>
                  <th>Remarks</th>
                  <th>-</th>
                </tr>

                {lstFeedbackListing 
                && lstFeedbackListing.map((item, index) => (
                    <tr key={index.toString()}>
                      <td>{getLocalTime(item?.DateSubmitted)[0]}</td>
                      <td>
                        {item?.FirstName} {item?.LastName}
                      </td>
                      <td>{item?.PlanName}</td>
                      <td>{item?.SessionNo}</td>
                      <td>{item?.RoomName}</td>
                      <td>
                        {[...Array(5)].map((item2, i) =>
                          (i + 1 <= item?.Rating ? (
                            <Star key={i.toString()} />
                          ) : (
                            <StarBorder key={i.toString()} />
                          )))}
                      </td>
                      <td>{item?.AdditionlaInfor}</td>
                      <td>
                        <button
                          className="watch-button feedback-detail"
                          type="button"
                          onClick={() => clickHandler(item?.SessionId)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </table>
            </Table>
          ) : (
            <Table className="learnerListing">
              <thead>
                <tr>
                  <th>No Record Found.</th>
                </tr>
              </thead>
            </Table>
          )}
        </Card>
      </Grid>
    );
  } else if (props.feedback === true && props.feedbackDetailScreen === true) {
    propsFeedback = <FeedbackDetailScreen scheduledId={scheduleID} feedbackDetailScreen={props.feedbackDetailScreen} setFeedbackDetailScreen={props.setFeedbackDetailScreen} />;
  }

  return <div>{propsFeedback}</div>;
};
export default FeedbackScreen;