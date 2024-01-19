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
import { getStudyRoute, deleteStudyRoute, exportStudyRoute, exportStudyRouteAll, importStudyRoute } from "src/store/actions/RMOStudyRouteAction";
import AddRMOStudyRoutePopup from "./correction-popup/AddRMOStudyRoutePopup";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { PUT_STUDY_ROUTE_LIST, DELETE_STUDY_ROUTE, IMPORT_STUDY_ROUTE, EXPORT_STUDY_ROUTE, EXPORT_STUDY_ROUTE_ALL, POST_STUDY_ROUTE_LIST } from "src/store/RbacConstants";

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
interface RMOStudyRouteObject {
    SrregcarId: number,
    RegcarCode: string,
    RegcarTitle: string,
    SrOrder: number
}

export const RMOStudyRouteCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const Obj: { type: Color, message: string, details: string } = {
        type: 'success',
        message: '',
        details: ''
    }
    const [MessageObj, setMessage] = useState(Obj)
    const [isOpenStudyRoute, setIsOpenStudyRoute] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [SrregcarId, setSrregcarId] = useState(0);
    const [ExpendedIndex, setExpendedIndex] = useState(0);
    let msgType: Color = 'success';

    const displayMessage = (obj: { type: Color, message: string, details: string }) => {
        setIsMessage(true);
        setMessage(obj)
        setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
        setConfirmDialog(false);
        const { data, error } = await dispatch(deleteStudyRoute(SrregcarId));
        let message = data?.message;
        console.log("=====>", data, error);
        if (error) {
            msgType = 'error';
            message = error?.message;
        }
        dispatch(getStudyRoute(page + 1, limit)).then(() => setIsLoading(false));
        displayMessage({ type: msgType, message, details: data?.message });
    }
    const downloadExcelAll = async () => {
        const { data, error } = await dispatch(exportStudyRouteAll());
        if (error) {
            toast.success(error?.message)
        }
    }
    const downloadExcel = async () => {
        const { data, error } = await dispatch(exportStudyRoute(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
        if (error) {
            toast.success(error?.message)
        }
    }
    
    useEffect(() => {
        setIsLoading(true)
        const IntervalIdentifier = setTimeout(() => {
          dispatch(getStudyRoute(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
        }, 1000)
        return () => { clearTimeout(IntervalIdentifier) }
      }, [page, limit, search, sortBy])

    const studyRouteData = useSelector(
        (state: any) => state?.getStudyRouteData?.StudyRouteResponse?.data
    )
    /**
    * GET ALL ALLOWED API List
    */
    const roleAllowedApis = useSelector(
        (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )
    const createStudyRoutePopup = () => {
        setSrregcarId(0)
        setIsOpenStudyRoute(!isOpenStudyRoute);
    }
    const editStudyRoutePopup = (SrregcarId: number = 0) => {
        setSrregcarId(SrregcarId)
        setIsOpenStudyRoute(!isOpenStudyRoute);
    }

    const ActionHandler = (row: RMOStudyRouteObject) => {
        return <hgroup style={{ display: 'flex' }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === PUT_STUDY_ROUTE_LIST).length > 0)
            && <Button style={{ minWidth: '0px' }} onClick={() => editStudyRoutePopup(row?.SrregcarId)}><EditSharp /></Button>}
            {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_STUDY_ROUTE).length > 0)
            && <Button style={{ minWidth: '0px' }} onClick={() => { setSrregcarId(row?.SrregcarId); setConfirmDialog(true) }}>
                <DeleteOutline /></Button>}</hgroup>
    }

    const handleClickOpen = () => {
        setOpenImport(!openImport)
    }

    const columns = useMemo(
        () => [
            {
                Header: "Srregcar Id",
                accessor: "SrregcarId",
                width: 50,
            },
            {
                Header: "Regcar Title",
                accessor: "RegcarTitle",
                width: 80,
            },
            {
                Header: "Order",
                accessor: "SrOrder",
                width: 50
            },
            {
                Header: "Action",
                accessor: ActionHandler,
                disableSortBy: true,
                width: 40
            }
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
                    {isOpenStudyRoute && <AddRMOStudyRoutePopup openImport={isOpenStudyRoute} setOpenImport={setIsOpenStudyRoute} SrregcarId={SrregcarId} pageNo={page} limit={limit} />}
                    <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importStudyRoute} refresh={getStudyRoute(page + 1, limit)} popupTitle="Import Study Route" />

                    <Typography color="textPrimary" variant="h5">
                        Study Route
                    </Typography>
                </Grid>

                <Box sx={{ mt: 3 }}>
                    <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Grid item>
                            <div className="import_export_div">
                            {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_STUDY_ROUTE).length > 0)
                            && <><FileUpload color="primary" fontSize="small" />
                                <Button onClick={() => handleClickOpen()} className="file_import_export">
                                    Import
                                </Button></>}
                                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_STUDY_ROUTE).length > 0)
                            && <><FileDownload color="primary" fontSize="small" />
                                <Button className="file_import_export" onClick={() => downloadExcel()}>
                                    Export
                                </Button></>}
                                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_STUDY_ROUTE_ALL).length > 0)
                            && <><FileDownload color="primary" fontSize="small" />
                                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                                    Export All
                                </Button></>}
                            </div>
                        </Grid>
                        <Grid item>
                            <div>
                            {(roleAllowedApis.filter(itm => itm.apiKey === POST_STUDY_ROUTE_LIST).length > 0)
                            && <Button onClick={() => createStudyRoutePopup()}>Add Study Route</Button>}
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
                            {studyRouteData && studyRouteData?.rows && studyRouteData?.rows?.length > -1 && (
                                <div className={`${classes.tfoottop} itemListSorting`}>
                                    <EnhancedTable
                                        isLoading={isLoading}
                                        columns={columns}
                                        data={studyRouteData?.rows}
                                        totalCount={studyRouteData?.count}
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