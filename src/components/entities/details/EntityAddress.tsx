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

interface EntityAddressProps {
  lstEntity: any;
}

const EntityAddress: FC<EntityAddressProps> = (props) => {
  const { lstEntity } = props;
  return (
    <Card>
      <CardHeader className="cardHeader" title="Address" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Street
              </Typography>
            </TableCell>
            <TableCell>
              {lstEntity.EntityAddressStreet}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Locality
              </Typography>
            </TableCell>
            <TableCell>
              {lstEntity.EntityAddressLocality}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Region
              </Typography>
            </TableCell>
            <TableCell>
              {lstEntity.EntityAddressRegion}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Postal code
              </Typography>
            </TableCell>
            <TableCell>
              {lstEntity.EntityAddressPostalCode}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Country
              </Typography>
            </TableCell>
            <TableCell>
              {lstEntity.EntityAddressCountry}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

EntityAddress.propTypes = {
  lstEntity: PropTypes.object
};

export default EntityAddress;
