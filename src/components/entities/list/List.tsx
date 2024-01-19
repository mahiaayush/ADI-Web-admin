import {
    Box,
    Breadcrumbs,
    Container,
    Grid,
    Link
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineSharp from '@material-ui/icons/AddCircleOutlineSharp';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import Moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { GET_ENTITY_DETAIL } from 'src/store/RbacConstants';
import { useDispatch, useSelector } from '../../../store';
import { getEntityList, getEntityfilterlist } from '../../../store/actions/entityAction';
import { Entity } from '../../../types/entity';
import EnhancedTable from '../../common/dataTable/EnhancedTable';
import ShowButton from '../../common/reusable/ShowButton';

const Details = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [filters, setFilters] = useState([])
    const [sortBy, setSortBy] = useState([]);
    useEffect(() => {
        setIsLoading(true)
        const IntervalIdentifier = setTimeout(() => {
            dispatch(getEntityList(page + 1, limit, filters, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false))
        }, 1000)
        return () => { clearTimeout(IntervalIdentifier) }    
    }, [page, limit, filters, sortBy]);

    useEffect(() => {
        dispatch(getEntityfilterlist())
    }, [])

    const { entities, filterList } = useSelector(state => state.entity);
    const roleAllowedApis = useSelector(
        (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
      )

    const AddButtonToCell = (row: Entity) => {
        const isEnable = (roleAllowedApis.filter(itm => itm.apiKey === GET_ENTITY_DETAIL).length > 0)
        return (isEnable ? <ShowButton label="Show" size="small" variant="outlined" color="primary" id={row.EntityId} /> : null);
    }

    const NumberofUsers = (row: Entity) => {
        return (row.NumberofUsers ? row.NumberofUsers : 0)
    }

    const setStatusColor = (value) => {
        switch (value) {
            case 'Pending': return 'status_badge_pending';
            case 'Approved': return 'status_badge_active';
            case 'Denied': return 'status_badge_banned';
            case 'In Progress': return 'status_badge_inactive';
            default: return ''
        }
    }

    const EntityStatusBadge = (row: Entity) => {
        return (<span className={clsx('status_badge', setStatusColor(row.EntityStatus))}>{row.EntityStatus}</span>)
    }
    const ShowCreateDate = (row: Entity) => {
        return (<span>{Moment(row.EntityCreateDate).format('DD-MM-YYYY')}</span>)
    }

    const selectType = ({ column }) => {
        return (
            <TextField
                size="small"
                label="Type"
                name="type"
                type="text"
                fullWidth
                select
                value={column.filterValue || ''}
                onChange={e => {
                    column.setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
            >
                <MenuItem value="">Select Type</MenuItem>
                {
                    filterList.filterListitems.filterType
                        ? filterList.filterListitems.filterType.map((data) => (
                            <MenuItem key={data.value} value={data.value}>{data.text}</MenuItem>
                        )) : null
                }
            </TextField>
        )
    }

    const selectName = ({ column }) => {
        return (
            <TextField
                // className={classes.textField}
                id="outlined-basic"
                size="small"
                label="Filter"
                variant="outlined"
                value={column.filterValue || ''}
                placeholder="Name, Join code"
                onChange={e => {
                    column.setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        )
    }

    const selectRegion = ({ column }) => {
        return (
            <TextField
                size="small"
                label="Region"
                name="region"
                type="text"
                fullWidth
                select
                value={column.filterValue || ''}
                onChange={e => {
                    column.setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
            >
                <MenuItem value="">Select Region</MenuItem>
                {
                    filterList.filterListitems.filterRegion
                        ? filterList.filterListitems.filterRegion.map((data) => (
                            <MenuItem key={data} value={data}>{data}</MenuItem>
                        )) : null
                }
            </TextField>
        )
    }

    const selectStatus = ({ column }) => {
        return (
            <TextField
                size="small"
                label="Status"
                name="status"
                type="text"
                fullWidth
                select
                value={column.filterValue || ''}
                onChange={e => {
                    column.setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
            >
                <MenuItem value="">Select Status</MenuItem>
                {
                    filterList.filterListitems.filterStatus
                        ? filterList.filterListitems.filterStatus.map((data) => (
                            <MenuItem key={data.value} value={data.value}>{data.text}</MenuItem>
                        )) : null
                }
            </TextField>
        )
    }

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'EntityName',
                id: 'name',
                Filter: selectName,
                width: 220
            },
            {
                Header: 'Type',
                accessor: 'EntityType',
                name: 'type',
                id: 'type',
                Filter: selectType,
                disableSortBy: true,
            },
            {
                Header: 'Create Date',
                id: 'createdon',
                accessor: ShowCreateDate,
                disableFilters: true,
            },
            {
               Header: 'Students Count',
               accessor: NumberofUsers,
               disableFilters: true,
               disableSortBy: true,
               width: 100
            },
            {
                Header: 'Join Code',
                accessor: 'EntityJoinCode',
                disableFilters: true,
                disableSortBy: true,
            },
            {
                Header: 'Region',
                accessor: 'EntityRegion',
                Filter: selectRegion,
                disableSortBy: true,
            },
            {
                Header: 'Status',
                id: 'status',
                accessor: EntityStatusBadge,
                Filter: selectStatus,
                disableSortBy: true,    
            },
            {
                Header: ' ',
                id: 'AddButtonToCell',
                accessor: AddButtonToCell,
                disableFilters: true,
                disableSortBy: true,
            }
        ],
        [filterList, roleAllowedApis, GET_ENTITY_DETAIL]
    )

    return (
        <Box sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 2
        }}
        >
            <Container>
                <Grid
                    container
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Grid item>
                        <Typography
                            color="textPrimary"
                            variant="h5"
                        >
                            Entity List
                        </Typography>
                    </Grid>
                    {/* <Grid item>
                        <Tooltip title="Add">
                            <IconButton
                                aria-label="add"
                                size="small"
                                onClick={() => { }}
                            >
                                <AddCircleOutlineSharp
                                    color="primary"
                                    fontSize="large"
                                />
                            </IconButton>
                        </Tooltip>
                    </Grid> */}
                </Grid>
                <Box sx={{ mt: 3 }}>
                    <Grid item>
                        <CssBaseline />
                        <div className="entityListMainDiv">
                            <EnhancedTable
                                searchFilters={filters}
                                setFilters={setFilters}
                                isLoading={isLoading}
                                columns={columns}
                                data={entities.list}
                                totalCount={entities.count}
                                currentPage={page}
                                setPage={setPage}
                                limit={limit}
                                setLimit={setLimit}
                                sortedBy={sortBy}
                                setSortedBy={setSortBy}
                                search={search}
                                setSearch={setSearch}
                                manualPagination={true}
                                manualGlobalFilter={true}
                                manualSortBy={true}
                            />
                        </div>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default Details;