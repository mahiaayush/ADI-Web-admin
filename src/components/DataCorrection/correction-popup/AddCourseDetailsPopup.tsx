import * as React from "react";
import {
  Dialog,
  DialogContent,
  Alert,
  Grid,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  ListItemIcon,
  Select,
  Checkbox,
  ListItemText,
  FormHelperText
} from "@material-ui/core";

import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import store, { useDispatch, useSelector } from "src/store";
import toast from "react-hot-toast";
import { getCourseList } from "src/store/actions/CourseFaqAction";
import { getCourseDetails, getTopicList, saveCourseDetails, updateCourseDetails } from "src/store/actions/CourseDetailsAction";
import { getIntrestPathwayList, getLanguageList, getPublisherList, getSkillList } from "src/store/actions/Language";
import { getCourseTypeList } from "src/store/actions/CourseTypeAction";
import { getCareerCourseLevelList } from "src/store/actions/CareerCourseLevelAction";
import { GET_LANGUAGE_LIIST_ERROR, GET_PUBLISHER_LIST_ERROR } from "src/store/constants";

// String.prototype.stripslashes = function () {
//   return (this + '').replace(/\\(.?)/g, function (s,n1) {
//       switch (n1) {
//           case '\\':
//               return '\\';
//           case '0':
//               return '\u0000';
//           case '':
//               return '';
//           default:
//               return n1;
//       }
//   });
// }

const initialCourseDetails = {
  PublisherId: 0,
  VtCourseId: '',
  ItemId: '',
  Cuk: '',
  CourseTitle: '',
  CourseSubtitle: '',
  CoursePrice: 0,
  CourseSlug: '',
  CourseDescription: '',
  CoursePrerequisites: '',
  CourseRequirements: '',
  CourseThumbnail: '',
  CourseVideo: '',
  CourseBanner: '',
  TopicId: 0,
  CourseTypeId: 0,
  CourseLevelId: 0,
  CourseDuration: '',
  CourseLanguage: [],
  CourseGrades: [],
  CoursePathways: [],
  CourseSkills: [],
  WhatYouLearn: '',
  WhatYouGet: '',
  HasAssessment: '',
  HasCertification: '',
  RenewalCycle: 0,
  BatchStartDt: '',
  BatchEndDt: '',
  BatchNextDt: '',
  Status: 'A',
  ZohoVariantId: ''
}
const StatusOptions = [
  { Status: 'A', Lebel: 'Active' },
  { Status: 'I', Lebel: 'Inactive' }
]
const HasAssessmentOptions = [
  { HasAssessment: 'Y', Lebel: 'Y' },
  { HasAssessment: 'N', Lebel: 'N' }
]
const HasCertificationOptions = [
  { HasCertification: 'Y', Lebel: 'Y' },
  { HasCertification: 'N', Lebel: 'N' }
]
const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const courseDetailsValidator = {
  validator: {
    PublisherId: (value = "") => parseInt(value, 10) > 0,
    VtCourseId: (value = "") => parseInt(value, 10) > 0,
    ItemId: (value = "") => parseInt(value, 10) > 0,
    Cuk: (value = "") => value?.trim()?.length > 0,
    CourseTitle: (value = "") => value?.trim()?.length > 0,
    CourseSubtitle: (value = "") => value?.trim()?.length > 0,
    CoursePrice: (value = "") => parseInt(value, 10) >= 0,
    CourseSlug: (value = "") => value?.trim()?.length > 0,
    CourseDescription: (value = "") => value?.trim()?.length > 0,
    CourseThumbnail: (value = "") => value?.trim()?.length > 0,
    CourseVideo: (value = "") => value?.trim()?.length > 0,
    CourseBanner: (value = "") => value?.trim()?.length > 0,
    TopicId: (value = "") => parseInt(value, 10) > 0,
    CourseTypeId: (value = "") => parseInt(value, 10) > 0,
    CourseLevelId: (value = "") => parseInt(value, 10) > 0,
    CourseDuration: (value = "") => value?.trim()?.length > 0,
    CourseLanguage: (value: any[]) => value.length > 0,
    CourseGrades: (value: any[]) => value.length > 0,
   // CoursePathways: (value: any[]) => value.length > 0,
    RenewalCycle: (value = "") => /^\d+\.?\d*$/.test(value),
  },
  errorMessage: {
    PublisherId: 'Please select valid',
    VtCourseId: 'fill a valid veative course id',
    ItemId: 'Please select valid',
    Cuk: 'Please select valid',
    CourseTitle: 'Please fill valid data',
    CourseSubtitle: 'Please fill valid data',
    CoursePrice: 'Please select valid',
    CourseSlug: 'Please fill valid data',
    CourseDescription: 'Please fill valid data',
    CourseThumbnail: 'Please fill valid data',
    CourseVideo: 'Please fill valid data',
    CourseBanner: 'Please fill valid data',
    TopicId: 'Please select valid',
    CourseTypeId: 'Please select valid',
    CourseLevelId: 'Please select valid',
    CourseDuration: 'Please fill valid data',
    CourseLanguage: 'Please Select Language.',
    CourseGrades: 'Please Select Language.',
    // CoursePathways: 'Please Select Language.',
    HasAssessment: 'Please select valid data',
    HasCertification: 'Please select valid data',
    RenewalCycle: 'Please select valid'
  }
}
const GradeListData = [
  { label: 'Grade 1', value: 'Grade 1' },
  { label: 'Grade 2', value: 'Grade 2' },
  { label: 'Grade 3', value: 'Grade 3' },
  { label: 'Grade 4', value: 'Grade 4' },
  { label: 'Grade 5', value: 'Grade 5' },
  { label: 'Grade 6', value: 'Grade 6' },
  { label: 'Grade 7', value: 'Grade 7' },
  { label: 'Grade 8', value: 'Grade 8' },
  { label: 'Grade 9', value: 'Grade 9' },
  { label: 'Grade 10', value: 'Grade 10' },
  { label: 'Grade 11', value: 'Grade 11' },
  { label: 'Grade 12', value: 'Grade 12' },
];

