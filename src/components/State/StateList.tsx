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
  Select
} from "@material-ui/core";
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import { makeStyles } from "@material-ui/core/styles";
import { useMemo, useState, useEffect } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { RootStateOrAny } from "react-redux";
import { useDispatch, useSelector } from "../../store";
import { getStateListAction } from "src/store/actions/GetStateListAction";
import AddCircleOutlineSharp from "@material-ui/icons/AddCircleOutlineSharp";
import AddState from "./AddState";
import UpdateState from "./UpdateState";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import UpdateIcon from '@material-ui/icons/Update';
import ConfirmDelete from "../Override/ConfirmDelete";
import type { ChangeEvent } from "react";
import {
    ADMIN_API_ENDPOINT_V2, STATE_DATA
  } from '../../store/constants';
  import http from "../../utils/http";
import { DELETE_MASTER_STATE, PATCH_MASTER_STATE, POST_MASTER_STATE } from "src/store/RbacConstants";

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
  StateName: string;
  Status: string;
  StateId: number;
  RegionId: number;
  StateCode: string;
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
  const [stateID, setstateID] = useState(null);
  const [stateStatus, setStateStatus] = useState(null);
  const [regionID, setRegionID] = useState(null);
  const [existingData, setExistingData] = useState({ StateName: '', StateCode: '' });
  const [error, setError] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  let UniqueStatus = new Set();

  useEffect(() => {
    setIsLoading(true);
    dispatch(
        getStateListAction(  
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

  const stateListData = useSelector(
    (state: any) =>
      state?.GetStateList?.getStateListResponse?.data?.stateData
  );

  const allStatus = stateListData?.map((item) => item.Status);
  UniqueStatus = new Set(allStatus);

  const stateListDataFound = useSelector(
    (state: any) =>
      state?.GetStateList?.getStateListResponse?.data?.found
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
    if (stateID) {
        const stateObj = {
            data: {
                "stateId": stateID,
            }
          }
          let res;
          try {
            res = await http.delete(
              `${ADMIN_API_ENDPOINT_V2}${STATE_DATA}`,
              stateObj,
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
          {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_MASTER_STATE).length > 0)
          && <MenuItem
            value="Remove"
            onClick={() => {
              setstateID(row.StateId);
              setConfirmDialog(true);
            }}
          >
            <Button
              onClick={() => {
                setstateID(row.StateId);
                setConfirmDialog(true);
              }}
            >
              Remove
            </Button>
          </MenuItem>}
          {(roleAllowedApis.filter(itm => itm.apiKey === PATCH_MASTER_STATE).length > 0)
          && <MenuItem
            value="Update"
            onClick={() => {
              setstateID(row.StateId);
              setRegionID(row.RegionId);
              setStateStatus(row.Status);
              setExistingData({ StateName: row.StateName, StateCode: row.StateCode });
              setUpdateDialog(true);
            }}
          >
            <Button
              onClick={() => {
                setstateID(row.StateId);
                setRegionID(row.RegionId);
                setStateStatus(row.Status);
                setExistingData({ StateName: row.StateName, StateCode: row.StateCode });
                setUpdateDialog(true);
              }}
            >
              Update
            </Button>
          </MenuItem>}
        </Select>
      </FormControl>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "State Name",
        accessor: "StateName",
        width: 400,
      },
      {
        Header: "State Code",
        accessor: "StateCode",
        width: 400,
      },
      {
        Header: 'Actions',
        id: ' ',
        accessor: ViewLink,
        disableSortBy: true,
        width: 100
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
            State List
          </Typography>
          {(roleAllowedApis.filter(itm => itm.apiKey === POST_MASTER_STATE).length > 0)
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
              {stateListData && stateListData.length > 0 ? (
                <div className="itemListSorting">
                  <EnhancedTable
                    columns={columns}
                    data={stateListData}
                    totalCount={stateListDataFound}
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
              <AddState addDialog={addDialog} setAddDialog={setAddDialog} />
            )}
             {updateDialog && (
              <UpdateState updateDialog={updateDialog} setUpdateDialog={setUpdateDialog} stateID={stateID} existingData={existingData} />
            )}
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default StateList;
