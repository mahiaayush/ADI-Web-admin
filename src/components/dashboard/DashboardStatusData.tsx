import {
    Grid,
    Box,
    Card,
    Container,
    Tabs,
    Tab,
    Button,
    Table,
    Breadcrumbs,
    Link,
    TextField,
    Divider,
    IconButton,
    CircularProgress,
    FormGroup,
    FormControlLabel,
    Checkbox,
    ListItem,
} from '@material-ui/core';
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect, useMemo, Fragment } from 'react';
import { useDispatch, useSelector } from '../../store';
import { getDashboardSessionList } from '../../store/actions/dashboardSessionListAction';
import { dashboardStatusData } from "../../store/actions/dashboardStatusDataAction";
import { PremiumUsersAction } from 'src/store/actions/ActiveUsersAction';
import { getOnBoardingStatus, getOnBoardingTrainingStatus, getOnBoardingRemainingStatus } from 'src/store/actions/OnBoardingAction';
import { getRunningSessions } from '../../store/actions/sessionListAction';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from '../common/dataTable/EnhancedTable';
import Select from 'react-select';
import LearnerDetailScreen from "./LearnerDetailScreen";
import { getLocalTime } from "src/utils/utility";
import UserSessionCount from "../users/UserSessionCount";
import "../entities/details/EntityCount.css";
import CounsellorPayrollGrpAction from "../../store/actions/counsellorPayrollGrpAction";
import CounsellorRatingAction from "../../store/actions/counsellorRatingAction";
import CounsellorSessionGrpAction from "../../store/actions/counsellorSessionGrpAction";
import { DateRangePicker, DateRange } from "@material-ui/lab";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import ItemMap from '../ItemMaster/ItemMap';
import moment from "moment";

const tabs = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'Scheduled',
        value: 'Scheduled'
    },
    {
        label: 'Cancelled',
        value: 'Cancelled'
    },
    {
        label: 'Completed',
        value: 'Completed'
    },
    {
        label: 'Not Completed',
        value: 'NotCompleted'
    },
    {
        label: 'No Show',
        value: 'NoShow'
    },
];

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
    spacing: {
        padding: "20px"
    }
});

interface UserObject {
    UserSid: string,
    FirstName: string,
    LastName: string,
    Id: number,
    TaskCompletedCount: number,
    TaskAssignedCount: number,
    CounselorHash: string,
    CounselorFirstName: string,
    CounselorLastName: string,
    SessionStatus: string,
    sessionSubStatus: string,
    ScheduleDate: string,
    SessionStartTime: Date;
}

