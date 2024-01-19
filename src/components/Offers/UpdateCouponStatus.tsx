import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  NativeSelect,
  TextField,
  MenuItem,
} from "@material-ui/core";
import "../CounselloApplication/DetailScreen.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store";
import { getOfferListAction } from "src/store/actions/GetOfferListAction";
import { ADMIN_API_ENDPOINT_V2, OFFER_DATA } from "../../store/constants";
import http from "../../utils/http";

export default function UpdateOfferStatus({
  updateStatusDialog,
  setUpdateStatusDialog,
  existingOfferStatus,
  offerID,
}) {
  const dispatch = useDispatch();
  const [offerStatus, setOfferStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  useEffect(() => {
    if (updateStatusDialog) {
      setOfferStatus(existingOfferStatus === "A" ? "I" : "A");
    }
  }, [updateStatusDialog]);
  const handleAdd = async () => {
    setError("");
    setSucessMessage("");

    const offerObj = {
      couponId: offerID,
      couponStatus: offerStatus,
    };

    let res;
    try {
      res = await http.patch(`${ADMIN_API_ENDPOINT_V2}${OFFER_DATA}`, offerObj);
      console.log("resresres", res);
      if (res.data.status === true) {
        setSucessMessage(res?.data?.message);
        dispatch(getOfferListAction(1, 10, null, null, null));
        setTimeout(() => {
          setUpdateStatusDialog(false);
        }, 1000);
      }
    } catch (error) {
      console.log("resresres", res);
      console.log("error", error);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Dialog
        open={updateStatusDialog}
        onClose={() => setUpdateStatusDialog(false)}
      >
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            Update Coupon Status
          </DialogContentText>
          <p>
            {existingOfferStatus === "A"
              ? "Do you want to Deactivate this Coupon?"
              : "Do you want to Activate this Coupon?"}
          </p>
        </DialogContent>
        <DialogActions>
          <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
          <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setUpdateStatusDialog(false)}
          >
            Close
          </Button>
          <Button color="primary" variant="contained" onClick={handleAdd}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
