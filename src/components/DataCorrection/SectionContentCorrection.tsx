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
  import { deleteSectionContent, exportSectionContent, exportSectionContentAll, getSectionContent, importSectionContent } from "src/store/actions/SectionContentAction";
  import AddSectionContentPopup from "./correction-popup/AddSectionContentPopup";
import { DELETE_SECTION_CONTENT, EXPORT_SECTION_CONTENT, EXPORT_SECTION_CONTENT_ALL, IMPORT_SECTION_CONTENT, POST_SECTION_CONTENT_LIST, PUT_SECTION_CONTENT_LIST } from "src/store/RbacConstants";

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

  interface SectionContent {
    SeccountId: number,
    SectionId: number,
    ContTypeId: number,
    CountStats: number,
    SectionTitle: string,
    ContTypeTitle: string
  }
  
  export const SectionContentCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const [MessageObj, setMessage] = useState({
      type: 'success',
      message: '',
      deiails: ''
  })
    const [isOpenSectionContent, setIsOpenSectionContent] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [SeccountId, setSeccountId] = useState(0)
    let msgType = 'success';
    const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
      setIsMessage(true);
      setMessage(obj)
      setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
      setConfirmDialog(false);
      const { data, error } = await dispatch(deleteSectionContent(SeccountId));
      if (error) {
        msgType = 'error';
      } 
      dispatch(getSectionContent(page + 1, limit)).then(() => setIsLoading(false));
      displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
    }
    const downloadExcelAll = async () => {
      const { data, error } = await dispatch(exportSectionContentAll());
      if (error) {
        toast.success(error?.message)
      }
    }
    const downloadExcel = async () => {
      const { data, error } = await dispatch(exportSectionContent(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
      if (error) {
        toast.success(error?.message)
      }
    }
    
    useEffect(() => {
      setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getSectionContent(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])
    
    const sectionContentData = useSelector(
      (state: any) => state?.getSectionContent?.SectionContentResponse?.data
    )
    /**
    * GET ALL ALLOWED API List
    */
    const roleAllowedApis = useSelector(
      (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )
    const createSectionContentPopup = () => {
      setSeccountId(0)
      setIsOpenSectionContent(!isOpenSectionContent);
    }
    const editSectionContentPopup = (SeccountId:number = 0) => {
      setSeccountId(SeccountId)
      setIsOpenSectionContent(!isOpenSectionContent);
    }
    const ActionHandler = (row: SectionContent) => {
      return <hgroup style={{ display: 'flex' }}>
        {(roleAllowedApis.filter(itm => itm.apiKey === PUT_SECTION_CONTENT_LIST).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => editSectionContentPopup(row?.SeccountId)}><EditSharp /></Button>}
        {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_SECTION_CONTENT).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => { setSeccountId(row?.SeccountId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }
  
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }
  
    const columns = useMemo(
        () => [
          {
            Header: "Id",
            accessor: "SeccountId",
            width: 30,
          },
          {
            Header: "Title",
            accessor: "SectionTitle",
            width: 100,
          },
          {
            Header: "ContType",
            accessor: "ContTypeTitle",
            width: 100,
          },
          {
            Header: "Count",
            accessor: "CountStats",
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
            {isOpenSectionContent && <AddSectionContentPopup openImport={isOpenSectionContent} setOpenImport={setIsOpenSectionContent} SeccountId={SeccountId} pageNo={page} limit={limit} />}
            <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importSectionContent} refresh={getSectionContent(page + 1, limit)} popupTitle="Import Section-Content" />

            <Typography color="textPrimary" variant="h5">
            Master Section Content
            </Typography>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item>
                <div className="import_export_div">
                {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_SECTION_CONTENT).length > 0)
                && <><FileUpload color="primary" fontSize="small" />
                  <Button onClick={() => handleClickOpen()} className="file_import_export">
                    Import
                  </Button></>}
                  {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_SECTION_CONTENT).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcel()}>
                    Export
                  </Button></>}
                  {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_SECTION_CONTENT_ALL).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                    Export All
                  </Button></>}
                </div> 
              </Grid>
              <Grid item>
                <div>
                {(roleAllowedApis.filter(itm => itm.apiKey === POST_SECTION_CONTENT_LIST).length > 0)
                && <Button onClick={() => createSectionContentPopup()}>Add Section-Content</Button>}
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
                {sectionContentData && sectionContentData?.rows && sectionContentData?.rows?.length > -1 && (
                  <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={sectionContentData?.rows}
                    totalCount={sectionContentData?.count}
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
