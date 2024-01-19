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
  import AddEmploymentStatusMasterPopup from "./correction-popup/AddEmploymentStatusMasterPopup";
  import { deleteEmploymentStatusMaster, exportEmploymentStatusMaster, exportEmploymentStatusMasterAll, getEmploymentStatusMaster, importEmploymentStatusMaster } from "src/store/actions/EmploymentStatusAction";
import { DELETE_EMPLOYMENT_STATUS, EXPORT_EMPLOYMENT_STATUS, EXPORT_EMPLOYMENT_STATUS_ALL, IMPORT_EMPLOYMENT_STATUS, POST_EMPLOYMENT_STATUS_LIST, PUT_EMPLOYMENT_STATUS_LIST } from "src/store/RbacConstants";

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

  interface EmploymentStatusMasterObj {
    EmploymentStatusId: number,
    OnetsocCode: string,
    TaskTitle: string,
    TaskType: string,
  }
  export type Color = 'success' | 'info' | 'warning' | 'error';
  export const EmploymentStatusMasterCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const Obj: { type: Color, message: string, details: string } = {
      type: 'success',
      message: '',
      details: ''
    }
    const [MessageObj, setMessage] = useState(Obj);
    const [isOpenEmploymentStatusMaster, setIsOpenEmploymentStatusMaster] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [EmploymentStatusId, setEmploymentStatusId] = useState(0)
    let msgType:Color = 'success';
    
    const displayMessage = (obj: { type: Color, message: string, details: string }) => {
      setIsMessage(true);
      setMessage(obj)
      setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
      setConfirmDialog(false);
      const { data, error } = await dispatch(deleteEmploymentStatusMaster(EmploymentStatusId));
      let message = data?.message;
      let details = data?.message;
      if (error) {
        msgType = 'error';
        message = error?.message;
        details = error?.errorMessage
      } 
      dispatch(getEmploymentStatusMaster(page + 1, limit)).then(() => setIsLoading(false));
      displayMessage({ type: msgType, message, details });
    }
    const downloadExcelAll = async () => {
      const { data, error } = await dispatch(exportEmploymentStatusMasterAll());
      if (error) {
        toast.success(error?.message)
      }
    }
    const downloadExcel = async () => {
      const { data, error } = await dispatch(exportEmploymentStatusMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
      if (error) {
        toast.success(error?.message)
      }
    }
    
    useEffect(() => {
      setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getEmploymentStatusMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])
    
    const employmentStatusContentData = useSelector(
      (state: any) => state?.getEmploymentStatusMaster?.EmploymentStatusMasterResponse?.data
    )
    /**
   * GET ALL ALLOWED API List
   */
    const roleAllowedApis = useSelector(
      (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    ) 
    const createEmploymentStatusMasterPopup = () => {
      setEmploymentStatusId(0)
      setIsOpenEmploymentStatusMaster(!isOpenEmploymentStatusMaster);
    }
    const editEmploymentStatusMasterPopup = (EmploymentStatusId:number = 0) => {
      setEmploymentStatusId(EmploymentStatusId)
      setIsOpenEmploymentStatusMaster(!isOpenEmploymentStatusMaster);
    }
    const ActionHandler = (row: EmploymentStatusMasterObj) => {
      return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_EMPLOYMENT_STATUS_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editEmploymentStatusMasterPopup(row?.EmploymentStatusId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_EMPLOYMENT_STATUS).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setEmploymentStatusId(row?.EmploymentStatusId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }
  
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }
  
    const columns = useMemo(
        () => [
          {
            Header: "Id",
            accessor: "EmploymentStatusId",
            width: 30,
          },
          {
            Header: "StatusName",
            accessor: "EmploymentStatusName",
            width: 60,
          },
          {
            Header: "Action",
            accessor: ActionHandler,
            disableSortBy: true,
            width: 40
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
            {isOpenEmploymentStatusMaster && <AddEmploymentStatusMasterPopup openImport={isOpenEmploymentStatusMaster} setOpenImport={setIsOpenEmploymentStatusMaster} EmploymentStatusId={EmploymentStatusId} pageNo={page} limit={limit} />}
            <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importEmploymentStatusMaster} refresh={getEmploymentStatusMaster(page + 1, limit)} popupTitle="Import Employment Status Master" />

            <Typography color="textPrimary" variant="h5">
            Master Employment Status
            </Typography>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item>
                <div className="import_export_div">
                {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_EMPLOYMENT_STATUS).length > 0)
      && <><FileUpload color="primary" fontSize="small" />
                  <Button onClick={() => handleClickOpen()} className="file_import_export">
                    Import
                  </Button></>}
                  {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_EMPLOYMENT_STATUS).length > 0)
      && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcel()}>
                    Export
                    </Button></>}
                  {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_EMPLOYMENT_STATUS_ALL).length > 0)
                    && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                    Export All
                  </Button></>}
                </div> 
              </Grid>
              <Grid item>
                <div>
                {(roleAllowedApis.filter(itm => itm.apiKey === POST_EMPLOYMENT_STATUS_LIST).length > 0)
      && <Button onClick={() => createEmploymentStatusMasterPopup()}>Add Employment Status</Button>}
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
                {employmentStatusContentData && employmentStatusContentData?.rows && employmentStatusContentData?.rows?.length > -1 && (
                  <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={employmentStatusContentData?.rows}
                    totalCount={employmentStatusContentData?.count}
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
