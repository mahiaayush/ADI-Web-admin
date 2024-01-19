import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  MenuItem,
  NativeSelect,
  Select,
  InputLabel,
  CircularProgress,
  OutlinedInput,
  Checkbox,
  ListItemText,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import * as React from "react";
import { DetailAction } from "src/store/actions/DetailAction";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { POST_INTERVIEW_FEEDBACK, ADMIN_API_ENDPOINT_V2 } from "src/store/constants"
import { useDispatch, useSelector } from "../../store";
import PayrollListAction from '../../store/actions/PayrollListAction'
import http from "../../utils/http";
import InterviewTitleAction from "src/store/actions/InterviewTitleAction";
import { useParams } from "react-router";
import { getLocalTime } from "src/utils/utility";
import interviewerLanguagesAction from "src/store/actions/interviewerLanguagesAction";

const useStyles = makeStyles({
  mainParentFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  languageBoxChild: {
    fontWeight: 700,
    marginRight: "100px",
  },
  fontClass: {
    fontWeight: 700
  },
  totalMarksBox: { 
  border: "1px solid black", 
  width: "50px", 
  height: "30px", 
  fontWeight: 700 
  },
  plansPayrollBox: {
  "fontWeight": "bold",
  "textAlign": "left",
  "marginBottom": "0px",
  //  color: "#172b4d" 
 },
 topNameDate: {
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
   listStyle: "none",
   fontWeight: "bolder",
   padding: "0 10px 0 10px",
   textTransform: "uppercase"
 },
 remarksClass: {
   fontWeight: 700,
   textAlign: "left",
 },
 planTypesClass: {
   transform: "scale(0.9)",
   marginRight: "-25px"
 },
 spinnerClass: {
   marginTop: "100px",
   marginLeft: "50px",
   minHeight: "100vh",
   minWidth: "500px"
 }
});

export default function InterviewFeedbackForm({
  getCounsellorData,
  feedbackForm,
  setFeedbackForm,
}) {
  const [interviewStatus, setInterviewStatus] = useState("PASSED");
  const [language, setLanguage] = React.useState<string[]>([]);
  const [interviewRemarksText, setInterviewRemarksText] = useState('');
  const [checkitm, setCheckitm] = useState(false);
  const [payrollType, setPayrollType] = useState<string>('');
  const [titleData, setTitleData] = useState([])

  const dispatch = useDispatch();
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    dispatch(PayrollListAction())
    dispatch(interviewerLanguagesAction())
}, [])

useEffect(() => {
  dispatch(InterviewTitleAction())
}, [])

const activeLanguages = useSelector((state) => state?.activeLanguages?.interviewActiveLanguages?.data)

const InterviewTitles = useSelector((state) => state?.interviewTitle?.interviewTitleResponse?.data?.data);
  useEffect(() => {
    if (language?.length > 0 && interviewStatus.length !== 0 && interviewRemarksText.trim().length !== 0) {
        setCheckitm(false)
    } else {
        setCheckitm(true)
    }
}, [language, interviewStatus, interviewRemarksText])

