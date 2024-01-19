import {
  Container,
  CircularProgress
} from '@material-ui/core';

import { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';

import HeadingBox from "./HomeComponent/HeadingBox/HeadingBox";
import GraphBox from "./HomeComponent/GraphBox/GraphBox";
import StatsBox from "./HomeComponent/StatsBox/StatsBox";
import RangeBox from "./HomeComponent/RangeBox/RangeBox";
import RecentUseAmount from "./HomeComponent/RecentUseAmount/RecentUseAmount";
import { getGlobalCouponAction } from "src/store/actions/GetGlobalCouponAction";
import { useDispatch, useSelector } from "../../store";
import { getHomeSellerDashboardAction } from "src/store/actions/GetHomeSellerDashboardAction";
import Billing from "./billing/Billing"

const HomeDashboard = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');

  useEffect(() => {
    dispatch(getHomeSellerDashboardAction());
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(getGlobalCouponAction(null, null, null, null, null)).then(res => {
      if (res?.data?.status) {
        setUpdateMsg(res?.data?.message)
      } else {
        setUpdateMsg(res);
      }
      setLoading(false);
    })
  }, []);
  
  const sellerDashbaordList = useSelector(
    (state: any) =>
      state?.GetHomeSellerDashboard?.getHomeSellerDashboardResponse?.data
  );

  return (
           <Container style={{ paddingTop: "25px" }}>
            <HeadingBox loading={loading} updateMsg={updateMsg} />
           {sellerDashbaordList?.targetData ? <GraphBox targetData={sellerDashbaordList?.targetData || ""} /> : <CircularProgress />} 
            <StatsBox cardData={sellerDashbaordList?.cardData || ""} />
            <RangeBox cashData={sellerDashbaordList?.cashData || ""} />
            <RecentUseAmount />
            {/* <Billing /> */}
            </Container>
    );
  };

export default HomeDashboard;
