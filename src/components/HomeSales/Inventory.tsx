import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableFooter,
  TablePagination,
  TextField,
  Divider,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
  TableContainer,
} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import styles from "./HomeComponent/RecentUseAmount/RecentUseAmount.module.css";
import {
  changeInventoryStatus,
  getInventoryList,
} from "../../store/actions/inventoryAction";
import { useDispatch, useSelector } from "../../store";
import { debounce } from "lodash";
import { debounceDelay } from "src/utils/constants";
import { Edit, ArrowBackIosNew } from "@material-ui/icons";
import { useNavigate } from "react-router";

const Inventory = () => {
  const filterOptions = [
    { name: "All", value: "all" },
    { name: "Active", value: "A" },
    { name: "In-Active", value: "I" },
    { name: "Blocked", value: "B" },
    { name: "Lost", value: "L" },
    { name: "Damaged", value: "D" },
    { name: "Didn't Received", value: "DR" },
  ];
  const CardAction = [
    { key: "Card Lost", value: "L" },
    {
      key: "Damaged",
      value: "D",
    },
    {
      key: "Didn’t received",
      value: "DR",
    },
  ];
  const initialState = {
    inventoryId: null,
    cardNumber: null
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDailog, setOpenDailog] = useState(false);
  const [current, setCurrent] = useState(null);
  const [currentData, setCurrentData] = useState(initialState);
  const [remark, setRemark] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, membershipId, cardDigit) => {
    // if (CardStatus === "I")
    setCurrentData({
      inventoryId: membershipId,
      cardNumber: cardDigit
    })
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDailog = () => {
    setOpenDailog(false);
    setCurrent(null);
    setCurrentData(initialState)
    setRemark("");
    setMsg("");
    handleClose();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (filter === "all") {
      dispatch(getInventoryList(page + 1, limit, search, null));
    } else {
      dispatch(getInventoryList(page + 1, limit, search, filter));
    }
  }, [page, limit, filter, search]);

  const TableHeader = [
    "Card Number",
    "Lot Number",
    "Card Serial",
    "Membership ID",
    "Status",
    "Action"
  ];

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

  const handleSelect = (e) => {
    setFilter(e.target.value);
  };

  const menuSelectHandler = (active) => {
    setCurrent(active);
    setOpenDailog(true);
  };

  const changeStatus = () => {
    setLoading(true);
    const data = {
      InventoryStatus: CardAction[current]?.value,
      InventoryRemark: remark,
    };
    if (remark.trim().length > 5) {
      dispatch(changeInventoryStatus(data, currentData?.inventoryId)).then(
        (res) => {
          if (res?.data?.status) {
            setMsg(res?.data?.data);
            setTimeout(handleCloseDailog, 1000);
            if (filter === "all") {
              dispatch(getInventoryList(page + 1, limit, search, null));
            } else {
              dispatch(getInventoryList(page + 1, limit, search, filter));
            }
          } else {
            setMsg(res);
          }
          setLoading(false);
        }
      );
    } else {
      setMsg("Please write the reason.");
    }
  };

  const handleSearch = useMemo(
    () =>
      debounce((searchText) => {
        setSearch(searchText);
        setPage(0);
      }, debounceDelay),
    []
  );

  const inventoryListData = useSelector(
    (state: any) => state?.inventory?.inventories?.list
  );

  const Status = useSelector(
    (state: any) => state?.inventory?.inventoryStatusResponse?.success
  );

  const inventoryCount = useSelector(
    (state: any) => state?.inventory?.inventories?.count
  );

  return (
    <Container style={{ paddingTop: "25px" }}>
      <Link
        component="button"
        color="textPrimary"
        variant="subtitle2"
        style={{ display: "flex" }}
        onClick={() => navigate(-1)}
      >
        <ArrowBackIosNew /> BACK
      </Link>

      <Card className={styles.recentUseAmountdv}>
        <Grid
          alignItems="center"
          container
          justifyContent="space-between"
          spacing={3}
          item
          xs={12}
        >
          <Grid item>
            <Typography color="textPrimary" variant="h5">
              Inventory
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 3,
            pb: 3,
          }}
        >
          <Divider />
          <div className={styles.wrapper}>
            <TextField
              onChange={(e) => {
                handleSearch(e.target.value.trim());
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
              placeholder="Card Lot/ Serial/ Number"
              size="medium"
              sx={{ m: 1 }}
              style={{ maxWidth: 350 }}
              fullWidth
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter"
              onChange={handleSelect}
            >
              {filterOptions?.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <Divider />
          <TableContainer>
            <Table className={styles.recentTable}>
              <TableHead>
                <TableRow>
                  {TableHeader?.map((item, id) => (
                    <TableCell key={id.toString()}>
                      <Typography
                        align="left"
                        color="textSecondary"
                        variant="subtitle2"
                      >
                        {item}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryListData?.length > 0 ? (
                  inventoryListData?.map((inv, id) => (
                    <TableRow
                      key={id.toString()}
                      sx={{
                        "&:last-child td": {
                          border: 0,
                        },
                      }}
                    >
                      {/* <TableCell className={styles.rectdimg} width={100}>
                                        <Typography
                                            align="left"
                                            color="textSecondary"
                                            variant="subtitle2"
                                            className={styles.avatarIconOuterBox}
                                        >
                                            <cite><img src={cardIcon} alt="" /></cite>
                                        </Typography>
                                    </TableCell> */}

                      {/* <TableCell>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                            >
                                CSMP
                            </Typography>
                        </TableCell> */}
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="subtitle2"
                          align="left"
                        >
                          {inv.CardDigit}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                          align="left"
                        >
                          {inv.CardLot}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" align="left">
                          {inv.CardSerial}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography align="left" variant="body2">
                          {inv.CsMembershipId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography align="left" variant="body2">
                          {inv.CardStatus === "A" && "Active"}
                          {inv.CardStatus === "I" && "In-Active"}
                          {inv.CardStatus === "B" && "Blocked"}
                          {inv.CardStatus === "L" && "Lost"}
                          {inv.CardStatus === "D" && "Damaged"}
                          {inv.CardStatus === "DR" && "Didn't Received"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          aria-controls={
                            open ? "demo-positioned-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(e) => handleClick(e, inv.CsMembershipId, inv.CardDigit)}
                          // disabled={inv.CardStatus !== "I"}
                          style={{ textAlign: "left" }}
                        >
                          <Edit />
                        </Button>
                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          {CardAction?.map((item, idx) => (
                            <MenuItem
                              key={idx.toString()}
                              onClick={() =>
                                menuSelectHandler(idx)}
                            >
                              {item.key}
                            </MenuItem>
                          ))}
                        </Menu>
                        </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    {" "}
                    <TableCell colSpan={5} style={{ textAlign: "center" }}>
                      <h3>No Data Found!</h3>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TablePagination
                  count={inventoryCount}
                  page={page}
                  colSpan={6}
                  onPageChange={handleChangePage}
                  rowsPerPage={limit}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Card>
      <Dialog open={openDailog} onClose={handleCloseDailog}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark the card (<b>{currentData?.cardNumber}</b>) as{" "}
            {CardAction?.[current]?.key}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Reason"
            type="text"
            fullWidth
            variant="standard"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </DialogContent>
        {
        msg !== "" 
        && <p className={Status ? "success" : "error"}>{msg}</p>
        }
        <DialogActions>
          <Button
            onClick={() => handleCloseDailog()}
          >
            Cancel
          </Button>
          <Button onClick={changeStatus} disabled={remark?.trim()?.length < 5 || loading}>{loading ? "Processing" : "Confirm"}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Inventory;
