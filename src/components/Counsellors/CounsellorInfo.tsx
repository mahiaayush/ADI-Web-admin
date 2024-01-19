import { Grid, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "../../store";
import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import { counsellorsStats } from "src/store/actions/counsellorsStats";

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
    color: "#333",
    "& h2": {
      margin: "0",
    },
    "& p": {
      margin: "0",
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
});

const CounsellorInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(counsellorsStats());
  }, []);

  const CounsellorsStats = useSelector((state) => state.CounsellorsStats.counsellorsStats.list);

  return (
    <Grid className={classes.topcouns} container>
      <Grid className={classes.countMainBox} item xs={4}>
        <Box className={classes.tpcounox}>
          <h2>{CounsellorsStats.PathCount}</h2>
          <p>Pathway Career Success Coaches</p>
        </Box>
      </Grid>
      <Grid className={classes.countMainBox} item xs={4}>
        <Box className={classes.tpcounox}>
          <h2>{CounsellorsStats.PursCount}</h2>
          <p>Pursuit Career Success Coaches</p>
        </Box>
      </Grid>
      <Grid className={classes.countMainBox} item xs={4}>
        <Box className={classes.tpcounox}>
          <h2>{CounsellorsStats.IgniCount}</h2>
          <p>Ignitor Success Coaches</p>
        </Box>
      </Grid>
      {/* <Grid className={classes.countMainBox} item xs={2}>
        <Box className={classes.tpcounox}>
          <h2>154</h2>
          <p>Pending Applcations</p>
        </Box>
      </Grid>
      <Grid className={classes.countMainBox} item xs={2}>
        <Box className={classes.tpcounox}>
          <h2>554</h2>
          <p>In training</p>
          <p>Success Coaches</p>
        </Box>
      </Grid>
      <Grid className={classes.countMainBox} item xs={2}>
        <Box className={classes.tpcounox}>
          <h2>123</h2>
          <p>In training</p>
          <p>Success Coaches</p>
        </Box>
      </Grid>
      <Grid className={classes.countMainBox} item xs={2}>
        <Box className={classes.tpcounox}>
          <h2>97</h2>
          <p>In training</p>
          <p>Success Coaches</p>
        </Box>
      </Grid> */}
    </Grid>
  );
};

export default CounsellorInfo;
