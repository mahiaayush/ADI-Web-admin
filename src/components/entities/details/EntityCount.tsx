import {
  Box, Card, Typography, Grid
} from '@material-ui/core';
import './EntityCount.css';
import type { FC } from 'react';
import PropTypes from 'prop-types';

interface EntityProps {
  lstEntity: any;
}
const EntityCount: FC<EntityProps> = (props) => {
  const { lstEntity } = props;
  return (
    <>
    <Grid xs={4}>
                        <Card className="circal">
                          <Box
                            sx={{
                              alignItems: 'center',
                              margin: 'auto',
                              display: 'flex',
                              justifyContent: 'space-between',
                              p: 3
                            }}
                          >
                            <div>
                              <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                style={{ color: "#222b36" }}
                              >
                                Admin
                              </Typography>
                              <Typography
                                color="textPrimary"
                                sx={{ mt: 1 }}
                                variant="h4"
                                style={{ color: "#222b36" }}
                              >
                                {lstEntity.EntityUserCount?.AdminCount}
                              </Typography>
                            </div>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid xs={4}>
                        <Card className="circal">
                          <Box
                            sx={{
                              alignItems: 'center',
                              margin: 'auto',
                              display: 'flex',
                              justifyContent: 'space-between',
                              p: 3
                            }}
                          >
                            <div>
                              <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                style={{ color: "#222b36" }}
                              >
                                Student
                              </Typography>
                              <Typography
                                color="textPrimary"
                                sx={{ mt: 1 }}
                                variant="h4"
                                style={{ color: "#222b36" }}
                              >
                                {lstEntity.EntityUserCount?.StudentCount}
                              </Typography>
                            </div>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid xs={4}>
                        <Card className="circal">
                          <Box
                            sx={{
                              alignItems: 'center',
                              margin: 'auto',
                              display: 'flex',
                              justifyContent: 'space-between',
                              p: 3
                            }}
                          >
                            <div>
                              <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                style={{ color: "#222b36" }}
                              >
                                Users
                              </Typography>
                              <Typography
                                color="textPrimary"
                                sx={{ mt: 1 }}
                                variant="h4"
                                style={{ color: "#222b36" }}
                              >
                                {lstEntity.EntityUserCount?.AdminCount + lstEntity.EntityUserCount?.StudentCount} 
                              </Typography>
                            </div>
                          </Box>
                        </Card>
                      </Grid></>
  );
};

EntityCount.propTypes = {
  lstEntity: PropTypes.object
};

export default EntityCount;
