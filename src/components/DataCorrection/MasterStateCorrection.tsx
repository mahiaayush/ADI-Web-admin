import {
    Container,
    Grid,
    Box,
    Card,
    Button,
    Alert,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "src/store";
import { useEffect, useState, useMemo } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import FileDownload from "@material-ui/icons/FileDownload";
import { EditSharp, DeleteOutline, FileUpload } from "@material-ui/icons";
import ConfirmDelete from "../Override/ConfirmDelete";
import toast from "react-hot-toast";
import AddMasterStatePopup from "./correction-popup/AddMasterStatePopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { getMasterState, deleteMasterState, exportMasterState, exportMasterStateAll, importMasterState } from "src/store/actions/MasterStateAction";
import { DELETE_STATE, EXPORT_STATE, EXPORT_STATE_ALL, IMPORT_STATE, POST_STATE_LIST, PUT_STATE_LIST } from "src/store/RbacConstants";

export type Color = 'success' | 'info' | 'warning' | 'error';

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
interface MasterStateObject {
    StateId: number,
    CountryId: string,
    StateName: string,
    StateCode: string,
}

export const MasterStateCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const Obj: { type: Color, message: string, details: string } = {
        type: 'success',
        message: '',
        details: ''
    }
    const [MessageObj, setMessage] = useState(Obj)
    const [isOpenMasterState, setIsOpenMasterState] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [StateId, setStateId] = useState(0);
    const [ExpendedIndex, setExpendedIndex] = useState(0);
    let msgType: Color = 'success';

    const displayMessage = (obj: { type: Color, message: string, details: string }) => {
        setIsMessage(true);
        setMessage(obj)
        setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
        setConfirmDialog(false);
        const { data, error } = await dispatch(deleteMasterState(StateId));
        let message = data?.message;
        if (error) {
            msgType = 'error';
            message = error?.message;
        }
        dispatch(getMasterState(page + 1, limit)).then(() => setIsLoading(false));
        displayMessage({ type: msgType, message, details: data?.message });
    }
    const downloadExcelAll = async () => {
        const { data, error } = await dispatch(exportMasterStateAll());
        if (error) {
            toast.success(error?.message)
        }
    }
    const downloadExcel = async () => {
        const { data, error } = await dispatch(exportMasterState(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
        if (error) {
            toast.success(error?.message)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        const IntervalIdentifier = setTimeout(() => {
            dispatch(getMasterState(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
        }, 1000)
        return () => { clearTimeout(IntervalIdentifier) }
    }, [page, limit, search, sortBy])

    const masterStateData = useSelector(
        (state: any) => state?.MasterState?.MasterStateResponse?.data
    )
    /**
     * GET ALL ALLOWED API List
     */
    const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    ) 
    const createMasterStatePopup = () => {
        setStateId(0)
        setIsOpenMasterState(!isOpenMasterState);
    }
    const editMasterStatePopup = (Id: number = 0) => {
        setStateId(Id)
        setIsOpenMasterState(!isOpenMasterState);
    }
   
    const ActionHandler = (row: MasterStateObject) => {
        return <hgroup style={{ display: 'flex' }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === PUT_STATE_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editMasterStatePopup(row?.StateId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_STATE).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setStateId(row?.StateId); setConfirmDialog(true) }}>
                <DeleteOutline /></Button>}</hgroup>
    }

    const handleClickOpen = () => {
        setOpenImport(!openImport)
    }

    const columns = useMemo(
        () => [
            {
                Header: "StateId",
                accessor: "StateId",
                width: 30,
            },
            {
                Header: "ShortName",
                accessor: "ShortName",
                width: 80,
            },
            {
                Header: "StateName",
                accessor: "StateName",
                width: 100,
            },
            {
                Header: "StateCode",
                accessor: "StateCode",
                width: 100
            },
            {
                Header: "Action",
                accessor: ActionHandler,
                disableSortBy: true,
                width: 40
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
                    {isOpenMasterState && <AddMasterStatePopup openImport={isOpenMasterState} setOpenImport={setIsOpenMasterState} StateId={StateId} pageNo={page} limit={limit} />}
                    <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importMasterState} refresh={getMasterState(page + 1, limit)} popupTitle="Import Master state" />

                    <Typography color="textPrimary" variant="h5">
                        Master State
                    </Typography>
                </Grid>

                <Box sx={{ mt: 3 }}>
                    <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Grid item>
                            <div className="import_export_div">
                            {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_STATE).length > 0)
      && <><FileUpload color="primary" fontSize="small" />
                                <Button onClick={() => handleClickOpen()} className="file_import_export">
                                    Import
                                </Button></>}
                                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_STATE).length > 0)
      && <><FileDownload color="primary" fontSize="small" />
                                <Button className="file_import_export" onClick={() => downloadExcel()}>
                                    Export
                                </Button></>}
                                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_STATE_ALL).length > 0)
      && <><FileDownload color="primary" fontSize="small" />
                                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                                    Export All
                                </Button></>}
                            </div>
                        </Grid>
                        <Grid item>
                            <div>
                            {(roleAllowedApis.filter(itm => itm.apiKey === POST_STATE_LIST).length > 0)
      && <Button onClick={() => createMasterStatePopup()}>Add Master State</Button>}
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
                            {masterStateData && masterStateData?.rows && masterStateData?.rows?.length > -1 && (
                                <div className={`${classes.tfoottop} itemListSorting`}>
                                    <EnhancedTable
                                        isLoading={isLoading}
                                        columns={columns}
                                        data={masterStateData?.rows}
                                        totalCount={masterStateData?.count}
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