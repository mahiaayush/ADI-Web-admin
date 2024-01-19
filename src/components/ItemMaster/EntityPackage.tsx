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
import getEntityPackageAction from "src/store/actions/entityPackageAction";
import AddCircleOutlineSharp from '@material-ui/icons/AddCircleOutlineSharp';
import AddItem from "./AddItem";
import ItemMap from "./ItemMap";
import type { ChangeEvent } from 'react';

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
    EntityName: string;
    Status: string;
    TransactionId: string;
    TotalSeats: number;
    UnUsedSeats: number;
    UsedSeats: number;
    ZohoPlanId: string;
    StartDate: Date;
    EndDate: Date;
  }

const EntityPackage = () => {
    const [addDialog, setAddDialog] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const [itemId, setItemId] = useState<number>();
    const classes = useStyles();
    const dispatch = useDispatch();   

    useEffect(() => {
      dispatch(getEntityPackageAction())
    }, [open])

    useEffect(() => {
      dispatch(getEntityPackageAction())
  }, [])

    const entityPackageAction = useSelector(
        state => state?.EntityPackage?.getEntityPackageResponse?.data
    );
    // console.log(entityPackageAction)

      const Status = (row: UserObject) => {
        return (
          <span className={`${row.Status === "A" ? "status_badge status_badge_active" : row.Status === "I" ? "status_badge status_badge_inactive" : "status_badge status_badge_banned"}`}>{row.Status === "A" ? "Active" : "Inactive"}</span>
        )
      }

    // const ViewLink = (row: UserObject) => {
    //     return (
    //       <Button
    //           style={{
    //             border: "1px solid blue",
    //             backgroundColor: "#FFFFFF",
    //             fontSize: "14px",
    //             textDecoration: 'none'
    //         }}
    //           size="small"
    //           type="button"
    //           variant="outlined"
    //           color="primary"
    //           disabled={row.ItemId === null}
    //           onClick={() => {
    //             setOpen(true)
    //             setItemId(row.ItemId)
    //           }}
    //       >

    //   Add Entity
    // </Button>  
          
    //     );
    //   };

    const columns = useMemo(
        () => [
          {
            Header: "Entity Name",
            accessor: 'EntityName',
          },
          {
            Header: "TransactionID",
            accessor: 'TransactionId',
          },
          {
            Header: "Plan Name",
            accessor: 'ZohoPlanId',
          },
          {
            Header: "Total Seats",
            accessor: 'TotalSeats',
          },
          {
            Header: "Unused Seats",
            accessor: 'UnUsedSeats',
          },
          {
            Header: "Used Seats",
            accessor: 'UsedSeats',
          },
          {
            Header: "Start Date",
            accessor: 'StartDate',
          },
          {
            Header: "End Date",
            accessor: 'EndDate',
          },
          {
            Header: "Status",
            accessor: Status,
          },
        
        ],
        []
      );

    return (
      <div>
        <Container className="userIndex">
          <Grid item xs={12} position="relative" className={classes.topheader}>
            <Typography color="textPrimary" variant="h5">
            Entity Package List
            </Typography> 
            <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/counselling-dashboard"
                variant="subtitle2"
              >
                Counselling Dashboard
              </Link>
              <Typography
                color="textSecondary"
                variant="subtitle2"
                style={{ cursor: "pointer" }}
              >
                Items
              </Typography>
            </Breadcrumbs>
            <Tooltip title="Add" className={classes.usertooltip}>
              <IconButton
                aria-label="add"
                size="small"
                onClick={() => setOpen(true)}
              >
                <AddCircleOutlineSharp color="primary" fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Card>
              <Grid
                item
                className="counsellorApplicationListTable filterdataContner"
              >
                {entityPackageAction && (
                  <EnhancedTable
                    columns={columns}
                    data={entityPackageAction}
                    totalCount={entityPackageAction?.length}
                    //   isLoading={isLoading}
                    //   manualGlobalFilter={true}
                    //   singleStep={true}
                    //   search={search}
                    //   setSearch={setSearch}
                    //   limit={limit}
                    //   setLimit={setLimit}
                    //   currentPage={page}
                    //   setPage={setPage}
                    //   rating={rating}
                    //   setRating={setRating}
                    //   manualPagination={true}
                    //   setStartDate={setStartDate}
                    //   setEndDate={setEndDate}
                  />
                )}
              </Grid>
              {/* {addDialog && (
                <AddItem addDialog={addDialog} setAddDialog={setAddDialog} />
              )} */}
            </Card>
          </Box>
        </Container>
      </div>
    );
}

export default EntityPackage;