const DashboardStatusData = () => {
const dispatch = useDispatch();    
const { dashboardlearners } = useSelector(state => state.dashboardSessionList);
const { dashboardStatusData: dataResponse } = useSelector(state => state);
const finalData = dataResponse?.dashboardStatusDataResponse?.data;
const [page, setPage] = useState(1)
const [limit, setLimit] = useState(10)
const [status, setStatus] = useState(null)
const [isLoading, setIsLoading] = useState(false)
const [isLoading2, setIsLoading2] = useState(false)
const [isLoading3, setIsLoading3] = useState(false)
const [isLoading4, setIsLoading4] = useState(false)
const [learnerDetailScreen, setLearnerDetailScreen] = useState(false)
const [initialLimit, setInitialLimit] = useState(10)
const [search, setSearch] = useState('')
const [initialSearch, setInitialSearch] = useState('');
const [filter, setFilter] = useState({ value: 'Day', label: 'Day' })

const [countActive, setCountActive] = useState([]);
const [onboardActive, setOnboardActive] = useState([]);
const [activeTab, setActiveTab] = useState<number>(0);
const isLimitChange = limit !== initialLimit
const isSearchChange = search !== initialSearch
const isLastPage = page + 1 === Math.ceil(dashboardlearners.count / limit);
const [learnerID, setLearnerID] = useState(null);
const [counsellorHash, setCounsellorHash] = useState(null);
const [newest, setNewest] = useState("Newest");
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

const tabHandler = (status, id: number) => {
    setActiveTab(id);
    (status === "all") ? setStatus(null) : setStatus(status);
    if (status === "all") {
        dispatch(getDashboardSessionList("1", limit, null, null, newest))
        setLearnerDetailScreen(false)
    } else {
        dispatch(getDashboardSessionList("1", limit, status, search, newest))
        setLearnerDetailScreen(false)
    }
}
useEffect(() => {
    dispatch(CounsellorSessionGrpAction(startDate, endDate));
}, [startDate, endDate]);

useEffect(() => {
    // setIsLoading(true)
    // dispatch(getDashboardSessionList(page + 1, limit, status, search, newest))
    //     .then(() => setIsLoading(false))
    if (isLimitChange) setInitialLimit(limit);
    if (isSearchChange) setInitialSearch(search);
}, [page, limit, status, search, newest]);

useEffect(() => {
    dispatch(dashboardStatusData(filter.value))
  }, [filter]);

const getDashboardData = (type) => {
    setFilter(type)
  }

const handleGetEntity = () => {
    dispatch(dashboardStatusData())
  }
  useEffect(() => {
    setIsLoading(true);
    setIsLoading2(true);
    setIsLoading3(true);
    setIsLoading4(true);
    handleGetEntity()
    dispatch(PremiumUsersAction()).then(() => setIsLoading(false))
    dispatch(getOnBoardingStatus()).then(() => setIsLoading2(false))
    dispatch(getOnBoardingTrainingStatus()).then(() => setIsLoading3(false))
    dispatch(getOnBoardingRemainingStatus()).then(() => setIsLoading4(false))
    dispatch(getRunningSessions())
    dispatch(CounsellorPayrollGrpAction("A"))
    dispatch(CounsellorRatingAction())
  }, []);

  const premiumCountData = useSelector(
    state => state?.ActiveUsers?.premiumUsersResponse?.data?.PremiumUsers
  )
  const onBoardingData = useSelector(
    (state) => state?.dashboardStatusData?.onBoardingStatusResponse?.data || {}
  )
  const onBoardingTrainingData = useSelector(
    (state) => state?.dashboardStatusData?.onBoardingTrainingStatusResponse?.data || {}
  )
  const onBoardingRemainingData = useSelector(
    (state) => state?.dashboardStatusData?.onBoardingRemainingStatusResponse?.data || {}
  )
  const runningSessionsData = useSelector(
    state => state?.sessionsList?.runningSessions
  )
  const counsellorPayrollGrpData = useSelector(
    state => state?.CounsellorPayrollGrp?.counsellorPayrollGrpResponse?.data
  )
  const counsellorRatingData = useSelector(
    state => state?.CounsellorRating?.CounsellorRatingResponse
  )
  const counsellorSessionGrpData = useSelector(
    state => state?.CounsellorSessionGrp?.CounsellorSessionGrpResponse?.data
  )

  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  // console.log('session grp', counsellorSessionGrpData)
  // console.log('payroll', counsellorPayrollGrpData)
  // console.log('rating', counsellorRatingData)

  const onBoardLabels = {
    Applications: 'Applications',
    Screening: 'Screening',
    Interviews: 'Interviews',
    Documents: 'Documents',
    TandC: 'T&C',
    Commercials: 'Commercials',
    Training: 'Training',
    Assessments: 'Assessments',
    Mock: 'Mock',
    Profile: 'Profile',
    Availability: 'Availability',
    OnboardedCounselorCount: 'OnBoarded'
  }

  const onBoardList = Object.entries(onBoardingData).map(([key, value]) => ({
    id: key, value, label: onBoardLabels[key] ? onBoardLabels[key] : key
  }));
  const onBoardList1 = Object.entries(onBoardingTrainingData).map(([key, value]) => ({
    id: key, value, label: onBoardLabels[key] ? onBoardLabels[key] : key
  }));
  const onBoardList2 = Object.entries(onBoardingRemainingData).map(([key, value]) => ({
    id: key, value, label: onBoardLabels[key] ? onBoardLabels[key] : key
  }));
  const totalCount = onBoardList.reduce((prev, curr: any) => prev + curr.value, 0) + onBoardList1.reduce((prev, curr: any) => prev + curr.value, 0) + onBoardList2.reduce((prev, curr: any) => prev + curr.value, 0);
  const selectedCount = onboardActive.length
    ? onBoardList.reduce((prev, curr: any) => (onboardActive.includes(curr.id) ? prev + curr.value : prev), 0) + onBoardList1.reduce((prev, curr: any) => (onboardActive.includes(curr.id) ? prev + curr.value : prev), 0) + onBoardList2.reduce((prev, curr: any) => (onboardActive.includes(curr.id) ? prev + curr.value : prev), 0)
    : totalCount;

  const onboardHandler = (e, id) => {
    const { checked } = e.target;
    if (checked) {
      setOnboardActive((prev) => [...prev, id])
    } else {
      setOnboardActive((prev) => prev.filter((item) => item !== id))
    }
  }

const clickHandler = (id, cHash) => {
    setLearnerDetailScreen(true);
    setLearnerID(id);
    setCounsellorHash(cHash);
};
const ViewLink = (row: UserObject) => {
    return (<Button
        style={{
            border: "1px solid blue",
            backgroundColor: "#FFFFFF",
            fontSize: "14px",
            textDecoration: 'none'
        }}
        size="small"
        type="button"
        variant="outlined"
        color="primary"
        onClick={() => clickHandler(row?.Id, row?.CounselorHash)}
    >View</Button>)
}

const FullName = (row: UserObject) => {
    return (<div><span>{row.FirstName} {row.LastName}</span></div>)
}

const TaskCount = (row: UserObject) => {
    return (<div><span>{row.TaskCompletedCount}/{row.TaskAssignedCount}</span></div>)
}

const CounsellorFullName = (row: UserObject) => {
    return (<div><span>{row.CounselorFirstName} {row.CounselorLastName}</span></div>)
}

const CounsellorStatus = (row: UserObject) => {  
    // return (<div><span>{row.SessionStatus === "NOT_COMPLETED" ? "NOT COMPLETED" : row.SessionStatus === "NO_SHOW" ? "NO SHOW" : row.SessionStatus}</span></div>)
    return (<div><span>{(row.sessionSubStatus === "COMPLETED" || row.sessionSubStatus === "NOT_COMPLETED" || row.sessionSubStatus === "NO_SHOW") ? row.sessionSubStatus : row.SessionStatus }</span></div>)
}
const ScheduleDate = (row: UserObject) => {
    return (<div><span>{row.ScheduleDate.substring(0, 10)}</span></div>)
}
const SessionStartTime = (row: UserObject) => {
    return (
        getLocalTime(row.SessionStartTime)[1] !== 'Invalid date' ? getLocalTime(row.SessionStartTime)[1] : ""
      );
};

const ScheduledArray = [];
const CanceledArray = [];

for (let i = 0; i <= counsellorSessionGrpData?.length; i++) {
  if (counsellorSessionGrpData[i]?.STATUS === "SCHEDULED") {
    ScheduledArray.push(counsellorSessionGrpData[i])
  } else if (counsellorSessionGrpData[i]?.STATUS === "CANCELED") {
    CanceledArray.push(counsellorSessionGrpData[i])
  }
}

const columns = useMemo(
    () => [
        {
            Header: 'Name',
            id: 'name',
            accessor: FullName,
        },
        {
            Header: 'Plan',
            accessor: 'PlanName',
        },
        {
            Header: 'Counsellor Name',
            accessor: CounsellorFullName,
        },
        {
            Header: 'Status',
            accessor: CounsellorStatus,
        },
        {
            Header: 'Scheduled Date',
            accessor: ScheduleDate,
        },
        {
            Header: 'Session Start Time',
            accessor: SessionStartTime,
        },
        {
            Header: 'Task',
            id: 'task',
            accessor: TaskCount,
        },
        {
            Header: 'Actions',
            id: ' ',
            accessor: ViewLink,
        },
    ],
    []
)

const handleDateSelect = (val) => {
  setValue(val);
  setStartDate(val[0] ? moment(val[0]).format("YYYY-MM-DD") : null);
  setEndDate(val[1] ? moment(val[1]).format("YYYY-MM-DD") : null);
};
const options = [
    { value: 'Day', label: 'Day' },
    { value: 'Week', label: 'Week' },
    { value: 'Month', label: 'Month' },
    { value: 'Year', label: 'Year' }
  ]

const classes = useStyles();
let propsLearners;

return (<Box sx={{
    backgroundColor: 'background.default',
    minHeight: '100%',
    py: 2
}}
>

    <Container>
    
        <Grid
            container
            justifyContent="space-between"
            spacing={3}
        >
            <Grid item>
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                   Counselling Dashboard 
                </Typography>
            </Grid>
        </Grid>
          <Grid container spacing={3} sx={{ mt: 0.5, mb: 3 }}>
            <Grid item sm={3}>
              <Grid item sx={{ height: '100%' }}>
                <Grid item sm={12} sx={{ height: '45%', mb: 3 }}>
                        <Card sx={{ height: '100%' }}>
                          <Box
                            sx={{
                              alignItems: 'center',
                              margin: 'auto',
                              display: 'flex',
                              justifyContent: 'space-between',
                              p: 3
                            }}
                          >
                            <div>
                              <Typography
                                color="textPrimary"
                                variant="subtitle2"
                              >
                              Running Now
                              </Typography>
                              <Typography
                                color="textPrimary"
                                sx={{ mt: 1 }}
                                variant="h4"
                              >
                                {runningSessionsData?.data?.length}
                              </Typography>
                            </div>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item sm={12} sx={{ height: '45%' }}>
                        <Card sx={{ height: '100%' }}>
                          <Box
                            sx={{
                              alignItems: 'center',
                              margin: 'auto',
                              display: 'flex',
                              justifyContent: 'space-between',
                              p: 3
                            }}
                          >
                            <div>
                              <Typography
                                color="textPrimary"
                                variant="subtitle2"
                              >
                               Rating
                              </Typography>
                              <Typography
                                color="textPrimary"
                                sx={{ mt: 1 }}
                                variant="h4"
                              >
                                {counsellorRatingData?.data?.rating === null ? 0
                                  : counsellorRatingData?.data?.rating}
                              </Typography>
                            </div>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={9} sx={{ height: "100%" }}>
                    <Table className="learnerListing" sx={{ height: "100%" }}>
                      <table style={{ width: '100%' }}>
                        <tr>
                          <th>Counsellors</th>
                          <th>Counts</th>
                        </tr>
                        {counsellorPayrollGrpData?.length > 0 ? counsellorPayrollGrpData.map((item) => 
                          (<tr key={item.PAYROLL_ID}>
                            <td>{item.PAYROLL_ID}</td>
                            <td>{ item.PAYROLL_COUNT }</td>
                          </tr>)) : Array(5).fill(null).map((_, idx) => {
                          const key = idx;
                            return <tr key={key}>
                              <td>&nbsp;</td>
                              <td>&nbsp;</td>
                            </tr>
                          })}
                      </table>
                    </Table>
                  </Grid>
          </Grid>

          <Card style={{ marginBottom: "2%" }}>
          <div style={{ marginRight: "10px", padding: "10px", display: "flex", justifyContent: "space-between" }}>
            <Typography
              color="textPrimary"
              variant="h5"
              style={{ marginBottom: "1%", marginLeft: "2%", marginTop: "1%" }}
            >
              Premium Users
            </Typography>
          </div>
          <Divider />
          {isLoading && !premiumCountData?.length ? (
            <div className="loading">
              <CircularProgress />
            </div>
          ) : (!!premiumCountData?.length && <Table className="learnerListing premiumUserCount">
            <table style={{ width: '100%' }}>
              <tr>
                <td>&nbsp;</td>
                {!!premiumCountData?.[0] && premiumCountData[0].monthlyData.map((item) => {
                  return <th key={item.month}>
                    <div>{item.month}</div>
                    <div>{item.year}</div>
                  </th>
                })}
              </tr>

              {!!premiumCountData?.length && premiumCountData.map((item) => (
                <Fragment key={item.planId}>
                  <tr>
                    <th>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {item.planId}
                        {countActive.includes(item.planId) ? (
                        <IconButton
                          size="small"
                          onClick={() => setCountActive((prev) => prev.filter((value) => value !== item.planId))}
                        >
                          <IndeterminateCheckBoxOutlinedIcon />
                        </IconButton>
                        ) : (
                        <IconButton
                          size="small"
                          onClick={() => setCountActive((prev) => [...prev, item.planId])}
                        >
                          <AddBoxOutlinedIcon />
                        </IconButton>)}
                      </div>
                    </th>
                    
                    {item.monthlyData.map((data, idx) => <td key={data.month}>
                      <div>{data.totalSubscribers}</div>
                      <div>
                        {idx === 0 ? '(+0)' : `(+${item.monthlyData[idx].newSubscribers})`}
                      </div>
                    </td>)}
                  </tr>
                  {countActive.includes(item.planId) && (
                    <tr className="expandRow">
                      <td className="rowHead">
                        <div>
                          <p>Active</p>
                          <p>Expired</p>
                          <p>&nbsp;</p>
                          <p>Total Sessions</p>
                          <p>Completed Sessions</p>
                        </div>
                      </td>

                      {item.monthlyData.map((data) => <td key={data.month}>
                        <div>
                          <p>{data.activeUsers}</p>
                          <p>{data.inactiveUsers}</p>
                          <p>&nbsp;</p>
                          <p>{data.totalSessions}</p>
                          <p>{data.completedSessions}</p>
                        </div>
                      </td>)}
                    </tr>)}
                </Fragment>))}
            </table>
          </Table>)}
        </Card>

        {/* <Grid container spacing={3} sx={{ mb: "2%" }}>
          <Grid item sm={6}>
            <Card>
              <div style={{ marginRight: "10px", padding: "10px", display: "flex", justifyContent: "space-between" }}>
                <Typography
                  color="textPrimary"
                  variant="h5"
                  style={{ marginBottom: "1%", marginLeft: "2%", marginTop: "1%" }}
                >
                  On Boarding Status
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="h5"
                  style={{ marginBottom: "1%", marginLeft: "2%", marginTop: "1%" }}
                >
                  {`${selectedCount}/${totalCount}`}
                </Typography>
              </div>
              <Divider />
              {(isLoading2 || isLoading4 || !onBoardList?.length || !onBoardList2?.length) ? (
                <div className="loading">
                  <CircularProgress />
                </div>
              ) : (
                <FormGroup>
                  {onBoardList && onBoardList?.length && onBoardList?.map((item) => item.label === "OnBoarded" && <ListItem sx={{ display: 'flex', justifyContent: 'space-between', py: 0 }}>
                      <div>
                        <FormControlLabel control={<Checkbox onChange={(e) => onboardHandler(e, item.id)} />} label={item.label} />
                      </div>
                      <div>
                        {item.value}
                      </div>
                    </ListItem>)}
                    {onBoardList && onBoardList?.length && onBoardList?.map((item) => item.label !== "OnBoarded" && <ListItem sx={{ display: 'flex', justifyContent: 'space-between', py: 0 }}>
                      <div>
                        <FormControlLabel control={<Checkbox onChange={(e) => onboardHandler(e, item.id)} />} label={item.label} />
                      </div>
                      <div>
                        {item.value}
                      </div>
                    </ListItem>)}
                    {(!isLoading3 && onBoardList1 && onBoardList1?.length) ? onBoardList1?.map((item) => 
                    <ListItem sx={{ display: 'flex', justifyContent: 'space-between', py: 0 }}>
                      <div>
                        <FormControlLabel control={<Checkbox onChange={(e) => onboardHandler(e, item.id)} />} label={item.label} />
                      </div>
                      <div>
                        {item.value}
                      </div>
                    </ListItem>) : <ListItem sx={{ display: 'flex', justifyContent: 'space-between', py: 0 }}>
                      <div>
                        <FormControlLabel control={<Checkbox />} label="Training" />
                      </div>
                      <div>
                      <CircularProgress size="1rem" />
                      </div>
                    </ListItem>}
                    {onBoardList2 && onBoardList2?.length && onBoardList2?.map((item) => 
                    <ListItem sx={{ display: 'flex', justifyContent: 'space-between', py: 0 }}>
                      <div>
                        <FormControlLabel control={<Checkbox onChange={(e) => onboardHandler(e, item.id)} />} label={item.label} />
                      </div>
                      <div>
                        {item.value}
                      </div>
                    </ListItem>)}
                </FormGroup>
              )}
            </Card>
          </Grid>
        </Grid> */}

        <Card style={{ marginBottom: "2%" }}>
          <div style={{ marginRight: "10px", padding: "10px", display: "flex", justifyContent: "space-between" }}>
            <Typography
              color="textPrimary"
              variant="h5"
              style={{ marginBottom: "1%", marginLeft: "2%", marginTop: "1%" }}
            >
              Session Status
            </Typography>
            <DateRangePicker
              startText="Start"
              endText="End"
              value={value}
              onChange={(newValue) => {
                handleDateSelect(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} helperText="" size="small" />
                  <Box sx={{ mx: 1 }}> to </Box>
                  <TextField {...endProps} helperText="" size="small" />
                </>
              )}
            />
          </div>
          <Divider />
          <Table className="learnerListing sessionStatusGroup">
        {counsellorSessionGrpData?.length !== 0 && <table style={{ width: '100%' }}>
          <tr>
          <th>Scheduled</th>
          {ScheduledArray?.map((item, index) => {
            return (
              <td className="progTitle">{`${item?.SUB_STATUS === null ? "Scheduled" : item?.SUB_STATUS}: ${item?.STATUS_COUNT}`}</td>
            )
          })}
          </tr>
          <tr>
          <th>Cancelled</th>
          {CanceledArray?.map((item, index) => {
            return (
              <td className="progTitle">{`${item?.SUB_STATUS}: ${item?.STATUS_COUNT}`}</td>
            )
          })}
          </tr>
</table>}
</Table>
        </Card>

        <Box sx={{ mt: 3 }}>
            {/* <Table className="learnerListing">
        <table style={{ width: '100%' }}>
  <tr>
    <th>Package</th>
    <th>Scheduled Session</th>
    <th>Cancelled Session</th>
    <th>Completed Session</th>
    <th>Unattended Session</th>
  </tr>
  <tr>
    <td>Ignitor</td>
    <td>{ finalData?.ignitorscheduled }</td>
    <td>{ finalData?.ignitorcancelled }</td>
    <td>{ finalData?.ignitorcompleted }</td>
    <td>{ finalData?.ignitorunattended }</td>
  </tr>
  <tr>
    <td>Pathway</td>
    <td>{ finalData?.pathwayscheduled }</td>
    <td>{ finalData?.pathwaycancelled }</td>
    <td>{ finalData?.pathwaycompleted }</td>
    <td>{ finalData?.pathwayunattended }</td>
  </tr>
  <tr>
    <td>Pursuit</td>
    <td>{ finalData?.pursuitscheduled }</td>
    <td>{ finalData?.pursuitcancelled }</td>
    <td>{ finalData?.pursuitcompleted }</td>
    <td>{ finalData?.pursuitunattended }</td>
  </tr>
</table>
</Table> */}
<UserSessionCount /> 
        {/* <Grid item xs={12} sx={{ mb: 2 }} className={classes.tablebackground}>
        {learnerDetailScreen === false ? <>
            <Tabs className={classes.tableTab} indicatorColor="primary" scrollButtons="auto" textColor="primary" value={tabs[activeTab].value} variant="scrollable">
                {tabs.map((tab, ind) => (
                    <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                        className={activeTab === ind ? classes.active : classes.tabbing}
                        onClick={() => tabHandler(tab.value, ind)}
                    />
                ))}
            </Tabs>
            <Grid item className="counsellorApplicationListTable">
                <CssBaseline />
                <EnhancedTable
                    columns={columns}
                    data={dashboardlearners.list}
                    totalCount={dashboardlearners.count}
                    limit={limit}
                    setLimit={setLimit}
                    currentPage={page}
                    setPage={setPage}
                    isLoading={isLoading}
                    manualPagination={true}
                    search={search}
                    setSearch={setSearch}
                    manualGlobalFilter={true}
                    // singleStep={true}
                    dashboardSelect={true}
                    setNewest={setNewest}
                    newest={newest}
                />
            </Grid></> : <LearnerDetailScreen learnerId={learnerID} learnerDetailScreen={learnerDetailScreen} setLearnerDetailScreen={setLearnerDetailScreen} />}
        </Grid> */}
        </Box>
    </Container>
</Box>)
};

export default DashboardStatusData;