import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Box,
  Card,
  Button,
} from "@material-ui/core";
import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "../../store";
import {
  getCounsellorsList,
} from "../../store/actions/counsellorListAction";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTable from "../common/dataTable/EnhancedTable";
import CssBaseline from "@material-ui/core/CssBaseline";
import FileDownload from "@material-ui/icons/FileDownload";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router";
import { GET_CSC_DETAILS, GET_DOCUMENT_DETALIS } from "src/store/RbacConstants";

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
});

interface UserObject {
  UserSid: string;
  Name: string;
}

const DetailScreen = ({ newUsers = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { counsellors, Allcounsellors } = useSelector(
    (state) => state.counsellorList
  );
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [listdata, setListdata] = useState(false);
  const [type, setType] = useState(null);
  const [filter, setFilter] = useState({ value: "month", label: "Month" });
  const { counsellorStatusData: dataResponse } = useSelector(state => state);
  const finalData = dataResponse?.counsellorStatusDataResponse?.data;
  const [newest, setNewest] = useState("Newest");
  const [sortBy, setSortBy] = useState([])

  useEffect(() => {
    setIsLoading(true);
    dispatch(getCounsellorsList(page + 1, limit, type, search, newest, sortBy?.[0]?.id,
      sortBy?.[0]?.desc === undefined ? null : sortBy?.[0]?.desc ? 'DESC' : 'ASC')).then(() =>
      setIsLoading(false));
  }, [page, limit, type, search, newest, sortBy]);

  /**
   * GET ALL ALLOWED API List
   */
  const roleAllowedApis = useSelector(
    (state: any) => state?.allowedApisRes?.getAlllowedApisResponse?.data
  )

  const ViewLink = (row: UserObject) => {
      return (
        <>
        { (roleAllowedApis.filter(itm => itm.apiKey === GET_DOCUMENT_DETALIS).length > 0) 
        && (
          <Button
              style={{
                border: "1px solid blue",
                backgroundColor: "#FFFFFF",
                fontSize: "14px",
                textDecoration: 'none'
            }}
            size="small"
            type="button"
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate(`/DetailScreen/${row.UserSid}`)
            }}
          >
           View
          </Button>
          )}        
        </>
      );
  };

  const FullName = (row: UserObject) => {
    return (
      <div>
        <span>{row.Name}</span>
      </div>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        id: "name",
        accessor: FullName,
      },
      {
        Header: "Email",
        accessor: "Email",
        id: "email",
        width: 220
      },
      {
        Header: "Phone Number",
        accessor: "PhoneNumber",
        id: "phone"
      },
      {
        Header: "No of Years Counselling Experience",
        accessor: "ExperienceYear",
        id: "experience",
        width: 200
      },
      {
        Header: "LinkedIn URL",
        accessor: "LinkedInURL",
        id: "url",
        width: 200,        
      },
      {
        Header: "Actions",
        id: " ",
        accessor: ViewLink,
        disableSortBy: true
      },
    ],
    [roleAllowedApis]
  );
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  const ExportDataBind = () => {
    setListdata(true);
    if (Allcounsellors.count > 0) {
      exportToCSV(Allcounsellors.list, "Counsellor-application-list");
    }
  };
  const classes = useStyles();
  return (
    <div>
      <Container className="userIndex">
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item>
              <Typography color="textPrimary" variant="h5">
                Counsellor Onboarding
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          {/* <div className="import_export_div">
            <FileDownload color="primary" fontSize="small" />
            <Button className="file_import_export" onClick={ExportDataBind}>
              Export
            </Button>
          </div> */}
          <Card>
            <Grid item className="counsellorApplicationListTable">
              <CssBaseline />
              <EnhancedTable
                columns={columns}
                data={counsellors.list}
                totalCount={counsellors.count}
                limit={limit}
                setLimit={setLimit}
                currentPage={page}
                setPage={setPage}
                isLoading={isLoading}
                manualPagination={true}
                search={search}
                setSearch={setSearch}
                manualGlobalFilter={true}
                counsellorApplicationSelect={true}
                setNewest={setNewest}
                newest={newest}
                manualSortBy={true}
                sortedBy={sortBy}
                setSortedBy={setSortBy}
              />
            </Grid>
          </Card>
        </Box>
      </Container>
    </div>
  );
};
export default DetailScreen;
