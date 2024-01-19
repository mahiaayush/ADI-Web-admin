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
import { useDispatch, useSelector } from "../../store";
import { getVpaListAction } from "src/store/actions/GetVpaListAction";
import AddCircleOutlineSharp from "@material-ui/icons/AddCircleOutlineSharp";
import AddVPA from "./AddVPA";
import UpdateVPA from "./UpdateVPA";
import UpdateVpaStatus from "./UpdateVpaStatus";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import UpdateIcon from '@material-ui/icons/Update';
import ConfirmDelete from "../Override/ConfirmDelete";
import type { ChangeEvent } from "react";
import {
    ADMIN_API_ENDPOINT_V2, VPA_DATA
  } from '../../store/constants';
  import http from "../../utils/http";
import { DELETE_VPA, PATCH_VPA, POST_VPA } from "src/store/RbacConstants";

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
  VpaName: string;
  Status: string;
  VpaId: number;
  RegionId: number;
  VpaAccountNumber: string;
  IfscCode: string;
  BankName: string;
  IsVpaAssigned: boolean;
}

const VpaList = () => {
  const [addDialog, setAddDialog] = useState<boolean>(false);
  const [updateDialog, setUpdateDialog] = useState<boolean>(false);
  const [updateStatusDialog, setUpdateStatusDialog] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [vpaID, setvpaID] = useState(null);
  const [vpaStatus, setVpaStatus] = useState(null);
  const [error, setError] = useState('');
  const [existingData, setExistingData] = useState({
    REGION_ID: null,
    VPA_ACC_NO: "",
    IFSC_CODE: "",
    BANK_NAME: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  let UniqueStatus = new Set();

  useEffect(() => {
    setIsLoading(true);
    dispatch(
        getVpaListAction(  
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

  const vpaListData = useSelector(
    (state: any) =>
      state?.GetVpaList?.getVpaListResponse?.data?.vpaData
  );

  const allStatus = vpaListData?.map((item) => item.Status);
  UniqueStatus = new Set(allStatus);

  const vpaListDataFound = useSelector(
    (state: any) =>
      state?.GetVpaList?.getVpaListResponse?.data?.found
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
    if (vpaID) {
        const vpaObj = {
            data: {
                "vpaId": vpaID,
            }
          }
          let res;
          try {
            res = await http.delete(
              `${ADMIN_API_ENDPOINT_V2}${VPA_DATA}`,
              vpaObj,
            );
            console.log("resresres", res);
            if (res.data.status === true) {
              dispatch(
                getVpaListAction(
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
            setError(error?.response?.data?.message)
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
          {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_VPA).length > 0)
          && <MenuItem
            value="Remove"
            onClick={() => {
              setvpaID(row.VpaId);
              setConfirmDialog(true);
            }}
          >
            <Button
              onClick={() => {
                setvpaID(row.VpaId);
                setConfirmDialog(true);
              }}
            >
              Remove
            </Button>
          </MenuItem>}
          {(roleAllowedApis.filter(itm => itm.apiKey === PATCH_VPA).length > 0)
          && <>
          {!row.IsVpaAssigned && <MenuItem
            value="Update"
            onClick={() => {
              setvpaID(row.VpaId);
              setVpaStatus(row.Status);
              setUpdateDialog(true);
            }}
          >
            <Button
             onClick={() => {
              setvpaID(row.VpaId);
              setVpaStatus(row.Status);
              setExistingData({
                REGION_ID: row.RegionId,
                VPA_ACC_NO: row.VpaAccountNumber,
                IFSC_CODE: row.IfscCode,
                BANK_NAME: row.BankName,
              });
              setUpdateDialog(true);
            }}
            >
              Update
            </Button>
          </MenuItem>}
          <MenuItem
            value="Update"
            onClick={() => {
              setvpaID(row.VpaId);
              setVpaStatus(row.Status);
              setUpdateStatusDialog(true);
            }}
          >
            <Button
              onClick={() => {
                setvpaID(row.VpaId);
                setVpaStatus(row.Status);
                setUpdateStatusDialog(true);
              }}
            >
              {row.Status === "A" ? "Deactivate" : "Activate"}
            </Button>
          </MenuItem>
          </>}
        </Select>
      </FormControl>
    );
  };
  const columns = useMemo(
    () => [
      {
        Header: "VPA Account Number",
        accessor: "VpaAccountNumber",
        width: 200,
      },
      {
        Header: "IFSC Code",
        accessor: "IfscCode",
        width: 100,
      },
      {
        Header: "Bank Name",
        accessor: "BankName",
        width: 100,
      },
      {
        Header: "Region Name",
        accessor: "RegionName",
        width: 100,
      },
      {
        Header: "Status",
        accessor: Status,
        disableSortBy: UniqueStatus.size === 1,
        width: 100,
      },
      {
        Header: 'Actions',
        id: ' ',
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
            onClose={() => { setConfirmDialog(false); setError("") }}
            onSubmit={() => handleDelete()}
            error={error}
          />
        )}
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
          Virtual Payment Address 
          </Typography>
          {(roleAllowedApis.filter(itm => itm.apiKey === POST_VPA).length > 0)
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
              {vpaListData && vpaListData.length > 0 ? (
                <div className="itemListSorting">
                  <EnhancedTable
                    columns={columns}
                    data={vpaListData}
                    totalCount={vpaListDataFound}
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
              <AddVPA addDialog={addDialog} setAddDialog={setAddDialog} />
            )}
             {updateDialog && (
              <UpdateVPA updateDialog={updateDialog} setUpdateDialog={setUpdateDialog} vpaID={vpaID} existingData={existingData} />
            )}
             {updateStatusDialog && (
              <UpdateVpaStatus updateStatusDialog={updateStatusDialog} setUpdateStatusDialog={setUpdateStatusDialog} existingVpaStatus={vpaStatus} vpaID={vpaID} />
            )}
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default VpaList;
