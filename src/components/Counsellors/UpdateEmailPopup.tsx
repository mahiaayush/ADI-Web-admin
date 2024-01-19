import {
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContentText,
    Button,
    TextField
  } from "@material-ui/core";
  import "../CounselloApplication/DetailScreen.css";
  import http from "../../utils/http";
  import {
    ADMIN_API_ENDPOINT_V2, PATCH_UPDATE_EMAIL,
  } from '../../store/constants';
  import { useState } from "react";
  import { makeStyles } from "@material-ui/core/styles";
  import { useDispatch, useSelector } from "react-redux";
  import { getCounsellorOverview } from "../../store/actions/counsellorOverViewAction";
  import { useParams } from "react-router-dom";

  const useStyles = makeStyles({
      errorClass: {
          color: "red",
          fontSize: "15px",
          fontWeight: 400,
          margin: "0px"
      }
  });
  
  export default function UpdateEmailPopup({ emailPop, setEmailPop, ApplicationId, Email }) {
      const [emailUpdate, setEmailUpdate] = useState(Email);
      const [error, setError] = useState(false);
      const dispatch = useDispatch();
      const filter = "Weekly";
      const classes = useStyles();
      const { id } = useParams();

      const EmailChangeHandler = (e) => {
          setEmailUpdate(e.target.value)
      }

      const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      };

    const SubmitHandler = async () => {
        if (validateEmail(emailUpdate)) {
          try {
            const res = await http.patch(
              `${ADMIN_API_ENDPOINT_V2}${PATCH_UPDATE_EMAIL}`,
              {
                "ApplicationId": ApplicationId,
                "CounselorEmail": emailUpdate
              }
            );
            if (res.data.status === true) {
                setError(false);
                setEmailPop(false);
                dispatch(getCounsellorOverview(id));
            }
          } catch (error) {
            console.log("error", error.message);
          }
        } else {
            setError(true)
        }
        }
    return (
      <>
        <Dialog open={emailPop} className="aprovelPop" onClose={() => setEmailPop(false)}>
        <DialogTitle>Update Email</DialogTitle>
        <DialogContentText color="dimgrey">
            Are you sure want to change your current email address ?
               </DialogContentText>
               <DialogContentText color="dimgrey">
              <TextField 
                size="small"
                label="Email"
                name="type"
                type="email"
                fullWidth 
                value={emailUpdate}
                onChange={(e) => EmailChangeHandler(e)}
              />
               </DialogContentText>
          <DialogActions>
              {error && <h6 className={classes.errorClass}>Please enter valid email</h6>}
            <Button autoFocus onClick={() => setEmailPop(false)}>
              Close
            </Button>
            <Button autoFocus variant="contained" onClick={SubmitHandler} disabled={emailUpdate === Email}>
              yes, change
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }