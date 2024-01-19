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
import { getProgramMaster, deleteProgramMaster, exportProgramMaster, exportAllProgramMaster, importProgramMaster } from '../../store/actions/getProgramAction';
import ConfirmDelete from "../Override/ConfirmDelete";
import { EditProgramPopup } from "./program-master/AddProgramPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { DELETE_PROGRAM, EXPORT_PROGRAM, EXPORT_PROGRAM_ALL, IMPORT_PROGRAM, POST_PROGRAM_LIST, PUT_PROGRAM_LIST } from "src/store/RbacConstants";

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

interface ProgramObject {
  ProgramId: number;
  EntityId: string;
  ProgramLevelId: number;
  IntakeId: number;
  DisciplineId: number;
  DisciplineName: string;
  ProgramTitle: string;
  ProgramAlias: string;
  ProgramHighlights: string;
  ProgramDuration: string;
  TutionFee: number;
  ApplicationFee: number;
  ApplicationDeadline: string;
  ProgramEligibilityOther: string;
  Status: string;
}

export const ProgramCorrection = () => {
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
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [ProgramId, setProgramId] = useState(null);
  const [EntityId, setEntityId] = useState("");
  const [ProgramLevelId, setProgramLevelId] = useState(null);
  const [IntakeId, setIntakeId] = useState(null);
  const [DisciplineId, setDisciplineId] = useState(null);
  const [ProgramTitle, setProgramTitle] = useState("");
  const [ProgramAlias, setProgramAlias] = useState("");
  const [ProgramHighlights, setProgramHighlights] = useState("");
  const [ProgramDuration, setProgramDuration] = useState("");
  const [TutionFee, setTutionFee] = useState(null);
  const [ApplicationFee, setApplicationFee] = useState(null);
  const [ApplicationDeadline, setApplicationDeadline] = useState(null);
  const [ProgramEligibilityOther, setProgramEligibilityOther] = useState("");
  const [editAddFlag, seteditAddFlag] = useState(0);
  const [Status, setStatus] = useState("");

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 3000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteProgramMaster(ProgramId));
    if (error) {
      msgType = 'error';
    }
    dispatch(getProgramMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportProgramMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportProgram", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllProgramMaster());
    console.log("exportAllProgram", data, error);
  }
  const createProgramPopup = () => {
    setOpenAdd(!openAdd);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }
  const editProgramPopup = () => {
    setOpenEdit(!openEdit);
  };

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getProgramMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const CollegeData = useSelector(
    (state: any) => state?.getProgram?.programResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const ActionHandler = (row: ProgramObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_PROGRAM_LIST).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          setEntityId(row?.EntityId);
          setProgramId(row?.ProgramId);
          setProgramLevelId(row?.ProgramLevelId);
          setIntakeId(row?.IntakeId);
          setDisciplineId(row?.DisciplineId);
          setProgramTitle(row?.ProgramTitle);
          setProgramAlias(row?.ProgramAlias);
          setProgramHighlights(row?.ProgramHighlights);
          setProgramDuration(row?.ProgramDuration);
          setTutionFee(row?.TutionFee);
          setApplicationFee(row?.ApplicationFee);
          setApplicationDeadline(row?.ApplicationDeadline);
          setProgramEligibilityOther(row?.ProgramEligibilityOther);
          setStatus(row?.Status);
          seteditAddFlag(1);
          editProgramPopup();
        }}
      ><EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_PROGRAM).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setProgramId(row?.ProgramId); setConfirmDialog(true) }}>
        <DeleteOutline />
      </Button>}
      </hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Program-Id",
        accessor: "ProgramId",
        width: 20,
      },
      {
        Header: "Intake-Id",
        accessor: "IntakeId",
        width: 10
      },
      {
        Header: "Discipline-Name",
        accessor: "DisciplineName",
        width: 40
      },
      {
        Header: "Program-Title",
        accessor: "ProgramTitle",
        width: 40
      },
      {
        Header: "ProgramAlias",
        accessor: "ProgramAlias",
        width: 40
      },
      {
        Header: "TutionFee",
        accessor: "TutionFee",
        width: 30
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importProgramMaster} refresh={getProgramMaster(page + 1, limit)} popupTitle="Import Program Master" />
          {openEdit && (
            <EditProgramPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              programId={ProgramId}
              entity={EntityId}
              programLevelId={ProgramLevelId}
              intake={IntakeId}
              discipline={DisciplineId}
              programT={ProgramTitle}
              programA={ProgramAlias}
              programHigh={ProgramHighlights}
              programD={ProgramDuration}
              tutionF={TutionFee}
              applicationF={ApplicationFee}
              applicationDeadL={ApplicationDeadline}
              programEligibility={ProgramEligibilityOther}
              Status={Status}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Program
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_PROGRAM).length > 0)
          && <>
            <FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button>
          </>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_PROGRAM).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_PROGRAM_ALL).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
              Export&nbsp;All
            </Button></>}
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_PROGRAM_LIST).length > 0)
            && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setEntityId(null);
                  setProgramId(null);
                  setProgramLevelId(null);
                  setIntakeId(null);
                  setDisciplineId(null);
                  setProgramTitle(null);
                  setProgramAlias(null);
                  setProgramHighlights(null);
                  setProgramDuration(null);
                  setTutionFee(null);
                  setApplicationFee(null);
                  setApplicationDeadline(null);
                  setProgramEligibilityOther(null);
                  setStatus(null);
                  seteditAddFlag(0);
                  editProgramPopup();
                }}
            >Add Program
            </Button>}
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
              {CollegeData && CollegeData?.rows && CollegeData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={CollegeData?.rows}
                    totalCount={CollegeData?.count}
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