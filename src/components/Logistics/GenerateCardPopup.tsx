import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    TextField,
  } from "@material-ui/core";
  import "../CounselloApplication/DetailScreen.css";
  import { useEffect, useState } from "react";
  import http from "../../utils/http";
  import { useDispatch } from "react-redux";
  import type { ChangeEvent } from 'react';
  import { makeStyles } from "@material-ui/core/styles";
  import { useParams } from "react-router-dom";
  import { GetLogisticListAction } from "src/store/actions/GetLogisticListAction";
  import {
    ADMIN_API_ENDPOINT_V2, POST_LOGISTIC_GENERATE_NUMBER
  } from '../../store/constants';
  
  export default function GenerateCard({
    openPopup,
    setOpenPopup,
  }) {
    const [cardLimit, setCardLimit] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSucessMessage] = useState("");
    const dispatch = useDispatch();

    const useStyles = makeStyles({
        parentDiv: {
            display: "block",
          justifyContent: "center",
          alignItems: "center",
          height: "150px",
          margin: "30px"
        },
        pricing: {
          fontWeight: 600,
          fontSize: "20px",
        },
        spinnerClass: {
          marginTop: "100px",
          marginLeft: "50px",
          minHeight: "20vh",
          minWidth: "500px",
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
    const classes = useStyles();
    const handleClose = () => {
      setOpenPopup(false);
      setError('')
      setSucessMessage('')
      setCardLimit('');
    }
    
    const SubmitHandler = async () => {
        setError('')
        setSucessMessage('')

       const postGenerateNumberData = {
        "totalCardLimit": cardLimit
       };
        
         if (cardLimit) { 
          try {
            const res = await http.post(
              `${ADMIN_API_ENDPOINT_V2}${POST_LOGISTIC_GENERATE_NUMBER}`, postGenerateNumberData,
            );
            console.log("resresres", res)
            if (res.data.status === true) {
              setSucessMessage(res?.data?.message);
              dispatch(GetLogisticListAction(null, null, null, 1, 10, null, null));
              setTimeout(() => {
                handleClose()
              }, 1000);
            } 
          } catch (error) {
            console.log('error', error.response.data.message);
            setError(error?.response?.data?.message)
          }
      } else {
          setError("something went wrong...")
        }
    };
  
    const handleYes = () => {
        SubmitHandler();
    };
  
    return (
      <>
        <Dialog open={openPopup} className="aprovelPop" onClose={handleClose}>
          <DialogTitle>Generate Number</DialogTitle>
          <DialogContent>
            <DialogContentText color="dimgrey">
              Please Enter Total Card Limit (Max Allowed Value: 1000)
              <TextField
                //  className={classes.chileTextField}
                margin="dense"
                size="small"
                fullWidth
                type="number"
                label="Total Card Limit"
                name="TotalCardLimit"
                onChange={(e: ChangeEvent<any>) => setCardLimit(e.target.value > 1000 ? "" : e.target.value)}
                value={cardLimit}
                required
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
          <div className={classes.errorOuterDiv}><h5 className={classes.errorClass}>{error}</h5>
          <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5></div>
            <Button onClick={handleClose}>Close</Button>
            <Button
              className={cardLimit.trim().length === 0 ? "disableBtnYes" : ""}
              onClick={handleYes}
              variant="contained"
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }