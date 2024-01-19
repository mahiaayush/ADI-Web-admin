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
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "src/store";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { getServices, deleteService } from "../../store/actions/ServicesAction";
import { DeleteOutline } from "@material-ui/icons";
import ConfirmDelete from "../Override/ConfirmDelete";

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
        padding: "0",
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
interface ServiceObject {
    id: string,
}
export const ServicesCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const Obj: { type: Color, message: string } = {
        type: 'success',
        message: ''
    }
    const [messageObj, setMessage] = useState(Obj)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    let msgType: Color = 'success';
    const [id, setid] = useState('');

    const displayMessage = (obj: { type: Color, message: string }) => {
        setIsMessage(true);
        setMessage(obj)
        setTimeout(() => { setIsMessage(false) }, 5000);
    }

    const handleDelete = async () => {
        setConfirmDialog(false);
        const { data, error } = await dispatch(deleteService(id));
        let message = data?.message;
        if (error) {
            msgType = 'error';
            message = error?.message;
        }
        dispatch(getServices(page + 1, limit)).then(() => setIsLoading(false));
        displayMessage({ type: msgType, message });
    }

    useEffect(() => {
        setIsLoading(true)
        dispatch(getServices(page + 1, limit)).then(() => setIsLoading(false));
    }, [page, limit])
    const servicesData = useSelector(
        (state: any) => state?.servicesReducer?.ServicesResponse?.data
    );
    const ActionHandler = (row: ServiceObject) => {
        return <hgroup style={{ display: 'flex' }}>
            <Button style={{ minWidth: '0px' }} onClick={() => { setid(row?.id); setConfirmDialog(true) }}>
                <DeleteOutline /></Button></hgroup>
    };

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",
                width: 30,
            },
            {
                Header: "Title",
                accessor: "title",
                width: 60,
            },
            {
                Header: "Description",
                accessor: "description",
                width: 60,
            },
            {
                Header: "IconImageUrl",
                accessor: "iconImageUrl",
                width: 60,
            },
            {
                Header: "BannerImageUrl",
                accessor: "bannerImageUrl",
                width: 60,
            },
            {
                Header: "HoverImageUrl",
                accessor: "hoverImageUrl",
                width: 60,
            },
            {
                Header: "RedirectionUrl",
                accessor: "redirectionUrl",
                width: 60,
            },
            {
                Header: "Display",
                accessor: "display",
                width: 60,
            },
            {
                Header: "Action",
                accessor: ActionHandler,
                disableSortBy: true,
                width: 30,
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
                    <Typography color="textPrimary" variant="h5">
                        Our Services
                    </Typography>
                </Grid>
                <Box sx={{ mt: 3 }}>
                    {isMessage && (
                        <Alert severity={messageObj?.type}>
                            {messageObj?.message}<strong>!</strong>
                        </Alert>)}
                    <Card>
                        <Grid
                            item
                            className="counsellorApplicationListTable filterdataContner"
                        >
                            { servicesData?.rows?.length > 0 && (
                                <div className={`${classes.tfoottop} itemListSorting`}>
                                    <EnhancedTable
                                        isLoading={isLoading}
                                        columns={columns}
                                        data={servicesData?.rows}
                                        totalCount={servicesData?.count}
                                        limit={limit}
                                        currentPage={page}
                                        setPage={setPage}
                                        setLimit={setLimit}
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
    );
};