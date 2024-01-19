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
import { CreateOccupationExam, EditOccupationExam, getOccupationExam } from "src/store/actions/OccupationExamAction";
import { getRMORegcarCodeList } from "src/store/actions/RMOProgressionAction";
import { getExaminationList } from "src/store/actions/CourseExaminationAction";
import toast from "react-hot-toast";

const EditOccupationExamPopup = ({ openEdit, setOpenEdit, examregcar_Id, regcar_Code, exam_Id,
  editFlag, page_no, limit_no }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(page_no);
  const [limit, setLimit] = useState(limit_no);
  const [isLoading, setIsLoading] = useState(false);
  const [examregcarId, setExamregcarId] = useState(examregcar_Id);
  const [regcarCode, setRegcarCode] = useState(regcar_Code);
  const [examId, setExamId] = useState(exam_Id);
  const [message, setIsMessage] = useState(false);
  const [alertType, setAlertType] = useState(null);
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
      const fetchedData = await dispatch(EditOccupationExam(examregcarId, regcarCode, examId));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    } else {
      const fetchedData = await dispatch(CreateOccupationExam(regcarCode, examId));
      data = fetchedData?.data;
      message = fetchedData?.message;
      error = fetchedData?.error;
    }

    dispatch(getOccupationExam(page, limit)).then(() => setIsLoading(false));
    if (!error) {
      setOpenEdit(!openEdit)
      toast.success(message)
    } else {
      toast.error(message)
    }
  }
  useEffect(() => {
    dispatch(getRMORegcarCodeList());
    dispatch(getExaminationList());
  }, []);

  const RMOPRegCodeData = useSelector(
    (state: any) => state?.getRegCodeList?.RMOPRegCodeResponse?.data
  )
  const ExaminationList = useSelector(
    (state: any) => state?.getExaminationList?.ExaminationListResponse?.data
  )

  const check = () => {
    let value = true
    if (regcarCode && examId) {
      value = false
    } else {
      value = true
    }
    return value
  }

  return (
    <div>
      <Dialog open={openEdit} maxWidth="sm" fullWidth={true}>
        <div style={{ position: 'relative', width: '100%', padding: '10px 15px' }}>
          <div style={{ position: 'absolute', right: '10px' }}><Button onClick={() => setOpenEdit(!openEdit)}>x</Button></div>
          <h2 style={{ textAlign: 'center' }}>{editFlag ? "Edit Occupation Exam" : "Add Occupation Exam"}</h2>
          {message ? <><Alert severity={alertType}><span />
            {MessageObj?.message}
          </Alert></> : ''}

          <DialogContent>

            <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-select-label">RegcarCode</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={regcarCode}
                  sx={{ width: '100%' }}
                  onChange={(e) => setRegcarCode(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {regcarCode === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(RMOPRegCodeData).length > 0 && RMOPRegCodeData.map((option) => (
                    <option key={option.RegcarCode} value={option.RegcarCode}>
                      {option.RegcarTitle}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6}>
                <InputLabel required id="demo-simple-select-label">Exam</InputLabel>
                <TextField
                  required
                  select
                  id="outlined-basic"
                  variant="outlined"
                  size="small"
                  value={examId}
                  sx={{ minWidth: '100%' }}
                  onChange={(e) => setExamId(e.target.value)}
                  SelectProps={{ native: true }}
                >
                  {examId === null ? <option key="select" selected>{" "}</option> : null}
                  {Object.keys(ExaminationList).length > 0 && ExaminationList.map((option) => (
                    <option key={option.ExamId} value={option.ExamId}>
                      {option.ExamShortName}
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
export { EditOccupationExamPopup }