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
import { deleteCity, exportAllCity, exportCity, getCityType, importCity } from "src/store/actions/getCityAction";
import { EditCityPopup } from "./city-master/AddCityPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { DELETE_CITY_LIST, EXPORT_CITY, EXPORT_CITY_ALL, IMPORT_CITY, POST_CITY_LIST, PUT_CITY_LIST } from "src/store/RbacConstants";

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
  StateCityId: number;
  StateId: number,
  CityId: number,
  City: string;
  StateName: string;
}

export const MasterCityCorrection = () => {
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
  const [stateCityId, setStateCityId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [city, setCity] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteCity(stateCityId));
    if (error) {
      msgType = 'error';
    }
    dispatch(getCityType(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportCity(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportCity", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllCity());
    console.log("exportAllCity", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCityType(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const CityData = useSelector(
    (state: any) => state?.getCity?.cityResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )

  const ActionHandler = (row: UserObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_CITY_LIST).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          setStateCityId(row?.StateCityId);
          setStateId(row?.StateId);
          setCityId(row?.CityId)
          setCity(row?.City);
          editAcademicPopup();
          seteditAddFlag(1);
        }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_CITY_LIST).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          setStateCityId(row?.StateCityId);
          setConfirmDialog(true)
        }}
      >
        <DeleteOutline /></Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "StateCity-Id",
        accessor: "StateCityId",
        width: 20,
      },
      {
        Header: "State-Name",
        accessor: "StateName",
        width: 20,
      },
      {
        Header: "City-Id",
        accessor: "CityId",
        width: 20,
      },
      {
        Header: "City",
        accessor: "City",
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCity} refresh={getCityType(page + 1, limit)} popupTitle="Import City Master" />
          {openEdit && (
            <EditCityPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              stateCity_Id={stateCityId}
              state_Id={stateId}
              city_Id={cityId}
              city_m={city}
              page_no={page}
              limit_no={limit}
              editFlag={editAddFlag}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            City Master
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_CITY).length > 0)
          && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_CITY).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_CITY_ALL).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
              Export&nbsp;All
            </Button></>}

            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_CITY_LIST).length > 0)
            && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setStateCityId(null);
                  setStateId(null);
                  setCityId(null)
                  setCity(null);
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
            >Add City</Button>}
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
              {CityData && CityData?.rows && CityData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={CityData?.rows}
                    totalCount={CityData?.count}
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