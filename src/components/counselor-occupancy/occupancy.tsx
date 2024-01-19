import {
    Grid,
    Box,
    Container,
    Link,
    Button,
    Breadcrumbs,
    Dialog,
    DialogTitle,
    DialogActions,
    TextField
} from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../store';
import { counsellorOccupancyList } from '../../store/actions/counsellorOccupancyAction';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import { getLocalTime } from "src/utils/utility";
import CounsellorOccupancyCount from "./counsellorOccupancyCount";
import moment from "moment";
import { DatePicker } from "@material-ui/lab";

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
    CounselorHash: string
}

const Occupancy = () => {
const dispatch = useDispatch(); 
const occupancyLst = useSelector(state => state?.counsellorOccupancyList?.counsellorOccupancy?.list?.data);
const occupancyLstCount = useSelector(state => state?.counsellorOccupancyList?.counsellorOccupancy?.list);

const [isLoading, setIsLoading] = useState(false)
const [learnerDetailScreen, setLearnerDetailScreen] = useState(false)

const [startDate, setStartDate] = useState(new Date());
const [addDialog, setAddDialog] = useState<boolean>(false);
const [popupStartTime, setPopupStartTime] = useState();
const currDate = moment(startDate).format('YYYY-MM-DD');
useEffect(() => {
    setIsLoading(true)
    dispatch(counsellorOccupancyList(currDate))
        .then(() => setIsLoading(false))
}, [currDate]);

const clickHandler = (id, cHash) => {
    setLearnerDetailScreen(true);
};

const setDialogClose = (dat) => {
    dispatch(counsellorOccupancyList(dat))
        .then(() => setIsLoading(false));
    setAddDialog(false);
};

const getTimeWiseData = (time) => {
    setPopupStartTime(time);
    setAddDialog(true);
}

const tim = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
const classes = useStyles();

const ScheduleDate = occupancyLst?.[0]?.ScheduleDate?.split("T")[0];

const checkValue = (val) => {
    let data = []
    if (occupancyLst) {
         data = occupancyLst.filter(item => 
            getLocalTime(`${ScheduleDate} ${item?.StartTime}`)[5].includes(val))
        }
        return data;
}

return (<div>
    <Container className="userIndex">
        <Grid item xs={12} position="relative" className={classes.topheader}>
            <Typography
                color="textPrimary"
                variant="h5"
            >
                Counsellor Occupancy
            </Typography>
        </Grid>
        <Box sx={{ mt: 3 }}>
        <Box sx={{ mt: 3 }} style={{ display: "flex", flexDirection: "row", float: "left" }}>
            <div className="import_export_div">
                <DatePicker inputFormat="dd-MM-yyyy" onChange={(date) => setStartDate(date)} value={startDate} renderInput={(params) => <TextField {...params} helperText="" />} />
            </div>
        </Box>
        <Box sx={{ mt: 3 }} style={{ display: "flex", flexDirection: "row", float: "right" }}>
            <div className="import_export_div">
                <span className="scheduled">Scheduled</span>
                <span className="completed">Completed</span>
                <span className="notCompletedNoShow">Not Completed / No Show</span>
                <span className="cancelledByLMC">Cancelled</span>
            </div>
        </Box>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    container
                    spacing={3}
                    style={{ display: "flex", flexDirection: "row", margin: "4%" }}
                >
                    <CounsellorOccupancyCount lstEntity={occupancyLstCount} />
                </Grid>
                <Grid
                item
                md={12}
                xl={12}
                xs={12}
                >
                    <Grid
                        item
                        xs={12}
                        className="headerBoxes"
                    >
                        <div className="calendarMainDiv">
                            <ul>
                            {tim.map(tm => (
                                <li><span>{`${tm}`} - {moment(tm, "HH:mm").add(1, 'hours').format("HH:mm")}</span>
                                    <section className="calendarInnerDiv">
                                        {occupancyLst && occupancyLst.map(item => (
                                            <>
                                            {getLocalTime(`${ScheduleDate} ${item?.StartTime}`)[5].includes(tm) && <aside className={(item?.SessionStatus === "SCHEDULED" && (item?.SessionSubStatus === null || item?.SessionSubStatus === "" || item?.SessionSubStatus === "REASSIGNED BY LMC")) ? "scheduled" : (item?.SessionStatus === "SCHEDULED" && item?.SessionSubStatus === "COMPLETED") ? "completed" : (item?.SessionStatus === "SCHEDULED" && item?.SessionSubStatus === "NOT_COMPLETED") ? "notCompletedNoShow" : (item?.SessionStatus === "SCHEDULED" && item?.SessionSubStatus === "NO_SHOW") ? "notCompletedNoShow" : "cancelledByLMC"}>
                                                Counsellor Name: {item?.CounselorName}<br /> Learner Name: {item?.LearnerName} <br /> Session Title: {item?.AgendaTitle}<br /> Plan Name: {item?.ZohoPlanName}<br /> Status: {item?.SessionSubStatus !== null ? item?.SessionSubStatus : item?.SessionStatus}<br /> {item?.EntityTypeId !== "PC" && <div style={{ width: "100%" }}>{`Entity Name: ${item?.EntityName}`}</div>} {item?.AllocationStatus !== null && `Allocation Type: ${item?.AllocationStatus === "F" ? "Forcefully" : "Automatic"}`}
                                            </aside> }
                                            </>
                                        ))}
                                    </section>
                                    {checkValue(tm).length > 3 && <section><AddCircleOutlineIcon onClick={() => getTimeWiseData(`${tm}`)} color="primary" fontSize="large" style={{ cursor: "pointer" }} /></section>}
                                </li>
                            ))}
                            </ul>
                        </div>
                    </Grid>
                </Grid>
                {addDialog && <><Dialog open={addDialog} onClose={() => setAddDialog(false)} className="aprovelPop rightSideFloatingBar">
                    <DialogTitle>Sessions</DialogTitle>
                        {occupancyLst.map(item => (
                            <>
                            {getLocalTime(`${ScheduleDate} ${item?.StartTime}`)[5].includes(popupStartTime) ? <aside className={(item?.SessionStatus === "SCHEDULED" && (item?.SessionSubStatus === null || item?.SessionSubStatus === "" || item?.SessionSubStatus === "REASSIGNED BY LMC")) ? "scheduled" : (item?.SessionStatus === "SCHEDULED" && item?.SessionSubStatus === "COMPLETED") ? "completed" : (item?.SessionStatus === "SCHEDULED" && item?.SessionSubStatus === "NOT_COMPLETED") ? "notCompletedNoShow" : (item?.SessionStatus === "SCHEDULED" && item?.SessionSubStatus === "NO_SHOW") ? "notCompletedNoShow" : "cancelledByLMC"}>
                                Counsellor Name: {item?.CounselorName}<br /> Learner Name: {item?.LearnerName} <br /> Session Title: {item?.AgendaTitle}<br /> Plan Name: {item?.ZohoPlanName}<br /> Status: {item?.SessionSubStatus !== null ? item?.SessionSubStatus : item?.SessionStatus}<br /> {item?.EntityTypeId !== "PC" && <div style={{ width: "100%" }}>{`Entity Name: ${item?.EntityName}`}</div>} {item?.AllocationStatus !== null && `Allocation Type: ${item?.AllocationStatus === "F" ? "Forcefully" : "Automatic"}`}
                            </aside> : "" }
                            </>
                        ))}
                        <DialogActions>
                            <Button onClick={() => setDialogClose(moment(startDate).format('YYYY-MM-DD'))} variant="contained">Close</Button>
                        </DialogActions>
                    </Dialog></>}
            </Grid>
        </Box>
    </Container>
</div>)
};

export default Occupancy;