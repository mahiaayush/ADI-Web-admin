import { FC, useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CircularProgress, CssBaseline, ThemeProvider } from '@material-ui/core';
import useAuth from './hooks/useAuth';
import useScrollReset from './hooks/useScrollReset';
import useSettings from './hooks/useSettings';
import SplashScreen from './components/common/splashScreen/SplashScreen';
import routes from './routes';
import { createCustomTheme } from './theme';
import './assets/css/globle.css';
import { useDispatch, useSelector } from "./store";
import { getAllowedRoutesAction, getRBACAllowedApisAction } from "./store/actions/getAllowedRoutesAction";
import ErrorNotFound from './components/RouteMaster/ErrorNotFound';
import { makeStyles } from "@material-ui/core/styles";
import _ from 'lodash';

const useStyles = makeStyles({
  circularProgressLoadingClass: {
    "min-height": "80vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
  }
});

const App: FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [homeRoute, setHomeRoute] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getAllowedRoutesAction()).then(() => setLoading(false))
    dispatch(getRBACAllowedApisAction()).then(() => setLoading(false))
  }, [])
  const AllowedRoutes = useSelector(
    (state: any) => state?.allowedRoutesRes?.getAlllowedRoutesResponse?.data
  )

  const myRouteArray = AllowedRoutes?.[0]?.ROUTES;
  useEffect(() => {
    if (myRouteArray?.[0]?.children?.length) {
      setHomeRoute(myRouteArray?.[0]?.children?.[0]?.ROUTE_SLUG);
    } else {
      setHomeRoute(myRouteArray?.[0]?.ROUTE_SLUG)
    }
  }, [myRouteArray])
  const auth = useAuth();
  const content = useRoutes(routes(auth.isAuthenticated, homeRoute))
  const { settings } = useSettings();
  const flat = [];

  function flatten(items) { // recursive function to get all the route id's
    for (let i = 0; i < items?.length; i++) {
        if (items?.[i]?.children?.length) {
            flatten(items?.[i]?.children)
        }
        flat.push(items?.[i]?.ROUTE_ID);
    }
    return flat;
}
            
flatten(myRouteArray)
const flotinPoint = flat.join().split(',');
  const filteredArray = routes(auth.isAuthenticated, homeRoute)?.[3]?.children?.map((item, index) => {
    return flotinPoint?.includes(item?.id) ? { ...item } : { path: "*", element: <ErrorNotFound /> }
  })

  const newRoutes = [...routes(auth.isAuthenticated, homeRoute)];
  newRoutes[3].children = filteredArray;
  const contentNew = useRoutes(newRoutes)

  useScrollReset();

  const theme = createCustomTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-center" />
      {!loading ? auth.isInitialized ? contentNew : <SplashScreen /> : <div className={classes.circularProgressLoadingClass}><CircularProgress /></div>}
    </ThemeProvider>
  );
};

export default App;
