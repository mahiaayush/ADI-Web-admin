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
import { EditSharp, DeleteOutline, FileUpload, Preview } from "@material-ui/icons";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ConfirmDelete from "../Override/ConfirmDelete";
import toast from "react-hot-toast";
import { deleteCourseDetails, exportCourseDetails, exportCourseDetailsAll, getCourseDetails, importCourseDetails } from "src/store/actions/CourseDetailsAction";
import { AddCourseDetailsPopup, ViewCourseDetails } from "./correction-popup/AddCourseDetailsPopup";
import { PUT_COURSE_DETAILS_LIST, DELETE_COURSE_DETAILS, IMPORT_COURSE_DETAILS, EXPORT_COURSE_DETAILS, EXPORT_COURSE_DETAILS_ALL, POST_COURSE_DETAILS_LIST } from "src/store/RbacConstants";

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

interface CourseDetailsObject {
  CourseId: number,
  PublisherId: number,
  VtCourseId: number,
  ItemId: number,
  Cuk: string,
  CourseTitle: string,
  CourseSubtitle: string,
  CoursePrice: number,
  CourseSlug: string,
  CourseDescription: string,
  CoursePrerequisites: string,
  CourseRequirements: string,
  CourseThumbnail: string,
  CourseVideo: string,
  CoourseBanner: string,
  TopicId: number,
  CourseTypeId: number,
  CourseLevelId: number,
  CourseDuration: string
  CourseLanguage: string
  CourseGrades: string,
  CoursePathways: string,
  CourseSkills: string,
  WhatYouLearn: string,
  WhatYouGet: string,
  HasAssessment: string,
  HasCertification: string,
  RenewalCycle: number,
  BatchStartDt: Date
  BatchEndDt: Date,
  BatchNextDt: Date,
  Status: string,
  ZohoVariantId: number,
  PublisherName: string,
  TopicName: string,
  ItemName: string,
  CourseLevel: string,
  CourseType: string
}

export type Color = 'success' | 'info' | 'warning' | 'error';
const initMsgObj: { type: Color, message: string } = {
  type: 'success',
  message: ''
}

export const CourseDetailsCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState(initMsgObj)
  const [isOpenCourseDetails, setIsOpenCourseDetails] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [ExpendedIndexDesc, setExpendedIndexDesc] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [CourseId, setCourseId] = useState(0);
  const [isViewCourseDetails, setViewCourseDetails] = useState(false);
  const [type, setType] = useState("add");

  let msgType: Color = 'success';
  const displayMessage = (obj: { type: Color, message: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteCourseDetails(CourseId));
    let message = data?.message;
    if (error) {
      msgType = 'error';
      message = error.message;
    }
    dispatch(getCourseDetails(page, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportCourseDetailsAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportCourseDetails(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCourseDetails(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const courseDetailsData = useSelector(
    (state: any) => state?.getCourseDetails?.CourseDetailsResponse?.data
  )
  /**
  * GET ALL ALLOWED API List
  */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createCourseDetailsPopup = () => {
    setCourseId(0)
    setType("add")
    setIsOpenCourseDetails(!isOpenCourseDetails);
  }
  const editCourseFaqPopup = (CourseId: number = 0) => {
    setType("edit")
    setCourseId(CourseId)
    setIsOpenCourseDetails(!isOpenCourseDetails);
  }
  const viewAll = (CourseId: number = 0) => {
    setCourseId(CourseId)
    setViewCourseDetails(!isViewCourseDetails);
  }
  const ActionHandler = (row: CourseDetailsObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COURSE_DETAILS_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editCourseFaqPopup(row?.CourseId)}>
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COURSE_DETAILS).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setCourseId(row?.CourseId); setConfirmDialog(true) }}>
        <DeleteOutline />
      </Button>}
      {/* <Button style={{ minWidth: '0px' }} onClick={() => { viewAll(row?.CourseId); }}>
        <Preview />
      </Button> */}

    </hgroup>
  }

  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "CourseId",
        width: 10,
      },
      {
        Header: "Publisher",
        accessor: "PublisherName",
        width: 25,
      },
      {
        Header: "VtId",
        accessor: "VtCourseId",
        width: 10,
      },
      {
        Header: "Item",
        accessor: "ItemName",
        width: 10
      },
      {
        Header: "Cuk",
        accessor: "Cuk",
        width: 50
      },
      {
        Header: "Price",
        accessor: "CoursePrice",
        width: 25
      },
      {
        Header: "Slug",
        accessor: "CourseSlug",
        width: 22
      },
      {
        Header: "Topic",
        accessor: "TopicName",
        width: 20
      },
      {
        Header: "Type",
        accessor: "CourseType",
        width: 20
      },
      {
        Header: "Level",
        accessor: "CourseLevel",
        width: 20
      },
      {
        Header: "Duration",
        accessor: "CourseDuration",
        width: 22
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 25
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
        {isViewCourseDetails && <ViewCourseDetails openImport={isViewCourseDetails} setOpenImport={setViewCourseDetails} CourseId={CourseId} />}
          {isOpenCourseDetails && <AddCourseDetailsPopup allCourseDetailsData={courseDetailsData} openImport={isOpenCourseDetails} setOpenImport={setIsOpenCourseDetails} type={type} CourseId={CourseId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCourseDetails} refresh={getCourseDetails(page + 1, limit)} popupTitle="Import Course Details" />
          <Typography color="textPrimary" variant="h5">
            Course Details
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COURSE_DETAILS).length > 0)
              && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_DETAILS).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_DETAILS_ALL).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_COURSE_DETAILS_LIST).length > 0)
              && <Button onClick={() => createCourseDetailsPopup()}>Add Course-Detail</Button>}
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
              {courseDetailsData && courseDetailsData?.rows && courseDetailsData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={courseDetailsData?.rows}
                    totalCount={courseDetailsData?.count}
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
