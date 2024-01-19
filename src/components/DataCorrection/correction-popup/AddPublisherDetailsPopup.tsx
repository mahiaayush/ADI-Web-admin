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
import type { ChangeEvent } from 'react';
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "src/store";
import toast from "react-hot-toast";
import { getPublisherDetails, savePublisherDetails, updatePublisherDetails } from "src/store/actions/PublisherDetailsAction";
import isEmail from 'validator/es/lib/isEmail';

const initialPublisherDetails = {
  PublisherId: 0,
  Puk: '',
  PublisherName: '',
  PublisherAbout: '',
  StoreLogo: '',
  RegAddress: '',
  ZohovendorId: 0,
  Publisherwebsite: '',
  TerminationPolicy: '',
  PaymentTerms: '',
  PublisherSlug: '',
  Status: 'A',
  PublisherEmail: ''
}
const statusOptions = [
  { status: 'A', Label: 'Active' },
  { status: 'I', Label: 'Inactive' }
]

const PublisherDetailsValidator = {
  validator: {
    PublisherId: (value = "") => /^\d+\.?\d*$/.test(value),
    Puk: (value = "") => !!value.trim(),
    PublisherName: (value = "") => !!value.trim(),
    PublisherAbout: (value = "") => !!value.trim(),
    StoreLogo: (value = "") => !!value.trim(),
    RegAddress: (value = "") => !!value.trim(),
    ZohovendorId: (value = "") => /^\d+\.?\d*$/.test(value),
    Publisherwebsite: (value = "") => !!value.trim(),
    TerminationPolicy: (value = "") => !!value.trim(),
    PaymentTerms: (value = "") => !!value.trim(),
    PublisherSlug: (value = "") => !!value.trim(),
    PublisherEmail: (value = "") => isEmail(value.trim())
  },
  errorMessage: {
    PublisherId: 'Please fill valid P',
    Puk: 'Please fill valid puk',
    PublisherName: 'Please fill valid publisherName',
    PublisherAbout: 'Please fill valid publisherAbout',
    RegcarVideo: 'Please fill valid RegcarVideo',
    StoreLogo: 'Please fill valid storeLogo',
    RegcarImg: 'Please fill valid RegcarImg',
    RegAddress: 'Please fill valid regAddress',
    ZohovendorId: 'Please fill valid zohovendorId',
    Publisherwebsite: 'Please fill valid publisherwebsite',
    TerminationPolicy: 'Please fill valid terminationPolicy',
    PaymentTerms: 'Please fill valid paymentTerms',
    PublisherSlug: 'Please fill valid publisherSlug',
    PublisherEmail: 'Please fill valid publisherEmail'
  }
}

