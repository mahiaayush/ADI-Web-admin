import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  NativeSelect,
  IconButton,
  TextField,
  Card,
  CardContent,
  Typography,
  CardActions,
  CircularProgress,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "../../../../store";
import styles from "./OfferCardList.module.css";

export default function OfferCardListPopup({
  addDialog,
  setAddDialog,
  setOfferDetails,
  apply,
  loading,
  updateMsg,
  price,
  gst
}) {
  const couponListData = useSelector(
    (state: any) => state?.GetGlobalCoupon?.getGlobalCouponResponse?.data?.rows
  );

  const couponListDataStatus = useSelector(
    (state: any) => state?.GetGlobalCoupon?.getGlobalCouponResponse?.success
  );

  const getOfferDetails = (val) => {
    if (apply) {
      if (val.DiscountType === "flate") {
        setOfferDetails(val);
      } else {
        const discount = (val.DiscountAmount / 100) * (price);
        setOfferDetails({ ...val, DiscountAmount: discount });
      }
      setAddDialog(false);
    }
  };
  return (
    <Dialog
      open={addDialog}
      onClose={() => setAddDialog(false)}
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
          {!couponListDataStatus && <p className={styles.error}>{updateMsg}</p>}
          <CloseIcon fontSize="large" />
        </IconButton>

        {couponListDataStatus && (
          <h2 className={styles.h2Class}>
            {" "}
            {couponListData?.length > 0 ? "Offers" : "No offers available"}
          </h2>
        )}
        {!loading ? (
          couponListData?.map((item, idx) => {
            return (
              <Card
                style={{ backgroundSize: "cover" }}
                className={styles.individualCardClass}
                key={`offer-${idx.toString()}`}
              >
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {item?.CouponName}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {item?.CouponDescription}
                  </Typography>
                  {apply && (
                    <Button
                      onClick={() => getOfferDetails(item)}
                      variant="contained"
                      style={{ float: "right" }}
                    >
                      Apply
                    </Button>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" className={styles.tcButton}>
                    <i>*T&C Apply</i>
                  </Button>
                </CardActions>
              </Card>
            );
          })
        ) : (
          <div
            style={{
              margin: "30vh 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
