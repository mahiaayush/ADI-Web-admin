import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CircularProgress,
} from "@material-ui/core";
import styles from "./AddMore.module.css";
import { Steppers } from "./Steppers/Steppers";
import { useState, useEffect, Suspense, lazy } from "react";
import { getGlobalCouponAction } from "src/store/actions/GetGlobalCouponAction";
import { useDispatch, useSelector } from "../../store";
import { Prompt } from "react-router-dom";
import { getUserVpaDetails } from "src/store/actions/userVpaDetailsAction";

const CustomerInformation = lazy(
  () => import("./CustomerInformation/CustomerInformation")
);
const PaymentSelection = lazy(
  () => import("./PaymentSelection/PaymentSelection")
);
const PlanSelection = lazy(() => import("./PlanSelection/PlanSelection"));
interface OfferDet {
  CouponCode: string;
  DiscountAmount: number;
  CouponName: string;
  CouponDescription: string;
  DiscountType: string
}

export const AddMore = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userSid, setUserSid] = useState(null);
  const [active, setActive] = useState(2);
  const [loading, setLoading] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const [stateCode, setStateCode] = useState('');
  const dispatch = useDispatch();
  const [planSelectionData, setPlanSelectionData] = useState({
    seller_user_sid: "",
    quantity: "",
    pt_offering_id: "",
    allocation_id: "",
    coupon_id: "",
  });
  const [price, setPrice] = useState(0);
  const [offerDetails, setOfferDetails] = useState<OfferDet>({
    CouponCode: "",
    DiscountAmount: 0,
    CouponName: "",
    CouponDescription: "",
    DiscountType: ""
  });
  const [offeringData, setOfferingData] = useState({
    data: null,
    item: null,
    type: null,
  });
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getGlobalCouponAction(null, null, null, null, null)).then(
      (res) => {
        if (res?.data?.status) {
          setUpdateMsg(res?.data?.message);
        } else {
          setUpdateMsg(res);
        }
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getUserVpaDetails()).then(() => setIsLoading(false))
  }, [])

  const userVpaDetails = useSelector(
    (state: any) => state?.userVpaDetails?.userVpaDetails?.detail?.VPA || {}
  );

  const steps = (step) => {
    switch (step) {
      case 0:
        return (
          <Suspense
            fallback={
              <div className={styles.circularProcess}>
                <CircularProgress />
              </div>
            }
          >
            <CustomerInformation
              setActiveStep={setActiveStep}
              setUserSid={setUserSid}
              setStateCode={setStateCode}
              stateCode={stateCode}
            />
          </Suspense>
        );
      case 1:
        return (
          <Suspense
            fallback={
              <div className={styles.circularProcess}>
                <CircularProgress />
              </div>
            }
          >
            <PlanSelection
              setActiveStep={setActiveStep}
              userSid={userSid}
              setPlanSelectionData={setPlanSelectionData}
              price={price}
              setPrice={setPrice}
              quantity={quantity}
              setQuantity={setQuantity}
              offeringData={offeringData}
              setOfferingData={setOfferingData}
              offerDetails={offerDetails}
              setOfferDetails={setOfferDetails}
              active={active}
              setActive={setActive}
              loading={loading}
              updateMsg={updateMsg}
            />
          </Suspense>
        );

      default:
        return (
          <Suspense
            fallback={
              <div className={styles.circularProcess}>
                <CircularProgress />
              </div>
            }
          >
            <PaymentSelection
              setActiveStep={setActiveStep}
              planSelectionData={planSelectionData}
              userSid={userSid}
              active={active}
              stateCode={stateCode}
            />
          </Suspense>
        );
    }
  };

  const onUnloadCallback = (e) => {
    e.returnValue = "Are you sure you want to leave?";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", onUnloadCallback);
    return () => {
      window.removeEventListener("beforeunload", onUnloadCallback);
    };
  }, []);

  return (
    <>{!isLoading ? <Container>
      {Object?.keys(userVpaDetails || {})?.length > 0 ? (
        <>
          <Grid
            item
            xs={12}
            position="relative"
            className={styles.topHeaderMain}
          >
            <Typography color="textPrimary" variant="h4">
              Add More
            </Typography>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Card>
              <Grid>
                <Steppers
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                />
              </Grid>
            </Card>
          </Box>
          {steps(activeStep)}
          <Prompt
            message="Are you sure you want to leave?"
            when={activeStep > 0 && activeStep < 4}
          />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "80vh",
          }}
        >
          <h3 style={{ marginBottom: "5px" }}>
            No Region or VPA is assigned to you.
          </h3>
          <p style={{ marginTop: "0px" }}>Please contact the adminstrator.</p>
        </div>
      )}
    </Container> : <div className={styles.circularProcess}><CircularProgress /></div>}</>
  );
};
