import clsx from 'clsx';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Avatar,
    Box, Button, Card,
    Grid
} from '@material-ui/core';
import { useDispatch, useSelector } from '../../../../store';
import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from '../../../common/dataTable/EnhancedTable';
import { getExternalUserList } from '../../../../store/actions/externalUserAction';
import { ExternalUsers } from '../../../../types/user';

const External = ({ newUsers = 0 }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { externalUsers } = useSelector(state => state.externalUser);
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10);
    const [initialLimit, setInitialLimit] = useState(10)
    const [search, setSearch] = useState('')
    const [initialSearch, setInitialSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [sortBy, setSortBy] = useState([]);
    useEffect(() => {
        setIsLoading(true)
        const isMaxPage = page + 1 === externalUsers.paginationToken.length
        const isLimitChange = limit !== initialLimit
        const isSearchChange = search !== initialSearch
        const isLastPage = page + 1 === Math.ceil(externalUsers.count / limit)
        dispatch(getExternalUserList(page + 1, isLastPage && externalUsers.count ? externalUsers.count % limit : limit, search, isMaxPage, isLimitChange, isSearchChange,
            sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'desc' : 'asc', sortBy?.[0]?.id))
            .then(() => setIsLoading(false))
        if (isLimitChange) setInitialLimit(limit);
        if (isSearchChange) setInitialSearch(search);
    }, [page, limit, search, sortBy]);

    useEffect(() => {
        setPage(0)
    }, [newUsers])

    const getStatus = (value) => {
        switch (value) {
            case "Unconfirmed": return {
                class: 'status_badge_pending'
            }
            case "Confirmed": return {
                class: 'status_badge_active'
            }
            case "CONFIRMED": return {
                class: 'status_badge_active'
            }
            case "UNCONFIRMED": return {
                class: 'status_badge_pending'
            }
            case "FORCE_CHANGE_PASSWORD": return {
                class: 'status_badge_inactive'
            }
            case "Password Change Required": return {
                class: 'status_badge_inactive'
            }
            case "Password Reset Required": return {
                class: 'status_badge_banned'
            }
            default: return {
                class: ''
            }
        }
    }

    const AddButtonToCell = (row: ExternalUsers) => {
        return (<Button
            size="small"
            type="button"
            variant="outlined"
            color="primary"
            onClick={() => { navigate(`/user/external/${row.UserName}`) }}
        >Show</Button>)
    }
    const AddImageToCell = (row: ExternalUsers) => {
        return (<div><Avatar src={row.UserProfile} className="avatar_icon" /><span className="username">{row.UserFirstName} {row.UserLasteName}</span></div>)
    }

    const UserStatusBadge = (row: ExternalUsers) => {
        const status = getStatus(row.UserStatus);
        return (<span className={clsx('status_badge', 'status_badge_user', status.class)}>{row.UserStatus}</span>)
    }

    const columns = useMemo(
        () => [
            // {
            //     Header: 'Name',
            //     id: 'UserName',
            //     accessor: AddImageToCell,
            // },
            {
                Header: 'Name',
                accessor: 'UserFullName',
                id: 'UserFullName',
            },
            {
                Header: 'Email',
                accessor: 'UserEmail',
                id: 'UserEmail',
                width: 200
            },
            {
                Header: 'Phone Number',
                accessor: 'UserPhoneno',
                id: "UserPhoneno",
                // disableSortBy: true,
                width: 200
            },
            {
                Header: 'Status',
                id: 'UserStatus',
                accessor: UserStatusBadge,
                // disableSortBy: true
            },
            {
                Header: 'Actions',
                id: ' ',
                accessor: AddButtonToCell,
                disableSortBy: true
            },
        ],
        []
    )

    return (
        <Box
        sx={{
            backgroundColor: 'background.default',
            p: 0
        }}
        >
            <Box sx={{ mt: 3 }}>
                <Card className="externalTable">
                    {/* <Grid item></Grid> */}
                    <Grid item>
                        <CssBaseline />
                        <div className="externalListUsers">
                        <EnhancedTable
                            columns={columns}
                            data={externalUsers.list}
                            totalCount={externalUsers.count}
                            limit={limit}
                            setLimit={setLimit}
                            currentPage={page}
                            setPage={setPage}
                            isLoading={isLoading}
                            sortedBy={sortBy}
                            setSortedBy={setSortBy}
                            manualPagination={true}
                            search={search}
                            setSearch={setSearch}
                            manualGlobalFilter={true}
                            manualSortBy={true}
                            // singleStep={true}
                        />
                        </div>
                    </Grid>
                </Card>
            </Box>
        </Box>
    );
}
export default External;