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
  CircularProgress,
  FormHelperText,
  Autocomplete
} from "@material-ui/core";
import type { ChangeEvent } from 'react';
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "src/store";
import toast from "react-hot-toast";
import { getSectionContent, saveSectionContent, updateSectionContent } from "src/store/actions/SectionContentAction";
import { getCourseSectionList } from "src/store/actions/CourseSectionAction";
import { getContentTypeList } from "src/store/actions/ContentTypeAction";
//  
const initialSectionContent = {
  SectionId: 0,
  CountTypeId: 0,
  CountStats: 0,
}
const sectionContentValidator = {
  validator: {
    SectionId: (value = "") => /^\d+\.?\d*$/.test(value),
    CountTypeId: (value = "") => /^\d+\.?\d*$/.test(value),
    CountStats: (value = "") => /^\d+\.?\d*$/.test(value)
  },
  errorMessage: {
    SectionId: "Please select Valid section",
    CountTypeId: "Please select Valid content-type",
    CountStats: "Please select Valid Count-Stats"
  }
}

export default function AddSectionContentPopup({ openImport, setOpenImport, SeccountId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sectionContentData, setSectionContentData] = useState(initialSectionContent);
  const { validator, errorMessage } = sectionContentValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setSectionContentData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](sectionContentData[field])
    } else {
      isValid = Object.keys(sectionContentData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && sectionContentData[field]?.length > 0) {
      isValid = validator[field](sectionContentData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allSectionContentData = useSelector(
    (state: any) => state?.getSectionContent?.SectionContentResponse?.data
  )

  useEffect(() => {
    dispatch(getCourseSectionList());
    dispatch(getContentTypeList());
    // dispatch(); accomodation-type
  }, []);

  useEffect(() => {
    if (SeccountId > 0) {
      const rowData = allSectionContentData?.rows?.find((itm) => itm?.SeccountId === SeccountId);
      setSectionContentData({
        "SectionId": rowData?.SectionId,
        "CountTypeId": rowData?.ContTypeId,
        "CountStats": rowData?.CountStats
      })
    }
  }, [SeccountId])

  const AccomodationTypeData = useSelector(
    (state: any) => state?.getAccomodationType?.AccomodationTypeResponse?.data
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (SeccountId > 0) {
      // Update Dispatcher
      dispatch(updateSectionContent(SeccountId, sectionContentData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setSectionContentData(initialSectionContent)
          setOpenImport(!openImport);
          dispatch(getSectionContent(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(saveSectionContent(sectionContentData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setSectionContentData(initialSectionContent)
          setOpenImport(!openImport);
          dispatch(getSectionContent(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    }
  }

  const getCourseSectionListData = useSelector(
    (state: any) => state?.getCourseSectionList?.CourseSectionListResponse?.data
  )
  const getContentTypeListData = useSelector(
    (state: any) => state?.getContentTypeList?.ContentTypeListResponse?.data
  )
  return (
    <div id="dsdds">
      <Dialog open={openImport} fullWidth={true} maxWidth="md">
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenImport(!openImport)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{(SeccountId === 0) ? 'Add' : 'Edit'} Section-Content </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label1">Section Title</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="EntitysubtypeId1"
                    name="SectionId"
                    value={sectionContentData.SectionId}
                    label="Accomodation Type"
                    placeholder="Accomodation Type"
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("SectionId")}
                    required
                  >
                    {
                      getCourseSectionListData?.length > 0
                      && getCourseSectionListData?.map((item) => (<MenuItem value={item?.SectionId}>{item?.SectionTitle}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("SectionId")}</FormHelperText>
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Content-Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="CountTypeId"
                    name="CountTypeId"
                    value={sectionContentData.CountTypeId}
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    error={!fieldValidate("CountTypeId")}
                    required
                  >
                    {
                      getContentTypeListData?.length > 0
                      && getContentTypeListData?.map((item) => (<MenuItem value={item?.ContentTypeId}>{item?.ContentTypeTitle}</MenuItem>))
                    }
                  </Select>
                  <FormHelperText>{handleErrorMessage("CountTypeId")}</FormHelperText>
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Count-Stats</InputLabel>
                  <TextField
                    required
                    size="small"
                    style={{ height: '60px', width: '100%' }}
                    value={sectionContentData.CountStats}
                    name="CountStats"
                    error={!fieldValidate("CountStats")}
                    helperText={handleErrorMessage("CountStats")}
                    onChange={handleChange}
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
                {(SeccountId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
