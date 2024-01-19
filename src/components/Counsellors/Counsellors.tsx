import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Select,
  MenuItem,
  Tab,
  Tabs,
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Box,
  Card,
  Button,
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "../../store";
import { selectedCounsellorList } from "../../store/actions/SelectedCounsellorListAction";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import CounsellorInfo from "./CounsellorInfo";
import { Star, StarBorder } from "@material-ui/icons";
import { getLocalTime } from "src/utils/utility";

const tabs = [
  {
    label: "All",
    value: "all",
  },
  // {
  //   label: "Pathway",
  //   value: "PATHWAY",
  // },
  // {
  //   label: "Pursuit",
  //   value: "PURSUIT",
  // },
  // {
  //   label: "Ignitor",
  //   value: "IGNITOR",
  // },
];

const useStyles = makeStyles({
  topheader: {
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
  BusinessStatus: string;
  OnboardedDate: Date;
  Status: string;
  PayrollName: string;
}

const Counsellor = ({ newUsers = 0 }) => {
  const dispatch = useDispatch();
  const { counsellors } = useSelector((state) => state.SelectedCounsellorList);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLimit, setInitialLimit] = useState(60);
  const [search, setSearch] = useState("");
  const [initialSearch, setInitialSearch] = useState("");
  const [filter, setFilter] = useState("Weekly");
  const [newest, setNewest] = useState("Newest");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [plan, setPlan] = useState(null);
  const [sortBy, setSortBy] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      selectedCounsellorList(
        filter,
        newest,
        plan,
        search,
        page + 1,
        limit,
        sortBy?.[0]?.id,
        sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'desc' : 'asc'
      )
    ).then(() => setIsLoading(false));
  }, [page, search, filter, newest, limit, sortBy]);

  const navigate = useNavigate();

  const FullName = (row: UserObject) => {
    return (
      <Button
        size="small"
        type="button"
        variant="outlined"
        color="primary"
        onClick={() => {
          window.location.href = `/details/${row.UserSid}`;
        }}
        className="nameIcon"
      >
        {row.BusinessStatus === "INDIVIDUAL" ? <PersonIcon /> : <BusinessIcon />}{row.Name}
      </Button>
    );
  };

  const PayrollName = (row: UserObject) => {
    return (
      <span>{row.PayrollName === "IH" ? "In-House" : row.PayrollName === "AP" ? "Actual Payout" : row.PayrollName}</span>
    )
  }

  const CounsellorStatus = (row: UserObject) => {
    return (
      <span className={`${row.Status === "A" ? "status_badge status_badge_active" : row.Status === "I" ? "status_badge status_badge_inactive" : "status_badge status_badge_banned"}`}>{row.Status === "A" ? "Active" : row.Status === "I" ? "In-Active" : "Terminate"}</span>
    )
  }

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: FullName,
      },
      {
        Header: "Payout Type",
        accessor: PayrollName,
        id: "PayrollName",
        width: 200
      },
      {
        Header: "Days",
        accessor: "WorkingDay",
        id: "WorkingDay",
        width: 100
      },
      {
        Header: "Min-Sessions",
        accessor: "MinSessionPerDay",
        id: "MinSessionPerDay",
        width: 100
      },
      {
        Header: "No. of Slots",
        accessor: "NoOfSlotsAvailable",
        id: "NoOfSlotsAvailable",
        width: 100
      },
      {
        Header: "Sessions Completed",
        accessor: "NoOfCompletedSession",
        id: "NoOfCompletedSession",
        width: 100
      },
      {
        Header: "Utilization",
        accessor: "Utilization",
        id: "Utilization",
        width: 100
      },
      {
        Header: "Unused-Session",
        accessor: "UnusedSession",
        id: "UnusedSession",
        width: 100
      },
      {
        Header: "Void Bill Count",
        accessor: "VoidBillCount",
        id: "VoidBillCount",
        width: 100
      },
      {
        Header: "Status",
        accessor: CounsellorStatus,
        disableSortBy: true
      },
    ],
    []
  );

  const classes = useStyles();
  return (
    <div>
      <Container className="userIndex">
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
            Counsellors
          </Typography>
        </Grid>
        {/* <CounsellorInfo /> */}
        <Box sx={{ mt: 3 }}>
          {/* <div className="import_export_div d-flex align-items-end">
                        <FileUpload
                            color="primary"
                            fontSize="small"
                        /><a href="#" className="file_import_export">Import</a>
                        <FileDownload
                            color="primary"
                            fontSize="small"
                        /><a href="#" className="file_import_export">Export</a>
                    </div> */}
          <Card>
            {/* <Tabs
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
                  className={
                    activeTab === ind ? classes.active : classes.tabbing
                  }
                  onClick={() =>
                    activeTab !== ind && tabHandler(tab.value, ind)}
                />
              ))}
            </Tabs> */}
            <Grid item className="counsellorApplicationListTable filterdataContner">

              <EnhancedTable
                columns={columns}
                data={counsellors.list}
                totalCount={counsellors.count}
                isLoading={isLoading}
                manualGlobalFilter={true}
                select={true}
                search={search}
                setSearch={setSearch}
                setFilter={setFilter}
                filter={filter}
                setNewest={setNewest}
                newest={newest}
                limit={limit}
                setLimit={setLimit}
                currentPage={page}
                setPage={setPage}
                manualPagination={true}
                manualSortBy={true}
                sortedBy={sortBy}
                setSortedBy={setSortBy}
              />
            </Grid>
          </Card>
        </Box>
      </Container>
    </div>
  );
};
export default Counsellor;
