import * as React from "react";
import {
  DialogContent,
  Grid,
  TextField,
  Button,
  Dialog,
  Alert,
  Color,
  InputLabel
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "src/store";
import { CreateAcademicMaster, EditAcademicMaster, getAcademicMaster, getProgramLevelList, getProgramList } from '../../../store/actions/getAcademicAction';
import toast from "react-hot-toast";

const EditAcademicPopup = ({ openEdit, setOpenEdit, academicEligibilityId, programId, programLevelId,
  eligibility_c, editFlag, Page_n, limit_page }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(Page_n);
  const [limit, setLimit] = useState(limit_page);
  const [isLoading, setIsLoading] = useState(false);
  const [progId, setProgId] = useState(programId);
  const [progLevelId, setProgLevelId] = useState(programLevelId);
  const [eligible, setEligible] = useState(eligibility_c);
  const [message, setIsMessage] = useState(false);
  const [MessageObj, setMessage] = useState({
    type: null,
    message: ''
  })

  const displayMessage = (obj: { type: Color, message: string }) => {
    setMessage(obj)
    setIsMessage(true);
  }

  const submitData = async () => {
    let data; let message; let error;
    if (editFlag) {
      const fetchedData = await dispatch(EditAcademicMaster(academicEligibilityId, progId, progLevelId, eligible));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateAcademicMaster(progId, progLevelId, eligible));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }
    dispatch(getAcademicMaster(page, limit)).then(() => setIsLoading(false));
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  useEffect(() => {
    dispatch(getProgramList());
    dispatch(getProgramLevelList());
  }, []);

  const ProgramIdListData = useSelector(
    (state: any) => state?.getProgramIdList?.ProgramListResponse?.data
  )
  const ProgramLevelListData = useSelector(
    (state: any) => state?.getProgramLevelList?.ProgramLevelListResponse?.data
  )

  const checks = () => {
    let value = true
    if (progId && progLevelId && eligible && eligible.length > 2) {
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
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Academic Data" : "Add Academic Data"}</h2>
          {message ? <><Alert severity={MessageObj?.type}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">ProgramTitle</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  select
                  value={progId === null ? "" : progId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setProgId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {progId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(ProgramIdListData).length > 0 && ProgramIdListData.map((option) => (
                    <option key={option.ProgramId} value={option.ProgramId}>
                      {option.ProgramTitle}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-label">ProgramLevelName</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  select
                  value={progLevelId === null ? "" : progLevelId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setProgLevelId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {progLevelId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(ProgramLevelListData).length > 0 && ProgramLevelListData.map((option) => (
                    <option key={option.ProgramLevelId} value={option.ProgramLevelId}>
                      {option.ProgramLevelName}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={12}>
                <InputLabel required id="demo-simple-label">Eligibility</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  multiline
                  maxRows={3}
                  value={eligible === null ? "" : eligible}
                  sx={{ width: '100%' }}
                  inputProps={{ maxlength: 65535 }}
                  onChange={(e) => setEligible(e.target.value)}
                  helperText="Eligibility should be greater than 2"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  sx={{ float: 'right' }}
                  onClick={() => submitData()}
                  disabled={checks()}
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
export { EditAcademicPopup }