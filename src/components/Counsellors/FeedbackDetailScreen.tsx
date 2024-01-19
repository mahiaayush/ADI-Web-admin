import { Container, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store";
import { makeStyles } from "@material-ui/core/styles";
import { getLocalTime } from "../../utils/utility";
import { getFeedbackDetail } from "../../store/actions/FeedbackDetailAction";
import { Star, StarBorder, ArrowBackIos } from "@material-ui/icons";
import { classNames } from "react-select/dist/declarations/src/utils";

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
    textTransform: "capitalize",
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
  topcouns: {
    padding: "0 0 0 0px",
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    margin: "0px",
  },
  countMainBox: {
    padding: "0px 10px 10px 0 !important",
    maxWidth: "14.28%",
    color: "#333",
    minHeight: "110px",
    "& h2": {
      margin: "0",
    },
    "& p": {
      margin: "0",
    },
    middleBox: {
      width: "10%",
    },
  },
  tpcounox: {
    backgroundColor: "#fff",
    paddingLeft: "10px",
    paddingRight: "0px",
    paddingTop: "5px",
    margin: "10px 0px 0px 0px",
    borderRadius: "8px",
    height: "100%",
  },
  learnerNameHead: {
    fontSize: "24px",
    textTransform: "capitalize",
  },
  backArrow: {
    marginTop: "8px",
    cursor: "pointer",
  },
  actionPlanMainDiv: {
    display: "flex",
    flexWrap: "wrap",
  },
});

const FeedbackDetailScreen = (props) => {
  const dispatch = useDispatch();
  const { feedback } = useSelector((state) => state.feedbackDetail);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const userFeedbackDetail = useSelector(
    (state) => state?.feedbackDetail?.feedback?.data
  );

  const selectOptions = userFeedbackDetail?.SelectedOptions;

  useEffect(() => {
    setIsLoading(true);
    dispatch(getFeedbackDetail(props.scheduledId)).then(() =>
      setIsLoading(false));
  }, []);

  const classes = useStyles();
  const backHandler = () => {
  props.setFeedbackDetailScreen(false);
  }

  function checkSelectedOption(OptionId) {
    const output = selectOptions.filter((item2) => item2.OptionId === OptionId); 
    if (output.length !== 0) {
      return true
    }
    return false
  }

  return (
    <div className="learnerDetailsMainDiv">
      <Container className="userIndex" style={{ padding: "0" }}>
        <Grid item xs={12} className="headerBoxes">
          <div className="main-div-tag">
            <div className="text-capitalize main-div-tag" style={{ fontWeight: "bold" }}>
              <div>
                <ArrowBackIos
                  className={classes.backArrow}
                  onClick={() => backHandler()}
                />
              </div>
              <div className={classes.learnerNameHead} style={{ textTransform: 'capitalize' }}>
                {userFeedbackDetail && `${userFeedbackDetail?.ChildFirstName} ${userFeedbackDetail?.ChildLastName}`}
              </div>
            </div>
          </div>

          <div className="main-div clickonfirstname">
            {userFeedbackDetail && (
              <>
                <div className="clickonfirstname">
                  <p>
                    <span>Name: </span>
                    {userFeedbackDetail?.ChildFirstName}{" "}
                    {userFeedbackDetail?.ChildLastName}
                  </p>
                  <p>
                    <span>Grade: </span>
                    {userFeedbackDetail?.Grade
                      ? userFeedbackDetail.Grade
                      : "Not Available"}
                  </p>
                  <p>
                    <span>School: </span>
                    {userFeedbackDetail?.School
                      ? userFeedbackDetail.School
                      : "Not Available"}
                  </p>
                  <p>
                    <span>Personality Animal: </span>
                    {userFeedbackDetail?.PersonalityAnimal
                      ? userFeedbackDetail.PersonalityAnimal
                      : "Not Available"}
                  </p>
                  <p>
                    <span>Primary Profile(s): </span>
                    {userFeedbackDetail?.ParentFirstName}{" "}
                    {userFeedbackDetail?.ParentLastName}
                  </p>
                </div>
                <div className="secondpart clickonfirstname ">
                  <p>
                    <span>Premium Package: </span>
                    {userFeedbackDetail?.Package}
                  </p>
                  <p>
                    <span>Session ID:</span> {userFeedbackDetail?.SessionId}
                  </p>
                  {userFeedbackDetail.SessionDate && (
                    <p>
                      <span>Session time/date: </span>
                      {
                        getLocalTime(
                          `${userFeedbackDetail?.SessionDate.split("T")[0]}T${
                            userFeedbackDetail?.SessionStartTime
                          }Z`
                        )[1]
                      }
                      -
                      {
                        getLocalTime(
                          `${userFeedbackDetail?.SessionDate.split("T")[0]}T${
                            userFeedbackDetail?.SessionEndTime
                          }Z`
                        )[1]
                      }{" "}
                      {getLocalTime(userFeedbackDetail?.SessionDate)[9]}
                    </p>
                  )}
                  <p>
                    <span>Feedback time/date: </span>
                    {getLocalTime(userFeedbackDetail?.FeedbackDateTime)[8]}
                  </p>
                  <p>
                    <span>Career Success Coach: </span>
                    {userFeedbackDetail?.CounsellorFirstName}{" "}
                    {userFeedbackDetail?.CounsellorLastName}
                  </p>
                </div>
              </>
            )}
          </div>
          {userFeedbackDetail && (
            <>
              <h2>Rating</h2>
              <h2>
                {[...Array(5)].map((item, i) => (i + 1 <= userFeedbackDetail.Rating ? (
                    <Star key={i.toString()} />
                  ) : (
                    <StarBorder key={i.toString()} />
                  )))}
              </h2>
              {userFeedbackDetail?.SelectedOptions?.length > 0 && (
                <h2>{userFeedbackDetail.Question}</h2>
              )}
              <>
              {userFeedbackDetail?.AllOptions?.Options?.map((item, index) => (
                <div className="parent-divfd">
                  <label htmlFor={item.OptionId}>{item.OptionName}</label>
                  <input type="checkbox" readOnly key={item.OptionId} checked={checkSelectedOption(item.OptionId)} />
                </div>
              ))}
              </>
              {userFeedbackDetail.Review && (
                <>
                  {" "}
                  <h2>Review</h2> <h5 style={{ wordBreak: "break-word" }}>{userFeedbackDetail?.Review}</h5>
                </>
              )}
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
};
export default FeedbackDetailScreen;