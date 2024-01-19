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
import AddCourseMasterPopup from "./correction-popup/AddCourseMasterPopup";
import { deleteCourseMaster, exportCourseMaster, exportCourseMasterAll, getCourseMaster, importCourseMaster } from "src/store/actions/CourseMasterAction";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { PUT_COURSE_CAREER_DETAILS_LIST, DELETE_COURSE_CAREER_DETAILS, IMPORT_COURSE_CAREER_DETAILS, EXPORT_COURSE_CAREER_DETAILS, EXPORT_COURSE_CAREER_DETAILS_ALL, POST_COURSE_CAREER_DETAILS_LIST } from "src/store/RbacConstants";

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

interface CourseMasterObj {
  CourseId: number,
  StreamId: number,
  CoursetypeId: number,
  CourselevelId: number,
  CourseTitle: string,
  CourseAlias: string,
  CourseDesc: string,
  CourseDuration: string,
  CourseEligibilityQualification: string,
  CourseEligibilitySubject: string,
  CourseEligibilityMark: string,
  Status: string
  MinCourseId: number,
  StreamName: string,
  CoursetypeName: string,
  CourselevelName: string
}
export type Color = 'success' | 'info' | 'warning' | 'error';
export const CourseMasterCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const Obj: { type: Color, message: string, details: string } = {
    type: 'success',
    message: '',
    details: ''
  }
  const [MessageObj, setMessage] = useState(Obj);
  const [isOpenCourseMaster, setIsOpenCourseMaster] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [CourseId, setCourseId] = useState(0);
  const [ExpendedIndexDesc, setExpendedIndexDesc] = useState(0);
  const [ExpendedIndexSub, setExpendedIndexSub] = useState(0);
  let msgType: Color = 'success';

  const displayMessage = (obj: { type: Color, message: string, details: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteCourseMaster(CourseId));
    let message = data?.message;
    let details = data?.message;
    if (error) {
      console.log("=====>", data, error);
      msgType = 'error';
      message = error?.message;
      details = error?.errorMessage
    }
    dispatch(getCourseMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message, details });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportCourseMasterAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportCourseMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCourseMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const courseMasterData = useSelector(
    (state: any) => state?.getCourseMaster?.CourseMasterResponse?.data
  )
  /**
    * GET ALL ALLOWED API List
    */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createCourseMasterPopup = () => {
    setCourseId(0)
    setIsOpenCourseMaster(!isOpenCourseMaster);
  }
  const editCourseMasterPopup = (CourseId: number = 0) => {
    setCourseId(CourseId)
    setIsOpenCourseMaster(!isOpenCourseMaster);
  }
  const CourseDescExpendable = (row: CourseMasterObj) => {
    return <div>
      {(ExpendedIndexDesc === row.CourseId) ? <span dangerouslySetInnerHTML={{ __html: row.CourseDesc }} /> : <span dangerouslySetInnerHTML={{ __html: row.CourseDesc.slice(0, 20) }} />}
      {(row.CourseDesc.length > 20) ? (ExpendedIndexDesc !== row.CourseId) ? <ArrowDropDownIcon onClick={(e) => { setExpendedIndexDesc(row.CourseId) }} color="primary" fontSize="small" /> : <ArrowDropUpIcon onClick={(e) => { setExpendedIndexDesc(0) }} color="primary" fontSize="small" /> : ''}
    </div>
  }
  const CourseEligibilitySubjectExpendable = (row: CourseMasterObj) => {
    return <div>
      {(ExpendedIndexSub === row.CourseId) ? <span dangerouslySetInnerHTML={{ __html: row.CourseEligibilitySubject }} /> : <span dangerouslySetInnerHTML={{ __html: row.CourseEligibilitySubject.slice(0, 20) }} />}
      {(row.CourseEligibilitySubject.length > 20) ? (ExpendedIndexSub !== row.CourseId) ? <ArrowDropDownIcon onClick={(e) => { setExpendedIndexSub(row.CourseId) }} color="primary" fontSize="small" /> : <ArrowDropUpIcon onClick={(e) => { setExpendedIndexSub(0) }} color="primary" fontSize="small" /> : ''}
    </div>
  }
  const ActionHandler = (row: CourseMasterObj) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COURSE_CAREER_DETAILS_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editCourseMasterPopup(row?.CourseId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COURSE_CAREER_DETAILS).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setCourseId(row?.CourseId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "CourseId",
        width: 50,
      },
      {
        Header: "Stream",
        accessor: "StreamName",
        width: 50,
      },
      {
        Header: "Type",
        accessor: "CoursetypeName",
        width: 50,
      },
      {
        Header: "Level",
        accessor: "CourselevelName",
        width: 50,
      },
      {
        Header: "Description",
        accessor: CourseDescExpendable,
        width: 100,
      },
      {
        Header: "Duration",
        accessor: "CourseDuration",
        width: 50,
      },
      {
        Header: "Qualification",
        accessor: "CourseEligibilityQualification",
        width: 60,
      },
      {
        Header: "Subject",
        accessor: CourseEligibilitySubjectExpendable,
        width: 60,
      },
      {
        Header: "Mark",
        accessor: "CourseEligibilityMark",
        width: 30,
      },
      {
        Header: "Status",
        accessor: "Status",
        width: 30,
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 50
      },
    ],
    [ExpendedIndexDesc, ExpendedIndexSub, roleAllowedApis]
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
          {isOpenCourseMaster && <AddCourseMasterPopup openImport={isOpenCourseMaster} setOpenImport={setIsOpenCourseMaster} CourseId={CourseId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCourseMaster} refresh={getCourseMaster(page + 1, limit)} popupTitle="Import Course-Master" />

          <Typography color="textPrimary" variant="h5">
            Master Course
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COURSE_CAREER_DETAILS).length > 0)
              && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_CAREER_DETAILS).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_CAREER_DETAILS_ALL).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_COURSE_CAREER_DETAILS_LIST).length > 0)
              && <Button onClick={() => createCourseMasterPopup()}>Add Course Master</Button>}
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
              {courseMasterData && courseMasterData?.rows && courseMasterData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={courseMasterData?.rows}
                    totalCount={courseMasterData?.count}
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
