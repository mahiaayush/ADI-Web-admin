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
import { CreateRankingMapperMaster, EditRankingMapperMaster, getRankingList, getRankingMapperMaster } from "src/store/actions/getRankingMapperAction";
import { getMasterEntityList } from "src/store/actions/getMasterEntityAction";
import toast from "react-hot-toast";

const EditRankingMapperPopup = ({ openEdit, setOpenEdit, entityrnk_Id, entity_Id, rnkorg_Id,
  rnk_Year, rnk_Num, rnk_For, editFlag, page_no, limit_no }) => {
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [entityrnkId, setEntityrnkId] = useState(entityrnk_Id);
  const [entityId, setEntityId] = useState(entity_Id);
  const [rnkorgId, setRnkorgId] = useState(rnkorg_Id);
  const [rnkYear, setRnkYear] = useState(rnk_Year);
  const [rnkNum, setRnkNum] = useState(rnk_Num);
  const [rnkFor, setRnkFor] = useState(rnk_For);
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
      const fetchedData = await dispatch(EditRankingMapperMaster(entityrnkId, entityId, rnkorgId,
        rnkYear, rnkNum, rnkFor));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateRankingMapperMaster(entityId, rnkorgId,
        rnkYear, rnkNum, rnkFor));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getRankingMapperMaster(page, limit)).then(() => setIsLoading(false));
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  useEffect(() => {
    dispatch(getMasterEntityList());
    dispatch(getRankingList());
  }, []);

  const EntityIdData = useSelector(
    (state: any) => state?.getMasterEntityList?.masterEntityResponse?.data
  )
  const RankingListData = useSelector(
    (state: any) => state?.getRankingList?.rankingListResponse?.data
  )
  // submit Button On/Off  
  const check = () => {
    let value = true
    if (entityId && rnkorgId && rnkYear && rnkNum && rnkFor) {
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
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Ranking Mapper Master" : "Add Ranking Mapper Master"}</h2>
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
                  {Object.keys(EntityIdData).length > 0 && EntityIdData.map((option) => (
                    <option key={option.EntityId} value={option.EntityId}>
                      {option.EntityName}
                    </option>
                  ))}

                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">RnkorgName</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={rnkorgId}
                  type="number"
                  sx={{ width: '100%' }}
                  onChange={(e) => setRnkorgId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {rnkorgId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(RankingListData).length > 0 && RankingListData.map((option) => (
                    <option key={option.RnkorgId} value={option.RnkorgId}>
                      {option.RnkorgName}
                    </option>
                  ))}

                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">RankYear</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={rnkYear}
                  sx={{ width: '100%' }}
                  onChange={(e) => setRnkYear(e.target.value)}
                  helperText="Rquired Numeric Input"
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">RankNum</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={rnkNum}
                  type="number"
                  sx={{ width: '100%' }}
                  onChange={(e) => setRnkNum(e.target.value)}
                  helperText="Rquired Numeric Input"
                />
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">RankFor</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={rnkFor}
                  sx={{ width: '100%' }}
                  onChange={(e) => setRnkFor(e.target.value)}
                />
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
export { EditRankingMapperPopup }