import {
  Container,
  Grid,
  Typography,
  Link,
  Breadcrumbs,
  Box,
  Card,
  CircularProgress,
  Button,
} from "@material-ui/core";
import Moment from "moment";
import styles from "../../assets/css/OrderDetail.module.css";
import { Link as RouterLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import { Star, StarBorder, ArrowBackIos } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store";
import { makeStyles } from "@material-ui/core/styles";
import { getUniqueMasterTransactionAction } from "src/store/actions/GetMasterTransactionAction";
import { getLocalTime } from "src/utils/utility";

const useStyles = makeStyles({
  topheader: {
    paddingTop: "16px",
    position: "relative",
  },
  backArrow: {
    marginTop: "8px",
    cursor: "pointer",
  },
  normal: {
    background: "transparent",
    textDecoration: "none !important",
    cursor: "pointer",
    paddingRight: "0",
    border: "none",
  },
  circularProgressLoadingClass: {
    "min-height": "80vh",
    display: "flex",
    "justify-content": "center",
    "align-items": "center",
  },
});

const MasterTransactionDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const masterTransactionData = useSelector(
    (state: any) =>
      state?.GetUniqueMasterTransaction?.getUniqueMasterTransactionResponse
        ?.data
  );

  const classes = useStyles();
  useEffect(() => {
    setLoading(true);
    dispatch(getUniqueMasterTransactionAction(id)).then(() => setLoading(false));
  }, []);

  // const backHandler = () => {
  //   navigate("/financial-approval")
  // };

  return (
    <>
      <Container>
        <Grid item xs={12} position="relative" className={classes.topheader}>
          <Typography color="textPrimary" variant="h5">
            Master Transaction Detail
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
            <Link
              color="textPrimary"
              component={RouterLink}
              to="/financial-approval"
              variant="subtitle2"
            >
              Transactions
            </Link>
            <Typography color="textSecondary" variant="subtitle2">
              Master Transaction Detail
            </Typography>
          </Breadcrumbs>
        </Grid>
        <div className="DetailScreenSessionsMain">
          {/* <div style={{ display: "flex", alignItems: "center" }}>
                    <ArrowBackIos
                      className={classes.backArrow}
                      onClick={() => backHandler()}
                    />
                    <h4>Back</h4>
                  </div> */}
          {masterTransactionData && !loading ? (
            <div className={styles.tracking}>
              <div className={styles.left}>
                <h4 className={styles.heading}> Master Transaction Detail</h4>
                <div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Item </span>{" "}
                    <span>
                      {masterTransactionData?.Item
                        ? masterTransactionData?.Item
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Quantity </span>{" "}
                    <span>
                      {masterTransactionData?.Quantity
                        ? masterTransactionData?.Quantity
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Item Type </span>{" "}
                    <span>
                      {masterTransactionData?.PtOfferingName
                        ? masterTransactionData?.PtOfferingName
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Agent Name </span>{" "}
                    <span>
                      {masterTransactionData?.SalesUserName
                        ? masterTransactionData?.SalesUserName
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Agent Email </span>{" "}
                    <span>
                      {masterTransactionData?.SalesUserEmai
                        ? masterTransactionData?.SalesUserEmai
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Sold To </span>{" "}
                    <span>
                      {masterTransactionData?.UserName
                        ? masterTransactionData?.UserName
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Sold Date </span>{" "}
                    <span>
                      {masterTransactionData?.InvoiceDate
                        ? getLocalTime(masterTransactionData?.InvoiceDate)[9]
                        : ""}
                    </span>
                  </div>

                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Price</span>{" "}
                    <span>
                      {masterTransactionData?.PgAmount
                        ? masterTransactionData?.PgAmount
                        : ""}
                    </span>
                  </div>

                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Status </span>{" "}
                    <span>
                      {masterTransactionData?.PgStatus
                        ? masterTransactionData?.PgStatus === "SUCCESS"
                          ? "APPROVED"
                          : masterTransactionData?.PgStatus
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>PgTransactionId</span>{" "}
                    <span>
                      {masterTransactionData?.PgTransactionId
                        ? masterTransactionData?.PgTransactionId
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Payment Mode</span>{" "}
                    <span>
                      {masterTransactionData?.PaymentMode
                        ? masterTransactionData?.PaymentMode
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>PgOrderId</span>{" "}
                    <span>
                      {masterTransactionData?.PgOrderId
                        ? masterTransactionData?.PgOrderId
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>CouponCode</span>{" "}
                    <span>
                      {masterTransactionData?.CouponCode
                        ? masterTransactionData?.CouponCode
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Coupon Id</span>{" "}
                    <span>
                      {masterTransactionData?.CouponId
                        ? masterTransactionData?.CouponId
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Coupon Name</span>{" "}
                    <span>
                      {masterTransactionData?.CouponName
                        ? masterTransactionData?.CouponName
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Invoice Number</span>{" "}
                    <span>
                      {masterTransactionData?.InvoiceNumber
                        ? masterTransactionData?.InvoiceNumber
                        : ""}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Payment Verified</span>{" "}
                    <span>
                      {masterTransactionData?.IsPaymentVerified
                        ? "Verified"
                        : "Not Verified"}
                    </span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>RenewalPermission</span>{" "}
                    <span>
                      {masterTransactionData?.RenewalPermission
                        ? "Granted"
                        : "Not Granted"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                margin: "20vh 0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};
export default MasterTransactionDetail;
