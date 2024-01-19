import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import Select from "react-select";
import MenuItem from '@material-ui/core/MenuItem'
import "../CounselloApplication/DetailScreen.css";
import type { ChangeEvent } from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store";
import { getRegionListAction } from "src/store/actions/GetRegionListAction";
import { GetCouponDetailAction, getOfferListAction } from "src/store/actions/GetOfferListAction";
import { DatePicker } from "@material-ui/lab";
import { getOfferingList } from "src/store/actions/AddMoreAction";
import {
  ADMIN_API_ENDPOINT_V2, OFFER_DATA
} from '../../store/constants';
import http from "../../utils/http";
import moment from "moment";
import INR from "../../assets/images/rupee-indian.png";
import Percentage from "../../assets/images/percentage.png";
import { readOnlySelect } from "../common/commonStyles";
import { distributionTypes } from "./options";

export default function AddOffer({
  addDialog,
  setAddDialog,
  couponId = null,
}) {
  type CouponObj = {
    couponId: string,
    couponName: string,
    couponCode: string,
    couponDescription: string,
    maxRedemLimit?: number,
    minOrder: number | string,
    maxDiscount: number | string,
    discountType: string,
    discountAmount: string,
    couponStartDate: string,
    couponExpiryDate: string,
    distribution: string,
    platformOfferings: Array<number>,
    regionId: string
  };
  const dispatch = useDispatch();

  const regionListData = useSelector(
    (state: any) =>
      state?.GetRegionList?.getRegionListResponse?.data?.regionData
  );

  const OptionList = useSelector(
    (state: any) => state?.addMoreRes?.offeringResponse?.data
  );

  const [regionID, setRegionID] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date();
  const currDate = new Date(today.setDate(today.getDate()));
  currDate.setHours(0);
  currDate.setMinutes(0);
  currDate.setSeconds(0);
  let minEndDate: any;
  if (startDate) {
    minEndDate = moment(startDate).add(0, 'day')
  }
  const [couponData, setCouponData] = useState({
    "couponCode": "",
    "couponName": "",
    "couponDescription": "",
    "maxRedemLimit": null,
    "minOrder": null,
    "maxDiscount": null,
    "discountType": "",
    "discountAmount": "",
    "distribution": "A",
    "limit": null,
  });
  const [useCoupon, setUseCoupon] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [planName, setPlanName] = useState('A');
  const [options, setOptions] = useState(null);
  const [selectedValue, setSelectedValue] = useState([]);

  const couponDetail = useSelector(
    (state: any) =>
      state?.GetGlobalCoupon?.getCouponDetailResponse?.data || {}
  );

  useEffect(() => {
    if (couponId && couponDetail && couponDetail.CouponId) {
      setCouponData({
        "couponCode": couponDetail.CouponCode,
        "couponName": couponDetail.CouponName,
        "couponDescription": couponDetail.CouponDescription,
        "maxRedemLimit": couponDetail.MaxredemLimit?.toString(),
        "minOrder": couponDetail.MinOrder?.toString(),
        "maxDiscount": couponDetail.MaxDiscount?.toString(),
        "discountType": couponDetail.DiscountType,
        "discountAmount": couponDetail.DiscountAmount?.toString(),
        "distribution": couponDetail.Distribution,
        "limit": couponDetail.MaxredemLimit > 2 ? couponDetail.MaxredemLimit?.toString() : null,
      });
      setStartDate(new Date(couponDetail.CouponStartDate));
      setEndDate(new Date(couponDetail.CouponExpiryDate));
      setDiscount(couponDetail.DiscountType === "percentage" ? "per" : "flat");
      setUseCoupon(couponDetail.MaxredemLimit > 2 ? "3" : couponDetail.MaxredemLimit?.toString());
      setRegionID(couponDetail.CouponRegions?.[0]?.RegionId || null);
      setPlanName(couponDetail.Distribution || null);
      setSelectedValue(couponDetail.CouponOfferings?.length
        ? couponDetail.CouponOfferings.map(item => ({
          label: item?.PtOfferingName,
          value: item?.OfferingId,
        })) : []);
    }
  }, [couponDetail, couponId]);

  const handleChange = (e: ChangeEvent<any>): void => {
    if (e.target.name === "maxDiscount") {
      if (parseInt(e.target.value, 10) < 0) {
        return;
      }
      const { name: field, value } = e.target;
      setCouponData({ ...couponData, [field]: value });
    } else if (
      e.target.name === "discountAmount" || e.target.name === "limit" || e.target.name === "minOrder"
    ) {
      if (
        parseInt(e.target.value, 10) > parseInt(e.target.max, 10) || parseInt(e.target.value, 10) < parseInt(e.target.min, 10)
      ) {
        return;
      }
      const { name: field, value } = e.target;
      setCouponData({ ...couponData, [field]: value });
    } else {
      const { name: field, value } = e.target;
      setCouponData({ ...couponData, [field]: value });
    }
  };

  useEffect(() => {
    dispatch(getRegionListAction(null, null, null, null, null, 'A'));
  }, [])

  useEffect(() => {
    const data = OptionList?.map(item => ({
      label: item?.PT_OFFERING_NAME,
      value: item?.PT_OFFERING_ID,
    }));
    setOptions(data);
  }, [OptionList])

  const validations = () => {
    if (couponData.couponName.trim().length === 0 || couponData.couponCode.trim().length === 0 || !couponData.discountAmount || !startDate || !endDate || couponData.discountType === "" || couponData.distribution === "" || (planName !== "A" && selectedValue.length === 0) || !planName || !discount || !useCoupon || (useCoupon === "3" && couponData.limit === "1")) {
      return true;
    }
    return false;
  }

  const handleSelectChange = (event: any) => {
    if (selectedValue) setSelectedValue([]);
    setPlanName(event.target.value);
    if (event.target.value !== "A") {
      dispatch(getOfferingList(event.target.value));
    }
    setCouponData({ ...couponData, distribution: event.target.value })
  }

  const [error, setError] = useState('');
  const [successMessage, setSucessMessage] = useState("");

  const handleSubmit = async () => {
    const ptArrray: any = [];
    for (let i = 0; i < selectedValue?.length; i++) {
      ptArrray.push(selectedValue?.[i]?.value)
    }
    setError('')
    setSucessMessage('')
    const sdate = moment(startDate).format('YYYY-MM-DD');
    const edate = moment(endDate).format('YYYY-MM-DD');

    const sdateChange = couponId ? sdate !== moment(couponDetail.CouponStartDate).format('YYYY-MM-DD') : true;
    const edateChange = couponId ? edate !== moment(couponDetail.CouponExpiryDate).format('YYYY-MM-DD') : true;

    const couponObj: CouponObj = {
      "couponId": couponId || undefined,
      "couponName": !!couponId && couponData.couponName === couponDetail.CouponName ? undefined : couponData.couponName,
      "couponCode": couponId ? undefined : couponData.couponCode,
      "couponDescription": couponData.couponDescription,
      "minOrder": couponData.minOrder ? parseInt(couponData.minOrder, 10) : "",
      "maxDiscount": couponData.maxDiscount ? parseInt(couponData.maxDiscount, 10) : "",
      "discountType": couponData.discountType,
      "discountAmount": parseFloat(couponData.discountAmount).toFixed(2),
      "couponStartDate": sdateChange ? sdate : undefined,
      "couponExpiryDate": edateChange ? edate : undefined,
      "distribution": planName,
      "platformOfferings": couponId ? undefined : ptArrray,
      "regionId": couponId ? undefined : regionID,
      "maxRedemLimit": couponData.maxRedemLimit,
    }
    if (parseInt(useCoupon, 10) > 2) {
      couponObj.maxRedemLimit = parseInt(couponData.limit, 10);
    } else {
      couponObj.maxRedemLimit = parseInt(useCoupon, 10);
    }
    if (!validations()) {
      let res: any;
      try {
        res = await http[couponId ? 'patch' : 'post'](
          `${ADMIN_API_ENDPOINT_V2}${OFFER_DATA}`,
          couponObj
        );
        if (res.data.status === true) {
          setSucessMessage(res?.data?.message);
          dispatch(getOfferListAction(1, 10, null, null, null));
          if (couponId) {
            dispatch(GetCouponDetailAction(couponId));
          }
          setTimeout(() => {
            setAddDialog(false);
          }, 1000);
        }
      } catch (error) {
        console.log("error", error);
        setError(error?.response?.data?.message);
      }
    } else {
      setError("Validation Issues");
    }
  };

  return (
    <>
      <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
        <DialogContent>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            {couponId ? 'Update' : 'Enter'} The Details Of Coupon
          </DialogContentText>
          <TextField
            margin="dense"
            size="small"
            label="Coupon Code"
            name="couponCode"
            type="text"
            fullWidth
            value={couponData.couponCode.toUpperCase()}
            onChange={handleChange}
            required
            classes={couponId ? { root: 'readOnly' } : {}}
            InputProps={couponId ? { className: 'readOnlyInput' } : {}}
            InputLabelProps={couponId ? { className: 'readOnlyLabel' } : {}}
          />
          <TextField
            margin="dense"
            size="small"
            label="Coupon Name"
            name="couponName"
            type="text"
            fullWidth
            value={couponData.couponName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            size="small"
            label="Coupon Description"
            name="couponDescription"
            type="text"
            fullWidth
            value={couponData.couponDescription}
            onChange={handleChange}
          />
          <FormControl className="displayFlexMain">
            <FormLabel id="demo-form-control-label-placement">Use</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              // className={styles.radiogroup}
            >
              <FormControlLabel
                value={1}
                control={
                  <Radio
                    onChange={(e) => setUseCoupon(e.target.value)}
                    checked={useCoupon === "1"}
                    // disabled={userHasCard}
                  />
                }
                label="Single"
              />
              <FormControlLabel
                value={0}
                control={
                  <Radio
                    onChange={(e) => setUseCoupon(e.target.value)}
                    checked={useCoupon === "0"}
                    // disabled={userHasCard}
                  />
                }
                label="Unlimited"
              />
              <FormControlLabel
                value={3}
                control={
                  <Radio
                    onChange={(e) => setUseCoupon(e.target.value)}
                    checked={useCoupon === "3"}
                    // disabled={userHasCard}
                  />
                }
                label="Multi-Use"
              />
              {useCoupon === "3" && (
                <TextField
                  size="small"
                  placeholder="limit"
                  name="limit"
                  sx={{ width: 120, ml: 2 }}
                  onChange={handleChange}
                  type="tel"
                  value={couponData.limit}
                  inputProps={{ max: "127", min: "1" }}
                  error={couponData.limit === "1"}
                  helperText={couponData.limit === "1" ? "Limit > 1" : ""}
                  onKeyDown={(e) => {
                    if (
                      !(
                        (e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 || e.keyCode === 9
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              )}
            </RadioGroup>
          </FormControl>
          <FormControl className="displayFlexMain">
            <FormLabel id="demo-form-control-label-placement">
              Discount
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              // className={styles.radiogroup}
            >
              <FormControlLabel
                value="per"
                control={
                  <Radio
                    onChange={(e) => {
                      setDiscount(e.target.value);
                      setCouponData({
                        ...couponData,
                        discountType: "percentage",
                      });
                    }}
                  />
                }
                checked={discount === "per"}
                label="Percentage"
              />
              <FormControlLabel
                value="flat"
                control={
                  <Radio
                    onChange={(e) => {
                      setDiscount(e.target.value);
                      setCouponData({ ...couponData, discountType: "flate" });
                    }}
                  />
                }
                checked={discount === "flat"}
                label="Flat"
              />
              <div className="wrapper-rupee">
                {discount !== null && (
                  <img
                    src={discount === "per" ? Percentage : INR}
                    alt="rupIcon"
                    className="imgStyle"
                  />
                )}
                {discount !== null && (
                  <>
                    {discount === "per" ? (
                      <TextField
                        // margin="dense"
                        size="small"
                        // className="textFieldFlowRight"
                        placeholder="percentage"
                        name="discountAmount"
                        onChange={handleChange}
                        type="number"
                        inputProps={{ max: "100", min: "1" }}
                        value={couponData.discountAmount}
                        sx={{
                          width: 120,
                        }}
                        fullWidth
                      />
                    ) : (
                      <TextField
                        // margin="dense"
                        size="small"
                        // className="textFieldFlowRight"
                        placeholder="flat"
                        name="discountAmount"
                        onChange={handleChange}
                        type="number"
                        inputProps={{ max: "1000000", min: "1" }}
                        value={couponData.discountAmount}
                        onKeyDown={(e) => {
                          if (
                            !(
                              (e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 || e.keyCode === 9
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                        sx={{
                          width: 120,
                        }}
                        fullWidth
                      />
                    )}
                  </>
                )}
              </div>
            </RadioGroup>
          </FormControl>
          {discount === "per" && (
            <TextField
              margin="dense"
              size="small"
              label="Max Discount"
              name="maxDiscount"
              type="tel"
              InputProps={{ inputProps: { min: 1 } }}
              fullWidth
              value={couponData.maxDiscount}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (
                  !(
                    (e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 || e.keyCode === 9
                  )
                ) {
                  e.preventDefault();
                }
              }}
            />
          )}
          <TextField
            margin="dense"
            size="small"
            label="Min Order"
            name="minOrder"
            type="tel"
            fullWidth
            value={couponData.minOrder}
            // InputProps={{ inputProps: { min: 1, max: 99 } }}
            inputProps={{ max: "99", min: "1" }}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (
                !(
                  (e.keyCode > 95 && e.keyCode < 106) || (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 8 || e.keyCode === 9
                )
              ) {
                e.preventDefault();
              }
            }}
          />
          <TextField
            margin="dense"
            size="small"
            fullWidth
            type={couponId ? "text" : "number"}
            label="Region"
            name="Region"
            value={regionID}
            onChange={(e: ChangeEvent<any>) => setRegionID(e.target.value)}
            select={true}
            required
            classes={couponId ? { root: 'readOnly' } : {}}
            InputProps={couponId ? { className: 'readOnlyInput' } : {}}
            InputLabelProps={couponId ? { className: 'readOnlyLabel' } : {}}
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
          {/* <TextField
            margin="dense"
            size="small"
            fullWidth
            type="text"
            label="Distribution Type"
            name="distribution"
            value={couponId ? distributionTypes[planName] : planName}
            onChange={(e) => handleSelectChange(e)}
            select={!couponId}
            required
            classes={couponId ? { root: 'readOnly' } : {}}
            InputProps={couponId ? { className: 'readOnlyInput' } : {}}
            InputLabelProps={couponId ? { className: 'readOnlyLabel' } : {}}
          >
            {Object.entries(distributionTypes).map(([key, label]) => <MenuItem value={key}>{label}</MenuItem>)}
          </TextField> */}
          {/* {planName !== "A" && planName && (
            <Select
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }), ...readOnlySelect }}
              classNamePrefix="select"
              placeholder={distributionTypes[planName]}
              options={options}
              value={couponId ? selectedValue?.map((item) => ({ ...item, isFixed: true })) : selectedValue}
              onChange={(e) => setSelectedValue([...e])}
              isMulti
              isDisabled={!!couponId}
            />
          )} */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <DatePicker
              onChange={(date) => setStartDate(date)}
              value={startDate}
              minDate={couponId && startDate < currDate ? startDate : currDate}
              renderInput={(params) => (
                <TextField {...params} helperText="Coupon Start Date" />
              )}
            />
            <DatePicker
              onChange={(date) => setEndDate(date)}
              value={endDate}
              disabled={!startDate}
              minDate={minEndDate}
              renderInput={(params) => (
                <TextField {...params} helperText="Coupon Expiry Date" />
              )}
            />
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
            onClick={handleSubmit}
            disabled={validations()}
          >
            {couponId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}