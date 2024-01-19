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
import { deleteRMOEmployment, exportAllRMOEmployment, exportRMOEmployment, getRMOEmployment, importRMOEmployment } from "src/store/actions/RMOEmploymentStatusAction";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import AddOCCEmploymentStatusPopup from "./correction-popup/AddOCCEmploymentStatusPopup";
import { DELETE_OCC_EMPLOYMENT_STATUS, PUT_OCC_EMPLOYMENT_STATUS_LIST, IMPORT_OCC_EMPLOYMENT_STATUS, EXPORT_OCC_EMPLOYMENT_STATUS, EXPORT_OCC_EMPLOYMENT_STATUS_ALL, POST_OCC_EMPLOYMENT_STATUS_LIST } from "src/store/RbacConstants";

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
interface UserObject {
  EmpStatusRegcarId: number;
  RegcarCode: string,
  EmploymentStatus: any
}

export const EmploymentStatusCorrection = () => {
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
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [EmpStatusRegcarId, setEmpStatusRegcarId] = useState(null);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteRMOEmployment(EmpStatusRegcarId));
    if (error) {
      console.log("=====>", data, error);
      msgType = 'error';
    }
    dispatch(getRMOEmployment(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }
  const addOCCEmpStatus = (id = 0) => {
    setEmpStatusRegcarId(id)
    setOpenAdd(!openAdd);
  }
  const editOCCEmpStatus = (id) => {
    setEmpStatusRegcarId(id)
    setOpenAdd(!openAdd);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportRMOEmployment(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportCity", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllRMOEmployment());
    console.log("exportAllCity", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getRMOEmployment(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const RMOEmploymentData = useSelector(
    (state: any) => state?.getRMOEmployment?.RMOEmploymentResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )

  const EmploymentStatusHandler = (row: UserObject) => {
    const EmpNames = row?.EmploymentStatus?.map((itm: any) => itm?.EmploymentStatusName)?.join(', ');
    return <span>{EmpNames}</span>
  }
  const ActionHandler = (row: UserObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_OCC_EMPLOYMENT_STATUS).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          editOCCEmpStatus(row?.EmpStatusRegcarId);
        }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_OCC_EMPLOYMENT_STATUS_LIST).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => { setEmpStatusRegcarId(row?.EmpStatusRegcarId); setConfirmDialog(true) }}
      >
        <DeleteOutline />
      </Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "EmpStatusRegcarId",
        width: 20,
      },
      {
        Header: "Regcar-Code",
        accessor: "RegcarCode",
        width: 20,
      },
      {
        Header: "EmploymentStatus",
        accessor: EmploymentStatusHandler,
        width: 100,
        disableSortBy: true,
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importRMOEmployment} refresh={getRMOEmployment(page + 1, limit)} popupTitle="Import Exam Type" />
          {openAdd && (
            <AddOCCEmploymentStatusPopup
              openAdd={openAdd} 
              setOpenAdd={setOpenAdd} 
              EmpStatusRegcarId={EmpStatusRegcarId}
              page={page}
              limit={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Employement Status
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_OCC_EMPLOYMENT_STATUS).length > 0)
          && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCC_EMPLOYMENT_STATUS).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCC_EMPLOYMENT_STATUS_ALL).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
            Export&nbsp;All
            </Button></>}
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_OCC_EMPLOYMENT_STATUS_LIST).length > 0)
              && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  addOCCEmpStatus(0);
                }}
              >Add Employment Status</Button>}
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
              {RMOEmploymentData && RMOEmploymentData?.rows && RMOEmploymentData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={RMOEmploymentData?.rows}
                    totalCount={RMOEmploymentData?.count}
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