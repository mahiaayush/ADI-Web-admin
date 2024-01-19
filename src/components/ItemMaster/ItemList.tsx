import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Box,
  Card,
  Tooltip,
    IconButton,
    Button,
    TextField
} from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from "@material-ui/core/styles";
import { useMemo, useState, useEffect } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { RootStateOrAny } from "react-redux";
import { useDispatch, useSelector } from "../../store";
import GetEntityItemMasterAction from "src/store/actions/EntitiesItemMasterAction";
import AddCircleOutlineSharp from '@material-ui/icons/AddCircleOutlineSharp';
import AddItem from "./AddItem";
import ItemMap from "./ItemMap";
import type { ChangeEvent } from 'react';
import { CREATE_ITEM } from "src/store/RbacConstants";

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
    clickable: {
      cursor: "pointer",
      background: "transparent",
      textDecoration: "none !important",
      textAlign: "left",
      fontSize: "14px",
      textTransform: "capitalize",
      padding: "0"
    }
  });

  interface UserObject {
    ItemName: string;
    Status: string;
    ItemId: number;
    CostPrice: number;
    AssociatedEntities: object;
    ZohoItemId: string;
  }

const ItemList = () => {
    const [addDialog, setAddDialog] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const [itemId, setItemId] = useState<number>();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();   
    let UniqueStatus = new Set();

    // useEffect(() => {
    //   dispatch(GetEntityItemMasterAction(search, 1, limit));
    // }, []);

    useEffect(() => {
    setIsLoading(true);
    dispatch(
      GetEntityItemMasterAction(
        search,
        page + 1,
        limit,
        sortBy?.[0]?.id,
        sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'desc' : 'asc'
      )
    ).then(() => setIsLoading(false));
  }, [page, search, limit, sortBy]);
 
    const enityitemmaster = useSelector(
        (state:any) => state?.EntityItemMaster?.getEntityItemMasterResponse?.data?.data?.ItemsData
    );
    const allStatus = enityitemmaster?.map(item => item.Status)
     UniqueStatus = new Set(allStatus)
    // console.log(enityitemmaster)
        const entityMasterFound = useSelector(
          (state:any) => state?.EntityItemMaster?.getEntityItemMasterResponse?.data?.data?.found
      );
      /**
      * GET ALL ALLOWED API List
      */
      const roleAllowedApis = useSelector(
        (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
      )
      const Status = (row: UserObject) => {
        return (
          <span className={`${row.Status === "A" ? "status_badge status_badge_active" : row.Status === "I" ? "status_badge status_badge_inactive" : "status_badge status_badge_banned"}`}>{row.Status === "A" ? "Active" : "Inactive"}</span>
        )
      }

    const columns = useMemo(
        () => [
          {
            Header: "Item Name",
            accessor: "ItemName",
          },
          {
            Header: "Price",
            accessor: "CostPrice",
            width: 100
          },
          {
            Header: "Zoho Item ID",
            accessor: "ZohoItemId",
            width: 200
          },
          {
            Header: "Status", 
            accessor: Status,
            disableSortBy: UniqueStatus.size === 1,
            width: 100
          },
        ],
        [UniqueStatus, roleAllowedApis]
      );

    return (
      <div>
        <Container className="userIndex">
          <Grid item xs={12} position="relative" className={classes.topheader}>
            <Typography color="textPrimary" variant="h5">
              Item List
            </Typography>
            {(roleAllowedApis.filter(itm => itm.apiKey === CREATE_ITEM).length > 0)
            && <Tooltip title="Add" className={classes.usertooltip}>
              <IconButton
                aria-label="add"
                size="small"
                onClick={() => setAddDialog(true)}
              >
                <AddCircleOutlineSharp color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>}
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Card>
              <Grid
                item
                className="counsellorApplicationListTable filterdataContner"
              >
                {enityitemmaster && enityitemmaster.length > 0 ? (
                  <div className="itemListSorting">
                  <EnhancedTable
                    columns={columns}
                    data={enityitemmaster}
                    totalCount={entityMasterFound}
                    isLoading={isLoading}
                    manualGlobalFilter={true}
                      // singleStep={true}
                    search={search}
                    setSearch={setSearch}
                    limit={limit}
                    setLimit={setLimit}
                    sortedBy={sortBy}
                    setSortedBy={setSortBy}
                    currentPage={page}
                    setPage={setPage}
                    //   rating={rating}
                    //   setRating={setRating}
                    manualPagination={true}
                    //   setStartDate={setStartDate}
                    //   setEndDate={setEndDate}
                    manualSortBy={true}
                  />
                  </div>
                ) : (
                  <div className="itemListSorting">
                  <EnhancedTable
                    columns={columns}
                    data={[]}
                    totalCount={0}
                    isLoading={isLoading}
                    manualGlobalFilter={true}
                    //   singleStep={true}
                    search={search}
                    setSearch={setSearch}
                    limit={limit}
                    setLimit={setLimit}
                    currentPage={page}
                    setPage={setPage}
                    //   rating={rating}
                    //   setRating={setRating}
                    // manualPagination={true}
                    //   setStartDate={setStartDate}
                    //   setEndDate={setEndDate}
                    manualSortBy={true}
                  />
                  </div>
                )}
              </Grid>
              {addDialog && (
                <AddItem addDialog={addDialog} setAddDialog={setAddDialog} />
              )}
            </Card>
            {/* <ItemMap
              openPopupItemMap={open}
              setOpenPopupItemMap={setOpen}
              itemId={itemId}
            /> */}
          </Box>
        </Container>
      </div>
    );
}

export default ItemList;