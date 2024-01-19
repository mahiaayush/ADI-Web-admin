import {
    Box,
    Card,
    CardHeader,
    Divider,
    Grid
  } from '@material-ui/core';
  import { useMemo } from 'react';
  import '../../userList.css';
  import EventPagination from '../../../common/dataTable/EventPagination';

  const UserEvents = ({ AuthEvents = [] }) => {
    const columns = useMemo(
        () => [
            {
                Header: 'Event',
                accessor: 'AuthEventName',
            },
            {
                Header: 'Date & Location',
                accessor: 'AuthEventDateLocation',
            },
            {
                Header: 'Status',
                accessor: 'AuthEventStatus',
            },
            {
                Header: 'IP Address',
                accessor: 'AuthEventIpAddress',
            }
        ],
        []
    )

    return (
        <>
            <Card>
                <CardHeader title="Events" />
                <Divider className="header_divider" />
                <Box
                    sx={{
                        backgroundColor: 'background.default',
                        p: 0
                    }}
                >

                    {AuthEvents.length ? <Box sx={{ mt: 3 }} className="externalTableBox">
                        <Card className="externalTable externalTablePagination">
                            <Grid item>
                                <EventPagination
                                    columns={columns}
                                    data={AuthEvents}
                                />
                            </Grid>
                        </Card>
                    </Box>
                    : <Box sx={{ mt: 3, p: 2 }} className="externalTableBox">
                        <h3 className="text-center">No record found...</h3>
                    </Box>}
                </Box>
            </Card>
        </>
    );
}

  export default UserEvents;