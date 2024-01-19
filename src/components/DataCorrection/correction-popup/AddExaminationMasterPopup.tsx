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
  TextareaAutosize
} from "@material-ui/core";
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "src/store";
import toast from "react-hot-toast";
import { getMasterExamination, saveMasterExamination, updateMasterExamination } from "src/store/actions/MasterExaminationAction";
import { getExamTypeList } from "src/store/actions/getExamTypeAction";
import { DatePicker, DesktopDatePicker, MobileDatePicker, TimePicker } from "@material-ui/lab";
import moment from "moment";
import { isMatch } from "date-fns";

const initialMasterExamination = {
  ExamLongname: '',
  ExamShortname: '',
  ExamTypeId: 0,
  ExamOverview: '',
  ExamCoveredColleges: '',
  ExamCoveredCourses: '',
  ExamDateApplication: '', // moment().format('YYYY-MM-DD'),
  ExamDateExam: '', // moment().format('YYYY-MM-DD'),
  ExamEligibilityAgeCriteria: '',
  ExamEligibilityQualification: '',
  ExamEligibilityMark: '',
  ExamDuration: '',
  ExamSectionNum: 0,
  ExamHelpdeskwebsite: '',
  ExamHelpdeskPhone: '',
  Status: 'A'
}
const StatusOptions = [
  { Status: 'A', Lebel: 'Active' },
  { Status: 'I', Lebel: 'Inactive' }
]
const MasterExaminationValidator = {
  validator: {
    ExamLongname: (value = "") => !!value?.trim(),
    ExamShortname: (value = "") => !!value?.trim(),
    ExamTypeId: (value = "") => /^\d+\.?\d*$/.test(value),
    ExamOverview: (value = "") => !!value?.trim(),
    ExamCoveredColleges: (value = "") => !!value?.trim(),
    ExamCoveredCourses: (value = "") => !!value?.trim(),
    ExamDateApplication: (value = "") => isMatch(value, 'yyyy-MM-dd'),
    ExamDateExam: (value) => isMatch(value, 'yyyy-MM-dd'),
    ExamEligibilityAgeCriteria: (value = "") => !!value?.trim(),
    ExamEligibilityQualification: (value = "") => !!value?.trim(),
    ExamEligibilityMark: (value = "") => !!value?.trim(),
    ExamDuration: (value = "") => value?.length > 3,
    ExamSectionNum: (value = "") => /^\d+\.?\d*$/.test(value),
    ExamHelpdeskwebsite: (value = "") => !!value?.trim(),
    ExamHelpdeskPhone: (value = "") => !!value?.trim()
  },
  errorMessage: {
    ExamLongname: 'Please fill valid Exam Longname ',
    ExamShortname: 'Please fill valid Exam Shortname',
    ExamTypeId: 'Please select valid Exam Type',
    ExamOverview: 'Please fill valid Exam Overview',
    ExamCoveredColleges: 'Please fill valid Exam Covered Colleges',
    ExamCoveredCourses: 'Please fill valid Exam Covered Courses',
    ExamDateApplication: 'Please fill valid Exam Date Application',
    ExamDateExam: 'Please fill valid Exam Date Exam',
    ExamEligibilityAgeCriteria: 'Please fill valid Exam Eligibility Age Criteria',
    ExamEligibilityQualification: 'Please fill valid Exam Eligibility Qualification',
    ExamEligibilityMark: 'Please fill valid Exam Eligibility Mark',
    ExamDuration: 'Please fill valid Exam Duration',
    ExamSectionNum: 'Please fill valid Exam Section Num',
    ExamHelpdeskwebsite: 'Please fill valid Exam Helpdesk website',
    ExamHelpdeskPhone: 'Please fill valid Exam Helpdesk Phone'
  }
}

