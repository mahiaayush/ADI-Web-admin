import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import type { ChangeEvent } from "react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "../../../../store";
import styles from "./OtpPopup.module.css";
import {
  updateIndividualLogin,
  updateOTP,
} from "src/store/actions/AddMoreAction";

export default function OtpPopup({
  addDialog,
  setAddDialog,
  setActiveStep,
  mobileNumber,
  response,
  updateMsg,
  setUpdateMsg,
  userData,
  setUserSid
}) {
  const dispatch = useDispatch();
  const Ref = useRef(null);

  const apiData = {
    name: "",
    phone: "",
  };

  let timeInterval;

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");
  const [otpMsg, setOtpMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [optValue, setOtpValue] = useState("");

  const OtpResponse = useSelector(
    (state: any) => state?.addMoreRes?.updateOtpResponse
  );

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    const { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      // setTimer(seconds > 9 ? `${seconds}` : `0${seconds}`);
      const hr = hours > 9 ? `${hours}` : `0${hours}`;
      const min = minutes > 9 ? `${minutes}` : `0${minutes}`;
      const sec = seconds > 9 ? `${seconds}` : `0${seconds}`;
      const res = min.concat(":", sec);
      setTimer(res);
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next

    setTimer("00:30");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    const deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time

    deadline.setSeconds(deadline.getSeconds() + 30);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button

  const onClickReset = () => {
    setLoading(true);
    apiData.name = userData.full_name;
    apiData.phone = `+91${userData.mob_num}`;
    dispatch(updateIndividualLogin(apiData)).then((res) => {
      if (res?.data?.success) {
        setUpdateMsg(res?.data?.detail?.message);
        clearTimer(getDeadTime());
      } else if (!res?.data?.success && res?.status === 200) {
        setUpdateMsg(res?.data?.detail?.message);
      } else {
        setUpdateMsg(res);
      }
      setLoading(false);
      setTimeout(() => setUpdateMsg(""), 3000);
    });
  };

  const popUpClose = () => {
    setActiveStep(1);
    setAddDialog(false);
  }

  const validations = () => {
    if (optValue?.trim()?.length !== 6 || optValue.trim() === "") {
      return true;
    }
    return false;
  };

  const handleAdd = async () => {
    setLoadingOTP(true);
    const otpData = {
      username: response?.detail?.data?.challengeParam?.USERNAME,
      session: response?.detail?.data?.Session,
      otp: optValue,
    };
    dispatch(updateOTP(otpData)).then((res) => {
      if (res?.data?.success) {
        setOtpMsg(res?.data?.detail?.message);
        timeInterval = setTimeout(() => popUpClose(), 1000);
        setUserSid(res?.data?.detail?.data?.userSid)
      } else if (!res?.data?.success && res?.status === 200) {
        setOtpMsg(res?.data?.detail?.message);
      } else {
        setOtpMsg(res);
      }
      setLoadingOTP(false);
      setTimeout(() => setOtpMsg(""), 3000);
    });
  };

  useEffect(() => {
    const listener = event => {
        if ((event.code === "Enter" || event.code === "NumpadEnter") && optValue?.trim()?.length === 6) {
            event.preventDefault();
            const buttonRef = document.getElementById('otpBtn');
            if (buttonRef && buttonRef.click) buttonRef.click();
        }
    };
    document.addEventListener("keydown", listener);
    return () => {
        document.removeEventListener("keydown", listener);
    };
  }, [optValue]);

  useEffect(() => {
    return () => {
      clearInterval(timeInterval);
      setTimer("00:00:00");
    }
  }, [])

  return (
    <>
      <Dialog
        open={addDialog}
        // onClose={() => setAddDialog(false)}
        className={styles.otpDialogClass}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogContent className={styles.otpDialogContentClass}>
          <IconButton
            aria-label="add"
            size="small"
            onClick={() => setAddDialog(false)}
            className={styles.iconButtonClass}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          <h2 className={styles.h2Class}>What&apos;s the Code</h2>
          <div className={styles.divClass}>
            <p className={styles.pTitleClass}>Enter the code sent to&nbsp; </p>
            <p className={styles.pValueClass}>
              <b>{` +91 ${mobileNumber}`}</b>
            </p>
          </div>
          <TextField
            margin="dense"
            size="small"
            label="OTP"
            name="OTP"
            type="password"
            fullWidth
            value={optValue}
            onChange={(e: ChangeEvent<any>) => setOtpValue(e.target.value)}
            inputProps={{ maxLength: 6 }}
            className={styles.textFieldFlex}
            required
          />
          <Button
            color="primary"
            variant="contained"
            onClick={onClickReset}
            disabled={timer !== "00:00" || loading}
            sx={{ mt: 3 }}
          >
            {!loading ? "Resend OTP" : "Processing"}
          </Button>
          {timer !== "00:00" && <div className={styles.divClass}>
            <p className={styles.pTitleClass}>Resend code in&nbsp; </p>
            <p className={styles.pValueClass}>
              <b>{timer}</b>
            </p>
          </div>}
        </DialogContent>
        <DialogActions>
          <h5
            className={
              OtpResponse?.success ? styles.h5SuccessClass : styles.h5ErrorClass
            }
          >
            {otpMsg}
          </h5>
          <h5
            className={
              response?.success ? styles.h5SuccessClass : styles.h5ErrorClass
            }
          >
            {updateMsg}
          </h5>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAdd}
            disabled={validations() || loadingOTP}
            id="otpBtn"
          >
            {!loadingOTP ? "Continue" : "Submitting"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
