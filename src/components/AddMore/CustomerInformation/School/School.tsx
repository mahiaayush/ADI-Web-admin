import { Card, Grid, TextField, Button } from "@material-ui/core";
import styles from "./School.module.css";
import { useState } from "react";
import OtpPopup from "../OTP/OtpPopup";

export const School = ({
  school,
  form,
  setForm,
  setActiveStep,
  otp,
  setOtp,
}) => {
  const [formData, setFormData] = useState({
    scl_name: "",
    mob_num: "",
    house_no: "",
    street_name: "",
    city: "",
    state: "",
    zip_code: "",
    org_code: "",
    org: "",
    website: "",
    webinar_status: "",
  });

  return (
    <>
      {school && (
        <div>
          <Grid>
            <Card className={styles.schoolCardClass}>
              {!form ? (
                <>
                  <TextField
                    label="School name"
                    variant="outlined"
                    // className={styles.textFieldInner}
                    fullWidth
                  />
                  <div className={styles.buttonMainParent}>
                    <p>
                      Not registered?{" "}
                      <b
                        onClick={() => setForm(true)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => setForm(true)}
                      >
                        Create an Account
                      </b>
                    </p>
                    <Button
                      color="primary"
                      variant="contained"
                      // onClick={() => setForm(true)}
                    >
                      Continue
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <form>
                    <Grid container spacing={3}>
                      <Grid item sm={4} xs={12}>
                        <TextField
                          fullWidth
                          label="School name"
                          name="school_name"
                          onChange={(e) => setFormData({ ...formData, scl_name: e.target.value })}
                          // value={user.given_name}
                          // error={!validate("given_name")}
                          // helperText={handleErrorMessage("given_name")}
                          required
                        />
                      </Grid>
                      <Grid item sm={4} xs={12} className={styles.mobileNumberClass}>
                        <TextField
                          fullWidth
                          placeholder="Mobile Number*"
                          name="mobile_number"
                          onChange={(e) => setFormData({ ...formData, mob_num: e.target.value })}
                          // value={user.family_name}
                          // error={!validate("family_name")}
                          // helperText={handleErrorMessage("family_name")}
                          required
                        />
                        <cite>+91-</cite>
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextField
                          fullWidth
                          // type="email"
                          label="House No. / Building name"
                          name="house_no"
                          onChange={(e) => setFormData({ ...formData, house_no: e.target.value })}
                          // value={user.email}
                          // error={!validate("email")}
                          // helperText={handleErrorMessage("email")}
                          required
                        />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextField
                          fullWidth
                          type="text"
                          label="Street name / Area / Colony"
                          name="street_name"
                          onChange={(e) => setFormData({ ...formData, street_name: e.target.value })}
                          // value={user.phone_number}
                          // error={!validate("phone_number")}
                          // helperText={handleErrorMessage("phone_number")}
                          required
                        />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextField
                          fullWidth
                          label="City"
                          name="city"
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          // value={user.country}
                          required
                        />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextField
                          fullWidth
                          label="State"
                          name="state"
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          // value={user.region}
                          required
                        />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Zip Code"
                          name="zip_code"
                          onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                          // value={user.address_line_one}
                          required
                        />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Organization join code"
                          name="org_code"
                          onChange={(e) => setFormData({ ...formData, org_code: e.target.value })}
                          // value={user.address_line_two}
                          required
                        />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Organization"
                          name="organization"
                          onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                          // value={user.organization}
                          required
                        />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Website"
                          name="webside"
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          // value={user.empcode}
                          required
                        />
                      </Grid>
                      <Grid item sm={4} xs={12}>
                        <TextField
                          fullWidth
                          label="Webinar status"
                          name="webinar_status"
                          onChange={(e) => setFormData({ ...formData, webinar_status: e.target.value })}
                          // value={user.department}
                          required
                        />
                      </Grid>
                    </Grid>
                    <div className={styles.buttonMainParent}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setOtp(true)}
                        disabled
                      >
                        Generate OTP
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </Card>
            {otp && (
              <OtpPopup
                addDialog={otp}
                setAddDialog={setOtp}
                setActiveStep={setActiveStep}
                mobileNumber=""
                response=""
                updateMsg=""
                setUpdateMsg=""
                userData=""
                setUserSid=""
              />
            )}
          </Grid>
        </div>
      )}
    </>
  );
};
