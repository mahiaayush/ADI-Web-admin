import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import UpgradePayoutPopup from "./UpgradePayoutPopup";
// import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import { useState, useEffect } from "react";
import "../CounselloApplication/DetailScreen.css";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCounsellorOverview } from "../../store/actions/counsellorOverViewAction";
import { getCounsellorOverviewData } from "../../store/actions/CounsellorOverviewDataAction";
import Select from "react-select";
import { getLocalTime } from "src/utils/utility";
import UpdatePlanName from './UpdatePlanName';
import ChangeStatusCounsellor from './ChangeStatusCounsellor'
import ChangeCommercial from "./ChangeCommercial";
import UpdateEmailPopup from "./UpdateEmailPopup";
import counsellorPerformanceAction from "src/store/actions/counsellorPerformanceAction";

const useStyles = makeStyles({
  topBox: {
    width: "100%",
  },
  boxright: {
    width: "50%",
  },
  boxleft: {
    width: "50%",
  },
  parentClassDetail: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "0.1px solid lightgray",
    padding: "15px",
  },
  DetailPageCss: {
    margin: "0px",
  },
  btnClassAction: {
    transform: "rotate(90deg)",
    fontWeight: 900,
    border: "none",
    backgroundColor: "transparent",
    textAlign: "right",
    cursor: "pointer"
  }
});

const options = [
  { value: "Weekly", label: "Week" },
  { value: "Monthly", label: "Month" },
  { value: "Yearly", label: "Year" },
];

