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
  import { Link as RouterLink } from "react-router-dom";
  import { useParams, useNavigate } from "react-router";
  import { Star, StarBorder, ArrowBackIos } from "@material-ui/icons";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "../../store";
  import { makeStyles } from "@material-ui/core/styles";
  import { GetCouponDetailAction } from "src/store/actions/GetOfferListAction";
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
      "display": "flex",
      "justify-content": "center",
      "align-items": "center",
    }
  });
  
  const CouponDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const CouponDetailData = useSelector(
        (state: any) =>
          state?.GetGlobalCoupon?.getCouponDetailResponse?.data
      );
      
    const classes = useStyles();
    useEffect(() => {
      setLoading(true);
      dispatch(GetCouponDetailAction(id)).then(() => setLoading(false))
    }, []);
  
    const backHandler = () => {
      navigate("/offers")
    };
    const couponStatus = (val) => {
      switch (val) {
        case "A":
          return "Active";
          break;
        case "I":
          return "InActive";
          break;
        case "E":
          return "Expired";
          break;
        default:
          return "";
          break;
      }
    };

    return (
      <>
        <Container className="userIndex">
          <Grid item xs={12} position="relative" className={classes.topheader}>
            <Typography color="textPrimary" variant="h5">
              Coupons Detail
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/offers"
                variant="subtitle2"
              >
                Coupons
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Coupons Detail
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Card>
              <Grid
                item
                className="counsellorApplicationListTable filterdataContner"
              >
                <div className="DetailScreenSessionsMain">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ArrowBackIos
                      className={classes.backArrow}
                      onClick={() => backHandler()}
                    />
                    <h4>Back</h4>
                  </div>
                  {CouponDetailData && !loading ? (
                    <div className="DetailScreenSessionsMainInn sessionsDetailTog">
                      <div className="sessionsDetailTog">
                        <p>
                          <span>Coupon ID:</span>{" "}
                          {CouponDetailData?.CouponId !== null
                            ? CouponDetailData?.CouponId
                            : "NA"}
                        </p>
                        <p>
                          <span>Coupon Code: </span>
                          {CouponDetailData?.CouponCode !== "" && CouponDetailData?.CouponCode !== null
                            ? CouponDetailData?.CouponCode
                            : "NA"}
                        </p>
                        <p>
                          <span>Coupon Name: </span>{" "}
                          {CouponDetailData?.CouponName !== "" && CouponDetailData?.CouponName !== null
                            ? CouponDetailData?.CouponName
                            : "NA"}
                        </p>
                        <p>
                          <span>Coupon Description: </span>{" "}
                          {CouponDetailData?.CouponDescription !== "" && CouponDetailData?.CouponDescription !== null
                            ? CouponDetailData?.CouponDescription
                            : "NA"}
                        </p>
                         <p>
                          <span>Min Order: </span>{" "}
                          {CouponDetailData?.MinOrder !== null
                            ? CouponDetailData?.MinOrder
                            : "NA"}
                        </p>
                        <p>
                          <span>Max Discount: </span>{" "}
                          {CouponDetailData?.MaxDiscount !== null
                            ? CouponDetailData?.MaxDiscount
                            : "NA"}
                        </p>
                        <p>
                          <span>Discount Type: </span>{" "}
                          {CouponDetailData?.DiscountType !== "" && CouponDetailData?.DiscountType !== null
                            ? CouponDetailData?.DiscountType
                            : "NA"}
                        </p>
                        <p>
                          <span>Discount Amount: </span>{" "}
                          {CouponDetailData?.DiscountAmount !== null
                            ? CouponDetailData?.DiscountAmount
                            : "NA"}
                        </p>
                        <p>
                          <span>Distribution: </span>{" "}
                          {CouponDetailData?.Distribution !== "" && CouponDetailData?.Distribution !== null
                            ? CouponDetailData?.Distribution
                            : "NA"}
                        </p>
                        <p>
                          <span>Redem Count: </span>{" "}
                          {CouponDetailData?.RedemCount !== null
                            ? CouponDetailData?.RedemCount
                            : "NA"}
                        </p>
                        
                        <p>
                          <span> Max redeem Limit: </span>{" "}
                          {CouponDetailData?.MaxredemLimit !== null
                            ? CouponDetailData?.MaxredemLimit === 0 ? "Unlimited" : CouponDetailData?.MaxredemLimit === 1 ? "Single" : CouponDetailData?.MaxredemLimit
                            : "NA"}
                        </p>
                        <p>
                          <span>Coupon Status: </span>{" "}
                          {CouponDetailData?.CouponStatus !== "" && CouponDetailData?.CouponStatus !== null
                            ? couponStatus(CouponDetailData?.CouponStatus)
                            : "NA"}
                        </p>
                        <p>
                          <span>Coupon Start Date: </span>
                          {CouponDetailData?.CouponStartDate !== "" && CouponDetailData?.CouponStartDate !== null
                            ? getLocalTime(CouponDetailData?.CouponStartDate)[9]
                            : "NA"}
                        </p>
                        <p>
                          <span>Coupon Expiry Date: </span>
                          {CouponDetailData?.CouponExpiryDate !== "" && CouponDetailData?.CouponExpiryDate !== null
                            ? getLocalTime(CouponDetailData?.CouponExpiryDate)[9]
                            : "NA"}
                        </p>
                        <p>
                          <span style={{ display: 'inline' }}>Coupon Regions: </span>
                          {CouponDetailData?.CouponRegions && CouponDetailData?.CouponRegions.length
                            ? CouponDetailData?.CouponRegions.map((region, idx) => (
                                <p style={{ display: 'inline' }}>   {region.RegionName} {idx !== CouponDetailData?.CouponRegions.length - 1 ? ',' : ''}</p>
                            ))
                            : "NA"}
                        </p>
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
              </Grid>
            </Card>
          </Box>
        </Container>
      </>
    );
  };
  export default CouponDetail;