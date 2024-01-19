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
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import ConfirmDelete from "../Override/ConfirmDelete";
import toast from "react-hot-toast";
import AddTaskstmtMasterPopup from "./correction-popup/AddTaskstmtMasterPopup";
import { deleteTaskstmtMaster, exportTaskstmtMaster, exportTaskstmtMasterAll, getTaskstmtMaster, importTaskstmtMaster } from "src/store/actions/TaskstmtAction";
import { DELETE_TASKS, EXPORT_TASKS, EXPORT_TASKS_ALL, IMPORT_TASKS, POST_TASKS_LIST, PUT_TASKS_LIST } from "src/store/RbacConstants";

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

interface TaskstmtMasterObj {
  TaskstmtId: number,
  OnetsocCode: string,
  OnetsocTitle: string,
  TaskTitle: string,
  TaskType: string,
}
export type Color = 'success' | 'info' | 'warning' | 'error';
export const TaskstmtMasterCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const Obj: { type: Color, message: string, details: string } = {
    type: 'success',
    message: '',
    details: ''
  }
  const [MessageObj, setMessage] = useState(Obj);
  const [isOpenTaskstmtMaster, setIsOpenTaskstmtMaster] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [TaskstmtId, setTaskstmtId] = useState(0)
  let msgType: Color = 'success';

  const displayMessage = (obj: { type: Color, message: string, details: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteTaskstmtMaster(TaskstmtId));
    let message = data?.message;
    let details = data?.message;
    if (error) {
      msgType = 'error';
      message = error?.message;
      details = error?.errorMessage
    }
    dispatch(getTaskstmtMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message, details });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportTaskstmtMasterAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportTaskstmtMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getTaskstmtMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const taskstmtContentData = useSelector(
    (state: any) => state?.getTaskstmlMaster?.TaskstmlMasterResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  ) 
  const createTaskstmtMasterPopup = () => {
    setTaskstmtId(0)
    setIsOpenTaskstmtMaster(!isOpenTaskstmtMaster);
  }
  const editTaskstmtMasterPopup = (TaskstmtId: number = 0) => {
    setTaskstmtId(TaskstmtId)
    setIsOpenTaskstmtMaster(!isOpenTaskstmtMaster);
  }
  const ActionHandler = (row: TaskstmtMasterObj) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_TASKS_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editTaskstmtMasterPopup(row?.TaskstmtId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_TASKS).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setTaskstmtId(row?.TaskstmtId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "TaskstmtId",
        width: 30,
      },
      {
        Header: "OnetsocTitle",
        accessor: "OnetsocTitle",
        width: 60,
      },
      {
        Header: "Task Title",
        accessor: "TaskTitle",
        width: 100,
      },
      {
        Header: "Task Type",
        accessor: "TaskType",
        width: 40,
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 40
      },
    ],
    []
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
          {isOpenTaskstmtMaster && <AddTaskstmtMasterPopup openImport={isOpenTaskstmtMaster} setOpenImport={setIsOpenTaskstmtMaster} TaskstmtId={TaskstmtId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importTaskstmtMaster} refresh={getTaskstmtMaster(page + 1, limit)} popupTitle="Import Task Statment Master" />

          <Typography color="textPrimary" variant="h5">
            Master Task Statment Master
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_TASKS).length > 0)
      && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_TASKS).length > 0)
      && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_TASKS_ALL).length > 0)
      && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_TASKS_LIST).length > 0)
      && <Button onClick={() => createTaskstmtMasterPopup()}>Add Task Statment</Button>}
              </div>
            </Grid>
          </Grid>
          {isMessage && (
            <Alert severity={MessageObj?.type}>
              {MessageObj?.message}<strong>!</strong>
            </Alert>)}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {taskstmtContentData && taskstmtContentData?.rows && taskstmtContentData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={taskstmtContentData?.rows}
                    totalCount={taskstmtContentData?.count}
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
