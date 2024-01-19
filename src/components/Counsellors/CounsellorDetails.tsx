import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Button,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "../../store";
import { makeStyles } from "@material-ui/core/styles";
import SelectedCounsellor from "./SelectedCounsellor";
/* import CounsellorOverview from './CounsellorOverview';
import ProfileTab from "./ProfileTab"; */
import TabScreen from "./Tabscreen";
import { selectedCounsellorStats } from "../../store/actions/SelectedCounsellorListAction";

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
});

interface UserObject {
  UserSid: string;
  Name: string;
}

const CounsellorDetails = ({ newUsers = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(selectedCounsellorStats(id));
  }, []);
  const CounsellorDetails = useSelector(
    (state) => state?.CounsellorStats?.counsellorStats?.list
  );
  const [counsellorName, setCounsellorName] = useState(null);
  localStorage.setItem('currentCounsellorUserSid', id);
  const classes = useStyles();
  return (
    <div>
      <Container className="userIndex">
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
            Counsellors - {CounsellorDetails?.CounselorName}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link
              color="textPrimary"
              component={RouterLink}
              to="/counsellors"
              variant="subtitle2"
            >
              Counsellors
            </Link>
            <Typography color="textSecondary" variant="subtitle2">
              Counsellors Details
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              {CounsellorDetails?.CounselorName}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <SelectedCounsellor
          UserName={
            CounsellorDetails?.UserName !== "-"
              ? CounsellorDetails?.UserName
              : ""
          }
          Students={
            CounsellorDetails?.Students !== "-"
              ? CounsellorDetails?.Students
              : ""
          }
          NextSession={
            CounsellorDetails?.NextSession !== "-"
              ? CounsellorDetails?.NextSession?.split(" ")
              : ""
          }
          AverageRating={CounsellorDetails?.AverageRating}
        />
        <TabScreen setCounsellorName={setCounsellorName} />
        {/* <CounsellorOverview />  
                <ProfileTab /> */}
      </Container>
    </div>
  );
};
export default CounsellorDetails;
