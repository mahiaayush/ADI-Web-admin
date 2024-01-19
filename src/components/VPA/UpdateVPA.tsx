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
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store";
import { makeStyles } from "@material-ui/styles";
import { getVpaListAction } from "src/store/actions/GetVpaListAction";
import { getRegionListAction } from "src/store/actions/GetRegionListAction";
import { ADMIN_API_ENDPOINT_V2, VPA_DATA } from "../../store/constants";
import http from "../../utils/http";

export default function UpdateVpa({ updateDialog, setUpdateDialog, vpaID, existingData }) {
  const dispatch = useDispatch();
  const [vpaData, setVpaData] = useState({
    REGION_ID: null,
    VPA_ACC_NO: "",
    IFSC_CODE: "",
    BANK_NAME: "",
  });

  const handleChange = (e: ChangeEvent<any>) => {
    const { name: field, value } = e.target;
    setVpaData({ ...vpaData, [field]: value });
  };
  useEffect(() => {
    dispatch(getRegionListAction(null, null, null, null, null, 'A'));
  }, []);

  const regionListData = useSelector(
    (state: any) =>
      state?.GetRegionList?.getRegionListResponse?.data?.regionData
  );

  useEffect(() => {
    setVpaData({
      REGION_ID: existingData.REGION_ID,
      VPA_ACC_NO: existingData.VPA_ACC_NO,
      IFSC_CODE: existingData.IFSC_CODE,
      BANK_NAME: existingData.BANK_NAME,
    })
  }, [existingData])
  const validations = () => {
    if (
       vpaData.REGION_ID === existingData.REGION_ID && vpaData.BANK_NAME === existingData.BANK_NAME && vpaData.IFSC_CODE === existingData.IFSC_CODE && vpaData.VPA_ACC_NO === existingData.VPA_ACC_NO
    ) {
      return true;
    }
    return false;
  };

  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");

  const handleAdd = async () => {
    setError("");
    setSucessMessage("");
    const vpaObj = {
      vpaId: vpaID,
      regionId: vpaData.REGION_ID,
      vpaAccountNumber: vpaData.VPA_ACC_NO,
      vpaIfscCode: vpaData.IFSC_CODE,
      vpaBankName: vpaData.BANK_NAME,
    };
    const postUpdateVpaObj = Object.keys(vpaObj)
      .filter((k) => vpaObj[k] != null && vpaObj[k] !== "")
      .reduce((a, k) => ({ ...a, [k]: vpaObj[k] }), {});

    if (!validations()) {
      let res;
      try {
        res = await http.patch(
          `${ADMIN_API_ENDPOINT_V2}${VPA_DATA}`,
          postUpdateVpaObj
        );
        console.log("resresres", res);
        if (res.data.status === true) {
          setSucessMessage(res?.data?.message);
          dispatch(getVpaListAction(1, 10, null, null, null));
          setTimeout(() => {
            setUpdateDialog(false);
          }, 1000);
        }
      } catch (error) {
        console.log("resresres", res);
        console.log("error", error);
        setError(error?.response?.data?.message);
      }
    } else {
      setError("Vpa Name must only contain alpha-numeric characters");
    }
  };

  return (
    <>
      <Dialog open={updateDialog} onClose={() => setUpdateDialog(false)}>
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            Update The Details Of Virtual Payment Address
          </DialogContentText>
          <DialogContentText color="dimgrey">
            <TextField
              margin="dense"
              size="small"
              fullWidth
              type="number"
              label="Region"
              name="REGION_ID"
              value={vpaData.REGION_ID}
              onChange={handleChange}
              select
              required
            >
              <MenuItem value="">Select Region</MenuItem>
              {regionListData && regionListData.length > 0
                ? regionListData.map((data) => (
                    <MenuItem key={data?.RegionId} value={data?.RegionId}>
                      {data?.RegionName}
                    </MenuItem>
                  ))
                : null}
            </TextField>
            <TextField
              margin="dense"
              size="small"
              label="Vpa Account Number"
              name="VPA_ACC_NO"
              type="text"
              fullWidth
              value={vpaData.VPA_ACC_NO}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              size="small"
              label="IFSC Code"
              name="IFSC_CODE"
              type="text"
              fullWidth
              value={vpaData.IFSC_CODE}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              size="small"
              label="Bank Name"
              name="BANK_NAME"
              type="text"
              fullWidth
              value={vpaData.BANK_NAME}
              onChange={handleChange}
              required
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
          <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setUpdateDialog(false)}
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
