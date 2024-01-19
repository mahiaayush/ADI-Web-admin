import { useState, useReducer, useEffect, useMemo } from "react";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Breadcrumbs,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "../../../store";
import type { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineSharp from "@material-ui/icons/AddCircleOutlineSharp";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import AddPlan from "./AddPlan";
import ShowStudent from "./ShowStudent";
import { getEntityItemDetail } from "../../../store/actions/GetEntityItemDetailAction";
import ItemMap from "../../ItemMaster/ItemMap";
import EnhancedTable from "../../common/dataTable/EnhancedTable";
import { getLocalTime } from "src/utils/utility";
// interface EntityPlanDtailsProps {
//   lstEntity: any;
// }

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
  ZohoPlanId: string;
  Status: string;
  UsedSeats: number;
  UnUsedSeats: number;
  NumUsers: number;
  TransactionId: string;
  Items: Array<any>;
  EntityPackageId: string;
  ItemName: string;
  StartDate: Date;
  EndDate: Date;
}

const EntityPlanDetails = (props) => {
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [newPlans, forceUpdate] = useReducer((x) => x + 1, 0);
  const [addDialog1, setAddDialog1] = useState<boolean>(false);
  const [newPlans1, forceUpdate1] = useReducer((x) => x + 1, 0);
  const [itemId, setItemID] = useState({
    items: [],
    zohoplanId: "",
    unUsedSeat: 0,
    transactionId: "",
    pkgID: "",
  });
  const [zohoPlanId, setZohoPlanId] = useState("");
  const [entityPackageId, setEntityPackageId] = useState("");
  const [showAction, setShowAction] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  let UniqueStatus = new Set();
  // const { lstEntity } = props;
  const handlePlusButton = (pkgId) => {
    // setItemID({ itemId: itemid, zohoplanId: zohoplanid, unUsedSeat: unusedSeat, transactionId: tranid })
    // setZohoPlanId(zohoplanid)
    setEntityPackageId(pkgId);

    setAddDialog(true);
  };
  const handlePlusButton1 = (item, zohoplanid, unusedSeat, tranid, pkgId) => {
    setItemID({
      items: item,
      zohoplanId: zohoplanid,
      unUsedSeat: unusedSeat,
      transactionId: tranid,
      pkgID: pkgId,
    });
    setZohoPlanId(zohoplanid);
    setAddDialog1(true);
  };
  const url = window.location.href;
  const entityId = url.substring(url.lastIndexOf("/") + 1);

  // useEffect(() => {
  //   dispatch(getEntityItemDetail(entityId, 1, limit, search));
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getEntityItemDetail(entityId, page + 1, limit, search)).then(() =>
      setIsLoading(false));
  }, [page, search, limit]);

  const entityItemDetail = useSelector(
    (state) => state?.entityItemDetail?.entityItemDetail?.data?.data
  );
  const allStatus = entityItemDetail?.map((item) => item.Status);
  UniqueStatus = new Set(allStatus);

  const entityItemDetailFound = useSelector(
    (state) => state?.entityItemDetail?.entityItemDetail?.data?.found
  );

  const startDate = (row: UserObject) => {
    return getLocalTime(row.StartDate)[0].replaceAll("/", "-");
  };
  const endDate = (row: UserObject) => {
    return getLocalTime(row.EndDate)[0].replaceAll("/", "-");
  };
  const Status = (row: UserObject) => {
    return (
      <span
        className={`${
          row.Status === "A"
            ? "status_badge status_badge_active"
            : "status_badge status_badge_banned"
        }`}
      >
        {row.Status === "A"
          ? "Active"
          : row.Status === "I"
          ? "Inactive"
          : "Expired"}
      </span>
    );
  };

  const Action = (row: UserObject) => {
    return (
      <>
        <FormControl size="small" variant="outlined">
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Action"
            value="icon"
            className="selectAction"
            style={{ borderRadius: 200 }}
          >
            <MenuItem value="icon">
              {" "}
              <MoreHorizRoundedIcon />{" "}
            </MenuItem>
            <MenuItem
              value="Add License"
              onClick={() =>
                handlePlusButton1(
                  row.Items,
                  row.ZohoPlanId,
                  row.UnUsedSeats,
                  row.TransactionId,
                  row.EntityPackageId
                )}
              disabled={props.Type !== "SCHOOL" || props.StudentCount === 0 || row.Items.length === 0 || row.Status === "E"}
            >
              <Button
                size="small"
                type="button"
                variant="text"
                color="primary"
                // onClick={() =>
                //   handlePlusButton1(
                //     row.Items,
                //     row.ZohoPlanId,
                //     row.UnUsedSeats,
                //     row.TransactionId,
                //     row.EntityPackageId
                //   )}
                // disabled={props.Type !== "SCHOOL" || props.StudentCount === 0 || row.Items.length === 0 || row.Status === "E"}
              >
                Assign User
              </Button>
            </MenuItem>
            <MenuItem
              value="Map Item"
              onClick={() =>
                handlePlusButton(
                  row.EntityPackageId
                  // item.ZohoPlanId,
                  // item.UnUsedSeats,
                  // item.TransactionId
                )}
              disabled={row.UsedSeats === row.NumUsers || row.Status === "E"}
            >
              <Button
                size="small"
                type="button"
                variant="text"
                color="primary"
                // onClick={() =>
                //   handlePlusButton(
                //     row.EntityPackageId
                //     // item.ZohoPlanId,
                //     // item.UnUsedSeats,
                //     // item.TransactionId
                //   )}
                // disabled={row.UsedSeats === row.NumUsers || row.Status === "E"}
              >
                Map Item
              </Button>
            </MenuItem>
          </Select>
        </FormControl>
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Transaction ID",
        accessor: "TransactionId",
      },
      {
        Header: "Zoho Plan Name",
        accessor: "ZohoPlanName",
      },
      {
        Header: "Total Seat",
        accessor: "NumUsers",
      },
      {
        Header: "Used Seat",
        accessor: "UsedSeats",
      },
      {
        Header: "License Start Date",
        accessor: startDate,
      },
      {
        Header: "License End Date",
        accessor: endDate,
      },
      {
        Header: "Status",
        accessor: Status,
        disableSortBy: UniqueStatus.size === 1,
      },
      {
        Header: "Action",
        accessor: Action,
        disableSortBy: true,
      },
    ],
    [UniqueStatus]
  );

  return (
    <Card>
      {addDialog && (
        <AddPlan
          open={addDialog}
          pkgID={entityPackageId}
          onClose={() => setAddDialog(false)}
          onSubmit={() => forceUpdate()}
        />
      )}
      {addDialog1 && (
        <ShowStudent
          open={addDialog1}
          itemId={itemId}
          onClose={() => setAddDialog1(false)}
          onSubmit={() => forceUpdate1()}
        />
      )}
      <div>
        <Container className="userIndex">
          <Grid item xs={12} position="relative" className={classes.topheader}>
            <Typography color="textPrimary" variant="h5">
              Manage License
            </Typography>
            <Tooltip title="Add" className={classes.usertooltip}>
              <IconButton
                aria-label="add"
                size="small"
                onClick={() => setOpen(true)}
              >
                <AddCircleOutlineSharp color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Card>
              <Grid
                item
                className="counsellorApplicationListTable filterdataContner sessionsListClass"
              >
                {entityItemDetail && entityItemDetail.length > 0 ? (
                  <EnhancedTable
                    columns={columns}
                    data={entityItemDetail}
                    totalCount={entityItemDetailFound}
                    isLoading={isLoading}
                    manualGlobalFilter={true}
                    // singleStep={true}
                    search={search}
                    setSearch={setSearch}
                    limit={limit}
                    setLimit={setLimit}
                    currentPage={page}
                    setPage={setPage}
                    //   rating={rating}
                    //   setRating={setRating}
                    manualPagination={true}
                    //   setStartDate={setStartDate}
                    //   setEndDate={setEndDate}
                  />
                ) : (
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
                  />
                )}
              </Grid>
            </Card>
          </Box>
        </Container>
      </div>
      <ItemMap
        openPopupItemMap={open}
        setOpenPopupItemMap={setOpen}
        itemId={itemId}
        SchoolName={props.SchoolName}
      />
    </Card>
  );
};

export default EntityPlanDetails;
