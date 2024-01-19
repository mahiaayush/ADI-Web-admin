import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    NativeSelect,
    TextField,
  } from "@material-ui/core";
  import "../CounselloApplication/DetailScreen.css";
  import type { ChangeEvent } from 'react';
  import { useEffect, useState } from "react";
  import http from "../../utils/http";
  import { useDispatch, useSelector } from "react-redux";
  import { cognito } from '../../../config';
  import {
    ADMIN_API_ENDPOINT_V2, POST_INTERVIEWER_DETAILS
  } from '../../store/constants';
  import { makeStyles } from "@material-ui/styles";
  import { InterviewersAction } from "src/store/actions/OnBoardingAction";
  
  export default function AddInterviewer({
    addDialog,
    setAddDialog
  }) {
    const dispatch = useDispatch();
    const useStyles = makeStyles({
      flexParentClass: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      },
      childIInd: {
        textAlign: "right", 
        fontWeight: 600, 
        fontSize: "20px",
        margin: "0 auto"
      },
      chileTextField: {
        width: "65%"
      },
      errorClass: {
        color: "red",
        fontWeight: 400,
        marginRight: "10px",
        textTransform: "capitalize"
      },
      errorOuterDiv: {
        maxWidth: "475px",
      }
    });
    const [user, setUser] = useState({
        "InterviewerFirstName": "",
        "InterviewerLastName": "",
        "InterviewerEmail": "",
        "InterviewerPhone": ""
    });
    const [error, setError] = useState('');
    const [errorF, setErrorF] = useState(false);
    const [errorl, setErrorl] = useState(false);
    const regExpr = /^[a-zA-Z]+$/g

    const handleChange = (e: ChangeEvent<any>) => {
        const { name: field, value } = e.target
        setUser({ ...user, [field]: value })
    }

    const validations = () => {
        if (user.InterviewerPhone.length !== 10 || user.InterviewerFirstName.length === 0 || user.InterviewerLastName.length === 0 || user.InterviewerEmail.length === 0 || user.InterviewerEmail.includes('@')) {
            return true;
        }
        return false;
    }

    const handleAdd = async () => {
      const newObj = { ...user }
      newObj.InterviewerEmail += cognito.domainInterviewer
      
       if (!validations()) { 
        try {
          const res = await http.post(
            `${ADMIN_API_ENDPOINT_V2}${POST_INTERVIEWER_DETAILS}`, newObj,
          );
          console.log("resresres", res)
          if (res.data.status === true) {
            dispatch(InterviewersAction())
            setAddDialog(false);
          } 
        } catch (error) {
          console.log('error', error.response.data.message);
          setError(error?.response?.data?.message)
        }
    } else {
        setError("something went wrong...")
      }
    };

    if (error.includes("InterviewerLastName")) {
      setError("please enter valid interviewer last name")
    } else if (error.includes("InterviewerFirstName")) {
      setError("please enter valid interviewer first name")
    }

    const classes = useStyles();
    return (
        <>
        <Dialog open={addDialog} onClose={() => setAddDialog(false)} style={{ flexBasis: "430px" }} id="popupflex">
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }} style={{ fontWeight: 700, textAlign: "center" }}>Enter The Details Of Interviewer</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            size="small"
            label="First Name"
            name="InterviewerFirstName"
            type="text"
            fullWidth
            value={user.InterviewerFirstName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            size="small"
            label="Last Name"
            name="InterviewerLastName"
            type="text"
            fullWidth
            value={user.InterviewerLastName}
            onChange={handleChange}
            required
          />
          <div className={classes.flexParentClass}>
          <TextField
            className={classes.chileTextField}
            margin="dense"
            size="small"
            label="Email Address"
            name="InterviewerEmail"
            type="email"
            value={user.InterviewerEmail}
            onChange={handleChange}
            required
          /> <span className={classes.childIInd}>{cognito.domainInterviewer}</span>
          </div>
          <TextField
            className="mobileNumberUpDownArrow" 
            margin="dense"
            size="small"
            fullWidth
            type="number"
            label="WhatsApp Number"
            name="InterviewerPhone"
            onChange={handleChange}
            value={user.InterviewerPhone}
            required
          />
        </DialogContent>
        <DialogActions>
            <div className={classes.errorOuterDiv}><h5 className={classes.errorClass}>{error}</h5></div>
          <Button color="primary" variant="outlined" onClick={() => setAddDialog(false)}>
            Back
          </Button>
          <Button color="primary" variant="contained" onClick={handleAdd} disabled={validations()}>
            Add
          </Button>
        </DialogActions>
        </Dialog>
      </>
    );
  }