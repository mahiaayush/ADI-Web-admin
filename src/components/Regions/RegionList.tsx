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
import { getRegionListAction } from "src/store/actions/GetRegionListAction";
import AddCircleOutlineSharp from "@material-ui/icons/AddCircleOutlineSharp";
import AddRegion from "./AddRegion";
import UpdateRegion from "./UpdateRegion";
import UpdateRegionStatus from "./UpdateRegionStatus";
import ConfirmDelete from "../Override/ConfirmDelete";
import { ADMIN_API_ENDPOINT_V2, REGION_DATA } from "../../store/constants";
import http from "../../utils/http";
import { DELETE_REGION, PATCH_REGION, POST_REGION } from "src/store/RbacConstants";

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
  RegionName: string;
  Status: string;
  RegionId: number;
}

const RegionList = () => {
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
  const [updateStatusDialog, setUpdateStatusDialog] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [regionID, setregionID] = useState(null);
  const [regionStatus, setRegionStatus] = useState(null);
  const [error, setError] = useState("");
  const [existingData, setExistingData] = useState({ RegionName: '' });
  const classes = useStyles();
  const dispatch = useDispatch();
  let UniqueStatus = new Set();

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getRegionListAction(
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

  const regionListData = useSelector(
    (state: any) =>
      state?.GetRegionList?.getRegionListResponse?.data?.regionData
  );

  const allStatus = regionListData?.map((item) => item.Status);
  UniqueStatus = new Set(allStatus);

  const regionListDataFound = useSelector(
    (state: any) => state?.GetRegionList?.getRegionListResponse?.data?.found
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
          row.Status === "A"
            ? "status_badge status_badge_active"
            : row.Status === "I"
            ? "status_badge status_badge_inactive"
            : "status_badge status_badge_banned"
        }`}
      >
        {row.Status === "A" ? "Active" : "Inactive"}
      </span>
    );
  };

  const handleDelete = async () => {
    if (regionID) {
      const regionObj = {
        data: {
          regionId: regionID,
        },
      };
      let res;
      try {
        res = await http.delete(
          `${ADMIN_API_ENDPOINT_V2}${REGION_DATA}`,
          regionObj
        );
        console.log("resresres", res);
        if (res.data.status === true) {
          dispatch(
            getRegionListAction(
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
          {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_REGION).length > 0)
          && <MenuItem
            value="Remove"
            onClick={() => {
              setregionID(row.RegionId);
              setConfirmDialog(true);
            }}
          >
            <Button
              onClick={() => {
                setregionID(row.RegionId);
                setConfirmDialog(true);
              }}
            >
              Remove
            </Button>
          </MenuItem>}
          {(roleAllowedApis.filter(itm => itm.apiKey === PATCH_REGION).length > 0)
          && <>
          <MenuItem
            value="Update"
            onClick={() => {
              setregionID(row.RegionId);
              setRegionStatus(row.Status);
              setUpdateDialog(true);
            }}
          >
          <Button
            onClick={() => {
              setregionID(row.RegionId);
              setRegionStatus(row.Status);
              setExistingData({ RegionName: row.RegionName });
              setUpdateDialog(true);
            }}
          >
            Update
          </Button>
        </MenuItem>
        <MenuItem
          value="Update"
          onClick={() => {
            setregionID(row.RegionId);
            setRegionStatus(row.Status);
            setExistingData({ RegionName: row.RegionName });
            setUpdateStatusDialog(true);
          }}
        >
          <Button
            onClick={() => {
              setregionID(row.RegionId);
              setRegionStatus(row.Status);
              setUpdateStatusDialog(true);
            }}
          >
            {row.Status === "A" ? "Deactivate" : "Activate"}
          </Button>
        </MenuItem></>}
        </Select>
      </FormControl>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Region Name",
        accessor: "RegionName",
        width: 400,
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
            Region List
          </Typography>
          {(roleAllowedApis.filter(itm => itm.apiKey === POST_REGION).length > 0)
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
              {regionListData && regionListData.length > 0 ? (
                <div className="itemListSorting">
                  <EnhancedTable
                    columns={columns}
                    data={regionListData}
                    totalCount={regionListDataFound}
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
              <AddRegion addDialog={addDialog} setAddDialog={setAddDialog} />
            )}
            {updateDialog && (
              <UpdateRegion
                updateDialog={updateDialog}
                setUpdateDialog={setUpdateDialog}
                regionID={regionID}
                existingData={existingData}
              />
            )}
            {updateStatusDialog && (
              <UpdateRegionStatus
                updateStatusDialog={updateStatusDialog}
                setUpdateStatusDialog={setUpdateStatusDialog}
                existingRegionStatus={regionStatus}
                regionID={regionID}
              />
            )}
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default RegionList;
