import { useParams, useNavigate } from 'react-router';
import {
  Card, CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow, Typography, Button
} from '@material-ui/core';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import Label from '../../../common/reusable/Label';
import '../../userList.css';

interface EntityInfoProps {
  data: any;
}
const ExternalUserEntityInfo: FC<EntityInfoProps> = (props) => {
  const { data } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Card>
      <div className="card_header">
        <CardHeader title="Contact Details" />
      </div>
      <div className="card_header_button">
        <Button
          startIcon={<EditIcon fontSize="small" />}
          sx={{
            backgroundColor: 'primary',
            color: 'error.contrastText',
            '&:hover': {
              backgroundColor: 'primary'
            }
          }}
          variant="contained"
          onClick={() => navigate(`/user/${id}/edit`)}
        >
          Edit
        </Button>
      </div>
      <Divider className="header_divider" />
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
            <TableCell className="displayName">
              {data.UserGivenName} {data.UserFamilyName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Email
              </Typography>
            </TableCell>
            <TableCell>
              {data.UserEmail} <br />
              {(data.UserEmailVerified === true || data.UserEmailVerified === false)
                && <Label
                  sx={{
                    borderRadius: '10px'
                  }} color={data.UserEmailVerified ? 'success' : 'error'}
                >
                  {data.UserEmailVerified ? 'Email verified' : 'Email not verified'}
                </Label>}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Phone
              </Typography>
            </TableCell>
            <TableCell>
              {data.UserPhoneNumber} <br />
              {(data.UserPhoneNumberVerified === true || data.UserPhoneNumberVerified === false)
                && <Label
                  sx={{
                    borderRadius: '10px'
                  }} color={data.UserPhoneNumberVerified ? 'success' : 'error'}
                >
                  {data.UserPhoneNumberVerified ? 'PHONE NUMBER VERIFIED' : 'PHONE NUMBER NOT VERIFIED'}
                </Label>}
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
              {data.UserCountry}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                State
              </Typography>
            </TableCell>
            <TableCell>
              {data.UserRegion}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Address Line 1
              </Typography>
            </TableCell>
            <TableCell>
              {data.UserAddressLineOne}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Address Line 2
              </Typography>
            </TableCell>
            <TableCell>
              {data.UserAddressLineTwo}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};
ExternalUserEntityInfo.propTypes = {
  data: PropTypes.object
};
export default ExternalUserEntityInfo;