import {
  Button,
  TextField,
  Grid,
  Card,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";
import { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import styles from "./PlanSelection.module.css";
import OfferCardListPopup from "./OfferCardList/OfferCardList";
import { useDispatch, useSelector } from "../../../store";
import { getInventoryList } from "src/store/actions/inventoryAction";
import {
  checkCardValidity,
  getOfferingList,
  getUserData,
} from "src/store/actions/AddMoreAction";
import { Close } from "@material-ui/icons";
import NumberFormat from "src/components/common/reusable/NumberFormat";
import SelectAsyncPaginate from "src/components/common/reusable/SelectAsyncPaginate"
import { rowsPerPage } from "src/utils/constants";

interface OfferDet {
  CouponCode: string;
  DiscountAmount: number;
  CouponName: string;
  CouponDescription: string;
}

const PlanSelection = ({
  setActiveStep,
  userSid,
  setPlanSelectionData,
  price,
  setPrice,
  quantity,
  setQuantity,
  offerDetails,
  setOfferDetails,
  offeringData,
  setOfferingData,
  active,
  setActive,
  loading, 
  updateMsg
}) => {
  const dispatch = useDispatch();
  const [offers, setOffers] = useState(false);
  const [search, setSearch] = useState("");
  const [cards, setCards] = useState([]);
  const [currentOptionList, setCurrentOptionList] = useState([]);
  const [msg, setMsg] = useState("");
  const cardOption = [
    {
      label: "CSMP",
      value: "S",
    },
    {
      label: "Live Counselling Plans",
      value: "PL",
    },
    {
      label: "Learning Hub Courses",
      value: "P",
    },
    {
      label: "StudyAbroad Package",
      value: "SA",
    },
  ];

  const handleOptions = (e) => {
    const data = JSON?.parse(e.value);
    setPrice(data?.PRICE);
    setOfferingData({ ...offeringData, item: e });
  };

  const handleCategory = (e) => {
    setOfferingData({ ...offeringData, type: e });
    setMsg('');
  };

  const GST = 0.18 * price;

  useEffect(() => {
    dispatch(getUserData(userSid));
  }, []);

  useEffect(() => {
    if (offeringData?.type != null) {
      dispatch(getOfferingList(offeringData?.type?.value));
    }
  }, [offeringData.type]);

  const { userData, inventoryListData, OptionList, cardValid } = useSelector(
    (state: any) => ({
      inventoryListData: state?.inventory?.inventories?.list,
      userData: state?.addMoreRes?.userDataResponse?.data,
      OptionList: state?.addMoreRes?.offeringResponse?.data,
      cardValid: state?.addMoreRes?.cardResponse?.success,
    })
  );

  const userHasCard = userData?.UserCardExist;

  const goToPayment = () => {
    if (offeringData?.item !== null) {
      const finalDataSet = JSON?.parse(offeringData?.item?.value);
      let cardData;
      if (offeringData?.data) {
        cardData = JSON?.parse(offeringData?.data?.value);
      }
      const data = {
        seller_user_sid: userData?.AdminUserId,
        quantity,
        pt_offering_id: finalDataSet.PT_OFFERING_ID,
        allocation_id: cardData?.AllocationId,
        coupon_id: offerDetails.CouponId,
        price: finalDataSet.PRICE - offerDetails.DiscountAmount,
        planSaved: true,
      };
      
      if (active === 1) {
        dispatch(checkCardValidity(cardData?.CsMembershipId, finalDataSet?.PT_OFFERING_TYPE, finalDataSet?.PT_OFFERING_ID)).then((res) => {
          if (res?.data?.status) {
            setPlanSelectionData(data);
            setActiveStep(2);
          } else {
            setMsg(res);
          }
          setTimeout(() => setMsg(""), 5000);
        });
      } else {
        setPlanSelectionData(data);
        setActiveStep(2);
      }
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 50,
      minHeight: 50,
    }),
  };

  useEffect(() => {
    const data = inventoryListData?.map((item) => ({
      label: item.CardDigit,
      value: JSON.stringify(item),
    }));
    setCards([...data]);
    if (offeringData?.data === null) {
      setOfferingData({ ...offeringData, data: data[0] });
    }
  }, [inventoryListData]);

  useEffect(() => {
    const data = OptionList?.map((item) => ({
      label: `${item.PT_OFFERING_NAME}`,
      value: JSON.stringify(item),
    }));
    setCurrentOptionList([...data]);
    if (offeringData?.item !== null) {
      const selectedItem = data.find(
        (option) => option.label === offeringData?.item?.label
      );
      setOfferingData({ ...offeringData, item: selectedItem || data[0] });
      if (selectedItem) {
        const parsed = JSON.parse(selectedItem?.value);
        setPrice(parsed.PRICE * quantity);
      } else {
        setPrice(OptionList[0].PRICE * quantity);
      }
    }
    setMsg('');
  }, [OptionList]);

  const RemoveOffer = () => {
    setOfferDetails({
      CouponCode: "",
      DiscountAmount: 0,
      CouponName: "",
      CouponDescription: "",
    });
  };

  const handleRadioButton = (val) => {
    if (userHasCard && val === 1) {
      setActive(2);
      setOfferingData({ ...offeringData, type: cardOption[0] });
    } else {
      setActive(val);
      if (val > 1) {
        setOfferingData({ ...offeringData, type: cardOption[val - 2] });
      }
    }
  };

  const handleQty = (e): boolean => {
    const qty = parseInt(e.target.value, 10);
    if (qty < 1 || qty >= Number.MAX_SAFE_INTEGER) {
      return false;
    }
    setQuantity(qty);
    const data = JSON?.parse(offeringData?.item?.value);
    if (Number?.isNaN(qty)) {
      setPrice(data?.PRICE * 1);
    } else {
      setPrice(Math.round(data?.PRICE * qty * 100) / 100);
    }
    return true;
  };

  useEffect(() => {
    userData?.UserCardExist ? handleRadioButton(active) : handleRadioButton(1);
  }, [userData]);

  useEffect(() => {
    if (active !== 3 && active !== 5) {
      setQuantity(1);
    }
  }, [active]);

  const handleDisable = ():boolean => {
    if (offeringData?.item == null || ((active === 3 || active === 5) && !quantity)) {
      return true;
    }
    return false;
  }

  const getOptionsListData = useMemo(
    () => async (page, rowsPerPage, searchQuery) => {
      const { list, error, count } = await dispatch(
        getInventoryList(page, rowsPerPage, searchQuery, "I")
      );
      let options = [];
      if (list.length && !error) {
        options = list.map((item) => {
          return {
            value: JSON.stringify(item),
            label: item.CardDigit,
          };
        });
      }
      return { data: options, count };
    },
    []
  );

  return (
    <Grid>
      <Card className={styles.container}>
        <h3>Select Item</h3>
        <div className={styles.row}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            className={styles.radiogroup}
          >
            <FormControlLabel
              value="1"
              control={
                <Radio
                  onChange={() => handleRadioButton(1)}
                  checked={active === 1}
                  disabled={userHasCard}
                />
              }
              label="Card"
            />
            <FormControlLabel
              value="2"
              control={
                <Radio
                  onChange={() => handleRadioButton(2)}
                  checked={active === 2}
                  disabled={!userHasCard}
                />
              }
              label="CSMP"
            />
            <FormControlLabel
              value="3"
              control={
                <Radio
                  onChange={() => handleRadioButton(3)}
                  checked={active === 3}
                  disabled={!userHasCard}
                />
              }
              label="Live Counselling Plans"
            />
            <FormControlLabel
              value="4"
              control={
                <Radio
                  onChange={() => handleRadioButton(4)}
                  checked={active === 4}
                  disabled={!userHasCard}
                />
              }
              label="Learning Hub Courses"
            />
            <FormControlLabel
              value="5"
              control={
                <Radio
                  onChange={() => handleRadioButton(5)}
                  checked={active === 5}
                  disabled={!userHasCard}
                />
              }
              label="Study Abroad Package"
            />
          </RadioGroup>
        </div>
        {active === 1 && (
          <div className={styles.rowselect}>
            {/* <Select
              className={`${styles.select} selectAction`}
              styles={customStyles}
              classNamePrefix="select"
              placeholder="Select Card"
              options={cards}
              isSearchable={true}
              onInputChange={handleSearch}
              onChange={(e) => {
                setOfferingData({ ...offeringData, data: e });
                setMsg("");
              }}
              value={offeringData?.data}
              name="color"
            /> */}
            <SelectAsyncPaginate 
            value={offeringData?.data}  
            onChange={(e) => { setOfferingData({ ...offeringData, data: e }); setMsg(''); }} 
            rowsPerPage={rowsPerPage}
            className={`${styles.select} selectAction`}
            styles={customStyles}
            classNamePrefix="select"
            placeHolder="Select Card"
            getOptionsListData={getOptionsListData}
            />
          </div>
        )}
        {offeringData?.data != null && active === 1 && (
          <div className={styles.rowselect}>
            <Select
              className={`${styles.select} selectAction`}
              styles={customStyles}
              classNamePrefix="select"
              placeholder="Select Category"
              options={cardOption}
              onChange={(e) => handleCategory(e)}
              value={offeringData?.type}
              name="cardoption"
            />
          </div>
        )}
        {offeringData?.type != null && (
          <div className={styles.rowselect}>
            <Select
              className={`${styles.select} selectAction`}
              styles={customStyles}
              classNamePrefix="select"
              placeholder="Select Option"
              options={currentOptionList}
              value={offeringData?.item}
              onChange={(e) => handleOptions(e)}
              name="color"
            />
          </div>
        )}
        {active > 2 && active !== 4 && (
          <div className={styles.rowselect}>
            <TextField
              label="Quantity"
              type="number"
              variant="outlined"
              className={styles.textFieldInner}
              fullWidth
              value={quantity}
              onChange={(e) => handleQty(e)}
            />
          </div>
        )}
        {price !== 0 && (
          <div className={styles.row}>
            <div className={styles.priceOfferSel}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOffers(true)}
                onKeyDown={() => setOffers(true)}
              >
                Apply Offer
              </div>
            </div>
          </div>
        )}
        {price !== 0 && (
          <>
            <div className={styles.row}>
              <div
                style={{
                  display: "flex",
                  marginBottom: "-15px",
                  alignItems: "baseline",
                }}
              >
                <Typography variant="h6" className={styles.headingGap}>
                  Amount(Incl. of 18% GST):{" "}
                </Typography>
                <Typography variant="h6" className={styles.headingGap}>
                  {" "}
                  <NumberFormat Amount={price} decimalScale={2} />
                </Typography>
              </div>
            </div>
            {/* <div className={styles.row}>
              <div
                style={{
                  display: "flex",
                  marginBottom: "-15px",
                  alignItems: "baseline",
                }}
              >
                <Typography variant="body2" className={styles.headingGap}>
                  18% GST:{" "}
                </Typography>
                <Typography variant="body2" className={styles.headingGap}>
                  {" "}
                  <NumberFormat Amount={GST} decimalScale={2} />
                </Typography>
              </div>
            </div> */}
            <div className={styles.row}>
              <div
                style={{
                  display: "flex",
                  marginBottom: "-15px",
                  alignItems: "baseline",
                }}
              >
                <Typography variant="h6" className={styles.headingGap}>
                  Total:{" "}
                </Typography>
                <Typography
                  variant="h6"
                  className={
                    offerDetails.CouponCode !== ""
                      ? styles.headingGap1
                      : styles.headingGap
                  }
                >
                  {" "}
                  <NumberFormat Amount={price} decimalScale={2} />
                </Typography>
              </div>
            </div>
          </>
        )}
        {offerDetails.CouponCode !== "" && price !== 0 && (
          <>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" className={styles.headingGap}>
                  Coupon :
                </Typography>
                <Typography variant="body2">
                  {offerDetails.CouponCode}
                </Typography>
                <Close
                  onClick={() => RemoveOffer()}
                  className={styles.removeClass}
                />
              </div>
              <div style={{ display: "flex" }}>
                <Typography variant="body2" className={styles.headingGap}>
                  Discount :
                </Typography>{" "}
                <Typography variant="body2">
                  <NumberFormat
                    Amount={offerDetails.DiscountAmount}
                    decimalScale={2}
                  />
                </Typography>
              </div>
              <div style={{ display: "flex" }}>
                <Typography variant="h6" className={styles.headingGap}>
                  Final Amount :
                </Typography>{" "}
                <Typography variant="h6">
                  {/* Rs.{price + GST - offerDetails?.DiscountAmount} */}
                  <NumberFormat
                    Amount={price - offerDetails?.DiscountAmount}
                    decimalScale={2}
                  />
                </Typography>
              </div>
            </div>
          </>
        )}
        <div className={styles.row}>
          {msg !== "" && <p className="error">{msg}</p>}
          <Button
            color="primary"
            variant="contained"
            disabled={handleDisable()}
            onClick={() => goToPayment()}
            style={{ marginTop: "20px" }}
          >
            Continue to Payment
          </Button>
        </div>
      </Card>
      {offers && (
        <OfferCardListPopup
          addDialog={offers}
          setAddDialog={setOffers}
          setOfferDetails={setOfferDetails}
          apply={true}
          loading={loading}
          updateMsg={updateMsg}
          price={price}
          gst={GST}
        />
      )}
    </Grid>
  );
};

export default PlanSelection;
