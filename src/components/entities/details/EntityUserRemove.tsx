import type { FC } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Typography
} from '@material-ui/core';
import TrashIcon from '../../../icons/Trash';

const EntityUserRemove: FC = (props) => (
  <Card {...props}>
    <CardHeader className="cardHeader" title="Remove Entity" />
    <Divider />
    <CardContent>      
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
          Remove this customer’s chart if he requested that, if not
          please be aware that what has been deleted can never brought
          back
        </Typography>
      </Box>
      <Button
        startIcon={<TrashIcon fontSize="small" />}
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

export default EntityUserRemove;
