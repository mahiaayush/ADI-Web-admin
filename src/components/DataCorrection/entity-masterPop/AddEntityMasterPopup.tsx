import * as React from "react";
import {
  DialogContent,
  Grid,
  TextField,
  Button,
  Dialog,
  Alert,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "src/store";
import { CreateMasterEntity, EditMasterEntity, getEntityTypeList, getMasterEntity } from "src/store/actions/getMasterEntityCoursesAction";
import toast from "react-hot-toast";
import { getMasterEntityList } from "src/store/actions/getMasterEntityAction";

const EntityMasterPopup = ({ entity_Id, openEdit,
  setOpenEdit,
  entityType_Id,
  entity_Name,
  entity_Alias,
  entity_Origin,
  salt_,
  request_id,
  join_Code,
  entity_StreetAddress,
  entity_Locality,
  entity_Region,
  entity_PostalCode,
  entity_Country,
  state_Id,
  city_Id,
  entity_WebAddress,
  naac_,
  status_,
  is_Webinar,
  editFlag,
  page_no,
  limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [entityId, setEntityId] = useState(entity_Id);
  const [entityTypeId, setEntityTypeId] = useState(entityType_Id);
  const [entityName, setEntityName] = useState(entity_Name);
  const [entityAlias, setEntityAlias] = useState(entity_Alias);
  const [entityOrigin, setEntityOrigin] = useState(entity_Origin);
  const [salt, setSalt] = useState(salt_);
  const [requestId, setRequestId] = useState(request_id);
  const [joinCode, setJoinCode] = useState(join_Code);
  const [entityStreetAddress, setEntityStreetAddress] = useState(entity_StreetAddress);
  const [entityLocality, setEntityLocality] = useState(entity_Locality);
  const [entityRegion, setEntityRegion] = useState(entity_Region);
  const [entityPostalCode, setEntityPostalCode] = useState(entity_PostalCode);
  const [entityCountry, setEntityCountry] = useState(entity_Country);
  const [stateId, setStateId] = useState(state_Id);
  const [cityId, setCityId] = useState(city_Id);
  const [entityWebAddress, setEntityWebAddress] = useState(entity_WebAddress);
  const [naac, setNaac] = useState(naac_);
  const [status, setStatus] = useState(status_);
  const [isWebinar, setIsWebinar] = useState(is_Webinar);
  const [message, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: 'success',
    message: ''
    // deiails: { Inserted: 0, Updated: 0, ErrorInRow: 0, ErrorMessage: '' }
  })

  const displayMessage = (obj: { type: string, message: string }) => {
    setIsMessage(true);
    setMessage(obj)
    setTimeout(() => { setIsMessage(false) }, 5000);
  }

  const submitData = async () => {
    let data; let message; let error;

    if (editFlag) {
      const fetchedData = await dispatch(EditMasterEntity(entityId, entityTypeId, entityName,
        entityAlias, entityOrigin, salt, requestId, joinCode, entityStreetAddress,
        entityLocality, entityRegion, entityPostalCode, entityCountry, stateId, cityId, entityWebAddress,
        naac, status, isWebinar));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateMasterEntity(entityTypeId, entityName,
        entityAlias, entityOrigin, salt, requestId, joinCode, entityStreetAddress,
        entityLocality, entityRegion, entityPostalCode, entityCountry, stateId, cityId, entityWebAddress,
        naac, status, isWebinar));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }

    dispatch(getMasterEntity(page + 1, limit)).then(() => setIsLoading(false));

    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  const entityOriginInput = [
    {
      value: "Select",
      label: "Select",
    },
    {
      value: "B2B",
      label: "B2B",
    },
    {
      value: "B2C",
      label: "B2C",
    },
  ]
  const IsWebinarInput = [
    {
      value: "Select",
      label: "Select",
    },
    {
      value: "Y",
      label: "Y",
    },
    {
      value: "N",
      label: "N",
    },
  ]
  const statusInput = [
    {
      value: "Select",
      label: "Select",
    },
    {
      value: "P",
      label: "P",
    },
    {
      value: "A",
      label: "A",
    },
    {
      value: "D",
      label: "D",
    },
    {
      value: "C",
      label: "C",
    },
  ]
  // submit Button On/Off  
  const check = () => {
    let value = true
    if (entityTypeId && entityTypeId?.length === 2 && entityName && entityName?.length >= 2 && entityOrigin && entityOrigin !== "Select"
      && requestId?.length >= 2 && status && status !== "Select" && isWebinar && isWebinar !== "Select") {
      value = false
    } else {
      value = true
    }
    return value
  }
  useEffect(() => {
    dispatch(getMasterEntityList());
    dispatch(getEntityTypeList());
  }, [])
  const EntityIdListData = useSelector(
    (state: any) => state?.getMasterEntityList?.masterEntityResponse?.data
  )
  const EntityTypeListData = useSelector(
    (state: any) => state?.getEntityTypeList?.entityTypeListResponse?.data
  )

  return (
    <div>
      <Dialog open={openEdit} maxWidth="lg" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Entity Master" : "Add Entity Master"}</h2>
          {message ? <><Alert severity="success"><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">EntitytypeName</InputLabel>
                <TextField
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityTypeId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setEntityTypeId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {entityTypeId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(EntityTypeListData).length > 0 && EntityTypeListData.map((option) => (                  
                    <option key={option.EntitytypeId} value={option.EntitytypeId}>
                      {option.EntitytypeName}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">EntityName</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityName}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setEntityName(e.target.value)} SelectProps={{ native: true }}
                  helperText="EntityName length should be greater than 2"
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">EntityAlias</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityAlias}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setEntityAlias(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">EntityOrigin</InputLabel>
                <TextField
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityOrigin}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setEntityOrigin(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select your origin"
                >
                  {entityOriginInput.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">Salt</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={salt}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setSalt(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">RequestId</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={requestId}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setRequestId(e.target.value)}
                  helperText="RequestId length should be greater than 2"
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">JoinCode</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={joinCode}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setJoinCode(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">EntityStreetAddress</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityStreetAddress}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setEntityStreetAddress(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">EntityLocality</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityLocality}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setEntityLocality(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">EntityRegion</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityRegion}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setEntityRegion(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">EntityPostalCode</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityPostalCode}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setEntityPostalCode(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">EntityCountry</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityCountry}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setEntityCountry(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">StateId</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={stateId}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setStateId(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">CityId</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={cityId}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setCityId(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">EntityWebAddress</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={entityWebAddress}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setEntityWebAddress(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">Naac</InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={naac}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setNaac(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">Status</InputLabel>
                <TextField
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={status}
                  sx={{ minWidth: '100%' }}
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
              <Grid item md={4}>
                <InputLabel id="demo-simple-label">IsWebinar</InputLabel>
                <TextField
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={isWebinar}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setIsWebinar(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select your status"
                >
                  {IsWebinarInput.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
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
            {/* <Grid container spacing={2}>
              
            </Grid> */}
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}
export { EntityMasterPopup }