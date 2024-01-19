import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import "../CounselloApplication/DetailScreen.css";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { RootStateOrAny } from "react-redux";
import { useDispatch, useSelector } from "../../store";
import { makeStyles } from "@material-ui/styles";
import { getRegionListAction } from "src/store/actions/GetRegionListAction";
import { getVpaListAction } from "src/store/actions/GetVpaListAction";
import { ADMIN_API_ENDPOINT_V2, VPA_DATA } from "../../store/constants";
import http from "../../utils/http";

export default function AddVpa({ addDialog, setAddDialog }) {
  const dispatch = useDispatch();

  const useStyles = makeStyles({
    flexParentClass: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    childIInd: {
      textAlign: "right",
      fontWeight: 600,
      fontSize: "20px",
      margin: "0 auto",
    },
    chileTextField: {
      width: "70%",
    },
  });

  const [vpaData, setVpaData] = useState({
    "REGION_ID": "",
    "VPA_ACC_NO": "",
    "IFSC_CODE": "",
    "BANK_NAME": "",
});

const handleChange = (e: ChangeEvent<any>) => {
    const { name: field, value } = e.target
    setVpaData({ ...vpaData, [field]: value })
}

  useEffect(() => {
    dispatch(getRegionListAction(null, null, null, null, null, 'A'));
  }, []);

  const regionListData = useSelector(
    (state: any) =>
      state?.GetRegionList?.getRegionListResponse?.data?.regionData
  );

  const regionIDs = regionListData?.map((item) => item.RegionId);

  const validations = () => {
    if (!vpaData.REGION_ID || vpaData.VPA_ACC_NO.length === 0 || vpaData.VPA_ACC_NO.trim() === "" || vpaData.IFSC_CODE.length === 0 || vpaData.IFSC_CODE.trim() === "" || vpaData.BANK_NAME.length === 0 || vpaData.BANK_NAME.trim() === "") {
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
        "regionId": vpaData.REGION_ID,
        "vpaAccountNumber": vpaData.VPA_ACC_NO,
        "vpaIfscCode": vpaData.IFSC_CODE,
        "vpaBankName": vpaData.BANK_NAME,
    };
    if (!validations()) {
      let res;
      try {
        res = await http.post(`${ADMIN_API_ENDPOINT_V2}${VPA_DATA}`, vpaObj);
        console.log("resresres", res);
        if (res.data.status === true) {
          setSucessMessage(res?.data?.message);
          dispatch(getVpaListAction(1, 10, null, null, null));
          setTimeout(() => {
            setAddDialog(false);
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

  const classes = useStyles();

  return (
    <>
      <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            Enter The Details Of Virtual Payment Address
          </DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
          <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setAddDialog(false)}
          >
            Close
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAdd}
            disabled={validations()}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
