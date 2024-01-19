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
import { getCourseFaq, getCourseList, saveCourseFaq, updateCourseFaq } from "src/store/actions/CourseFaqAction";
import { getCatagory, saveCatagory, updateCatagory } from "src/store/actions/CatagoryAction";

const initialCategory = {
  CategoryName: '',
  PrecedenceOrder: '',
  Status: 'A',
}
const catagoryStatus = [
  { Status: 'A', Lebel: 'Active' },
  { Status: 'I', Lebel: 'Inactive' }
]
const catagoryValidator = {
  validator: {
    CategoryName: (value = "") => value.trim().length >= 2,
    PrecedenceOrder: (value = "") => /^\d+\.?\d*$/.test(value)
  },
  errorMessage: {
    CategoryName: "Please fill valid Question",
    PrecedenceOrder: "Please fill valid order"
  }
}

export default function AddCatagoryPopup({ openImport, setOpenImport, CategoryId = 0, pageNo = 1, limit = 10 }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [catagoryData, setCatagoryData] = useState(initialCategory);
  const { validator, errorMessage } = catagoryValidator;

  const handleChange = async (e: any) => {
    const { name: field, value, checked } = e.target
    setCatagoryData((prevState) => ({ ...prevState, [field]: value }))
  }
  const validate = (field?: string) => {
    let isValid = true
    if (field) {
      isValid = validator[field](catagoryData[field])
    } else {
      isValid = Object.keys(catagoryData).reduce((prev, curr) => (validator[curr] ? prev && validate(curr) : prev), true)
    }
    return isValid;
  }
  const fieldValidate = (field?: string) => {
    let isValid = true;
    if (field && catagoryData[field]?.length > 0) {
      isValid = validator[field](catagoryData[field])
    }
    return isValid;
  }
  const handleErrorMessage = (field: string) => {
    return !validate(field) ? errorMessage[field] : '';
  }

  const allCatagoryData = useSelector(
    (state: any) => state?.getCatagory?.CatagoryResponse?.data
  )

  useEffect(() => {
    if (CategoryId > 0) {
      const rowData = allCatagoryData?.rows?.find((itm) => itm?.CategoryId === CategoryId);
      console.log("rowData", rowData);
      setCatagoryData({
        "CategoryName": rowData?.CategoryName,
        "PrecedenceOrder": rowData?.PrecedenceOrder,
        "Status": rowData?.Status
      })
    }
  }, [CategoryId])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("isEditable ==>", CategoryId);
    if (CategoryId > 0) {
      // Update Dispatcher
      dispatch(updateCatagory(CategoryId, catagoryData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCatagoryData(initialCategory)
          setOpenImport(!openImport);
          dispatch(getCatagory(pageNo + 1, limit));
        } else {
          toast.error(data?.message)
        }
      })
    } else {
      console.log("saving data", catagoryData)
      // Save Dispatcher
      dispatch(saveCatagory(catagoryData)).then((data: any) => {
        if (data?.isSuccess) {
          toast.success(data?.message)
          setCatagoryData(initialCategory)
          setOpenImport(!openImport);
          dispatch(getCatagory(pageNo + 1, limit));
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
          <h2 style={{ textAlign: 'center' }}>{(CategoryId === 0) ? 'Add' : 'Edit'} Catagory </h2>
          <DialogContent>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Category Title</InputLabel>
                  <TextField
                    id="Category Title"
                    name="CategoryName"
                    value={catagoryData.CategoryName}
                    onChange={handleChange}
                    error={!fieldValidate("CategoryName")}
                    helperText={handleErrorMessage("CategoryName")}
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Order</InputLabel>
                  <TextField
                    id="outlined-basic"
                    name="PrecedenceOrder"
                    value={catagoryData.PrecedenceOrder}
                    onChange={handleChange}
                    error={!fieldValidate("PrecedenceOrder")}
                    helperText={handleErrorMessage("PrecedenceOrder")}
                    type="number"
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%' }}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item md={6}>
                  <InputLabel required id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    id="Status"
                    name="Status"
                    size="small"
                    value={catagoryData.Status}
                    placeholder="Status "
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    required
                  >
                    {
                      catagoryStatus?.length > 0
                      && catagoryStatus?.map((item) => (<MenuItem value={item?.Status}>{item?.Lebel}</MenuItem>))
                    }
                  </Select>
                </Grid>
              </Grid>
              <Button
                sx={{ mt: 2, float: 'right' }}
                variant="contained"
                disabled={!validate()}
                color="primary"
                type="submit"
              >
                {(CategoryId === 0) ? 'Save' : 'Update'}
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
