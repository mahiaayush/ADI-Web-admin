import { createElement, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
  Container,
  TableRow,
  TableCell,
  Table,
  TableBody,
  CardHeader,
  Link,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cardIcon from "../../../public/images/card.png";
import pendingIcon from "../../../public/images/pending_icon.png";
import completeIcon from "../../../public/images/complete_icon.png";
import removeIcon from "../../../public/images/remove.png";
import SendIcon from "@material-ui/icons/Send";
import qrcodeIcon from "../../../public/images/qrcode.png";
import chequeIcon from "../../../public/images/card_edit.png";
import toast from "react-hot-toast";
import { getTransactionDetails } from "../../store/actions/transactionDetailsAction";
import { postDepositSlipAction } from "src/store/actions/DepositSlipAction";
import { useDispatch, useSelector } from "../../store";
import UploadFiles from "../CashInHand/UploadFiles";
import RequestReceived from "../CashInHand/RequestReceived";
import moment from "moment";
import NumberFormat from "../common/reusable/NumberFormat";
import { getUserVpaDetails } from "src/store/actions/userVpaDetailsAction";

const useStyles = makeStyles({
  whiteText: {
    color: "#ffffff",
    borderBottom: "none",
    paddingBottom: "0px",
    display: "flex",
    justifyContent: "center",
  },
  avatarIconOuterBox: {
    padding: "10px 10px 6px 10px",
    borderRadius: "8px",
    background: "#F2F1FD",
    width: "50px",
  },
  detailsInnerCard: {
    background: "#ffffff",
    borderRadius: "8px",
  },
  detailsCardContent: {
    padding: "10px !important",
  },
  cardBox: {
    color: "#000000",
    background: "#F6F6F9",
    borderRadius: "50px",
    padding: "10px",
  },
  timeLeft: {
    background: "#FEE7E7",
    color: "#F65C5C",
    padding: "0px 6px",
    borderRadius: "8px",
    fontSize: "12px",
  },
  buttonStyle: {
    width: "100%",
    background: "#3D2AE7",
    borderRadius: "8px",
    display: "block",
    marginRight: "0px",
  },
  buttonStyleBack: {
    padding: "5px",
    background: "none",
    margin: "10px 0 0 0",
    "&:hover": {
      color: "#de9505",
      background: "none",
    },
  },
});

export const TransactionDetails = () => {
  const [uploadPopup, setUploadPopup] = useState(false);
  const [requestPopup, setRequestPopup] = useState(false);
  const [submitExpiryDate, setSubmitExpiryDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTransactionDetails(id)).then(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    dispatch(getUserVpaDetails());
  }, []);

  const transactionDetail = useSelector(
    (state: any) => state?.transactionDetails?.transDetails?.detail
  );
  const userVpaDetails = useSelector(
    (state: any) => state?.userVpaDetails?.userVpaDetails?.detail
  );
  const handleUploadFiles = (files: File[]) => {
    setFiles(files);
  };
  const handleUploadClose = () => {
    setUploadPopup(false);
  };

  const downloadLink = (url) => {
    const link = document.createElement("a");
    link.download = url;
    link.href = url;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRequestClose = () => {
    setFiles([]);
  };

  const directOptions = ["L", "QR"];
  const hildLink = ["L", "QR", "POS"];

  const handleSubmitRequest = async () => {
    const postData = new FormData();
    postData.append("vpaId", userVpaDetails?.VPA?.VpaId);
    postData.append("depositSlip", files[0]);
    postData.append("transactionId", transactionDetail?.transaction_id);

    dispatch(postDepositSlipAction(postData)).then((data) => {
      if (data?.status) {
        setRequestPopup(true);
        dispatch(getTransactionDetails(id));
      } else {
        toast.error(data.message || "Something's wrong, try some time later");
      }
    });
  };

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  useEffect(() => {
    if (transactionDetail?.created_on) {
      setSubmitExpiryDate(
        addDays(transactionDetail?.created_on, 3).toISOString()
      );
    }
  }, [transactionDetail]);

  useEffect(() => {
    const updatedExiryDatewithHour = new Date(submitExpiryDate)
      .toISOString()
      .split("T")[0]
      .concat("T10:30:00.000Z");
    setSubmitExpiryDate(updatedExiryDatewithHour);
  }, [submitExpiryDate]);

  let timeLeft = (new Date(submitExpiryDate).getTime() - new Date().getTime()) / (1000 * 3600);
  timeLeft = Math.round(timeLeft);
  let timeDisplayText = "";
  if (timeLeft > 48 && !hildLink?.includes(transactionDetail?.payment_mode) && !transactionDetail?.attachment) {
    timeDisplayText = "3 days left to submit";
  } else if (timeLeft <= 48 && timeLeft >= 0 && !hildLink?.includes(transactionDetail?.payment_mode) && !transactionDetail?.attachment) {
    timeDisplayText = `${timeLeft} hours left to submit`;
  } else if (timeLeft < 0 && !hildLink?.includes(transactionDetail?.payment_mode) && !transactionDetail?.attachment) {
    timeDisplayText = `${Math.abs(timeLeft)} hours overdue`;
  } else {
    timeDisplayText = "";
  }
  return (
    <div>
      <Container className="userIndex">
        <Button
          onClick={() => {
            navigate(-1);
          }}
          className={classes.buttonStyleBack}
          color="primary"
        >
          &lt; Back
        </Button>
        <Box
          sx={{
            backgroundColor: "background.default",
            pt: 3,
            pb: 3,
          }}
        >
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              {loading ? (
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                    width: "100%",
                  }}
                >
                  <CircularProgress />
                </Card>
              ) : !transactionDetail?.transaction_id ? (
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px",
                    width: "100%",
                  }}
                >
                  <h2>No Data Found!</h2>
                </Card>
              ) : (
                <Card
                  sx={{
                    backgroundColor:
                      transactionDetail?.payment_status === "PENDING"
                        ? "#DE9503" : transactionDetail?.payment_status === "FAILED_BY_USER"
                          ? "#ff6262" : "#22C55E",
                    borderRadius: "20px",
                    boxShadow: "10px 10px 10px rgb(18 8 42 / 25%)",
                  }}
                >
                  <CardContent className={classes.detailsCardContent}>
                    <div className={classes.detailsInnerCard}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className={classes.whiteText}>
                              <Typography
                                align="center"
                                color="textSecondary"
                                variant="subtitle2"
                                className={classes.avatarIconOuterBox}
                              >
                                {transactionDetail?.payment_mode === "QR" && (
                                  <img alt="" src={qrcodeIcon} />
                                )}
                                {transactionDetail?.payment_mode === "CH" && (
                                  <img alt="" src={cardIcon} />
                                )}
                                {transactionDetail?.payment_mode === "DD" && (
                                  <img alt="" src={qrcodeIcon} />
                                )}
                                {transactionDetail?.payment_mode === "C" && (
                                  <img alt="" src={chequeIcon} />
                                )}
                                {(transactionDetail?.payment_mode === "L"
                                  || transactionDetail?.payment_mode === "POS") && <img alt="" src={cardIcon} />}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.whiteText}>
                              <Typography
                                align="center"
                                color="textSecondary"
                                variant="subtitle2"
                              >
                                by{" "}
                                {transactionDetail?.payment_mode === "QR"
                                  && "QR Code"}{" "}
                                {transactionDetail?.payment_mode === "CH"
                                  && "Cash"}
                                {transactionDetail?.payment_mode === "C"
                                  && "Cheque"}
                                {transactionDetail?.payment_mode === "DD"
                                  && "Demand Draft"}
                                {transactionDetail?.payment_mode === "L"
                                  && "Link"}
                                {transactionDetail?.payment_mode === "POS"
                                  && "POS"}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.whiteText}>
                              <span className={classes.cardBox}>
                                {transactionDetail?.pt_offering_name} x{" "}
                                {transactionDetail?.quantity}
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.whiteText}>
                              <Typography
                                align="center"
                                color="textSecondary"
                                variant="subtitle2"
                              >
                                {transactionDetail?.customer_name}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.whiteText}>
                              <Typography
                                align="center"
                                color="textSecondary"
                                variant="h4"
                              >
                                {/* ₹ {transactionDetail?.amount} */}
                                <NumberFormat
                                  Amount={transactionDetail?.amount}
                                  decimalScale={2}
                                />
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.whiteText}>
                              <Typography
                                align="center"
                                color="textSecondary"
                                variant="subtitle2"
                                style={{ display: "flex" }}
                              >
                                {transactionDetail?.payment_status === "PENDING" ? (
                                  <>
                                    <img src={pendingIcon} alt="Pending" />
                                    &nbsp;Pending
                                  </>
                                ) : transactionDetail?.payment_status === "FAILED_BY_USER" ? (
                                  <>
                                    <img src={removeIcon} alt="failed" style={{ maxWidth: "100%", height: "fit-content", marginTop: "4px" }} />
                                    &nbsp;Failed By User
                                  </>
                                ) : (
                                  <>
                                    <img src={completeIcon} alt="Complete" />
                                    &nbsp;Complete
                                  </>
                                )}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className={classes.whiteText}>
                              <Typography
                                align="center"
                                color="textSecondary"
                                variant="subtitle2"
                              >
                                {moment(transactionDetail?.created_on).format(
                                  "ll"
                                )}{" "}
                                {moment(transactionDetail?.created_on).format(
                                  "LTS"
                                )}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          {transactionDetail?.payment_status === "PENDING" && (
                            <>
                              <TableRow>
                                <TableCell className={classes.whiteText}>
                                  <Typography
                                    align="center"
                                    color="textSecondary"
                                    variant="subtitle2"
                                    className={classes.timeLeft}
                                  >
                                    {timeDisplayText}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                              {transactionDetail?.payment_mode !== "QR" && transactionDetail?.payment_mode !== "L" && transactionDetail?.payment_mode !== "POS" && !transactionDetail?.attachment && (
                                <TableRow>
                                  <TableCell className={classes.whiteText}>
                                    <Typography
                                      align="center"
                                      color="textSecondary"
                                      variant="subtitle2"
                                    >
                                      You need to submit the {transactionDetail?.payment_mode === "CH" ? "Cash" : transactionDetail?.payment_mode === "C" ? "Cheque" : "Demand Draft"} to <br />
                                      the bank before time runs out
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              )}
                            </>
                          )}
                          <TableRow>
                            <TableCell className={classes.whiteText}>
                              <Typography
                                align="center"
                                color="textSecondary"
                                variant="subtitle2"
                                sx={{
                                  mb:
                                    transactionDetail?.payment_status === "PENDING"
                                      ? 8
                                      : 0,
                                }}
                              >
                                Transaction ID <br />
                                {transactionDetail?.transaction_id}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          {transactionDetail?.payment_status === "SUCCESS" && (
                            <>
                              <TableRow>
                                <TableCell className={classes.whiteText}>
                                  <Typography
                                    align="center"
                                    color="textSecondary"
                                    variant="subtitle2"
                                    sx={{
                                      mb:
                                        transactionDetail?.payment_status === "SUCCESS"
                                          ? 8
                                          : 0,
                                    }}
                                  >
                                    UTR <br />
                                    220974001895
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </>
                          )}
                          <TableRow>
                            <TableCell className={classes.whiteText}>
                              {transactionDetail?.payment_status !== "FAILED_BY_USER" && <>{transactionDetail?.attachment ? (
                                <Button
                                  color="primary"
                                  size="large"
                                  sx={{ mr: 1, mb: 4 }}
                                  variant="contained"
                                  className={classes.buttonStyle}
                                  onClick={() =>
                                    downloadLink(transactionDetail?.attachment)}
                                >
                                  View Slip
                                </Button>
                              ) : !directOptions.includes(
                                transactionDetail?.payment_mode
                              ) && files.length === 0 ? (
                                <Button
                                  color="primary"
                                  size="large"
                                  sx={{ mr: 3, mb: 4 }}
                                  variant="contained"
                                  className={classes.buttonStyle}
                                  onClick={() => setUploadPopup(true)}
                                >
                                  Deposit slip
                                </Button>
                              ) : files.length ? (
                                <Button
                                  color="primary"
                                  size="large"
                                  sx={{ mr: 3, mb: 4 }}
                                  className={classes.buttonStyle}
                                  variant="contained"
                                  onClick={handleSubmitRequest}
                                  startIcon={<SendIcon />}
                                  style={{ display: 'flex' }}
                                >
                                  Submit Request
                                </Button>
                              ) : <Button
                                color="primary"
                                size="large"
                                sx={{ mr: 3, mb: 4 }}
                                className={classes.buttonStyle}
                                variant="contained"
                                onClick={() => navigate('/history-sales')}
                              >
                                Done
                              </Button>}</>}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
      {uploadPopup ? (
        <UploadFiles
          open={uploadPopup}
          onClose={handleUploadClose}
          onSubmit={handleUploadFiles}
          maxFiles={1}
        />
      ) : null}
      {requestPopup ? (
        <RequestReceived
          open={requestPopup}
          onClose={() => setRequestPopup(false)}
          onSubmit={handleRequestClose}
        />
      ) : null}
    </div>
  );
};
