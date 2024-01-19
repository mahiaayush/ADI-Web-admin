import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Box,
  Card,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "../../store";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { getLocalTime } from "src/utils/utility";
import getLearningHubOrdersAction from "src/store/actions/getLearningHubOrdersAction";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
    topheader: {
      paddingTop: "16px",
      position: "relative",
    },
  });
  interface UserObject {
    GivenName: string;
    FamilyName: string;
    OrderNumber: string;
    InvoiceURL: string;
    PaymentStatus: string;
    Email: string;
  }  

const Orders = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [paymentStatus, setPaymentStatus] = useState({ label: "Success", value: "SU" });
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();  

    const Email = (row: UserObject) => {
      return (
        <span style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
          {row.Email}
        </span>
      );
    };
    const LearnerName = (row: UserObject) => {
        return (
          <span>
            {row.GivenName} {row.FamilyName}
          </span>
        );
      };

    const OrderNumber = (row: UserObject) => {
      return (
        <a href={row.InvoiceURL} target="_blank" rel="noreferrer" className="linkClass">
          {row.OrderNumber}
        </a>
      )
    }

    const ViewLink = (row: UserObject) => {
      return (
        <Button
        style={{
          border: "1px solid blue",
          backgroundColor: "#FFFFFF",
          fontSize: "14px",
          textDecoration: 'none'
      }}
          size="small"
          type="button"
          variant="outlined"
          color="primary"
          className={row?.PaymentStatus === "PE" ? "disableBtnYes" : ''}
          // onClick={() => {
          //   window.location.href = `/DetailScreen/${row.UserSid}`;
          // }}
          onClick={() => navigate(`/orders/${row.OrderNumber}`)}
        >
          View
        </Button>
      );
    };

    const sessionsListData = useSelector(
      (state: any) => state?.learningHubOrder?.data?.CoursesList
    );

    const sessionsListDataFound = useSelector(
      (state: any) => state?.learningHubOrder?.data?.TotalRecords
    );

    useEffect(() => {
      setIsLoading(true);
      const intervalIdentifier = setTimeout(() => {
        dispatch(getLearningHubOrdersAction(page + 1, limit, search, paymentStatus.value, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'))
        .then(() => setIsLoading(false))
      }, 1000);

      return () => { clearTimeout(intervalIdentifier) };
      }, [limit, page, search, sortBy, paymentStatus]);
  
    const columns = useMemo(
        () => [
          {
            Header: "Order No",
            id: "ORDER_NUMBER",
            accessor: OrderNumber,
            width: 190
          },
          {
            Header: "Invoice No",
            accessor: "InvoiceNumber",
            width: 100,
            id: "INVOICE_NUMBER"
          },
          {
            Header: "Course Title",
            accessor: "CourseTitle",
            id: "COURSE_TITLE",
            width: 150
          },
          {
            Header: "Transaction Id",
            accessor: "TransactionId",
            id: "TRANSACTION_ID",
            width: 190
          },
          {
            Header: "Email",
            accessor: Email,
            id: "EMAIL",
            width: 140
          },
          {
            Header: "Order Date",
            accessor: "CreatedOn",
            Cell: props => getLocalTime(props.value)[9],
            id: "CREATED_ON",
            width: 140,
          },
          {
            Header: "Amount",
            accessor: "OrderAmount",
            id: "ORDER_AMOUNT",
            width: 80
          },
          {
            Header: "User",
            accessor: LearnerName,
            id: "GIVEN_NAME",
            width: 100
          },
          {
            Header: "Actions",
            accessor: ViewLink,
            width: 100
          }
        ],
        []
      );

    return (
        <div>
            <Container className="userIndex">
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
            Learning Hub Orders
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Typography color="textSecondary" variant="subtitle2">
            Orders 
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
             Learning Hub
            </Typography>
          </Breadcrumbs>
        </Grid>
          <Box sx={{ mt: 3 }}>
          <Card>
            <Grid item className="counsellorApplicationListTable filterdataContner sessionsListClass learningHubOrders">
            {sessionsListData ? <EnhancedTable
                columns={columns}
                data={sessionsListData}
                totalCount={sessionsListDataFound}
                isLoading={isLoading}
                manualGlobalFilter={true}
                singleStep={true}
                search={search}
                setSearch={setSearch}
                limit={limit}
                setLimit={setLimit}
                currentPage={page}
                setPage={setPage}
                sortedBy={sortBy}
                setSortedBy={setSortBy}
                manualPagination={true}
                manualSortBy={true}
                sessionStatus={paymentStatus}
                setSessionStatus={setPaymentStatus}
            /> : <div style={{ margin: "50vh 0", display: 'flex', justifyContent: 'center' }}><CircularProgress /></div>}
            </Grid>
          </Card>
        </Box>
      </Container>
    </div>
    )
}

export default Orders;