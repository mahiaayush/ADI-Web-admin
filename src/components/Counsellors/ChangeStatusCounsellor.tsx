import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  NativeSelect,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";
import "../CounselloApplication/DetailScreen.css";
import { useEffect, useState } from "react";
import ReasonListAction from "../../store/actions/ReasonListAction";
import http from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCounsellorOverview } from "../../store/actions/counsellorOverViewAction";
import {
  ADMIN_API_ENDPOINT_V2,
  PUT_COUNSELLOR_STATUS,
} from "../../store/constants";

export default function ChangeStatusCounsellor({
  openPopup,
  setOpenPopup,
  Status,
  CounselorProfileId,
  sessionCount
}) {
  const { id } = useParams();
  const [rejectText, setRejectText] = useState("");
  const [cStatus, setCStatus] = useState(Status);
  const [reasonType, setReasonType] = useState("1");
  const dispatch = useDispatch();
  const filter = "Weekly";

  useEffect(() => {
    dispatch(ReasonListAction());
  }, []);

  console.log("status", typeof Status)

  const reasonList = useSelector(
    (state: any) => state.ReasonList.reasonListResponse.data
  );

  const SubmitHandler = async () => {
    try {
      const res = await http.put(
        `${ADMIN_API_ENDPOINT_V2}${PUT_COUNSELLOR_STATUS}`,
        {
          "reasonId": parseInt(reasonType, 10),
          "cscProfileId": CounselorProfileId,
          "status": cStatus,
      },
      );
      if (res.data.status) {
        dispatch(getCounsellorOverview(id));
        setCStatus(cStatus);
        setOpenPopup(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleApprove = () => {
       SubmitHandler();
    setOpenPopup(false);
  };

  const handleRadio = (e) => {
    setCStatus(e.target.value)  
  }

  return (
    <>
      <Dialog open={openPopup} className="aprovelPop" onClose={handleClose}>
        <DialogTitle> Change Counsellor Status </DialogTitle>
        <DialogContent>
          <DialogContentText color="dimgrey">
            <DialogContentText>
              Are you sure you want to change the counsellor Status ?
            </DialogContentText>
           {Status === "A" && <DialogContentText>
              This counsellor has {sessionCount} session scheduled
            </DialogContentText>}
          </DialogContentText>
          <DialogContentText color="dimgrey">
                    <FormControl>
            <RadioGroup 
              className="parent-Divs"
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={cStatus}
              name="radio-buttons-group"
              style={{ flexDirection: 'initial' }}
            >
              <FormControlLabel
                value="A"
                control={<Radio />}
                label="Active"
                onChange={handleRadio}
              />
              <FormControlLabel value="I" control={<Radio />} label="In-Active" onChange={handleRadio} />
              <FormControlLabel
                value="T"
                control={<Radio />}
                label="Terminate"
                onChange={handleRadio}
              />
            </RadioGroup>
            </FormControl>
          </DialogContentText>
          <DialogContentText color="dimgrey">
            <div>
              <p
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  marginBottom: "0px",
                }}
              >
                Select Reason
              </p>
              <NativeSelect
                id="demo-simple-select"
                style={{ width: "100%" }}
                value={reasonType}
                onChange={(e) => setReasonType(e.target.value)}
              >
                {reasonList?.length > 0
                 && reasonList.map((item, index) => (
                    <option key={index.toString()} value={item.ReasonId}>
                      {item.ReasonDescription}
                    </option>
                  ))}
              </NativeSelect>
            </div>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>No, don&apos;t Approve</Button>
          <Button variant="contained" autoFocus onClick={handleApprove} className={Status === cStatus ? "disableBtnYes" : ""}>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
