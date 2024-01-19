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
import { getAcademicMaster, deleteAcademicMaster, exportAcademicMaster, exportAllAcademicMaster, importAcademicMaster } from '../../store/actions/getAcademicAction';
import ConfirmDelete from "../Override/ConfirmDelete";
import { EditAcademicPopup } from "./academic-master/AddAcademicPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { minWidth, style } from "@material-ui/system";
import { DELETE_ACADEMIC, EXPORT_ACADEMIC, EXPORT_ACADEMIC_ALL, IMPORT_ACADEMIC, POST_ACADEMIC_LIST, PUT_ACADEMIC_LIST } from "src/store/RbacConstants";

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

interface AcademicObject {
  AcademicEligibilityId: number;
  ProgramId: number;
  ProgramLevelId: number;
  Eligibility: string;
  ProgramTitle: string;
  ProgramLevelName: string;
}

export const AcademicCorrection = () => {
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
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState([]);
  const [openImport, setOpenImport] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [academicEligibilityId, setAcademicEligibilityId] = useState(null);
  const [programId, setProgramId] = useState(null);
  const [programLevelId, setProgramLevelId] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteAcademicMaster(academicEligibilityId));
    if (error) {
      msgType = 'error';
    }
    dispatch(getAcademicMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }

  const createRankPopup = () => {
    setOpenAdd(!openAdd);
  }
  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportAcademicMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportAcademicMaster", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllAcademicMaster());
    console.log("exportAllAcademicMaster", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getAcademicMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const AcademicData = useSelector(
    (state: any) => state?.getAcademic?.academicResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const ActionHandler = (row: AcademicObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_ACADEMIC_LIST).length > 0)
      && <Button
        style={{ minWidth: "0px" }}
        onClick={() => {
          setAcademicEligibilityId(row?.AcademicEligibilityId);
          setProgramId(row?.ProgramId);
          setProgramLevelId(row?.ProgramLevelId);
          setEligibility(row?.Eligibility);
          seteditAddFlag(1);
          editAcademicPopup();
        }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_ACADEMIC).length > 0)
      && <Button style={{ minWidth: "0px" }} onClick={() => { setAcademicEligibilityId(row?.AcademicEligibilityId); setConfirmDialog(true) }}>
        <DeleteOutline />
      </Button>}
      </hgroup>
  }
  const EligilibityValue = (row: AcademicObject) => {
    return <div>
      <span dangerouslySetInnerHTML={{ __html: row.Eligibility }} />
    </div>
  }

  const columns = useMemo(
    () => [
      {
        Header: "AcademicEligibility-Id",
        accessor: "AcademicEligibilityId",
        // disableSortBy: true,
        width: 50,
      },
      {
        Header: "Program-Title",
        accessor: "ProgramTitle",
        width: 50,
        // disableSortBy: true,
      },
      {
        Header: "ProgramLevel-Name",
        accessor: "ProgramLevelName",
        // disableSortBy: true,
        width: 50
      },
      {
        Header: "Eligibility",
        accessor: EligilibityValue,
        // disableSortBy: true,
        width: 100
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 50
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importAcademicMaster} refresh={getAcademicMaster(page + 1, limit)} popupTitle="Import Academic Master" />
          {openEdit && (
            <EditAcademicPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              academicEligibilityId={academicEligibilityId}
              programId={programId}
              programLevelId={programLevelId}
              eligibility_c={eligibility}
              editFlag={editAddFlag}
              Page_n={page}
              limit_page={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Academic
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_ACADEMIC).length > 0)
          && <>
            <FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button>
          </>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_ACADEMIC).length > 0)
          && <>
            <FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button>
          </>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_ACADEMIC_ALL).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
              Export&nbsp;All
            </Button>
          </>}
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_ACADEMIC_LIST).length > 0)
            && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setAcademicEligibilityId(null);
                  setProgramId(null);
                  setProgramLevelId(null);
                  setEligibility(null);
                  seteditAddFlag(0);
                  editAcademicPopup();
                }}
            >Add Academic </Button>}
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
              {AcademicData && AcademicData?.rows && AcademicData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={AcademicData?.rows}
                    totalCount={AcademicData?.count}
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