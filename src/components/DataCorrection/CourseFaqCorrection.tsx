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
  import AddCourseFaqPopup from "./correction-popup/AddCourseFaqPopup";
  import toast from "react-hot-toast";
  import { deleteCourseFaq, exportCourseFaq, exportCourseFaqAll, getCourseFaq, importCourseFaq } from "src/store/actions/CourseFaqAction";
  import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
  import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { DELETE_COURSE_FAQ, EXPORT_COURSE_FAQ, EXPORT_COURSE_FAQ_ALL, IMPORT_COURSE_FAQ, POST_COURSE_FAQ_LIST, PUT_COURSE_FAQ_LIST } from "src/store/RbacConstants";

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

  interface CourseFaqObject {
    FaqId: number,
    CourseId: number,
    CourseTitle: string,
    QuestionText: string,
    AnswerText: string,
    FaqOrder: number
  }
  
  export const CourseFaqCorrection = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMessage, setIsMessage] = useState(false);
    const [MessageObj, setMessage] = useState({
      type: 'success',
      message: '',
      deiails: ''
  })
    const [isOpenCourseFaq, setIsOpenCourseFaq] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [openImport, setOpenImport] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [EntityclgId, setEntityclgId] = useState(0);
    const [FaqId, setFaqId] = useState(0);
    const [MaximuseQuestionIndex, setMaximuseQuestionIndex] = useState(0);
    const [MaximuseAnswerIndex, setMaximuseAnswerIndex] = useState(0);
    let msgType = 'success';
    const displayMessage = (obj: { type: string, message: string, deiails: string }) => {
      setIsMessage(true);
      setMessage(obj)
      setTimeout(() => { setIsMessage(false) }, 5000);
    }
    const handleDelete = async () => {
      setConfirmDialog(false);
      const { data, error } = await dispatch(deleteCourseFaq(FaqId));
      if (error) {
        msgType = 'error';
      } 
      dispatch(getCourseFaq(page + 1, limit)).then(() => setIsLoading(false));
      displayMessage({ type: msgType, message: data?.message, deiails: data?.message });
    }
    const downloadExcelAll = async () => {
      const { data, error } = await dispatch(exportCourseFaqAll());
      if (error) {
        toast.success(error?.message)
      }
    }
    const downloadExcel = async () => {
      const { data, error } = await dispatch(exportCourseFaq(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC'));
      if (error) {
        toast.success(error?.message)
      }
    }
    
    useEffect(() => {
      setIsLoading(true)
    const IntervalIdentifier = setTimeout(() => {
      dispatch(getCourseFaq(page + 1, limit, search, sortBy?.[0]?.id, sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() => setIsLoading(false));
    }, 1000)
    return () => { clearTimeout(IntervalIdentifier) }
  }, [page, limit, search, sortBy])
    
    const courseFaqData = useSelector(
      (state: any) => state?.getCourseFaq?.CourseFaqResponse?.data
    )
    /**
     * GET ALL ALLOWED API List
     */
    const roleAllowedApis = useSelector(
      (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
    )
    const createCourseFaqPopup = () => {
      setFaqId(0)
      setIsOpenCourseFaq(!isOpenCourseFaq);
    }
    const editCourseFaqPopup = (FaqId:number = 0) => {
      setFaqId(FaqId)
      setIsOpenCourseFaq(!isOpenCourseFaq);
    }
    const ActionHandler = (row: CourseFaqObject) => {
      return <hgroup style={{ display: 'flex' }}>
      {(roleAllowedApis.filter(itm => itm.apiKey === PUT_COURSE_FAQ_LIST).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => editCourseFaqPopup(row?.FaqId)}><EditSharp /></Button>}
      {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_COURSE_FAQ).length > 0)
      && <Button style={{ minWidth: '0px' }} onClick={() => { setFaqId(row?.FaqId); setConfirmDialog(true) }}>
        <DeleteOutline /></Button>}</hgroup>
  }
  const QuestionTextExpendable = (row: CourseFaqObject) => {
    return <div>
            {(MaximuseQuestionIndex === row.FaqId) ? <span dangerouslySetInnerHTML={{ __html: row.QuestionText }} /> : <span dangerouslySetInnerHTML={{ __html: row.QuestionText.slice(0, 45) }} />}
            {(row.QuestionText.length > 45) ? (MaximuseQuestionIndex !== row.FaqId) ? <ArrowDropDownIcon onClick={(e) => { setMaximuseQuestionIndex(row.FaqId) }} color="primary" fontSize="small" /> : <ArrowDropUpIcon onClick={(e) => { setMaximuseQuestionIndex(0) }} color="primary" fontSize="small" /> : ''}
           </div>
  }
  const AnswerTextExpendable = (row: CourseFaqObject) => {
    return <div>
            {(MaximuseAnswerIndex === row.FaqId) ? <span dangerouslySetInnerHTML={{ __html: row.AnswerText }} /> : <span dangerouslySetInnerHTML={{ __html: row.AnswerText.slice(0, 45) }} />}
            {(row.AnswerText.length > 45) ? (MaximuseAnswerIndex !== row.FaqId) ? <ArrowDropDownIcon onClick={(e) => { setMaximuseAnswerIndex(row.FaqId) }} color="primary" fontSize="small" /> : <ArrowDropUpIcon onClick={(e) => { setMaximuseAnswerIndex(0) }} color="primary" fontSize="small" /> : ''}
           </div>
  }
  const handleClickOpen = () => {
    setOpenImport(!openImport)
  }
  
    const columns = useMemo(
        () => [
          {
            Header: "Faq-Id",
            accessor: "FaqId",
            width: 30,
          },
          {
            Header: "Course",
            accessor: "CourseTitle",
            width: 60,
          },
          {
            Header: "Question",
            accessor: QuestionTextExpendable,
            width: 100,
          },
          {
            Header: "Answer",
            accessor: AnswerTextExpendable,
            width: 100
          }, 
          {
            Header: "Order",
            accessor: "FaqOrder",
            width: 20
          },
          {
            Header: "Action",
            accessor: ActionHandler,
            disableSortBy: true,
            width: 40
          },
        ],
        [MaximuseAnswerIndex, MaximuseQuestionIndex, roleAllowedApis]
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
            {isOpenCourseFaq && <AddCourseFaqPopup openImport={isOpenCourseFaq} setOpenImport={setIsOpenCourseFaq} FaqId={FaqId} pageNo={page} limit={limit} />}
            <ImportExcelPopup openImport={openImport} setOpenImport={setOpenImport} importAction={importCourseFaq} refresh={getCourseFaq(page + 1, limit)} popupTitle="Import Content-Faq" />
            <Typography color="textPrimary" variant="h5">
            Course FAQ
            </Typography>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Grid container style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Grid item>
                <div className="import_export_div">
                {(roleAllowedApis.filter(itm => itm.apiKey === IMPORT_COURSE_FAQ).length > 0)
                && <><FileUpload color="primary" fontSize="small" />
                  <Button onClick={() => handleClickOpen()} className="file_import_export">
                    Import
                  </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_FAQ).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcel()}>
                    Export
                  </Button></>}
                {(roleAllowedApis.filter(itm => itm.apiKey === EXPORT_COURSE_FAQ_ALL).length > 0)
                && <><FileDownload color="primary" fontSize="small" />
                  <Button className="file_import_export" onClick={() => downloadExcelAll()}>
                    Export All
                  </Button></>}
                </div> 
              </Grid>
              <Grid item>
                <div>
                {(roleAllowedApis.filter(itm => itm.apiKey === POST_COURSE_FAQ_LIST).length > 0)
                && <Button onClick={() => createCourseFaqPopup()}>Add Course-FAQ</Button>}
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
                {courseFaqData && courseFaqData?.rows && courseFaqData?.rows?.length > -1 && (
                  <div className={`${classes.tfoottop} itemListSorting`}>
                  <EnhancedTable
                    isLoading={isLoading}
                    columns={columns}
                    data={courseFaqData?.rows}
                    totalCount={courseFaqData?.count}
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
