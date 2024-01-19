import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Button, Divider, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../logo/Logo';
import { handleLogin } from '../../../utils/aws';

interface MainNavbarProps {
  onSidebarMobileOpen?: () => void;
}

const HomeHeader: FC<MainNavbarProps> = (props) => {
  const { onSidebarMobileOpen } = props;

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary'
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          onClick={onSidebarMobileOpen}
          sx={{
            display: {
              md: 'none'
            }
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <RouterLink to="/">
          <Logo
            sx={{
              display: {
                md: 'inline',
                xs: 'none'
              }
            }}
          />
        </RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            alignItems: 'center',
            display: {
              md: 'flex',
              xs: 'none'
            }
          }}
        >
          {/* <Link
            color="textSecondary"
            component={RouterLink}
            to="#"
            underline="none"
            variant="body1"
          >
            About Us
          </Link> */}
          <Divider
            orientation="vertical"
            sx={{
              height: 32,
              mx: 2
            }}
          />
          <Button
            color="primary"
            onClick={handleLogin}
            size="small"
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

HomeHeader.propTypes = {
  onSidebarMobileOpen: PropTypes.func
};

export default HomeHeader;
