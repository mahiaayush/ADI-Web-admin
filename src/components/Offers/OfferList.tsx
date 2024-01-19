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
import { makeStyles } from "@material-ui/core/styles";
import { useMemo, useState, useEffect } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { useDispatch, useSelector } from "../../store";
import { useNavigate } from "react-router";
import { getOfferListAction } from "src/store/actions/GetOfferListAction";
import AddCircleOutlineSharp from "@material-ui/icons/AddCircleOutlineSharp";
import AddOffer from "./AddOffer";
import ManageOffer from "./ManageOffer";
import UpdateCouponStatus from "./UpdateCouponStatus";
import ConfirmDelete from "../Override/ConfirmDelete";
import { getLocalTime } from "src/utils/utility";
import { ADMIN_API_ENDPOINT_V2, OFFER_DATA } from "../../store/constants";
import http from "../../utils/http";
import { DELETE_COUPON, GET_COUPON_DETAILS, PATCH_COUPON, POST_COUPON, POST_COUPON_MAPREGION } from "src/store/RbacConstants";

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
  OfferName: string;
  CouponStatus: string;
  CouponId: number;
  RegionId: number;
}

const OfferList = () => {
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
  const [updateStatusDialog, setUpdateStatusDialog] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [offerID, setofferID] = useState(null);
  const [offerStatus, setOfferStatus] = useState(null);
  const [regionID, setRegionID] = useState(null);
  const [error, setError] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let UniqueStatus = new Set();

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getOfferListAction(
        page + 1,
        limit,
        search,
        sortBy?.[0]?.id,
        sortBy?.[0]?.desc === undefined
          ? null
          : sortBy?.[0]?.desc
          ? "desc"
          : "asc"
      )
    ).then(() => setIsLoading(false));
  }, [page, search, limit, sortBy]);

  const offerListData = useSelector(
    (state: any) => state?.GetOfferList?.getOfferListResponse?.data?.data
  );
  const allStatus = offerListData?.map((item) => item.Status);
  UniqueStatus = new Set(allStatus);

  const offerListDataFound = useSelector(
    (state: any) => state?.GetOfferList?.getOfferListResponse?.data?.count
  );
  /**
    * GET ALL ALLOWED API List
    */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const Status = (row: UserObject) => {
    return (
      <span
        className={`${
          row.CouponStatus === "A"
            ? "status_badge status_badge_active"
            : row.CouponStatus === "I"
            ? "status_badge status_badge_inactive"
            : "status_badge status_badge_banned"
        }`}
      >
        {row.CouponStatus === "A" ? "Active" : "Inactive"}
      </span>
    );
  };
  const handleDelete = async () => {
    if (offerID) {
      const offerObj = {
        data: {
          couponId: offerID,
        },
      };
      let res;
      try {
        res = await http.delete(
          `${ADMIN_API_ENDPOINT_V2}${OFFER_DATA}`,
          offerObj
        );
        console.log("resresres", res);
        if (res.data.status === true) {
          dispatch(
            getOfferListAction(
              1,
              10,
              search,
              null,
              sortBy?.[0]?.desc === undefined
                ? null
                : sortBy?.[0]?.desc
                ? "desc"
                : "asc"
            )
          );
          setTimeout(() => {
            setAddDialog(false);
          }, 1000);
          setConfirmDialog(false);
        }
      } catch (error) {
        console.log("resresres", res);
        console.log("error", error);
        setError(error?.response?.data?.message);
      }
    }
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
          {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COUPON).length > 0)
          && <MenuItem
            value="Remove"
            onClick={() => {
              setofferID(row.CouponId);
              setConfirmDialog(true);
            }}
          >
            <Button
              onClick={() => {
                setofferID(row.CouponId);
                setConfirmDialog(true);
              }}
            >
              Remove
            </Button>
          </MenuItem>}
          {(roleAllowedApis.filter(itm => itm.apiKey === PATCH_COUPON).length > 0)
          && <>
          <MenuItem
            value="Update"
            onClick={() => {
              setofferID(row.CouponId);
              setRegionID(row.RegionId);
              setOfferStatus(row.CouponStatus);
              setUpdateDialog(true);
            }}
          >
            <Button
              onClick={() => {
                setofferID(row.CouponId);
                setRegionID(row.RegionId);
                setOfferStatus(row.CouponStatus);
                setUpdateDialog(true);
              }}
            >
              Update
            </Button>
          </MenuItem>
          <MenuItem
            value="Update"
            onClick={() => {
              setofferID(row.CouponId);
              setOfferStatus(row.CouponStatus);
              setUpdateStatusDialog(true);
            }}
          >
            <Button
              onClick={() => {
                setofferID(row.CouponId);
                setOfferStatus(row.CouponStatus);
                setUpdateStatusDialog(true);
              }}
            >
              {row.CouponStatus === "A" ? "Deactivate" : "Activate"}
            </Button>
          </MenuItem>
          </>}
          {(roleAllowedApis.filter(itm => itm.apiKey === GET_COUPON_DETAILS).length > 0)
          && <MenuItem
            value="Map Item"
            onClick={() => navigate(`/offers/${row.CouponId}`)}
            disabled={!row.CouponId}
          >
            <Button size="small" type="button" variant="text" color="primary">
              Coupon Detail
            </Button>
          </MenuItem>}
        </Select>
      </FormControl>
    );
  };
  const columns = useMemo(
    () => [
      {
        Header: "Coupon Code",
        accessor: "CouponCode",
        width: 70,
      },
      {
        Header: "Coupon Description",
        accessor: "CouponDescription",
        width: 100,
      },
      {
        Header: "Coupon Name",
        accessor: "CouponName",
        width: 100,
      },
      {
        Header: "Coupon Start Date",
        accessor: "CouponStartDate",
        Cell: (props) => getLocalTime(props.value)[9],
        width: 100,
      },
      {
        Header: "Coupon Expiry Date",
        accessor: "CouponExpiryDate",
        Cell: (props) => getLocalTime(props.value)[9],
        width: 100,
      },
      {
        Header: "Status",
        accessor: Status,
        disableSortBy: UniqueStatus.size === 1,
        width: 100,
      },
      {
        Header: "Actions",
        id: " ",
        accessor: ViewLink,
        disableSortBy: true,
        width: 100,
      },
    ],
    [UniqueStatus, roleAllowedApis]
  );

  return (
    <div>
      <Container className="userIndex">
        {confirmDialog && (
          <ConfirmDelete
            open={confirmDialog}
            onClose={() => {
              setConfirmDialog(false);
              setError("");
            }}
            onSubmit={() => handleDelete()}
            error={error}
          />
        )}
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
            Coupons
          </Typography>
          {(roleAllowedApis.filter(itm => itm.apiKey === POST_COUPON).length > 0)
          && <Tooltip title="Add" className={classes.usertooltip}>
            <IconButton
              aria-label="add"
              size="small"
              onClick={() => setAddDialog(true)}
            >
              <AddCircleOutlineSharp color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>}
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {offerListData && offerListData.length > 0 ? (
                <div className="itemListSorting">
                  <EnhancedTable
                    columns={columns}
                    data={offerListData}
                    totalCount={offerListDataFound}
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
            {addDialog && (
              <AddOffer addDialog={addDialog} setAddDialog={setAddDialog} />
            )}
            {updateDialog && (
              <ManageOffer
                updateDialog={updateDialog}
                setUpdateDialog={setUpdateDialog}
                offerID={offerID}
              />
            )}
            {updateStatusDialog && (
              <UpdateCouponStatus
                updateStatusDialog={updateStatusDialog}
                setUpdateStatusDialog={setUpdateStatusDialog}
                existingOfferStatus={offerStatus}
                offerID={offerID}
              />
            )}
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default OfferList;
