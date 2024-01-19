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
import { ImportPopup } from "./RMOBenchmarkhour-master/ImportPopup";
import ConfirmDelete from "../Override/ConfirmDelete";
import { deleteRMOBenchmarkhour, exportAllRMOBenchmarkhour, exportRMOBenchmarkhour, getRMOBenchmarkhour, importRMOBenchmarkhour } from "src/store/actions/RMOBenchmarkhourAction";
import { EditRMOBenchmarkhourPopup } from "./RMOBenchmarkhour-master/AddRMOBenchmarkhourPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { PUT_OCCUPATION_BENCHMARK_LIST, DELETE_OCCUPATION_BENCHMARK, EXPORT_OCCUPATION_BENCHMARK, EXPORT_OCCUPATION_BENCHMARK_ALL, POST_OCCUPATION_BENCHMARK_LIST } from "src/store/RbacConstants";

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
// const type BenchmarkHPWId ={ }
interface BenchMarkhourObject {
  BmregcarId: number;
  Regcarcode: string,
  RegcarTitle: string;
  BenchmarkHPW: number,
  BenchmarkHPD: number;
  BenchmarkDPW: number;
  BenchmarkFN: string;
}

export const RMOBenchmarkhourCorrection = () => {
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
  const [bmregcarId, setBmregcarId] = useState(null);
  const [regcarcode, setRegcarcode] = useState(null);
  const [benchmarkHPW, setBenchmarkHPW] = useState(null);
  const [benchmarkHPD, setBenchmarkHPD] = useState(null);
  const [benchmarkDPW, setBenchmarkDPW] = useState(null);
  const [benchmarkFN, setBenchmarkFN] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteRMOBenchmarkhour(bmregcarId));
    if (error) {
      msgType = 'error';
    }
    dispatch(getRMOBenchmarkhour(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportRMOBenchmarkhour(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportAccomodationType", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllRMOBenchmarkhour());
    console.log("exportAllAccomodationType", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getRMOBenchmarkhour(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const AccomodationTypeData = useSelector(
    (state: any) => state?.getRMOBenchmarkhour?.RMOBenchmarkhourResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )

  const ActionHandler = (row: BenchMarkhourObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_OCCUPATION_BENCHMARK_LIST).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          setBmregcarId(row?.BmregcarId);
          setRegcarcode(row?.Regcarcode);
          setBenchmarkHPW(row?.BenchmarkHPW);
          setBenchmarkHPD(row?.BenchmarkHPD);
          setBenchmarkDPW(row?.BenchmarkDPW);
          setBenchmarkFN(row?.BenchmarkFN);
          editAcademicPopup();
          seteditAddFlag(1);
        }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_OCCUPATION_BENCHMARK).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => { setBmregcarId(row?.BmregcarId); setConfirmDialog(true) }}
      >
        <DeleteOutline />
      </Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Bmregcar-Id",
        accessor: "BmregcarId",
        width: 20,
      },
      {
        Header: "Regcar-Title",
        accessor: "RegcarTitle",
        width: 20,
      },
      {
        Header: "Benchmar-kHPW",
        accessor: "BenchmarkHPW",
        width: 20,
      },
      {
        Header: "Benchmar-kHPD",
        accessor: "BenchmarkHPD",
        width: 20,
      },
      {
        Header: "Benchmar-kDPW",
        accessor: "BenchmarkDPW",
        width: 20,
      },
      {
        Header: "Benchmark-FN",
        accessor: "BenchmarkFN",
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importRMOBenchmarkhour} refresh={getRMOBenchmarkhour(page + 1, limit)} popupTitle="Import Occupation Benchmarkhour" />
          {openEdit && (
            <EditRMOBenchmarkhourPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              bmregcar_Id={bmregcarId}
              regcar_code={regcarcode}
              benchmar_kHPW={benchmarkHPW}
              benchmar_kHPD={benchmarkHPD}
              benchmar_kDPW={benchmarkDPW}
              benchmar_kFN={benchmarkFN}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Occupation Benchmarkhour
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_BENCHMARK).length > 0)
          && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_BENCHMARK).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_BENCHMARK_ALL).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
            Export&nbsp;All
            </Button></>}
          
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_OCCUPATION_BENCHMARK_LIST).length > 0)
              && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setBmregcarId(null);
                  setRegcarcode(null);
                  setBenchmarkHPW(null);
                  setBenchmarkHPD(null)
                  setBenchmarkDPW(null);
                  setBenchmarkFN(null);
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
              >Add Benchmarkhour</Button>}
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
              {AccomodationTypeData && AccomodationTypeData?.rows && AccomodationTypeData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={AccomodationTypeData?.rows}
                    totalCount={AccomodationTypeData?.count}
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