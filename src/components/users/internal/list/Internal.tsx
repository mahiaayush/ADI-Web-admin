import clsx from 'clsx';
import { useMemo, useState, useEffect } from 'react';
import {
    Avatar,
    Box, Button, Card,
    Grid
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useNavigate } from 'react-router-dom';
import EnhancedTable from '../../../common/dataTable/EnhancedTable';
import { useDispatch, useSelector } from '../../../../store';
import { getInternalUsersList } from '../../../../store/actions/internalUserAction';
import { InternalUsers } from '../../../../types/user';
import { GET_INTERNAL_USERS_DETAILS } from 'src/store/RbacConstants';

const Internal = ({ newUsers = 0 }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(10);
    const { internalUsers } = useSelector(state => state.internalUser);  

    const [isLoading, setIsLoading] = useState(false)
    const [sortBy, setSortBy] = useState([]);
    useEffect(() => {
        setIsLoading(true);
        dispatch(getInternalUsersList(page + 1, limit, search, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'desc' : 'asc', sortBy?.[0]?.id)).then(() => setIsLoading(false));
    }, [page, limit, search, sortBy]);

    /**
   * GET ALL ALLOWED API List
   */
    const roleAllowedApis = useSelector(
        (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )

    const getStatus = (value) => {
        switch (value) {
            case "UNCONFIRMED": return {
                class: 'status_badge_pending'
            }
            case "CONFIRMED": return {
                class: 'status_badge_active'
            }
            case "PASSWORD_CHANGE_REQUIRED": return {
                class: 'status_badge_inactive'
            }
            case "RESET_REQUIRED": return {
                class: 'status_badge_banned'
            }
            default: return {
                class: ''
            }
        }
    }
    const AddButtonToCell = (row: InternalUsers) => {
        const isPermission = (roleAllowedApis.filter(itm => itm.apiKey === GET_INTERNAL_USERS_DETAILS).length > 0);
        return (isPermission && <Button
            size="small"
            type="button"
            variant="outlined"
            color="primary"
            onClick={() => { navigate(`/user/${row.Username}`) }}
        >Show</Button>)
    }
    const AddImageToCell = (row: InternalUsers) => {
        /* {row.avatar} */
        return (<div><Avatar className="avatar_icon" /><span className="username">{row.UserGivenName} {row.UserFamilyName}</span></div>)
    }
    const UserStatusBadge = (row: InternalUsers) => {
        const status = getStatus(row.UserStatus)
        return (<span className={clsx('status_badge', 'status_badge_user', status.class)}>{row.UserStatus}</span>)
    }
    const columns = useMemo(
        () => [
            // {
            //     Header: 'Name',
            //     accessor: AddImageToCell,
            // },
            {
                Header: 'Name',
                accessor: 'UserFullName',
                width: 200
            },
            {
                Header: 'Email',
                accessor: 'UserEmail',
                width: 200
            },
            {
                Header: 'Phone Number',
                accessor: 'UserPhoneNumber',
                width: 200
            },
            {
                Header: 'Profile',
                accessor: 'UserProfile',
            },
            {
                Header: 'Role',
                accessor: 'UserRole',
            },
            {
                Header: 'Status',
                id: 'UserStatus',
                accessor: UserStatusBadge,
            },
            {
                Header: 'Actions',
                id: ' ',
                accessor: AddButtonToCell,
                disableSortBy: true
            },
        ],
        [roleAllowedApis]
    )
    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    p: 0,
                }}
            >
                <Box sx={{ mt: 3 }}>
                    <Card className="externalTable">
                        {/* <Grid item></Grid> */}
                        <Grid item>
                            <CssBaseline />
                            <div className="internalListUsers">
                            <EnhancedTable
                                totalCount={internalUsers.count}
                                isLoading={isLoading}
                                columns={columns}
                                data={internalUsers.list}
                                search={search}
                                setSearch={setSearch}
                                limit={limit}
                                setLimit={setLimit}
                                currentPage={page}
                                setPage={setPage}
                                sortedBy={sortBy}
                                setSortedBy={setSortBy}
                                manualPagination={true}
                                manualGlobalFilter={true}
                                manualSortBy={true}
                            />
                            </div>
                        </Grid>
                    </Card>
                </Box>
            </Box></>
    );
}
export default Internal;