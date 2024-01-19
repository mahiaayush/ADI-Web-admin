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
  import { deleteCourseExamination, exportCourseExamination, exportCourseExaminationAll, getCourseExamination, importCourseExamination } from "src/store/actions/CourseExaminationAction";
  import AddCourseExaminationPopup from "./correction-popup/AddCourseExaminationPopup";
  import { ImportExcelPopup } from "./correction-popup/ImportPopup";
  import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
  import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { PUT_COURSE_EXAMINATION_LIST, DELETE_COURSE_EXAMINATION, IMPORT_COURSE_EXAMINATION, EXPORT_COURSE_EXAMINATION, EXPORT_COURSE_EXAMINATION_ALL, POST_COURSE_EXAMINATION_LIST } from "src/store/RbacConstants";

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
  interface CourseExaminationObject {
    CourseExamId: number,
    CourseId: number,
    ExamId: number,
    CourseTitle: string,
    ExamLongName: string
  }

  export const CourseExaminationCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const Obj: { type: Color, message: string, details: string } = {
      type: 'success',
      message: '',
      details: ''
    }
    const [MessageObj, setMessage] = useState(Obj)
    const [isOpenCourseExamination, setIsOpenCourseExamination] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [CourseExamId, setCourseExamId] = useState(0);
    const [ExpendedIndex, setExpendedIndex] = useState(0);
    let msgType:Color = 'success';
    
    const displayMessage = (obj: { type: Color, message: string, details: string }) => {
      setIsMessage(true);
      setMessage(obj)
      setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
      setConfirmDialog(false);
      const { data, error } = await dispatch(deleteCourseExamination(CourseExamId));
      let message = data?.message;
      if (error) {
        msgType = 'error';
        message = error?.message;
      } 
      dispatch(getCourseExamination(page + 1, limit)).then(() => setIsLoading(false));
      displayMessage({ type: msgType, message, details: data?.message });
    }
    const downloadExcelAll = async () => {
      const { data, error } = await dispatch(exportCourseExaminationAll());
      if (error) {
        toast.success(error?.message)
      }
    }
    const downloadExcel = async () => {
      const { data, error } = await dispatch(exportCourseExamination(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
      if (error) {
        toast.success(error?.message)
      }
    }
    
    useEffect(() => {
      setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCourseExamination(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])
    
    const courseExaimData = useSelector(
      (state: any) => state?.getCourseExamination?.CourseExaminationResponse?.data
    )
    /**
    * GET ALL ALLOWED API List
    */
    const roleAllowedApis = useSelector(
      (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )
    const createCourseExaminationPopup = () => {
      setCourseExamId(0)
      setIsOpenCourseExamination(!isOpenCourseExamination);
    }
    const editCourseExaminationPopup = (CourseExamId:number = 0) => {
      setCourseExamId(CourseExamId)
      setIsOpenCourseExamination(!isOpenCourseExamination);
    }
    const ActionHandler = (row: CourseExaminationObject) => {
      return <hgroup style={{ display: 'flex' }}>
        {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COURSE_EXAMINATION_LIST).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => editCourseExaminationPopup(row?.CourseExamId)}><EditSharp /></Button>}
        {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COURSE_EXAMINATION).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => { setCourseExamId(row?.CourseExamId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }
  
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }
  
    const columns = useMemo(
        () => [
          {
            Header: "Id",
            accessor: "CourseExamId",
            width: 30,
          },
          {
            Header: "Course",
            accessor: "CourseTitle",
            width: 80,
          },
          {
            Header: "Exam Title",
            accessor: "ExamLongName",
            width: 100,
          },
          {
            Header: "Action",
            accessor: ActionHandler,
            disableSortBy: true,
            width: 40
          },
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
            {isOpenCourseExamination && <AddCourseExaminationPopup openImport={isOpenCourseExamination} setOpenImport={setIsOpenCourseExamination} CourseExamId={CourseExamId} pageNo={page} limit={limit} />}
            <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCourseExamination} refresh={getCourseExamination(page + 1, limit)} popupTitle="Import Course-Section" />
            
            <Typography color="textPrimary" variant="h5">
              Course Examination
            </Typography>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item>
                <div className="import_export_div">
                {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COURSE_EXAMINATION).length > 0)
                && <><FileUpload color="primary" fontSize="small" />
                  <Button onClick={() => handleClickOpen()} className="file_import_export">
                    Import
                  </Button></>}
                  {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_EXAMINATION).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcel()}>
                    Export
                  </Button></>}
                  {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_EXAMINATION_ALL).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                    Export All
                  </Button></>}
                </div> 
              </Grid>
              <Grid item>
                <div>
                {(roleAllowedApis.filter(itm => itm.apiKey === POST_COURSE_EXAMINATION_LIST).length > 0)
                && <Button onClick={() => createCourseExaminationPopup()}>Add Course-Examination</Button>}
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
                {courseExaimData && courseExaimData?.rows && courseExaimData?.rows?.length > -1 && (
                  <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={courseExaimData?.rows}
                    totalCount={courseExaimData?.count}
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