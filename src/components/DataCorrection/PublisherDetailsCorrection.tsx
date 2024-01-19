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
import { deletePublisherDetails, exportPublisherDetails, exportPublisherDetailsAll, getPublisherDetails, importPublisherDetails } from "src/store/actions/PublisherDetailsAction";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import AddPublisherDetailsPopup from "./correction-popup/AddPublisherDetailsPopup";
import { DELETE_PUBLISHER, EXPORT_PUBLISHER, EXPORT_PUBLISHER_ALL, IMPORT_PUBLISHER, POST_PUBLISHER_LIST, PUT_PUBLISHER_LIST } from "src/store/RbacConstants";

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
interface PublisherDetailsObject {
    PublisherId: number,
    Puk: string,
    PublisherName: string,
    PublisherAbout: string,
    StoreLogo: string,
    RegAddress: string,
    ZohovendorId: number,
    Publisherwebsite: string,
    TerminationPolicy: string,
    PaymentTerms: string,
    PublisherSlug: string,
    Status: string,
    PublisherEmail: string
}

export const PublisherDetailsCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const Obj: { type: Color, message: string, details: string } = {
        type: 'success',
        message: '',
        details: ''
    }
    const [MessageObj, setMessage] = useState(Obj)
    const [isOpenPublisherDetails, setIsOpenPublisherDetails] = useState(false);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([])
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [PublisherId, setPublisherId] = useState(null);
    const [ExpendedIndex, setExpendedIndex] = useState(0);
    let msgType: Color = 'success';

    const displayMessage = (obj: { type: Color, message: string, details: string }) => {
        setIsMessage(true);
        setMessage(obj)
        setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
        setConfirmDialog(false);
        const { data, error } = await dispatch(deletePublisherDetails(PublisherId));
        let message = data?.message;
        if (error) {
            msgType = 'error';
            message = error?.message;
        }
        dispatch(getPublisherDetails(page + 1, limit)).then(() => setIsLoading(false));
        displayMessage({ type: msgType, message, details: data?.message });
    }
    const downloadExcelAll = async () => {
        const { data, error } = await dispatch(exportPublisherDetailsAll());
        if (error) {
            toast.success(error?.message)
        }
    }
    const downloadExcel = async () => {
        const { data, error } = await dispatch(exportPublisherDetails(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
        if (error) {
            toast.success(error?.message)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        const IntervalIdentifier = setTimeout(() => {
            dispatch(getPublisherDetails(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
        }, 1000)
        return () => { clearTimeout(IntervalIdentifier) }
    }, [page, limit, search, sortBy])

    const publisherData = useSelector(
        (state: any) => state?.getPublisherDetails?.PublisherDetailsResponse?.data
    )
    /**
   * GET ALL ALLOWED API List
   */
    const roleAllowedApis = useSelector(
        (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )
    const createPublisherDetailsPopup = () => {
        setPublisherId(0)
        setIsOpenPublisherDetails(!isOpenPublisherDetails);
    }
    const editPublisherDetailsPopup = (PublisherId: number = 0) => {
        setPublisherId(PublisherId)
        setIsOpenPublisherDetails(!isOpenPublisherDetails);
    }
    const PublisherAboutExpendable = (row: PublisherDetailsObject) => {
        return <div>
            {(ExpendedIndex === row.PublisherId) ? <span dangerouslySetInnerHTML={{ __html: row?.PublisherAbout }} /> : <span dangerouslySetInnerHTML={{ __html: row?.PublisherAbout?.slice(0, 20) }} />}
            {(row?.PublisherAbout?.length > 20) ? (ExpendedIndex !== row.PublisherId) ? <ArrowDropDownIcon onClick={(e) => { setExpendedIndex(row.PublisherId) }} color="primary" fontSize="small" /> : <ArrowDropUpIcon onClick={(e) => { setExpendedIndex(0) }} color="primary" fontSize="small" /> : ''}
        </div>
    }
    const ActionHandler = (row: PublisherDetailsObject) => {
        return <hgroup style={{ display: 'flex' }}>
        {(roleAllowedApis.filter(itm => itm.apiKey === PUT_PUBLISHER_LIST).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => editPublisherDetailsPopup(row?.PublisherId)}><EditSharp /></Button>}
        {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_PUBLISHER).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => { setPublisherId(row?.PublisherId); setConfirmDialog(true) }}>
                <DeleteOutline /></Button>}</hgroup>
    }

    const handleClickOpen = () => {
        setOpenImport(!openImport)
    }

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "PublisherId",
                width: 25,
            },
            {
                Header: "Puk",
                accessor: "Puk",
                width: 25,
            },
            {
                Header: "Name",
                accessor: "PublisherName",
                width: 30,
            },
            {
                Header: "About",
                accessor: PublisherAboutExpendable,
                width: 30
            },
            {
                Header: "Address",
                accessor: "RegAddress",
                width: 50
            },
            {
                Header: "Termination",
                accessor: "TerminationPolicy",
                width: 30
            },
            {
                Header: "Slug",
                accessor: "PublisherSlug",
                width: 30
            },
            {
                Header: "Email",
                accessor: "PublisherEmail",
                width: 20
            },
            {
                Header: "Action",
                accessor: ActionHandler,
                disableSortBy: true,
                width: 30
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
                    {isOpenPublisherDetails && <AddPublisherDetailsPopup openImport={isOpenPublisherDetails} setOpenImport={setIsOpenPublisherDetails} PublisherId={PublisherId} pageNo={page} limit={limit} />}
                    <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importPublisherDetails} refresh={getPublisherDetails(page + 1, limit)} popupTitle="Import Publisher-Details" />

                    <Typography color="textPrimary" variant="h5">
                        Publisher Details
                    </Typography>
                </Grid>

                <Box sx={{ mt: 3 }}>
                    <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Grid item>
                            <div className="import_export_div">
                            {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_PUBLISHER).length > 0)
                            && <>
                                <FileUpload color="primary" fontSize="small" />
                                <Button onClick={() => handleClickOpen()} className="file_import_export">
                                    Import
                                </Button>
                            </>}
                            {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_PUBLISHER).length > 0)
                            && <>
                                <FileDownload color="primary" fontSize="small" />
                                <Button className="file_import_export" onClick={() => downloadExcel()}>
                                    Export
                                </Button>
                            </>}
                            {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_PUBLISHER_ALL).length > 0)
                            && <>
                                <FileDownload color="primary" fontSize="small" />
                                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                                    Export All
                                </Button>
                            </>}
                            </div>
                        </Grid>
                        <Grid item>
                            <div>
                            {(roleAllowedApis.filter(itm => itm.apiKey === POST_PUBLISHER_LIST).length > 0)
                            && <Button onClick={() => createPublisherDetailsPopup()}>Add Publisher Details</Button>}
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
                            {publisherData && publisherData?.rows && publisherData?.rows?.length > -1 && (
                                <div className={`${classes.tfoottop} itemListSorting`}>
                                    <EnhancedTable
                                        isLoading={isLoading}
                                        columns={columns}
                                        data={publisherData?.rows}
                                        totalCount={publisherData?.count}
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