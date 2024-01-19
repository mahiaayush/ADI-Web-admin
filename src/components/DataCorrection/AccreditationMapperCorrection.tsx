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
import { deleteAccreditationMaster, exportAccreditationMaster, exportAllAccreditationMaster, getAccreditationMaster, importAccreditationMaster } from "src/store/actions/getAccreditationAction";
import { EditAccreditationPopup } from "./accreditationMapper-master/AddAccreditationPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { PUT_ACCREDITATION_MAPPER_LIST, DELETE_ACCREDITATION_MAPPER, IMPORT_ACCREDITATION_MAPPER, EXPORT_ACCREDITATION_MAPPER, EXPORT_ACCREDITATION_MAPPER_ALL, POST_ACCREDITATION_MAPPER_LIST } from "src/store/RbacConstants";

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

interface AccreditationMapperObject {
  EntityaccrId: number;
  EntityId: string;
  AccrediationId: number;
}

export const AccreditationCorrection = () => {
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
  const [entityaccrId, setEntityaccrId] = useState(null);
  const [entityId, setEntityId] = useState(null);
  const [accrediationId, setAccrediationId] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteAccreditationMaster(entityaccrId));
    if (error) {
      console.log("=====>", data, error);
      msgType = 'error';
    }
    dispatch(getAccreditationMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportAccreditationMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportAcademicMaster", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllAccreditationMaster());
    console.log("exportAllAcademicMaster", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getAccreditationMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const AccreditationData = useSelector(
    (state: any) => state?.getAccreditation?.accreditationResponse?.data
  )
  /**
  * GET ALL ALLOWED API List
  */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const ActionHandler = (row: AccreditationMapperObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_ACCREDITATION_MAPPER_LIST).length > 0)
      && <Button onClick={() => {
        console.log("Accreditation object", row);
        setEntityId(row?.EntityId);
        setAccrediationId(row?.AccrediationId);
        setEntityaccrId(row?.EntityaccrId);
        editAcademicPopup();
        seteditAddFlag(1);
      }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_ACCREDITATION_MAPPER).length > 0)
      && <Button onClick={() => { setEntityaccrId(row?.EntityaccrId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Entityaccr-Id",
        accessor: "EntityaccrId",
        width: 30,
      },
      {
        Header: "EntityName",
        accessor: "EntityName",
        width: 50,
      },
      {
        Header: "AccrediationTitle",
        accessor: "AccrediationTitle",
        width: 30
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 30
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importAccreditationMaster} refresh={getAccreditationMaster(page + 1, limit)} popupTitle="Import Accrediation Mapper" />
          {openEdit && (
            <EditAccreditationPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              entityaccr_Id={entityaccrId}
              entity_Id={entityId}
              accrediation_Id={accrediationId}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Accreditation Mapper
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_ACCREDITATION_MAPPER).length > 0)
            && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
            {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_ACCREDITATION_MAPPER).length > 0)
            && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
            {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_ACCREDITATION_MAPPER_ALL).length > 0)
            && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
            Export&nbsp;All
            </Button></>}
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_ACCREDITATION_MAPPER_LIST).length > 0)
            && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setEntityId(null);
                  setAccrediationId(null);
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
            >Add Accreditation Mapper</Button>}
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
              {AccreditationData && AccreditationData?.rows && AccreditationData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={AccreditationData?.rows}
                    totalCount={AccreditationData?.count}
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