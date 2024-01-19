import * as React from "react";
import {
  DialogContent,
  Grid,
  TextField,
  Button,
  Dialog,
  Alert,
  InputLabel,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "src/store";
import { CreateEntityCampusMaster, EditEntityCampusMaster, getEntityCampusMaster } from "src/store/actions/getEntityCampusAction";
import { getMasterEntityList } from "src/store/actions/getMasterEntityAction";
import toast from "react-hot-toast";

const EditEntityCampusPopup = ({ openEdit, setOpenEdit, campus_Id, entity_Id, campus_Name,
  campus_Address, campus_Url, campus_Img, Status, editFlag, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [campusId, setCampusId] = useState(campus_Id);
  const [entityId, setEntityId] = useState(entity_Id);
  const [campusName, setCampusName] = useState(campus_Name);
  const [campusAddress, setCampusAddress] = useState(campus_Address);
  const [campusUrl, setCampusUrl] = useState(campus_Url);
  const [campusImg, setCampusImg] = useState(campus_Img);
  const [status, setStatus] = useState(Status);
  const [message, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: 'success',
    message: ''
  })

  const displayMessage = (obj: { type: string, message: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }

  const submitData = async () => {
    let data; let message; let error;

    if (editFlag) {
      const fetchedData = await dispatch(EditEntityCampusMaster(campusId, entityId, campusName,
        campusAddress, campusUrl, campusImg, status));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateEntityCampusMaster(entityId, campusName,
        campusAddress, campusUrl, campusImg, status));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getEntityCampusMaster(page, limit)).then(() => setIsLoading(false));
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  const statusInput = [
    {
      value: "Select",
      label: "Select",
    },
    {
      value: "A",
      label: "Active",
    },
    {
      value: "I",
      label: "Inactive",
    },
  ]
  useEffect(() => {
    dispatch(getMasterEntityList());
  }, [])
  const EntityIdListData = useSelector(
    (state: any) => state?.getMasterEntityList?.masterEntityResponse?.data
  )
  // submit Button On/Off  
  const check = () => {
    let value = true
    if (entityId && campusName && campusAddress && campusUrl && campusImg && status && status !== "Select") {
      value = false
    } else {
      value = true
    }
    return value
  }

  return (
    <div>
      <Dialog open={openEdit} maxWidth="md" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Entity_Campus Master" : "Add Entity_Campus Master"}</h2>
          {message ? <><Alert severity="success"><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">EntityName</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setEntityId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {entityId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(EntityIdListData).length > 0 && EntityIdListData.map((option) => (
                    <option key={option.EntityId} value={option.EntityId}>
                      {option.EntityName}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">CampusName</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={campusName}
                  sx={{ width: '100%' }}
                  onChange={(e) => setCampusName(e.target.value)}
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">CampusAddress</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={campusAddress}
                  sx={{ width: '100%' }}
                  onChange={(e) => setCampusAddress(e.target.value)}
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">CampusUrl</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={campusUrl}
                  sx={{ width: '100%' }}
                  onChange={(e) => setCampusUrl(e.target.value)}
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">CampusImg</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={campusImg}
                  sx={{ width: '100%' }}
                  onChange={(e) => setCampusImg(e.target.value)}
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">Status</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  select
                  variant="outlined"
                  size="small"
                  value={status}
                  sx={{ width: '100%' }}
                  onChange={(e) => setStatus(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select your status"
                >
                  {statusInput.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  sx={{ float: 'right' }}
                  onClick={() => submitData()}
                  disabled={check()}
                >
                  {editFlag ? "Update" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}
export { EditEntityCampusPopup }