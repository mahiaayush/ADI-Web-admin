import {
  Card, CardHeader, CardContent,
  Divider,
  Typography, Button, Box
} from '@material-ui/core';
import type { FC } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const InternalUserEntityInfo: FC = () => {
  return (
    <Card>
      <CardHeader title="Data Management" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Button
            color="inherit"
            startIcon={<NotInterestedIcon fontSize="small" />}
            variant="text"
          >
            Close Account
          </Button>
        </Box>
        <Box
          sx={{
            mb: 2,
            mt: 1
          }}
        >
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Remove this entity if admin requested that, if not
            please be aware that what has been deleted can never brought
            back
          </Typography>
        </Box>
        <Button
          startIcon={<DeleteForeverIcon fontSize="small" />}
          sx={{
            backgroundColor: 'error.main',
            color: 'error.contrastText',
            '&:hover': {
              backgroundColor: 'error.dark'
            }
          }}
          variant="contained"
        >
          Delete Account
        </Button>
      </CardContent>
    </Card>
  );
};

export default InternalUserEntityInfo;