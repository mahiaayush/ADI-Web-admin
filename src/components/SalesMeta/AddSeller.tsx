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
import { useDispatch, useSelector } from "../../store";
import { makeStyles } from "@material-ui/styles";
import { GetSellerMetaDataAction } from "src/store/actions/GetSellerMetaDataAction";
import {
  ADMIN_API_ENDPOINT_V2,
  SELLER_META_DATA,
} from "../../store/constants";
import http from "../../utils/http";
import { DatePicker } from "@material-ui/lab";
import moment from "moment";

export default function AddSeller({ addDialog, setAddDialog }) {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sellerData, setSellerData] = useState({
    REGION_ID: "",
    SELLER_ID: "",
    TARGET_AMT: null,
    CASH_CAP: null,
  });

  const handleChange = (e: ChangeEvent<any>) => {
    const { name: field, value } = e.target;
    setSellerData({ ...sellerData, [field]: value });
  };

  const regionListData = useSelector(
    (state: any) =>
      state?.GetRegionList?.getRegionListResponse?.data?.regionData
  );
  const sellerListData = useSelector(
    (state: any) =>
      state?.GetSellerData?.getSellerDataResponse?.data?.data?.data
  );

  const cashCapExceed = (show = false) => {
    return show
      ? sellerData.CASH_CAP && sellerData.TARGET_AMT
        ? parseInt(sellerData.CASH_CAP, 10) > parseInt(sellerData.TARGET_AMT, 10)
        : false
      : parseInt(sellerData.CASH_CAP, 10) > parseInt(sellerData.TARGET_AMT, 10);
  };

  const validations = () => {
    if (
      !sellerData.REGION_ID || sellerData.SELLER_ID.length === 0 || sellerData.SELLER_ID.trim() === "" || !sellerData.TARGET_AMT || !startDate || !endDate || cashCapExceed()
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
    const sdate = moment(startDate).format("YYYY-MM-DD");
    const edate = moment(endDate).format("YYYY-MM-DD");

    const sellerObj = {
      regionId: sellerData.REGION_ID,
      userSid: sellerData.SELLER_ID,
      cashCapping: sellerData.CASH_CAP,
      target: sellerData.TARGET_AMT,
      targetStartMonth: sdate,
      targetEndMonth: edate,
    };

    if (!validations()) {
      let res;
      try {
        res = await http.post(
          `${ADMIN_API_ENDPOINT_V2}${SELLER_META_DATA}`,
          sellerObj
        );
        console.log("resresres", res);
        if (res.data.status === true) {
          setSucessMessage(res?.data?.message);
          dispatch(GetSellerMetaDataAction());
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

  const today = new Date();

  return (
    <>
      <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            Enter The Details Of Seller
          </DialogContentText>
          <TextField
            margin="dense"
            size="small"
            fullWidth
            type="number"
            label="Seller"
            name="SELLER_ID"
            value={sellerData.SELLER_ID}
            onChange={handleChange}
            select
            required
          >
            <MenuItem value="">Select Seller</MenuItem>
            {sellerListData && sellerListData.length > 0
              ? sellerListData.map((data) => (
                  <MenuItem key={data?.UserSid} value={data?.UserSid}>
                    {data?.FirstName} {data?.LastName} - {data?.Email}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <TextField
            margin="dense"
            size="small"
            fullWidth
            type="number"
            label="Region"
            name="REGION_ID"
            value={sellerData.REGION_ID}
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
            label="Cash Capping/month"
            name="CASH_CAP"
            type="number"
            fullWidth
            value={sellerData.CASH_CAP}
            onChange={handleChange}
            error={cashCapExceed(true)}
            helperText={cashCapExceed(true) ? "Cash capping should be less than the target amount" : ""}
            required
          />
          <TextField
            margin="dense"
            size="small"
            label="Target Amount/month"
            name="TARGET_AMT"
            type="number"
            fullWidth
            value={sellerData.TARGET_AMT}
            onChange={handleChange}
            required
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "5px",
              }}
            >
              <DatePicker
                views={["year", "month"]}
                label="Target Start Date"
                minDate={moment(today).format("YYYY-MM-DD")}
                maxDate={new Date("2030-06-01")}
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "5px",
              }}
            >
              <DatePicker
                views={["year", "month"]}
                label="Target End Date"
                minDate={moment(startDate).format("YYYY-MM-DD")}
                maxDate={new Date("2030-06-01")}
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
              />
            </div>
          </div>
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
