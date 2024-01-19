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
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { useMemo, useState, useEffect } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { RootStateOrAny } from "react-redux";
import { useDispatch, useSelector } from "../../store";
import { getStateListAction } from "src/store/actions/GetStateListAction";
import { GetSellerMetaDataAction } from "src/store/actions/GetSellerMetaDataAction";
import { getRegionListAction } from "src/store/actions/GetRegionListAction";
import { GetSellerDataAction } from "src/store/actions/GetSellerDataAction";
import AddCircleOutlineSharp from "@material-ui/icons/AddCircleOutlineSharp";
import AddSeller from "./AddSeller";
import ManageMeta from "./ManageMeta";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import UpdateIcon from "@material-ui/icons/Update";
import ConfirmDelete from "../Override/ConfirmDelete";
import type { ChangeEvent } from "react";
import { ADMIN_API_ENDPOINT_V2, STATE_DATA } from "../../store/constants";
import http from "../../utils/http";
import moment from "moment";
import { PATCH_SELLER_META, POST_SELLER_META } from "src/store/RbacConstants";

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

interface Target {
  Target: number;
  CashCapping: number;
  MetaId: number;
  TargetMonth: string;
}
interface UserObject {
  SellerName: string;
  SellerEmail: string;
  RegionName: string;
  UserSid: string;
  target: Array<Target>;
}

const StateList = () => {
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState<number>();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [userSid, setuserSid] = useState(null);
  const [stateStatus, setStateStatus] = useState(null);
  const [regionID, setRegionID] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(GetSellerMetaDataAction(page + 1,
      limit,
      search,
      sortBy?.[0]?.id,
      sortBy?.[0]?.desc === undefined
        ? null
        : sortBy?.[0]?.desc
        ? "desc"
        : "asc")).then(() => setIsLoading(false));
  }, [page, search, limit, sortBy]);

  useEffect(() => {
    dispatch(getRegionListAction(null, null, null, null, null, 'A'));
  }, []);
  useEffect(() => {
    dispatch(GetSellerDataAction());
  }, []);

  const sellerListMetaData = useSelector(
    (state: any) =>
      state?.GetSellerMetaData?.getSellerMetaDataResponse?.data?.data?.data
  );
  const sellerListMetaDataFound = useSelector(
    (state: any) =>
      state?.GetSellerMetaData?.getSellerMetaDataResponse?.data?.data?.count
  );
  /**
    * GET ALL ALLOWED API List
    */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const handleDelete = async () => {
    if (userSid) {
      const stateObj = {
        data: {
          stateId: userSid,
        },
      };
      let res;
      try {
        res = await http.delete(
          `${ADMIN_API_ENDPOINT_V2}${STATE_DATA}`,
          stateObj
        );
        console.log("resresres", res);
        if (res.data.status === true) {
          dispatch(
            getStateListAction(
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
      }
    }
  };

  const Target = (row: UserObject) => {
    const data = row.target;
    const today = new Date();
    const tdate = moment(today).format("YYYY-MM-DD");
    let future = 0;
    let current = 0;
    let prev = 0;
    data.map((item) => (item?.TargetMonth.substring(0, 7) > tdate.substring(0, 7)
        ? future++
        : item?.TargetMonth.substring(0, 7) < tdate.substring(0, 7)
        ? prev++
        : current++));

    return (
      <>
        {prev > 0 ? (
          <CheckIcon style={{ color: "green" }} />
        ) : (
          <CloseIcon style={{ color: "black" }} />
        )}{" "}
        &nbsp;
        {current > 0 ? (
          <CheckIcon style={{ color: "green" }} />
        ) : (
          <CloseIcon style={{ color: "black" }} />
        )}{" "}
        &nbsp;
        {future > 0 ? (
          <CheckIcon style={{ color: "green" }} />
        ) : (
          <CloseIcon style={{ color: "black" }} />
        )}
      </>
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
          {(roleAllowedApis.filter(itm => itm.apiKey === PATCH_SELLER_META).length > 0)
          && <MenuItem
            value="Update"
            onClick={() => {
              setuserSid(row.UserSid);
              setUpdateDialog(true);
            }}
          >
            <Button
              onClick={() => {
                setuserSid(row.UserSid);
                setUpdateDialog(true);
              }}
            >
              Manage Meta
            </Button>
          </MenuItem>}
        </Select>
      </FormControl>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Seller Name",
        accessor: "SellerName",
        width: 100,
      },
      {
        Header: "Seller Email",
        accessor: "SellerEmail",
        width: 100,
      },
      {
        Header: "Region Name",
        accessor: "RegionName",
        width: 100,
      },
      {
        Header: "Target(Previous/Current/Next)",
        accessor: Target,
        width: 150,
      },
      {
        Header: "Actions",
        id: " ",
        accessor: ViewLink,
        disableSortBy: true,
        width: 100,
      },
    ],
    [roleAllowedApis]
  );

  return (
    <div>
      <Container className="userIndex">
        {confirmDialog && (
          <ConfirmDelete
            open={confirmDialog}
            onClose={() => setConfirmDialog(false)}
            onSubmit={() => handleDelete()}
          />
        )}
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
            Seller List
          </Typography>
          {(roleAllowedApis.filter(itm => itm.apiKey === POST_SELLER_META).length > 0)
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
              {sellerListMetaData && sellerListMetaData.length > 0 ? (
                <div className="itemListSorting">
                  <EnhancedTable
                    columns={columns}
                    data={sellerListMetaData}
                    totalCount={sellerListMetaDataFound}
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
              <AddSeller addDialog={addDialog} setAddDialog={setAddDialog} />
            )}
            {updateDialog && (
              <ManageMeta
                updateDialog={updateDialog}
                setUpdateDialog={setUpdateDialog}
                userSid={userSid}
              />
            )}
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default StateList;
