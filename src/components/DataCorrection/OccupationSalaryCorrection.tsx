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
import { deleteOccupationSalary, exportAllOcupationSalary, exportOcupationSalary, getOccupationSalary, importOccupationSalary } from "src/store/actions/OccupationSalaryAction";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import { AddOccupationSalaryPopup } from "./correction-popup/AddOccupationSalaryPopup";
import { PUT_SALARY_LIST, DELETE_SALARY, IMPORT_SALARY, EXPORT_SALARY, EXPORT_SALARY_ALL, POST_SALARY_LIST } from "src/store/RbacConstants";

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
    SalregcarId: number;
    RegcarCode: string,
    SalregcarFn: string;
    SalregcarVal: number;
}

export const OccupationSalaryCorrection = () => {
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
    const [salregcarId, setSalregcarId] = useState(null);
    const [regcarCode, setRegcarCode] = useState(null);
    const [salregcarFn, setSalregcarFn] = useState(null);
    const [salregcarVal, setSalregcarVal] = useState(null);
    const [editAddFlag, seteditAddFlag] = useState(0);

    let msgType = 'success';
    const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
        setIsMessage(true);
        setMessage(obj)
        setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
        setConfirmDialog(false);
        const { data, error } = await dispatch(deleteOccupationSalary(salregcarId));
        if (error) {
            msgType = 'error';
        }
        dispatch(getOccupationSalary(page + 1, limit)).then(() => setIsLoading(false));
        displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
    }

    const editAcademicPopup = () => {
        setOpenEdit(!openEdit);
    }
    const handleClickOpen = () => {
        setOpenImport(!openImport)
    }

    const downloadExcel = async () => {
        const { data, error } = await dispatch(exportOcupationSalary(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
        console.log("exportOcupationSalary", data, error);
    }
    const downloadAllExcel = async () => {
        const { data, error } = await dispatch(exportAllOcupationSalary());
        console.log("exportAllOcupationSalary", data, error);
    }

    useEffect(() => {
        setIsLoading(true)
        const IntervalIdentifier = setTimeout(() => {
            dispatch(getOccupationSalary(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
        }, 1000)
        return () => { clearTimeout(IntervalIdentifier) }
    }, [page, limit, search, sortBy])

    const OccupationSalaryData = useSelector(
        (state: any) => state?.getOccupationSalary?.OccupationSalaryResponse?.data
    )
    
    /**
    * GET ALL ALLOWED API List
    */
    const roleAllowedApis = useSelector(
        (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )

    const ActionHandler = (row: UserObject) => {
        return <hgroup style={{ display: 'flex' }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === PUT_SALARY_LIST).length > 0)
            && <Button
                style={{ minWidth: '0px' }}
                onClick={() => {
                    setSalregcarId(row?.SalregcarId);
                    setRegcarCode(row?.RegcarCode);
                    setSalregcarFn(row?.SalregcarFn)
                    setSalregcarVal(row?.SalregcarVal);
                    editAcademicPopup();
                    seteditAddFlag(1);
                }}
            >
                <EditSharp />
            </Button>}
            {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_SALARY).length > 0)
            && <Button
                style={{ minWidth: '0px' }}
                onClick={() => { setSalregcarId(row?.SalregcarId); setConfirmDialog(true) }}
            >
                <DeleteOutline />
            </Button>}</hgroup>
    }

    const columns = useMemo(
        () => [
            {
                Header: "Salregcar-Id",
                accessor: "SalregcarId",
                width: 20,
            },
            {
                Header: "RegcarTitle",
                accessor: "RegcarTitle",
                width: 20,
            },
            {
                Header: "Salregcar-Fn",
                accessor: "SalregcarFn",
                width: 20,
            },
            {
                Header: "Salregcar-Val",
                accessor: "SalregcarVal",
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
                    <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importOccupationSalary} refresh={getOccupationSalary(page + 1, limit)} popupTitle="Import Occupation Salary" />
                    {openEdit && (
                        <AddOccupationSalaryPopup
                            openEdit={openEdit}
                            setOpenEdit={setOpenEdit}
                            salregcar_Id={salregcarId}
                            regcar_Code={regcarCode}
                            salregcar_Fn={salregcarFn}
                            salregcar_Val={salregcarVal}
                            editFlag={editAddFlag}
                            Page_n={page}
                            limit_page={limit}
                        />
                    )}
                    <Typography color="textPrimary" variant="h5">
                        Occupation Salary
                    </Typography>
                </Grid>

                <Box sx={{ mt: 3 }}>
                    <div className="import_export_div">
                    {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_SALARY).length > 0)
                        && <><FileUpload color="primary" fontSize="small" />
                        <Button onClick={() => handleClickOpen()} className="file_import_export">
                            Import
                        </Button></>}
                        {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_SALARY).length > 0)
                            && <><FileDownload color="primary" fontSize="small" />
                        <Button className="file_import_export" onClick={() => downloadExcel()}>
                            Export
                        </Button></>}
                        {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_SALARY_ALL).length > 0)
                            && <><FileDownload color="primary" fontSize="small" />
                        <Button className="file_import_export" onClick={() => downloadAllExcel()}>
                        Export&nbsp;All
                        </Button></>}
                   
                        <div style={{ width: "100%" }}>
                        {(roleAllowedApis.filter(itm => itm.apiKey === POST_SALARY_LIST).length > 0)
                            && <Button
                                sx={{ float: "right" }}
                                onClick={() => {
                                    setSalregcarId(null);
                                    setRegcarCode(null);
                                    setSalregcarFn(null)
                                    setSalregcarVal(null)
                                    editAcademicPopup();
                                    seteditAddFlag(0);
                                }}
                            >Add OccupationSalary</Button>}
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
                            {OccupationSalaryData && OccupationSalaryData?.rows && OccupationSalaryData?.rows?.length > -1 && (
                                <div className={`${classes.tfoottop} itemListSorting`}>
                                    <EnhancedTable
                                        isLoading={isLoading}
                                        columns={columns}
                                        data={OccupationSalaryData?.rows}
                                        totalCount={OccupationSalaryData?.count}
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