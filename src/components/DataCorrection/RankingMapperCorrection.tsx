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
import { ImportPopup } from "./rankingmapper-master/ImportPopup";
import ConfirmDelete from "../Override/ConfirmDelete";
import { deleteRankingMapperMaster, exportAllRankingMapperMaster, exportRankingMapperMaster, getRankingMapperMaster, importRankingMapperMaster } from "src/store/actions/getRankingMapperAction";
import { EditRankingMapperPopup } from "./rankingmapper-master/AddRankingMapperPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { PUT_RANKING_MAPPER_LIST, DELETE_RANKING_MAPPER, IMPORT_RANKING_MAPPER, EXPORT_RANKING_MAPPER, EXPORT_RANKING_MAPPER_ALL, POST_RANKING_MAPPER_LIST } from "src/store/RbacConstants";

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

interface RankingMapperObject {
  EntityrnkId: number;
  EntityId: string
  EntityName: string;
  RnkorgId: number,
  RnkorgName: string;
  RnkYear: string,
  RnkNum: number,
  RnkFor: string,
}

export const RankingMapperCorrection = () => {
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
  const [entityrnkId, setEntityrnkId] = useState(null);
  const [entityId, setEntityId] = useState(null);
  const [rnkorgId, setRnkorgId] = useState(null);
  const [rnkYear, setRnkYear] = useState(null);
  const [rnkNum, setRnkNum] = useState(null);
  const [rnkFor, setRnkFor] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteRankingMapperMaster(entityrnkId));
    if (error) {
      console.log("=====>", data, error);
      msgType = 'error';
    }
    dispatch(getRankingMapperMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportRankingMapperMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportEntityCampusMaster", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllRankingMapperMaster());
    console.log("exportEntityCampusMaster", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getRankingMapperMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const RankingMapperData = useSelector(
    (state: any) => state?.getRankingMapper?.rankingMapperResponse?.data
  )
  /**
  * GET ALL ALLOWED API List
  */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const ActionHandler = (row: RankingMapperObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_RANKING_MAPPER_LIST).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          console.log("Accreditation object", row);
          setEntityrnkId(row?.EntityrnkId);
          setEntityId(row?.EntityId);
          setRnkorgId(row?.RnkorgId);
          setRnkYear(row?.RnkYear);
          setRnkNum(row?.RnkNum);
          setRnkFor(row?.RnkFor);
          editAcademicPopup();
          seteditAddFlag(1);
        }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_RANKING_MAPPER).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          setEntityrnkId(row?.EntityrnkId);
          setConfirmDialog(true)
        }}
      >
        <DeleteOutline /></Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "Entityrnk-Id",
        accessor: "EntityrnkId",
        width: 20,
      },
      {
        Header: "Entity-Name",
        accessor: "EntityName",
        width: 50,
      },
      {
        Header: "Rnkorg-Name",
        accessor: "RnkorgName",
        width: 50
      },
      {
        Header: "Rnk-Year",
        accessor: "RnkYear",
        width: 20
      },
      {
        Header: "Rnk-Num",
        accessor: "RnkNum",
        width: 20
      },
      {
        Header: "Rnk-For",
        accessor: "RnkFor",
        width: 20
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importRankingMapperMaster} refresh={getRankingMapperMaster(page + 1, limit)} popupTitle="Import Ranking Mapper" />
          {openEdit && (
            <EditRankingMapperPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              entityrnk_Id={entityrnkId}
              entity_Id={entityId}
              rnkorg_Id={rnkorgId}
              rnk_Year={rnkYear}
              rnk_Num={rnkNum}
              rnk_For={rnkFor}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            Ranking Mapper Entity
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_RANKING_MAPPER).length > 0)
          && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_RANKING_MAPPER).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_RANKING_MAPPER_ALL).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
            Export&nbsp;All
            </Button></>}
          
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_RANKING_MAPPER_LIST).length > 0)
              && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setEntityId(null);
                  setRnkorgId(null);
                  setRnkYear(null);
                  setRnkNum(null);
                  setRnkFor(null);
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
              >Add Ranking Mapper Entity</Button>}
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
              {RankingMapperData && RankingMapperData?.rows && RankingMapperData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={RankingMapperData?.rows}
                    totalCount={RankingMapperData?.count}
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