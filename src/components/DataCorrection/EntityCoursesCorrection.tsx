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
import ConfirmDelete from "../Override/ConfirmDelete";
import { deleteEntityCourses, exportAllEntityCourses, exportEntityCourses, getEntityCourses, importEntityCourses } from "src/store/actions/getEntityCoursesAction";
import { EntityCoursesPopup } from "./entitycourse-master/AddEntityCoursesPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { DELETE_COURSES_ENTITY, EXPORT_COURSES_ENTITY, EXPORT_COURSES_ENTITY_ALL, IMPORT_COURSES_ENTITY, POST_COURSES_ENTITY_LIST, PUT_COURSES_ENTITY_LIST } from "src/store/RbacConstants";

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

interface EntityCourseObject {
  EntitycourseId: number;
  EntityId: string;
  CourseId: number;
  CourseTitle: string;
  CourseFee: string,
  CoursemodeId: number,
  CoursemodeName: string;
  AdmissionCriteria: string,
}

export const EntityCoursesCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: 'success',
    message: '',
    deiails: ''
  })
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [openImport, setOpenImport] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [entitycourseId, setEntitycourseId] = useState(null);
  const [entityId, setEntityId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [courseFee, setCourseFee] = useState(null);
  const [coursemodeId, setCoursemodeId] = useState(null);
  const [admissionCriteria, setAdmissionCriteria] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteEntityCourses(entitycourseId));
    if (error) {
      console.log("=====>", data, error);
      msgType = 'error';
    }
    dispatch(getEntityCourses(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportEntityCourses(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportCollegeEventMaster", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllEntityCourses());
    console.log("exportAllCollegeEventMaster", data, error);
  }

  useEffect(() => {
    setIsLoading(true);
    const IntervalIdentifier = setTimeout(() => {
    dispatch(getEntityCourses(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
  }, 1000)
  return () => { clearTimeout(IntervalIdentifier) }
}, [page, limit, search, sortBy])

  const EntityCoursesData = useSelector(
    (state: any) => state?.getCourses?.entitycoursesResponse?.data
  )
  /**
  * GET ALL ALLOWED API List
  */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const ActionHandler = (row: EntityCourseObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COURSES_ENTITY).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          console.log("CollegeEvent object", row);
          setEntitycourseId(row?.EntitycourseId);
          setEntityId(row?.EntityId);
          setCourseId(row?.CourseId);
          setCourseFee(row?.CourseFee);
          setCoursemodeId(row?.CoursemodeId);
          setAdmissionCriteria(row?.AdmissionCriteria);
          editAcademicPopup();
          seteditAddFlag(1);
        }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COURSES_ENTITY_LIST).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => { setEntitycourseId(row?.EntitycourseId); setConfirmDialog(true) }}
      >
        <DeleteOutline /></Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Entitycourse-Id",
        accessor: "EntitycourseId",
        disableSortBy: true,
        width: 10,
      },
      {
        Header: "Course-Title",
        accessor: "CourseTitle",
        disableSortBy: true,
        width: 40
      },
      {
        Header: "Course-Fee",
        accessor: "CourseFee",
        disableSortBy: true,
        width: 20
      },
      {
        Header: "Coursemode-Name",
        accessor: "CoursemodeName",
        disableSortBy: true,
        width: 20
      },
      {
        Header: "AdmissionCriteria",
        accessor: "AdmissionCriteria",
        disableSortBy: true,
        width: 20
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
          {/* <ImportPopup openImport={openImport} setOpenImport={setOpenImport} /> */}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importEntityCourses} refresh={getEntityCourses(page + 1, limit)} popupTitle="Import Entity Courses" />
          {openEdit && (
            <EntityCoursesPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              entitycourse_Id={entitycourseId}
              entity_Id={entityId}
              course_Id={courseId}
              course_Fee={courseFee}
              coursemode_Id={coursemodeId}
              admission_Criteria={admissionCriteria}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Entity Courses
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COURSES_ENTITY).length > 0)
          && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSES_ENTITY).length > 0)
            && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSES_ENTITY_ALL).length > 0)
            && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
              Export&nbsp;All
            </Button></>}

            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_COURSES_ENTITY_LIST).length > 0)
              && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setEntitycourseId(null);
                  setEntityId(null);
                  setCourseId(null);
                  setCourseFee(null);
                  setCoursemodeId(null);
                  setAdmissionCriteria(null);
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
              >Add Entity Course</Button>}
            </div>
          </div>
          {console.log(typeof MessageObj?.type, msgType)}
          {isMessage && (
            <Alert severity="success">
              {MessageObj?.message}<strong>!</strong>
            </Alert>)}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {EntityCoursesData && EntityCoursesData?.rows && EntityCoursesData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={EntityCoursesData?.rows}
                    totalCount={EntityCoursesData?.count}
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