export default function AddPublisherDetailsPopup({ openImport, setOpenImport, PublisherId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef("");
  const [PublisherDetailsData, setPublisherDetailsData] = useState(initialPublisherDetails);
  const { validator, errorMessage } = PublisherDetailsValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setPublisherDetailsData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](PublisherDetailsData[field])
    } else {
      isValid = Object.keys(PublisherDetailsData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && PublisherDetailsData[field]?.length > 0) {
      isValid = validator[field](PublisherDetailsData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allPublisherDetailsData = useSelector(
    (state: any) => state?.getPublisherDetails?.PublisherDetailsResponse?.data
  )

  useEffect(() => {
    if (PublisherId > 0) {
      const rowData = allPublisherDetailsData?.rows?.find((itm) => itm?.PublisherId === PublisherId);
      setPublisherDetailsData({
        PublisherId: rowData?.PublisherId,
        Puk: rowData?.Puk || "",
        PublisherName: rowData?.PublisherName || "",
        PublisherAbout: rowData?.PublisherAbout || "",
        StoreLogo: rowData?.StoreLogo || "",
        RegAddress: rowData?.RegAddress || "",
        ZohovendorId: rowData?.ZohovendorId,
        Publisherwebsite: rowData?.Publisherwebsite || "",
        TerminationPolicy: rowData?.TerminationPolicy || "",
        PaymentTerms: rowData?.PaymentTerms || "",
        PublisherSlug: rowData?.PublisherSlug || "",
        Status: rowData?.Status,
        PublisherEmail: rowData?.PublisherEmail || "",
      })
    }
  }, [PublisherId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (PublisherId > 0) {
      // Update Dispatcher
      dispatch(updatePublisherDetails(PublisherId, PublisherDetailsData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setPublisherDetailsData(initialPublisherDetails)
          setOpenImport(!openImport);
          dispatch(getPublisherDetails(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      // Save Dispatcher
      dispatch(savePublisherDetails(PublisherDetailsData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setPublisherDetailsData(initialPublisherDetails)
          setOpenImport(!openImport);
          dispatch(getPublisherDetails(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(PublisherId === 0) ? 'Add' : 'Edit'} Publisher Details </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                {/* <Grid item md={4}>
                  <InputLabel id="demo-simple-select-label">PublisherId</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="PublisherId"
                    value={PublisherDetailsData.PublisherId}
                    onChange={handleChange}
                    error={!fieldValidate("PublisherId")}
                    helperText={handleErrorMessage("PublisherId")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    disabled={!(PublisherId === 0)}
                    required
                  />
                </Grid> */}
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Puk</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="Puk"
                    value={PublisherDetailsData.Puk}
                    onChange={handleChange}
                    error={!fieldValidate("Puk")}
                    helperText={handleErrorMessage("Puk")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Publisher Name</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="PublisherName"
                    value={PublisherDetailsData.PublisherName}
                    onChange={handleChange}
                    error={!fieldValidate("PublisherName")}
                    helperText={handleErrorMessage("PublisherName")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Publisher About</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="PublisherAbout"
                    value={PublisherDetailsData.PublisherAbout}
                    onChange={handleChange}
                    error={!fieldValidate("PublisherAbout")}
                    helperText={handleErrorMessage("PublisherAbout")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Store Logo</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="StoreLogo"
                    value={PublisherDetailsData.StoreLogo}
                    onChange={handleChange}
                    error={!fieldValidate("StoreLogo")}
                    helperText={handleErrorMessage("StoreLogo")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Reg Address</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="RegAddress"
                    value={PublisherDetailsData.RegAddress}
                    onChange={handleChange}
                    error={!fieldValidate("RegAddress")}
                    helperText={handleErrorMessage("RegAddress")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">ZohovendorId</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="ZohovendorId"
                    value={PublisherDetailsData.ZohovendorId}
                    onChange={handleChange}
                    error={!fieldValidate("ZohovendorId")}
                    helperText={handleErrorMessage("ZohovendorId")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Publisher website</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="Publisherwebsite"
                    value={PublisherDetailsData.Publisherwebsite}
                    onChange={handleChange}
                    error={!fieldValidate("Publisherwebsite")}
                    helperText={handleErrorMessage("Publisherwebsite")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Termination Policy</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="TerminationPolicy"
                    value={PublisherDetailsData.TerminationPolicy}
                    onChange={handleChange}
                    error={!fieldValidate("TerminationPolicy")}
                    helperText={handleErrorMessage("TerminationPolicy")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Payment Terms</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="PaymentTerms"
                    value={PublisherDetailsData.PaymentTerms}
                    onChange={handleChange}
                    error={!fieldValidate("PaymentTerms")}
                    helperText={handleErrorMessage("PaymentTerms")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Publisher Slug</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="PublisherSlug"
                    value={PublisherDetailsData.PublisherSlug}
                    onChange={handleChange}
                    error={!fieldValidate("PublisherSlug")}
                    helperText={handleErrorMessage("PublisherSlug")}
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
                    id="outlined-basic"
                    name="Status"
                    value={PublisherDetailsData.Status}
                    placeholder="Status "
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      statusOptions?.length > 0
                      && statusOptions?.map((item) => (<MenuItem value={item?.status}>{item?.Label}</MenuItem>))
                    }
                  </Select>
                </Grid>
                <Grid item md={4}>
                  <InputLabel required id="demo-simple-select-label">Publisher Email</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="PublisherEmail"
                    value={PublisherDetailsData.PublisherEmail}
                    onChange={handleChange}
                    error={!fieldValidate("PublisherEmail")}
                    helperText={handleErrorMessage("PublisherEmail")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={12}>
                  <Button
                    sx={{ mt: 2, float: 'right' }}
                    variant="contained"
                    disabled={!validate()}
                    color="primary"
                    type="submit"
                  >
                    {(PublisherId === 0) ? 'Save' : 'Update'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}