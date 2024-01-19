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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { deleteCollegeEventMaster, exportAllCollegeEventMaster, exportCollegeEventMaster, getCollegeEventMaster, importCollegeEventMaster } from "src/store/actions/getCollegeEventAction";
import { EditCollegeEventPopup } from "./collegeEvent-master/AddCollegeEventPopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { DELETE_COLLEGE_EVENT, EXPORT_COLLEGE_EVENT, EXPORT_COLLEGE_EVENT_ALL, IMPORT_COLLEGE_EVENT, POST_COLLEGE_EVENT_LIST, PUT_COLLEGE_EVENT_LIST } from "src/store/RbacConstants";

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

interface CollegeEventObject {
  CollegeEventId: number;
  EntityCollegeId: number;
  EntityAbout: string;
  CollegeEventHeading: string;
  Status: string;
}

export const CollegeEventCorrection = () => {
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
  const [collegeEventId, setCollegeEventId] = useState(null);
  const [entityCollegeId, setEntityCollegeId] = useState(null);
  const [collegeEventHeading, setCollegeEventHeading] = useState(null);
  const [status, setStatus] = useState(null);
  const [editAddFlag, seteditAddFlag] = useState(0);
  const [ExpendedIndexDesc, setExpendedIndexDesc] = useState(0);
  const [ExpendedIndexSub, setExpendedIndexSub] = useState(0);

  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteCollegeEventMaster(collegeEventId));
    if (error) {
      console.log("=====>", data, error);
      msgType = 'error';
    }
    dispatch(getCollegeEventMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }

  const editAcademicPopup = () => {
    setOpenEdit(!openEdit);
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportCollegeEventMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    console.log("exportCollegeEventMaster", data, error);
  }
  const downloadAllExcel = async () => {
    const { data, error } = await dispatch(exportAllCollegeEventMaster());
    console.log("exportAllCollegeEventMaster", data, error);
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCollegeEventMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const CollegeEventData = useSelector(
    (state: any) => state?.getCollegeEvent?.collegeEventResponse?.data
  )
  /**
     * GET ALL ALLOWED API List
     */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const ActionHandler = (row: CollegeEventObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COLLEGE_EVENT_LIST).length > 0)
      && <Button
        style={{ minWidth: '0px' }}
        onClick={() => {
          console.log("CollegeEvent object", row);
          setCollegeEventId(row?.CollegeEventId);
          setEntityCollegeId(row?.EntityCollegeId);
          setCollegeEventHeading(row?.CollegeEventHeading);
          setStatus(row?.Status);
          editAcademicPopup();
          seteditAddFlag(1);
        }}
      >
        <EditSharp />
      </Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COLLEGE_EVENT).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setCollegeEventId(row?.CollegeEventId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }
  const EntityAboutExpendable = (row: CollegeEventObject) => {
    return <div>
      {(ExpendedIndexDesc === row?.CollegeEventId) ? <span dangerouslySetInnerHTML={{ __html: row?.EntityAbout }} /> : <span dangerouslySetInnerHTML={{ __html: row?.EntityAbout?.slice(0, 20) }} />}
      {(row?.EntityAbout?.length > 20) ? (ExpendedIndexDesc !== row?.CollegeEventId) ? <ArrowDropDownIcon onClick={(e) => { setExpendedIndexDesc(row?.CollegeEventId) }} color="primary" fontSize="small" /> : <ArrowDropUpIcon onClick={(e) => { setExpendedIndexDesc(0) }} color="primary" fontSize="small" /> : ''}
    </div>
  }

  const columns = useMemo(
    () => [
      {
        Header: "CollegeEvent-Id",
        accessor: "CollegeEventId",
        width: 20,
      },
      {
        Header: "EntityAbout",
        accessor: EntityAboutExpendable,
        width: 20,
      },
      {
        Header: "CollegeEvent-Heading",
        accessor: "CollegeEventHeading",
        width: 30
      },
      {
        Header: "Status",
        accessor: "Status",
        width: 20
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 20
      },
    ],
    [ExpendedIndexDesc, ExpendedIndexSub, roleAllowedApis]
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
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCollegeEventMaster} refresh={getCollegeEventMaster(page + 1, limit)} popupTitle="Import College Event" />
          {openEdit && (
            <EditCollegeEventPopup
              openEdit={openEdit}
              setOpenEdit={setOpenEdit}
              collegeEvent_Id={collegeEventId}
              entityCollege_Id={entityCollegeId}
              collegeEvent_Heading={collegeEventHeading}
              Status={status}
              editFlag={editAddFlag}
              page_no={page}
              limit_no={limit}
            />
          )}
          <Typography color="textPrimary" variant="h5">
            College Event
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <div className="import_export_div">
          {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COLLEGE_EVENT).length > 0)
          && <><FileUpload color="primary" fontSize="small" />
            <Button onClick={() => handleClickOpen()} className="file_import_export">
              Import
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COLLEGE_EVENT).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadExcel()}>
              Export
            </Button></>}
          {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COLLEGE_EVENT_ALL).length > 0)
          && <><FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={() => downloadAllExcel()}>
            Export&nbsp;All
            </Button></>}
          
            <div style={{ width: "100%" }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === POST_COLLEGE_EVENT_LIST).length > 0)
            && <Button
                size="small"
                sx={{ float: "right" }}
                onClick={() => {
                  setEntityCollegeId(null);
                  setCollegeEventHeading(null);
                  setStatus(null);
                  editAcademicPopup();
                  seteditAddFlag(0);
                }}
            >Add College Event</Button>}
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
              {CollegeEventData && CollegeEventData?.rows && CollegeEventData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={CollegeEventData?.rows}
                    totalCount={CollegeEventData?.count}
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