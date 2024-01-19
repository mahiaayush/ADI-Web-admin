import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core/styles';
import Footer from '../components/common/footer/Footer';
import HomeHeader from '../components/common/header/HomeHeader';
import HomeSidebar from '../components/common/navigation/HomeSidebar';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayoutRoot = experimentalStyled('div')(
  ({ theme }) => (
    {
      backgroundColor: theme.palette.background.default,
      height: '100%',
      paddingTop: 64
    }
  )
);

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState<boolean>(false);

  return (
    <MainLayoutRoot>
      <HomeHeader
        onSidebarMobileOpen={(): void => setIsSidebarMobileOpen(true)}
      />
      <HomeSidebar
        onMobileClose={(): void => setIsSidebarMobileOpen(false)}
        openMobile={isSidebarMobileOpen}
      />
      {children || <Outlet />}
      <Footer />
    </MainLayoutRoot>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
