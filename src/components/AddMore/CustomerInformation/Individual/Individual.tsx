import { Card, Grid, TextField, Button, MenuItem } from "@material-ui/core";
import styles from "./Individual.module.css";
import { useState, useEffect } from "react";
import OtpPopup from "../OTP/OtpPopup";
import { useDispatch, useSelector } from "src/store";
import { updateIndividualLogin, getStateList } from "src/store/actions/AddMoreAction";
import Select from "react-select";

export const Individual = ({ individual, setActiveStep, otp, setOtp, setUserSid, setStateCode, stateCode }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    full_name: "",
    mob_num: "",
    org: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const apiData = {
    name: "",
    phone: "",
    organization: "",
  };

  useEffect(() => {
    if (userData.full_name.trim().length < 2 || userData.mob_num.length < 10 || stateCode.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [userData, stateCode]);

  useEffect(() => {
    dispatch(getStateList())
  }, [])

  const IndividualRes = useSelector(
    (state: any) => state?.addMoreRes?.updateIndividualResponse?.data
  );

  const StateListRes = useSelector(
    (state: any) => state?.addMoreRes?.getStateListResponse?.data
  );

  const HandlerOTP = () => {
    setLoading(true);
    apiData.name = userData.full_name;
    apiData.phone = `+91${userData.mob_num}`;
    apiData.organization = userData.org;

    dispatch(updateIndividualLogin(apiData)).then((res) => {
      if (res?.data?.success) {
        setUpdateMsg(res?.data?.detail?.message);
        setOtp(true);
      } else if (!res?.data?.success && res?.status === 200) {
        setUpdateMsg(res?.data?.detail?.message);
      } else {
        setUpdateMsg(res);
      }
      setLoading(false);
      setTimeout(() => setUpdateMsg(""), 3000);
    });
  };

  return (
    <>
      {individual && (
        <Grid>
          <Card className={styles.individualCardClass}>
            <div className={styles.textFieldFlex}>
              <div className={styles.mobileNoClass1}>
                <TextField
                  label="Full name"
                  variant="outlined"
                  className={styles.textFieldInner}
                  onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                  fullWidth
                  required
                />
              </div>
              <div className={styles.mobileNoClass}>
                <TextField
                  placeholder="Mobile Number*"
                  variant="outlined"
                  className={styles.textFieldInner}
                  onChange={(e) => setUserData({ ...userData, mob_num: e.target.value })}
                  fullWidth
                  type="tel"
                  inputProps={{ maxLength: 10 }}
                  onKeyDown={(e) => {
                    if (
                      !(e.shiftKey === false && (e.keyCode === 46 || e.keyCode === 8
                        || e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 86 || e.keyCode === 88 || e.keyCode === 17 || e.keyCode === 39 || (e.keyCode >= 48 && e.keyCode <= 57)))
                    ) {
                      e.preventDefault();
                    }
                  }}
                  required
                />
                <cite>+91-</cite>
              </div>
              <div className={styles.mobileNoClass1}>
                <TextField
                  label="State"
                  variant="outlined"
                  className={styles.textFieldInner}
                  onChange={(e) => setStateCode(e.target.value)}
                  fullWidth
                  // disabled
                  required
                  select
                  value={stateCode}
                >
                  <MenuItem value="">Select State</MenuItem>
                  {StateListRes && StateListRes?.length > 0
                    ? StateListRes?.map((data) => (
                      <MenuItem key={data?.code} value={data?.code}>
                        {data?.name}
                      </MenuItem>
                    ))
                    : null}
                </TextField>
              </div>
            </div>
            <div className={styles.buttonMainParent}>
              {!IndividualRes?.success && (
                <p className={styles.errorClass}>{updateMsg}</p>
              )}
              <Button
                color="primary"
                variant="contained"
                onClick={() => HandlerOTP()}
                disabled={disabled || loading}
              >
                {!loading ? "Generate OTP" : "Submitting"}
              </Button>
            </div>
          </Card>
          {otp && (
            <OtpPopup
              addDialog={otp}
              setAddDialog={setOtp}
              setActiveStep={setActiveStep}
              mobileNumber={userData.mob_num}
              response={IndividualRes}
              updateMsg={updateMsg}
              setUpdateMsg={setUpdateMsg}
              userData={userData}
              setUserSid={setUserSid}
            />
          )}
        </Grid>
      )}
    </>
  );
};
