import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    CircularProgress,
  } from "@material-ui/core";
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "src/store";
  import { makeStyles } from "@material-ui/core/styles";
  import viewFeedbackAction from "src/store/actions/viewFeedbackAction";
  import { getLocalTime } from "src/utils/utility";
  
  const useStyles = makeStyles({
    spinnerClassCommercial: {
      marginTop: "100px",
      marginLeft: "50px",
      minHeight: "50vh",
      minWidth: "500px",
    },
    mainParentFlex: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      languageBoxChild: {
        fontWeight: 700,
        marginRight: "100px",
        color: "#172b4d"
      },
      fontClass: {
        fontWeight: 700
      },
      totalMarksBox: { 
      border: "1px solid black", 
      width: "50px", 
      height: "30px", 
      fontWeight: 700 
      },
      plansPayrollBox: {
      "fontWeight": 600,
      "textAlign": "left",
      "marginBottom": "0px",
       color: "#172b4d" 
     },
     topNameDate: {
       display: "flex",
       justifyContent: "space-between",
       alignItems: "center",
       listStyle: "none",
       fontWeight: "bolder",
       padding: "0 10px 0 10px",
       textTransform: "uppercase"
     },
     remarksClass: {
       fontWeight: 700,
       textAlign: "left",
     },
     planTypesClass: {
       transform: "scale(0.9)",
       marginRight: "-25px"
     },
  });
  
  export default function ViewFeedback({
    viewFeedback,
    setViewFeedback,
    getCounsellorData,
  }) {
    const dispatch = useDispatch();
    const classes = useStyles();
  
    useEffect(() => {
      dispatch(viewFeedbackAction(getCounsellorData?.APPLICATION_ID));
    }, []);

    const viewFeedbackInterview = useSelector(
        (state) => state.viewFeedback.viewFeedback.data
    )
    const handleClose = () => {
        setViewFeedback(false);
    };
  
    return (
      <>
        <Dialog open={viewFeedback} className="aprovelPop" onClose={handleClose}>
          {Object.keys(viewFeedbackInterview).length !== 0 ? (
            <>
              <DialogTitle>Interview-Feedback</DialogTitle>
              <DialogContent>
                <DialogContentText color="dimgrey">
                  <DialogContentText>
                  <div className={classes.mainParentFlex}>
                <p className={classes.plansPayrollBox}>Interviewer Name</p>
                <p>{viewFeedbackInterview?.InterviewerFirstName} {viewFeedbackInterview?.InterviewerLastName}</p>
              </div>
              <div className={classes.mainParentFlex}>
                <p className={classes.plansPayrollBox}>Interviewer Email</p>
                <p>{viewFeedbackInterview?.InterviewerEmail}</p>
              </div>
                  {viewFeedbackInterview?.Parameter?.map((item, index) => {
                return (<div className={classes.mainParentFlex} key={index.toString()}>
                <p className={classes.plansPayrollBox}>{item?.ParameterTitle}</p>
                <p>{item?.Score}</p>
              </div>)
            })}
              <div className={classes.mainParentFlex}>
                <p className={classes.plansPayrollBox}>Interview Start-Date</p>
                <p>{getLocalTime(viewFeedbackInterview?.InterviewStartDate)[3]}</p>
              </div>
              <div className={classes.mainParentFlex}>
                <p className={classes.plansPayrollBox}>Interview End-Date</p>
                <p>{getLocalTime(viewFeedbackInterview?.InterviewEndDate)[3]}</p>
              </div>
              <div className={classes.mainParentFlex}>
                <p className={classes.plansPayrollBox}>Interviewer Status</p>
                <p>{viewFeedbackInterview?.InterviewerStatus}</p>
              </div>
                  <div className={classes.mainParentFlex}>
                <p className={classes.plansPayrollBox}>Language Preferences</p>
                <p>{viewFeedbackInterview?.LanguagePreferance}</p>
              </div>
              <div className={classes.mainParentFlex}>
                <p className={classes.plansPayrollBox}>Counsellor Payroll</p>
                <p>{viewFeedbackInterview?.Payroll}</p>
              </div>
              <div className={classes.mainParentFlex}>
                <p className={classes.plansPayrollBox}>Room Name</p>
                <p>{viewFeedbackInterview?.RoomName}</p>
              </div>              
              <div className={classes.mainParentFlex}>
                <p className={classes.plansPayrollBox}>Interview Remarks</p>
                <p>{viewFeedbackInterview?.InterviewRemark}</p>
              </div>
                  </DialogContentText>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Cancel
                </Button>
              </DialogActions>
            </>
          ) : (
            <div className={classes.spinnerClassCommercial}>
              <CircularProgress />
            </div>
          )}
        </Dialog>
      </>
    );
  }