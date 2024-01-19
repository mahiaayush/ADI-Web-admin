import * as React from "react";
import {
  DialogContent,
  Grid,
  TextField,
  Button,
  Dialog,
  Alert,
  InputLabel
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "src/store";
import { CreateAccreditationMaster, EditAccreditationMaster, getAccreditationMaster } from "src/store/actions/getAccreditationAction";
import { getAccrediationListMaster } from "src/store/actions/AccrediationAction";
import { getMasterEntityList } from "src/store/actions/getMasterEntityAction";
import toast from "react-hot-toast";

const EditAccreditationPopup = ({ openEdit, setOpenEdit, entityaccr_Id, entity_Id, accrediation_Id, editFlag, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [entityaccrId, setEntityaccrId] = useState(entityaccr_Id);
  const [entityId, setEntityId] = useState(entity_Id);
  const [accrediationId, setAccrediationId] = useState(accrediation_Id);
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
    console.log("edit flag----->", editFlag);

    if (editFlag) {
      const fetchedData = await dispatch(EditAccreditationMaster(entityaccrId, entityId, accrediationId));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateAccreditationMaster(entityId, accrediationId));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getAccreditationMaster(page, limit)).then(() => setIsLoading(false));
    console.log("return data", data, "message", message, "error----->", error);
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  useEffect(() => {
    dispatch(getAccrediationListMaster());
  }, []);

  const AccrediationData = useSelector(
    (state: any) => state?.getAccrediationMasterList?.AccrediationMasterListResponse?.data
  )
  useEffect(() => {
    dispatch(getMasterEntityList());
  }, []);

  const EntityIdData = useSelector(
    (state: any) => state?.getMasterEntityList?.masterEntityResponse?.data
  )
  // submit Button On/Off  
  const check = () => {
    let value = true
    if (entityId && accrediationId) {
      value = false
    } else {
      value = true
    }
    return value
  }

  return (
    <div>
      <Dialog open={openEdit}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Accrediation Mapper" : "Add Accrediation Mapper"}</h2>
          {message ? <><Alert severity="success"><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">EntityName</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  select
                  size="small"
                  value={entityId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setEntityId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {entityId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(EntityIdData).length > 0 && EntityIdData.map((option) => (
                    <option key={option.EntityId} value={option.EntityId}>
                      {option.EntityName}
                    </option>
                  ))}

                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">AccrediationTitle</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  select
                  variant="outlined"
                  size="small"
                  value={accrediationId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setAccrediationId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {accrediationId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(AccrediationData).length > 0 && AccrediationData.map((option) => (
                    <option key={option.AccrediationId} value={option.AccrediationId}>
                      {option.AccrediationTitle}
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
export { EditAccreditationPopup }