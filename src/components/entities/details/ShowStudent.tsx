import { useState, useEffect, useMemo } from "react";
import type { ChangeEvent } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { userValidator } from "../../../utils/validations";
import EnhancedTable from "../../common/dataTable/EnhancedTable";
import "./showStudent.css";
import {
  Grid,
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Checkbox,
  Container,
  Typography,
} from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "../../../store";
import { getEntityUserDetails } from "../../../store/actions/GetStudentListAction";
import { postEntityUserDetails } from "../../../store/actions/studentListingAction";
import { getEntityItemDetail } from "../../../store/actions/GetEntityItemDetailAction";
import {
  ADMIN_API_ENDPOINT_V2,
  POST_ENTITY_USER_DETAILS,
} from "../../../store/constants";
import http from "../../../utils/http";

const showStudentDialog = ({
  open = false,
  itemId = {
    items: [],
    zohoplanId: "",
    unUsedSeat: 0,
    transactionId: "",
    pkgID: "",
  },
  onClose = () => {},
  onSubmit = () => {},
}) => {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const url = window.location.href;
  const entityId = url.substring(url.lastIndexOf("/") + 1);
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
      padding: "0",
    },
  });
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectAllFlag, setSelectAllFlag] = useState(true);

  const studentList = useSelector(
    (state) => state?.entityUserDetails?.entityUserDetailsResponse?.data?.data
  );

  const studentListFound = useSelector(
    (state) => state?.entityUserDetails?.entityUserDetailsResponse?.data?.found
  );

  const [studentData, setStudentData] = useState([]);
  const [originalStudentData, setOriginalStudentData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getEntityUserDetails(entityId, itemId.pkgID, page + 1, limit, search)
    ).then(() => setIsLoading(false));
  }, [page, search, limit]);

  useEffect(() => {
    if (studentList && studentList.length) {
      const data = JSON.parse(JSON.stringify(studentList));
      if (originalStudentData.length === 0) {
        setOriginalStudentData([...data]);
      } else {
        for (let i = 0; i < data.length; i++) {
          const needle = data[i].userSid; // needle
          const haystack = originalStudentData; // haystack
          const index = haystack?.findIndex((item) => item.userSid === needle);
          if (index === -1) {
            originalStudentData.push(data[i]);
          } else {
            originalStudentData[index] = data[i];
          }
        }
        setOriginalStudentData([...originalStudentData]);
      }
       setStudentData(data);
    } else {
      setStudentData([]);
    }
  }, [studentList]);

  useEffect(() => {
    if (studentData.length) {
      let cnt = 0;
      let cnt1 = 0;
      for (let i = 0; i < studentData.length; i++) {
        const needle = studentData[i].userSid; // needle
        const haystack = selectedIds; // haystack
        const index = haystack?.findIndex((item) => item.userSid === needle);
        if (studentData[i].packageStatus && index === -1) {
          cnt++;
        }
        if ((index > -1 && selectedIds[index].flag)) {
          cnt1++;
        }
      }
      if (cnt1 + cnt === studentData.length) setSelectAllFlag(false);
     else if (cnt1 === studentData.length) setSelectAllFlag(false);
       else if (cnt === studentData.length) setSelectAllFlag(false);
       else setSelectAllFlag(true);
    }
  }, [studentData]);

  const confirmedUserSid = [];
  
  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const validations = () => {
    if (confirmedUserSid.length !== 0) {
      return true;
    }
    return false;
  };
  interface UserObject {
    FamilyName: string;
    Givenname: string;
    ScheduleId: Array<any>;
    SmAssociationId: number;
    packageStatus: boolean;
    userSid: string;
    userStatus: string;
    Index: number;
  }

  const Name = (row: UserObject) => {
    const needle = row.Index; // needle
    const haystack = studentData; // haystack
    const index = haystack?.findIndex((item) => item.Index === needle);
    const checked = selectedIds?.findIndex(
      (item) => item.userSid === studentData[index].userSid
    );
    // console.log("checked", checked > -1 ? selectedIds[checked].flag : false);
    return (
      <>
        {row?.packageStatus && row?.ScheduleId && row.ScheduleId?.length ? (
          <Checkbox
            checked={true}
            key={row.userSid}
            inputProps={{ "aria-label": "controlled" }}
            disabled
          />
        ) : (
          <Checkbox
            key={row.userSid}
            checked={
              checked > -1 ? selectedIds[checked].flag : row.packageStatus
            }
            onChange={() => {
              if (checked > -1) {
                studentData[index].packageStatus = !selectedIds[checked].flag;
              } else {
                studentData[index].packageStatus = !studentData[index].packageStatus;
              }
              const index1 = selectedIds?.findIndex(
                (item) => item.userSid === studentData[index].userSid
              );
              if (index1 > -1) {
                selectedIds[index1].flag = studentData[index].packageStatus;
                setSelectedIds([...selectedIds]);
              } else {
                selectedIds.push({
                  userSid: studentData[index].userSid,
                  flag: studentData[index].packageStatus,
                });
                setSelectedIds([...selectedIds]);
              }

              setStudentData([...studentData]);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        )}{" "}
        {row.Givenname.concat(
          " ",
          row.FamilyName !== null ? row.FamilyName : ""
        )}
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: Name,
      },
    ],
    [studentData, selectedIds]
  );
  const handleSubmit = async () => {
    setError("");
    setSucessMessage("");
    // console.log("student List before submitting", originalStudentData);
    // console.log("student List after submitting", selectedIds);
    for (let index = 0; index < originalStudentData.length; index++) {
      const statusIndex = selectedIds.findIndex(
        (item) => item.userSid === originalStudentData[index].userSid
      );
      // console.log(statusIndex);
      if (statusIndex > -1 && selectedIds[statusIndex]?.flag) {
        confirmedUserSid.push({
          UserSid: originalStudentData[index].userSid,
          isUserUnchecked: false,
        });
      } else if (
        originalStudentData[index].SmAssociationId && !originalStudentData[index]?.ScheduleId?.length && statusIndex > -1 && !selectedIds[statusIndex]?.flag 
      ) {
        confirmedUserSid.push({
          UserSid: originalStudentData[index].userSid,
          isUserUnchecked: true,
          SmAssociationId: originalStudentData[index].SmAssociationId,
        });
      }
    }
    const postCheckoutSubscriptionData = {
      EntityId: entityId,
      EntityPackageId: itemId.pkgID,
      ZohoPlanId: itemId.zohoplanId,
      TransactionId: itemId.transactionId,
      UserSids: confirmedUserSid,
    };
    // console.log("checkout data", postCheckoutSubscriptionData);
    if (validations()) {
      let res;
      try {
        res = await http.post(
          `${ADMIN_API_ENDPOINT_V2}${POST_ENTITY_USER_DETAILS}`,
          postCheckoutSubscriptionData
        );
        // console.log("resresres", res)
        if (res.data.status === true) {
          setSucessMessage(res?.data?.message);
          dispatch(getEntityItemDetail(entityId));
          setTimeout(() => {
            onClose();
          }, 1000);
          // setOriginalStudentData([]);
          // setSelectedIds([]);
        }
      } catch (error) {
        // console.log("resresres", res)
        // console.log('error', error);
        setError(error?.response?.data?.message);
      }
    } else {
      confirmedUserSid.length === 0
        ? setError("Please check / Uncheck atleast one user")
        : setError("Server Side issue");
    }
  };

  const handleClose = () => {
    // console.log("closed");
    setStudentData([]);
    setOriginalStudentData([]);
    setSelectedIds([]);
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      classes={{
        paper:
          step === 1
            ? "add_student student_detail"
            : "add_student student_type",
      }}
    >
      {/* {studentData.length > 0 && (
        <DialogTitle id="form-dialog-title">Assign User</DialogTitle>
      )} */}
      <>
        <Container className="userIndex">
          <Grid item xs={12} position="relative" className={classes.topheader}>
            <Typography color="textPrimary" variant="h5">
              Assign User
            </Typography>
          </Grid>
          <Box sx={{ mt: 3 }}>
            {selectAllFlag && (
              <Button
                variant="contained"
                onClick={() => {
                  // console.log("studentData", studentData);
                  for (let i = 0; i < studentData.length; i++) {
                    const needle = studentData[i].userSid; // needle
                      const haystack = selectedIds; // haystack
                      const index = haystack?.findIndex((item) => item.userSid === needle);
                      // console.log('index', selectedIds[index])
                    if (!studentData[i].packageStatus || (index > -1 && !selectedIds[index].flag)) {
                      if (index === -1) {
                        selectedIds.push({
                          userSid: studentData[i].userSid,
                          flag: true,
                        });
                      } else {
                        selectedIds[index].flag = true;
                      } 
                    }
                    studentData[i].packageStatus = true;
                  }
                  setSelectedIds([...selectedIds]);
                  setStudentData([...studentData]);
                  setSelectAllFlag(!selectAllFlag);
                }}
              >
                Select All
              </Button>
            )}
             {!selectAllFlag && (
              <Button
                variant="contained"
                onClick={() => {
                  // console.log("studentData", studentData);
                  for (let i = 0; i < studentData.length; i++) {
                    const needle = studentData[i].userSid; // needle
                    const haystack = selectedIds; // haystack
                    const index = haystack?.findIndex((item) => item.userSid === needle);
                    if ((studentData[i].packageStatus && studentData[i].ScheduleId.length === 0) || (index > -1 && selectedIds[index].flag && studentData[i].ScheduleId.length === 0)) {
                      if (index === -1) {
                        selectedIds.push({
                          userSid: studentData[i].userSid,
                          flag: false,
                        });
                      } else {
                        selectedIds[index].flag = false;
                      } 
                      studentData[i].packageStatus = false;
                    }
                  }
                  setSelectedIds([...selectedIds]);
                  setStudentData([...studentData]);
                  setSelectAllFlag(!selectAllFlag);
                }}
              >
                Select None
              </Button>
            )}
            <Card>
              <Grid
                item
                className="counsellorApplicationListTable filterdataContner sessionsListClass"
              >
                {studentData && studentData.length > 0 ? (
                  <EnhancedTable
                    columns={columns}
                    data={studentData}
                    totalCount={studentListFound}
                    isLoading={isLoading}
                    manualGlobalFilter={true}
                    // singleStep={true}
                    search={search}
                    setSearch={setSearch}
                    limit={limit}
                    setLimit={setLimit}
                    currentPage={page}
                    setPage={setPage}
                    isAssignUser={true}
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
                    isAssignUser={true}
                    //   rating={rating}
                    //   setRating={setRating}
                    // manualPagination={true}
                    //   setStartDate={setStartDate}
                    //   setEndDate={setEndDate}
                  />
                )}
              </Grid>
            </Card>
          </Box>
        </Container>
        <DialogActions style={{ bottom: 10, right: 10 }}>
          <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
          <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

showStudentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  itemId: PropTypes.object.isRequired,
};

export default showStudentDialog;
