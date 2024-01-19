import {
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    NativeSelect,
    TextField,
    MenuItem,
  } from "@material-ui/core";
  import "../CounselloApplication/DetailScreen.css";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "../../store";
  import { makeStyles } from "@material-ui/styles";
  import { getVpaListAction } from "src/store/actions/GetVpaListAction";
  import {
    ADMIN_API_ENDPOINT_V2, VPA_DATA
  } from '../../store/constants';
  import http from "../../utils/http";
  
  export default function UpdateVpaStatus({
    updateStatusDialog,
    setUpdateStatusDialog,
    existingVpaStatus,
    vpaID
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

    const [vpaStatus, setVpaStatus] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSucessMessage] = useState("");
    useEffect(() => {
        if (updateStatusDialog) {
            setVpaStatus(existingVpaStatus === "A" ? "I" : "A")
        }    
    }, [updateStatusDialog])
    const handleAdd = async () => {
      setError('')
      setSucessMessage('')

      const vpaObj = {
        "vpaId": vpaID,
        "vpaStatus": vpaStatus,
      };
    
        let res;
        try {
              res = await http.patch(
            `${ADMIN_API_ENDPOINT_V2}${VPA_DATA}`, vpaObj,
          );
          console.log("resresres", res)
          if (res.data.status === true) {
            setSucessMessage(res?.data?.message);
            dispatch(getVpaListAction(1, 10, null, null, null));
            setTimeout(() => {
              setUpdateStatusDialog(false);
            }, 1000);
          } 
        } catch (error) {
          console.log("resresres", res)
          console.log('error', error);
          setError(error?.response?.data?.message)
        }
    };

    return (
        <>
        <Dialog open={updateStatusDialog} onClose={() => setUpdateStatusDialog(false)}>
        <DialogContent style={{ width: "500px" }}>
          <DialogContentText sx={{ mb: 3 }} style={{ fontWeight: 700, textAlign: "center" }}>Update Vpa Status</DialogContentText>
            <p>{existingVpaStatus === "A" ? "Do you want to Deactivate Vpa?" : "Do you want to Activate Vpa?"}</p> 
        </DialogContent>
        <DialogActions>
        <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
        <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button color="primary" variant="outlined" onClick={() => setUpdateStatusDialog(false)}>
            Close
          </Button>
          <Button color="primary" variant="contained" onClick={handleAdd}>
            Confirm
          </Button>
        </DialogActions>
        </Dialog>
      </>
    );
  }