const CounsellorOverview = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const [filter, setFilter] = useState({ value: "Weekly", label: "Week" });
  const [openPopupReject, setOpenPopupReject] = useState(false);
  const [reasonPopup, setReasonPopup] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openCommercial, setOpenCommercial] = useState(false);
  const [emailChange, setEmailChange] = useState(false)

  // const handleClickEvent = () => {
  //   setOpenPopupReject(true)
  // }

  const handleClickStatus = () => {
    setOpenPopup(true)
  }

  const handleChangeEmail = () => {
    setEmailChange(true)
  }

  useEffect(() => {
    dispatch(counsellorPerformanceAction(id, filter.value))
  }, [filter])

  useEffect(() => {
    dispatch(getCounsellorOverview(id))
    dispatch(getCounsellorOverviewData(id))
  }, []);

  const getDashboardData = (type) => {
    setFilter(type);
  };

  const { counsellorOverview } = useSelector((state: any) => state);
  const getOverview = counsellorOverview?.counsellorDetails?.data;
  const performanceData = useSelector(
    (state: any) => state?.CounsellorPerformance?.counsellorPerformance?.data
  )
  const getOverviewData = useSelector((state: any) => state?.cousellorOverviewData?.cousellorOverviewResponse?.data)
  props.setCounsellorName(`${getOverview?.FirstName} ${getOverview?.LastName}`);
  return (
    <>
      {props.overview && Object.keys(getOverviewData).length !== 0 && Object.keys(performanceData).length !== 0 ? (
        <Grid
          sx={{ display: "flex", columnGap: 5, mt: 0 }}
          className={classes.topBox}
        >
          <Grid className={classes.boxright}>
            <Card>
              <div className={classes.parentClassDetail}>
                <Typography
                  color="textPrimary"
                  variant="h5"
                  sx={{ mb: 3, ml: 2 }}
                  className={classes.DetailPageCss}
                >
                  Details
                </Typography>
                {(Object.keys(getOverviewData).length > 0 && getOverviewData?.PayrollId !== "IH") && <Button className="buttonClassOverview changePayout" onClick={() => setOpenCommercial(true)} style={{ marginLeft: "auto" }}>
                  Upgrade Commercial
                </Button>}
                {/* <Button className="buttonClassOverview changePayout" onClick={handleClickStatus}>
                  {getOverview?.Status === "A" ? "Active" : getOverview?.Status === "I" ? "In-Active" : "Terminate"}
                </Button> */}
                {getOverview?.Type?.length > 0 ? <UpdatePlanName {...getOverview} /> : ""}
                {/* <Button className="buttonClassOverview changePayout" onClick={handleClickEvent}>
                  Change Payout Type
                </Button> */}
              </div>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="20px"
                      >
                        Business Status
                      </Typography>
                    </TableCell>
                    <TableCell> </TableCell>
                    {/* <TableCell>
                      <Typography>
                        {getOverview?.Type?.length > 0 ? <UpdatePlanName {...getOverview} /> : ""}
                      </Typography>
                    </TableCell> */}
                    <TableCell>{getOverviewData?.BusinessStatus}</TableCell>

                    <TableCell> </TableCell>{" "}
                  </TableRow>

                  {/* {getOverview?.Type?.length > 0 ? (
                    <TableRow>
                      <TableCell>
                        <Typography
                          color="black"
                          variant="subtitle2"
                          lineHeight="40px"
                        >
                          Type
                        </Typography>
                      </TableCell>
                      <TableCell>{" "}</TableCell>
                      <TableCell>
                        {getOverview?.Type[0]}, {getOverview?.Type[1]},{" "}
                        {getOverview?.Type[2]}
                      </TableCell>
                    </TableRow>
                  ) : (
                    " "
                  )} */}
                  {getOverview?.Type?.length > 0 ? (<TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Type
                      </Typography>
                    </TableCell>
                    <TableCell>{" "}</TableCell>
                    <TableCell>{getOverview.Type.map((item, index) => {
                      return (
                        <span>{item}{index < getOverview?.Type?.length - 1 ? "," : " "}</span>)
                    })}</TableCell>
                    <TableCell>{" "}</TableCell>
                  </TableRow>) : " "}
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >Payout Type</Typography>
                    </TableCell>
                    <TableCell>{" "}</TableCell>
                    <TableCell>{getOverviewData?.PayrollName}</TableCell>
                    <TableCell>{" "}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >Counsellor Type</Typography>
                    </TableCell>
                    <TableCell>{" "}</TableCell>
                    <TableCell>{getOverviewData?.CscSessionType}</TableCell>
                    <TableCell>{" "}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Name
                      </Typography>
                    </TableCell>
                    <TableCell> </TableCell>
                    <TableCell>
                      {getOverviewData?.FirstName} {getOverviewData?.LastName}{" "}
                    </TableCell>
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Email
                      </Typography>
                    </TableCell>
                    <TableCell> </TableCell>
                    <TableCell>{getOverviewData?.Email}</TableCell>
                    {/* <TableCell><MoreVertRoundedIcon onClick={handleChangeEmail} style={{ cursor: "pointer" }} /></TableCell> */}
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Phone
                      </Typography>
                    </TableCell>
                    <TableCell> </TableCell>
                    {
                      // @ts-ignore
                      <TableCell>{getOverviewData?.Phone}</TableCell>
                    }
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Address
                      </Typography>
                    </TableCell>
                    <TableCell> </TableCell>
                    <TableCell>{getOverviewData?.Address}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        On-Boarded Date
                      </Typography>
                    </TableCell>
                    <TableCell> </TableCell>
                    <TableCell>
                      {getOverviewData?.OnboardedDate && getLocalTime(getOverviewData.OnboardedDate)[9]}
                    </TableCell>
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell> </TableCell>
                    <TableCell>
                    {getOverviewData?.Status === "A" ? "Active" : getOverviewData?.Status === "I" ? "In-Active" : getOverviewData?.Status === "T" ? "Terminate" : getOverviewData?.Status}
                    </TableCell>
                    <TableCell><MoreVertRoundedIcon onClick={handleClickStatus} style={{ cursor: "pointer" }} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Application ID
                      </Typography>
                    </TableCell>
                    <TableCell> </TableCell>
                    <TableCell>{getOverviewData?.ApplicationId}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                  {/* <TableRow> */}
                </TableBody>
              </Table>
            </Card>
          </Grid>

          {/* {openPopupReject && <UpgradePayoutPopup openPopupReject={openPopupReject} setOpenPopupReject={setOpenPopupReject} payrollId={getOverview.PayrollId} ApplicationId={getOverview.ApplicationId} />} */}

          {openPopup && <ChangeStatusCounsellor openPopup={openPopup} setOpenPopup={setOpenPopup} Status={getOverviewData.Status} CounselorProfileId={getOverviewData.CounselorProfileId} sessionCount={getOverviewData?.ScheduledSession} />}

          {openCommercial && <ChangeCommercial openPopup={openCommercial} setOpenPopup={setOpenCommercial} ApplicationId={getOverviewData.ApplicationId} />} 

          {emailChange && <UpdateEmailPopup emailPop={emailChange} setEmailPop={setEmailChange} ApplicationId={getOverviewData.ApplicationId} Email={getOverviewData.Email} />}

          <Grid className={classes.boxleft}>
            <Card>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{ mb: 3, ml: 0 }}
                      >
                        Performance
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Grid item>
                        <Select
                          options={options}
                          onChange={(e) => getDashboardData(e)}
                          value={filter}
                          className="dropdownIcon"
                        />
                      </Grid>
                    </TableCell>
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="20px"
                      >
                        Total Students
                      </Typography>
                    </TableCell>
                    <TableCell>{performanceData?.TotalStudents}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Target Sessions
                      </Typography>
                    </TableCell>
                    <TableCell>{performanceData?.TargetedSession}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Total Availability Hours
                      </Typography>
                    </TableCell>
                    <TableCell>{performanceData?.TotalAvailabilityHour}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Completed Sessions
                      </Typography>
                    </TableCell>
                    <TableCell>{performanceData?.CompletedSession}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Scheduled Sessions
                      </Typography>
                    </TableCell>
                    <TableCell>{performanceData?.ScheduledSession}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Vacant Sessions
                      </Typography>
                    </TableCell>
                    <TableCell>{performanceData?.VacantSession}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Action Plan Filled / Session Report Filled
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {performanceData?.ActionPlanFilled} /{" "}
                      {performanceData?.IgnitorFilled}
                    </TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Action Plan Pending / Session Report Pending
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {performanceData?.ActionPlanPending} /{" "}
                      {performanceData?.IgnitorPending}
                    </TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Accelerator plan filled
                      </Typography>
                    </TableCell>
                    <TableCell>{performanceData?.CAPFilled}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Accelerator plan pending
                      </Typography>
                    </TableCell>
                    <TableCell>{performanceData?.CAPPending}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>
      ) : props.activeTab === 0 ? (
        <div className="loading">
        <CircularProgress />
      </div>
      ) : ("")}
    </>
  );
};

export default CounsellorOverview;
