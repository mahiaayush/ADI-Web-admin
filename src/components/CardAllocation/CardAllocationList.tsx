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
import { getCardAllocationListAction } from "src/store/actions/GetCardAllocationListAction";
import AddCircleOutlineSharp from "@material-ui/icons/AddCircleOutlineSharp";
import AddCardAllocation from "./AddCardAllocation";
// import UpdateState from "./UpdateState";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import UpdateIcon from '@material-ui/icons/Update';
import ConfirmDelete from "../Override/ConfirmDelete";
import type { ChangeEvent } from "react";
import {
    ADMIN_API_ENDPOINT_V2, STATE_DATA
  } from '../../store/constants';
  import http from "../../utils/http";

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
    SellerName: string;
    LotCode: string;
//   StateId: number;
//   RegionId: number;
//   StateCode: string;
}

const CardAllocationList = () => {
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
//   let UniqueStatus = new Set();

  useEffect(() => {
    setIsLoading(true);
    dispatch(
        getCardAllocationListAction(  
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

//   const cardAllocationListData = useSelector(
//     (state: any) =>
//       state?.GetCardAllocationList?.getCardAllocationListResponse?.data
//   );

  const cardAllocationListData = [
    { SellerName: "Aravind Pandit", LotCode: "LFRE234556" },
    { SellerName: "Hemant Pandey", LotCode: "LFRE965556" },
  ];
//   const allStatus = cardAllocationListData?.map((item) => item.Status);
//   UniqueStatus = new Set(allStatus);

//   const cardAllocationListDataFound = useSelector(
//     (state: any) =>
//       state?.GetCardAllocationList?.getCardAllocationListResponse?.data?.found
//   );

  const cardAllocationListDataFound = 2

//   const Status = (row: UserObject) => {
//     return (
//       <span
//         className={`${
//           row.Status === "A"
//             ? "status_badge status_badge_active"
//             : row.Status === "I"
//             ? "status_badge status_badge_inactive"
//             : "status_badge status_badge_banned"
//         }`}
//       >
//         {row.Status === "A" ? "Active" : "Inactive"}
//       </span>
//     );
//   };
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
                getCardAllocationListAction(
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

//   const ViewLink = (row: UserObject) => {
//     return (
//       <FormControl size="small" variant="outlined">
//         <InputLabel
//           id="demo-simple-select-outlined-label"
//           className="ActionButtonSessions"
//         >
//           Action
//         </InputLabel>
//         <Select
//           labelId="demo-simple-select-outlined-label"
//           id="demo-simple-select-outlined"
//           label="Action"
//           value="icon"
//           className="selectAction"
//         >
//           <MenuItem value="icon">
//             {" "}
//             <MoreHorizRoundedIcon />{" "}
//           </MenuItem>
//           <MenuItem
//             value="Remove"
//             onClick={() => {
//               setstateID(row.StateId);
//               setConfirmDialog(true);
//             }}
//           >
//             <Button
//               onClick={() => {
//                 setstateID(row.StateId);
//                 setConfirmDialog(true);
//               }}
//             >
//               Remove
//             </Button>
//           </MenuItem>
//           <MenuItem
//             value="Update"
//             onClick={() => {
//               setstateID(row.StateId);
//               setRegionID(row.RegionId);
//               setStateStatus(row.Status);
//               setExistingData({ StateName: row.StateName, StateCode: row.StateCode });
//               setUpdateDialog(true);
//             }}
//           >
//             <Button
//               onClick={() => {
//                 setstateID(row.StateId);
//                 setRegionID(row.RegionId);
//                 setStateStatus(row.Status);
//                 setExistingData({ StateName: row.StateName, StateCode: row.StateCode });
//                 setUpdateDialog(true);
//               }}
//             >
//               Update
//             </Button>
//           </MenuItem>
//         </Select>
//       </FormControl>
//     );
//   };

  const columns = useMemo(
    () => [
      {
        Header: "Seller Name",
        accessor: "SellerName",
        width: 400,
      },
      {
        Header: "Lot Code",
        accessor: "LotCode",
        width: 400,
      },
    //   {
    //     Header: "Status",
    //     accessor: Status,
    //     disableSortBy: UniqueStatus.size === 1,
    //     width: 100,
    //   },
    //   {
    //     Header: 'Actions',
    //     id: ' ',
    //     accessor: ViewLink,
    //     disableSortBy: true,
    //     width: 100
    // },
    ],
    []
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
            Card Allocation
          </Typography>
          <Tooltip title="Add" className={classes.usertooltip}>
            <IconButton
              aria-label="add"
              size="small"
              onClick={() => setAddDialog(true)}
            >
              <AddCircleOutlineSharp color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Card>
           
            {addDialog && (
              <AddCardAllocation addDialog={addDialog} setAddDialog={setAddDialog} />
            )}
             {/* {updateDialog && (
              <UpdateState updateDialog={updateDialog} setUpdateDialog={setUpdateDialog} stateID={stateID} existingData={existingData} />
            )} */}
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default CardAllocationList;
