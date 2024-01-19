import { useEffect } from 'react';
import type { FC } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Drawer, Link } from '@material-ui/core';
import type { Theme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Logo from '../logo/Logo';

interface MainSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const HomeSidebar: FC<MainSidebarProps> = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  return (
    <Drawer
      anchor="left"
      onClose={onMobileClose}
      open={!lgUp && openMobile}
      variant="temporary"
      PaperProps={{
        sx: {
          backgroundColor: 'background.default',
          width: 256
        }
      }}
    >
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 2
        }}
      >
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Link
          color="textSecondary"
          component={RouterLink}
          to="/docs"
          underline="none"
          variant="body1"
        >
          About Us
        </Link>
        <Button
          color="primary"
          component={RouterLink}
          to="/counselling-dashboard"
          size="small"
          sx={{ mt: 4 }}
          variant="contained"
        >
          Login
        </Button>
      </Box>
    </Drawer>
  );
};

HomeSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default HomeSidebar;
