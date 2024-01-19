import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CircularProgress,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "../../store";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { getLocalTime } from "src/utils/utility";
import { GetCardLotListAction, GetLogisticListAction } from "src/store/actions/GetLogisticListAction";
import { useNavigate } from "react-router";
import GenerateCard from "./GenerateCardPopup";
import PrintStatus from "./PrintStatusPopup";
import CardStatus from "./CardStatusPopup";
import BulkPrintStatus from "./BulkPrintStatus";

const useStyles = makeStyles({
  topheader: {
    paddingTop: "16px",
    position: "relative",
    display: "flex",
    justifyContent: "space-between"
  },
});
interface UserObject {
  CARD_SERIAL: string;
  CARD_STATUS: string;
  PRINT_STATUS: string;
  CS_MEMBERSHIP_ID: string;
}

const Orders = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openPrintStatus, setOpenPrintStatus] = useState(false);
  const [openBulkPrintStatus, setOpenBulkPrintStatus] = useState(false);
  const [printStatus, setPrintStatus] = useState("");
  const [openCardStatus, setOpenCardStatus] = useState(false);
  const [cardStatus1, setCardStatus] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [printStatusSelected, setPrintStatusSelected] = useState("");
  const [cardStatusSelected, setCardStatusSelected] = useState("");
  const navigate = useNavigate();

  const cardStatusOptions = (val) => {
    switch (val) {
      case "A":
        return "Active";
        break;
      case "I":
        return "InActive";
        break;
      case "B":
        return "Blocked";
        break;
      case "L":
        return "Lost";
        break;
      default:
        return "";
        break;
    }
  };

  const cardStatus = (row: UserObject) => {
    return (
      <span
        className={`${
          row.CARD_STATUS === "A"
            ? "status_badge status_badge_active"
            : row.CARD_STATUS === "I" 
            ? "status_badge status_badge_inactive"
            : "status_badge status_badge_banned"
        }`}
      >
        {cardStatusOptions(row.CARD_STATUS)}
      </span>
    );
  };
  const ViewLink = (row: UserObject) => {
    return (
      <FormControl size="small" variant="outlined">
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
            {" "}
            <MoreHorizRoundedIcon />{" "}
          </MenuItem>
          <MenuItem
            value="Print Status"
            onClick={() => {
              setOpenPrintStatus(true);
              setPrintStatus(row.PRINT_STATUS);
              setMembershipId(row.CS_MEMBERSHIP_ID);
            }}
            disabled={!row.PRINT_STATUS}
          >
            <Button
              size="small"
              type="button"
              variant="text"
              color="primary"
              // onClick={() => {
              //   setOpenPrintStatus(true);
              //   setPrintStatus(row.PRINT_STATUS);
              //   setMembershipId(row.CS_MEMBERSHIP_ID);
              // }}
              // disabled={!row.PRINT_STATUS}
            >
              Print Status
            </Button>
          </MenuItem>
          <MenuItem
            value="Card Status"
            onClick={() => {
              setOpenCardStatus(true);
              setCardStatus(row.CARD_STATUS);
              setMembershipId(row.CS_MEMBERSHIP_ID);
            }}
            disabled={!row.CARD_STATUS}
          >
            <Button
              size="small"
              type="button"
              variant="text"
              color="primary"
              // onClick={() => {
              //   setOpenCardStatus(true);
              //   setCardStatus(row.CARD_STATUS);
              //   setMembershipId(row.CS_MEMBERSHIP_ID);
              // }}
              // disabled={!row.CARD_STATUS}
            >
              Card Status
            </Button>
          </MenuItem>
          <MenuItem
            value="Map Item"
            onClick={() => navigate(`/Logistic/${row.CS_MEMBERSHIP_ID}`)}
            disabled={!row.CS_MEMBERSHIP_ID}
          >
            <Button
              // style={{
              //   border: "1px solid blue",
              //   backgroundColor: "#FFFFFF",
              //   fontSize: "14px",
              //   textDecoration: "none",
              // }}
              size="small"
              type="button"
              variant="text"
              color="primary"
              // className={row?.CARD_SERIAL ? "disableBtnYes" : ""}
              // disabled={!row.CS_MEMBERSHIP_ID}
              // onClick={() => navigate(`/Logistic/${row.CS_MEMBERSHIP_ID}`)}
            >
              Logistic Detail
            </Button>
          </MenuItem>
        </Select>
      </FormControl>
    );
  };

  const logisticsListData = useSelector(
    (state: any) =>
      state?.getLogisticList?.getLogisticListResponse?.data?.data?.Result
  );

  const logisticsListDataFound = useSelector(
    (state: any) =>
      state?.getLogisticList?.getLogisticListResponse?.data?.data?.found
  );

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      GetLogisticListAction(
        printStatusSelected,
        cardStatusSelected,
        search,
        page + 1,
        limit,
        sortBy?.[0]?.id,
        sortBy?.[0]?.desc === undefined
          ? null
          : sortBy?.[0]?.desc
          ? "desc"
          : "asc"
      )
    ).then(() => setIsLoading(false));
  }, [page, search, limit, sortBy, printStatusSelected, cardStatusSelected]);

  useEffect(() => {
    dispatch(GetCardLotListAction());
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: "Card Lot",
        id: "CARD_LOT",
        accessor: "CARD_LOT",
        width: 120,
        disableSortBy: true,
      },
      {
        Header: "Card Serial",
        accessor: "CARD_SERIAL",
        id: "CARD_SERIAL",
        width: 100,
        disableSortBy: true,
      },
      {
        Header: "Print Status",
        accessor: "PRINT_STATUS",
        Cell: (props) =>
          (props.value === "R"
            ? "Ready To Print"
            : props.value === "I"
            ? "In Process"
            : props.value === "P"
            ? "Print"
            : ""),
        id: "PRINT_STATUS",
        width: 70,
      },
      {
        Header: "Card Status",
        accessor: cardStatus,
        id: "CARD_STATUS",
        width: 100,
      },
      {
        Header: "Activated On",
        accessor: "ACTIVATED_ON",
        Cell: (props) => (props.value ? getLocalTime(props.value)[9] : "-"),
        id: "ACTIVATED_ON",
        width: 80,
      },
      {
        Header: "Actions",
        accessor: ViewLink,
        width: 70,
      },
    ],
    []
  );

  return (
    <div>
      <Container className="userIndex">
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
            Logistics
          </Typography>
          {/* <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Typography color="textSecondary" variant="subtitle2">
            Orders 
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
             Learning Hub
            </Typography>
          </Breadcrumbs> */}

          <Button
            variant="contained"
            onClick={() => setOpenBulkPrintStatus(true)}
          >
            Update Print Status
          </Button>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner sessionsListClass learningHubOrders"
            >
              {logisticsListData ? (
                <EnhancedTable
                  columns={columns}
                  data={logisticsListData}
                  totalCount={logisticsListDataFound}
                  isLoading={isLoading}
                  manualGlobalFilter={true}
                  // singleStep={true}
                  search={search}
                  logisticSelect={true}
                  printStatus={printStatusSelected}
                  setPrintStatus={setPrintStatusSelected}
                  cardStatus={cardStatusSelected}
                  setCardStatus={setCardStatusSelected}
                  setSearch={setSearch}
                  limit={limit}
                  setLimit={setLimit}
                  currentPage={page}
                  setPage={setPage}
                  sortedBy={sortBy}
                  setSortedBy={setSortBy}
                  manualPagination={true}
                  manualSortBy={true}
                  setOpenGeneratePopup={setOpen}
                />
              ) : (
                <div
                  style={{
                    margin: "50vh 0",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              )}
            </Grid>
          </Card>
          <GenerateCard openPopup={open} setOpenPopup={setOpen} />
          <PrintStatus
            openPopup={openPrintStatus}
            setOpenPopup={setOpenPrintStatus}
            existingPrintStatus={printStatus}
            membershipId={membershipId}
          />
          {openBulkPrintStatus && (
            <BulkPrintStatus
              openPopup={openBulkPrintStatus}
              setOpenPopup={setOpenBulkPrintStatus}
            />
          )}

          <CardStatus
            openPopup={openCardStatus}
            setOpenPopup={setOpenCardStatus}
            existingCardStatus={cardStatus1}
            membershipId={membershipId}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Orders;
