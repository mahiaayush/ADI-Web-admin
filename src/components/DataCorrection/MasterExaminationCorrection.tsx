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
import { deleteMasterExamination, exportMasterExamination, exportMasterExaminationAll, getMasterExamination, importMasterExamination } from "src/store/actions/MasterExaminationAction";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import AddMasterExaminationPopup from "./correction-popup/AddExaminationMasterPopup";
import { PUT_EXAMINATION_MASTER_LIST, DELETE_EXAMINATION_MASTER, IMPORT_EXAMINATION_MASTER, EXPORT_EXAMINATION_MASTER, EXPORT_EXAMINATION_MASTER_ALL, POST_EXAMINATION_MASTER_LIST } from "src/store/RbacConstants";

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
interface MasterExaminationObject {
    ExamId: number,
    ExamLongname: string,
    ExamShortname: string,
    ExamTypeId: number,
    ExamOverview: string,
    ExamCoveredColleges: string,
    ExamCoveredCourses: string,
    ExamDateApplication: string,
    ExamDateExam: string,
    ExamEligibilityAgeCriteria: string,
    ExamEligibilityQualification: string,
    ExamEligibilityMark: string,
    ExamDuration: Date,
    ExamSectionNum: number,
    ExamHelpdeskwebsite: string,
    ExamHelpdeskPhone: string,
    Status: string
}

