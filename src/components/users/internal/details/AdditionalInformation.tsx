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
const AdditionalInformation: FC<LMCJourneyProps> = (props) => {
  const { data } = props;
  return (
    <Card>
      <CardHeader title="Additional Information" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Organization
              </Typography>
            </TableCell>
            <TableCell>
              {data.UserOrganization}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Employee Code
              </Typography>
            </TableCell>
            <TableCell>
              {data.UserEmpcode}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Department
              </Typography>
            </TableCell>
            <TableCell>
              {data.UserDepartment}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Designation
              </Typography>
            </TableCell>
            <TableCell>
              {data.UserDesignation}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Role
              </Typography>
            </TableCell>
            <TableCell>
              {data.roleName}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};
AdditionalInformation.propTypes = {
  data: PropTypes.object
};
export default AdditionalInformation;