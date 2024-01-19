import {
  Container,
  Grid,
  Box,
  Card,
  Button,
  Alert,
  Typography
} from "@material-ui/core";
import Tooltip, { TooltipProps, tooltipClasses } from '@material-ui/core/Tooltip';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "src/store";
import { useEffect, useState, useMemo } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import FileDownload from "@material-ui/icons/FileDownload";
import { EditSharp, DeleteOutline, FileUpload } from "@material-ui/icons";
import ConfirmDelete from "../Override/ConfirmDelete";
import toast from "react-hot-toast";
import { deleteRMOccupation, exportRMOccupation, exportRMOccupationAll, getRMOccupation, importRMOccupation } from "src/store/actions/RMOccupationAction";
import AddRMOccupationPopup from "./correction-popup/AddRMOccupationPopup"
import { ImportExcelPopup } from "./correction-popup/ImportPopup";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import styled from "@material-ui/styled-engine";
import { PUT_OCC_ACCOMODATION_LIST, DELETE_OCC_ACCOMODATION, IMPORT_OCC_ACCOMODATION, EXPORT_OCC_ACCOMODATION, EXPORT_OCC_ACCOMODATION_ALL, POST_OCC_ACCOMODATION_LIST } from "src/store/RbacConstants";

export type Color = 'success' | 'info' | 'warning' | 'error';

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
interface RMOccupationObject {
  RegcarCode: string,
  OnetsocCode: string,
  RegcarTitle: string,
  RegcarSlug: string,
  RegcarVideo: string,
  RegcarImvideo: string,
  RegcarImg: string,
  LmcDesc: string,
  RegcarKeywords: string,
  IsEmerging: string,
  RegcarStatus: string,
  OnetsocTitle: string
}

export const RMOccupationCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const Obj: { type: Color, message: string, details: string } = {
    type: 'success',
    message: '',
    details: ''
  }
  const [MessageObj, setMessage] = useState(Obj)
  const [isOpenRMOccupation, setIsOpenRMOccupation] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [RegcarCode, setRegcarCode] = useState(null);
  const [ExpendedIndex, setExpendedIndex] = useState("");
  let msgType: Color = 'success';

  const displayMessage = (obj: { type: Color, message: string, details: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteRMOccupation(RegcarCode));
    let message = data?.message;
    console.log("=====>", data, error);
    if (error) {
      msgType = 'error';
      message = error?.message;
    }
    dispatch(getRMOccupation(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message, details: data?.message });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportRMOccupationAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportRMOccupation(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getRMOccupation(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const occupationData = useSelector(
    (state: any) => state?.getRMOccupation?.RMOccupationResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createRMOccupationPopup = () => {
    setRegcarCode("")
    setIsOpenRMOccupation(!isOpenRMOccupation);
  }
  const editRMOccupationPopup = (RegcarCode: string = "") => {
    setRegcarCode(RegcarCode)
    setIsOpenRMOccupation(!isOpenRMOccupation);
  }
  const LmcDescExpendable = (row: RMOccupationObject) => {
    return <div>
      {(ExpendedIndex === row?.RegcarCode) ? <span dangerouslySetInnerHTML={{ __html: row?.LmcDesc }} /> : <span dangerouslySetInnerHTML={{ __html: row?.LmcDesc?.slice(0, 50) }} />}
      {(row?.LmcDesc?.length > 50) ? (ExpendedIndex !== row?.RegcarCode) ? <ArrowDropDownIcon onClick={(e) => { setExpendedIndex(row?.RegcarCode) }} color="primary" fontSize="small" /> : <ArrowDropUpIcon onClick={(e) => { setExpendedIndex("") }} color="primary" fontSize="small" /> : ''}
    </div>
  }
  const ActionHandler = (row: RMOccupationObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_OCC_ACCOMODATION_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editRMOccupationPopup(row?.RegcarCode)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_OCC_ACCOMODATION).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setRegcarCode(row?.RegcarCode); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }

  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const columns = useMemo(
    () => [
      {
        Header: "RCCode",
        accessor: "RegcarCode",
        width: 25,
      },
      {
        Header: "One-Code",
        accessor: "OnetsocCode",
        width: 25,
      },
      {
        Header: "Title",
        accessor: "RegcarTitle",
        width: 30,
      },
      {
        Header: "Slug",
        accessor: "RegcarSlug",
        width: 30
      },
      {
        Header: "LmcDesc",
        accessor: LmcDescExpendable,
        width: 60
      },
      {
        Header: "Keywords",
        accessor: "RegcarKeywords",
        width: 20
      },
      {
        Header: "Emerging",
        accessor: "IsEmerging",
        width: 20
      },
      {
        Header: "Status",
        accessor: "RegcarStatus",
        width: 20
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 30
      },
    ],
    [ExpendedIndex, roleAllowedApis]
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
          {isOpenRMOccupation && <AddRMOccupationPopup openImport={isOpenRMOccupation} setOpenImport={setIsOpenRMOccupation} RegcarCode={RegcarCode} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importRMOccupation} refresh={getRMOccupation(page + 1, limit)} popupTitle="Import Regional-Occupation" />
          <Typography color="textPrimary" variant="h5">
            Regional Occupation
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_OCC_ACCOMODATION).length > 0)
              && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCC_ACCOMODATION).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_OCC_ACCOMODATION_ALL).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div style={{ width: "100%" }}>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_OCC_ACCOMODATION_LIST).length > 0)
              && <Button
                  size="small"
                  sx={{ float: "right" }}
                  onClick={() => createRMOccupationPopup()}
              >Add Occupation</Button>}
              </div>
            </Grid>
          </Grid>
          {isMessage && (
            <Alert severity={MessageObj?.type}>
              {MessageObj?.message}<strong>!</strong>
            </Alert>)}
          <Card>
            <Grid
              item
              className="counsellorApplicationListTable filterdataContner"
            >
              {occupationData && occupationData?.rows && occupationData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={occupationData?.rows}
                    totalCount={occupationData?.count}
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