export const MasterExaminationCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const Obj: { type: Color, message: string, details: string } = {
        type: 'success',
        message: '',
        details: ''
    }
    const [MessageObj, setMessage] = useState(Obj)
    const [isOpenMasterExamination, setIsOpenMasterExamination] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [ExamId, setExamId] = useState(0);
    const [ExpendedIndex, setExpendedIndex] = useState(0);
    let msgType: Color = 'success';

    const displayMessage = (obj: { type: Color, message: string, details: string }) => {
        setIsMessage(true);
        setMessage(obj)
        setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
        setConfirmDialog(false);
        const { data, error } = await dispatch(deleteMasterExamination(ExamId));
        let message = data?.message;
        console.log("=====>", data, error);
        if (error) {
            msgType = 'error';
            message = error?.message;
        }
        dispatch(getMasterExamination(page + 1, limit)).then(() => setIsLoading(false));
        displayMessage({ type: msgType, message, details: data?.message });
    }
    const downloadExcelAll = async () => {
        const { data, error } = await dispatch(exportMasterExaminationAll());
        if (error) {
            toast.success(error?.message)
        }
    }
    const downloadExcel = async () => {
        const { data, error } = await dispatch(exportMasterExamination(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
        if (error) {
            toast.success(error?.message)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        const IntervalIdentifier = setTimeout(() => {
            dispatch(getMasterExamination(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
        }, 1000)
        return () => { clearTimeout(IntervalIdentifier) }
    }, [page, limit, search, sortBy])
    const MasterExaminationData = useSelector(
        (state: any) => state?.getMasterExamination?.MasterExaminationResponse?.data
    )
    /**
     * GET ALL ALLOWED API List
     */
    const roleAllowedApis = useSelector(
        (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )
    const createMasterExaminationPopup = () => {
        setExamId(0)
        setIsOpenMasterExamination(!isOpenMasterExamination);
    }
    const editMasterExaminationPopup = (ExamId: number = 0) => {
        setExamId(ExamId)
        setIsOpenMasterExamination(!isOpenMasterExamination);
    }

    const ActionHandler = (row: MasterExaminationObject) => {
        return <hgroup style={{ display: 'flex' }}>
            {(roleAllowedApis.filter(itm => itm.apiKey === PUT_EXAMINATION_MASTER_LIST).length > 0)
            && <Button style={{ minWidth: '0px' }} onClick={() => editMasterExaminationPopup(row?.ExamId)}><EditSharp /></Button>}
            {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_EXAMINATION_MASTER).length > 0)
            && <Button style={{ minWidth: '0px' }} onClick={() => { setExamId(row?.ExamId); setConfirmDialog(true) }}>
                <DeleteOutline /></Button>}</hgroup>
    }

    const handleClickOpen = () => {
        setOpenImport(!openImport)
    }

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "ExamId",
                width: 50,
            },
            {
                Header: "Longname",
                accessor: "ExamLongname",
                width: 100,
            },
            {
                Header: "Shortname",
                accessor: "ExamShortname",
                width: 100,
            },
            {
                Header: "TypeId",
                accessor: "ExamTypeId",
                width: 50,
            },
            {
                Header: "Overview",
                accessor: "ExamOverview",
                width: 100
            },
            {
                Header: "Colleges",
                accessor: "ExamCoveredColleges",
                width: 100
            },
            {
                Header: "Courses",
                accessor: "ExamCoveredCourses",
                width: 100
            },
            {
                Header: "Application Date",
                accessor: "ExamDateApplication",
                width: 100
            },
            {
                Header: "Exam Date",
                accessor: "ExamDateExam",
                width: 100
            },
            {
                Header: "Age Criteria",
                accessor: "ExamEligibilityAgeCriteria",
                width: 100
            },
            {
                Header: "Qualification",
                accessor: "ExamEligibilityQualification",
                width: 100
            },
            {
                Header: "Mark",
                accessor: "ExamEligibilityMark",
                width: 100
            },
            {
                Header: "Duration",
                accessor: "ExamDuration",
                width: 100
            },
            {
                Header: "Section",
                accessor: "ExamSectionNum",
                width: 100
            },
            {
                Header: "Website",
                accessor: "ExamHelpdeskwebsite",
                width: 100
            },
            {
                Header: "Phone",
                accessor: "ExamHelpdeskPhone",
                width: 70
            },
            {
                Header: "Status",
                accessor: "Status",
                width: 100
            },
            {
                Header: "Action",
                accessor: ActionHandler,
                disableSortBy: true,
                width: 100
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
                    {isOpenMasterExamination && <AddMasterExaminationPopup openImport={isOpenMasterExamination} setOpenImport={setIsOpenMasterExamination} ExamId={ExamId} pageNo={page} limit={limit} />}
                    <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importMasterExamination} refresh={getMasterExamination(page + 1, limit)} popupTitle="Import Examination-Master" />

                    <Typography color="textPrimary" variant="h5">
                        Examination Master
                    </Typography>
                </Grid>

                <Box sx={{ mt: 3 }}>
                    <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Grid item>
                            <div className="import_export_div">
                            {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_EXAMINATION_MASTER).length > 0)
                            && <><FileUpload color="primary" fontSize="small" />
                                <Button onClick={() => handleClickOpen()} className="file_import_export">
                                    Import
                                </Button></>}
                                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_EXAMINATION_MASTER).length > 0)
                            && <><FileDownload color="primary" fontSize="small" />
                                <Button className="file_import_export" onClick={() => downloadExcel()}>
                                    Export
                                </Button></>}
                                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_EXAMINATION_MASTER_ALL).length > 0)
                            && <><FileDownload color="primary" fontSize="small" />
                                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                                    Export All
                                </Button></>}
                            </div>
                        </Grid>
                        <Grid item>
                            <div>
                            {(roleAllowedApis.filter(itm => itm.apiKey === POST_EXAMINATION_MASTER_LIST).length > 0)
                            && <Button onClick={() => createMasterExaminationPopup()}>Add Examination Master</Button>}
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
                            {MasterExaminationData && MasterExaminationData?.rows && MasterExaminationData?.rows?.length > -1 && (
                                <div className={`${classes.tfoottop} itemListSorting`}>
                                    <EnhancedTable
                                        isLoading={isLoading}
                                        columns={columns}
                                        data={MasterExaminationData?.rows}
                                        totalCount={MasterExaminationData?.count}
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