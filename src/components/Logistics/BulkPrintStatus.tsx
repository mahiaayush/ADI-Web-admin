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
import "../CounselloApplication/DetailScreen.css";
import { useState } from "react";
import http from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import type { ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GetLogisticListAction } from "src/store/actions/GetLogisticListAction";
import {
  ADMIN_API_ENDPOINT_V2,
  UPDATE_PRINT_CARD_STATUS,
} from "../../store/constants";

export default function BulkPrintStatus({ openPopup, setOpenPopup }) {
  const [cardLotNo, setCardLotNo] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const dispatch = useDispatch();
  const cardOptions = [{ label: "THe", value: "90" }];

  const cardLotData = useSelector(
    (state: any) =>
      state?.getLogisticList?.getCardLotResponse?.data?.data?.rows
  );

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
    setCardLotNo("");
  };

  const SubmitHandler = async () => {
    setError("");
    setSucessMessage("");

    const putPrintStatusData = {
      "cardLotNo": cardLotNo,
      status: "print",
      value: "P",
    };

    if (cardLotNo) {
      try {
        const res = await http.put(
          `${ADMIN_API_ENDPOINT_V2}${UPDATE_PRINT_CARD_STATUS}`,
          putPrintStatusData
        );
        if (res.data.status === true) {
          setSucessMessage(res?.data?.message);
          dispatch(GetLogisticListAction(null, null, null, 1, 10, null, null));
          setTimeout(() => {
            handleClose();
          }, 1000);
        }
      } catch (error) {
        console.log("error", error.response.data.message);
        setError(error?.response?.data?.message);
      }
    } else {
      setError("something went wrong...");
    }
  };

  const handleYes = () => {
    SubmitHandler();
  };

  return (
    <>
      <Dialog open={openPopup} className="aprovelPop" onClose={handleClose}>
        <DialogTitle>Bulk Update Print Status</DialogTitle>
        <DialogContent>
          <DialogContentText color="dimgrey">
            Select Card Lot 
            <TextField
              margin="dense"
              size="small"
              name="PrintStatus"
              value={cardLotNo}
              onChange={(e: ChangeEvent<any>) => setCardLotNo(e.target.value)}
              type="text"
              select
              fullWidth
              required
            >
              {cardLotData && cardLotData.length > 0
                ? cardLotData.map((data) => (
                    <MenuItem key={`lot-${data.CardLot}`} value={data.CardLot}>
                      {data.CardLot}
                    </MenuItem>
                  ))
                : null}
            </TextField>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <div className={classes.errorOuterDiv}>
            <h5 className={classes.errorClass}>{error}</h5>
            <h5 style={{ color: "green", marginRight: "10px" }}>
              {successMessage}
            </h5>
          </div>
          <Button onClick={handleClose}>Close</Button>
          <Button
            className={cardLotNo?.trim().length === 0 ? "disableBtnYes" : ""}
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
