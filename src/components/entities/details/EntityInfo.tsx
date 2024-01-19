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
import Moment from 'moment';

interface EntityInfoProps {
  lstEntity: any;
}

const EntityInfo: FC<EntityInfoProps> = (props) => {
  const { lstEntity } = props;
  return (
    <Card>
      <CardHeader className="cardHeader" title="Entity info" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Name
              </Typography>
            </TableCell>
            <TableCell>
              {lstEntity.EntityName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Type
              </Typography>
            </TableCell>
            <TableCell>
              {lstEntity.EntityTypeName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Join Code
              </Typography>
            </TableCell>
            <TableCell>
              {lstEntity.EntityJoinCode}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Status
              </Typography>
            </TableCell>
            <TableCell>
              {lstEntity.EntityStatus}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Create Date
              </Typography>
            </TableCell>
            <TableCell>
              {/* {lstEntity.EntityCreateDate} */}
              {Moment(lstEntity.EntityCreateDate).format('DD-MM-YYYY')}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

EntityInfo.propTypes = {
  lstEntity: PropTypes.object
};

export default EntityInfo;
