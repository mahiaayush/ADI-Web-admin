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
import toast from "react-hot-toast";
import { deleteCatagory, exportCatagory, exportCatagoryAll, getCatagory, importCatagory } from "src/store/actions/CatagoryAction";
import AddCatagoryPopup from "./correction-popup/AddCatagoryPopup";
import { DELETE_CATEGORY, EXPORT_CATEGORY, EXPORT_CATEGORY_ALL, IMPORT_CATEGORY, POST_CATEGORY_LIST, PUT_CATEGORY_LIST } from "src/store/RbacConstants";

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

interface CatagoryObject {
  CategoryId: number,
  CategoryName: string,
  Status: string,
  PrecedenceOrder: number,
}

export const CategoryCorrection = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isMessage, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: 'success',
    message: '',
    deiails: ''
  })
  const [isOpenCatagory, setIsOpenCatagory] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
  const [CategoryId, setCategoryId] = useState(0)
  let msgType = 'success';
  const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }
  const handleDelete = async () => {
    setConfirmDialog(false);
    const { data, error } = await dispatch(deleteCatagory(CategoryId));
    if (error) {
      console.log("=====>", data, error);
      msgType = 'error';
    }
    dispatch(getCatagory(page + 1, limit)).then(() => setIsLoading(false));
    displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
  }
  const downloadExcelAll = async () => {
    const { data, error } = await dispatch(exportCatagoryAll());
    if (error) {
      toast.success(error?.message)
    }
  }
  const downloadExcel = async () => {
    const { data, error } = await dispatch(exportCatagory(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
    if (error) {
      toast.success(error?.message)
    }
  }
  
  useEffect(() => {
    setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCatagory(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])

  const catagoryData = useSelector(
    (state: any) => state?.getCatagory?.CatagoryResponse?.data
  )
  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
  const createCatagoryPopup = () => {
    setCategoryId(0)
    setIsOpenCatagory(!isOpenCatagory);
  }
  const editCategoryPopup = (CategoryId: number = 0) => {
    setCategoryId(CategoryId)
    setIsOpenCatagory(!isOpenCatagory);
  }
  const ActionHandler = (row: CatagoryObject) => {
    return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_CATEGORY_LIST).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => editCategoryPopup(row?.CategoryId)}><EditSharp /></Button>}
        {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_CATEGORY).length > 0)
        && <Button style={{ minWidth: '0px' }} onClick={() => { setCategoryId(row?.CategoryId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}
      </hgroup>
  }

  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }

  const columns = useMemo(
    () => [
      {
        Header: "Category-Id",
        accessor: "CategoryId",
        width: 100,
      },
      {
        Header: "Name",
        accessor: "CategoryName",
        width: 100,
      },
      {
        Header: "Order",
        accessor: "PrecedenceOrder",
        width: 100,
      },
      {
        Header: "Status",
        accessor: "Status",
        width: 100
      },
      {
        Header: "Action",
        accessor: ActionHandler,
        disableSortBy: true,
        width: 60
      },
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
          {isOpenCatagory && <AddCatagoryPopup openImport={isOpenCatagory} setOpenImport={setIsOpenCatagory} CategoryId={CategoryId} pageNo={page} limit={limit} />}
          <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCatagory} refresh={getCatagory(page + 1, limit)} popupTitle="Import Catagory" />
          <Typography color="textPrimary" variant="h5">
            Course Category
          </Typography>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Grid item>
              <div className="import_export_div">
              {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_CATEGORY).length > 0)
              && <><FileUpload color="primary" fontSize="small" />
                <Button onClick={() => handleClickOpen()} className="file_import_export">
                  Import
                </Button></>}
              {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_CATEGORY).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcel()}>
                  Export
                </Button></>}
              {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_CATEGORY_ALL).length > 0)
              && <><FileDownload color="primary" fontSize="small" />
                <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                  Export All
                </Button></>}
              </div>
            </Grid>
            <Grid item>
              <div>
              {(roleAllowedApis.filter(itm => itm.apiKey === POST_CATEGORY_LIST).length > 0)
              && <Button onClick={() => createCatagoryPopup()}>Add Catagory</Button>}
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
              {catagoryData && catagoryData?.rows && catagoryData?.rows?.length > -1 && (
                <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={catagoryData?.rows}
                    totalCount={catagoryData?.count}
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
