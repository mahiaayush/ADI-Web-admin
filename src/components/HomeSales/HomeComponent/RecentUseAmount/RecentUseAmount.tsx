import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@material-ui/core";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { useState, useEffect, useMemo } from "react";
import styles from "./RecentUseAmount.module.css";
import Slider from "@material-ui/core/Slider";
import { GetSalesTransactionActionList } from "src/store/actions/GetSalesTransactionAction";
import { useDispatch, useSelector } from "../../../../store";
import { useNavigate, Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import cardIcon from '../../../../../public/images/card.png';
import chequeIcon from '../../../../../public/images/card_edit.png';
import qrcodeIcon from '../../../../../public/images/qrcode.png';
import moment from "moment";

const useStyles = makeStyles({
  whiteText: {
    color: '#ffffff',
    borderBottom: 'none',
    paddingBottom: '0px',
    display: 'flex',
    justifyContent: 'center',
  },
  avatarIconOuterBox: {
    padding: '10px 10px 6px 10px',
    borderRadius: '8px',
    background: '#F2F1FD',
    width: '50px',
  },
  circularProcess: {
    minHeight: '30vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RecentUseAmount = (props) => {
  const dispatch = useDispatch();
  const [paymentmode, setPaymentmode] = useState(null);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const classes = useStyles();

  const types = {
    CH: { name: 'Cash', icon: cardIcon },
    C: { name: 'Cheque', icon: chequeIcon },
    DD: { name: 'DD', icon: qrcodeIcon },
    POS: { name: 'Swipe Machine', icon: cardIcon },
    L: { name: 'Link', icon: cardIcon },
    QR: { name: 'QR code', icon: qrcodeIcon },
  };

  useEffect(() => {
    dispatch(
      GetSalesTransactionActionList(paymentmode, search, limit, page + 1, status)
    ).then(() => setLoading(false));
  }, [paymentmode, search, limit, page, status]);

  const salesTransactionListData = useSelector(
    (state: any) => state?.salesTransaction?.salesTransactionList?.list
  );

  // const getSuccesslist = salesTransactionListData ? salesTransactionListData.filter((item) => {
  //   return item.payment_status === "SUCCESS"
  // }) : null

  return (
    <Card className={styles.recentUseAmountdv}>
      <Grid
        alignItems="center"
        container
        justifyContent="space-between"
        spacing={3}
        item
        xs={12}
      >
        <Grid item>
          <Typography color="textPrimary" variant="h5">
            Recent
          </Typography>
        </Grid>
        <Grid item>
          {salesTransactionListData?.length > 0 && (
            <Link className={styles.sellalls} to="/history-sales">
              See All
            </Link>
          )}
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 3,
          pb: 3,
        }}
      >
        <Table className={styles.recentTable}>
          <TableBody>
            {loading
              ? <div className={classes.circularProcess}><CircularProgress /></div>
              : salesTransactionListData?.length > 0 ? (
                salesTransactionListData.slice(0, 3).map((transaction) => (
                <TableRow
                key={transaction.id}
                sx={{
                  '&:last-child td': {
                    border: 0,
                  },
                }}
                onClick={() => { navigate(`/transaction/${transaction?.id}`) }}
                style={{ cursor: "pointer" }}
                >
                <TableCell width={100}>
                  <Box sx={{ p: 1 }}>
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="subtitle2"
                      className={classes.avatarIconOuterBox}
                    >
                    <img src={types?.[transaction?.payment_mode]?.icon} alt="icon" />
                     
                    </Typography>
                  </Box>
                  <b style={{ fontSize: "10px", width: "100%", display: "block", textAlign: "center" }}>{types?.[transaction?.payment_mode]?.name}</b>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography color="textSecondary" variant="body2">
                      {transaction.pt_offering}
                      {/* {transactions.quantity} */}
                    </Typography>
                    <Typography color="textPrimary" variant="subtitle2">
                      <b>{transaction.customer_name}</b>
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {moment(transaction.created_on).format('ll')} {moment(transaction.created_on).format('LTS')}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color={transaction.payment_status === 'SUCCESS' ? 'success.main' : 'error.main'}
                    variant="subtitle2"
                  >
                    {transaction.payment_status}
                  </Typography>
                  <Typography variant="subtitle2">
                  &#8377; {transaction.amount}
                  </Typography>
                </TableCell>
              </TableRow>
              ))
            ) : (
              <h3>No Data Found!</h3>
            )}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};
export default RecentUseAmount;
