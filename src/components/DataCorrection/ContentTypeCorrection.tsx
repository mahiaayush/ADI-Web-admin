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
  import AddCourseFaqPopup from "./correction-popup/AddCourseFaqPopup";
  import toast from "react-hot-toast";
  import { deleteCourseFaq, exportCourseFaq, exportCourseFaqAll, getCourseFaq } from "src/store/actions/CourseFaqAction";
import { deleteContentType, exportContentType, exportContentTypeAll, getContentType, importContentType } from "src/store/actions/ContentTypeAction";
import AddContentTypePopup from "./correction-popup/AddContentTypePopup";
import { PUT_COURSETYPE_LIST, DELETE_COURSETYPE, IMPORT_COURSETYPE, EXPORT_COURSETYPE, EXPORT_COURSETYPE_ALL, POST_COURSETYPE_LIST } from "src/store/RbacConstants";

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
  interface ContentTypeObject {
    ContentTypeId: number,
    ContentTypeTitle: number,
    Status: string
  }
  
  export const ContentTypeCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const [MessageObj, setMessage] = useState({
      type: 'success',
      message: '',
      deiails: ''
  })
    const [isOpenContentType, setIsOpenContentType] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [ContentTypeId, setContentTypeId] = useState(0)
    let msgType = 'success';
    const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
      setIsMessage(true);
      setMessage(obj)
      setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
      setConfirmDialog(false);
      const { data, error } = await dispatch(deleteContentType(ContentTypeId));
      if (error) {
        console.log("=====>", data, error);
        msgType = 'error';
      } 
      dispatch(getContentType(page + 1, limit)).then(() => setIsLoading(false));
      displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
    }
    const downloadExcelAll = async () => {
      const { data, error } = await dispatch(exportContentTypeAll());
      if (error) {
        toast.success(error?.message)
      }
    }
    const downloadExcel = async () => {
      const { data, error } = await dispatch(exportContentType(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
      if (error) {
        toast.success(error?.message)
      }
    }
    
    useEffect(() => {
      setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getContentType(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])
    
    const contentTypeData = useSelector(
      (state: any) => state?.getContentType?.ContentTypeResponse?.data
    )
    /**
    * GET ALL ALLOWED API List
    */
    const roleAllowedApis = useSelector(
      (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )
    const createContentTypePopup = () => {
      setContentTypeId(0)
      setIsOpenContentType(!isOpenContentType);
    }
    const editContentTypePopup = (ContentTypeId:number = 0) => {
      setContentTypeId(ContentTypeId)
      setIsOpenContentType(!isOpenContentType);
    }
    const ActionHandler = (row: ContentTypeObject) => {
      return <hgroup style={{ display: 'flex' }}>
        {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COURSETYPE_LIST).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => editContentTypePopup(row?.ContentTypeId)}><EditSharp /></Button>}
        {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COURSETYPE).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => { setContentTypeId(row?.ContentTypeId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }
  
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }
  
    const columns = useMemo(
        () => [
          {
            Header: "Content-Id",
            accessor: "ContentTypeId",
            width: 100,
          },
          {
            Header: "Title",
            accessor: "ContentTypeTitle",
            width: 100,
          },
          {
            Header: "Status",
            accessor: "Status",
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
            {isOpenContentType && <AddContentTypePopup openImport={isOpenContentType} setOpenImport={setIsOpenContentType} ContentTypeId={ContentTypeId} pageNo={page} limit={limit} />}
           <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importContentType} refresh={getContentType(page + 1, limit)} popupTitle="Import Content-Type" />
            <Typography color="textPrimary" variant="h5">
            Content-Type
            </Typography>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item>
                <div className="import_export_div">
                {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COURSETYPE).length > 0)
                && <><FileUpload color="primary" fontSize="small" />
                  <Button onClick={() => handleClickOpen()} className="file_import_export">
                    Import
                  </Button></>}
                  {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSETYPE).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcel()}>
                    Export
                  </Button></>}
                  {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSETYPE_ALL).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                    Export All
                  </Button></>}
                </div> 
              </Grid>
              <Grid item>
                <div>
                {(roleAllowedApis.filter(itm => itm.apiKey === POST_COURSETYPE_LIST).length > 0)
                && <Button onClick={() => createContentTypePopup()}>Add Content-Type</Button>}
                </div>
              </Grid>
            </Grid>
          {isMessage && (
          <Alert severity="success">
          {MessageObj?.message}<strong>!</strong>
        </Alert>)}
            <Card>
              <Grid
                item
                className="counsellorApplicationListTable filterdataContner"
              >
                {contentTypeData && contentTypeData?.rows && contentTypeData?.rows?.length > -1 && (
                  <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={contentTypeData?.rows}
                    totalCount={contentTypeData?.count}
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
