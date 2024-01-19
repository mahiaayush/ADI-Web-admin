import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    NativeSelect,
    TextField,
  } from "@material-ui/core";
  import MenuItem from '@material-ui/core/MenuItem'
  import "../CounselloApplication/DetailScreen.css";
  import type { ChangeEvent } from 'react';
  import { useEffect, useState } from "react";
  import { RootStateOrAny } from "react-redux";
  import { useDispatch, useSelector } from "../../store";
  import { makeStyles } from "@material-ui/styles";
  // import GetGlobalTaxListAction from "src/store/actions/GlobalTaxListAction";
  // import GetEntityMasterPlanAction from "src/store/actions/EntitiesMasterPlanAction";
  import GetEntityItemMasterAction from "src/store/actions/EntitiesItemMasterAction";
  import {
    ADMIN_API_ENDPOINT_V2, POST_GLOBAL_ITEMS
  } from '../../store/constants';
  import http from "../../utils/http";
  // import { postGlobalItem } from "src/store/actions/GlobalItemAction";
  
  export default function AddItem({
    addDialog,
    setAddDialog
  }) {
    const dispatch = useDispatch();
    // useEffect(() => {
    //   // dispatch(GetGlobalTaxListAction());
    //   // dispatch(GetEntityMasterPlanAction());
    //   dispatch(GetEntityItemMasterAction());
    // }, [addDialog])

    // const globalTaxList = useSelector(
    //     (state: RootStateOrAny) => state?.GlobalTaxList?.getGlobalTaxListResponse?.data?.data
    // );
    // const entityMasterPlan = useSelector(
    //     (state: RootStateOrAny) => state?.EntityMasterPlan?.getEntityMasterPlanResponse?.data?.data
    // );

    // const intraTaxList = []
    // const interTaxList = []
    // if (globalTaxList && globalTaxList.length > 0) {
    //   for (let i = 0; i < globalTaxList.length / 2; i++) {
    //     intraTaxList.push(globalTaxList[i]);
    //   }
  
    //   for (let i = globalTaxList.length / 2; i < globalTaxList.length; i++) {
    //     interTaxList.push(globalTaxList[i]);
    //   }
    // }
   
    const useStyles = makeStyles({
      flexParentClass: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      },
      childIInd: {
        textAlign: "right", 
        fontWeight: 600, 
        fontSize: "20px",
        margin: "0 auto"
      },
      chileTextField: {
        width: "70%",
      }
    });
    const [selectedIntraTax, setIntraTax] = useState('');
    const [selectedInterTax, setInterTax] = useState('');
    const [planId, setPlanId] = useState('');
    const [intraTaxObj, setIntraTaxObj] = useState({});
    const [interTaxObj, setInterTaxObj] = useState({});
    const [itemName, setItemName] = useState('');
    const [costPrice, setCostPrice] = useState('');

    const validations = () => {
        if (costPrice.length === 0 || itemName.length === 0) {
            return true;
        }
        return false;
    }
    // useEffect(() => {
    //   if (intraTaxList && intraTaxList.length > 0) {
    //     const index = intraTaxList.findIndex(x => x.tax_name === selectedIntraTax);
    //         if (index >= 0 && index < intraTaxList.length) {
    //           setIntraTaxObj({
    //             "tax_specification": "intra",
    //             "tax_name": intraTaxList[index].tax_name,
    //             "tax_percentage": intraTaxList[index].tax_percentage,
    //             "tax_id": intraTaxList[index].tax_id,
    //           })
    //         }
    //   }
    //   if (interTaxList && interTaxList.length > 0) {
    //     const index = interTaxList.findIndex(x => x.tax_name === selectedInterTax);
    //         if (index >= 0 && index < interTaxList.length) {
    //           setInterTaxObj({
    //             "tax_specification": "inter",
    //             "tax_name": interTaxList[index].tax_name,
    //             "tax_percentage": interTaxList[index].tax_percentage,
    //             "tax_id": interTaxList[index].tax_id,
    //           })
    //         }
    //   }
    // }, [selectedIntraTax, selectedInterTax])
    const [error, setError] = useState('');
    const [successMessage, setSucessMessage] = useState("");
    const handleAdd = async () => {
      setError('')
      setSucessMessage('')
      const itemObj = {
        "ItemName": itemName,
        "CostPrice": costPrice,
        // "Taxinter": interTaxObj,
        // "Taxintra": intraTaxObj,
      }
      // dispatch(postGlobalItem(itemObj)).then(() => setAddDialog(false))
      if (!validations()) { 
        let res;
        try {
              res = await http.post(
            `${ADMIN_API_ENDPOINT_V2}${POST_GLOBAL_ITEMS}`, itemObj,
          );
          console.log("resresres", res)
          if (res.data.status === true) {
            setSucessMessage(res?.data?.message);
            dispatch(GetEntityItemMasterAction(null, 1, 10))
            setTimeout(() => {
              setAddDialog(false);
            }, 1000);
          } 
        } catch (error) {
          console.log("resresres", res)
          console.log('error', error);
          setError(error?.response?.data?.message)
        }
    } else {
        setError('Item Name must only contain alpha-numeric characters and Item Price should be less than 10000')
      }
    };

    const classes = useStyles();

    return (
        <>
        <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText sx={{ mb: 3 }} style={{ fontWeight: 700, textAlign: "center" }}>Enter The Details Of Item</DialogContentText>
          {/* <TextField
            autoFocus
            // className={classes.chileTextField}
            margin="dense"
            size="small"
            label="Select Inter Tax"
            name="ItemTax"
            type="text"
            select
            fullWidth
            value={selectedInterTax}
            onChange={(e: ChangeEvent<any>) => setInterTax(e.target.value)}
            required
          >
              <MenuItem value="">Select Type</MenuItem>
                            {interTaxList && interTaxList.length > 0 ? interTaxList.map((data) => (
                                        <MenuItem key={data?.tax_name} value={data?.tax_name}>{data?.tax_name}</MenuItem>
                                    )) : null}
          </TextField>
          <TextField
            autoFocus
            // className={classes.chileTextField}
            margin="dense"
            size="small"
            label="Select Intra Tax"
            name="ItemTax"
            type="text"
            select
            fullWidth
            value={selectedIntraTax}
            onChange={(e: ChangeEvent<any>) => setIntraTax(e.target.value)}
            required
          >
              <MenuItem value="">Select Type</MenuItem>
                            {intraTaxList && intraTaxList.length > 0 ? intraTaxList.map((data) => (
                                        <MenuItem key={data?.tax_name} value={data?.tax_name}>{data?.tax_name}</MenuItem>
                                    )) : null}
          </TextField> */}
          <TextField
            // className={classes.chileTextField}
            margin="dense"
            size="small"
            label="Item Name"
            name="ItemName"
            type="text"
            fullWidth
            value={itemName}
            onChange={(e: ChangeEvent<any>) => setItemName(e.target.value)}
            required
          />  
          <TextField
          //  className={classes.chileTextField}
            margin="dense"
            size="small"
            fullWidth
            type="number"
            label="Item Price"
            name="ItemPrice"
            onChange={(e: ChangeEvent<any>) => setCostPrice(e.target.value)}
            value={costPrice}
            required
          />
        </DialogContent>
        <DialogActions>
        <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
        <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button color="primary" variant="outlined" onClick={() => setAddDialog(false)}>
            Close
          </Button>
          <Button color="primary" variant="contained" onClick={handleAdd} disabled={validations()}>
            Add
          </Button>
        </DialogActions>
        </Dialog>
      </>
    );
  }