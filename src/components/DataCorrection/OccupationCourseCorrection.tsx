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
import { deleteOccupatioCourse, exportAllOcupationCourse, exportOcupationCourse, getOccupationCourse, importOccupationCourse } from "src/store/actions/RMOccupationCourseAction";
import { AddOccupationCoursePopup } from "./correction-popup/AddOccupationCoursePopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import toast from "react-hot-toast";
import { PUT_OCCUPATION_COURSE_LIST, DELETE_OCCUPATION_COURSE, IMPORT_OCCUPATION_COURSE, EXPORT_OCCUPATION_COURSE, EXPORT_OCCUPATION_COURSE_ALL, POST_OCCUPATION_COURSE_LIST } from "src/store/RbacConstants";

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
interface OccupationCourseObject {
  CourseRegcarId: number;
  RegcarCode: string,
  CourseId: number,
  RegcarTitle: string,
  CourseTitle: string
}
export type Color = 'success' | 'info' | 'warning' | 'error';
const initMsgObj: { type: Color, message: string, details: string } = {
  type: 'success',
  message: '',
  details: ''
}
export const OccupationCourseCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState(initMsgObj)
  const [isOpenOccupationCourse, setIsOpenOccupationCourse] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [CourseRegcarId, setCourseRegcarId] = useState(0);
  let msgType: Color = 'success';
  const displayMessage = (obj: { type: Color, message: string, details: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteOccupatioCourse(CourseRegcarId));
    let message = data?.message
    if (error) {
      msgType = 'error';
      message = error?.message
    }
    dispatch(getOccupationCourse(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message, details: data?.message });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportAllOcupationCourse());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportOcupationCourse(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getOccupationCourse(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const occupationCourseData = useSelector(
    (state: any) => state?.getOccupationCourse?.OccupationCourseResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createOccupationCoursePopup = () => {
    setCourseRegcarId(0)
    setIsOpenOccupationCourse(!isOpenOccupationCourse);
  }
  const editOccupationCoursePopup = (CourseRegcarId: number = 0) => {
    setCourseRegcarId(CourseRegcarId)
    setIsOpenOccupationCourse(!isOpenOccupationCourse);
  }
  const ActionHandler = (row: OccupationCourseObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_OCCUPATION_COURSE_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editOccupationCoursePopup(row?.CourseRegcarId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_OCCUPATION_COURSE).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setCourseRegcarId(row?.CourseRegcarId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }
  const columns = useMemo(
    () => [
      {
        Header: "CourseRegcar-Id",
        accessor: "CourseRegcarId",
        width: 20,
      },
      {
        Header: "RegCar-Title",
        accessor: "RegcarTitle",
        width: 20,
      },
      {
        Header: "Course-Title",
        accessor: "CourseTitle",
        width: 20,
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 20
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
          {isOpenOccupationCourse && <AddOccupationCoursePopup openImport={isOpenOccupationCourse} setOpenImport={setIsOpenOccupationCourse} CourseRegcarId={CourseRegcarId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importOccupationCourse} refresh={getOccupationCourse(page + 1, limit)} popupTitle="Import Occupation-Course" />
          <Typography color="textPrimary" variant="h5">
            Occupation Course
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_OCCUPATION_COURSE).length > 0)
              && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
              {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_COURSE).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
              {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_COURSE_ALL).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_OCCUPATION_COURSE_LIST).length > 0)
              && <Button onClick={() => createOccupationCoursePopup()}>Add Course</Button>}
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
              {occupationCourseData && occupationCourseData?.rows && occupationCourseData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={occupationCourseData?.rows}
                    totalCount={occupationCourseData?.count}
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