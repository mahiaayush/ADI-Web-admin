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
import { getCollageMaster, deleteCollageMaster, exportCollegeMaster, exportCollegeMasterAll, importCollegeMaster } from '../../store/actions/getCollegeMasterAction';
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import ConfirmDelete from "../Override/ConfirmDelete";
import AddCollageMaster from "./correction-popup/AddCollageMaster";
import toast from "react-hot-toast";
import styled from "@material-ui/styled-engine";
import { DELETE_COLLEGE, EXPORT_COLLEGE, EXPORT_COLLEGE_ALL, IMPORT_COLLEGE, PUT_COLLEGE_LIST } from "src/store/RbacConstants";

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
interface CollageMaster {
  EntityclgId: number;
  EntityId: string;
  EntityName: string;
  EntityAbout: string;
  EntitysubtypeId: number;
  EntityEstd: number;
  EntityEmail: string;
  EntityPhone: string;
  AffiliationId: number;
  EntityLatlon: string;
  WSOption: string;
  WSEPH: number;
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

export const CollegeCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const [messageObj, setMessage] = useState(initMsg)
  const [AddCollegeMaster, setAddCollegeMaster] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [EntityclgId, setEntityclgId] = useState(0);

  let msgType: Color = 'success';
  
  const displayMessage = (msgobj: { type: Color, message: string }) => {
    setIsMessage(true);
    setMessage(msgobj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteCollageMaster(EntityclgId));
    if (error) {
      msgType = 'error';
    }
    dispatch(getCollageMaster(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportCollegeMasterAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportCollegeMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCollageMaster(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const CollegeData = useSelector(
    (state: any) => state?.getCollege?.collegeMasterResponse?.data
  )
  /**
     * GET ALL ALLOWED API List
     */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createCollagePopup = (EntityclgId: number = 0) => {
    setEntityclgId(EntityclgId)
    setAddCollegeMaster(!AddCollegeMaster);
  }
  const ActionHandler = (row: CollageMaster) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COLLEGE_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => createCollagePopup(row?.EntityclgId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COLLEGE).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setEntityclgId(row?.EntityclgId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }
  const EntityNameToolTip = (row: CollageMaster) => {
    return <CustomWidthTooltip title={row?.EntityName}><Button sx={{ m: 1 }}>{row?.EntityName?.slice(0, 25)}</Button></CustomWidthTooltip>
  }
  const copyFieldsData = (EntityAbout: string) => {
    navigator.clipboard.writeText(EntityAbout);
  }
  const EntityAboutToolTip = (row: CollageMaster) => {
    return <CustomWidthTooltip title={row?.EntityAbout}>
      <Button onClick={(e) => copyFieldsData(row?.EntityAbout)} sx={{ m: 1 }}>{row?.EntityAbout.slice(0, 20)}</Button></CustomWidthTooltip>
  }

  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const columns = useMemo(
    () => [
      {
        Header: "ClgId",
        accessor: "EntityclgId",
        width: 30,
      },
      {
        Header: "EntityName",
        accessor: EntityNameToolTip,
        width: 80,
      },
      {
        Header: "Sub-type",
        accessor: "EntitysubtypeName",
        width: 40
      }, 
      {
        Header: "Affilition",
        accessor: "AffiliationTitle",
        width: 40
      },
      {
        Header: "En.ESTD.",
        accessor: "EntityEstd",
        width: 40
      },
      {
        Header: "En.Email",
        accessor: "EntityEmail",
        width: 80
      },
      {
        Header: "En.Phone",
        accessor: "EntityPhone",
        width: 50
      },
      {
        Header: "En.WSOption",
        accessor: "WSOption",
        width: 50
      },
      {
        Header: "En.WSEPH",
        accessor: "WSEPH",
        width: 50
      },
      {
        Header: "Map Dimensions.",
        accessor: "EntityLatlon",
        width: 80
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 40
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
          {AddCollegeMaster && <AddCollageMaster openImport={AddCollegeMaster} setOpenImport={setAddCollegeMaster} EntityclgId={EntityclgId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCollegeMaster} refresh={getCollageMaster(page + 1, limit)} popupTitle="Import College Master" />
          <Typography color="textPrimary" variant="h5">
            College Master
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COLLEGE).length > 0)
              && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
              {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COLLEGE).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
              {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COLLEGE_ALL).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COLLEGE).length > 0)
              && <Button onClick={() => createCollagePopup()}>Add College</Button>}
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
              {CollegeData && CollegeData?.rows && CollegeData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={CollegeData?.rows}
                    totalCount={CollegeData?.count}
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