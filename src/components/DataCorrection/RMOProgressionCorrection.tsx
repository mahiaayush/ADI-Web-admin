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
import { ImportPopup } from "./RMOProgression-master/ImportPopup";
import ConfirmDelete from "../Override/ConfirmDelete";
import { deleteRMOProgression, exportAllRMOProgression, exportRMOProgression, getRMOProgression, importRMOProgression } from "src/store/actions/RMOProgressionAction";
import { EditRMOProgressionPopup } from "./RMOProgression-master/AddRMOProgressionPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { PUT_OCCUPATION_PROGRESSION_LIST, DELETE_OCCUPATION_PROGRESSION, IMPORT_OCCUPATION_PROGRESSION, EXPORT_OCCUPATION_PROGRESSION, EXPORT_OCCUPATION_PROGRESSION_ALL, POST_OCCUPATION_PROGRESSION_LIST } from "src/store/RbacConstants";

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
// const type ProgPathId ={ }
interface UserObject {
  ProgregcarId: number;
  RegcarCode: string,
  ProgPath: number,
  ProgOrder: number;
  BenchmarkDPW: number;
  BenchmarkFN: string;
}

export const RMOProgressionCorrection = () => {
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
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [progregcarId, setProgregcarId] = useState(null);
  const [regcarCode, setRegcarCode] = useState(null);
  const [progPath, setProgPath] = useState(null);
  const [progOrder, setProgOrder] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteRMOProgression(progregcarId));
    if (error) {
      console.log("=====>", data, error);
      msgType = 'error';
    }
    dispatch(getRMOProgression(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportRMOProgression(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportRMOProgression", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllRMOProgression());
    console.log("exportAllRMOProgression", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getRMOProgression(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const RMOProgressionData = useSelector(
    (state: any) => state?.getRMOProgression?.RMOProgressionResponse?.data
  )
  
  /**
    * GET ALL ALLOWED API List
    */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )

  const ActionHandler = (row: UserObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_OCCUPATION_PROGRESSION_LIST).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          setProgregcarId(row?.ProgregcarId);
          setRegcarCode(row?.RegcarCode);
          setProgPath(row?.ProgPath);
          setProgOrder(row?.ProgOrder);
          editAcademicPopup();
          seteditAddFlag(1);
        }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_OCCUPATION_PROGRESSION).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => { setProgregcarId(row?.ProgregcarId); setConfirmDialog(true) }}
      >
        <DeleteOutline />
      </Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "progregcarId",
        accessor: "ProgregcarId",
        width: 20,
      },
      {
        Header: "Regcar-Title",
        accessor: "RegcarTitle",
        width: 20,
      },
      {
        Header: "Prog-Path",
        accessor: "ProgPath",
        width: 20,
      },
      {
        Header: "Prog-Order",
        accessor: "ProgOrder",
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importRMOProgression} refresh={getRMOProgression(page + 1, limit)} popupTitle="Import Occupatio Progression" />
          {openEdit && (
            <EditRMOProgressionPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              bmregcar_Id={progregcarId}
              regcar_code={regcarCode}
              benchmar_kHPW={progPath}
              benchmar_kHPD={progOrder}
              Page_n={page}
              limit_page={limit}
              editFlag={editAddFlag}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Occupation Progression
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_OCCUPATION_PROGRESSION).length > 0)
            && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
            {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_PROGRESSION).length > 0)
            && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
            {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_PROGRESSION_ALL).length > 0)
            && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
            Export&nbsp;All
            </Button></>}
          
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_OCCUPATION_PROGRESSION_LIST).length > 0)
              && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setProgregcarId(null);
                  setRegcarCode(null);
                  setProgPath(null);
                  setProgOrder(null)
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
              >Add Progression</Button>}
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
              {RMOProgressionData && RMOProgressionData?.rows && RMOProgressionData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={RMOProgressionData?.rows}
                    totalCount={RMOProgressionData?.count}
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