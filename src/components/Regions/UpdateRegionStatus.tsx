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
import { getRegionListAction } from "src/store/actions/GetRegionListAction";
import { ADMIN_API_ENDPOINT_V2, REGION_DATA } from "../../store/constants";
import http from "../../utils/http";

export default function UpdateRegionStatus({
  updateStatusDialog,
  setUpdateStatusDialog,
  existingRegionStatus,
  regionID,
}) {
  const dispatch = useDispatch();
  const [regionStatus, setRegionStatus] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  useEffect(() => {
    if (updateStatusDialog) {
      setRegionStatus(existingRegionStatus === "A" ? "I" : "A");
    }
  }, [updateStatusDialog]);
  const handleAdd = async () => {
    setError("");
    setSucessMessage("");

    const regionObj = {
      "regionId": regionID,
      "regionStatus": regionStatus,
    };

    let res;
    try {
      res = await http.patch(
        `${ADMIN_API_ENDPOINT_V2}${REGION_DATA}`,
        regionObj
      );
      console.log("resresres", res);
      if (res.data.status === true) {
        setSucessMessage(res?.data?.message);
        dispatch(getRegionListAction(1, 10, null, null, null));
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
            Update Region Status
          </DialogContentText>
          <p>
            {existingRegionStatus === "A"
              ? "Do you want to Deactivate Region?"
              : "Do you want to Activate Region?"}
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
