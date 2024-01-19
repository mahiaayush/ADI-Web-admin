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
import { deleteOccupationMaster, exportAllOccupationMaster, exportOccupationMaster, getOccupationMaster, importOccupationMaster } from "src/store/actions/getMasterOccupationAction";
import { EditOccupationPopup } from "./occupation-master/AddOccupationPopup";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { PUT_OCC_ACCOMODATION_LIST, DELETE_OCC_ACCOMODATION, IMPORT_OCC_ACCOMODATION, EXPORT_OCC_ACCOMODATION, EXPORT_OCC_ACCOMODATION_ALL, POST_OCC_ACCOMODATION_LIST } from "src/store/RbacConstants";

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

interface UserObject {
  Status: string;
  RnkNum: number;
  RnkFor: string;
  OnetsocCode: string;
  OnetsocTitle: string;
  OnetsocDesc: string;
}
export type Color = 'success' | 'info' | 'warning' | 'error';
const initMsgObj: { type: Color, message: string, details: string } = {
  type: 'success',
  message: '',
  details: ''
}
export const MasterOccupationCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState(initMsgObj)
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [onetsocCode, setOnetsocCode] = useState(null);
  const [onetsocTitle, setOnetsocTitle] = useState(null);
  const [onetsocDesc, setOnetsocDesc] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);
  const [ExpendedIndex, setExpendedIndex] = useState("");

  let msgType: Color = 'success';
  const displayMessage = (obj: { type: Color, message: string, details: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteOccupationMaster(onetsocCode));
    if (error) {
      msgType = 'error';
    }
    dispatch(getOccupationMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, details: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }
  const OneDescExpandable = (row: UserObject) => {
    return <div>
      {(ExpendedIndex === row.OnetsocCode) ? <span dangerouslySetInnerHTML={{ __html: row.OnetsocDesc }} /> : <span dangerouslySetInnerHTML={{ __html: row.OnetsocDesc?.slice(0, 45) }} />}
      {(row.OnetsocDesc.length > 45) ? (ExpendedIndex !== row.OnetsocCode) ? <ArrowDropDownIcon onClick={(e) => { setExpendedIndex(row.OnetsocCode) }} color="primary" fontSize="small" /> : <ArrowDropUpIcon onClick={(e) => { setExpendedIndex("") }} color="primary" fontSize="small" /> : ''}
    </div>
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportOccupationMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportCollegeEventMaster", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllOccupationMaster());
    console.log("exportAllCollegeEventMaster", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getOccupationMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const MasterOccupationData = useSelector(
    (state: any) => state?.getOccupation?.OccpationResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const ActionHandler = (row: UserObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_OCC_ACCOMODATION_LIST).length > 0)
      && <Button onClick={() => {
        setOnetsocCode(row?.OnetsocCode);
        setOnetsocTitle(row?.OnetsocTitle);
        setOnetsocDesc(row?.OnetsocDesc);
        editAcademicPopup();
        seteditAddFlag(1);
      }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_OCC_ACCOMODATION).length > 0)
      && <Button onClick={() => { setOnetsocCode(row?.OnetsocCode); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Onetsoc-Code",
        accessor: "OnetsocCode",
        width: 18,
      },
      {
        Header: "Onetsoc-Title",
        accessor: "OnetsocTitle",
        width: 80,
      },
      {
        Header: "OnetsocDesc",
        accessor: OneDescExpandable,
        width: 60
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 20
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importOccupationMaster} refresh={getOccupationMaster(page + 1, limit)} popupTitle="Import Occupation Master" />
          {openEdit && (
            <EditOccupationPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              onetsoc_Code={onetsocCode}
              onetsoc_Title={onetsocTitle}
              onetsoc_Desc={onetsocDesc}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Occupation Master
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_OCC_ACCOMODATION).length > 0)
          && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCC_ACCOMODATION).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCC_ACCOMODATION_ALL).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
            Export&nbsp;All
            </Button></>}
          
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_OCC_ACCOMODATION_LIST).length > 0)
              && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setOnetsocCode(null);
                  setOnetsocTitle(null);
                  setOnetsocDesc(null);
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
              >Add Occupation Master</Button>}
            </div>
          </div>
          {isMessage && (
            <Alert severity={MessageObj?.type}>
              {MessageObj?.message}<strong>!</strong>
            </Alert>)}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {MasterOccupationData && MasterOccupationData?.rows && MasterOccupationData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={MasterOccupationData?.rows}
                    totalCount={MasterOccupationData?.count}
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