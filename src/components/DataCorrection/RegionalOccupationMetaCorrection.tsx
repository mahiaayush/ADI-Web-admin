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
import { getROccupationMeta, deleteROccupationMeta, exportAllROccupationMeta, exportROccupationMeta, importROccupationMeta } from "src/store/actions/ROccupationMetaAction";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import AddROccupationMetaPopup from "./correction-popup/AddROccupationMetaPopup";
import { PUT_OCCUPATION_META_LIST, DELETE_OCCUPATION_META, IMPORT_OCCUPATION_META, EXPORT_OCCUPATION_META, EXPORT_OCCUPATION_META_ALL, POST_OCCUPATION_META_LIST } from "src/store/RbacConstants";

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
        borderBottom: "2px solid #5664D2",
        color: "#5664D2",
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
interface MetObject {
    RegcarMetaId: number;
    RegcarCode: string,
    RegcarTitle: string,
    MetaProperies: string
}
export const RegionalOccupationMetaCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const Obj: { type: Color, message: string, details: string } = {
        type: 'success',
        message: '',
        details: ''
      }
    const [MessageObj, setMessage] = useState(Obj)
    const [isOpenOccupationMeta, setIsOpenOccupationMeta] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [RegcarMetaId, setRegcarMetaId] = useState(null);
    let msgType: Color = 'success';
    const displayMessage = (obj: { type: Color, message: string, details: string }) => {
        setIsMessage(true);
        setMessage(obj)
        setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
        setConfirmDialog(false);
        const { data, error } = await dispatch(deleteROccupationMeta(RegcarMetaId));
        let message = data?.message;
        if (error) {
            msgType = 'error';
            message = error?.message;
        }
        dispatch(getROccupationMeta(page + 1, limit)).then(() => setIsLoading(false));
        displayMessage({ type: msgType, message, details: data?.message });
    }
    const createROccupationMetaPopup = () => {
        setRegcarMetaId(0)
        setIsOpenOccupationMeta(!isOpenOccupationMeta);
      }
    const editROccupationMetaPopup = (RegcarMetaId: number = 0) => {
        setRegcarMetaId(RegcarMetaId)
        setIsOpenOccupationMeta(!isOpenOccupationMeta);
    }
    const handleClickOpen = () => {
        setOpenImport(!openImport)
    }
    const downloadExcel = async () => {
        const { data, error } = await dispatch(exportROccupationMeta(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    }
    const downloadAllExcel = async () => {
        const { data, error } = await dispatch(exportAllROccupationMeta());
    }
    useEffect(() => {
        setIsLoading(true)
        const IntervalIdentifier = setTimeout(() => {
            dispatch(getROccupationMeta(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
        }, 1000)
        return () => { clearTimeout(IntervalIdentifier) }
    }, [page, limit, search, sortBy])
    const OccupationMetaData = useSelector(
        (state: any) => state?.getROccupationMeta?.ROccupationMetaResponse?.data
    )
    /**
    * GET ALL ALLOWED API List
    */
    const roleAllowedApis = useSelector(
        (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )
    const ActionHandler = (row: MetObject) => {
        return <hgroup style={{ display: 'flex' }}>
        {(roleAllowedApis.filter(itm => itm.apiKey === PUT_OCCUPATION_META_LIST).length > 0)
        && <Button
             style={{ minWidth: '0px' }}
             onClick={() =>
             editROccupationMetaPopup(row?.RegcarMetaId)}
        ><EditSharp />
        </Button>}
        {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_OCCUPATION_META).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => { setRegcarMetaId(row?.RegcarMetaId); setConfirmDialog(true) }}>
            <DeleteOutline />
         </Button>}</hgroup>
      }
    const columns = useMemo(
        () => [
            {
                Header: "RegcarMeta-Id",
                accessor: "RegcarMetaId",
                width: 20,
            },
            {
                Header: "RegcarTitle",
                accessor: "RegcarTitle",
                width: 20,
            },
            {
                Header: "Meta-Properies",
                accessor: "MetaProperies",
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
                {isOpenOccupationMeta && <AddROccupationMetaPopup openImport={isOpenOccupationMeta} setOpenImport={setIsOpenOccupationMeta} RegcarMetaId={RegcarMetaId} pageNo={page} limit={limit} />}
                    <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importROccupationMeta} refresh={getROccupationMeta(page + 1, limit)} popupTitle="Import Occupation Meta" />
                    <Typography color="textPrimary" variant="h5">
                        Regional Occupation Meta
                    </Typography>
                </Grid>
                <Box sx={{ mt: 3 }}>
                    <div className="import_export_div">
                    {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_OCCUPATION_META).length > 0)
                            && <><FileUpload color="primary" fontSize="small" />
                        <Button onClick={() => handleClickOpen()} className="file_import_export">
                            Import
                        </Button></>}
                        {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_META).length > 0)
                            && <><FileDownload color="primary" fontSize="small" />
                        <Button className="file_import_export" onClick={() => downloadExcel()}>
                            Export
                        </Button></>}
                        {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCCUPATION_META_ALL).length > 0)
                            && <><FileDownload color="primary" fontSize="small" />
                        <Button className="file_import_export" onClick={() => downloadAllExcel()}>
                        Export&nbsp;All
                        </Button></>}
                        <div style={{ width: "100%" }}>
                        {(roleAllowedApis.filter(itm => itm.apiKey === POST_OCCUPATION_META_LIST).length > 0)
                            && <Button
                                sx={{ float: "right" }}
                                onClick={() => {
                                    createROccupationMetaPopup();
                                }}
                            >Add OccupationMeta</Button>}
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
                            {OccupationMetaData && OccupationMetaData?.rows && OccupationMetaData?.rows?.length > -1 && (
                                <div className={`${classes.tfoottop} itemListSorting`}>
                                    <EnhancedTable
                                        isLoading={isLoading}
                                        columns={columns}
                                        data={OccupationMetaData?.rows}
                                        totalCount={OccupationMetaData?.count}
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