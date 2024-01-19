import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table, TableBody, TableCell,
  TableHead, TableRow
} from '@material-ui/core';
import PropTypes from 'prop-types';
import type { FC } from 'react';

interface EntityAdministratorsProps {
  lstEntity: any;
}

const EntityAdministrators: FC<EntityAdministratorsProps> = (props) => {
  const { lstEntity } = props;
  return (
    <Card>
      <CardHeader className="cardHeader" title="Administrators" />
      <Divider />
      {lstEntity?.length !== 0 ? <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Mobile No
              </TableCell>
              <TableCell>
                E-Mail
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!lstEntity && lstEntity.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.AdminUserGivenName} {item?.AdminUserFamilyName}
                </TableCell>
                <TableCell>
                  {item.AdminUserMobile !== "NULL" ? item.AdminUserMobile : " "}
                </TableCell>
                <TableCell>
                  {item.AdminUserEmail}
                </TableCell>
                <TableCell>
                  {item.AdminUserStatus}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box> : <Box sx={{ p: 2 }}>
            <h3 className="text-center">No record found...</h3>
      </Box>}
    </Card>
  );
};

EntityAdministrators.propTypes = {
  lstEntity: PropTypes.array
};

export default EntityAdministrators;
