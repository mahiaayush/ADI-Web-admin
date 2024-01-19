import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    NativeSelect,
  } from "@material-ui/core";
  import "../CounselloApplication/DetailScreen.css";
  import { useEffect, useState } from "react";
  import PayrollListAction from '../../store/actions/PayrollListAction'
  import http from "../../utils/http";
  import { useDispatch, useSelector } from "react-redux";
  import { useParams } from "react-router-dom";
  import { getCounsellorOverview } from "../../store/actions/counsellorOverViewAction";
  import {
    ADMIN_API_ENDPOINT_V2, POST_UPGRADE_PAYROLL
  } from '../../store/constants';
import { getSessionLogs } from "src/store/actions/sessionLogsAction";
import moment from "moment";
  
  export default function SessionsLogs({ sessionLogsPop, setSessionLogsPop, ScheduleId }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const { sessions } = useSelector((state) => state.sessionsList);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [initialLimit, setInitialLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [initialSearch, setInitialSearch] = useState("");
    
    const [activeTab, setActiveTab] = useState<number>(0);
    const isLimitChange = limit !== initialLimit;
    const isSearchChange = search !== initialSearch;
    // const isLastPage = page + 1 === Math.ceil(sessions.count / limit);
    const [dropOn, setDropOn] = useState(false);
    const [addDialog, setAddDialog] = useState<boolean>(false)

useEffect(() => {
    dispatch(getSessionLogs(ScheduleId))
}, [])

  const lstSessionLogs = useSelector(
    (state: any) => state?.sessionLogs?.sessionLogs?.list
  );

    return (
      <>
        <Dialog open={sessionLogsPop} className="aprovelPop" onClose={() => setSessionLogsPop(false)}>
        <DialogTitle>Session Logs</DialogTitle>
                        <table style={{ width: '100%' }} className="learnerListing">
                          {lstSessionLogs.length !== 0 ? <><tr>
                            <th>Room ID</th>
                            <th>Room Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration</th>
                          </tr> 
                          {lstSessionLogs.map(item => (
                          <tr>
                            <td>{item?.LogJson?.room_id}</td>
                            <td>{item?.LogJson?.room_name}</td>
                            <td>{moment(item?.LogJson?.start_time).format("LT")}</td>
                            <td>{moment(item?.LogJson?.end_time).format("LT")}</td>
                            <td>{(item?.SessionDuration).substring(0, 5)}</td>
                          </tr>))}</> : <tr>
                            <th>No records found</th>
                          </tr>}
                        </table>
  
          <DialogActions>
            <Button autoFocus onClick={() => setSessionLogsPop(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }