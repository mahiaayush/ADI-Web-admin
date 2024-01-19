import { experimentalStyled } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';

const DashboardNavbarRoot = experimentalStyled(AppBar)(
  ({ theme }) => (
    {
      ...(
        theme.palette.mode === 'light' && {
          backgroundColor: theme.palette.primary.main,
          boxShadow: 'none',
          color: theme.palette.primary.contrastText
        }
      ),
      ...(
        theme.palette.mode === 'dark' && {
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none'
        }
      ),
      zIndex: theme.zIndex.drawer + 100
    }
  )
);

export default DashboardNavbarRoot;
