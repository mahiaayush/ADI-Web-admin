import clsx from 'clsx';
import { useMemo, useState, useEffect } from 'react';
import { timeDiff } from 'src/utils/utility';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../store';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import cardIcon from '../../../public/images/card.png';
import chequeIcon from '../../../public/images/card_edit.png';
import qrcodeIcon from '../../../public/images/qrcode.png';
import NumberFormatUtil from '../common/reusable/NumberFormat';

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
gapsinn: {
  display: "block",
  margin: "0px"
}
});

const TransactionTable = ({ activeTab = 1, transactions, salesTransactionListCount, page, limit, handleChangePage, handleChangeRowsPerPage, loading = false }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // // const [page, setPage] = useState(0);
  // const [search, setSearch] = useState('');
  // const [limit, setLimit] = useState(10);
  // const { internalUsers } = useSelector((state) => state.internalUser);
  // const [isLoading, setIsLoading] = useState(false);
  // const [sortBy, setSortBy] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  // }, [page, limit, search, sortBy]);

  const types = {
    CH: { name: 'Cash', icon: cardIcon },
    C: { name: 'Cheque', icon: chequeIcon },
    DD: { name: 'DD', icon: qrcodeIcon },
    POS: { name: 'Swipe Machine', icon: cardIcon },
    L: { name: 'Link', icon: cardIcon },
    QR: { name: 'QR code', icon: qrcodeIcon },
  };

  const Status = ['L', 'QR', 'POS'];

  return (
    loading
      ? <div className={classes.circularProcess}><CircularProgress /></div>
      : <Table>
      <TableBody>
        {transactions.length > 0 ? <>
        {transactions.map((transaction) => {
          const timeLeft = timeDiff(transaction.created_on, 3);
            return ( 
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
             <p className={classes.gapsinn}><NumberFormatUtil Amount={transaction.amount} decimalScale={2} /></p>
             {transaction?.payment_status === "PENDING" && !Status.includes(transaction?.payment_mode) && <span className={timeLeft.hrs < 2 || timeLeft.overdue ? classes.pendingRed : classes.pendingGrey}><img style={{ verticalAlign: "0px", marginRight: "5px" }} alt="timerIcon" src={timeLeft.hrs > 2 ? "/images/timer_grey.png" : "/images/timer_red.png"} />
                {timeLeft.hrs > 48 ? `${timeLeft.days} day${timeLeft.days > 1 ? 's' : ''}`
                  : timeLeft.hrs ? `${timeLeft.hrs} hr${timeLeft.hrs > 1 ? 's' : ''}` : `${Math.abs(timeLeft.min)} min`}
                {timeLeft.overdue ? ' overdue' : ' left'}

              </span>}
             </Typography>
           </TableCell>
         </TableRow>)
        })}
        </> : <h3 style={{ width: "100%", textAlign: "center", fontSize: "28px" }}>No Data Found!</h3>} 
      </TableBody>
      <TableFooter>
        <TablePagination
          count={salesTransactionListCount}
          page={page}
          colSpan={5}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableFooter>
    </Table>
  );
};
export default TransactionTable;
