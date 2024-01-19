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
  import { deleteCourseAsset, exportCourseAssetAll, exportCourseAsset, getCourseAsset, importCourseAsset } from "src/store/actions/CourseAssetAction";
  import AddCourseAssetPopup from "./correction-popup/AddCourseAssetPopup";
import { DELETE_COURSE_ASSET, EXPORT_COURSE_ASSET, EXPORT_COURSE_ASSET_ALL, IMPORT_COURSE_ASSET, POST_COURSE_ASSET_LIST, PUT_COURSE_ASSET_LIST } from "src/store/RbacConstants";

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

  interface CourseAssetObject {
    CourseAssetId: number,
    CourseId: number,
    CourseTitle: string,
    AssetType: number,
    BackingFile: string,
    Status: string
  }
  
  export const CourseAssetCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const [MessageObj, setMessage] = useState({
      type: 'success',
      message: '',
      deiails: ''
  })
    const [isOpenCourseAsset, setIsOpenCourseAsset] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [CourseAssetId, setCourseAssetId] = useState(0);
    const AccomodationTypeData = [{ value: 1, type: 'Image' }, { value: 2, type: 'Video' }, { value: 3, type: 'Certificate' }]
  
    let msgType = 'success';
    const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
      setIsMessage(true);
      setMessage(obj)
      setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
      setConfirmDialog(false);
      const { data, error } = await dispatch(deleteCourseAsset(CourseAssetId));
      if (error) {
        console.log("=====>", data, error);
        msgType = 'error';
      } 
      dispatch(getCourseAsset(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
      displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
    }
    const downloadExcelAll = async () => {
      const { data, error } = await dispatch(exportCourseAssetAll());
      if (error) {
        toast.success(error?.message)
      }
    }
    const downloadExcel = async () => {
      const { data, error } = await dispatch(exportCourseAsset(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
      if (error) {
        toast.success(error?.message)
      }
    }
    
    useEffect(() => {
      setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCourseAsset(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

    const courseAssetData = useSelector(
      (state: any) => state?.getCourseAsset?.CourseAssetResponse?.data
    )
    /**
    * GET ALL ALLOWED API List
    */
    const roleAllowedApis = useSelector(
      (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )
    const createCourseAssetPopup = () => {
      setCourseAssetId(0)
      setIsOpenCourseAsset(!isOpenCourseAsset);
    }
    const editCourseAssetPopup = (CourseAssetId:number = 0) => {
      setCourseAssetId(CourseAssetId)
      setIsOpenCourseAsset(!isOpenCourseAsset);
    }
    
    const AssetTypeData = (row: CourseAssetObject) => {
      // eslint-disable-next-line
      const { type } = AccomodationTypeData.find((itm: { value: number, type: string }) => itm?.value == row.AssetType);
      return <span>{type}</span>
    }
    const ActionHandler = (row: CourseAssetObject) => {
      return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COURSE_ASSET_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editCourseAssetPopup(row?.CourseAssetId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COURSE_ASSET).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setCourseAssetId(row?.CourseAssetId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }
  
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }
  
    const columns = useMemo(
        () => [
          {
            Header: "Asset-Id",
            accessor: "CourseAssetId",
            width: 30,
          },
          {
            Header: "Course",
            accessor: "CourseTitle",
            width: 30,
          },
          {
            Header: "AssetType",
            accessor: AssetTypeData, 
            width: 30,
          },
          {
            Header: "Backing-File",
            accessor: "BackingFile",
            width: 100
          }, 
          {
            Header: "Status",
            accessor: "Status",
            width: 20
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
            {isOpenCourseAsset && <AddCourseAssetPopup openImport={isOpenCourseAsset} setOpenImport={setIsOpenCourseAsset} CourseAssetId={CourseAssetId} pageNo={page} limit={limit} />}
           <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCourseAsset} refresh={getCourseAsset(page + 1, limit)} popupTitle="Import Course Asset" />
           <Typography color="textPrimary" variant="h5">
            Course Asset
            </Typography>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item>
                <div className="import_export_div">
                {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COURSE_ASSET).length > 0)
                && <><FileUpload color="primary" fontSize="small" />
                  <Button onClick={() => handleClickOpen()} className="file_import_export">
                    Import
                  </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_ASSET).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcel()}>
                    Export
                  </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_ASSET_ALL).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                    Export All
                  </Button></>}
                </div> 
              </Grid>
              <Grid item>
                <div>
                {(roleAllowedApis.filter(itm => itm.apiKey === POST_COURSE_ASSET_LIST).length > 0)
                && <Button onClick={() => createCourseAssetPopup()}>Add Course-Asset</Button>}
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
                {courseAssetData && courseAssetData?.rows && courseAssetData?.rows?.length > -1 && (
                  <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={courseAssetData?.rows}
                    totalCount={courseAssetData?.count}
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
