import { useState, useEffect, useMemo } from "react";
import type { FC } from "react";
import { debounce } from 'lodash';
import { useDispatch, useSelector } from "../../store";
import {
  Container,
  Divider,
  Box,
  Grid,
  Card,
  Tabs,
  Tab,
  Typography,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import TransactionTable from "./TransactionTable";
import Search from "@material-ui/icons/Search";

import { GetSalesTransactionActionList } from "src/store/actions/GetSalesTransactionAction";
import { debounceDelay } from 'src/utils/constants';

const TransactionHistory: FC = (props) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentmode, setPaymentmode] = useState(null);
  const [status, setStatus] = useState(null);

  const tabsList = [
    { id: 1, value: "All", label: "All", hash: "all" },
    { id: 2, value: "CH", label: "Cash", hash: "cash" },
    { id: 3, value: "C", label: "Cheque", hash: "cheque" },
    { id: 4, value: "DD", label: "DD", hash: "dd" },
  ];
  const { hash } = window.location;

  useEffect(() => {
    let pmode;
    if (hash === "#all" || hash === "") {
      pmode = "All"
    }
    if (hash === "#cash") {
      pmode = "CH"
    }
    if (hash === "#cheque") {
      pmode = "C"
    }
    if (hash === "#dd") {
      pmode = "DD"
    }
    setLoading(true);
    dispatch(
      GetSalesTransactionActionList(paymentmode === "All" ? null : pmode === "All" ? null : pmode, search, limit, page + 1, status)
    ).then(() => setLoading(false));
  }, [paymentmode, search, limit, page, status]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = useMemo(() =>
    debounce((searchText) => {
      setSearch(searchText);
      setPage(0);
    }, debounceDelay),
  []);

  const salesTransactionListData = useSelector(
    (state: any) => state?.salesTransaction?.salesTransactionList?.list
  );

  const salesTransactionListCount = useSelector(
    (state: any) => state?.salesTransaction?.salesTransactionList?.count
  );

  useEffect(() => {
      if (hash && hash === "#cash") {
        setActiveTab(2);
      } else if (hash && hash === "#cheque") {
        setActiveTab(3);
      } else if (hash && hash === "#dd") {
        setActiveTab(4);
      } else {
        setActiveTab(1);
      }
  }, [])

  return (
    <Container className="userIndex">
      <Grid item xs={12} position="relative" sx={{ pt: 2 }}>
        <Typography color="textPrimary" variant="h5">
          Transaction History
        </Typography>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <Card {...props}>
          <Tabs
            indicatorColor="primary"
            scrollButtons="auto"
            textColor="primary"
            value={tabsList.find((item) => item.id === activeTab)?.value || 1}
            variant="scrollable"
          >
            {tabsList.map((tab) => (
              <Tab
                key={tab.id}
                label={tab.label}
                value={tab.value}
                onClick={() => { setActiveTab(tab.id); setPaymentmode(tab.value); window.history.pushState(null, null, `#${tab.hash}`); }}
              />
            ))}
          </Tabs>
          <Divider />
          <TextField
            style={{ display: "none" }}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
            placeholder="Search"
            size="small"
            sx={{ m: 1 }}
          />
          <Divider />
          <TransactionTable
            activeTab={activeTab}
            transactions={salesTransactionListData}
            salesTransactionListCount={salesTransactionListCount}
            page={page}
            limit={limit}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            loading={loading}
          />
        </Card>
      </Box>
    </Container>
  );
};

export default TransactionHistory;
