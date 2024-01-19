import {
    Card, CardHeader,
    Divider,
    Button,
    TextField, Grid, Box
  } from '@material-ui/core';
  import type { FC } from 'react';
  import { useMemo, useState } from 'react';
  import LinkOffIcon from '@material-ui/icons/LinkOff';
  import EmailIcon from '@material-ui/icons/Email';
  import IconButton from '@material-ui/core/IconButton';
  import '../../userList.css';
  import EventPagination from '../../../common/dataTable/EventPagination';

  const LinkedAccountsData = [
    { id: 0, name: 'Shri Nadar School' },
    { id: 1, name: 'Poddar School' },
    { id: 2, name: 'Lucknow Public College' },
    { id: 3, name: 'CMS' },
    { id: 4, name: 'SKD Academy' },
    { id: 5, name: 'Amity College' }
  ];

  const UnlinkBadge = () => {
      return (<IconButton color="primary" aria-label="upload picture" component="span"><LinkOffIcon /></IconButton>)
  }

  const ExternalUserEntityInfo: FC = () => {
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Unlink',
                id: ' ',
                accessor: UnlinkBadge,
            }
        ],
        []
    )

    const [data] = useState(useMemo(() => LinkedAccountsData, []));

    return (
        <>
          <Card>
            <CardHeader title="Linked Accounts" />
            <Divider className="header_divider" />
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    p: 0
                }}
            >
              <div className="textbuttonpadding">
                  <TextField
                      fullWidth
                      label="Enter Join Code"
                      name="joinCode"
                      variant="outlined"
                      className="joincode"
                  />
                  <Button
                      startIcon={<EmailIcon fontSize="small" />}
                      sx={{
                      backgroundColor: 'primary',
                      color: 'error.contrastText',
                      mt: 3,
                      '&:hover': {
                          backgroundColor: 'primary'
                      }
                      }}
                      variant="contained"
                  >
                      Join
                  </Button>
                </div>
                <Box sx={{ mt: 3 }}>
                    <Card className="externalTable externalTablePagination">
                        <Grid item>
                            <EventPagination
                                columns={columns}
                                data={data}
                            />
                        </Grid>
                    </Card>
                </Box>
            </Box>
            </Card>
            </>
    );
}

  export default ExternalUserEntityInfo;