import * as React from "react";
import {
  Dialog,
  DialogContent,
  Alert,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  Autocomplete,
  Stack,
  CircularProgress,
  FormHelperText
} from "@material-ui/core";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "src/store";
import toast from "react-hot-toast";
import { getCollegeEventListMaster } from "src/store/actions/getCollegeEventAction";
import { getEventTypeList } from "src/store/actions/getEventTypeAction";
import { getCollegeEventDates, saveCollegeEventDates, updateCollegeEventDates } from "src/store/actions/CollegeEventDatesAction";

const initialCollageEventDates = {
  "ClgEventId": 0,
  "EventTypeId": 0,
  "ClgEventDef": "",
  "ClgEventDate": "",
  "Status": "A"
}
const initialCollageEventDatesValidator = {
  validator: {
    ClgEventId: (value = "") => parseInt(value, 10) > 0,
    EventTypeId: (value = "") => parseInt(value, 10) > 0,
    ClgEventDef: (value = "") => ['S', 'E'].includes(value.trim()),
    ClgEventDate: (value = "") => value?.trim().length >= 2,
    Status: (value = "") => ['A', 'I'].includes(value.trim())
  },
  errorMessage: {
    ClgEventId: "Please select valid College Event.",
    EventTypeId: "Please select valid Event Type.",
    ClgEventDef: "Please valid Event Definition",
    ClgEventDate: "Please valid Event Date",
    Status: "Please select valid Status.",
  }
}
const contentStatus = [
  { Status: 'A', Lebel: 'Active' },
  { Status: 'I', Lebel: 'Inactive' }
]
const dateDiffs = [
  { Status: 'S', Lebel: 'Start Date' },
  { Status: 'E', Lebel: 'End Date' }
]
export default function AddCollegeEventDates({ openImport, setOpenImport, ClgEventDateId = 0, pageNo = 1, limit = 10 }) {
  const dispatch = useDispatch();
  // const [message, setIsMessage] = useState(false);
  // const [selectedFile, setSelectedFile] = useState();  
  // const [MessageObj, setMessage] = useState({
  //   type: 'success',
  //   message: '',
  //   deiails: { Inserted: 0, Updated: 0, ErrorInRow: 0, ErrorMessage: '' }
  // })
  const [collageEventData, setCollageEventData] = useState(initialCollageEventDates);
  const { validator, errorMessage } = initialCollageEventDatesValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCollageEventData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](collageEventData[field])
    } else {
      isValid = Object.keys(collageEventData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && collageEventData[field]?.length > 0) {
      isValid = validator[field](collageEventData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allCollegeEventDatesData = useSelector(
    (state: any) => state?.getCollegeEventDates?.collegeEventDatesResponse?.data
  )

  useEffect(() => {
    dispatch(getCollegeEventListMaster());
    dispatch(getEventTypeList());
  }, []);

  useEffect(() => {
    if (ClgEventDateId > 0) {
      const rowData = allCollegeEventDatesData?.rows?.find((itm) => itm?.ClgEventDateId === ClgEventDateId);
      console.log("rowData", rowData);
      setCollageEventData({
        "ClgEventId": rowData?.ClgEventId,
        "EventTypeId": rowData?.EventTypeId,
        "ClgEventDef": rowData?.ClgEventDef,
        "ClgEventDate": rowData?.ClgEventDate,
        "Status": rowData?.Status
      })
    }
  }, [ClgEventDateId])

  const collegeEvent = useSelector(
    (state: any) => state?.getCollegeEventList?.collegeEventListResponse?.data
  )
  const EventTypeList = useSelector(
    (state: any) => state?.getEventTypeList?.eventTypeListResponse?.data
  )
  console.log("EventTypeList ==>", EventTypeList)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", ClgEventDateId);
    if (ClgEventDateId > 0) {
      // Update Dispatcher
      dispatch(updateCollegeEventDates(ClgEventDateId, collageEventData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCollageEventData(initialCollageEventDates)
          setOpenImport(!openImport);
          dispatch(getCollegeEventDates(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", collageEventData)
      // Save Dispatcher
      dispatch(saveCollegeEventDates(collageEventData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCollageEventData(initialCollageEventDates)
          setOpenImport(!openImport);
          dispatch(getCollegeEventDates(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }

  interface EntityList {
    EntityName: string;
    EntityId: string;
  }

  return (
    <div id="addCollage">
      <Dialog open={openImport} fullWidth={true} maxWidth="md">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(ClgEventDateId === 0) ? 'Add' : 'Edit'} College Event Date </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label2">College Event</InputLabel>
                  <Select
                    id="ClgEventId"
                    name="ClgEventId"
                    value={collageEventData.ClgEventId}
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("ClgEventId")}
                    required
                  >
                    {
                      collegeEvent?.length > 0
                      && collegeEvent?.map((item) => (<MenuItem value={item?.CollegeEventId}>{item?.CollegeEventHeading}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("ClgEventId")}</FormHelperText>
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Event Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="EventTypeId"
                    name="EventTypeId"
                    value={collageEventData.EventTypeId}
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("EventTypeId")}
                    required
                  >
                    {
                      EventTypeList?.length > 0
                      && EventTypeList?.map((item) => (<MenuItem value={item?.EventtypeId}>{item?.EventtypeName}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("EventTypeId")}</FormHelperText>
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Event Date Definition</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="ClgEventDef"
                    name="ClgEventDef"
                    value={collageEventData.ClgEventDef}
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      dateDiffs?.length > 0
                      && dateDiffs?.map((item) => (<MenuItem value={item?.Status}>{item?.Lebel}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("ClgEventDef")}</FormHelperText>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label1">Event Date</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="ClgEventDate"
                    value={collageEventData.ClgEventDate}
                    error={!fieldValidate("ClgEventDate")}
                    helperText={handleErrorMessage("ClgEventDate")}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="Status"
                    name="Status"
                    value={collageEventData.Status}
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      contentStatus?.length > 0
                      && contentStatus?.map((item) => (<MenuItem value={item?.Status}>{item?.Lebel}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("Status")}</FormHelperText>
                </Grid>
              </Grid>
              <Button
                sx={{ mt: 2, float: 'right' }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(ClgEventDateId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
