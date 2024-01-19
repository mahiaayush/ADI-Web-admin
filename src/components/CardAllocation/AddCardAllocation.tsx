import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import "../CounselloApplication/DetailScreen.css";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "../../store";
import { getStateListAction } from "src/store/actions/GetStateListAction";
import { debounce } from "lodash";
import { debounceDelay } from "src/utils/constants";
import { GetSellerDataAction } from "src/store/actions/GetSellerDataAction";
import getCardLotAction from "src/store/actions/GetCardLotAction";
import Select from "react-select";
import {
  ADMIN_API_ENDPOINT_V2,
  POST_CARD_ALLOCATION,
} from "../../store/constants";
import http from "../../utils/http";

export default function AddCardAllocation({ addDialog, setAddDialog }) {
  const dispatch = useDispatch();
  const [sellerID, setSellerID] = useState(null);
  const [lotID, setLotID] = useState(null);
  const [searchSellerName, setSearchSellerName] = useState("");
  const [searchCardLot, setSearchCardLot] = useState("");
  const [sellerOptions, setSellerOptions] = useState([]);
  const [cardLotOptions, setCardLotOptions] = useState([]);
  useEffect(() => {
    dispatch(GetSellerDataAction(1, 20, searchSellerName));
  }, [searchSellerName]);

  useEffect(() => {
    dispatch(getCardLotAction(searchCardLot));
  }, [searchCardLot]);

  const validations = () => {
    if (
      sellerID?.value?.length === 0 || sellerID?.value?.trim() === "" || !lotID
    ) {
      return true;
    }
    return false;
  };

  const sellerListData = useSelector(
    (state: any) =>
      state?.GetSellerData?.getSellerDataResponse?.data?.data?.data
  );

  useEffect(() => {
    if (sellerListData?.length) {
      const options = sellerListData.map((item) => ({
        value: item.UserSid,
        label: `${item.FirstName} ${item.LastName} - ${item.Email}`,
      }));

      setSellerOptions(options);
    }
  }, [sellerListData]);

  const cardLotData = useSelector(
    (state: any) => state?.GetCardLot?.getCardLotResponse?.data
  );

  useEffect(() => {
    if (cardLotData?.length) {
      const options = cardLotData.map((item) => ({
        value: item,
        label: item,
      }));
      setCardLotOptions(options);
    }
  }, [cardLotData]);

  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const handleAdd = async () => {
    setError("");
    setSucessMessage("");
    const cardAllocationObj = {
      sellerUserSid: sellerID.value,
      cardLotNumber: lotID.value,
    };
    if (!validations()) {
      let res;
      try {
        res = await http.post(
          `${ADMIN_API_ENDPOINT_V2}${POST_CARD_ALLOCATION}`,
          cardAllocationObj
        );
        console.log("resresres", res);
        if (res.data.status === true) {
          setSucessMessage(res?.data?.message);
          dispatch(getStateListAction(1, 10, null, null, null));
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

  const handleSearch = useMemo(
    () =>
      debounce((e) => {
        setSearchSellerName(e);
      }, debounceDelay),
    []
  );

  const handlecardLotSearch = useMemo(
    () =>
      debounce((e) => {
        setSearchCardLot(e);
      }, debounceDelay),
    []
  );

  return (
    <>
      <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            Assign Card to Seller
          </DialogContentText>

          <div style={{ marginBottom: "15px" }}>
            <Select
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              classNamePrefix="select"
              placeholder="Sales Person Name"
              options={sellerOptions}
              isSearchable={true}
              onInputChange={handleSearch}
              onChange={(e) => setSellerID(e)}
              value={sellerID}
              name="color"
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Select
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
              classNamePrefix="select"
              placeholder="Card LOT"
              options={cardLotOptions}
              isSearchable={true}
              onInputChange={handlecardLotSearch}
              onChange={(e) => setLotID(e)}
              value={lotID}
              name="color"
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
