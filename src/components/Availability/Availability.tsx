import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Box,
  Card,
  Tooltip,
    IconButton,
    Button,
    TableHead,
    Table,
    Divider,
    TableBody,
    CardHeader,
    TableRow,
    TableCell
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMemo, useState, useEffect } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { useDispatch, useSelector } from "src/store";
import GetGlobalAvailabilityAction from "src/store/actions/GetGlobalAvailabilityAction";
import AddCircleOutlineSharp from '@material-ui/icons/AddCircleOutlineSharp';
import { getLocalTime } from "src/utils/utility";

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
      background: "transparent",
      textDecoration: "none !important",
      textAlign: "left",
      fontSize: "14px",
      textTransform: "capitalize",
      padding: "0"
    }
  });

  interface UserObject {
    ScheduledOn: Date;
    CreatedOnDate: Date;
    BillId: string; 
    ScheduleId: number;
    VoidBillReason: string;
    OverrideId: Date;
  }

const Availability = () => {
    const [addDialog, setAddDialog] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const [scheduleId, setScheduleId] = useState<number>();
    const classes = useStyles();
    const dispatch = useDispatch();   
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [overrideID, setOverrideID] = useState(null);

    useEffect(() => {
        dispatch(GetGlobalAvailabilityAction())
    }, [])

    const globalAvailabilityListData = useSelector(
      state => state?.getGlobalAvailability?.getGlobalAvailabiliyResponse?.data?.data
    )
    // console.log(globalAvailabilityListData)
    return (
      <div>
        <Container className="userIndex">
          <Grid item xs={12} position="relative" className={classes.topheader}>
            <Typography color="textPrimary" variant="h5">
              Session Available
            </Typography>
          </Grid>
          <br />
          <Card>
            
          {globalAvailabilityListData && globalAvailabilityListData[0].length > 0 ? <CardHeader className="cardHeader" title="Available Sessions" /> : <CardHeader className="cardHeader" title="No Available Sessions" /> }
      
    <Divider />
      <Table>
      {globalAvailabilityListData && globalAvailabilityListData[0].length > 0 && <TableHead>
              <TableRow>
                <TableCell>
                Days
                </TableCell>
                <TableCell>
                 Start Time
                </TableCell>
                <TableCell>
                End Time
                </TableCell>
                </TableRow>
            </TableHead> }
       {globalAvailabilityListData && globalAvailabilityListData[0].length > 0 && globalAvailabilityListData[0].map((item, index) => (
         <TableBody>
         <TableRow>
           <TableCell>
             <Typography
               color="textPrimary"
               variant="subtitle2"
             >
              {item.Day}
             </Typography>
           </TableCell>
           <TableCell>
            {getLocalTime(item.StartTime)[1]}
           </TableCell>
           <TableCell>
             {getLocalTime(item.EndTime)[1]}
           </TableCell>
         </TableRow>
       </TableBody>
       ))} 
      </Table>
        <Divider />
      </Card>
        </Container>
      </div>
    );
}

export default Availability;