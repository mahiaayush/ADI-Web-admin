import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Table,
  CircularProgress,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "src/store";
import { makeStyles } from "@material-ui/core/styles";
import ViewCommercialPricingAction from "src/store/actions/ViewCommercialPricingAction";

const useStyles = makeStyles({
  spinnerClassCommercial: {
    marginTop: "100px",
    marginLeft: "50px",
    minHeight: "50vh",
    minWidth: "500px",
  },
});

export default function ViewCommercialPricing({
  viewPricing,
  setViewPricing,
  getCounsellorData,
}) {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(ViewCommercialPricingAction(getCounsellorData?.APPLICATION_ID));
  }, []);

  const commercialPricing = useSelector(
    (state) => state.commercialPricing.viewCommercialPricing.data
  );
  const handleClose = () => {
    setViewPricing(false);
  };

  return (
    <>
      <Dialog open={viewPricing} className="aprovelPop" onClose={handleClose}>
        {commercialPricing.length > 0 ? (
          <>
            <DialogTitle>COMMERCIAL</DialogTitle>
            <DialogContent>
              <DialogContentText color="dimgrey">
                <DialogContentText>
                  <Table className="learnerListing">
                    <table style={{ width: "100%" }}>
                      <tr>
                        <th>PLAN NAME</th>
                        <th>ITEM NAME</th>
                        <th>ENTITY NAME</th>
                        <th>PRICE</th>
                        <th>STATUS</th>
                      </tr>
                      {commercialPricing?.map((item, idx) => {
                        return (
                          <tr>
                            <td>{item.PLAN_NAME}</td>
                            <td>{item.ITEM_NAME}</td>
                            <td>{item.ENTITY_NAME}</td>
                            <td>{item.PRICE}</td>
                            <td>{item.STATUS}</td>
                          </tr>
                        );
                      })}
                    </table>
                  </Table>
                </DialogContentText>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </>
        ) : (
          <div className={classes.spinnerClassCommercial}>
            <CircularProgress />
          </div>
        )}
      </Dialog>
    </>
  );
}