const payrollList = useSelector((state:any) => state.payrollList.payrollListResponse.data); 

  useEffect(() => {
    if (activeLanguages?.length > 0) {
      setLanguage([activeLanguages?.[0]?.LanguageName])
    }
  }, [activeLanguages])

  useEffect(() => {
    if (payrollList?.length > 0) {
      setPayrollType(payrollList?.[0]?.PayrollId)
    }
  }, [payrollList])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLanguage(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const options = [
    { value: 0, label: "0" },
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
  ];

  const handleRadio = (e) => {
    setInterviewStatus(e.target.value)  
  }

  const getTotalHandler = (item, index, event) => {
    const dataValue = [...titleData]
    dataValue[index].value = parseInt(event, 10)
    setTitleData(dataValue);
  };

  useEffect(() => {
    if (typeof InterviewTitles !== 'undefined') {
      const dataVal = JSON.parse(JSON.stringify(InterviewTitles));
      dataVal.map((item, index) => {
        return item.value = 0
      })
    setTitleData(dataVal)
  }
}, [InterviewTitles])

  const TotalMarks = titleData.reduce((total, option) => {
      return total += option.value    
  }, 0);
 
  const handleClose = () => {
    setFeedbackForm(false);
  };

  const SubmitHandler = async () => {
    const tempArr = {};

    for (let i = 0; i < titleData.length; i++) {
      tempArr[titleData[i].InterviewId] = titleData[i].value
    }
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${POST_INTERVIEW_FEEDBACK}`,
        {
          "ApplicationId": getCounsellorData?.APPLICATION_ID,
          "InterviewScore": tempArr,
          "PayrollId": payrollType,
          "LanguagePreference": language,
          "InterviewRemark": interviewRemarksText,
          "InterviewStatus": interviewStatus
        },
      );
      if (res.data.status === true) {
        setFeedbackForm(false);
        dispatch(DetailAction(id))
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <Dialog open={feedbackForm} className="aprovelPop" onClose={handleClose}>
      {(InterviewTitles) ? <> <DialogTitle>INTERVIEW FEEDBACK FORM</DialogTitle>
        <ul className={classes.topNameDate}>
        <li>{`${getCounsellorData?.FIRST_NAME} ${getCounsellorData?.LAST_NAME}`}</li>
        <li>{getLocalTime(getCounsellorData?.interviewEndDate)[4]}</li>
        </ul>
        <DialogContent dividers={true} sx={{ minWidth: 120, p: 0, overflow: "visible" }}>
          {titleData.map((item, index) => (
            <ul className="parent-class-dialog">
              <li className={classes.fontClass}>{item.InterviewTitle}</li>
              <NativeSelect
                defaultValue={0}
                onChange={(e) => getTotalHandler(item, index, e.target.value)}
                variant="outlined"
              >
               {options.map((fieldItem, fieldIndex) => {
                 return (
                   <option value={fieldItem.value}>{fieldItem.label}</option>
                 )
               })}
              </NativeSelect>
            </ul>
          ))}
          <ul className="parent-class-dialog">
            <li className={classes.fontClass}>Total</li>
            <li className={classes.totalMarksBox}>{TotalMarks}</li>
          </ul>
          <DialogContentText color="dimgrey">
            <div className={classes.mainParentFlex}>
                <p className={classes.plansPayrollBox}>SELECT PAYOUT TYPE</p>
                <NativeSelect
                  id="demo-simple-select"
                  value={payrollType}
                  onChange={(e) => setPayrollType(e.target.value)}
                  style={{ width: "38%" }}
                >
                  {
                    payrollList?.length > 0 && payrollList.map((item, index) => (
                    <option key={index.toString()} value={item.PayrollId}>{item.PayrollName}</option>
                    ))
                  }
                </NativeSelect>
              </div>
            </DialogContentText>
            <div className={classes.mainParentFlex}>
            <InputLabel id="demo-multiple-name-label" className={classes.languageBoxChild}>LANGUAGE</InputLabel>
          <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={language}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          >
          {activeLanguages?.map((langname) => (
            <MenuItem key={langname?.LanguageId} value={langname?.LanguageName}>
              <Checkbox checked={language.includes(langname.LanguageName)} />
              <ListItemText primary={langname?.LanguageNameEn} />
            </MenuItem>
          ))}
        </Select>
            </div>
            <p className={classes.remarksClass}>REMARKS *</p>
            <textarea className="text" onChange={(e) => setInterviewRemarksText(e.target.value)} />
            <div>
            <RadioGroup 
              className="parent-Divs"
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={interviewStatus}
              name="radio-buttons-group"
              style={{ flexDirection: 'initial', margin: "20px 0 0 165px" }}
            >
              <FormControlLabel
                value="PASSED"
                control={<Radio />}
                label="PASSED"
                onChange={handleRadio}
                // style={{ fontWe }}
              />
              <FormControlLabel
                value="FAILED"
                control={<Radio />}
                label="FAILED"
                onChange={handleRadio}
              />
            </RadioGroup>
            </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={SubmitHandler} disabled={checkitm}>
              Submit
            </Button>
        </DialogActions></> : <div className={classes.spinnerClass}><CircularProgress /></div>}
      </Dialog>
    </>
  );
}
