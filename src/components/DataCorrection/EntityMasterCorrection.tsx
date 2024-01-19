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
import { deleteMasterEntity, exportMasterAllEntity, exportMasterEntity, getMasterEntity, importMasterEntity } from "src/store/actions/getMasterEntityCoursesAction";
import { EntityMasterPopup } from "./entity-masterPop/AddEntityMasterPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { PUT_MASTER_ENTITY_LIST, DELETE_MASTER_ENTITY, IMPORT_MASTER_ENTITY, EXPORT_MASTER_ENTITY, EXPORT_MASTER_ENTITY_ALL, POST_MASTER_ENTITY_LIST } from "src/store/RbacConstants";

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

interface EntityMasterObject {
  EntityId: string;
  EntityTypeId: number;
  EntityName: string;
  EntityAlias: string,
  EntityOrigin: number,
  Salt: string,
  RequestId: string;
  JoinCode: string;
  EntityStreetAddress: string;
  EntityLocality: string;
  EntityRegion: string;
  EntityPostalCode: string;
  EntityCountry: string;
  StateId: number;
  CityId: number;
  EntityWebAddress: string;
  Naac: string;
  Status: string;
  IsWebinar: string;
}
export type Color = 'success' | 'info' | 'warning' | 'error';
const initMsgObj: { type: Color, message: string, details: string } = {
  type: 'success',
  message: '',
  details: ''
}

export const EntityMasterCoursesCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState(initMsgObj);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [openImport, setOpenImport] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [entityId, setEntityId] = useState(null);
  const [entityTypeId, setEntityTypeId] = useState(null);
  const [entityName, setEntityName] = useState(null);
  const [entityAlias, setEntityAlias] = useState(null);
  const [entityOrigin, setEntityOrigin] = useState(null);
  const [salt, setSalt] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [joinCode, setJoinCode] = useState(null);
  const [entityStreetAddress, setEntityStreetAddress] = useState(null);
  const [entityLocality, setEntityLocality] = useState(null);
  const [entityRegion, setEntityRegion] = useState(null);
  const [entityPostalCode, setEntityPostalCode] = useState(null);
  const [entityCountry, setEntityCountry] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [entityWebAddress, setEntityWebAddress] = useState(null);
  const [naac, setNaac] = useState(null);
  const [status, setStatus] = useState(null);
  const [isWebinar, setIsWebinar] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  let msgType: Color = 'success';
  const displayMessage = (obj: { type: Color, message: string, details: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteMasterEntity(entityId));
    let message = data?.message;
    if (error) {
      msgType = 'error';
      message = error?.message;
    }
    dispatch(getMasterEntity(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message, details: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportMasterEntity(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
  }

  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportMasterAllEntity());
    console.log("exportAllCollegeEventMaster", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getMasterEntity(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const EntityCoursesData = useSelector(
    (state: any) => state?.getMasterCourses?.entitycoursesResponse?.data
  )
  /**
  * GET ALL ALLOWED API List
  */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const ActionHandler = (row: EntityMasterObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_MASTER_ENTITY_LIST).length > 0)
      && <Button
          onClick={() => {
            console.log("CollegeEvent object", row);
            setEntityTypeId(row?.EntityTypeId);
            setEntityId(row?.EntityId);
            setEntityName(row?.EntityName);
            setEntityAlias(row?.EntityAlias);
            setEntityOrigin(row?.EntityOrigin);
            setSalt(row?.Salt);
            setRequestId(row?.RequestId);
            setJoinCode(row?.JoinCode);
            setEntityStreetAddress(row?.EntityStreetAddress);
            setEntityLocality(row?.EntityLocality);
            setEntityRegion(row?.EntityRegion);
            setEntityPostalCode(row?.EntityPostalCode);
            setEntityCountry(row?.EntityCountry);
            setStateId(row?.StateId);
            setCityId(row?.CityId);
            setEntityWebAddress(row?.EntityStreetAddress);
            setNaac(row?.Naac);
            setStatus(row?.Status);
            setIsWebinar(row?.IsWebinar);
            editAcademicPopup();
            seteditAddFlag(1);
          }}
          style={{ minWidth: "0px" }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_MASTER_ENTITY).length > 0)
      && <Button style={{ minWidth: "0px" }} onClick={() => { setEntityId(row?.EntityId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Entity-Id",
        accessor: "EntityId",
        width: 40,
      },
      {
        Header: "Type-Id",
        accessor: "EntityTypeId",
        width: 20,
      },
      {
        Header: "EntityName",
        accessor: "EntityName",
        width: 40,
      },
      {
        Header: "EntityAlias",
        accessor: "EntityAlias",
        width: 40,
      },
      {
        Header: "EntityOrigin",
        accessor: "EntityOrigin",
        width: 20
      },
      {
        Header: "Join-Code",
        accessor: "JoinCode",
        width: 30
      },
      {
        Header: "Status",
        accessor: "Status",
        width: 10
      },
      {
        Header: "StateName",
        accessor: "StateName",
        width: 25
      },
      {
        Header: "Type-Name",
        accessor: "EntitytypeName",
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importMasterEntity} refresh={getMasterEntity(page + 1, limit)} popupTitle="Import Entity Master" />
          {openEdit && (
            <EntityMasterPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              entity_Id={entityId}
              entityType_Id={entityTypeId}
              entity_Name={entityName}
              entity_Alias={entityAlias}
              entity_Origin={entityOrigin}
              salt_={salt}
              request_id={requestId}
              join_Code={joinCode}
              entity_StreetAddress={entityStreetAddress}
              entity_Locality={entityLocality}
              entity_Region={entityRegion}
              entity_PostalCode={entityPostalCode}
              entity_Country={entityCountry}
              state_Id={stateId}
              city_Id={cityId}
              entity_WebAddress={entityWebAddress}
              naac_={naac}
              status_={status}
              is_Webinar={isWebinar}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Entity Master
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_MASTER_ENTITY).length > 0)
            && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
            {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_MASTER_ENTITY).length > 0)
            && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
            {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_MASTER_ENTITY_ALL).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
            Export&nbsp;All
            </Button></>}
          
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_MASTER_ENTITY_LIST).length > 0)
              && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setEntityTypeId(null);
                  setEntityId(null);
                  setEntityName(null);
                  setEntityAlias(undefined);
                  setEntityOrigin(undefined);
                  setSalt(undefined);
                  setRequestId(null);
                  setJoinCode(undefined);
                  setEntityStreetAddress(undefined);
                  setEntityLocality(undefined);
                  setEntityRegion(undefined);
                  setEntityPostalCode(undefined);
                  setEntityCountry(undefined);
                  setStateId(undefined);
                  setCityId(undefined);
                  setEntityWebAddress(undefined);
                  setNaac(undefined);
                  setStatus(null);
                  setIsWebinar(undefined);
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
              >Add Entity Master</Button>}
            </div>
          </div>
          {console.log(typeof MessageObj?.type, msgType)}
          {isMessage && (
            <Alert severity={MessageObj?.type}>
              {MessageObj?.message}<strong>!</strong>
            </Alert>)}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {EntityCoursesData && EntityCoursesData?.rows && EntityCoursesData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={EntityCoursesData?.rows}
                    totalCount={EntityCoursesData?.count}
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