import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    CircularProgress,
  } from "@material-ui/core";
  import { useEffect, useState } from "react";
  import { makeStyles } from "@material-ui/core/styles";
  import http from "../../utils/http";
  import { useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "../../store";
  import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
  import TestResultAction from "src/store/actions/TestResultAction";
  import FileDownloadOutlined from '@material-ui/icons/FileDownloadOutlined';

  const useStyles = makeStyles({
    spinnerClass: {
    marginTop: "100px",
    marginLeft: "50px",
    minHeight: "35vh",
    minWidth: "350px"
  },
  fontWeightClass: {
    fontWeight: 700
  }
 });
  
  export default function TestResultPopup({
    testId,
    resultPop,
    setResultPop
  }) {
    const classes = useStyles();
    console.log("gege", testId, typeof testId)

    const dispatch = useDispatch();
    const [testID, setTestID] = useState(testId)

    // console.log("Capital", testId, typeof testId)

    useEffect(() => {
      dispatch(TestResultAction(testID))
    }, [])

    const downloadFile = (url) => {
      const link = document.createElement('a');
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    const ResultPopData = useSelector(
      state => state.testResults.testResultResponse.data
    );

    console.log("helllo", ResultPopData)
    
    const handleClose = () => {
      setTestID('')
      setResultPop(false);
    }

    return <>
        <Dialog open={resultPop} className="aprovelPop" onClose={handleClose}>
         {Object.keys(ResultPopData).length !== 0 ? <><DialogTitle>
           <div className="headingIconTest">
            TEST RESULT
            <FileDownloadOutlined onClick={(e) => downloadFile(ResultPopData?.pdfReportUrl)} />
            </div>
          </DialogTitle>
          <DialogContent dividers={true} sx={{ p: 0 }}>
              <ul className="parent-class-dialog">
                  <li className={classes.fontWeightClass}>Test Invitation-Id</li>
                  <li>{ResultPopData?.testInvitationId}</li>
              </ul>   
              <ul className="parent-class-dialog">
                  <li className={classes.fontWeightClass}>Candidate Email</li>
                  <li>{ResultPopData?.candidateEmail}</li>
              </ul>
              <ul className="parent-class-dialog">
                  <li className={classes.fontWeightClass}>Status</li>
                  <li>{ResultPopData?.status}</li>
              </ul>
              <ul className="parent-class-dialog">
                  <li className={classes.fontWeightClass}>Candidate Points</li>
                  <li>{ResultPopData?.candidatePoints}</li>
              </ul> 
              <ul className="parent-class-dialog">
                  <li className={classes.fontWeightClass}>Total Test Points</li>
                  <li>{ResultPopData?.totalTestPoints}</li>
              </ul>
              <ul className="parent-class-dialog">
                  <li className={classes.fontWeightClass}>Score Percentage</li>
                  <li>{`${ResultPopData?.scorePercentage} %`}</li>
              </ul>
              <ul className="parent-class-dialog">
                  <li className={classes.fontWeightClass}>Test Name</li>
                  <li>{ResultPopData?.testName}</li>
              </ul>
          </DialogContent>  
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions></> : <div className={classes.spinnerClass}><CircularProgress /></div>}
        </Dialog>
      </>
  }