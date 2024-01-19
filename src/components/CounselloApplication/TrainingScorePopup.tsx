import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScoreTrace } from "src/store/actions/OnBoardingAction";
import { getLocalTime } from "../../utils/utility";

const TrainingScorePopup = (props) => {
  const dispatch = useDispatch();
  const [docId, setDocId] = useState(null);
  const handleClose = () => {
    props.setShowPopup(false);
  };

  useEffect(() => {
    dispatch(getScoreTrace(props.id));
  }, []);

  const trainingData = useSelector(
    (state: any) => state.trainingScore.scoreTraceResponse.data.data
  );

  return (
    <>
      <Dialog
        open={props.showPopup}
        className="aprovelPop"
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Training Scores</DialogTitle>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Topic</TableCell>
                <TableCell>Topic Name</TableCell>
                <TableCell align="right">Attempted On</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trainingData?.length !== 0 
              && trainingData?.map((item) => (
                  <TableRow>
                    <TableCell>{item.TOPIC_ID}</TableCell>
                    <TableCell>{item.TOPIC_NAME}</TableCell>
                    <TableCell align="right">
                      {getLocalTime(item.ATTEMPTED_ON)[0]}
                    </TableCell>
                    <TableCell align="right">{item.SCORE}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TrainingScorePopup;
