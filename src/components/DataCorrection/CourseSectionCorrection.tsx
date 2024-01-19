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
import { deleteCourseSection, exportCourseSection, exportCourseSectionAll, getCourseSection, importCourseSection } from "src/store/actions/CourseSectionAction";
import AddCourseSectionPopup from "./correction-popup/AddCourseSectionPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { DELETE_COURSE_SECTION, EXPORT_COURSE_SECTION, EXPORT_COURSE_SECTION_ALL, IMPORT_COURSE_SECTION, POST_COURSE_SECTION_LIST, PUT_COURSE_SECTION_LIST } from "src/store/RbacConstants";

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
interface CourseSectionObject {
  SectionId: number,
  CourseId: number,
  CourseTitle: string,
  SectionTitle: string,
  SectionDesc: string,
  PrecedenceOrder: number,
  Status: string
}

export const CourseSectionCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const Obj: { type: Color, message: string, details: string } = {
    type: 'success',
    message: '',
    details: ''
  }
  const [MessageObj, setMessage] = useState(Obj)
  const [isOpenCourseSection, setIsOpenCourseSection] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [SectionId, setSectionId] = useState(0);
  const [ExpendedIndex, setExpendedIndex] = useState(0);
  let msgType: Color = 'success';

  const displayMessage = (obj: { type: Color, message: string, details: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteCourseSection(SectionId));
    let message = data?.message;
    if (error) {
      msgType = 'error';
      message = error?.message;
    }
    dispatch(getCourseSection(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message, details: data?.message });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportCourseSectionAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportCourseSection(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCourseSection(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const courseSectionData = useSelector(
    (state: any) => state?.getCourseSection?.CourseSectionResponse?.data
  )
  /**
  * GET ALL ALLOWED API List
  */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createCourseSectionPopup = () => {
    setSectionId(0)
    setIsOpenCourseSection(!isOpenCourseSection);
  }
  const editCourseSectionPopup = (SectionId: number = 0) => {
    setSectionId(SectionId)
    setIsOpenCourseSection(!isOpenCourseSection);
  }
  const SectionDescExpendable = (row: CourseSectionObject) => {
    return <div>
      {(ExpendedIndex === row.SectionId) ? <span dangerouslySetInnerHTML={{ __html: row.SectionDesc }} /> : <span dangerouslySetInnerHTML={{ __html: row.SectionDesc?.slice(0, 45) }} />}
      {(row.SectionDesc.length > 45) ? (ExpendedIndex !== row.SectionId) ? <ArrowDropDownIcon onClick={(e) => { setExpendedIndex(row.SectionId) }} color="primary" fontSize="small" /> : <ArrowDropUpIcon onClick={(e) => { setExpendedIndex(0) }} color="primary" fontSize="small" /> : ''}
    </div>
  }
  const ActionHandler = (row: CourseSectionObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COURSE_SECTION_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editCourseSectionPopup(row?.SectionId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COURSE_SECTION).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setSectionId(row?.SectionId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "SectionId",
        width: 30,
      },
      {
        Header: "Course",
        accessor: "CourseTitle",
        width: 80,
      },
      {
        Header: "Title",
        accessor: "SectionTitle",
        width: 100,
      },
      {
        Header: "Description",
        accessor: SectionDescExpendable,
        width: 100
      },
      {
        Header: "Order",
        accessor: "PrecedenceOrder",
        width: 20
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
          {isOpenCourseSection && <AddCourseSectionPopup openImport={isOpenCourseSection} setOpenImport={setIsOpenCourseSection} SectionId={SectionId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCourseSection} refresh={getCourseSection(page + 1, limit)} popupTitle="Import Course-Section" />

          <Typography color="textPrimary" variant="h5">
            Course Section
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COURSE_SECTION).length > 0)
              && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_SECTION).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_SECTION_ALL).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_COURSE_SECTION_LIST).length > 0)
              && <Button onClick={() => createCourseSectionPopup()}>Add Course-Section</Button>}
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
              {courseSectionData && courseSectionData?.rows && courseSectionData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={courseSectionData?.rows}
                    totalCount={courseSectionData?.count}
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