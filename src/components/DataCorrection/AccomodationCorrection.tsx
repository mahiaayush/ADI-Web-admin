import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  Button,
  Alert
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "src/store";
import { useEffect, useState, useMemo } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import FileDownload from "@material-ui/icons/FileDownload";
import { EditSharp, DeleteOutline, FileUpload } from "@material-ui/icons";
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import ConfirmDelete from "../Override/ConfirmDelete";
import AddAccomodationPopup from "./correction-popup/AddAccomodationPopup";
import toast from "react-hot-toast";
import { deleteAccomodation, exportAccomodation, exportAccomodationAll, getAccomodation, importAccomodation } from "src/store/actions/AccomodationAction";
import Tooltip, { TooltipProps, tooltipClasses } from '@material-ui/core/Tooltip';
import styled from "@emotion/styled";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { PUT_ACCOMODATION_LIST, DELETE_ACCOMODATION, IMPORT_ACCOMODATION, EXPORT_ACCOMODATION, EXPORT_ACCOMODATION_ALL, POST_ACCOMODATION_LIST } from "src/store/RbacConstants";

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

interface AccomodationObject {
  EntityAmId: number,
  EntityName: string,
  EntityId: string,
  AmTypeId: number,
  AmInfo: string,
  AmCostMin: string,
  AmCostMax: string
}
const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});
export const AccomodationCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: 'success',
    message: '',
    deiails: ''
  })
  const [AddAccomodation, setAddAccomodation] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [EntityAmId, setEntityAmId] = useState(0);
  const [isDisplayAll, setIsDisplayAll] = useState(true);
  const [MaximuseIndex, setMaximuseIndex] = useState(0);
  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteAccomodation(EntityAmId));
    if (error) {
      console.log("=====>", data, error);
      msgType = 'error';
    }
    dispatch(getAccomodation(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportAccomodationAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportAccomodation(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const IntervalIdentifier = setTimeout(() => {
      console.log("filters", search)
      dispatch(getAccomodation(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const AccomodationData = useSelector(
    (state: any) => state?.getAccomodation?.AccomodationResponse?.data
  )
  /**
  * GET ALL ALLOWED API List
  */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createAccomodationPopup = () => {
    setEntityAmId(0)
    setAddAccomodation(!AddAccomodation);
  }
  const editAccomodationPopup = (EntityAmId: number = 0) => {
    setEntityAmId(EntityAmId)
    setAddAccomodation(!AddAccomodation);
  }
  const ActionHandler = (row: AccomodationObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_ACCOMODATION_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editAccomodationPopup(row?.EntityAmId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_ACCOMODATION).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => { setEntityAmId(row?.EntityAmId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const AmInfoHandler = (row: AccomodationObject) => {
    return <div>
      {(MaximuseIndex === row.EntityAmId) ? <span dangerouslySetInnerHTML={{ __html: row.AmInfo }} /> : <span dangerouslySetInnerHTML={{ __html: row.AmInfo.slice(0, 50) }} />}
      {(row.AmInfo.length > 50) ? (MaximuseIndex !== row.EntityAmId) ? <ArrowDropDownIcon onClick={(e) => { setMaximuseIndex(row.EntityAmId) }} color="primary" fontSize="small" /> : <ArrowDropUpIcon onClick={(e) => { setMaximuseIndex(0) }} color="primary" fontSize="small" /> : ''}
    </div>
  }

  const EntityNameToolTip = (row: AccomodationObject) => {
    return <CustomWidthTooltip title={row?.EntityName}><Button sx={{ m: 1 }}>{row?.EntityName?.slice(0, 25)}</Button></CustomWidthTooltip>
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const columns = useMemo(
    () => [
      {
        Header: "EntityAmId",
        accessor: "EntityAmId",
        width: 30,
      },
      {
        Header: "EntityName",
        accessor: EntityNameToolTip,
        width: 80,
      },
      {
        Header: "AmType",
        accessor: "AmtypeName",
        width: 60,
      },
      {
        Header: "MinCost",
        accessor: "AmCostMin",
        disableSortBy: true,
        width: 50
      },
      {
        Header: "MaxCost",
        accessor: "AmCostMax",
        disableSortBy: true,
        width: 50
      },
      {
        Header: "Info.",
        accessor: AmInfoHandler,
        disableSortBy: true,
        width: 100
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 40
      },
    ],
    [MaximuseIndex, roleAllowedApis]
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
          {AddAccomodation && <AddAccomodationPopup openImport={AddAccomodation} setOpenImport={setAddAccomodation} EntityAmId={EntityAmId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importAccomodation} refresh={getAccomodation(page + 1, limit)} popupTitle="Import Accomodation" />

          <Typography color="textPrimary" variant="h5">
            Accomodation Mapper
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_ACCOMODATION).length > 0)
        && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_ACCOMODATION).length > 0)
        && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_ACCOMODATION_ALL).length > 0)
        && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_ACCOMODATION_LIST).length > 0)
        && <Button onClick={() => createAccomodationPopup()}>Add Accomodation</Button>}
              </div>
            </Grid>
          </Grid>
          {isMessage && (
            <Alert severity="success">
              {MessageObj?.message}<strong>!</strong>
            </Alert>)}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {AccomodationData && AccomodationData?.rows && AccomodationData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    searchFilters={filters}
                    setFilters={setFilters}
                    isLoading={isLoading}
                    columns={columns}
                    data={AccomodationData?.rows}
                    totalCount={AccomodationData?.count}
                    limit={limit}
                    setLimit={setLimit}
                    sortedBy={sortBy}
                    setSortedBy={setSortBy}
                    search={search}
                    setSearch={setSearch}
                    manualPagination={true}
                    manualGlobalFilter={true}
                    manualSortBy={true}
                    currentPage={page}
                    setPage={setPage}
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
