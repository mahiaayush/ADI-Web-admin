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
import { getCountry, deleteCountry, exportCountryAll, exportCountry, importCountry } from "src/store/actions/GlobalMasterCountryAction";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import AddCountryPopup from "./correction-popup/AddCountryPopup";
import { DELETE_COUNTRY, EXPORT_COUNTRY, EXPORT_COUNTRY_ALL, IMPORT_COUNTRY, POST_COUNTRY_LIST, PUT_COUNTRY_LIST } from "src/store/RbacConstants";

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
    CountryId: string;
    ShortName: string,
    LongName: string,
    ISO3: string,
    ISO4217: string;
    NumCode: string,
    UNMember: string,
    CallingCode: string,
    CCTLD: string;
    SaPreference: string,
    StatusFlag: string,
}
export const GlobalMasterCountryCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const Obj: { type: Color, message: string } = {
        type: 'success',
        message: '',
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
    const [CountryId, setCountryId] = useState('');
    let msgType: Color = 'success';
    const displayMessage = (obj: { type: Color, message: string }) => {
        setIsMessage(true);
        setMessage(obj)
        setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
        setConfirmDialog(false);
        const { data, error } = await dispatch(deleteCountry(CountryId));
        let message = data?.message;
        if (error) {
            msgType = 'error';
            message = error?.message;
        }
        dispatch(getCountry(page + 1, limit)).then(() => setIsLoading(false));
        displayMessage({ type: msgType, message });
    }
    const createCountryPopup = () => {
        setCountryId('')
        setIsOpenOccupationMeta(!isOpenOccupationMeta);
    }
    const editCountryPopup = (CountryId: string = '') => {
        setCountryId(CountryId)
        setIsOpenOccupationMeta(!isOpenOccupationMeta);
    }
    const handleClickOpen = () => {
        setOpenImport(!openImport)
    }
    const downloadExcel = async () => {
        const { data, error } = await dispatch(exportCountry(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    }
    const downloadAllExcel = async () => {
        const { data, error } = await dispatch(exportCountryAll());
    }
    useEffect(() => {
        setIsLoading(true)
        const IntervalIdentifier = setTimeout(() => {
            dispatch(getCountry(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
        }, 1000)
        return () => { clearTimeout(IntervalIdentifier) }
    }, [page, limit, search, sortBy])
    const OccupationMetaData = useSelector(
        (state: any) => state?.getMasterCountry?.countryResponse?.data
    )
    /**
     * GET ALL ALLOWED API List
     */
    const roleAllowedApis = useSelector(
        (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )
    const ActionHandler = (row: MetObject) => {
        return <hgroup style={{ display: 'flex' }}>
        {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COUNTRY_LIST).length > 0)
        && <Button
                style={{ minWidth: '0px' }}
                onClick={() =>
                    editCountryPopup(row?.CountryId)}
        ><EditSharp />
        </Button>}
        {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COUNTRY).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => { setCountryId(row?.CountryId); setConfirmDialog(true) }}>
                <DeleteOutline />
            </Button>}</hgroup>
    }
    const columns = useMemo(
        () => [
            {
                Header: "CountryId",
                accessor: "CountryId",
                width: 20,
            },
            {
                Header: "ShortName",
                accessor: "ShortName",
                width: 20,
            },
            {
                Header: "LongName",
                accessor: "LongName",
                width: 20,
            },
            {
                Header: "ISO3",
                accessor: "ISO3",
                width: 20,
            },
            {
                Header: "ISO4217",
                accessor: "ISO4217",
                width: 20,
            },
            {
                Header: "NumCode",
                accessor: "NumCode",
                width: 20,
            },
            {
                Header: "UNMember",
                accessor: "UNMember",
                width: 20,
            },
            {
                Header: "CallingCode",
                accessor: "CallingCode",
                width: 20,
            },
            {
                Header: "CCTLD",
                accessor: "CCTLD",
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
                    {isOpenOccupationMeta && <AddCountryPopup openImport={isOpenOccupationMeta} setOpenImport={setIsOpenOccupationMeta} CountryId={CountryId} pageNo={page} limit={limit} />}
                    <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCountry} refresh={getCountry(page + 1, limit)} popupTitle="Import Country" />
                    <Typography color="textPrimary" variant="h5">
                        Global Master Country
                    </Typography>
                </Grid>
                <Box sx={{ mt: 3 }}>
                    <div className="import_export_div">
                    {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COUNTRY).length > 0)
                    && <><FileUpload color="primary" fontSize="small" />
                        <Button onClick={() => handleClickOpen()} className="file_import_export">
                            Import
                        </Button></>}
                    {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COUNTRY).length > 0)
                    && <><FileDownload color="primary" fontSize="small" />
                        <Button className="file_import_export" onClick={() => downloadExcel()}>
                            Export
                        </Button></>}
                    {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COUNTRY_ALL).length > 0)
                    && <><FileDownload color="primary" fontSize="small" />
                        <Button className="file_import_export" onClick={() => downloadAllExcel()}>
                            Export&nbsp;All
                        </Button></>}
                        <div style={{ width: "100%" }}>
                        {(roleAllowedApis.filter(itm => itm.apiKey === POST_COUNTRY_LIST).length > 0)
                            && <Button
                                sx={{ float: "right" }}
                                onClick={() => {
                                    createCountryPopup();
                                }}
                            >Add Country</Button>}
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