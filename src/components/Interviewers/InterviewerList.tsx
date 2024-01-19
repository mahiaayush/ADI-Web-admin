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
  Button,
    IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useMemo, useState, useEffect } from "react";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import { useDispatch, useSelector } from "../../store";
import { InterviewersAction } from "src/store/actions/OnBoardingAction";
import { RemoveInterviewerAction } from "src/store/actions/RemoveInterviewerAction";
import AddCircleOutlineSharp from '@material-ui/icons/AddCircleOutlineSharp';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import AddInterviewer from "./AddInterviewer";
import ConfirmDelete from "../Override/ConfirmDelete";
import { DELETE_CSC_INTERVIEWER, POST_CSC_INTERVIEWER } from "src/store/RbacConstants";

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
    InterviewerName: string;
    InterviewerStatus: string;
    InterviewerId: number;
  }

const InterviewerList = () => {
    const [addDialog, setAddDialog] = useState<boolean>(false)
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState<boolean>(false)
    const [interviewerID, setinterviewerID] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();  
    let UniqueStatus = new Set(); 

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      InterviewersAction(
        search,
        page + 1,
        limit,
        sortBy?.[0]?.id,
        sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'desc' : 'asc'
      )
    ).then(() => setIsLoading(false));
  }, [page, search, limit, sortBy]);
  /**
    * GET ALL ALLOWED API List
    */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )
      const CounsellorStatus = (row: UserObject) => {
        return (
          <span className={`${row.InterviewerStatus === "Active" ? "status_badge status_badge_active" : row.InterviewerStatus === "InActive" ? "status_badge status_badge_inactive" : "status_badge status_badge_banned"}`}>{row.InterviewerStatus}</span>
        )
      }
      const handleDelete = () => {
        dispatch(RemoveInterviewerAction(interviewerID)).then(() => dispatch(InterviewersAction(
          search,
          page + 1,
          limit,
          sortBy?.[0]?.id,
          sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'desc' : 'asc'
        )))
        setConfirmDialog(false);
      }
      const DeleteHandler = (row: UserObject) => {
        return (
          <span>
            {(roleAllowedApis.filter(itm => itm.apiKey === DELETE_CSC_INTERVIEWER).length > 0)
            && <Button onClick={() => { setinterviewerID(row.InterviewerId); setConfirmDialog(true); }}>
            <DeleteIcon color="action" />
          </Button>}
            </span>
        );
      };

    const InterviewersData = useSelector((state) => state?.interviewerList?.interviewerResponse?.data?.interviewerList);
    const InterviewDataCount = useSelector((state) => state?.interviewerList?.interviewerResponse?.data?.found);
    const allStatus = InterviewersData?.map(item => item.Status)
     UniqueStatus = new Set(allStatus)
    
    const columns = useMemo(
        () => [
          {
            Header: "InterviewerId",
            id: "InterviewerId",
            accessor: 'InterviewerId',
            width: 100
          },
          {
            Header: "Name",
            accessor: "InterviewerName"
          },
          {
            Header: "Phone Number",
            accessor: "InterviewerPhone",
          },
          {
            Header: "E Mail",
            accessor: "InterviewerEmail",
          },
          {
            Header: "Status",
            accessor: CounsellorStatus,
            disableSortBy: UniqueStatus.size === 1,
          },
          {
            Header: "Action",
            accessor: DeleteHandler,
          }
        ],
        [UniqueStatus, roleAllowedApis]
      );

    return <div>
    <Container className="userIndex">
    {confirmDialog && (
            <ConfirmDelete
              open={confirmDialog}
              onClose={() => setConfirmDialog(false)}
              onSubmit={() => handleDelete()}
            />
          )}
      <Grid item xs={12} position="relative" className={classes.topheader}>
        <Typography color="textPrimary" variant="h5">
          Interviewers List
        </Typography>
        {(roleAllowedApis.filter(itm => itm.apiKey === POST_CSC_INTERVIEWER).length > 0)
        && <Tooltip title="Add" className={classes.usertooltip}>
            <IconButton
                aria-label="add"
                size="small"
                onClick={() => setAddDialog(true)}
            >
                <AddCircleOutlineSharp
                    color="primary"
                    fontSize="large"
                />
            </IconButton>
        </Tooltip>}
      </Grid> 
       <Box sx={{ mt: 3 }}>
        <Card>
          <Grid item className="counsellorApplicationListTable filterdataContner">
            {InterviewersData && InterviewersData.length > 0 ? (
                  <EnhancedTable
                    columns={columns}
                    data={InterviewersData}
                    totalCount={InterviewDataCount}
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
                  />
                ) : (
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
                  />
                )}
          </Grid>
          {addDialog && <AddInterviewer addDialog={addDialog} setAddDialog={setAddDialog} />}
        </Card>
      </Box>      
    </Container>
  </div>
}

export default InterviewerList;