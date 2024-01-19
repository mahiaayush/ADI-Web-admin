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
    ADMIN_API_ENDPOINT_V2, CANCEL_SESSION_URL
  } from '../../store/constants';
import { getSessionLogs } from "src/store/actions/sessionLogsAction";
import moment from "moment";
import { CancelSessionAction } from "src/store/actions/CancelSessionAction";
import sessionsDetailAction from "src/store/actions/sessionsDetailAction";
  
  export default function CancelSessionPop({ cancelSessionPop, setCancelSessionPop, ScheduleId }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [errorCancel, setErrorCancel] = useState('');
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [initialLimit, setInitialLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [initialSearch, setInitialSearch] = useState("");
    
    const [activeTab, setActiveTab] = useState<number>(0);
    const isLimitChange = limit !== initialLimit;
    const isSearchChange = search !== initialSearch;
    const [dropOn, setDropOn] = useState(false);
    const [addDialog, setAddDialog] = useState<boolean>(false)

    const SubmitHandler = async () => {
      try {
        const res = await http.patch(
          `${ADMIN_API_ENDPOINT_V2}${CANCEL_SESSION_URL}`,
          {
            "ScheduleId": ScheduleId
        },
        );
        if (res.status) {
          if (res.data.status) {
          dispatch(sessionsDetailAction(ScheduleId))
          setCancelSessionPop(false)
          setErrorCancel('')
          } else {
            setErrorCancel(res.data.message)
          }
        }
      } catch (error) {
        console.log('error', error);
      }      
    }
    return (
      <>
        <Dialog open={cancelSessionPop} className="aprovelPop" onClose={() => setCancelSessionPop(false)}>
        <DialogTitle>Cancel Session</DialogTitle>
        <DialogContentText color="dimgrey">
             Are you sure, you want to cancel this session ?
               </DialogContentText>
          <DialogActions>
              {errorCancel !== "" && <span style={{ color: "red" }}>{errorCancel}</span>}
            <Button autoFocus onClick={() => setCancelSessionPop(false)}>
              Close
            </Button>
            <Button autoFocus onClick={SubmitHandler} variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }