import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Grid,
  CircularProgress,
  TableHead,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import "../CounselloApplication/DetailScreen.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store";
import { GetUniqueSellerMetaDataAction } from "src/store/actions/GetSellerMetaDataAction";
import { getLocalTime } from "src/utils/utility";
import UpdateMetaRow from "./UpdateMetaRow";

export default function ManageMeta({ updateDialog, setUpdateDialog, userSid }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUniqueSellerMetaDataAction(userSid));
  }, []);
  const sellerListMetaData = useSelector(
    (state: any) =>
      state?.GetUniqueSellerMetaData?.getUniqueSellerMetaDataResponse?.data?.data
  );

  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [updateMetaDialog, setUpdateMetaDialog] = useState<boolean>(false);
  const [metaId, setMetaId] = useState(null);
  const [existingData, setExistingData] = useState({ CashCapping: null, Target: null });

  const updateMetaRow = (id, cashCapping, target) => {
    setMetaId(id);
    setUpdateMetaDialog(true);
    setExistingData({
      CashCapping: cashCapping.toString(), Target: target.toString()
    })
  };
  return (
    <>
      <Dialog
        open={updateDialog}
        onClose={() => setUpdateDialog(false)}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogContent style={{ width: "600px" }}>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            Seller Meta Details
          </DialogContentText>
          <Card>
            <Table>
              {sellerListMetaData && sellerListMetaData.length > 0 && (
                <TableHead>
                  <TableRow>
                    <TableCell>Cash Capping/month</TableCell>
                    <TableCell>Target/month</TableCell>
                    <TableCell>Target Month</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
              )}
              {sellerListMetaData && sellerListMetaData.length > 0 && sellerListMetaData.map((item, index) => (
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography color="textPrimary" variant="subtitle2">
                          {item.CashCapping}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.Target}</TableCell>
                      <TableCell>{getLocalTime(item.TargetMonth)[9]}</TableCell>
                      <TableCell>
                        <Button
                          disabled={!item.isActive}
                          onClick={() => updateMetaRow(item.MetaId, item.CashCapping, item.Target)}
                        >
                          <EditIcon />{" "}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
            </Table>
          </Card>
        </DialogContent>
        <DialogActions>
          <h5 style={{ color: "red", marginRight: "10px" }}>{error}</h5>
          <h5 style={{ color: "green", marginRight: "10px" }}>
            {successMessage}
          </h5>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setUpdateDialog(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {updateMetaDialog && (
        <UpdateMetaRow
          updateMetaDialog={updateMetaDialog}
          setUpdateMetaDialog={setUpdateMetaDialog}
          metaId={metaId}
          userSid={userSid}
          existingData={existingData}
        />
      )}
    </>
  );
}
