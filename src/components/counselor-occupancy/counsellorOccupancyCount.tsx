import {
    Box, Card, Typography, Grid
  } from '@material-ui/core';
  import './CounsellorOccupancyCount.css';
  import type { FC } from 'react';
  import PropTypes from 'prop-types';
  
  interface EntityProps {
    lstEntity: any;
  }
  const CounsellorOccupancyCount: FC<EntityProps> = (props) => {
    const { lstEntity } = props;
    return (
      <>
      <Grid xs={3}>
                          <Card className="circal1">
                            <Box
                              sx={{
                                alignItems: 'center',
                                margin: 'auto',
                                display: 'flex',
                                justifyContent: 'space-between',
                                p: 3,
                                color: 'black'
                              }}
                            >
                              <div>
                                <Typography
                                  color="textPrimary black"
                                  variant="subtitle2"
                                >
                                  Scheduled
                                </Typography>
                                <Typography
                                  color="textPrimary black"
                                  sx={{ mt: 1 }}
                                  variant="h4"
                                >
                                  {lstEntity ? lstEntity?.sessionScheduledCount : 0}
                                </Typography>
                              </div>
                            </Box>
                          </Card>
                        </Grid>
                        <Grid xs={3}>
                          <Card className="circal1">
                            <Box
                              sx={{
                                alignItems: 'center',
                                margin: 'auto',
                                display: 'flex',
                                justifyContent: 'space-between',
                                p: 3,
                                color: 'black'
                              }}
                            >
                              <div>
                                <Typography
                                  color="textPrimary black"
                                  variant="subtitle2"
                                >
                                  Completed
                                </Typography>
                                <Typography
                                  color="textPrimary black"
                                  sx={{ mt: 1 }}
                                  variant="h4"
                                >
                                  {lstEntity ? lstEntity?.sessionCompletedCount : 0}
                                </Typography>
                              </div>
                            </Box>
                          </Card>
                        </Grid>
                        <Grid xs={3}>
                          <Card className="circal1">
                            <Box
                              sx={{
                                alignItems: 'center',
                                margin: 'auto',
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: "10px",
                                color: 'black'
                              }}
                            >
                              <div>
                                <Typography
                                  color="textPrimary black"
                                  variant="subtitle2"
                                >
                                 Not Completed / No Show
                                </Typography>
                                <Typography
                                  color="textPrimary black"
                                  sx={{ mt: 1 }}
                                  variant="h4"
                                >
                                  {lstEntity ? lstEntity?.sessionNoShowCompletedCount : 0}
                                </Typography>
                              </div>
                            </Box>
                          </Card>
                        </Grid>
                        <Grid xs={3}>
                          <Card className="circal1">
                            <Box
                              sx={{
                                alignItems: 'center',
                                margin: 'auto',
                                display: 'flex',
                                justifyContent: 'space-between',
                                p: 3,
                                color: 'black'
                              }}
                            >
                              <div>
                                <Typography
                                  color="textPrimary black"
                                  variant="subtitle2"
                                >
                                 Cancelled
                                </Typography>
                                <Typography
                                  color="textPrimary black"
                                  sx={{ mt: 1 }}
                                  variant="h4"
                                >
                                  {lstEntity ? lstEntity?.sessionCancelledCount : 0}
                                </Typography>
                              </div>
                            </Box>
                          </Card>
                        </Grid>
                        </>
    );
  };
  
  CounsellorOccupancyCount.propTypes = {
    lstEntity: PropTypes.object
  };
  
  export default CounsellorOccupancyCount;