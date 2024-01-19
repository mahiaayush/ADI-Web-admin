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
import { CreateProgramMaster, editProgramMaster, getDisciplineList, getIntakeList, getProgramMaster } from '../../../store/actions/getProgramAction';
import { getMasterEntityList } from "src/store/actions/getMasterEntityAction";
import toast from "react-hot-toast";
import { getProgramLevelList } from "src/store/actions/getAcademicAction";

const EditProgramPopup = ({ openEdit, setOpenEdit, programId, entity, programLevelId, intake, discipline,
  programT, programA, programHigh, programD, tutionF, applicationF,
  applicationDeadL, programEligibility, Status, editFlag, page_no, limit_no
}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [entityId, setEntityId] = useState(entity);
  const [progLevelId, setProgLevelId] = useState(programLevelId);
  const [intakeId, setIntakeId] = useState(intake);
  const [disciplineId, setDisciplineId] = useState(discipline);
  const [programTitle, setProgramTitle] = useState(programT);
  const [programAlias, setProgramAlias] = useState(programA);
  const [programHighlights, setProgramHighlights] = useState(programHigh);
  const [programduration, setProgramduration] = useState(programD);
  const [tutionFee, setTutionFee] = useState(tutionF);
  const [applicationFee, setApplicationFee] = useState(applicationF);
  const [applicationDeadline, setApplicationDeadline] = useState(applicationDeadL);
  const [programEligibilityOther, setProgramEligibilityOther] = useState(programEligibility);
  const [status, setStatus] = useState(Status);

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
      const fetchedData = await dispatch(editProgramMaster(programId, entityId, progLevelId, intakeId, disciplineId, programTitle,
        programAlias, programHighlights, programduration, tutionFee, applicationFee, applicationDeadline, programEligibilityOther, status));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateProgramMaster(entityId, progLevelId, intakeId, disciplineId, programTitle,
        programAlias, programHighlights, programduration, tutionFee, applicationFee, applicationDeadline, programEligibilityOther, status));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }

    dispatch(getProgramMaster(page, limit)).then(() => setIsLoading(false));

    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  useEffect(() => {
    dispatch(getMasterEntityList());
    dispatch(getDisciplineList());
    dispatch(getProgramLevelList());
    dispatch(getIntakeList());
  }, [])
  const EntityIdListData = useSelector(
    (state: any) => state?.getMasterEntityList?.masterEntityResponse?.data
  )
  const DisciplineListData = useSelector(
    (state: any) => state?.getDisciplineList?.disciplineListResponse?.data
  )
  const ProgramLevelData = useSelector(
    (state: any) => state?.getProgramLevelList?.ProgramLevelListResponse?.data
  )
  const IntakeListData = useSelector(
    (state: any) => state?.getIntakeListId?.IntakeListResponse?.data
  )
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

  const check = () => {
    let value = true
    if (entityId && progLevelId !== "" && intakeId !== "" && disciplineId !== "" && programTitle !== ""
      && programAlias && programHighlights && programduration !== "" && tutionFee !== "" && applicationFee !== "" && applicationDeadline !== ""
      && programEligibilityOther && status && status !== "Select") {
      value = false
    } else {
      value = true
    }
    return value
  }
  const inputP = { maxLength: 10 }
  const checkInput = true;
  const programIdfunc = (e) => {
    if (checkInput) {
      setProgLevelId(e.target.value = null)
    }
  }
  return (
    <div>
      <Dialog open={openEdit} maxWidth="lg" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Program Master" : "Add Program Master"}</h2>
          {message ? <><Alert severity="success"><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={4}>
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
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">ProgramLevelName</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  inputProps={{ maxLength: 12 }}
                  sx={{ width: '100%' }}
                  value={progLevelId}
                  onChange={(e) => setProgLevelId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {progLevelId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(ProgramLevelData).length > 0 && ProgramLevelData.map((option) => (
                    <option key={option.ProgramLevelId} value={option.ProgramLevelId}>
                      {option.ProgramLevelName}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">IntakePeriod</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={intakeId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setIntakeId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {intakeId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(IntakeListData).length > 0 && IntakeListData.map((option) => (
                    <option key={option.IntakeId} value={option.IntakeId}>
                      {option.IntakePeriod}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">DisciplineName</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={disciplineId}
                  sx={{ width: '100%' }}
                  onChange={(e) => setDisciplineId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  <option key="0" value="0">Select</option>
                  {Object.keys(DisciplineListData).length > 0 && DisciplineListData.map((option) => (
                    <option key={option.disciplineId} value={option.disciplineId}>
                      {option.disciplineName}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">ProgramTitle</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  multiline
                  maxRows={2}
                  value={programTitle}
                  sx={{ width: '100%' }}
                  onChange={(e) => setProgramTitle(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">ProgramAlias</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  multiline
                  maxRows={2}
                  value={programAlias}
                  sx={{ width: '100%' }}
                  onChange={(e) => setProgramAlias(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">ProgramHighlights</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  multiline
                  maxRows={4}
                  value={programHighlights}
                  sx={{ width: '100%' }}
                  onChange={(e) => setProgramHighlights(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">Programduration</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={programduration}
                  sx={{ width: '100%' }}
                  onChange={(e) => setProgramduration(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">TutionFee</InputLabel>
                <TextField
                  required
                  id="outlined-basi"
                  variant="outlined"
                  size="small"
                  value={tutionFee}
                  sx={{ width: '100%' }}
                  onChange={(e) => setTutionFee(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">ApplicationFee</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={applicationFee}
                  sx={{ width: '100%' }}
                  onChange={(e) => setApplicationFee(e.target.value)}
                  helperText="Required Numeric Input"
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">ApplicationDeadline</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  type="date"
                  inputProps={{ min: "1500-01-24", max: "9999-05-31" }}
                  value={applicationDeadline === null ? "" : applicationDeadline}
                  sx={{ width: '100%' }}
                  onChange={(e) => setApplicationDeadline(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">ProgramEligibilityOther</InputLabel>
                <TextField
                  required
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={programEligibilityOther}
                  sx={{ width: '100%' }}
                  onChange={(e) => setProgramEligibilityOther(e.target.value)}
                />
              </Grid>
              <Grid item md={4}>
                <InputLabel required id="demo-simple-label">Status</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={status}
                  sx={{ width: '100%' }}
                  onChange={(e) => setStatus(e.target.value)}
                  SelectProps={{ native: true }}
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
export { EditProgramPopup }