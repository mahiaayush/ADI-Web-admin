import type { FC } from 'react';
import {
  Box,
  Button,
  Container,
  Typography
} from '@material-ui/core';
import { handleLogin } from '../../utils/aws';

const Home: FC = (props) => (
  <Box
    sx={{
      backgroundColor: 'background.paper',
      py: 6
    }}
    {...props}
  >
    <Container
      maxWidth="md"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        px: {
          md: '130px !important'
        }
      }}
    >
      <Typography
        align="center"
        color="textPrimary"
        variant="h3"
      >
        LMC Web Admin
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        variant="body1"
        sx={{ py: 3 }}
      >
        Manage schools and users associated with Launchmycareer.com
      </Typography>
      <Button
        color="primary"
        size="large"
        onClick={handleLogin}
        variant="contained"
      >
        Get Started
      </Button>
    </Container>
  </Box>
);

export default Home;
