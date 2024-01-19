import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContentText,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Switch
} from "@material-ui/core";
import http from "../../utils/http";
import { ADMIN_UPDATE_ICSC_STATUS, ADMIN_API_ENDPOINT_V2 } from "src/store/constants"
import { rejectAction } from "src/store/actions/DetailScreenAction";
import { useParams } from "react-router"; 
import { DetailAction } from "src/store/actions/DetailAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  changeDocumentStatus,
  getDocListing,
} from "src/store/actions/OnBoardingAction";

const useStyles = makeStyles({
 spinnerClassDocuments: {
   marginTop: "150px",
   marginLeft: "50px",
   minHeight: "50vh",
   minWidth: "400px"
 },
 spinnerClassSingleDoc: {
   marginLeft: "50px",
   minHeight: "10vh",
   minWidth: "400px",
   marginTop: "50px"
 }
});

const DocumentList = (props) => {
  const [rejected, setRejected] = useState(false);
  const [value, setValue] = useState('');
  const [rejectAll, setRejectAll] = useState(false)
  const [rejectDocumentFeedback, setRejectDocumentFeedback] = useState("");
  const [loading, setLoading] = useState(true)
  const [docId, setDocId] = useState(null);
  const [switchOn, setSwitchOn] = useState(false)
  const [switchDisable, setSwitchDisable] = useState(false);
  const handleClose = () => {
    props.setShowDocList(false);
  };
  const handleRejectedClose = () => {
    setRejected(false);
    setRejectDocumentFeedback("");
    setRejectAll(false)
    setValue('');
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();
  const docList = useSelector(
    (state: any) => state.docList.docListResponse.data
  );

  useEffect(() => {
    dispatch(getDocListing(props.id));
  }, []);

  const handleAccept = (value) => {
    const data = {
      DocumentId: value,
      DocumentStatus: "APPROVED",
    };
    dispatch(changeDocumentStatus(props.id, data));
    setTimeout(() => {  
      setLoading(true);
      dispatch(getDocListing(props.id));
    }, 3000);
    setLoading(false)
  };

  const handleReject = (val) => {
    setRejected(true);
    setDocId(val);
  };

  const handleChange = (e) => {
    setRejectDocumentFeedback(e.target.value);
  };

  const handleRejectAllChange = (e) => {
    setValue(e.target.value)
  }

  const rejectDoc = () => {
    const data = {
      DocumentId: docId,
      DocumentStatus: "DENIED",
      AdminFeedback: rejectDocumentFeedback,
    };
    dispatch(changeDocumentStatus(props.id, data));
    setTimeout(() => {  
      setLoading(true);
      dispatch(getDocListing(props.id));
    }, 3000);
    setLoading(false)
    handleRejectedClose();
  };

  const counsellorStatus = "DENIED";

  const applicationStatus = {
    Key: props.getCounsellorData.CURRENT_STATAUS,
    Value: counsellorStatus
  };

  const handleRejectAll = () => {
    handleClose();
    dispatch(rejectAction(props.id, applicationStatus, value));
    setTimeout(() => {  
      dispatch(DetailAction(id))
    }, 2000);
  }

  const handleSwitch = async (e) => {
    if (e.target.checked) {
      setSwitchOn(true)
    } else {
      setSwitchOn(false)
    }
  }

  useEffect(() => {
    if (docList?.[0]?.isDocSkip === "Y") {
      setSwitchDisable(true);
    }
  }, [docList])

  const switchHandlerSkipCase = async () => {
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${ADMIN_UPDATE_ICSC_STATUS}`,
        {  
          "ApplicationId": props.id,
          "isDocSkip": "Y"
      },
      );
      if (res.data.status === true) {
        console.log("inside if condition")
        setSwitchOn(false);
        props.setShowDocList(false);
        setTimeout(() => {  
          dispatch(DetailAction(id))
        }, 2000);
      }
    } catch (error) {
      console.log('error', error);
    }   
  }

  return (
    <>
      <Dialog
        open={props.showDocList}
        className="aprovelPop"
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
       {docList?.length > 0 ? <><DialogTitle>Document List</DialogTitle>
        {loading ? <><TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Document</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Feedback</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {docList.length > 0 ? (
          docList.map((item) => (
            <TableRow>
            <TableCell> <a href={item.Link} download className="linkClass">{item.DocTitle}</a></TableCell>
            <TableCell>{item.DocumentStatus}</TableCell>
            <TableCell align="right"> {item.Adminfeedback}</TableCell>
            <TableCell align="right"> {item.DocumentStatus === "SUBMITTED" ? (
                  <>
                    <Button
                      onClick={() => handleAccept(item.DocumentId)}
                    >
                      Accept
                    </Button>
                    <Button onClick={() => handleReject(item.DocumentId)}>
                      Reject
                    </Button>
                  </>) : "-"}</TableCell>
        </TableRow>
            ))) 
            : <TableRow>
                <TableCell colSpan={4}>No Document Uplo</TableCell>
            </TableRow>}
              
                </TableBody>
                </Table>
                </TableContainer></> : <div className={classes.spinnerClassSingleDoc}><CircularProgress /></div>}
        <DialogActions>
         {props?.getCounsellorData?.DOCUMENT_STATUS === "SUBMITTED" && <><span>Skip this step</span><Switch onClick={(e) => handleSwitch(e)} checked={switchOn} disabled={switchDisable} /></>}
          <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions></> : <div className={classes.spinnerClassDocuments}><CircularProgress /></div>}
      </Dialog>
      {switchOn && <><Dialog open={switchOn} className="aprovelPop" onClose={() => setSwitchOn(false)}>
                    <DialogTitle>Message</DialogTitle>
                        <DialogContentText>Are you sure to skip this step as the counsellor will be promoted to next stage.</DialogContentText>
                        <DialogActions>
                            <Button onClick={() => { console.log("bitch"); setSwitchOn(false); }}>Close</Button>
                            <Button onClick={switchHandlerSkipCase} variant="contained">Skip</Button>
                        </DialogActions>
                    </Dialog></>}
      {rejected && (
        <Dialog
          open={rejected}
          className="aprovelPop"
          onClose={handleRejectedClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <DialogTitle>Reject Document</DialogTitle>
            <p>Are you sure you want to reject this document?</p>
            <DialogContentText color="dimgrey">
              Provide feedback for rejection
            </DialogContentText>
            <div>
              <textarea
                style={{ width: "100%", maxWidth: "400px" }}
                name="textarea"
                value={rejectDocumentFeedback}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <DialogActions>
              <Button
                onClick={rejectDoc}
                disabled={rejectDocumentFeedback.trim().length === 0}
              >
                Reject
              </Button>
              <Button onClick={handleRejectedClose}>Close</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
      {rejectAll && (
        <Dialog
          open={rejectAll}
          className="aprovelPop"
          onClose={handleRejectedClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <DialogTitle>Reject All Documents</DialogTitle>
            <p>Are you sure you want to reject all the documents at once?</p>
            <DialogContentText color="dimgrey">
              Provide feedback for rejection
            </DialogContentText>
            <div>
              <textarea
                style={{ width: "100%", maxWidth: "400px" }}
                name="textarea"
                value={value}
                onChange={(e) => handleRejectAllChange(e)}
              />
            </div>
            <DialogActions>
          <Button onClick={handleRejectedClose}>No, don&apos;t Reject</Button>
          <Button onClick={handleRejectAll} variant="contained" autoFocus disabled={value.trim().length === 0}>
            Yes, reject
          </Button>
        </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DocumentList;