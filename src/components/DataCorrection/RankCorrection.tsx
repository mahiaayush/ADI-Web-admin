import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  Button,
  Alert,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "src/store";
import { useEffect, useState, useMemo } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import FileDownload from "@material-ui/icons/FileDownload";
import { EditSharp, DeleteOutline, FileUpload } from "@material-ui/icons";
import {
  getRankPages,
  exportRank,
  deleteRankMaster,
  exportAllRank,
  importRankMaster
} from "../../store/actions/getRankAction";
import { ImportPopup } from "./rank-master/ImportPopup";
import { EditRankPopup } from "./rank-master/AddRankPopup";
import ConfirmDelete from "../Override/ConfirmDelete";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { DELETE_RANK, EXPORT_RANK, EXPORT_RANK_ALL, IMPORT_RANK, POST_RANK_LIST, PUT_RANK_LIST } from "src/store/RbacConstants";

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
  tfoottop: {
    "& table": {
      "& tfoot": {
        position: "absolute",
        top: "0px",
        right: "0px"
      }
    }
  }
});

interface RankObject {
  RnkorgId: number;
  RnkorgName: string;
  Status: string;
}
export type Color = 'success' | 'info' | 'warning' | 'error';
const initMsgObj: { type: Color, message: string, details: string } = {
  type: 'success',
  message: '',
  details: ''
}
export const RankCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState(initMsgObj);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [RnkorgId, setRnkorgId] = useState(null);
  const [rnkorgName, setRnkorgName] = useState(null);
  const [status, setStatus] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportRank(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportRank", data, error);
  };
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllRank());
    console.log("exportAllRanking", data, error);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport);
  };
  const createRankPopup = () => {
    setOpenAdd(!openAdd);
  };
  const editRankPopup = () => {
    setOpenEdit(!openEdit);
  };

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getRankPages(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const rankData = useSelector(
    (state: any) => state?.getRank?.rankResponse?.data
  );
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )

  let msgType: Color = "success";
  const displayMessage = (obj: {
    type: Color;
    message: string;
    details: string;
  }) => {
    setIsMessage(true);
    setMessage(obj);
    setTimeout(() => {
      setIsMessage(false);
    }, 1000 * 5);
  };
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteRankMaster(RnkorgId));
    console.log("data", data, error)
    let message = data?.message;
    if (error) {
      msgType = "error";
      message = error?.message;
    }
    dispatch(getRankPages(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message, details: data?.message });
  };

  const ActionHandler = (row: RankObject) => {
    return (
      <hgroup style={{ display: "flex" }}>
        {(roleAllowedApis.filter(itm => itm.apiKey === PUT_RANK_LIST).length > 0)
        && <Button
          style={{ minWidth: '0px' }}
          onClick={() => {
            setRnkorgId(row?.RnkorgId);
            setRnkorgName(row?.RnkorgName);
            setStatus(row?.Status);
            seteditAddFlag(1);
            editRankPopup();
          }}
        >
          <EditSharp />
        </Button>}
        
        {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_RANK).length > 0)
        && <Button
          style={{ minWidth: '0px' }}
          onClick={() => {
            setRnkorgId(row?.RnkorgId);
            setConfirmDialog(true);
          }}
        >
          <DeleteOutline />
        </Button>}
      </hgroup>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Rankorg-Id",
        accessor: "RnkorgId",
        // disableSortBy: true,
        width: 50,
      },
      {
        Header: "Rankorg-Name",
        accessor: "RnkorgName",
        // disableSortBy: true,
        width: 60,
      },
      {
        Header: "Status",
        accessor: "Status",
        // disableSortBy: true,
        width: 40,
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 50,
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
          {/* <ImportPopup openImport={openImport} setOpenImport={setOpenImport} page_no={page} limit_no={limit} /> */}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importRankMaster} refresh={getRankPages(page + 1, limit)} popupTitle="Import Rank Master" />
          {openEdit && (
            <EditRankPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              rankorgId={RnkorgId}
              rankorgName={rnkorgName}
              statusValue={status}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Ranking Organisation
          </Typography>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_RANK).length > 0)
          && <>
            <FileUpload color="primary" fontSize="small" />
            <Button
              onClick={() => handleClickOpen()}
              className="file_import_export"
            >
              Import
            </Button>
          </>}
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_RANK).length > 0)
          && <>
            <FileDownload color="primary" fontSize="small" />
            <Button
              className="file_import_export"
              onClick={() => downloadExcel()}
            >
              Export
            </Button>
          </>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_RANK_ALL).length > 0)
          && <>
            <FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
              Export&nbsp;All
            </Button>
          </>}
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_RANK_LIST).length > 0)
              && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setRnkorgId(null);
                  setRnkorgName(null);
                  setStatus(null);
                  editRankPopup();
                  seteditAddFlag(0);
                }}
              >Add Rank
              </Button>}
            </div>
          </div>
          {isMessage && (
            <Alert severity={MessageObj?.type}>
              {MessageObj?.message}
              <strong>!</strong>
            </Alert>
          )}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {rankData && rankData?.rows && rankData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={rankData?.rows}
                    totalCount={rankData?.count}
                    limit={limit}
                    currentPage={page}
                    setPage={setPage}
                    setLimit={setLimit}
                    sortedBy={sortBy}
                    setSortedBy={setSortBy}
                    search={search}
                    setSearch={setSearch}
                    searchFilters={filters}
                    setFilters={setFilters}
                    manualPagination={true}
                    manualGlobalFilter={true}
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
