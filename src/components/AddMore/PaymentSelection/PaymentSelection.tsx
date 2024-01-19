import styles from "./PaymentSelection.module.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Link from "../../../assets/images/link.png";
import QR from "../../../assets/images/qr.png";
import Cash from "../../../assets/images/cash.png";
import POS from "../../../assets/images/pos.png";
import Cheque from "../../../assets/images/cheque.png";
import DemandDraft from "../../../assets/images/dd.png";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "react-router";
import {
  Card,
  List,
  ListItem,
  Typography,
  Grid,
  Box,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Button,
  Snackbar,
  Alert
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "src/store";
import { removeTransaction, updateSalesTransaction } from "src/store/actions/AddMoreAction";
import { ChequeDD } from "./ChequeDD/ChequeDD";
import { getTransactionDetails } from "src/store/actions/transactionDetailsAction";
import { getInventoryList } from "src/store/actions/inventoryAction";

const PaymentSelection = ({
  active,
  setActiveStep,
  planSelectionData,
  userSid,
  stateCode
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [pMode, setPMode] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const [openError, setOpenError] = useState(false)

  const TransactionData = useSelector(
    (state: any) => state?.addMoreRes?.updateTransactionResponse
  );

  const PaymentHandler = (p_mode) => {
    setUpdateMsg('');
    setLoading(true);
    setPaymentStatus({ [p_mode]: true });
    setPMode(p_mode);
    type ApiDataType = {
      seller_user_sid: string;
      quantity: number;
      pt_offering_id: number;
      coupon_id?: string;
      payment_mode: string;
      buyer_user_sid: string;
      allocation_id?: number;
      shipment: string;
    };

    const apiData: ApiDataType = {
      seller_user_sid: planSelectionData?.seller_user_sid,
      quantity: planSelectionData?.quantity,
      pt_offering_id: planSelectionData?.pt_offering_id,
      payment_mode: p_mode,
      buyer_user_sid: userSid,
      shipment: stateCode
    };
    if (planSelectionData?.coupon_id) {
      apiData.coupon_id = planSelectionData?.coupon_id;
    }
    if (planSelectionData?.allocation_id && active === 1) {
      apiData.allocation_id = planSelectionData?.allocation_id?.toString();
    }
    dispatch(updateSalesTransaction(apiData)).then((res) => {
      if (res?.data?.status) {
        setSuccess(true);
        setActiveStep(4);
      } else {
        setUpdateMsg(res);
      }
      setLoading(false);
      setTimeout(() => setUpdateMsg(""), 15000);
    });
  };

  const ReceivedHandler = async () => {
    setUpdateMsg("");
    setLoading(true);
    dispatch(getInventoryList(1, 5, "", "I"));
    if (pMode === "CH") {
      navigate("/add-more/request-received");
      setLoading(false);
    }
    if (pMode === "QR" || pMode === "L") {
      dispatch(
        getTransactionDetails(TransactionData?.data?.transaction_id)
      ).then((res) => {
        if (res?.data?.status) {
          if (res?.data?.data?.payment_status === "SUCCESS") {
            navigate(`/transaction/${TransactionData?.data?.transaction_id}`);
          } else {
            setUpdateMsg("Your payment status is still pending...!");
          }
        } else {
          setUpdateMsg(res);
        }
        setLoading(false);
        setTimeout(() => setUpdateMsg(""), 15000);
      });
    }
  };

  const tryAnotherOption = () => {
    dispatch(removeTransaction(TransactionData?.data?.transaction_id)).then((res) => {
      if (!res?.data?.status) {
        setOpenError(true);
      }
    });
    setPaymentStatus({ [pMode]: false });
    setSuccess(false);
    setUpdateMsg("");
  };

  return (
    <Grid className={styles.wrapper}>
      {loading && (
        <div className={styles.circularProcess}>
          <CircularProgress />
        </div>
      )}
      <Card className={styles.container}>
        {!success ? (
          <>
            <ArrowBack
              onClick={() => {
                setActiveStep(1);
                setUpdateMsg("");
              }}
              style={{ cursor: "pointer" }}
            />
            <h3>Payment Method</h3>
            <Box>
              <List disablePadding>
                Online
                <ListItem
                  style={{ cursor: "pointer" }}
                  onClick={() => PaymentHandler("L")}
                >
                  <ListItemAvatar>
                    <img src={Link} alt="link" />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography color="textPrimary" variant="subtitle2">
                        Pay via Link
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          color="textSecondary"
                          sx={{
                            overflow: "hidden",
                            pr: 2,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          variant="body2"
                        >
                          Create payment link for the customer
                        </Typography>
                        {paymentStatus?.L && (
                          <h5
                            style={{
                              margin: "0px",
                              color: "red",
                            }}
                          >
                            {updateMsg}
                          </h5>
                        )}
                        <Typography color="textSecondary" variant="caption">
                          <ArrowForwardIosIcon fontSize="small" />
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem
                  onClick={() => PaymentHandler("QR")}
                  style={{ cursor: "pointer" }}
                >
                  <ListItemAvatar>
                    <img src={QR} alt="qr" />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography color="textPrimary" variant="subtitle2">
                        Create a QR code
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          color="textSecondary"
                          sx={{
                            overflow: "hidden",
                            pr: 2,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          variant="body2"
                        >
                          Generate a scanable QR
                        </Typography>
                        {paymentStatus?.QR && (
                          <h5
                            style={{
                              margin: "0px",
                              color: "red",
                            }}
                          >
                            {updateMsg}
                          </h5>
                        )}
                        <Typography color="textSecondary" variant="caption">
                          <ArrowForwardIosIcon fontSize="small" />
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem
                  onClick={() => PaymentHandler("POS")}
                  style={{ cursor: "pointer" }}
                >
                  <ListItemAvatar>
                    <img src={POS} alt="pos" />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography color="textPrimary" variant="subtitle2">
                        Pay via POS
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          color="textSecondary"
                          sx={{
                            overflow: "hidden",
                            pr: 2,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          variant="body2"
                        >
                          All cards accepted
                        </Typography>
                        {paymentStatus?.POS && (
                          <h5
                            style={{
                              margin: "0px",
                              color: "red",
                            }}
                          >
                            {updateMsg}
                          </h5>
                        )}
                        <Typography color="textSecondary" variant="caption">
                          <ArrowForwardIosIcon fontSize="small" />
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                Offline
                <ListItem
                  onClick={() => PaymentHandler("CH")}
                  style={{ cursor: "pointer" }}
                >
                  <ListItemAvatar>
                    <img src={Cash} alt="cash" />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography color="textPrimary" variant="subtitle2">
                        By cash
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          color="textSecondary"
                          sx={{
                            overflow: "hidden",
                            pr: 2,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          variant="body2"
                        >
                          Take from customer
                        </Typography>
                        {paymentStatus?.CH && (
                          <h5
                            style={{
                              margin: "0px",
                              color: "red",
                            }}
                          >
                            {updateMsg}
                          </h5>
                        )}
                        <Typography color="textSecondary" variant="caption">
                          <ArrowForwardIosIcon fontSize="small" />
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem
                  onClick={() => PaymentHandler("C")}
                  style={{ cursor: "pointer" }}
                >
                  <ListItemAvatar>
                    <img src={Cheque} alt="cheque" />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography color="textPrimary" variant="subtitle2">
                        By cheque
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          color="textSecondary"
                          sx={{
                            overflow: "hidden",
                            pr: 2,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          variant="body2"
                        >
                          All Bank cheque accepted
                        </Typography>
                        {paymentStatus?.C && (
                          <h5
                            style={{
                              margin: "0px",
                              color: "red",
                            }}
                          >
                            {updateMsg}
                          </h5>
                        )}
                        <Typography color="textSecondary" variant="caption">
                          <ArrowForwardIosIcon fontSize="small" />
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem
                  onClick={() => PaymentHandler("DD")}
                  style={{ cursor: "pointer" }}
                >
                  <ListItemAvatar>
                    <img src={DemandDraft} alt="dd" />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography color="textPrimary" variant="subtitle2">
                        By Demand Draft
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          color="textSecondary"
                          sx={{
                            overflow: "hidden",
                            pr: 2,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                          variant="body2"
                        >
                          Take Demand Draft from customer
                        </Typography>
                        {paymentStatus?.DD && (
                          <h5
                            style={{
                              margin: "0px",
                              color: "red",
                            }}
                          >
                            {updateMsg}
                          </h5>
                        )}
                        <Typography color="textSecondary" variant="caption">
                          <ArrowForwardIosIcon fontSize="small" />
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </>
        ) : (
          <>
            {pMode === "QR" && success ? (
              <>
                <h3>QR-Code</h3>
                <Box>
                  <ListItemAvatar style={{ backgroundColor: "#f8f8f8" }}>
                    <img
                      src={TransactionData?.data?.qr_code_img_url}
                      alt="qr"
                      className={styles.qrImageClass}
                    />
                  </ListItemAvatar>
                </Box>
                <ListItemAvatar className={styles.qrMainClass}>
                  <ListItemText className={styles.cashHeadingClass}>
                    Have You Received the Payment ?
                  </ListItemText>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => ReceivedHandler()}
                    className={styles.btnMainClass}
                    disabled={loading}
                  >
                    {!loading ? "Yes" : "Processing"}
                  </Button>
                </ListItemAvatar>
                <Typography sx={{ color: "red", textAlign: "center", mt: 0 }}>
                  {updateMsg}
                </Typography>
              </>
            ) : pMode === "CH" && success ? (
              <>
                <h3>Cash</h3>
                <ListItemAvatar sx={{ maxWidth: 350 }}>
                  <ListItemText sx={{ mb: 3 }}>
                    Have You Received the Cash ?
                  </ListItemText>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => ReceivedHandler()}
                    className={styles.btnMainClass}
                  >
                    Yes
                  </Button>
                </ListItemAvatar>
              </>
            ) : (pMode === "POS" || pMode === "C" || pMode === "DD") 
            && success ? (
              <ChequeDD p_mode={pMode} planSelectionData={planSelectionData} />
            ) : pMode === "L" && success ? (
              <>
                <h3>Payment link</h3>
                <ListItemAvatar sx={{ maxWidth: 350 }}>
                  <ListItemText sx={{ mb: 3 }}>
                    Link has been sent to customer&apos;s registered mobile
                    number. Have you got the payment ?
                  </ListItemText>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => ReceivedHandler()}
                    className={styles.btnMainClass}
                    disabled={loading}
                  >
                    {!loading ? "Yes" : "Processing"}
                  </Button>
                  <Typography sx={{ color: "red", mt: 1 }}>
                    {updateMsg}
                  </Typography>
                </ListItemAvatar>
              </>
            ) : (
              <Box>
                <ListItemAvatar className={styles.cashMainClass}>
                  <ListItemText className={styles.cashHeadingClass}>
                    Something Went Wrong !!
                  </ListItemText>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setActiveStep(1)}
                  >
                    Return
                  </Button>
                </ListItemAvatar>
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
              onClick={() => tryAnotherOption()}
              className={styles.btnMainClass}
              disabled={loading}
            >
              {!loading ? "Try with another payment option" : "Processing"}
            </Button>
          </>
        )}
      </Card>
      {openError && (
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={() => setOpenError(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setOpenError(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Something went wrong!
          </Alert>
        </Snackbar>
      )}
    </Grid>
  );
};

export default PaymentSelection;
