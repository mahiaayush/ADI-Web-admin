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
import { EditEntityCampusPopup } from "./entitycampus-master/AddEntityCampusPopup"
import { deleteEntityCampusMaster, exportAllEntityCampusMaster, exportEntityCampusMaster, getEntityCampusMaster, importEntityCampusMaster } from "src/store/actions/getEntityCampusAction";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { PUT_CAMPUS_LIST, DELETE_CAMPUS, IMPORT_CAMPUS, EXPORT_CAMPUS, EXPORT_CAMPUS_ALL, POST_CAMPUS_LIST } from "src/store/RbacConstants";

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

interface EntityCampusObject {
  EntityId: string;
  EntityName: String;
  CampusId: number;
  CampusName: number;
  CampusAddress: string;
  CampusUrl: string;
  CampusImg: string;
  Status: string;
}

export const EntityCampusCorrection = () => {
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
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [campusId, setCampusId] = useState(null);
  const [entityId, setEntityId] = useState(null);
  const [campusName, setCampusName] = useState(null);
  const [campusAddress, setCampusAddress] = useState(null);
  const [campusUrl, setCampusUrl] = useState(null);
  const [campusImg, setCampusImg] = useState(null);
  const [status, setStatus] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteEntityCampusMaster(campusId));
    if (error) {
      console.log("=====>", data, error);
      msgType = 'error';
    }
    dispatch(getEntityCampusMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportEntityCampusMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportEntityCampusMaster", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllEntityCampusMaster());
    console.log("exportAllEntityCampusMaster", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getEntityCampusMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const EntityCampusData = useSelector(
    (state: any) => state?.getEntityCampus?.entitycampusResponse?.data
  )
  /**
  * GET ALL ALLOWED API List
  */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const ActionHandler = (row: EntityCampusObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_CAMPUS_LIST).length > 0)
      && <Button
        style={{ minWidth: "0px" }}
        onClick={() => {
          console.log("Accreditation object", row);
          setEntityId(row?.EntityId);
          setCampusId(row?.CampusId);
          setCampusName(row?.CampusName);
          setCampusAddress(row?.CampusAddress);
          setCampusUrl(row?.CampusUrl);
          setCampusImg(row?.CampusImg);
          setStatus(row?.Status);
          editAcademicPopup();
          seteditAddFlag(1);
        }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_CAMPUS).length > 0)
      && <Button style={{ minWidth: "0px" }} onClick={() => { setCampusId(row?.CampusId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Campus-Id",
        accessor: "CampusId",
        width: 30,
      },
      {
        Header: "Entity-Name",
        accessor: "EntityName",
        width: 50,
      },
      {
        Header: "Campus-Name",
        accessor: "CampusName",
        width: 30
      },
      {
        Header: "Campus-Address",
        accessor: "CampusAddress",
        width: 50
      },
      {
        Header: "Campus-Url",
        accessor: "CampusUrl",
        width: 50
      },
      {
        Header: "Campus-Img",
        accessor: "CampusImg",
        width: 20
      },
      {
        Header: "Status",
        accessor: "Status",
        width: 10
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 35
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importEntityCampusMaster} refresh={getEntityCampusMaster(page + 1, limit)} popupTitle="Import Campus Entity" />
          {openEdit && (
            <EditEntityCampusPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              campus_Id={campusId}
              entity_Id={entityId}
              campus_Name={campusName}
              campus_Address={campusAddress}
              campus_Url={campusUrl}
              campus_Img={campusImg}
              Status={status}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Campus Entity
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_CAMPUS).length > 0)
          && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_CAMPUS).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_CAMPUS_ALL).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
            Export&nbsp;All
            </Button></>}
          
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_CAMPUS_LIST).length > 0)
              && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setEntityId(null);
                  setCampusName(null);
                  setCampusAddress(null);
                  setCampusUrl(null);
                  setCampusImg(null);
                  setStatus(null);
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
              >Add Campus Entity</Button>}
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
              {EntityCampusData && EntityCampusData?.rows && EntityCampusData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={EntityCampusData?.rows}
                    totalCount={EntityCampusData?.count}
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