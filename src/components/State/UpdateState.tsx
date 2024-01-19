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
  import { getStateListAction } from "src/store/actions/GetStateListAction";
  import {
    ADMIN_API_ENDPOINT_V2, STATE_DATA
  } from '../../store/constants';
  import http from "../../utils/http";
  
  export default function UpdateState({
    updateDialog,
    setUpdateDialog,
    stateID,
    existingData,
  }) {
    const dispatch = useDispatch();
   
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

    const [stateName, setStateName] = useState('');
    const [stateCode, setStateCode] = useState('');

    useEffect(() => {
      setStateName(existingData.StateName);
      setStateCode(existingData.StateCode);
    }, [existingData])

    const validations = () => {
        if ((stateName === existingData.StateName) && (stateCode === existingData.StateCode)) {
            return true;
        }
        return false;
    }
    
    const [error, setError] = useState('');
    const [successMessage, setSucessMessage] = useState("");
    const handleAdd = async () => {
      setError('')
      setSucessMessage('')
      const stateObj = {
        "stateName": stateName,
        "stateCode": stateCode,
        "stateId": stateID,
      }
      const postUpdateStateObj = Object.keys(stateObj)
      .filter((k) => stateObj[k] != null && stateObj[k] !== "")
      .reduce((a, k) => ({ ...a, [k]: stateObj[k] }), {});
      if (!validations()) { 
        let res;
        try {
              res = await http.patch(
            `${ADMIN_API_ENDPOINT_V2}${STATE_DATA}`, postUpdateStateObj,
          );
          console.log("resresres", res)
          if (res.data.status === true) {
            setSucessMessage(res?.data?.message);
            dispatch(getStateListAction(1, 10, null, null, null));
            setTimeout(() => {
              setUpdateDialog(false);
            }, 1000);
          } 
        } catch (error) {
          console.log("resresres", res)
          console.log('error', error);
          setError(error?.response?.data?.message)
        }
    } else {
        setError('State Name must only contain alpha-numeric characters')
      }
    };

    const classes = useStyles();

    return (
        <>
        <Dialog open={updateDialog} onClose={() => setUpdateDialog(false)}>
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText sx={{ mb: 3 }} style={{ fontWeight: 700, textAlign: "center" }}>Update The Details Of State</DialogContentText>
          <TextField
            margin="dense"
            size="small"
            label="State Name"
            name="StateName"
            type="text"
            fullWidth
            value={stateName}
            onChange={(e: ChangeEvent<any>) => setStateName(e.target.value)}
            required
          />  
          <TextField
            margin="dense"
            size="small"
            fullWidth
            type="text"
            label="State Code"
            name="StateCode"
            value={stateCode}
            onChange={(e: ChangeEvent<any>) => setStateCode(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
        <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
        <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button color="primary" variant="outlined" onClick={() => setUpdateDialog(false)}>
            Close
          </Button>
          <Button color="primary" variant="contained" onClick={handleAdd} disabled={validations()}>
            Update
          </Button>
        </DialogActions>
        </Dialog>
      </>
    );
  }