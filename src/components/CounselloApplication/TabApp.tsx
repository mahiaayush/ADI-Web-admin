import { Button, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../store";
import { selectedCounsellorList } from "../../store/actions/SelectedCounsellorListAction";
import { useMemo, useState, useEffect } from "react";
import DetailScreen from "./DetailScreen";
import ProfileDetails from "./ProfileDetails";
import AvailabilityScreen from "./AvailabilityScreen"
import { GET_CSC_AVAILABILITY, GET_CSC_DETAILS } from "src/store/RbacConstants";

const tabs = [
  {
    label: "Detail",
    value: "Detail",
  },
  {
    label: "Availability",
    value: "Availability",
  }
];

const useStyles = makeStyles({
  topheader: {
    marginTop: "16x",
    paddingTop: "16px",
    position: "relative",
  },
  tablebackground: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "4px",
    position: "relative",
    boxShdow: "0px 1px 2px #ddd",
    marginTop: "24px",
  },
  tableTab: {
    width: "100%",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
    background: "#fff",
    // paddingTop: "20px",
    marginTop: "16px",
  },
  tabbing: {
    borderBottom: "2px solid #fff",
  },
  active: {
    borderBottom: "2px solid #5664d2",
    color: "#5664d2",
  },
  usertooltip: {
    position: "absolute",
    right: "0px",
    top: "16px",
  },
});

interface UserObject {
  UserSid: string;
  Name: string;
}
const TabApp = ({ popupText, displayMsg, displayBtn, loading }) => {
  const dispatch = useDispatch();
  // const { counsellors } = useSelector((state) => state.SelectedCounsellorList);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [counsellorAvailability, setCounsellorAvailability] = useState(false);
  const [counsellorDetails, setCounsellorDetails] = useState(true);
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabHandler = (type, id: number) => {
    if (id === 0) {
      setCounsellorDetails(true);
        setCounsellorAvailability(false)
    }
    if (id === 1) {
      setCounsellorDetails(false);
        setCounsellorAvailability(true)
    }
    setActiveTab(id);
  };
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const disabledTab = (tab: string) => {
      if (tab === 'Detail' && roleAllowedApis.filter(itm => itm?.apiKey === GET_CSC_DETAILS).length > 0) {
          return false
      } 
      if (tab === 'Availability' && roleAllowedApis.filter(itm => itm?.apiKey === GET_CSC_AVAILABILITY).length > 0) {
          return false
      } 
      return true;
  }
  const classes = useStyles();

  return (
    <div>
      <Tabs
        className={classes.tableTab}
        indicatorColor="primary"
        scrollButtons="auto"
        textColor="primary"
        value={tabs[activeTab].value}
        variant="scrollable"
      >
        {tabs.map((tab, ind) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            className={activeTab === ind ? classes.active : classes.tabbing}
            onClick={() => tabHandler(tab.value, ind)}
          />
        ))}
      </Tabs>

      <div className="custome-data">
        <AvailabilityScreen availability={counsellorAvailability} />
        <ProfileDetails counsellorDetails={counsellorDetails} popupText={popupText} displayMsg={displayMsg} displayBtn={displayBtn} loading={loading} />      
      </div>
    </div>
  );
};
export default TabApp;
