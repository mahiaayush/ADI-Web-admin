import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    TextField,
  } from "@material-ui/core";
  import MenuItem from "@material-ui/core/MenuItem";
  import "../CounselloApplication/DetailScreen.css";
  import { useEffect, useState } from "react";
  import http from "../../utils/http";
  import { useDispatch } from "react-redux";
  import type { ChangeEvent } from 'react';
  import { makeStyles } from "@material-ui/core/styles";
  import { useParams } from "react-router-dom";
  import { GetLogisticListAction } from "src/store/actions/GetLogisticListAction";
  import {
    ADMIN_API_ENDPOINT_V2, UPDATE_PRINT_CARD_STATUS
  } from '../../store/constants';
  
  export default function CardStatus({
    openPopup,
    setOpenPopup,
    existingCardStatus,
    membershipId
  }) {
    const [cardStatus, setCardStatus] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSucessMessage] = useState("");
    const dispatch = useDispatch();

    const CardStatusOptions = [
      { key: "Active", value: "A" },
      { key: "InActive", value: "I" },
      { key: "Blocked", value: "B" },
      { key: "Lost", value: "L" },
    ];
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
      setCardStatus('');
    }
    useEffect(() => {
        if (openPopup) {
            setCardStatus(existingCardStatus)
        }    
    }, [openPopup])
    const SubmitHandler = async () => {
        setError('')
        setSucessMessage('')
        const putCardStatusData = {
            "membershipId": membershipId,
            "status": "card",
            "value": cardStatus,
           };
            
             if (cardStatus) { 
              try {
                const res = await http.put(
                  `${ADMIN_API_ENDPOINT_V2}${UPDATE_PRINT_CARD_STATUS}`, putCardStatusData,
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
          <DialogTitle>Update Card Status</DialogTitle>
          <DialogContent>
            <DialogContentText color="dimgrey">
              Please Select Card Status
              <TextField
                margin="dense"
                size="small"
                name="CardStatus"
                value={cardStatus}
                onChange={(e: ChangeEvent<any>) =>
                  setCardStatus(e.target.value)}
                type="text"
                select
                fullWidth
                required
              >
                {CardStatusOptions && CardStatusOptions.length > 0
                  ? CardStatusOptions.map((data) => (
                      <MenuItem key={data.key} value={data.value} disabled={data.value === existingCardStatus}>
                        {data.key}
                      </MenuItem>
                    ))
                  : null}
              </TextField>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <div className={classes.errorOuterDiv}>
              <h5 className={classes.errorClass}>{error}</h5>
              <h5 style={{ color: "green", marginRight: "10px" }}>
                {successMessage}
              </h5>
            </div>
            <Button onClick={handleClose}>Close</Button>
            <Button
              className={cardStatus.trim().length === 0 || cardStatus === existingCardStatus ? "disableBtnYes" : ""}
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