import { Grid, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { getLocalTime } from "../../utils/utility";
import { Star, StarBorder } from "@material-ui/icons";

const useStyles = makeStyles({
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
  mt0: {
    marginTop: "0px",
    marginBottom: "4px"
  },
  nextSessName: {
    marginTop: "4px",
    marginBottom: "4px"
  }
});

const SelectedCounsellor = ({ UserName, Students, NextSession, AverageRating }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.topcouns} container spacing={3}>
      <Grid className={classes.countMainBox} item xs={2}>
        <Box className={classes.tpcounox}>
          <h2>{Students}</h2>
          <p>Students</p>
          {/* <p>Success Coaches</p> */}
        </Box>
      </Grid>
      <Grid className={classes.countMainBox} item xs={2}>
        <Box className={classes.tpcounox}>
          {NextSession?.length > 0 ? (
            <>
              <h2>{getLocalTime(`${NextSession[0]}T${NextSession[2]}Z`)[1]}</h2>
              <h6 className={classes.mt0}>
                {getLocalTime(`${NextSession[0]}T${NextSession[2]}Z`)[0]}
              </h6>
              <h5 className={classes.nextSessName}>{UserName.includes("null") ? UserName.split(" ")[0] : UserName}</h5>
              <p className={classes.mt0}>Next Session</p>
            </>
          ) : (
            <><p>No Future Session Available.</p></>
          )}
        </Box>
      </Grid>
      <Grid className={classes.countMainBox} item xs={2}>
        <Box className={classes.tpcounox}>
          <h2>
            {/* {console.log("hello1234", AverageRating)}
              {AverageRating} */}
              {AverageRating === 0 ? "NA" : AverageRating}
          </h2>
          <p>Average Rating</p>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SelectedCounsellor;