function AddCourseDetailsPopup({ openImport, setOpenImport, CourseId = 0, pageNo = 1, limit = 10, type, allCourseDetailsData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courseDetailsData, setCourseDetailsData] = useState(initialCourseDetails);
  const [Language, setLanguage] = useState([]);
  const [Grade, setGrade] = useState([]);
  const [CoursePathways, setCoursePathways] = useState([])
  const [Skills, setSkills] = useState([])
  const { validator, errorMessage } = courseDetailsValidator;
  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target;
      setCourseDetailsData((prevState) => ({ ...prevState, [field]: value }))
  }

  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](courseDetailsData[field])
    } else {
      isValid = Object.keys(courseDetailsData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && courseDetailsData[field]?.length > 0) {
      isValid = validator[field](courseDetailsData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  useEffect(() => {
    dispatch(getPublisherList());
    dispatch(getTopicList());
    dispatch(getCourseTypeList());
    dispatch(getCareerCourseLevelList());
    dispatch(getLanguageList());
    dispatch(getSkillList());
    dispatch(getIntrestPathwayList());
  }, []);
  
  const PublisherListData = useSelector(
    (state: any) => state?.getPublisherList?.PublisherListResponse?.data
  )
  const TopicListData = useSelector(
    (state: any) => state?.getTopicList?.TopicListResponse?.data
  )
  const CourseTypeListData = useSelector(
    (state: any) => state?.getCourseTypeList?.CourseTypeListResponse?.data
  )
  const CourseLevelListData = useSelector(
    (state: any) => state?.getCareerCourseLevelList?.CareerCourseLevelListResponse?.data
  )
  const LanguageListData = useSelector(
    (state: any) => state?.getLanguageList?.LanguageListResponse?.data
  )
  const SkillListData = useSelector(
    (state: any) => state?.getSkillList?.SkillListResponse?.data
  )
  const IntrestPathwayListData = useSelector(
    (state: any) => state?.getIntrestPathwayList?.IntrestPathwayListResponse?.data
  )
  const handleChangeLanguage = async (e: any) => {
    const { name: field, value, checked } = e.target;
    setLanguage(value)
    const selectedLanguage = LanguageListData.filter((item: any) => value.indexOf(item.name) !== -1)
    setCourseDetailsData((prevState) => ({ ...prevState, [field]: selectedLanguage }))
  }
  const handleChangeGrade = async (e: any) => {
    const { name: field, value, checked } = e.target;
    setGrade(value);
    const selectedGrade = GradeListData.filter((item: any) => value?.indexOf(item.value) !== -1)
    setCourseDetailsData((prevState) => ({ ...prevState, [field]: selectedGrade }))
  }
  const handleChangePathways = async (e: any) => {
    const { name: field, value, checked } = e.target;
    setCoursePathways(value);
    const selectedIntrestPathway = IntrestPathwayListData.filter((item: any) => value?.indexOf(item.InterestName) !== -1)?.map((itm: any) => ({ id: itm.InterestId, name: itm.InterestName }))
    setCourseDetailsData((prevState) => ({ ...prevState, [field]: selectedIntrestPathway }))
  }
  const handleChangeSkills = async (e: any) => {
    const { name: field, value, checked } = e.target;
    setSkills(value);
    const selectedSkills = SkillListData.filter((item: any) => value?.indexOf(item.SkillName) !== -1)?.map((itm: any) => ({ id: itm.SkillId, name: itm.SkillName }))
    setCourseDetailsData((prevState) => ({ ...prevState, [field]: selectedSkills }))
  }
  useEffect(() => {
    if (CourseId > 0) {
      let Languages = [];
      let Grades = [];
      let Pathways = [];
      let Skills = [];
      const rowData = allCourseDetailsData?.rows?.find((itm) => itm?.CourseId === CourseId);
      if (rowData.CourseLanguage !== "") {
          Languages = JSON.parse(rowData.CourseLanguage)
          setLanguage(Languages.map((itm: any) => itm.name))
      }
      if (rowData.CourseGrades && rowData.CourseGrades !== "") {
        Grades = JSON.parse(rowData.CourseGrades)
        setGrade(Grades.map((itm: any) => itm.label))
      }
      if (rowData.CoursePathways && rowData.CoursePathways !== "") {
        Pathways = JSON.parse(rowData.CoursePathways)
        setCoursePathways(Pathways?.map((itm: any) => itm.name))
      }
      if (rowData.CourseSkills && rowData.CourseSkills !== "") {
        Skills = JSON.parse(rowData.CourseSkills)
        setSkills(Skills?.map((itm: any) => itm.name))
      }
      setCourseDetailsData({
        PublisherId: rowData?.PublisherId,
        VtCourseId: rowData?.VtCourseId,
        ItemId: rowData?.ItemId,
        Cuk: rowData?.Cuk,
        CourseTitle: rowData?.CourseTitle,
        CourseSubtitle: rowData?.CourseSubtitle,
        CoursePrice: rowData?.CoursePrice,
        CourseSlug: rowData?.CourseSlug,
        CourseDescription: rowData?.CourseDescription,
        CoursePrerequisites: rowData?.CoursePrerequisites,
        CourseRequirements: rowData?.CourseRequirements,
        CourseThumbnail: rowData?.CourseThumbnail,
        CourseVideo: rowData?.CourseVideo,
        CourseBanner: rowData?.CourseBanner,
        TopicId: rowData?.TopicId,
        CourseTypeId: rowData?.CourseTypeId,
        CourseLevelId: rowData?.CourseLevelId,
        CourseDuration: rowData?.CourseDuration,
        CourseLanguage: Languages,
        CourseGrades: Grades,
        CoursePathways: Pathways,
        CourseSkills: Skills,
        WhatYouLearn: rowData?.WhatYouLearn,
        WhatYouGet: rowData?.WhatYouGet,
        HasAssessment: rowData?.HasAssessment,
        HasCertification: rowData?.HasCertification,
        RenewalCycle: rowData?.RenewalCycle,
        BatchStartDt: rowData?.BatchStartDt,
        BatchEndDt: rowData?.BatchEndDt,
        BatchNextDt: rowData?.BatchNextDt,
        Status: rowData?.Status,
        ZohoVariantId: rowData?.ZohoVariantId
      })
    }
  }, [CourseId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (CourseId > 0) {
      // Update Dispatcher
      dispatch(updateCourseDetails(CourseId, courseDetailsData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseDetailsData(initialCourseDetails)
          setOpenImport(!openImport);
          dispatch(getCourseDetails(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveCourseDetails(courseDetailsData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCourseDetailsData(initialCourseDetails)
          setOpenImport(!openImport);
          dispatch(getCourseDetails(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(CourseId === 0) ? 'Add' : 'Edit'} Course-Details </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Publisher</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="PublisherId"
                    name="PublisherId"
                    value={courseDetailsData.PublisherId}
                    label="Publisher"
                    placeholder="Publisher"
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("PublisherId")}
                    required
                  >
                    <MenuItem value="0">Please Select</MenuItem>
                    { PublisherListData?.length > 0
                      && PublisherListData?.map((item) => (<MenuItem key={item?.PublisherId} value={item?.PublisherId}>{item?.PublisherName}</MenuItem>))}
                  </Select>
                  <FormHelperText>{handleErrorMessage("PublisherId")}</FormHelperText>
                </Grid>
                <Grid item md={6}>
                  <InputLabel id="demo-simple-select-label">VtCourseId</InputLabel>
                  <TextField
                    id="VtCourseId"
                    name="VtCourseId"
                    value={courseDetailsData.VtCourseId}
                    onChange={handleChange}
                    error={!fieldValidate("VtCourseId")}
                    helperText={handleErrorMessage("VtCourseId")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Item</InputLabel>
                  <TextField
                    id="ItemId"
                    name="ItemId"
                    value={courseDetailsData.ItemId}
                    onChange={handleChange}
                    error={!fieldValidate("ItemId")}
                    helperText={handleErrorMessage("ItemId")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Cuk</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="Cuk"
                    value={courseDetailsData.Cuk}
                    onChange={handleChange}
                    error={!fieldValidate("Cuk")}
                    helperText={handleErrorMessage("Cuk")}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseTitle</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CourseTitle"
                    value={courseDetailsData.CourseTitle}
                    onChange={handleChange}
                    error={!fieldValidate("CourseTitle")}
                    helperText={handleErrorMessage("CourseTitle")}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseSubtitle</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CourseSubtitle"
                    value={courseDetailsData.CourseSubtitle}
                    onChange={handleChange}
                    error={!fieldValidate("CourseSubtitle")}
                    helperText={handleErrorMessage("CourseSubtitle")}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CoursePrice</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CoursePrice"
                    value={courseDetailsData.CoursePrice}
                    onChange={handleChange}
                    error={!fieldValidate("CoursePrice")}
                    helperText={handleErrorMessage("CoursePrice")}
                    type="number"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseSlug</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CourseSlug"
                    value={courseDetailsData.CourseSlug}
                    onChange={handleChange}
                    error={!fieldValidate("CourseSlug")}
                    helperText={handleErrorMessage("CourseSlug")}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseDescription</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CourseDescription"
                    value={courseDetailsData.CourseDescription}
                    onChange={handleChange}
                    error={!fieldValidate("CourseDescription")}
                    helperText={handleErrorMessage("CourseDescription")}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel id="demo-simple-select-label">CoursePrerequisites</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CoursePrerequisites"
                    value={courseDetailsData.CoursePrerequisites}
                    onChange={handleChange}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel id="demo-simple-select-label">CourseRequirements</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CourseRequirements"
                    value={courseDetailsData.CourseRequirements}
                    onChange={handleChange}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseThumbnail</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CourseThumbnail"
                    value={courseDetailsData.CourseThumbnail}
                    onChange={handleChange}
                    error={!fieldValidate("CourseThumbnail")}
                    helperText={handleErrorMessage("CourseThumbnail")}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseVideo</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CourseVideo"
                    value={courseDetailsData.CourseVideo}
                    onChange={handleChange}
                    error={!fieldValidate("CourseVideo")}
                    helperText={handleErrorMessage("CourseVideo")}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseBanner</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CourseBanner"
                    value={courseDetailsData.CourseBanner}
                    onChange={handleChange}
                    error={!fieldValidate("CourseBanner")}
                    helperText={handleErrorMessage("CourseBanner")}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Topic</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="TopicId"
                    name="TopicId"
                    value={courseDetailsData.TopicId}
                    label="TopicId"
                    placeholder="TopicId"
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("TopicId")}
                    required
                  ><MenuItem value="0">Please Select</MenuItem>
                    { TopicListData?.length > 0
                      && TopicListData?.map((item) => (<MenuItem value={item?.TopicId}>{item?.TopicName}</MenuItem>))}
                  </Select>
                  <FormHelperText>{handleErrorMessage("TopicId")}</FormHelperText>
                  </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseType</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="CourseTypeId"
                    name="CourseTypeId"
                    value={courseDetailsData.CourseTypeId}
                    label="CourseTypeId"
                    placeholder="CourseTypeId"
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("CourseTypeId")}
                    required
                  ><MenuItem value="0">Please Select</MenuItem>
                    { CourseTypeListData?.length > 0
                      && CourseTypeListData?.map((item) => (<MenuItem value={item?.CourseTypeId}>{item?.CourseTypeName}</MenuItem>))}
                  </Select>
                  <FormHelperText>{handleErrorMessage("CourseTypeId")}</FormHelperText>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseLevel</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="CourseLevelId"
                    name="CourseLevelId"
                    value={courseDetailsData.CourseLevelId}
                    label="CourseLevelId"
                    placeholder="CourseLevelId"
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("CourseLevelId")}
                    required
                  ><MenuItem value="0">Please Select</MenuItem>
                    { CourseLevelListData?.length > 0
                      && CourseLevelListData?.map((item) => (<MenuItem value={item?.CourseLevelId}>{item?.CourseLevelName}</MenuItem>))}
                  </Select>
                  <FormHelperText>{handleErrorMessage("CourseLevelId")}</FormHelperText>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseDuration</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="CourseDuration"
                    value={courseDetailsData.CourseDuration}
                    onChange={handleChange}
                    error={!fieldValidate("CourseDuration")}
                    helperText={handleErrorMessage("CourseDuration")}
                    type="time"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseLanguage</InputLabel>
                  <Select
                    size="small"
                    sx={{ width: '100%' }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name="CourseLanguage"
                    value={Language}
                    onChange={handleChangeLanguage}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {LanguageListData && LanguageListData.length > 0 && LanguageListData.map((item) => (
                      <MenuItem key={item?.id} value={item?.name}>
                        <Checkbox checked={Language.indexOf(item?.name) > -1} />
                        <ListItemText primary={item?.name} />
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{handleErrorMessage("CourseLanguage")}</FormHelperText>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CourseGrades</InputLabel>
                  <Select
                    size="small"
                    sx={{ width: '100%' }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name="CourseGrades"
                    value={Grade}
                    onChange={handleChangeGrade}
                    renderValue={(selected: string[]) => selected.join(', ')}
                  >
                    {GradeListData && GradeListData.length > 0 && GradeListData.map((item) => (
                      <MenuItem key={item?.value} value={item?.value}>
                        <Checkbox checked={Grade.indexOf(item?.value) > -1} />
                        <ListItemText primary={item?.value} />
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{handleErrorMessage("CourseGrades")}</FormHelperText>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">CoursePathways</InputLabel>
                  <Select
                    size="small"
                    sx={{ width: '100%' }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name="CoursePathways"
                    value={CoursePathways}
                    onChange={handleChangePathways}
                    renderValue={(selected: string[]) => selected.join(', ')}
                  >
                    {IntrestPathwayListData && IntrestPathwayListData.length > 0 && IntrestPathwayListData.map((item) => (
                      <MenuItem key={item?.InterestName} value={item?.InterestName}>
                        <Checkbox checked={CoursePathways.indexOf(item?.InterestName) > -1} />
                        <ListItemText primary={item?.InterestName} />
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>{handleErrorMessage("CoursePathways")}</FormHelperText> */}
                </Grid>
                <Grid item md={6}>
                  <InputLabel id="demo-simple-select-label">CourseSkills</InputLabel>
                  <Select
                    size="small"
                    sx={{ width: '100%' }}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name="CourseSkills"
                    value={Skills}
                    onChange={handleChangeSkills}
                    renderValue={(selected: string[]) => selected.join(', ')}
                  >
                    {SkillListData && SkillListData.length > 0 && SkillListData.map((item) => (
                      <MenuItem key={item?.SkillName} value={item?.SkillName}>
                        <Checkbox checked={Skills.indexOf(item?.SkillName) > -1} />
                        <ListItemText primary={item?.SkillName} />
                      </MenuItem>
                    ))}
                  </Select>
                  
                </Grid>
                <Grid item md={6}>
                  <InputLabel id="demo-simple-select-label">WhatYouLearn</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="WhatYouLearn"
                    value={courseDetailsData.WhatYouLearn}
                    onChange={handleChange}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                  {/* <FormHelperText>should be comma(,) seprated</FormHelperText> */}
                </Grid>
                
                <Grid item md={6}>
                  <InputLabel id="demo-simple-select-label">WhatYouGet</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="WhatYouGet"
                    value={courseDetailsData.WhatYouGet}
                    onChange={handleChange}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                  {/* <FormHelperText>should be comma(,) seprated</FormHelperText> */}
                </Grid>
                
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">HasAssessment</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="HasAssessment"
                    name="HasAssessment"
                    value={courseDetailsData.HasAssessment}
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      HasAssessmentOptions?.length > 0
                      && HasAssessmentOptions?.map((item) => (<MenuItem value={item?.HasAssessment}>{item?.Lebel}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">HasCertification</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="HasCertification"
                    name="HasCertification"
                    value={courseDetailsData.HasCertification}
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      HasCertificationOptions?.length > 0
                      && HasCertificationOptions?.map((item) => (<MenuItem value={item?.HasCertification}>{item?.Lebel}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">RenewalCycle</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="RenewalCycle"
                    value={courseDetailsData.RenewalCycle}
                    onChange={handleChange}
                    error={!fieldValidate("RenewalCycle")}
                    helperText={handleErrorMessage("RenewalCycle")}
                    type="number"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel id="demo-simple-select-label">BatchStartDt</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="BatchStartDt"
                    value={courseDetailsData.BatchStartDt}
                    onChange={handleChange}
                    type="date"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel id="demo-simple-select-label">BatchEndDt</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="BatchEndDt"
                    value={courseDetailsData.BatchEndDt}
                    onChange={handleChange}
                    type="date"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel id="demo-simple-select-label">BatchNextDt</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="BatchNextDt"
                    value={courseDetailsData.BatchNextDt}
                    onChange={handleChange}
                    type="date"
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
                    value={courseDetailsData.Status}
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
                <Grid item md={6}>
                  <InputLabel id="demo-simple-select-label">ZohoVariantId</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="ZohoVariantId"
                    value={courseDetailsData.ZohoVariantId}
                    onChange={handleChange}
                    type="string"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{ mt: 2, float: 'right' }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(CourseId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

function ViewCourseDetails({ openImport, setOpenImport, CourseId = 0 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courseDetailsData, setCourseDetailsData] = useState(initialCourseDetails);
  const allCourseDetailsData = useSelector(
    (state: any) => state?.getCourseDetails?.CourseDetailsResponse?.data
  )
  useEffect(() => {
    dispatch(getCourseList());
  }, []);

  const CourseListData = useSelector(
    (state: any) => state?.getCourseList?.CourseListResponse?.data
  )
  useEffect(() => {
    if (CourseId > 0) {
      const rowData = allCourseDetailsData?.rows?.find((itm) => itm?.CourseId === CourseId);
      setCourseDetailsData({
        PublisherId: rowData?.PublisherId,
        VtCourseId: rowData?.VtCourseId,
        ItemId: rowData?.ItemId,
        Cuk: rowData?.Cuk,
        CourseTitle: rowData?.CourseTitle,
        CourseSubtitle: rowData?.CourseSubtitle,
        CoursePrice: rowData?.CoursePrice,
        CourseSlug: rowData?.CourseSlug,
        CourseDescription: rowData?.CourseDescription,
        CoursePrerequisites: rowData?.CoursePrerequisites,
        CourseRequirements: rowData?.CourseRequirements,
        CourseThumbnail: rowData?.CourseThumbnail,
        CourseVideo: rowData?.CourseVideo,
        CourseBanner: rowData?.CourseBanner,
        TopicId: rowData?.TopicId,
        CourseTypeId: rowData?.CourseTypeId,
        CourseLevelId: rowData?.CourseLevelId,
        CourseDuration: rowData?.CourseDuration,
        CourseLanguage: rowData?.CourseLanguage,
        CourseGrades: rowData?.CourseGrades,
        CoursePathways: rowData?.CoursePathways,
        CourseSkills: rowData?.CourseSkills,
        WhatYouLearn: rowData?.WhatYouLearn,
        WhatYouGet: rowData?.WhatYouGet,
        HasAssessment: rowData?.HasAssessment,
        HasCertification: rowData?.HasCertification,
        RenewalCycle: rowData?.RenewalCycle,
        BatchStartDt: rowData?.BatchStartDt,
        BatchEndDt: rowData?.BatchEndDt,
        BatchNextDt: rowData?.BatchNextDt,
        Status: rowData?.Status,
        ZohoVariantId: rowData?.ZohoVariantId
      })
    }
  }, [CourseId])

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  const validJson = (str) => {
    let Language = ""
    if (isJsonString(str)) {
      Language = JSON.parse(str)?.map(itm => itm?.name)?.join(', ')
    }
    return Language;
  }
  const validLanguage = (str) => {
    let Language = ""
    if (isJsonString(str)) {
      Language = JSON.parse(str)?.map(itm => itm?.name)?.join(', ')
    } else {
      Language = str;
    }
    return Language;
  }
  const validGrade = (str) => {
    let Language = ""
    if (isJsonString(str)) {
      Language = JSON.parse(str)?.map(itm => itm?.value)?.join(', ')
      return Language;
    }
    return str;
  }
  return (
    <div id="dsdds">
      <Dialog open={openImport} fullWidth={true} maxWidth="md">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}> Course-Details </h2>
          <DialogContent>
            <form noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <b>PublisherId:</b>  {courseDetailsData.PublisherId}
                  </Grid>
                  <Grid item md={12}>
                    <b>VtCourseId:</b> {courseDetailsData.PublisherId}
                  </Grid>
                  <Grid item md={12}>
                    <b>ItemId:</b> {courseDetailsData.ItemId}
                  </Grid>
                  <Grid item md={12}>
                    <b>Cuk:</b> {courseDetailsData.Cuk}
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <b>CourseTitle:</b> {courseDetailsData.CourseTitle}
                  </Grid>
                  <Grid item md={12}>
                    <b>CourseSubtitle:</b> {courseDetailsData.CourseSubtitle}
                  </Grid>
                  <Grid item md={12}>
                    <b>CoursePrice:</b> {courseDetailsData.CoursePrice}
                  </Grid>
                  <Grid item md={12}>
                    <b>CourseSlug:</b> {courseDetailsData.CourseSlug}
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <b>CourseDescription:</b> <span dangerouslySetInnerHTML={{ __html: courseDetailsData.CourseDescription }} />
                  </Grid>
                  <Grid item md={12}>
                    <b>CoursePrerequisites:</b> {courseDetailsData.CoursePrerequisites}
                  </Grid>
                  <Grid item md={12}>
                    <b>CourseRequirements:</b> {courseDetailsData.CourseRequirements}
                  </Grid>
                  <Grid item md={12}>
                    <b>CourseThumbnail:</b> {courseDetailsData.CourseThumbnail}
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <b>CourseVideo:</b> <span dangerouslySetInnerHTML={{ __html: courseDetailsData.CourseVideo }} />
                  </Grid>
                  <Grid item md={12}>
                    <b>CourseBanner:</b> <span dangerouslySetInnerHTML={{ __html: courseDetailsData.CourseBanner }} />
                  </Grid>
                  <Grid item md={12}>
                    <b>TopicId:</b> {courseDetailsData.TopicId}
                  </Grid>
                  <Grid item md={12}>
                    <b>CourseTypeId:</b> {courseDetailsData.CourseTypeId}
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <b>CourseLevelId:</b> {courseDetailsData.CourseLevelId}
                  </Grid>
                  <Grid item md={12}>
                    <b>CourseDuration:</b> {courseDetailsData.CourseDuration}
                  </Grid>
                  <Grid item md={12}>
                    <b>CourseLanguage:</b> {validLanguage(courseDetailsData?.CourseLanguage)}</Grid>
                  <Grid item md={12}>
                    <b>CourseGrades:</b> {validGrade(courseDetailsData?.CourseGrades)}
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <b>CoursePathways:</b> {validGrade(courseDetailsData?.CoursePathways)}
                  </Grid>
                  <Grid item md={12}>
                    <b>CourseSkills:</b> {validLanguage(courseDetailsData.CourseSkills)}
                  </Grid>
                  <Grid item md={12}>
                    <b>WhatYouLearn:</b> {validJson(courseDetailsData.WhatYouLearn)}
                  </Grid>
                  <Grid item md={12}>
                    <b>WhatYouGet:</b> {validJson(courseDetailsData.WhatYouGet)}
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <b>HasAssessment:</b> {courseDetailsData.HasAssessment}
                  </Grid>
                  <Grid item md={12}>
                    <b>HasCertification:</b> {courseDetailsData.HasCertification}
                  </Grid>
                  <Grid item md={12}>
                    <b>RenewalCycle:</b> {courseDetailsData.RenewalCycle}
                  </Grid>
                  <Grid item md={12}>
                    <b>BatchStartDt:</b> {courseDetailsData.BatchStartDt}
                  </Grid>
                </Grid>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <b>BatchEndDt:</b> {courseDetailsData.BatchEndDt}
                  </Grid>
                  <Grid item md={12}>
                    <b>BatchNextDt:</b> {courseDetailsData.BatchNextDt}
                  </Grid>
                  <Grid item md={12}>
                    <b>Status:</b> {courseDetailsData.Status}
                  </Grid>
                  <Grid item md={12}>
                    <b>ZohoVariantId:</b> {courseDetailsData.ZohoVariantId}
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export { 
  AddCourseDetailsPopup,
  ViewCourseDetails
};