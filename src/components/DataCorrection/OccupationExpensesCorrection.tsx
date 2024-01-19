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
import { deleteOccupationExpenses, exportAllOcupationExpenses, exportOcupationExpenses, getOccupationExpenses, importOccupationExpenses } from "src/store/actions/OccupationExpensesAction";
import { EditOccupationExpensesPopup } from "./occupationExpenses-master/AddOccupationExpensesPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { PUT_OCCUPATION_EXPENSES_LIST, DELETE_OCCUPATION_EXPENSES, IMPORT_OCCUPATION_EXPENSES, EXPORT_OCCUPATION_EXPENSES, EXPORT_OCCUPATION_EXPENSES_ALL, POST_OCCUPATION_EXPENSES_LIST } from "src/store/RbacConstants";

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
interface OccupationExpensesObject {
  ExpregcarId: number;
  RegcarCode: string,
  RegCarTitle: string;
  ExpregcarFn: string,
  ExpregcarVal: number;
}

export const OccupationExpensesCorrection = () => {
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
  const [expregcarId, setExpregcarId] = useState(null);
  const [regcarCode, setRegcarCode] = useState(null);
  const [expregcarFn, setExpregcarFn] = useState(null);
  const [expregcarVal, setExpregcarVal] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteOccupationExpenses(expregcarId));
    if (error) {
      msgType = 'error';
    }
    dispatch(getOccupationExpenses(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportOcupationExpenses(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportOcupationExpenses", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllOcupationExpenses());
    console.log("exportAllOcupationExpenses", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getOccupationExpenses(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const OccupationExamData = useSelector(
    (state: any) => state?.getOccupationExpenses?.OccupationExpensesResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )

  const ActionHandler = (row: OccupationExpensesObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_OCCUPATION_EXPENSES_LIST).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          setExpregcarId(row?.ExpregcarId);
          setRegcarCode(row?.RegcarCode);
          setExpregcarFn(row?.ExpregcarFn);
          setExpregcarVal(row?.ExpregcarVal);
          editAcademicPopup();
          seteditAddFlag(1);
        }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_OCCUPATION_EXPENSES).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => { setExpregcarId(row?.ExpregcarId); setConfirmDialog(true) }}
      >
        <DeleteOutline />
      </Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Expregcar-Id",
        accessor: "ExpregcarId",
        width: 20,
      },
      {
        Header: "RegCar-Title",
        accessor: "RegCarTitle",
        width: 20,
      },
      {
        Header: "Expregcar-Fn",
        accessor: "ExpregcarFn",
        width: 20,
      },
      {
        Header: "Expregcar-Val",
        accessor: "ExpregcarVal",
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
          {/* <ImportPopup openImport={openImport} setOpenImport={setOpenImport} /> */}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importOccupationExpenses} refresh={getOccupationExpenses(page + 1, limit)} popupTitle="Import Occupatio Expenses" />
          {openEdit && (
            <EditOccupationExpensesPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              examregcar_Id={expregcarId}
              regcar_Code={regcarCode}
              expregcar_Fn={expregcarFn}
              expregcar_Val={expregcarVal}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Occupation Expenses
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_OCCUPATION_EXPENSES).length > 0)
          && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_EXPENSES).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_EXPENSES_ALL).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
            Export&nbsp;All
            </Button></>}
          
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_OCCUPATION_EXPENSES_LIST).length > 0)
              && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setExpregcarId(null);
                  setRegcarCode(null);
                  setExpregcarFn(null);
                  setExpregcarVal(null)
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
              >Add OccupationExpense</Button>}
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