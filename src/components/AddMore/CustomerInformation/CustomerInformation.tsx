import styles from "./CustomerInformation.module.css";
import { Tabs, Tab } from "@material-ui/core";
import { useState } from "react";
import { Individual } from "./Individual/Individual";
import { School } from "./School/School";

const tabs = [
  {
    label: "Individual",
    value: "individual",
  },
  {
    label: "School",
    value: "school",
  },
];
 
const CustomerInformation = ({ setActiveStep, setUserSid, setStateCode, stateCode }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [individual, setIndividual] = useState(true);
  const [school, setSchool] = useState(false);
  const [form, setForm] = useState(false);
  const [otp, setOtp] = useState(false);

  const tabHandler = (id: number) => {
    if (id === 0) {
      setIndividual(true);
      setSchool(false);
      setForm(false);
    }
    if (id === 1) {
      setIndividual(false);
      setSchool(true);
    }
    setActiveTab(id);
  };

  return (
    <>
      <Tabs
        className={styles.tabHandlerMain}
        indicatorColor="primary"
        textColor="primary"
        value={tabs[activeTab].value}
        // centered
      >
        {tabs.map((tab, ind) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            className={
              activeTab === ind ? styles.tabActive : styles.tabbingClass
            }
            onClick={() => tabHandler(ind)}
            disabled={ind === 1} // disabled school
          />
        ))}
      </Tabs>
      <Individual
        individual={individual}
        setActiveStep={setActiveStep}
        otp={otp}
        setOtp={setOtp}
        setUserSid={setUserSid}
        setStateCode={setStateCode}
        stateCode={stateCode}
      />
      <School
        school={school}
        form={form}
        setForm={setForm}
        setActiveStep={setActiveStep}
        otp={otp}
        setOtp={setOtp}
      />
    </>
  );
};

export default CustomerInformation;
