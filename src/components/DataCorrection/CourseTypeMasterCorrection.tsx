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
import AddCourseTypePopup from "./correction-popup/AddCourseTypePopup";
import { deleteCourseType, exportCourseType, exportCourseTypeAll, getCourseType, importCourseType } from "src/store/actions/CourseTypeAction";
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

interface CourseTypeObj {
  CourseTypeId: number,
  CourseTypeName: string
}
export type Color = 'success' | 'info' | 'warning' | 'error';
export const CourseTypeCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const Obj: { type: Color, message: string, details: string } = {
    type: 'success',
    message: '',
    details: ''
  }
  const [MessageObj, setMessage] = useState(Obj);
  const [isOpenCourseType, setIsOpenCourseType] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [CourseTypeId, setCourseTypeId] = useState(0)
  let msgType: Color = 'success';

  const displayMessage = (obj: { type: Color, message: string, details: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteCourseType(CourseTypeId));
    let message = data?.message;
    let details = data?.message;
    if (error) {
      console.log("=====>", data, error);
      msgType = 'error';
      message = error?.message;
      details = error?.errorMessage
    }
    dispatch(getCourseType(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message, details });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportCourseTypeAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportCourseType(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }
  
  useEffect(() => {
    setIsLoading(true);
    const IntervalIdentifier = setTimeout(() => {
    dispatch(getCourseType(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
  }, 1000)
  return () => { clearTimeout(IntervalIdentifier) }
}, [page, limit, search, sortBy])

  const courseTypeData = useSelector(
    (state: any) => state?.getCourseType?.CourseTypeResponse?.data
  )
  /**
    * GET ALL ALLOWED API List
    */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createCourseTypePopup = () => {
    setCourseTypeId(0)
    setIsOpenCourseType(!isOpenCourseType);
  }
  const editCourseTypePopup = (CourseTypeId: number = 0) => {
    setCourseTypeId(CourseTypeId)
    setIsOpenCourseType(!isOpenCourseType);
  }
  const ActionHandler = (row: CourseTypeObj) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COURSETYPE_LIST).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => editCourseTypePopup(row?.CourseTypeId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COURSETYPE).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => { setCourseTypeId(row?.CourseTypeId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "CourseTypeId",
        disableSortBy: true,
        width: 30,
      },
      {
        Header: "Course Type Name",
        accessor: "CourseTypeName",
        width: 100,
        disableSortBy: true,
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
          {isOpenCourseType && <AddCourseTypePopup openImport={isOpenCourseType} setOpenImport={setIsOpenCourseType} CourseTypeId={CourseTypeId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCourseType} refresh={getCourseType(page + 1, limit)} popupTitle="Import Course-Level-Master" />

          <Typography color="textPrimary" variant="h5">
            Master Course Type
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
                && <Button onClick={() => createCourseTypePopup()}>Add Course Type</Button>}
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
              {courseTypeData && courseTypeData?.rows && courseTypeData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={courseTypeData?.rows}
                    totalCount={courseTypeData?.count}
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
