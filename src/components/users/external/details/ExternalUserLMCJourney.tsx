import {
    Card, CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableRow, Typography
  } from '@material-ui/core';
  import type { FC } from 'react';
  import PropTypes from 'prop-types';

  interface LMCJourneyProps {
    data: any;
  }
  const ExternalUserLMCJourney: FC<LMCJourneyProps> = ({ data = {} }) => {
    return (
      <Card>
        <CardHeader title="LMC Journey" />
        <Divider />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Profile
                </Typography>
              </TableCell>
              <TableCell>
                {data.profile}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Personality
                </Typography>
              </TableCell>
              <TableCell>
                {data.personality}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Skills
                </Typography>
              </TableCell>
              <TableCell>
                {data.skills}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Interest
                </Typography>
              </TableCell>
              <TableCell>
                {data.interests}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  Children
                </Typography>
              </TableCell>
              <TableCell>
                {data.children}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    );
  };
  ExternalUserLMCJourney.propTypes = {
    data: PropTypes.object
  };
  export default ExternalUserLMCJourney;