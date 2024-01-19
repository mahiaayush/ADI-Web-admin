import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Box,
  Card,
  Tooltip,
  IconButton,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import { useNavigate } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { useMemo, useState, useEffect } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { useDispatch, useSelector } from "../../store";
import { getMasterTransactionAction } from "src/store/actions/GetMasterTransactionAction";
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ConfirmApprove from "./ConfirmApprove";
import { ADMIN_API_ENDPOINT_V2, UPDATE_MASTER_TRANSACTION_STATUS } from "../../store/constants";
import NumberFormatUtil from '../common/reusable/NumberFormat';
import http from "../../utils/http";
import moment from "moment";
import { getLocalTime } from "src/utils/utility";
// import { GET_TRANSACTIONS_DETAILS, PATCH_FINANCIAL_STATUS, Rbac } from "src/store/RbacConstants";
import { getRBACAllowedApisAction } from "src/store/actions/getAllowedRoutesAction";
import { GET_TRANSACTIONS_DETAILS, PATCH_FINANCIAL_STATUS } from "src/store/RbacConstants";

const useStyles = makeStyles({
  topheader: {
    paddingTop: "16px",
    position: "relative",
  },
  tablebackground: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "4px",
    position: "relative",
    boxShdow: "0px 1px 2px #ddd",
    marginTop: "24px",
  },
  tableTab: {
    width: "100%",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  tabbing: {
    borderBottom: "2px solid #fff",
  },
  active: {
    borderBottom: "2px solid #5664d2",
    color: "#5664d2",
  },
  usertooltip: {
    position: "absolute",
    right: "0px",
    top: "16px",
  },
  clickable: {
    cursor: "pointer",
    background: "transparent",
    textDecoration: "none !important",
    textAlign: "left",
    fontSize: "14px",
    textTransform: "capitalize",
    padding: "0",
  },
});

interface UserObject {
  PgStatus: string,
  TransactionId: string,
  PgAmount: number,
}

