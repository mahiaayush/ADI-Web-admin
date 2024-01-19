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
import { deleteBannerSection, getBannerSection } from "src/store/actions/BannerSectionAction";
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

interface BannerSectionObject {
    id: string,
}

export const BannerSectionCorrection = () => {
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
        const { data, error } = await dispatch(deleteBannerSection(id));
        let message = data?.message;
        if (error) {
            msgType = 'error';
            message = error?.message;
        }
        dispatch(getBannerSection(page + 1, limit)).then(() => setIsLoading(false));
        displayMessage({ type: msgType, message });
    }

    useEffect(() => {
        setIsLoading(true)
        dispatch(getBannerSection(page + 1, limit)).then(() => setIsLoading(false));
    }, [page, limit])

    const bannerSectionData = useSelector(
        (state: any) => state?.getBannerSectionReducer?.bannerSectionResponse?.data
    )
    const ActionHandler = (row: BannerSectionObject) => {
        return <hgroup style={{ display: 'flex' }}>
            <Button style={{ minWidth: '0px' }} onClick={() => { setid(row?.id); setConfirmDialog(true) }}>
                <DeleteOutline /></Button></hgroup>
    }
    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",
                width: 30,
            },
            {
                Header: "Title",
                accessor: "bannerTitle",
                width: 30,
            },
            {
                Header: "Description",
                accessor: "bannerDesc",
                width: 30,
            },
            {
                Header: "Button Left Title",
                accessor: "buttonLeftTitle",
                width: 30,
            },
            {
                Header: "Button Left CTA",
                accessor: "buttonLeftCTA",
                width: 30,
            },
            {
                Header: "Button Right Title",
                accessor: "buttonRightTitle",
                width: 30,
            },
            {
                Header: "Button Right CTA",
                accessor: "buttonRightCTA",
                width: 30,
            },
            {
                Header: "Banner Image",
                accessor: "bannerImage",
                width: 30,
            },
            {
                Header: "Text Placement",
                accessor: "textPlacement",
                width: 30,
            },
            {
                Header: "Text Alignment",
                accessor: "textAlignment",
                width: 30,
            },
            {
                Header: "Background Image",
                accessor: "backgroundImage",
                width: 30,
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
                    <Typography color="textPrimary" variant="h5">
                        Banner Section
                    </Typography>
                </Grid>
                <Box>
                    {isMessage && (
                        <Alert severity={messageObj?.type}>
                            {messageObj?.message}<strong>!</strong>
                        </Alert>)}
                    <Card>
                        <Grid
                            item
                            className="counsellorApplicationListTable filterdataContner"
                        >
                            {bannerSectionData?.rows?.length > 0 && (
                                <div className={`${classes.tfoottop} itemListSorting`}>
                                    <EnhancedTable
                                        isLoading={isLoading}
                                        columns={columns}
                                        data={bannerSectionData?.rows}
                                        totalCount={bannerSectionData?.count}
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

    )
}