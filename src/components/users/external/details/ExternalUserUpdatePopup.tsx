import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import "../../../CounselloApplication/DetailScreen.css";
import { useEffect, useState } from "react";
import http from "../../../../utils/http";
import { useDispatch } from "react-redux";
import type { ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { getExternalUserDetail } from 'src/store/actions/externalUserAction';
import {
  ADMIN_API_ENDPOINT_V2,
  UPDATE_EXTERNAL_USER_DATA,
} from "../../../../store/constants";

export default function UpdatePopup({
  openPopup,
  setOpenPopup,
  existingData,
  toUpdate
}) {
  const { id } = useParams();
  const [data, updateData] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const dispatch = useDispatch();
 
  const useStyles = makeStyles({
    parentDiv: {
      display: "block",
      justifyContent: "center",
      alignItems: "center",
      height: "150px",
      margin: "30px",
    },
    pricing: {
      fontWeight: 600,
      fontSize: "20px",
    },
    spinnerClass: {
      marginTop: "100px",
      marginLeft: "50px",
      minHeight: "20vh",
      minWidth: "500px",
    },
    errorClass: {
      color: "red",
      fontWeight: 400,
      marginRight: "10px",
      textTransform: "capitalize",
    },
    errorOuterDiv: {
      maxWidth: "475px",
    },
  });
  const classes = useStyles();
  const handleClose = () => {
    setOpenPopup(false);
    setError("");
    setSucessMessage("");
    updateData("");
  };
  useEffect(() => {
      if (openPopup) {
        if (toUpdate === "email") {
          updateData(existingData.email);
        } else {
          updateData(existingData.phone_number);
        }
      }
  }, [openPopup])
  const SubmitHandler = async () => {
    setError("");
    setSucessMessage("");
    const updateUserData = {
      UserAttibutes: [
        {
          attribute_name: toUpdate,
          attribute_value: data,
        },
      ],
    };

         if (data) {
          try {
            const res = await http.put(
              `${ADMIN_API_ENDPOINT_V2}${UPDATE_EXTERNAL_USER_DATA}/${id}`, updateUserData,
            );
            if (res.data.status === true) {
              setSucessMessage(res?.data?.message);
              dispatch(getExternalUserDetail(id));
              setTimeout(() => {
                handleClose()
              }, 1000);
            } else {
              setError(res?.data?.message);
            }
          } catch (error) {
            setError(error?.response?.data?.message)
          }
      } else {
          setError("something went wrong...")
        }
  };

  const handleYes = () => {
    SubmitHandler();
  };

  const validation = () => {
    if (toUpdate === "phone_number" && data?.length > 10) return true;
     return false;
  };

  return (
    <>
      <Dialog open={openPopup} className="aprovelPop" onClose={handleClose}>
        <DialogTitle>{toUpdate === "email" ? "Update Email" : "Update Phone Number"}</DialogTitle>
        <DialogContent>
          <DialogContentText color="dimgrey">
            {toUpdate === "email" ? "Email ID" : "Phone Number"}
            <TextField
              margin="dense"
              size="small"
              name="PrintStatus"
              value={data}
              onChange={(e: ChangeEvent<any>) => updateData(e.target.value)}
              type={toUpdate === "email" ? "text" : "number"}
              error={validation()}
              helperText={validation() ? 'Phone Number must be of 10 digits' : ''}
              fullWidth
              required
            />
             
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <div className={classes.errorOuterDiv}>
            <h5 className={classes.errorClass}>{error}</h5>
            <h5 style={{ color: "green", marginRight: "10px" }}>
              {successMessage}
            </h5>
          </div>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            className={data?.trim().length === 0 || ((toUpdate === "email" && data === existingData.email) || (toUpdate === "phone_number" && (data === existingData.phone_number || data?.length < 10))) ? "disableBtnYes" : ""}
            onClick={handleYes}
            variant="contained"
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
