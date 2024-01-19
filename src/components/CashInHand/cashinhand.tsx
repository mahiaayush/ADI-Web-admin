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
    TableFooter,
    TablePagination,
    Checkbox,
    CardHeader,
    CircularProgress
  } from '@material-ui/core';
  import { useState, useEffect } from "react";
  import { useDispatch, useSelector } from 'src/store';
  import { makeStyles } from '@material-ui/core/styles';
  import arrowDown from "../../../public/images/arrow_down.png";
  import arrowUp from "../../../public/images/arrow_up.png";
  import bankLogo from "../../../public/images/icici_logo.png";
  import UploadFileIcon from "@material-ui/icons/UploadFile";
  import SendIcon from '@material-ui/icons/Send';
  import UploadFiles from './UploadFiles';
  import RequestReceived from './RequestReceived';
import { postDepositSlipAction } from 'src/store/actions/DepositSlipAction';
import { GetSalesTransactionActionList } from "src/store/actions/GetSalesTransactionAction";
import toast from 'react-hot-toast';
import moment from 'moment';
import NumberFormatUtil from '../common/reusable/NumberFormat';
import { timeDiff } from 'src/utils/utility';
import cardIcon from '../../../public/images/card.png';
import chequeIcon from '../../../public/images/card_edit.png';
import qrcodeIcon from '../../../public/images/qrcode.png';
import { getUserVpaDetails } from "../../store/actions/userVpaDetailsAction";

  const useStyles = makeStyles({
    whiteText: {
      color: "#ffffff",
      borderBottom: "none",
      paddingBottom: "0px",
    },
    swipeToggle: {
      color: "#ffffff",
      borderBottom: "none",
      paddingBottom: "0px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    whiteTextRight: {
      color: "#ffffff",
      borderBottom: "none",
      paddingBottom: "0px",
      textAlign: "right",
    },
    successText: {
      color: "#22C55E",
      borderBottom: "none",
      paddingBottom: "0px",
      textAlign: "right",
    },
    dividerClass: {
        background: "#3F2CE7",
        marginTop: "30px",
    },
    avatarIconOuterBox: {
        padding: "10px 10px 6px 10px",
        borderRadius: "8px",
        background: "#F2F1FD",
    },
    pendingGrey: {
        background: "#F6F6F9",
        width: "auto",
        padding: "3px 8px",
        borderRadius: "8px",
        fontSize: "12px",
        display: "inline-block",
    },
    pendingRed: {
        background: "#FEE7E7",
        width: "auto",
        padding: "3px 8px",
        borderRadius: "8px",
        fontSize: "12px",
        color: "red",
        display: "inline-block",
    },
    bankDetailsMainDiv: {
        border: "1px solid #ccc",
        background: "#2a1e90",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        margin: "20px 0",
    },
    bankName: {
        color: "#ffffff",
        margin: "0px",
        padding: "0px",
        fontSize: "14px",
    },
    accNo: {
        color: "#ffffff",
        margin: "0px",
        padding: "0px",
        fontSize: "20px",
    },
    ifscCode: {
        color: "#ffffff",
        margin: "0px",
        padding: "0px",
        fontSize: "14px",
    },
    toggleIcon: {
        cursor: "pointer",
    },
    headingText: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: "left",
        padding: "20px",
    },
    circularProcess: {
        minHeight: '30vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
  });

  const types = {
    CH: { name: 'Cash', icon: cardIcon },
    C: { name: 'Cheque', icon: chequeIcon },
    DD: { name: 'DD', icon: qrcodeIcon },
    POS: { name: 'Swipe Machine', icon: cardIcon },
    L: { name: 'Link', icon: cardIcon },
    QR: { name: 'QR code', icon: qrcodeIcon },
  };

