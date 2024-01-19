import { Card, Grid, Table, CircularProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import {
  SearchSharp
} from "@material-ui/icons";
import { useDispatch, useSelector } from "../../store";
import { getLearnersList } from "../../store/actions/learnersListAction";
import { makeStyles } from '@material-ui/core/styles';
import LearnerDetailScreen from "./LearnerDetailScreen";

interface UserObject {
  UserSid: string;
  FirstName: string;
  LastName: string;
  TaskCompletedCount: string;
  TaskAssignedCount: string;
}

const useStyles = makeStyles({
  actionPlanMainDiv: {
    display: "flex",
    flexWrap: "wrap"
  },
  normal: {
    background: "transparent",
    textDecoration: "none !important",
    cursor: "pointer",
    paddingRight: "0"
  }
});

const Learners = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { learners } = useSelector((state) => state.learnerList);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLimit, setInitialLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [initialSearch, setInitialSearch] = useState("");
  const [learnerID, setLearnerID] = useState(null);
  const [SubscribeId, setSubscribeId] = useState(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [currentTab, setCurrentTab] = useState(false);
  const isLimitChange = limit !== initialLimit;
  const isSearchChange = search !== initialSearch;
  const isLastPage = page + 1 === Math.ceil(learners.count / limit);
  const lstLearnerListing = useSelector(
    state => state?.learnerList?.learners?.list
  );
  const lstLearnerListingfound = useSelector(
    state => state?.learnerList?.learners?.count
  );
  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getLearnersList(id, /* learners.paginationToken, */ limit, "", search)
    ).then(() => setIsLoading(false));
    if (isLimitChange) setInitialLimit(limit);
    if (isSearchChange) setInitialSearch(search);
  }, [page, limit, search, currentTab, props.learners]);

  useEffect(() => {
    setPage(0);
  }, []);

  const openActionPlan = (val) => {
    props.setScheduleId(val.ScheduleId);
    props.setActionPlan(true);
  }

  const getFilterListing = (name) => {
    dispatch(
      getLearnersList(id, /* learners.paginationToken, */ limit, "", name)
    ).then(() => setIsLoading(false));
  }

  const clickHandler = (id, SubId) => {
    setCurrentTab(!currentTab)
    props.setLearnerDetailScreen(true);
    setLearnerID(id);
    setSubscribeId(SubId)
  };

  const classes = useStyles();

  let propsLearner;
  if (props.learners === true && props.learnerDetailScreen === false) {
    propsLearner = (
    <div>
      {props.learners ? (
        <Grid>
          <Card>
            <div className="learners-heading">Learners</div>
            <div className="upcomingSessionInnerBox learnersListHeader">
              <div className="learnerListHeaderLeft">Showing {lstLearnerListing.length} Learners</div>
              <div className="learnerListHeaderRight"><input type="text" name="SearchName" placeholder="Search for learner name…" onChange={(e) => getFilterListing(e.target.value)} /><SearchSharp className="searchIcon" /></div>
            </div>
            <Grid item className="counsellorApplicationListTable">
            {lstLearnerListingfound > 0 ? <Table className="learnerListing">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Package</th>
                  {/* <th>Action Plans</th> */}
                  {/* <th>Tasks (Completed / Total)</th> */}
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {lstLearnerListing && lstLearnerListing.map(item => (
                  <tr>
                    <td>{item?.FirstName}</td>
                    <td>{item?.LastName}</td>
                    <td>{item?.PlanName}</td>
                    {/* <td>
                      <div>
                        {item?.PlanName !== "PREMIUM IGNITOR" ? <>
                            {item?.ActionPlan ? <div className={classes.actionPlanMainDiv}>
                                {item?.ActionPlan.map((acpl, ind) => {
                                  return (
                                    <button className={classes.normal} type="button" onClick={() => openActionPlan(acpl)}>AP{ind + 1} <span>|</span></button>
                                  )
                                })} </div> : "-"}
                          </> : '-'}
                      </div>
                    </td> */}
                    {/* <td>{item?.TaskCompletedCount} / {item?.TaskAssignedCount}</td> */}
                    <td>
                      {/* <Link to={`/dashboard/learnerDetails/${item?.Id}`} className="viewlink">View Details</Link> */}
                        <button
                          className="watch-button feedback-detail"
                          type="button"
                          onClick={() => clickHandler(item?.smassociationId, item?.SubscribeId)}
                        >
                          View
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table> : <Table className="learnerListing">
              <thead>
                <tr>
                  <th>No Record Found.</th>
                </tr>
              </thead>
            </Table> }
            </Grid>
          </Card>
        </Grid>
      ) : props.activeTab === 3 ? (
        <div className="loading">
        <CircularProgress />
      </div>
      ) : ("")}
    </div>
  );
  } else if (props.learners === true && props.learnerDetailScreen === true) {
    propsLearner = <LearnerDetailScreen SubId={SubscribeId} learnerID={learnerID} learnerDetailScreen={props.learnerDetailScreen} setLearnerDetailScreen={props.setLearnerDetailScreen} setScheduleId={props.setScheduleId} setActionPlan={props.setActionPlan} />;
  }

  return <div>{propsLearner}</div>;
};
export default Learners;
