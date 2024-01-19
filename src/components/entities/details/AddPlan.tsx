import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { userValidator } from "../../../utils/validations";
import "./addPlan.css";
import {
  Grid,
  Select,
  OutlinedInput,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import { DateTimePicker } from "@material-ui/lab";
import { postEntityAssignPackage } from "../../../store/actions/entityAssignPackageAction";
// import { getEntityAssignedPackage } from '../../../store/actions/entityAssignedPackageAction';
import GetEntityItemMasterAction from "src/store/actions/EntitiesItemMasterAction";
import { getEntityItemDetail } from "../../../store/actions/GetEntityItemDetailAction";
import GetEntityMappedItemAction from "../../../store/actions/entitiesMappedItemAction";
import { postEntityMapItem } from "src/store/actions/entityMapItemAction";
import { ChangeEntityPackageAction } from "../../../store/actions/ChangeEntityPackageAction";
import { useDispatch, useSelector } from "../../../store";
import { forEach } from "lodash";
import {
  ADMIN_API_ENDPOINT_V2, POST_ENTITIES_MAP_ITEM
} from '../../../store/constants';
import http from "../../../utils/http";

const AddPlanDialog = ({
  open = false,
  pkgID = "",
  onClose = () => {},
  onSubmit = () => {},
}) => {
  const [step, setStep] = useState(0);
  const [item, setItem] = React.useState<string[]>([]);
  const dispatch = useDispatch();

  const handleBack = () => {
    setStep(0);
  };
  const ITEM_HEIGHT = 150;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 400,
      },
    },
  };

  useEffect(() => {
    dispatch(GetEntityMappedItemAction(pkgID));
  }, []);

  const enityitemmaster = useSelector(
    (state) => state?.entityMappedItem?.entityMappedItem?.data?.data
  );
  const [entityItemList, setEntityItemList] = useState([]);
  useEffect(() => {
    if (enityitemmaster) {
      const data = JSON.parse(JSON.stringify(enityitemmaster));
      setEntityItemList(data);
      const mappedItemData = enityitemmaster?.filter(
        (data) => data.IsItemMapped === true
      );
      const name = mappedItemData?.map((data) => data.ItemName);
      setItem(name);
    }
  }, [enityitemmaster]);
  const mappedItemData = enityitemmaster?.filter(
    (data) => data.IsItemMapped === true
  );
  const mappedItemIds = mappedItemData?.map((data) => data.ItemId);
  const [error, setError] = useState('');
  const [successMessage, setSucessMessage] = useState("");
  const handleSubmit = async () => {
    setError('')
    setSucessMessage('')
    const url = window.location.href;
    const entityId = url.substring(url.lastIndexOf("/") + 1);
    const itemsData = entityItemList.filter(
      (data) => data.IsItemMapped === true
    );
    const itemsIds = itemsData.map((data) => data.ItemId);
    const itemsToAdd = [];
    entityItemList.forEach((item) => {
      let isItemUnchecked = false;
      if (mappedItemIds.includes(item.ItemId) && !item.IsItemMapped) {
        isItemUnchecked = true;
        itemsToAdd.push({
          itemId: item.ItemId,
          isItemUnchecked,
          itemName: item.ItemName,
        });
      } else if (!mappedItemIds.includes(item.ItemId) && item.IsItemMapped) {
        isItemUnchecked = false;
        itemsToAdd.push({
          itemId: item.ItemId,
          isItemUnchecked,
          itemName: item.ItemName,
        });
      }
    });
    const postEntityMapItemData = {
      EntityPackageId: pkgID,
      ItemIds: itemsToAdd,
    };
    // await dispatch(postEntityMapItem(postEntityMapItemData));
    // await dispatch(getEntityItemDetail(entityId));
    // onClose();

    if (itemsToAdd.length) { 
      let res;
      try {
            res = await http.post(
          `${ADMIN_API_ENDPOINT_V2}${POST_ENTITIES_MAP_ITEM}`, postEntityMapItemData,
        );
        if (res.data.status === true) {
          setSucessMessage('Successfully updated mapped items and entities');
          await dispatch(getEntityItemDetail(entityId));
          setTimeout(() => {
            onClose();
          }, 1000);
        } 
      } catch (error) {
        setError(error?.response?.data?.message)
      }
  } else {
      setError('Please Check / Uncheck atleast one item')
    }
  };

  const handleItemChange = (event) => {
    const {
      target: { value },
    } = event;
    setItem(typeof value === "string" ? value.split(",") : value);
  };

  const url = window.location.href;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      classes={{
        paper: step === 1 ? "add_plan plan_detail" : "add_plan plan_type",
      }}
    >
      <DialogTitle id="form-dialog-title">Select Item</DialogTitle>

      <>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item sm={12} xs={12}>
            <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Items
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={item}
                  onChange={handleItemChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>No Item selected</em>;
                    }
                    if (selected.length > 3) {
                      return <em>{selected.length} Items selected</em>;
                    }
                    return selected.join(", ");
                  }}
                >
                  {entityItemList && entityItemList.map((data) => (
                      <MenuItem 
                      key={data?.ItemId} 
                      value={data?.ItemName}
                      disabled={data?.IsItemMapped && data?.IsItemUsed}
                       onClick={() => {
                        data.IsItemMapped = !data.IsItemMapped;
                        setEntityItemList(entityItemList);
                      }}
                      >
                        <Checkbox
                          checked={data?.IsItemMapped}
                        />
                        <ListItemText
                          primary={data?.ItemName.concat(
                            " (",
                            data?.CostPrice,
                            " INR)"
                          )}
                        />
                      </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </div>
          </Grid>
        </Grid>
        
        <DialogActions style={{ position: "absolute", bottom: 10, right: 10 }}>
        <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
        <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={!item}
          >
            Submit
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

AddPlanDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  pkgID: PropTypes.object.isRequired,
};

export default AddPlanDialog;