export const CashInHand = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [uploadPopup, setUploadPopup] = useState(false);
    const [requestPopup, setRequestPopup] = useState(false);
    const [selected, setSelected] = useState([]);
    const [files, setFiles] = useState([]);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);

    const getSalesTransaction = () => {
        setLoading(true);
        dispatch(GetSalesTransactionActionList('CH', search, limit, page + 1, 'PENDING')).then(() => setLoading(false));
    };

    useEffect(() => {
        getSalesTransaction();
    }, [search, limit, page]);
    
    useEffect(() => {
        dispatch(getUserVpaDetails());
    }, []);

    const salesTransactionListData = useSelector(
        (state: any) => state?.salesTransaction?.salesTransactionList?.list || []
    );
    const salesTransactionCount = useSelector(
        (state: any) => state?.salesTransaction?.salesTransactionList?.count || 0
    );
    const userVpaDetails = useSelector(
        (state: any) => state?.userVpaDetails?.userVpaDetails?.detail
    );

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleToggleOpen = () => {
        setOpen(true);
    };
    const handleToggleClose = () => {
        setOpen(false);
    };

    const handleUploadFiles = (files: File[]) => {
        setFiles(files);
    };
    const handleUploadClose = () => {
        setUploadPopup(false);
    }
    const handleSubmitRequest = async () => {
        const postData = new FormData();
        postData.append('vpaId', userVpaDetails?.VPA?.VpaId);
        postData.append('depositSlip', files[0]);
        
        selected.forEach((transactionId) => {
            postData.append('transactionId', transactionId);
        });

        dispatch(postDepositSlipAction(postData)).then((data) => {
            if (data?.status) {
                setRequestPopup(true);
                getSalesTransaction();
            } else {
                toast.error(data.message || 'Something\'s wrong, try some time later');
            }
        });
    };
    const handleRequestClose = () => {
        setSelected([]);
        setFiles([]);
    };

    return (
        <div>
        <Container className="userIndex">
            <Box
            sx={{
                backgroundColor: 'background.default',
                pt: 3
            }}
            >
                <Grid
                    container
                >
                    <Grid
                    item
                    md={12}
                    xs={12}
                    >
                    <Card sx={{ backgroundColor: '#1C0F8A' }}>
                    <CardContent>
                        <Grid
                        alignItems="center"
                        container
                        justifyContent="space-between"
                        spacing={3}
                        item
                        xs={12}
                        >
                            <Grid item>
                                <Typography
                                color="textSecondary"
                                variant="overline"
                                className={classes.whiteText}
                                >
                                Cash In-hand
                                </Typography>
                                <Typography
                                color="textPrimary"
                                variant="h5"
                                className={classes.whiteText}
                                >
                                {/* ₹ {userVpaDetails?.CASH?.InHand !== "NaN" ? parseFloat(userVpaDetails?.CASH?.InHand).toFixed(2) : "0.00"} */}
                                <NumberFormatUtil Amount={userVpaDetails?.CASH?.InHand !== "NaN" ? userVpaDetails?.CASH?.InHand.toFixed(2) : 0.00} decimalScale={2} />
                                </Typography>
                                <Typography
                                color="textSecondary"
                                variant="overline"
                                className={classes.whiteText}
                                >
                                Cash need to deposit today
                                </Typography>
                                <Typography
                                color="textSecondary"
                                variant="subtitle2"
                                className={classes.whiteText}
                                >
                                {/* ₹ {userVpaDetails?.CASH?.NeedToDeposit !== "Nan" ? parseFloat(userVpaDetails?.CASH?.NeedToDeposit).toFixed(2) : "0.00"} */}
                                <NumberFormatUtil Amount={userVpaDetails?.CASH?.NeedToDeposit !== "NaN" ? userVpaDetails?.CASH?.NeedToDeposit.toFixed(2) : 0.00} decimalScale={2} />
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                color="textSecondary"
                                variant="overline"
                                className={classes.whiteText}
                                >
                                Total cash limit
                                </Typography>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                className={classes.whiteText}
                                >
                                {/* ₹ {userVpaDetails?.CASH?.InHand !== "NaN" ? parseFloat(userVpaDetails?.CASH?.InHand).toFixed(2) : "0.00"} */}
                                <NumberFormatUtil Amount={userVpaDetails?.CASH?.CashCapping !== "NaN" ? userVpaDetails?.CASH?.CashCapping?.toFixed(2) : 0.00} decimalScale={2} />
                                </Typography>
                                <Typography
                                color="textSecondary"
                                variant="overline"
                                className={classes.whiteText}
                                >
                                Remaining cash limit
                                </Typography>
                                <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                className={classes.whiteText}
                                >
                                {/* ₹ {userVpaDetails?.CASH?.InHand !== "NaN" ? parseFloat(userVpaDetails?.CASH?.InHand).toFixed(2) : "0.00"} */}
                                <NumberFormatUtil Amount={userVpaDetails?.CASH?.CashCapping !== "NaN" ? userVpaDetails?.CASH?.CashCapping - userVpaDetails?.CASH?.InHand.toFixed(2) : 0.00} decimalScale={2} />
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.dividerClass} />
                        <Table>
                            <TableBody>
                            <TableRow>
                                <TableCell className={classes.whiteText}>
                                    Cash deposited
                                </TableCell>
                                <TableCell className={classes.whiteTextRight}>
                                    {/* ₹ {userVpaDetails?.CASH?.CashDeposited !== "NaN" ? parseFloat(userVpaDetails?.CASH?.CashDeposited).toFixed(2) : "0.00"} */}
                                    <NumberFormatUtil Amount={userVpaDetails?.CASH?.CashDeposited !== "NaN" ? userVpaDetails?.CASH?.CashDeposited.toFixed(2) : 0.00} decimalScale={2} />
                                </TableCell>              
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.whiteText}>
                                    Total collected cash
                                </TableCell>
                                <TableCell className={classes.successText}>
                                    {/* ₹ {userVpaDetails?.CASH?.TotalCollectedCash !== "NaN" ? parseFloat(userVpaDetails?.CASH?.TotalCollectedCash).toFixed(2) : "0.00"} */}
                                    <NumberFormatUtil Amount={userVpaDetails?.CASH?.TotalCollectedCash !== "NaN" ? userVpaDetails?.CASH?.TotalCollectedCash.toFixed(2) : 0.00} decimalScale={2} />
                                </TableCell>              
                            </TableRow>
                            </TableBody>
                        </Table>
                        {open && <>
                        {Object.keys(userVpaDetails?.VPA).length > 0 ? <div className={classes.bankDetailsMainDiv}>
                            <div>
                                <p className={classes.bankName}>{userVpaDetails?.VPA?.BankName}</p>
                                <h5 className={classes.accNo}>{userVpaDetails?.VPA?.VpaAccNo}</h5>
                                <p className={classes.ifscCode}>IFSC : {userVpaDetails?.VPA?.IfscCode}</p>
                            </div>
                            <div>
                                <img src={bankLogo} alt="banklogo" />
                            </div>
                        </div> : <div className={classes.bankDetailsMainDiv}>
                            <p style={{ width: "100%", color: "#fff", textAlign: "center" }}>VPA not assigned and please contact administration</p>
                        </div>}
                        <div className={classes.swipeToggle}>
                            Click here for less detail
                            <div role="button" onClick={() => handleToggleClose()} onKeyDown={() => handleToggleClose()} tabIndex={0} className={classes.toggleIcon}><img alt="arrowup" src={arrowUp} /></div>
                        </div></>}
                        {!open && <div className={classes.swipeToggle}>
                            Click here for bank detail
                            <div role="button" onClick={() => handleToggleOpen()} onKeyDown={() => handleToggleOpen()} tabIndex={0} className={classes.toggleIcon}><img alt="arrowdown" src={arrowDown} /></div>
                        </div>}
                    </CardContent>
                </Card>
                </Grid>
            </Grid>
            </Box>

            <Box
                sx={{
                backgroundColor: 'background.default',
                pt: 3,
                pb: 3
                }}
            >
                <Card>
                <Box className={classes.headingText}>
                    <Typography
                        align="center"
                        color="textSecondary"
                        variant="h4"
                        sx={{ color: "#000" }}
                    >
                        Pending
                    </Typography>
                    <div>
                    {files.length ? <Button
                        variant="contained"
                        onClick={handleSubmitRequest}
                        startIcon={<SendIcon />}
                    >
                        Submit Request
                    </Button>
                        : selected.length ? <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            align="center"
                            variant="subtitle2"
                            sx={{ color: "#000", mx: 2 }}
                        >
                            {selected.length} selected
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setUploadPopup(true)}
                            startIcon={<UploadFileIcon />}
                        >
                            Attach Slip
                        </Button></Box> : null}
                    </div>
                </Box>

                {!loading ? <Table>
                    <TableBody>
                    {salesTransactionListData?.length > 0 ? salesTransactionListData?.map((transaction) => {
                        const isSelected = selected.includes(transaction.id);
                        const timeLeft = timeDiff(transaction.created_on, 3);
                        return (
                        <TableRow
                        key={transaction.id}
                        sx={{
                            '&:last-child td': {
                            border: 0
                            }
                        }}
                        role="checkbox"
                        hover
                        selected={isSelected}
                        onClick={() => {
                            if (isSelected) {
                                setSelected((prev) => prev.filter((itemId) => itemId !== transaction.id));
                            } else {
                                setSelected((prev) => [...prev, transaction.id]);
                            }
                        }}
                        >
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                checked={isSelected}
                                inputProps={{
                                    'aria-labelledby': transaction.id,
                                }}
                            />
                        </TableCell>
                        <TableCell width={100}>
                            <Box sx={{ p: 1 }}>
                            <Typography
                                align="center"
                                color="textSecondary"
                                variant="subtitle2"
                                className={classes.avatarIconOuterBox}
                            >
                                <img
                                    alt=""
                                    src={types?.[transaction?.payment_mode].icon}
                                />
                            </Typography>
                            <b style={{ fontSize: "10px", width: "100%", display: "block", textAlign: "center" }}>{types?.[transaction?.payment_mode]?.name}</b>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                {transaction.pt_offering} {transaction.quantity > 1 ? `x ${transaction.quantity}` : ''}
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                            >
                                <b>{transaction.customer_name}</b>
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                {moment(transaction.created_on).format('ll')} {moment(transaction.created_on).format('LTS')}
                            </Typography>
                            </Box>
                        </TableCell>
                        <TableCell align="right">
                            <Typography
                            color={
                                transaction.payment_status === 'SUCCESS'
                                ? 'success.main'
                                : 'error.main'
                            }
                            variant="subtitle2"
                            >
                            {transaction.payment_status}
                            </Typography>
                            <Typography
                            variant="subtitle2"
                            >
                                <NumberFormatUtil Amount={transaction.amount} decimalScale={2} />
                            </Typography>
                            <Typography
                            variant="subtitle2"
                            >
                                {transaction?.payment_status === "PENDING" && <span className={timeLeft.hrs < 2 || timeLeft.overdue ? classes.pendingRed : classes.pendingGrey}><img style={{ verticalAlign: "0px", marginRight: "5px" }} alt="timerIcon" src={timeLeft.hrs > 2 ? "/images/timer_grey.png" : "/images/timer_red.png"} />
                                    {timeLeft.hrs > 48 ? `${timeLeft.days} day${timeLeft.days > 1 ? 's' : ''}`
                                    : timeLeft.hrs ? `${timeLeft.hrs} hr${timeLeft.hrs > 1 ? 's' : ''}` : `${timeLeft.min} min`}
                                    {timeLeft.overdue ? ' overdue' : ' left'}
                                </span>}
                            </Typography>
                        </TableCell>
                        </TableRow>
                    )
                    }) : <h3>No Data Found!</h3>}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            count={salesTransactionCount}
                            page={page}
                            colSpan={5}
                            onPageChange={handleChangePage}
                            rowsPerPage={limit}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table> : <div className={classes.circularProcess}>
          <CircularProgress />
        </div>}
                </Card>
            </Box>
          </Container>
          {uploadPopup ? (
                <UploadFiles
                open={uploadPopup}
                onClose={handleUploadClose}
                onSubmit={handleUploadFiles}
                maxFiles={selected.length}
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
    )
}