export default function AddMasterExaminationPopup({ openImport, setOpenImport, ExamId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [MasterExaminationData, setMasterExaminationData] = useState(initialMasterExamination);
  const { validator, errorMessage } = MasterExaminationValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setMasterExaminationData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](MasterExaminationData[field])
    } else {
      isValid = Object.keys(MasterExaminationData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && MasterExaminationData[field]?.length > 0) {
      isValid = validator[field](MasterExaminationData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !fieldValidate(field) ? errorMessage[field] : '';
  }

  const allMasterExaminationData = useSelector(
    (state: any) => state?.getMasterExamination?.MasterExaminationResponse?.data
  )
  useEffect(() => {
    dispatch(getExamTypeList());
  }, []);
  const ExamtypeData = useSelector(
    (state: any) => state?.getExamTypeList?.examTypeListResponse?.data
  )
  useEffect(() => {
    if (ExamId > 0) {
      const rowData = allMasterExaminationData?.rows?.find((item) => item?.ExamId === ExamId);
      setMasterExaminationData({
        ExamLongname: rowData?.ExamLongname,
        ExamShortname: rowData?.ExamShortname,
        ExamTypeId: rowData?.ExamTypeId,
        ExamOverview: rowData?.ExamOverview,
        ExamCoveredColleges: rowData?.ExamCoveredColleges,
        ExamCoveredCourses: rowData?.ExamCoveredCourses,
        ExamDateApplication: rowData?.ExamDateApplication,
        ExamDateExam: rowData?.ExamDateExam || "",
        ExamEligibilityAgeCriteria: rowData?.ExamEligibilityAgeCriteria,
        ExamEligibilityQualification: rowData?.ExamEligibilityQualification,
        ExamEligibilityMark: rowData?.ExamEligibilityMark,
        ExamDuration: rowData?.ExamDuration || "",
        ExamSectionNum: rowData?.ExamSectionNum || "",
        ExamHelpdeskwebsite: rowData?.ExamHelpdeskwebsite || "",
        ExamHelpdeskPhone: rowData?.ExamHelpdeskPhone || "",
        Status: rowData?.Status
      })
    }
  }, [ExamId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ExamId > 0) {
      // Update Dispatcher
      dispatch(updateMasterExamination(ExamId, MasterExaminationData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setMasterExaminationData(initialMasterExamination)
          setOpenImport(!openImport);
          dispatch(getMasterExamination(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveMasterExamination(MasterExaminationData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setMasterExaminationData(initialMasterExamination)
          setOpenImport(!openImport);
          dispatch(getMasterExamination(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }

  return (
    <div id="dsdds">
      <Dialog open={openImport} fullWidth={true} maxWidth="md">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(ExamId === 0) ? 'Add' : 'Edit'} Examination-Master </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamLongname</InputLabel>
                  <TextField
                    id="ExamLongname"
                    name="ExamLongname"
                    value={MasterExaminationData.ExamLongname}
                    onChange={handleChange}
                    error={!fieldValidate("ExamLongname")}
                    helperText={handleErrorMessage("ExamLongname")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamShortname</InputLabel>
                  <TextField
                    id="ExamShortname"
                    name="ExamShortname"
                    value={MasterExaminationData.ExamShortname}
                    onChange={handleChange}
                    error={!fieldValidate("ExamShortname")}
                    helperText={handleErrorMessage("ExamShortname")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamTypeName</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="ExamTypeID"
                    name="ExamTypeId"
                    value={MasterExaminationData.ExamTypeId}
                    placeholder="OccupationQualification "
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    size="small"
                    error={!fieldValidate("ExamTypeId")}
                    required
                  >
                    {
                      ExamtypeData?.length > 0
                      && ExamtypeData?.map((item) => (<MenuItem value={item?.ExamTypeId}>{item?.ExamTypeName}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamOverview</InputLabel>
                  <TextField
                    id="ExamOverview"
                    name="ExamOverview"
                    value={MasterExaminationData.ExamOverview}
                    onChange={handleChange}
                    error={!fieldValidate("ExamOverview")}
                    helperText={handleErrorMessage("ExamOverview")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamCoveredColleges</InputLabel>
                  <TextField
                    id="ExamCoveExamtypeDataredColleges"
                    name="ExamCoveredColleges"
                    value={MasterExaminationData.ExamCoveredColleges}
                    onChange={handleChange}
                    error={!fieldValidate("ExamCoveredColleges")}
                    helperText={handleErrorMessage("ExamCoveredColleges")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamCoveredCourses</InputLabel>
                  <TextField
                    id="ExamCoveredCourses"
                    name="ExamCoveredCourses"
                    value={MasterExaminationData.ExamCoveredCourses}
                    onChange={handleChange}
                    error={!fieldValidate("ExamCoveredCourses")}
                    helperText={handleErrorMessage("ExamCoveredCourses")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamDateApplication</InputLabel>
                  <DatePicker inputFormat="yyyy-MM-dd" onChange={(ExamDateApplication) => setMasterExaminationData((prevState) => ({ ...prevState, ExamDateApplication: moment(ExamDateApplication).format('YYYY-MM-DD') }))} value={MasterExaminationData.ExamDateApplication} renderInput={(params) => <TextField {...params} variant="outlined" size="small" sx={{ width: '100%' }} error={!fieldValidate("ExamDateApplication")} helperText={handleErrorMessage("ExamDateApplication")} />} />
                  {/* <TextField
                    type="date"
                    id="ExamDateApplication"
                    name="ExamDateApplication"
                    value={MasterExaminationData.ExamDateApplication}
                    onChange={handleChange}
                    error={!fieldValidate("ExamDateApplication")}
                    helperText={handleErrorMessage("ExamDateApplication")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  /> */}
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamDateExam</InputLabel>
                  <DatePicker inputFormat="yyyy-MM-dd" onChange={(ExamDateExam) => setMasterExaminationData((prevState) => ({ ...prevState, ExamDateExam: moment(ExamDateExam).format('YYYY-MM-DD') }))} value={MasterExaminationData.ExamDateExam} renderInput={(params) => <TextField {...params} variant="outlined" type="date" size="small" sx={{ width: '100%' }} error={!fieldValidate("ExamDateExam")} helperText={handleErrorMessage("ExamDateExam")} />} />
                  {/* <TextField
                    type="date"
                    id="ExamDateExam"
                    name="ExamDateExam"
                    value={MasterExaminationData.ExamDateExam}
                    onChange={handleChange}
                    error={!fieldValidate("ExamDateExam")}
                    helperText={handleErrorMessage("ExamDateExam")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  /> */}
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamEligibilityAgeCriteria</InputLabel>
                  <TextField
                    id="ExamEligibilityAgeCriteria"
                    name="ExamEligibilityAgeCriteria"
                    value={MasterExaminationData.ExamEligibilityAgeCriteria}
                    onChange={handleChange}
                    error={!fieldValidate("ExamEligibilityAgeCriteria")}
                    helperText={handleErrorMessage("ExamEligibilityAgeCriteria")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamEligibilityQualification</InputLabel>
                  <TextField
                    id="ExamEligibilityQualification"
                    name="ExamEligibilityQualification"
                    value={MasterExaminationData.ExamEligibilityQualification}
                    onChange={handleChange}
                    error={!fieldValidate("ExamEligibilityQualification")}
                    helperText={handleErrorMessage("ExamEligibilityQualification")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamEligibilityMark</InputLabel>
                  <TextField
                    id="ExamEligibilityMark"
                    name="ExamEligibilityMark"
                    value={MasterExaminationData.ExamEligibilityMark}
                    onChange={handleChange}
                    error={!fieldValidate("ExamEligibilityMark")}
                    helperText={handleErrorMessage("ExamEligibilityMark")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamDuration</InputLabel>
                  <TimePicker
                    ampm={false}
                    openTo="hours"
                    views={['hours', 'minutes', 'seconds']}
                    inputFormat="HH:mm:ss"
                    mask="__:__:__"
                    value={moment(`${moment().format('L')} ${MasterExaminationData.ExamDuration}`).toDate()}
                    onChange={(ExamDuration) => setMasterExaminationData((prevState) => ({ ...prevState, ExamDuration: moment(ExamDuration).format('HH:mm:ss') }))}
                    renderInput={(params) => <TextField {...params} size="small" sx={{ width: '100%' }} error={!fieldValidate("ExamDuration")} helperText={handleErrorMessage("ExamDuration")} />}
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamSectionNum</InputLabel>
                  <TextField
                    id="ExamSectionNum"
                    name="ExamSectionNum"
                    value={MasterExaminationData.ExamSectionNum}
                    onChange={handleChange}
                    error={!fieldValidate("ExamSectionNum")}
                    helperText={handleErrorMessage("ExamSectionNum")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamHelpdeskwebsite</InputLabel>
                  <TextField
                    id="ExamHelpdeskwebsite"
                    name="ExamHelpdeskwebsite"
                    value={MasterExaminationData.ExamHelpdeskwebsite}
                    onChange={handleChange}
                    error={!fieldValidate("ExamHelpdeskwebsite")}
                    helperText={handleErrorMessage("ExamHelpdeskwebsite")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">ExamHelpdeskPhone</InputLabel>
                  <TextField
                    id="ExamHelpdeskPhone"
                    name="ExamHelpdeskPhone"
                    value={MasterExaminationData.ExamHelpdeskPhone}
                    onChange={handleChange}
                    error={!fieldValidate("ExamHelpdeskPhone")}
                    helperText={handleErrorMessage("ExamHelpdeskPhone")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="Status"
                    name="Status"
                    value={MasterExaminationData.Status}
                    label="Status "
                    placeholder="Status "
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      StatusOptions?.length > 0
                      && StatusOptions?.map((item) => (<MenuItem value={item?.Status}>{item?.Lebel}</MenuItem>))
                    }
                  </Select>
                </Grid>
              </Grid>
              <Button
                sx={{ float: "right" }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(ExamId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
