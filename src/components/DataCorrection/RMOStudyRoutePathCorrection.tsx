import {
  Container,
  Grid,
  Box,
  Card,
  Button,
  Alert,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "src/store";
import { useEffect, useState, useMemo } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import FileDownload from "@material-ui/icons/FileDownload";
import { EditSharp, DeleteOutline, FileUpload } from "@material-ui/icons";
import ConfirmDelete from "../Override/ConfirmDelete";
import toast from "react-hot-toast";
import { deleteStudyRoutePath, exportStudyRoutePath, exportStudyRoutePathAll, getStudyRoutePath, importStudyRoutePath } from "src/store/actions/RMOStudyRoutePathAction";
import AddRMOStudyRoutePathPopup from "./correction-popup/AddRMOStudyRoutePathPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { PUT_OCCUPATION_STUDYROUTEPATH_LIST, DELETE_OCCUPATION_STUDYROUTEPATH, IMPORT_OCCUPATION_STUDYROUTEPATH, EXPORT_OCCUPATION_STUDYROUTEPATH, EXPORT_OCCUPATION_STUDYROUTEPATH_ALL, POST_OCCUPATION_STUDYROUTEPATH_LIST } from "src/store/RbacConstants";

export type Color = 'success' | 'info' | 'warning' | 'error';

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
    padding: "0"
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
interface StudyRoutePathObject {
  SrpId: number,
  SrregcarId: string,
  StreamId: number,
  StreamName: string,
  SubjectId: number,
  SubjectName: string,
  SrpOrder: number
}

export const RMOStudyRoutePathCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const Obj: { type: Color, message: string, details: string } = {
    type: 'success',
    message: '',
    details: ''
  }
  const [MessageObj, setMessage] = useState(Obj)
  const [isOpenStudyRoutePath, setIsOpenStudyRoutePath] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [SrpId, setSrpId] = useState(0);
  const [ExpendedIndex, setExpendedIndex] = useState(0);
  let msgType: Color = 'success';

  const displayMessage = (obj: { type: Color, message: string, details: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteStudyRoutePath(SrpId));
    let message = data?.message;
    console.log("=====>", data, error);
    if (error) {
      msgType = 'error';
      message = error?.message;
    }
    dispatch(getStudyRoutePath(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message, details: data?.message });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportStudyRoutePathAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportStudyRoutePath(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getStudyRoutePath(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const studyRoutePathData = useSelector(
    (state: any) => state?.getStudyRoutePathData?.StudyRoutePathResponse?.data
  )
  /**
    * GET ALL ALLOWED API List
    */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createStudyRoutePathPopup = () => {
    setSrpId(0)
    setIsOpenStudyRoutePath(!isOpenStudyRoutePath);
  }
  const editStudyRoutePathPopup = (SrpId: number = 0) => {
    setSrpId(SrpId)
    setIsOpenStudyRoutePath(!isOpenStudyRoutePath);
  }

  const ActionHandler = (row: StudyRoutePathObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_OCCUPATION_STUDYROUTEPATH_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editStudyRoutePathPopup(row?.SrpId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_OCCUPATION_STUDYROUTEPATH).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setSrpId(row?.SrpId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const columns = useMemo(
    () => [
      {
        Header: "Srp Id",
        accessor: "SrpId",
        width: 50,
      },
      {
        Header: "Srregcar Id",
        accessor: "SrregcarId",
        width: 100
      },
      {
        Header: "Stream",
        accessor: "StreamName",
        width: 80,
      },
      {
        Header: "Subject",
        accessor: "SubjectName",
        width: 100,
      },
      {
        Header: "Srp Order",
        accessor: "SrpOrder",
        width: 50
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 40
      }
    ],
    [ExpendedIndex, roleAllowedApis]
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
          {isOpenStudyRoutePath && <AddRMOStudyRoutePathPopup openImport={isOpenStudyRoutePath} setOpenImport={setIsOpenStudyRoutePath} SrpId={SrpId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importStudyRoutePath} refresh={getStudyRoutePath(page + 1, limit)} popupTitle="Import Study Route Path" />

          <Typography color="textPrimary" variant="h5">
            Study Route Path
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_OCCUPATION_STUDYROUTEPATH).length > 0)
              && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_STUDYROUTEPATH).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_STUDYROUTEPATH_ALL).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_OCCUPATION_STUDYROUTEPATH_LIST).length > 0)
              && <Button onClick={() => createStudyRoutePathPopup()}>Add Study Route Path</Button>}
              </div>
            </Grid>
          </Grid>
          {isMessage && (
            <Alert severity={MessageObj?.type}>
              {MessageObj?.message}<strong>!</strong>
            </Alert>)}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {studyRoutePathData && studyRoutePathData?.rows && studyRoutePathData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={studyRoutePathData?.rows}
                    totalCount={studyRoutePathData?.count}
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
  )
}