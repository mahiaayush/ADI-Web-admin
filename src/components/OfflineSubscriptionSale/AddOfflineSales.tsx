import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  NativeSelect,
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import type { ChangeEvent } from "react";
import "../CounselloApplication/DetailScreen.css";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "../../store";
import GetPlatformOfferingAction from "src/store/actions/GetPlatformOfferingAction";
import Select from "react-select";
import {
  ADMIN_API_ENDPOINT_V2,
  POST_OFFLINE_SALES,
} from "../../store/constants";
import http from "../../utils/http";

export default function AddCardAllocation({ addDialog, setAddDialog }) {
  const dispatch = useDispatch();
  const [offlineSalesData, setofflineSalesData] = useState({
    USER_SID: "",
    INVOICE_NO: "",
    PLATFORM_OFFERING: null,
    TRANSACTION_ID: "",
    SUBSCRIPTION_ID: "",
    PAYMENT_GATEWAY: "",
    PAYMENT_MODE: "ONLINE"
  });

  const paymentModeOptions = [{ value: "ONLINE", label: "Online" }, { value: "OFFLINE", label: "Offline" }];

  const userSidValidation = () => {
    return offlineSalesData?.USER_SID?.length > 36 
  };

  useEffect(() => {
   dispatch(GetPlatformOfferingAction());
  }, [])

  const validations = () => {
    if (
      offlineSalesData?.USER_SID?.trim() === "" || offlineSalesData?.USER_SID?.length < 36 || userSidValidation() || offlineSalesData?.INVOICE_NO?.trim() === "" || !offlineSalesData?.PLATFORM_OFFERING 
    ) {
      return true;
    }
    return false;
  };

  const platformOfferingData = useSelector(
    (state: any) =>
      state?.GetPlatformOffering?.GetPlatformOfferingResponse?.data?.data?.rows
  );

  const handleChange = (e: ChangeEvent<any>) => {
    const { name: field, value } = e.target;
    setofflineSalesData({ ...offlineSalesData, [field]: value });
  };

  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const handleAdd = async () => {
    setError("");
    setSucessMessage("");
    const offlineSalesObj = offlineSalesData.PAYMENT_MODE === "ONLINE"
        ? {
            pt_offering_id: offlineSalesData.PLATFORM_OFFERING,
            invoice_number: offlineSalesData.INVOICE_NO,
            user_sid: offlineSalesData.USER_SID,
            transaction_id: offlineSalesData.TRANSACTION_ID,
            order_id: offlineSalesData.SUBSCRIPTION_ID,
            payment_gateway: offlineSalesData.PAYMENT_GATEWAY,
            payment_mode: offlineSalesData.PAYMENT_MODE,
          }
        : {
            pt_offering_id: offlineSalesData.PLATFORM_OFFERING,
            invoice_number: offlineSalesData.INVOICE_NO,
            user_sid: offlineSalesData.USER_SID,
            payment_mode: offlineSalesData.PAYMENT_MODE,
          };
      
      if (!validations()) {
      let res;
      try {
        res = await http.post(
          `${ADMIN_API_ENDPOINT_V2}${POST_OFFLINE_SALES}`,
          offlineSalesObj
        );
        if (res.data.status === true) {
          setSucessMessage(res?.data?.message);
          setTimeout(() => {
            setAddDialog(false);
          }, 1000);
        } else {
          setError(res?.data?.message);
        }
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    } else {
      setError("Some error occured");
    }
  };

  return (
    <>
      <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
        <DialogContent style={{ width: "500px", height: offlineSalesData.PAYMENT_MODE === "ONLINE" ? "650px" : "450px" }}>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, fontSize: 25, textAlign: "center" }}
          >
            Capture Offline Sales
          </DialogContentText>
          <DialogContentText color="black" style={{ fontSize: 17 }}>
            User SID (CognitoId)
          </DialogContentText>
          <TextField
            margin="dense"
            size="small"
            label="Enter User SID"
            name="USER_SID"
            type="text"
            fullWidth
            value={offlineSalesData.USER_SID}
            onChange={handleChange}
            error={userSidValidation()}
            helperText={userSidValidation() ? "User SID Should be 36 Characters Long" : ""}
            required
          />
    
          <DialogContentText color="black" style={{ fontSize: 17 }}>
            Invoice Number
          </DialogContentText>
          <TextField
            margin="dense"
            size="small"
            label="Enter Invoice Number"
            name="INVOICE_NO"
            type="text"
            fullWidth
            value={offlineSalesData.INVOICE_NO}
            onChange={handleChange}
            required
          />
         
          <DialogContentText color="black" style={{ fontSize: 17 }}>
            Platform Offering
          </DialogContentText>
          <TextField
            margin="dense"
            size="small"
            fullWidth
            type="number"
            label="Select Platform Offering"
            name="PLATFORM_OFFERING"
            value={offlineSalesData.PLATFORM_OFFERING}
            onChange={handleChange}
            select
            required
          >
            {platformOfferingData && platformOfferingData.length > 0
              ? platformOfferingData.map((data) => (
                  <MenuItem key={data?.pt_offering_id} value={data?.pt_offering_id}>
                    {data?.pt_offering_name}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <DialogContentText color="black" style={{ fontSize: 17 }}>
            Payment Mode
          </DialogContentText>
          <FormControl>
              <RadioGroup 
                className="parent-Divs"
                aria-labelledby="demo-radio-buttons-group-label"
                name="PAYMENT_MODE"
                style={{ flexDirection: 'initial' }}
                value={offlineSalesData.PAYMENT_MODE}
              >
          {paymentModeOptions && paymentModeOptions.map((item, index) => (
                <FormControlLabel value={item.value} control={<Radio />} label={item.label} onChange={handleChange} />
            ))}
            </RadioGroup>
              </FormControl>
         {offlineSalesData.PAYMENT_MODE === "ONLINE" ? (
          <>
          <DialogContentText color="black" style={{ fontSize: 17 }}>
            Transaction ID
          </DialogContentText>
          <TextField
            margin="dense"
            size="small"
            label="Enter Transaction ID (Eg. pay_xxxxxxxx)*"
            name="TRANSACTION_ID"
            type="text"
            fullWidth
            value={offlineSalesData.TRANSACTION_ID}
            onChange={handleChange}
          />
          <DialogContentText color="black" style={{ fontSize: 17 }}>
            Subscription ID
          </DialogContentText>
          <TextField
            margin="dense"
            size="small"
            label="Enter Subscription ID (Eg. Order_xxxxxxxx)*"
            name="SUBSCRIPTION_ID"
            type="text"
            fullWidth
            value={offlineSalesData.SUBSCRIPTION_ID}
            onChange={handleChange}
          />
          <DialogContentText color="black" style={{ fontSize: 17 }}>
            Payment Gateway Use
          </DialogContentText>
          <TextField
            margin="dense"
            size="small"
            label="Enter Payment Gateway (Eg. Razorpay, Other, )*"
            name="PAYMENT_GATEWAY"
            type="text"
            fullWidth
            value={offlineSalesData.PAYMENT_GATEWAY}
            onChange={handleChange}
          />
          </>
         ) : null}     
        
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
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
