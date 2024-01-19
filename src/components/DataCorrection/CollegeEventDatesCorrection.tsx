import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  Button,
  Alert
} from "@material-ui/core";
import Tooltip, { TooltipProps, tooltipClasses } from '@material-ui/core/Tooltip';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "src/store";
import { useEffect, useState, useMemo } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import FileDownload from "@material-ui/icons/FileDownload";
import { EditSharp, DeleteOutline, FileUpload } from "@material-ui/icons";
import { getCollegeEventDates, deleteCollegeEventDates, exportCollegeEventDates, exportCollegeEventDatesAll, importCollegeEventDates } from '../../store/actions/CollegeEventDatesAction';
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import ConfirmDelete from "../Override/ConfirmDelete";
import AddCollegeEventDates from "./correction-popup/AddCollegeEventDates";
import toast from "react-hot-toast";
import styled from "@material-ui/styled-engine";
import { DELETE_COLLEGE_EVENTDATES, EXPORT_COLLEGE_EVENTDATES, EXPORT_COLLEGE_EVENTDATES_ALL, IMPORT_COLLEGE_EVENTDATES, POST_COLLEGE_EVENTDATES_LIST, PUT_COLLEGE_EVENTDATES_LIST } from "src/store/RbacConstants";

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

interface CollegeEventDates {
  ClgEventDateId: number;
  ClgEventId: number;
  EventTypeId: number;
  ClgEventDef: string;
  ClgEventDate: string;
  Status: string;
  ClgeventHeading: string;
  EventtypeName: string;
}
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});

export const CollegeEventDatesCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: 'success',
    message: '',
    deiails: ''
  })
  const [AddCollegeEventDate, setAddCollegeEventDate] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [ClgEventDateId, setClgEventDateId] = useState(0);
  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteCollegeEventDates(ClgEventDateId));
    if (error) {
      msgType = 'error';
    }
    dispatch(getCollegeEventDates(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportCollegeEventDatesAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportCollegeEventDates(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }
  
  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCollegeEventDates(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const CollegeData = useSelector(
    (state: any) => state?.getCollegeEventDates?.collegeEventDatesResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createCollagePopup = (ClgEventDateId: number = 0) => {
    setClgEventDateId(ClgEventDateId)
    setAddCollegeEventDate(!AddCollegeEventDate);
  }
  const ActionHandler = (row: CollegeEventDates) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COLLEGE_EVENTDATES_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => createCollagePopup(row?.ClgEventDateId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COLLEGE_EVENTDATES).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setClgEventDateId(row?.ClgEventDateId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }
  const columns = useMemo(
    () => [
      {
        Header: "ClgEvdId",
        accessor: "ClgEventDateId",
        width: 30,
      },
      {
        Header: "EventHeading",
        accessor: "ClgeventHeading",
        width: 80,
      },
      {
        Header: "Event-type",
        accessor: "EventtypeName",
        width: 50
      },
      {
        Header: "EventDef",
        accessor: "ClgEventDef",
        width: 80
      },
      {
        Header: "EventDate",
        accessor: "ClgEventDate",
        width: 100
      },
      {
        Header: "Status",
        accessor: "Status",
        width: 50
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 40
      }
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
          {AddCollegeEventDate && <AddCollegeEventDates openImport={AddCollegeEventDate} setOpenImport={setAddCollegeEventDate} ClgEventDateId={ClgEventDateId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCollegeEventDates} refresh={getCollegeEventDates(page + 1, limit)} popupTitle="Import College Event Dates" />
          <Typography color="textPrimary" variant="h5">
            College Event Dates
          </Typography>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COLLEGE_EVENTDATES).length > 0)
              && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COLLEGE_EVENTDATES).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COLLEGE_EVENTDATES_ALL).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_COLLEGE_EVENTDATES_LIST).length > 0)
              && <Button onClick={() => createCollagePopup()}>Add Collage Event Dates</Button>}
              </div>
            </Grid>
          </Grid>
          {isMessage && (
            <Alert severity="success">
              {MessageObj?.message}<strong>!</strong>
            </Alert>)}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {CollegeData && CollegeData?.rows && CollegeData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={CollegeData?.rows}
                    totalCount={CollegeData?.count}
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
