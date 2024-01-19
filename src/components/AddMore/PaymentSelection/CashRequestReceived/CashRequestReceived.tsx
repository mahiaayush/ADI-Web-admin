import { useState } from "react";
import { Typography, Button, Container, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import requestReceived from "../../../../../public/images/request_received.png";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  modal: {
    width: "100%",
    height: "100%",
    maxWidth: 500,
    minWidth: 300,
    minHeight: 250,
    maxHeight: 450,
  },
  successContainer: {
    paddingTop: "80px",
    display: "flex",
    flexDirection: "column",
    placeItems: "center",
    height: "100%",
    margin: "70px",
  },
  requestReceived: {
    position: "relative",
    margin: "20px"
  },
  checkIcon: {
    position: "absolute",
    left: "29%",
    top: "28%",
    fontSize: 60,
    color: "#FFFFFF",
  },
  containerMain: {
    marginTop: "10px",
  },
});

const CashRequestReceived = () => {
  const navigate = useNavigate();
  const styles = useStyles();

  return (
    <Container className={styles.containerMain}>
      <div className={styles.successContainer}>
        <div className={styles.requestReceived}>
          <img src={requestReceived} alt="request received" />
          <DoneRoundedIcon className={styles.checkIcon} />
        </div>
        <Typography color="textPrimary" variant="h5" margin="dense">
          Request Received
        </Typography>
        <Typography
          color="textPrimary"
          variant="subtitle1"
          margin="dense"
          fontWeight="normal"
        >
          It will take us 48 hours to complete your request
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 6 }} onClick={() => navigate('/history-sales')}>
          Transaction History
        </Button>
      </div>
    </Container>
  );
};

export default CashRequestReceived;
