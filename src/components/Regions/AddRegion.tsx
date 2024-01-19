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
  import { getRegionListAction } from "src/store/actions/GetRegionListAction";
  import {
    ADMIN_API_ENDPOINT_V2, REGION_DATA
  } from '../../store/constants';
  import http from "../../utils/http";
  
  export default function AddRegion({
    addDialog,
    setAddDialog
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

    const [regionName, setRegionName] = useState('');

    const validations = () => {
        if (regionName.length === 0 || regionName.trim() === "") {
            return true;
        }
        return false;
    }
    
    const [error, setError] = useState('');
    const [successMessage, setSucessMessage] = useState("");
    const handleAdd = async () => {
      setError('')
      setSucessMessage('')
      const regionObj = {
        "regionName": regionName,
      }
      if (!validations()) { 
        let res;
        try {
              res = await http.post(
            `${ADMIN_API_ENDPOINT_V2}${REGION_DATA}`, regionObj,
          );
          console.log("resresres", res)
          if (res.data.status === true) {
            setSucessMessage(res?.data?.message);
            dispatch(getRegionListAction(1, 10, null, null, null));
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
        setError('Region Name must only contain alpha-numeric characters')
      }
    };

    const classes = useStyles();

    return (
        <>
        <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText sx={{ mb: 3 }} style={{ fontWeight: 700, textAlign: "center" }}>Enter The Details Of Region</DialogContentText>
          <TextField
            margin="dense"
            size="small"
            label="Region Name"
            name="RegionName"
            type="text"
            fullWidth
            value={regionName}
            onChange={(e: ChangeEvent<any>) => setRegionName(e.target.value)}
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