import { Box, Button, CircularProgress, TextField, Typography } from "@material-ui/core";
import styles from "./ChequeDD.module.css";
import UploadFiles from "src/components/CashInHand/UploadFiles";
import { useState } from "react";
import { Close } from "@material-ui/icons";
import UploadFileIcon from "@material-ui/icons/UploadFile";
import { useDispatch, useSelector } from "src/store";
import { postDepositSlipAction } from "src/store/actions/DepositSlipAction";
import { useNavigate } from "react-router";
import NumberFormat from "src/components/common/reusable/NumberFormat";
import { getInventoryList } from "src/store/actions/inventoryAction";

export const ChequeDD = ({ p_mode, planSelectionData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadPopup, setUploadPopup] = useState(false);
  const [file, setFile] = useState([]);
  const [chdd, setChdd] = useState("");
  const [updateMsg, setUpdateMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const userVpaDetails = useSelector(
    (state: any) => state?.userVpaDetails?.userVpaDetails?.detail?.VPA || {}
  );

  const TransactionData = useSelector(
    (state: any) => state?.addMoreRes?.updateTransactionResponse
  );

  const handleSubmit = (files: File[]) => {
    setFile(files);
  };

  const handleSubmitRequest = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append("depositSlip", file?.[0]);
    formData.append("vpaId", userVpaDetails?.VpaId);
    if (chdd) {
      formData.append("instrumentNumber", chdd);
    }
    formData.append("transactionId", TransactionData?.data?.transaction_id);
    dispatch(postDepositSlipAction(formData)).then((data) => {
      if (data?.status) {
        navigate("/add-more/request-received");
        dispatch(getInventoryList(1, 5, "", "I"));
      } else {
        setUpdateMsg(data?.message);
      }
      setLoading(false);
      setTimeout(() => setUpdateMsg(""), 3000);
    });
  };

  return (
    <>
      <h3 className={styles.title}>
        {p_mode === "DD" ? "Demand Draft" : p_mode === "C" ? "Cheque" : "POS"}
      </h3>
      {!loading ? <Box>
        <div>
          <div className={styles.textFieldInner}>
            <h4>Amount:</h4>
            <p style={{ margin: "5px" }}> <NumberFormat Amount={TransactionData?.data?.transaction_amount} decimalScale={2} /> </p>
          </div>
          <hgroup className={styles.hgroupClass}>
            {p_mode !== "POS" ? (
              <TextField
                type="text"
                placeholder={p_mode === "DD" ? "DD No." : "Cheque No."}
                variant="outlined"
                fullWidth
                sx={{ maxWidth: 350 }}
                value={chdd}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value.length <= 6 && (re.test(e.target.value) || !e.target.value)) {
                    setChdd(e.target.value)
                  }
                }}
                inputProps={{ maxLength: 6 }}
                required
              />
            ) : (
              <p style={{ margin: "0" }}>
                Please attach the transaction slip generated by POS machine.
              </p>
            )}

            <Button
              onClick={() => setUploadPopup(true)}
              style={{ margin: "15px" }}
              color="primary"
              startIcon={<UploadFileIcon style={{ width: "100%", margin: "0px", color: "#5664d2" }} />}
            >
              Attach
            </Button>
          </hgroup>
          {file?.length > 0 && (
            <>
              <h5>{file?.[0]?.name} <Close onClick={() => setFile([])} style={{ verticalAlign: "-9px", color: "red", cursor: "pointer" }} /></h5>
            </>
          )}
          {p_mode !== "POS" ? <Button
            onClick={handleSubmitRequest}
            variant="contained"
            color="primary"
            fullWidth
            disabled={(chdd.trim().length < 6 || file?.length === 0)}
            className={styles.submitButton}
          >
            {!loading ? "Submit" : "Processing"}
          </Button>
          : <Button
            onClick={handleSubmitRequest}
            variant="contained"
            color="primary"
            fullWidth
            disabled={file?.length === 0}
            className={styles.submitButton}
          >
            {!loading ? "Submit" : "Processing"}
          </Button>}
          <Typography sx={{ color: "red", mt: 0 }}>{updateMsg}</Typography>
          {uploadPopup ? (
            <UploadFiles
              open={uploadPopup}
              onClose={() => setUploadPopup(false)}
              onSubmit={handleSubmit}
              maxFiles={1}
            />
          ) : null}
        </div>
      </Box> : <div className={styles.circularProcess}><CircularProgress /></div>}
    </>
  );
};
