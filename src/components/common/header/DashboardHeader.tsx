import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, IconButton, Toolbar } from '@material-ui/core';
import type { AppBarProps } from '@material-ui/core';
import Account from './Account';
import Logo from '../logo/Logo';
import Notification from './Notification';
import MenuIcon from '@material-ui/icons/Menu';
import UserDropdown from "./UserDropdown";
import DashboardNavbarRoot from './dashboardHeaderStyle';

interface DashboardNavbarProps extends AppBarProps {
  onSidebarMobileOpen?: () => void;
}

const DashboardHeader: FC<DashboardNavbarProps> = (props) => {
  const { onSidebarMobileOpen, ...other } = props;

  return (
    <DashboardNavbarRoot {...other}>
      <Toolbar sx={{ minHeight: 64 }}>
        <IconButton
          color="inherit"
          onClick={onSidebarMobileOpen}
          sx={{
            display: {
              lg: 'none'
            }
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <RouterLink to="/">
          <Logo
            variant="white"
            sx={{
              display: {
                lg: 'inline',
                xs: 'none'
              }
            }}
          />
        </RouterLink>
        {/* <Box sx={{ ml: 1 }}>
          <UserDropdown />
        </Box> */}
        <Box
          sx={{
            flexGrow: 1,
            ml: 2
          }}
        />
        <Box sx={{ ml: 1 }}>
          <Notification />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Account />
        </Box>
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

DashboardHeader.propTypes = {
  onSidebarMobileOpen: PropTypes.func
};

export default DashboardHeader;
