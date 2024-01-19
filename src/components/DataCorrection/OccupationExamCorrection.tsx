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
import { deleteOccupationExam, exportAllOcupationExam, exportOcupationExam, getOccupationExam, importOccupationExam } from "src/store/actions/OccupationExamAction";
import { EditOccupationExamPopup } from "./occupationExam-master/AddOccupationExamPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { PUT_OCCUPATION_EXAM_LIST, DELETE_OCCUPATION_EXAM, IMPORT_OCCUPATION_EXAM, EXPORT_OCCUPATION_EXAM, EXPORT_OCCUPATION_EXAM_ALL, POST_OCCUPATION_EXAM_LIST } from "src/store/RbacConstants";

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
// const type EmploymentStatusId ={ }
interface OccupationExamObject {
  ExamregcarId: number;
  RegcarCode: string,
  RegcarTitle: string;
  EmploymentStatus: any,
  ExamId: number;
}

export const OccupationExamCorrection = () => {
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
  const [sortBy, setSortBy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [openImport, setOpenImport] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [examregcarId, setExamregcarId] = useState(null);
  const [regcarCode, setRegcarCode] = useState(null);
  const [examId, setExamId] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteOccupationExam(examregcarId));
    if (error) {
      msgType = 'error';
    }
    dispatch(getOccupationExam(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportOcupationExam(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportOcupationExam", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllOcupationExam());
    console.log("exportAllOcupationExam", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getOccupationExam(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const OccupationExamData = useSelector(
    (state: any) => state?.getOccupationExam?.OccupationExamResponse?.data
  )
  
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )

  const EmploymentStatusHandler = (row: OccupationExamObject) => {
    const EmpNames = row?.EmploymentStatus?.map((itm: any) => itm.EmploymentStatusName).join(', ');
    return <span>{EmpNames}</span>
  }
  const ActionHandler = (row: OccupationExamObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_OCCUPATION_EXAM_LIST).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          setExamregcarId(row?.ExamregcarId);
          setRegcarCode(row?.RegcarCode);
          setExamId(row?.ExamId)
          editAcademicPopup();
          seteditAddFlag(1);
        }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_OCCUPATION_EXAM).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => { setExamregcarId(row?.ExamregcarId); setConfirmDialog(true) }}
      >
        <DeleteOutline />
      </Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Examregcar-Id",
        accessor: "ExamregcarId",
        width: 20,
      },
      {
        Header: "Regcar-Title",
        accessor: "RegcarTitle",
        width: 20,
      },
      {
        Header: "Exam-Title",
        accessor: "ExamShortName",
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importOccupationExam} refresh={getOccupationExam(page + 1, limit)} popupTitle="Import Occupatio Exam" />
          {openEdit && (
            <EditOccupationExamPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              examregcar_Id={examregcarId}
              regcar_Code={regcarCode}
              exam_Id={examId}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Occupation Exam
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_OCCUPATION_EXAM).length > 0)
          && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
            {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_EXAM).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
            {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_EXAM_ALL).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
            Export&nbsp;All
            </Button></>}
          
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_OCCUPATION_EXAM_LIST).length > 0)
              && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setExamregcarId(null);
                  setRegcarCode(null);
                  setExamId(null)
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
              >Add OccupationExam</Button>}
            </div>
          </div>
          {isMessage && (
            <Alert severity="success">
              {MessageObj?.message}<strong>!</strong>
            </Alert>)}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {OccupationExamData && OccupationExamData?.rows && OccupationExamData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={OccupationExamData?.rows}
                    totalCount={OccupationExamData?.count}
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