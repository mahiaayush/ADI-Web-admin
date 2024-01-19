import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  NativeSelect,
  TextField,
  MenuItem
} from "@material-ui/core";
import "../CounselloApplication/DetailScreen.css";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store";
import { GetUniqueSellerMetaDataAction } from "src/store/actions/GetSellerMetaDataAction";
import { ADMIN_API_ENDPOINT_V2, SELLER_META_DATA } from "../../store/constants";
import http from "../../utils/http";

export default function UpdateMetaRow({
  updateMetaDialog,
  setUpdateMetaDialog,
  metaId,
  userSid,
  existingData,
}) {
  const dispatch = useDispatch();

  const [cashCapping, setCashCapping] = useState('');
  const [target, setTarget] = useState('');

  useEffect(() => {
    setCashCapping(existingData.CashCapping);
    setTarget(existingData.Target);
  }, [existingData])

  const cashCapExceed = (show = false) => {
    return show
      ? cashCapping && target
        ? parseInt(cashCapping, 10) > parseInt(target, 10)
        : false
      : parseInt(cashCapping, 10) > parseInt(target, 10);
  };

  const validations = () => {
    if (((cashCapping === existingData.CashCapping) && (target === existingData.Target)) || cashCapping.length === 0 || target.length === 0 || cashCapExceed()) {
      return true;
    }
    return false;
  };

  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const handleAdd = async () => {
    setError("");
    setSucessMessage("");

    const metaUpdateObj = {
      "cashCapping": cashCapping,
      "target": target,
      "metaId": metaId,
    };
    const postMetaUpdateObj = Object.keys(metaUpdateObj)
      .filter((k) => metaUpdateObj[k] != null && metaUpdateObj[k] !== "")
      .reduce((a, k) => ({ ...a, [k]: metaUpdateObj[k] }), {});
    if (!validations()) {
      let res;
      try {
        res = await http.patch(
          `${ADMIN_API_ENDPOINT_V2}${SELLER_META_DATA}`,
          postMetaUpdateObj
        );
        console.log("resresres", res);
        if (res.data.status === true) {
          setSucessMessage(res?.data?.message);
          dispatch(GetUniqueSellerMetaDataAction(userSid));
          setTimeout(() => {
            setUpdateMetaDialog(false);
          }, 1000);
        }
      } catch (error) {
        console.log("resresres", res);
        console.log("error", error);
        setError(error?.response?.data?.message);
      }
    } else {
      setError("Some error occured");
    }
  };

  return (
    <>
      <Dialog
        open={updateMetaDialog}
        onClose={() => setUpdateMetaDialog(false)}
      >
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            Update The Details Of Meta
          </DialogContentText>
          <TextField
            margin="dense"
            size="small"
            label="Cash Capping/month"
            name="CashCapping"
            type="number"
            fullWidth
            value={cashCapping}
            onChange={(e: ChangeEvent<any>) => setCashCapping(e.target.value)}
            error={cashCapExceed(true)}
            helperText={cashCapExceed(true) ? "Cash capping should be less than the target amount" : ""}
          />
          <TextField
            margin="dense"
            size="small"
            fullWidth
            type="number"
            label="Target/month"
            name="Target"
            value={target}
            onChange={(e: ChangeEvent<any>) => setTarget(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
          <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setUpdateMetaDialog(false)}
          >
            Close
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAdd}
            disabled={validations()}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
