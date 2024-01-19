import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  Button,
  Alert
} from "@material-ui/core";
import Tooltip, { TooltipProps, tooltipClasses } from '@material-ui/core/Tooltip';

import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "src/store";
import { useEffect, useState, useMemo } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import FileDownload from "@material-ui/icons/FileDownload";
import PlaceIcon from '@material-ui/icons/Place';
import { EditSharp, DeleteOutline, FileUpload } from "@material-ui/icons";
import ConfirmDelete from "../Override/ConfirmDelete";
import toast from "react-hot-toast";
import styled from "@material-ui/styled-engine";
import AddApis from "./Addapis";
import { deleteApiMaster, getApiMaster } from "src/store/actions/ApiAction";
import { PUT_SYSTEM_APIS, DELETE_SYSTEM_APIS, POST_SYSTEM_APIS } from "src/store/RbacConstants";

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
  },
  tfoottop: {
    "& table": {
      "& tfoot": {
        position: "absolute",
        top: "0px",
        right: "0px"
      }
    }
  }
});

export type Color = 'success' | 'info' | 'warning' | 'error';
interface ApiMaster {
  id: number;
  routeId: string;
  apiEndpoint: string;
  method: string;
  apiKey: number;
  apiDesc: number;
  status: string;
}
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});
const initMsg: { type: Color, message: string } = {
  type: 'success',
  message: ''
}

export const ApisList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const [messageObj, setMessage] = useState(initMsg)
  const [addApi, setAddApi] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [id, setId] = useState(0);

  let msgType: Color = 'success';
  
  const displayMessage = (msgobj: { type: Color, message: string }) => {
    setIsMessage(true);
    setMessage(msgobj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteApiMaster(id));
    if (error) {
      msgType = 'error';
    }
    dispatch(getApiMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message });
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getApiMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const apiData = useSelector(
    (state: any) => state?.getApiMaster?.apiMasterResponse?.data
  )
  /**
    * GET ALL ALLOWED API List
    */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createApiPopup = (id: number = 0) => {
    setId(id)
    setAddApi(!addApi);
  }
  const ActionHandler = (row: ApiMaster) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_SYSTEM_APIS).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => createApiPopup(row?.id)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_SYSTEM_APIS).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setId(row?.id); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        width: 10,
      },
      {
        Header: "RouteId",
        accessor: "routeId",
        disableSortBy: true,
        width: 10,
      },
      {
        Header: "Method",
        accessor: "method",
        disableSortBy: true,
        width: 15
      }, 
      {
        Header: "ApiKey",
        disableSortBy: true,
        accessor: "apiKey",
        width: 20
      },
      {
        Header: "Endpoint",
        accessor: "apiEndpoint",
        disableSortBy: true,
        width: 50
      },
      {
        Header: "Desc",
        accessor: "apiDesc",
        disableSortBy: true,
        width: 40
      },
      {
        Header: "Status",
        accessor: "status",
        disableSortBy: true,
        width: 10
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 10
      }
    ],
    [roleAllowedApis]
  );

  return (
    <div>
      <Container className="userIndex">
        {confirmDialog && (
          <ConfirmDelete
            open={confirmDialog}
            onClose={() => setConfirmDialog(false)}
            onSubmit={() => handleDelete()}
          />
        )}
        <Grid item xs={12} position="relative" className={classes.topheader}>
          {addApi && <AddApis openImport={addApi} setOpenImport={setAddApi} id={id} search={search} pageNo={page} limit={limit} />}
          <Typography color="textPrimary" variant="h5">
            Api List
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
                &nbsp;
              </div>
            </Grid>
            <Grid item>
              <div>
              {console.log("SAVE", roleAllowedApis.filter(itm => itm.apiKey === POST_SYSTEM_APIS))}
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_SYSTEM_APIS).length > 0)
              && <Button onClick={() => createApiPopup()}>Add API</Button>}
              </div>
            </Grid>
          </Grid>
          {isMessage && (
            <Alert severity={messageObj.type}>
              {messageObj?.message}<strong>!</strong>
            </Alert>)}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {apiData && apiData?.rows && apiData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={apiData?.rows}
                    totalCount={apiData?.count}
                    limit={limit}
                    currentPage={page}
                    setPage={setPage}
                    setLimit={setLimit}
                    sortedBy={sortBy}
                    setSortedBy={setSortBy}
                    search={search}
                    setSearch={setSearch}
                    searchFilters={filters}
                    setFilters={setFilters}
                    manualPagination={true}
                    manualGlobalFilter={true}
                    manualSortBy={true}
                  />
                </div>
              )}
            </Grid>
          </Card>
        </Box>
      </Container>
    </div>
  )
}