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
import { useEffect, useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import Label from '../../../common/reusable/Label';
import '../../userList.css';
import UpdatePopup from "./ExternalUserUpdatePopup";

interface EntityInfoProps {
  data: any;
}
const ExternalUserEntityInfo: FC<EntityInfoProps> = (props) => {
  const { data } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
  const [existingData, setExistingData] = useState({ email: "", phone_number: "" });
  const [toUpdate, setToUpdate] = useState('');
  return (
    <div>
      <Card>
        <div className="card_header">
          <CardHeader title="Contact Details" />
        </div>
        <Divider className="header_divider" />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography color="textPrimary" variant="subtitle2">
                  Name
                </Typography>
              </TableCell>
              <TableCell className="displayName">
                {data.UserGivenName} {data.UserFamilyName}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography color="textPrimary" variant="subtitle2">
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                {data.UserEmail}{" "}
                <Button
                  sx={{
                    float: "right",
                    backgroundColor: "primary",
                    color: "error.contrastText",
                    "&:hover": {
                      backgroundColor: "primary",
                    },
                  }}
                  variant="text"
                  onClick={() => {
                    setToUpdate('email');
                    setExistingData({ email: data.UserEmail, phone_number: data.UserPhoneNumber });
                    setOpenUpdatePopup(true);
                  }}
                >
                <EditIcon fontSize="small" style={{ color: 'grey' }} />
                </Button>{" "}
                <br />
                {(data.UserEmailVerified === true || data.UserEmailVerified === false) && (
                  <Label
                    sx={{
                      borderRadius: "10px",
                    }}
                    color={data.UserEmailVerified ? "success" : "error"}
                  >
                    {data.UserEmailVerified
                      ? "Email verified"
                      : "Email not verified"}
                  </Label>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography color="textPrimary" variant="subtitle2">
                  Phone
                </Typography>
              </TableCell>
              <TableCell>
                {data.UserPhoneNumber}{" "}
                <Button
                  sx={{
                    float: "right",
                    backgroundColor: "primary",
                    color: "error.contrastText",
                    "&:hover": {
                      backgroundColor: "primary",
                    },
                  }}
                  variant="text"
                  onClick={() => {
                    setToUpdate('phone_number');
                    setExistingData({ email: data.UserEmail, phone_number: data.UserPhoneNumber?.slice(3, 13) });
                    setOpenUpdatePopup(true);
                  }}
                >
                   <EditIcon fontSize="small" style={{ color: 'grey' }} />
                </Button>{" "}
                <br />
                {(data.UserPhoneNumberVerified === true || data.UserPhoneNumberVerified === false) && (
                  <Label
                    sx={{
                      borderRadius: "10px",
                    }}
                    color={data.UserPhoneNumberVerified ? "success" : "error"}
                  >
                    {data.UserPhoneNumberVerified
                      ? "PHONE NUMBER VERIFIED"
                      : "PHONE NUMBER NOT VERIFIED"}
                  </Label>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography color="textPrimary" variant="subtitle2">
                  Country
                </Typography>
              </TableCell>
              <TableCell>{data.UserCountry}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography color="textPrimary" variant="subtitle2">
                  State
                </Typography>
              </TableCell>
              <TableCell>{data.UserRegion}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography color="textPrimary" variant="subtitle2">
                  Address Line 1
                </Typography>
              </TableCell>
              <TableCell>{data.UserAddressLineOne}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography color="textPrimary" variant="subtitle2">
                  Address Line 2
                </Typography>
              </TableCell>
              <TableCell>{data.UserAddressLineTwo}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
      <UpdatePopup
        openPopup={openUpdatePopup}
        setOpenPopup={setOpenUpdatePopup}
        existingData={existingData}
        toUpdate={toUpdate}
      />
    </div>
  );
};
ExternalUserEntityInfo.propTypes = {
  data: PropTypes.object
};
export default ExternalUserEntityInfo;