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
import AddCourseEligibilityMasterPopup from "./correction-popup/AddCourseEligibilityMasterPopup";
import { deleteCourseEligibilityMaster, exportCourseEligibilityMaster, exportCourseEligibilityMasterAll, getCourseEligibilityMaster, importCourseEligibilityMaster } from "src/store/actions/CourseEligibilityAction";
import { PUT_COURSE_ELIGIBILITY_LIST, DELETE_COURSE_ELIGIBILITY, IMPORT_COURSE_ELIGIBILITY, EXPORT_COURSE_ELIGIBILITY, EXPORT_COURSE_ELIGIBILITY_ALL, POST_COURSE_ELIGIBILITY_LIST } from "src/store/RbacConstants";

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

interface CourseEligibilityMasterObj {
  CourseEligibilityId: number,
  Eligibility: string
}
export type Color = 'success' | 'info' | 'warning' | 'error';
export const CourseEligibilityMasterCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const Obj: { type: Color, message: string, details: string } = {
    type: 'success',
    message: '',
    details: ''
  }
  const [MessageObj, setMessage] = useState(Obj);
  const [isOpenCourseEligibilityMaster, setIsOpenCourseEligibilityMaster] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [CourseEligibilityId, setCourseEligibilityId] = useState(0)
  let msgType: Color = 'success';

  const displayMessage = (obj: { type: Color, message: string, details: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteCourseEligibilityMaster(CourseEligibilityId));
    let message = data?.message;
    let details = data?.message;
    if (error) {
      msgType = 'error';
      message = error?.message;
      details = error?.errorMessage
    }
    dispatch(getCourseEligibilityMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message, details });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportCourseEligibilityMasterAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportCourseEligibilityMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCourseEligibilityMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const courseEligibilityContentData = useSelector(
    (state: any) => state?.getCourseEligibilityMaster?.CourseEligibilityMasterResponse?.data
  )
  /**
  * GET ALL ALLOWED API List
  */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createCourseEligibilityMasterPopup = () => {
    setCourseEligibilityId(0)
    setIsOpenCourseEligibilityMaster(!isOpenCourseEligibilityMaster);
  }
  const editCourseEligibilityMasterPopup = (CourseEligibilityId: number = 0) => {
    setCourseEligibilityId(CourseEligibilityId)
    setIsOpenCourseEligibilityMaster(!isOpenCourseEligibilityMaster);
  }
  const ActionHandler = (row: CourseEligibilityMasterObj) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COURSE_ELIGIBILITY_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editCourseEligibilityMasterPopup(row?.CourseEligibilityId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COURSE_ELIGIBILITY).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => { setCourseEligibilityId(row?.CourseEligibilityId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "CourseEligibilityId",
        width: 30,
      },
      {
        Header: "Eligibility",
        accessor: "Eligibility",
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
          {isOpenCourseEligibilityMaster && <AddCourseEligibilityMasterPopup openImport={isOpenCourseEligibilityMaster} setOpenImport={setIsOpenCourseEligibilityMaster} CourseEligibilityId={CourseEligibilityId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCourseEligibilityMaster} refresh={getCourseEligibilityMaster(page + 1, limit)} popupTitle="Import Course Eligibility" />
          <Typography color="textPrimary" variant="h5">
            Master Course Eligibility
          </Typography>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COURSE_ELIGIBILITY).length > 0)
              && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_ELIGIBILITY).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_ELIGIBILITY_ALL).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_COURSE_ELIGIBILITY_LIST).length > 0)
              && <Button onClick={() => createCourseEligibilityMasterPopup()}>Add Course Eligibility</Button>}
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
              {courseEligibilityContentData && courseEligibilityContentData?.rows && courseEligibilityContentData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={courseEligibilityContentData?.rows}
                    totalCount={courseEligibilityContentData?.count}
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
