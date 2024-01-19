import styles from "./Steppers.module.css";
import { Stepper, StepLabel, Step, Button } from "@material-ui/core";
import { useState, useEffect } from "react";

const steps = [
  "Customer Information",
  "Select Item",
  "Payment Selection",
];

export const Steppers = ({ activeStep, setActiveStep }) => {
  // const [activeStep, setActiveStep] = useState(0);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  return (
    <div className={styles.steppersMain}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel />
            <h4 className={styles.labelClass}>{label}</h4>
          </Step>
        ))}
        {/* <Button onClick={handleNext}>
          Next
        </Button> */}
      </Stepper>
    </div>
  );
};
