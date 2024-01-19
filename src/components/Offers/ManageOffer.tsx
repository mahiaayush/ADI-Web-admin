import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  TableHead,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import "../CounselloApplication/DetailScreen.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store";
import { GetCouponDetailAction, ClearCouponDataAction } from "src/store/actions/GetOfferListAction";
import { getLocalTime } from "src/utils/utility";
import AddOffer from "./AddOffer";
import { discountTypes, distributionTypes } from "./options";

export default function ManageOffer({ updateDialog, setUpdateDialog, offerID }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCouponDetailAction(offerID));

    return () => {
      dispatch(ClearCouponDataAction());
    }
  }, []);
  const couponDetail = useSelector(
    (state: any) =>
      state?.GetGlobalCoupon?.getCouponDetailResponse?.data || {}
  );

  const [error, setError] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [updateMetaDialog, setUpdateMetaDialog] = useState<boolean>(false);
  const [offerId, setOfferId] = useState(null);

  const updateRow = (id) => {
    setOfferId(id);
    setUpdateMetaDialog(true);
  };
  return (
    <>
      <Dialog
        open={updateDialog}
        onClose={() => setUpdateDialog(false)}
        fullWidth={true}
        maxWidth="lg"
      >
        <DialogContent>
          <DialogContentText
            sx={{ mb: 3 }}
            style={{ fontWeight: 700, textAlign: "center" }}
          >
            Coupon Details
          </DialogContentText>
          <Card classes={{ root: 'overflowXScroll' }}>
            <Table>
              {!!(couponDetail && couponDetail.CouponId) && (
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Max Redeem Limit</TableCell>
                    <TableCell>Min Order</TableCell>
                    <TableCell>Max Discount</TableCell>
                    <TableCell>Discount Type</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>Distribution Type</TableCell>
                    <TableCell>{' '}</TableCell>
                  </TableRow>
                </TableHead>
              )}
              {!!(couponDetail && couponDetail.CouponId) && <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography color="textPrimary" variant="subtitle2">
                          {couponDetail.CouponCode}
                        </Typography>
                      </TableCell>
                      <TableCell>{couponDetail.CouponDescription}</TableCell>
                      <TableCell>{couponDetail.CouponName}</TableCell>
                      <TableCell>{couponDetail.MaxredemLimit || '--'}</TableCell>
                      <TableCell>{couponDetail.MinOrder || '--'}</TableCell>
                      <TableCell>{couponDetail.MaxDiscount || '--'}</TableCell>
                      <TableCell>{discountTypes[couponDetail.DiscountType]}</TableCell>
                      <TableCell>{getLocalTime(couponDetail.CouponStartDate)[9]}</TableCell>
                      <TableCell>{getLocalTime(couponDetail.CouponExpiryDate)[9]}</TableCell>
                      <TableCell>{distributionTypes[couponDetail.Distribution]}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => updateRow(couponDetail.CouponId)}
                        >
                          <EditIcon />{" "}
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>}
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
        <AddOffer
          addDialog={updateMetaDialog}
          setAddDialog={setUpdateMetaDialog}
          couponId={offerId}
        />
      )}
    </>
  );
}
