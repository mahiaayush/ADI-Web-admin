import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  Button,
  Alert
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "src/store";
import { useEffect, useState, useMemo } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import FileDownload from "@material-ui/icons/FileDownload";
import { EditSharp, DeleteOutline, FileUpload } from "@material-ui/icons";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import ConfirmDelete from "../Override/ConfirmDelete";
import toast from "react-hot-toast";
import AddAccrediationMasterPopup from "./correction-popup/AddAccrediationMasterPopup";
import { deleteAccrediationMaster, exportAccrediationMaster, exportAccrediationMasterAll, getAccrediationMaster, importAccrediationMaster } from "src/store/actions/AccrediationAction";
import { DELETE_ACCREDIATION, EXPORT_ACCREDIATION, EXPORT_ACCREDIATION_ALL, IMPORT_ACCREDIATION, POST_ACCREDIATION_LIST, PUT_ACCREDIATION_LIST } from "src/store/RbacConstants";

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

interface AccrediationMasterObj {
  AccrediationId: number,
  AccrediationTitle: string
}
export type Color = 'success' | 'info' | 'warning' | 'error';
export const AccrediationMasterCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const Obj: { type: Color, message: string } = {
    type: 'success',
    message: ''
  }
  const [messageObj, setMessage] = useState(Obj);
  const [isOpenAccrediationMaster, setIsOpenAccrediationMaster] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [AccrediationId, setAccrediationId] = useState(0)
  let msgType: Color = 'success';

  const displayMessage = (obj: { type: Color, message: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 3000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteAccrediationMaster(AccrediationId));
    let message = data?.message;
    if (error) {
      msgType = 'error';
      message = error?.message || error?.errorMessage
    }
    dispatch(getAccrediationMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportAccrediationMasterAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportAccrediationMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const IntervalIdentifier = setTimeout(() => {
      console.log("filters", search)
      dispatch(getAccrediationMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const accrediationContentData = useSelector(
    (state: any) => state?.getAccrediationMaster?.AccrediationMasterResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createAccrediationMasterPopup = () => {
    setAccrediationId(0)
    setIsOpenAccrediationMaster(!isOpenAccrediationMaster);
  }
  const editAccrediationMasterPopup = (AccrediationId: number = 0) => {
    setAccrediationId(AccrediationId)
    setIsOpenAccrediationMaster(!isOpenAccrediationMaster);
  }
  const ActionHandler = (row: AccrediationMasterObj) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_ACCREDIATION_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editAccrediationMasterPopup(row?.AccrediationId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_ACCREDIATION).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setAccrediationId(row?.AccrediationId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const columns = useMemo(
    () => [
      {
        Header: "Accrediation Id",
        accessor: "AccrediationId",
        width: 30,
      },
      {
        Header: "Accrediation Title",
        accessor: "AccrediationTitle",
        width: 100,
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 60
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
          {isOpenAccrediationMaster && <AddAccrediationMasterPopup openImport={isOpenAccrediationMaster} setOpenImport={setIsOpenAccrediationMaster} AccrediationId={AccrediationId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importAccrediationMaster} refresh={getAccrediationMaster(page, limit)} popupTitle="Import Accrediation-Master" />

          <Typography color="textPrimary" variant="h5">
            Master Accreditation
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_ACCREDIATION).length > 0)
              && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_ACCREDIATION).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_ACCREDIATION_ALL).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_ACCREDIATION_LIST).length > 0)
      && <Button onClick={() => createAccrediationMasterPopup()}>Add Accreditation</Button>}
              </div>
            </Grid>
          </Grid>
          {isMessage && (
            <Alert severity={messageObj?.type}>
              {messageObj?.message}<strong>!</strong>
            </Alert>)}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {accrediationContentData && accrediationContentData?.rows && accrediationContentData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    searchFilters={filters}
                    setFilters={setFilters}
                    isLoading={isLoading}
                    columns={columns}
                    data={accrediationContentData?.rows}
                    totalCount={accrediationContentData?.count}
                    limit={limit}
                    setLimit={setLimit}
                    sortedBy={sortBy}
                    setSortedBy={setSortBy}
                    search={search}
                    setSearch={setSearch}
                    manualPagination={true}
                    manualGlobalFilter={true}
                    manualSortBy={true}
                    currentPage={page}
                    setPage={setPage}
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
