import PropTypes from "prop-types";
import GlobalFilter from "./GlobalFilter";
import { Select as MSelect, MenuItem, Box, TextField, Button } from "@material-ui/core";
import Select from "react-select";
import { DateRangePicker } from "@material-ui/lab";
import { useState, useEffect, useMemo } from "react";
import moment from "moment";

const TableToolbar = (props) => {
  const {
    setGlobalFilter,
    globalFilter,
    headerGroups,
    select,
    printStatus,
    setPrintStatus,
    cardStatus,
    setCardStatus,
    logisticSelect,
    setFilter,
    filter,
    setNewest,
    newest,
    rating,
    setRating,
    Newest,
    setOrderBy,
    orderBy,
    dashboardSelect,
    counsellorApplicationSelect,
    setStartDate,
    setEndDate,
    sessionStatus,
    setSessionStatus,
    sessionSubStatus,
    setSessionSubStatus,
    optionDisable,
    manualSearchCounsellor,
    setManualSearchCounsellor,
    manualSearchLearner,
    setManualSearchLearner,
    manualSearchMeeting,
    setManualSearchMeeting,
    isExpired,
    isAssignUser,
    setOpenGeneratePopup,
  } = props;

  const url = window.location.pathname;
  const lastSegment = url.split("/").pop();
  const [value, setValue] = useState([null, null]);
  const [open, setOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [isTextField, setIsTextField] = useState(false);
  const [disableDate, setDisableDate] = useState(false);
  const currDate = moment(new Date()).format('YYYY-MM-DD');
  const startDate = useMemo(() => (value[0] ? moment(value[0]).format('YYYY-MM-DD') : null), [value]);
  const endDate = useMemo(() => (value[1] ? moment(value[1]).format('YYYY-MM-DD') : null), [value]);

  useEffect(() => {
    if (startDate && !endDate) {
      setDisableDate(true);
    } else {
      setDisableDate(false);
    }
  }, [startDate, endDate])

  const searchHandlerCounsellor = (e) => {
    setManualSearchCounsellor(e.target.value)
  }

  const searchHandlerLearner = (e) => {
    setManualSearchLearner(e.target.value)
  }

  const searchHandlerMeeting = (e) => {
    setManualSearchMeeting(e.target.value)
  }

  const ClearFilterHandler = () => {
    setManualSearchCounsellor('')
    setManualSearchLearner('')
    setManualSearchMeeting('')
    const newStatus = { label: "Select Status", value: null }
    setSessionStatus(newStatus);
    const newSubStatus = { label: "Select Sub-Status", value: null }
    setSessionSubStatus(newSubStatus);
    setValue([null, null])
    setStartDate(null);
    setEndDate(null);
  }

  const GenerateNumberHandler = () => {
    setOpenGeneratePopup(true)
  }
  
  const ratingData = [
    {
      label: "Rating",
      value: null,
    },
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
    {
      label: "5",
      value: "5",
    },
  ];

  const scheduledData = [
    {
      label: "Select Status",
      value: null,
    },
    {
      label: "Scheduled",
      value: "SCHEDULED",
    },
    {
      label: "Cancelled By LMC",
      value: "CANCELED BY LMC",
    },
    // {
    //   label: "Cancelled By Counsellor",
    //   value: "CANCELED BY COUNSELOR",
    // },
    {
      label: "Cancelled By User",
      value: "CANCELED BY USER",
    }
  ];

  const subStatusData = [
    {
      label: "Select Sub-Status",
      value: null,
    },
    {
      label: "No Show",
      value: "NO_SHOW",
    },
    {
      label: "Completed",
      value: "COMPLETED",
    },
    {
      label: "Not Completed",
      value: "NOT_COMPLETED",
    },
  ]

  const orderStatus = [
    {
      label: "All",
      value: null,
    },
    {
      label: "Success",
      value: "SU",
    },
    {
      label: "Pending",
      value: "PE",
    },
    // {
    //   label: "Cancelled",
    //   value: "CE",
    // }
  ]

  const handleDateSelect = (val) => {
    setValue(val);
    // console.log(value, "dateValue")
    setStartDate(val[0] ? moment(val[0]).format("YYYY-MM-DD") : null);
    setEndDate(val[1] ? moment(val[1]).format("YYYY-MM-DD") : null);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {lastSegment !== "sessions" && lastSegment !== "college" && (
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          headerGroups={headerGroups}
          isAssignUser={isAssignUser}
        />
      )}
      {lastSegment === "college" && (
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          headerGroups={headerGroups}
          isAssignUser={isAssignUser}
        />
      )}
      {select && (
        <>
          <MSelect
            value={newest}
            label="select"
            className="lastupdate"
            onChange={(e) => setNewest(e.target.value)}
          >
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </MSelect>
          <MSelect
            labelId="demo-simple-select-helper-label"
            style={{ maxHeight: "40px", marginRight: "15px" }}
            id="demo-simple-select-helper"
            value={filter}
            label="select"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="Yearly">Yearly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
          </MSelect>
        </>
      )}
      {logisticSelect && (
        <>
          <TextField
            size="small"
            label="Print Status"
            name="printstatus"
            type="text"
            style={{ width: '30%' }}
            select
            value={printStatus}
            onChange={(e) => setPrintStatus(e.target.value)}
          >
            <MenuItem value="">Select Print Status</MenuItem>
            <MenuItem value="R">Ready To Print</MenuItem>
            <MenuItem value="I">In Process</MenuItem>
            <MenuItem value="P">Print</MenuItem>
          </TextField>
          <TextField
            size="small"
            label="Card Status"
            name="cardstatus"
            type="text"
            style={{ width: '30%', marginLeft: "5px" }}
            select
            value={cardStatus}
            onChange={(e) => setCardStatus(e.target.value)}
          >
            <MenuItem value="">Select Card Status</MenuItem>
            <MenuItem value="A">Active</MenuItem>
            <MenuItem value="I">Inactive</MenuItem>
            <MenuItem value="B">Blocked</MenuItem>
            <MenuItem value="L">Lost</MenuItem>
          </TextField>
        </>
      )}
      {dashboardSelect && (
        <>
          <MSelect
            value={newest}
            style={{ maxHeight: "40px", marginRight: "15px" }}
            label="select"
            className="lastupdate"
            onChange={(e) => setNewest(e.target.value)}
          >
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </MSelect>
        </>
      )}
      {counsellorApplicationSelect && (
        <>
          <MSelect
            value={newest}
            style={{ maxHeight: "40px", marginRight: "15px" }}
            label="select"
            className="lastupdate"
            onChange={(e) => setNewest(e.target.value)}
          >
            <MenuItem value="Newest">Newest</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </MSelect>
        </>
      )}
      {lastSegment === "feedback" && (
        <>
          <div style={{ marginRight: "10px", padding: "10px" }}>
            <DateRangePicker
              inputFormat="dd/MM/yyyy"
              startText="Start"
              endText="End"
              value={value}
              onChange={(newValue) => {
                handleDateSelect(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} helperText="" size="small" />
                  <Box sx={{ mx: 1 }}> to </Box>
                  <TextField {...endProps} helperText="" size="small" />
                </>
              )}
            />
          </div>
          <div style={{ marginRight: "10px", width: "20%" }}>
            <Select
              value={rating}
              options={ratingData}
              onChange={(e) => setRating(e)}
            />
          </div>
        </>
      )}
      {lastSegment === "sessions" && (
        <>
          <div
            style={{
              marginRight: "10px",
              padding: "10px",
              display: "block",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div className="flexClassMain1">
              <TextField
                onChange={(e) => searchHandlerCounsellor(e)}
                size="small"
                style={{ width: "33%", margin: "auto" }}
                placeholder="Search Counsellor"
                value={manualSearchCounsellor}
              />
              <TextField
                onChange={(e) => searchHandlerLearner(e)}
                size="small"
                style={{ width: "33%", margin: "auto" }}
                placeholder="Search Learner"
                value={manualSearchLearner}
              />
              <TextField
                onChange={(e) => searchHandlerMeeting(e)}
                size="small"
                style={{ width: "33%", margin: "auto" }}
                placeholder="Search Room Name"
                value={manualSearchMeeting}
              />
            </div>
            <div className="flexClassMain2">
              <div style={{ width: "20%" }}>
                <Select
                  value={sessionStatus}
                  options={scheduledData}
                  onChange={(e) => setSessionStatus(e)}
                  className="selectAction"
                />
              </div>
              <div style={{ width: "20%" }}>
                <Select
                  value={sessionSubStatus}
                  options={subStatusData}
                  onChange={(e) => setSessionSubStatus(e)}
                  isDisabled={optionDisable}
                  className="selectAction"
                />
              </div>
              <DateRangePicker
                inputFormat="dd/MM/yyyy"
                startText="Start"
                endText="End"
                open={open}
                value={value}
                onChange={(newValue) => {
                  handleDateSelect(newValue);
                }}
                onAccept={() => setIsAccept(true)}
                onClose={() => {
                  setIsAccept(false);
                  if (!isTextField) {
                    setOpen(false);
                    setIsTextField(false);
                  }
                }}
                onOpen={() => (!isAccept ? setOpen(true) : null)}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField
                      {...startProps}
                      helperText=""
                      size="small"
                      onFocus={() => setIsTextField(true)}
                      onBlur={() => setIsTextField(false)}
                      onClick={() => setOpen(true)}
                    />
                    <Box sx={{ mx: 1 }}> to </Box>
                    <TextField
                      {...endProps}
                      helperText=""
                      size="small"
                      onFocus={() => setIsTextField(true)}
                      onBlur={() => setIsTextField(false)}
                      onClick={() => setOpen(true)}
                    />
                  </>
                )}
              />
              <Button variant="contained" onClick={ClearFilterHandler}>
                Clear Filters
              </Button>
            </div>
          </div>
        </>
      )}
      {(lastSegment === "SessionListing" || lastSegment === "inactiveUsers" || (isExpired && lastSegment === "premiumuser")) && (
        <>
          <div style={{ marginRight: "10px", padding: "10px" }}>
            <DateRangePicker
              inputFormat="dd/MM/yyyy"
              startText="Start"
              endText="End"
              value={value}
              maxDate={currDate}
              onChange={(newValue) => {
                handleDateSelect(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} helperText="" size="small" />
                  <Box sx={{ mx: 1 }}> to </Box>
                  <TextField {...endProps} helperText="" size="small" />
                </>
              )}
            />
          </div>
        </>
      )}
      {(lastSegment === "activeUsers" || (!isExpired && lastSegment === "premiumuser")) && (
        <>
          <div style={{ marginRight: "10px", padding: "10px" }}>
            <DateRangePicker
              inputFormat="dd/MM/yyyy"
              startText="Start"
              endText="End"
              value={value}
              minDate={disableDate ? startDate : undefined}
              maxDate={disableDate ? endDate : undefined}
              onChange={(newValue) => {
                handleDateSelect(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} helperText="" size="small" />
                  <Box sx={{ mx: 1 }}> to </Box>
                  <TextField {...endProps} helperText="" size="small" />
                </>
              )}
            />
          </div>
        </>
      )}
      {lastSegment === "ScheduledSessionListing" && (
        <>
          <div style={{ marginRight: "10px", padding: "10px" }}>
            <DateRangePicker
              inputFormat="dd/MM/yyyy"
              startText="Start"
              endText="End"
              value={value}
              minDate={currDate}
              onChange={(newValue) => {
                handleDateSelect(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} helperText="" size="small" />
                  <Box sx={{ mx: 1 }}> to </Box>
                  <TextField {...endProps} helperText="" size="small" />
                </>
              )}
            />
          </div>
        </>
      )}
      {lastSegment === "learning-hub" && (
        <div style={{ width: "20%", marginRight: "10px" }}>
          <Select
            value={sessionStatus}
            options={orderStatus}
            onChange={(e) => setSessionStatus(e)}
            placeholder="Status"
            className="selectAction"
          />
        </div>
      )}
      {lastSegment === "Logistic" && (
        <div
          style={{ marginRight: "5px", marginTop: "5px", marginBottom: "5px", marginLeft: "5px" }}
        >
          {" "}
          <Button variant="contained" onClick={GenerateNumberHandler}>
            Generate
          </Button>{" "}
        </div>
      )}
    </div>
  );
};

TableToolbar.propTypes = {
  setGlobalFilter: PropTypes.func.isRequired,
};

export default TableToolbar;