const CashManagement = () => {
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tranId, setTranId] = useState(null);
  const [flag, setFlag] = useState(null);
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getMasterTransactionAction(page + 1,
      limit,
      search,
      sortBy?.[0]?.id,
      sortBy?.[0]?.desc === undefined
        ? null
        : sortBy?.[0]?.desc
        ? "desc"
        : "asc")).then(() => setIsLoading(false));
  }, [page, search, limit, sortBy]);
  
  // for handking Rbac 
  /**
   * NEED to check => GET_TRANSACTIONS_DETAILS
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const masterTransactionData = useSelector(
    (state: any) =>
      state?.GetMasterTransaction?.getMasterTransactionResponse?.data?.data
  );

  const masterTransactionDataFound = useSelector(
    (state: any) =>
     state?.GetMasterTransaction?.getMasterTransactionResponse?.data?.count
  );

  const handleApproveDisapprove = async () => {
    const updateMasterTransactionData = {
      pgStatus: flag === 1 ? "SUCCESS" : "DISAPPROVED",
    };

    let res;
    try {
      res = await http.patch(
        `${ADMIN_API_ENDPOINT_V2}${UPDATE_MASTER_TRANSACTION_STATUS}/${tranId}`,
        updateMasterTransactionData
      );
      console.log("resresres", res);
      if (res.data.status === true) {
        // setSucessMessage(res?.data?.message);
        dispatch(getMasterTransactionAction(1, 10, null, null, null));
        setTimeout(() => {
          setConfirmDialog(false)
        }, 1000);
      }
    } catch (error) {
      console.log("resresres", res);
      console.log("error", error);
      setErrorMessage(error?.response?.data?.message);
    }
  };

  const ApproveDisapprove = (row: UserObject) => {
    return (
      <>
        {row.PgStatus === "PENDING" && (
          <>
            <div>
            { (roleAllowedApis.filter(itm => itm.apiKey === PATCH_FINANCIAL_STATUS).length > 0) 
        && (  
              <Button
                style={{ color: "green" }}
                onClick={() => {
                  setFlag(1);
                  setTranId(row.TransactionId);
                  setConfirmDialog(true);
                }}
              >
                <CheckCircleOutlinedIcon />
              </Button>
        )}
         { (roleAllowedApis.filter(itm => itm.apiKey === PATCH_FINANCIAL_STATUS).length > 0) 
        && ( 
              <Button
                style={{ color: "red" }}
                onClick={() => {
                  setFlag(2);
                  setTranId(row.TransactionId);
                  setConfirmDialog(true);
                }}
              >
                <CancelOutlinedIcon />
              </Button>
              
        )}
            </div>
          </>
        )}
        {(row.PgStatus === "SUCCESS" || row.PgStatus === "DISAPPROVED") && (
          <span
            className={`${
              row.PgStatus === "SUCCESS"
                ? "status_badge status_badge_active"
                : row.PgStatus === "DISAPPROVED"
                ? "status_badge status_badge_inactive"
                : "status_badge status_badge_banned"
            }`}
          >
            {row.PgStatus === "SUCCESS" ? "Approved" : "Disapproved"}
          </span>
        )}
      </>
    );
  };

  const Price = (row: UserObject) => {
   const amt = parseInt(row.PgAmount.toString(), 10);
   return <NumberFormatUtil Amount={amt.toString() ? amt : 0.00} decimalScale={2} />
  }

  const ViewLink = (row: UserObject) => {
     console.log(GET_TRANSACTIONS_DETAILS, 'w=>', roleAllowedApis.filter(itm => itm?.apiKey === GET_TRANSACTIONS_DETAILS).length > 0)
    return (
      <FormControl size="small" variant="outlined">
        {(roleAllowedApis.filter(itm => itm.apiKey === GET_TRANSACTIONS_DETAILS).length > 0) 
        && (<>
        <InputLabel
            id="demo-simple-select-outlined-label"
            className="ActionButtonSessions"
        >
            Action 
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Action"
          value="icon"
          className="selectAction"
        >
          <MenuItem value="icon">
            <MoreHorizRoundedIcon />
          </MenuItem>
          {true && (<>
            <MenuItem
              value="Master Transaction Detail "
              onClick={() => {
                  navigate(`/financial-approval/${row.TransactionId}`)
              }}
            >
              <Button size="small" type="button" variant="text" color="primary">
              Master Transaction Detail
              </Button>
            </MenuItem>
            </>
          )}
        </Select>
        </>)}    
        
      </FormControl>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Item",
        accessor: "Item",
        width: 80,
      },
      {
        Header: "Quantity",
        accessor: "Quantity",
        width: 50,
      },
      {
        Header: "Item Type",
        accessor: "PtOfferingName",
        width: 100,
      },
      {
        Header: "Agent Name",
        accessor: "SalesUserName",
        width: 100,
      },
      {
        Header: "Sold To",
        accessor: "UserName",
        width: 100,
      },
      {
        Header: "Sold Date",
        accessor: "InvoiceDate",
        Cell: (props) => (props.value ? getLocalTime(props.value)[9] : "-"),
        width: 100,
      },
      {
        Header: "Price",
        accessor: Price,
        width: 100,
      },
      {
        Header: "Status",
        accessor: ApproveDisapprove,
        width: 100,
      },
      {
        Header: "Action",
        id: " ",
        accessor: ViewLink,
        disableSortBy: true,
        width: 100,
      },
    ],
    [roleAllowedApis, GET_TRANSACTIONS_DETAILS, PATCH_FINANCIAL_STATUS]
  );

  return (
    <div>
      <Container className="userIndex">
        {confirmDialog && (
          <ConfirmApprove
            open={confirmDialog}
            onClose={() => { setConfirmDialog(false); setErrorMessage(""); }}
            onSubmit={() => handleApproveDisapprove()}
            flag={flag}
            errorMessage={errorMessage}
          />
        )}
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
             Cash Management
          </Typography>
          {/* <Tooltip title="Add" className={classes.usertooltip}>
            <IconButton
              aria-label="add"
              size="small"
              onClick={() => setAddDialog(true)}
            >
              <AddCircleOutlineSharp color="primary" fontSize="large" />
            </IconButton>
          </Tooltip> */}
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {masterTransactionData && masterTransactionData.length > 0 ? (
                <div className="itemListSorting">
                  <EnhancedTable
                    columns={columns}
                    data={masterTransactionData}
                    totalCount={masterTransactionDataFound}
                    isLoading={isLoading}
                    manualGlobalFilter={true}
                    // singleStep={true}
                    search={search}
                    setSearch={setSearch}
                    limit={limit}
                    setLimit={setLimit}
                    sortedBy={sortBy}
                    setSortedBy={setSortBy}
                    currentPage={page}
                    setPage={setPage}
                    //   rating={rating}
                    //   setRating={setRating}
                    manualPagination={true}
                    //   setStartDate={setStartDate}
                    //   setEndDate={setEndDate}
                    manualSortBy={true}
                  />
                </div>
              ) : (
                <div className="itemListSorting">
                  <EnhancedTable
                    columns={columns}
                    data={[]}
                    totalCount={0}
                    isLoading={isLoading}
                    manualGlobalFilter={true}
                    //   singleStep={true}
                    search={search}
                    setSearch={setSearch}
                    limit={limit}
                    setLimit={setLimit}
                    currentPage={page}
                    setPage={setPage}
                    //   rating={rating}
                    //   setRating={setRating}
                    // manualPagination={true}
                    //   setStartDate={setStartDate}
                    //   setEndDate={setEndDate}
                    manualSortBy={true}
                  />
                </div>
              )}
            </Grid>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default CashManagement;
