import { useParams } from "react-router";
import styles from "../../assets/css/OrderDetail.module.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import DoDisturbIcon from "@material-ui/icons/DoDisturb";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../store";
import getOrderDetailAction from "src/store/actions/OrderDetailAction";
import {
  CREATE_AWB_URL,
  ADMIN_API_ENDPOINT_V2,
  GENERATE_PICKUP_URL,
  TRACK_ORDER_URL,
  GENERATE_MANIFEST_URL,
  GENERATE_LABEL_URL,
  GENERATE_INVOICE_URL,
  CANCEL_ORDER_URL,
  CANCEL_SHIPMENT_URL,
  GET_ORDER_STATUS,
  PRINT_MANIFEST,
  GET_COURIER_PARTNERS,
} from "src/store/constants";
import http from "src/utils/http";
import {
  Select as MSelect,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { getLocalTime, download } from "src/utils/utility";

const OrderDetail = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState(null);
  const [message, setMessage] = useState([...new Array(6)]);
  const [cancel, setCancel] = useState({ label: "", val: false });
  const [cancelMsg, setCancelMsg] = useState({ msg1: null, msg2: null });
  const [order, setOrder] = useState(null);
  const [showCourier, setShowCourier] = useState(false);
  const [courierList, setCourierList] = useState([]);
  const [courier, setCourier] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(getOrderDetailAction(id)).then(() => setLoading(false));
  }, []);

  const paymentStatus = {
    SU: "Success",
    CE: "Cancelled",
    PE: "Pending",
  };
  const updateMessage = (id, text) => {
    const all = [...message];
    all[id] = text;
    setMessage([...all]);
  };

  const orderData = useSelector(
    (state: any) => state?.learningHubOrderDetail?.orderResponse?.data
  );

  const getCourierPartner = async (
    pickupPincode,
    deliveryPincode,
    cod,
    order_id,
    weight,
    length,
    breadth,
    height
  ) => {
    setLoading(true);
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_COURIER_PARTNERS}?pickup_postcode=${pickupPincode}&delivery_postcode=${deliveryPincode}&cod=${cod}&order_id=${order_id}&weight=${weight}&length=${length}&breadth=${breadth}&height=${height}`
      );
      if (res?.data?.status === true) {
        setLoading(false);
        setCourierList(res.data.data.data.available_courier_companies);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  const getOrderStatus = async (id) => {
    setLoading(true);
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_ORDER_STATUS}${id}`
      );
      if (res?.data?.status === true) {
        setLoading(false);
        setOrder(res?.data?.data?.data);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (orderData) {
      getOrderStatus(orderData?.ORDER_ID);
    }
  }, [orderData]);

  const disableCourier = () => {
    if (orderData?.ORDER_CANCELLED_FLAG === 1) {
      return true;
    } if (orderData?.PICKUP_FLAG === "1") {
      return true;
    }
    return false
  };

  const disableAWB = () => {
    if (orderData?.AWB_GENERATED_FLAG === 1) {
      return true;
    }
    return false;
  };

  const disablePickupBtn = () => {
    if (orderData?.PICKUP_FLAG === "1") {
      return true;
    }
    return false;
  };

  const disableManifest = () => {
    if (orderData?.MANIFEST_GENERATED_FLAG === 1) {
      return true;
    }
    return false;
  };

  const disableLabel = () => {
    if (orderData?.LABEL_GENERATED_FLAG === 1) {
      return true;
    }
    return false;
  };

  const disableManifestPrint = () => {
    if (orderData?.MANIFEST_GENERATED_FLAG === 0) {
      return true;
    }
    return false;
  };

  const disableDownloadLabel = () => {
    if (orderData?.LABEL_GENERATED_FLAG === 0) {
      return true;
    }
    return false;
  };

  const disableCancelShipment = () => {
    if (orderData?.PICKUP_FLAG === "0") {
      return true;
    }
    return false;
  };

  const disableCancelOrder = () => {
    if (orderData?.ORDER_CANCELLED_FLAG) {
      return true;
    }
    return false;
  };

  const generateAWB = async () => {
    setLoading(true);
    type AwbItemsType = {
      shipment_id: string;
      courier_id: string;
      status?: string | null;
    };

    const apiData: AwbItemsType = {
      shipment_id: orderData?.SHIPMENT_ID,
      courier_id: courier?.courier_company_id.toString(),
    };
    if (!orderData?.PICKUP_FLAG && orderData?.AWB) {
      apiData.status = "reassign";
    }
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${CREATE_AWB_URL}`,
        apiData
      );
      if (res?.data?.status === true) {
        dispatch(getOrderDetailAction(id));
        getOrderStatus(orderData?.ORDER_ID);
        updateMessage(0, res?.data?.data?.response?.message);
        if (res?.data?.data?.response?.data?.awb_assign_error) {
          updateMessage(0, res?.data?.data?.response?.data?.awb_assign_error);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      updateMessage(0, error?.response?.data?.message);
    }
  };

  const generatePickup = async () => {
    setLoading(true);
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${GENERATE_PICKUP_URL}`,
        {
          shipment_id: [parseInt(orderData?.SHIPMENT_ID, 10)],
        }
      );
      if (res?.data?.status === true) {
        dispatch(getOrderDetailAction(id));
        getOrderStatus(orderData?.ORDER_ID);
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      dispatch(getOrderDetailAction(id));
      getOrderStatus(orderData?.ORDER_ID);
      updateMessage(1, error?.response?.data?.message);
      setLoading(false);
    }
  };

  const generateLabel = async (index) => {
    setLoading(true);
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${GENERATE_LABEL_URL}`,
        {
          shipment_id: [orderData?.SHIPMENT_ID],
        }
      );
      if (res?.data?.status === true) {
        download(res?.data?.data?.label_url, orderData?.SHIPMENT_ID);
        dispatch(getOrderDetailAction(id));
        getOrderStatus(orderData?.ORDER_ID);
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      updateMessage(index, error?.response?.data?.message);
      setLoading(false);
    }
  };

  const generateInvoice = async () => {
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${GENERATE_INVOICE_URL}`,
        {
          ids: [orderData?.ORDER_ID],
        }
      );
      if (res?.data?.status === true) {
        download(res.data.data.invoice_url, orderData?.ORDER_ID);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const generateManifest = async () => {
    setLoading(true);
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${GENERATE_MANIFEST_URL}`,
        {
          shipment_id: [orderData?.SHIPMENT_ID],
        }
      );
      if (res?.data?.status === true) {
        dispatch(getOrderDetailAction(id));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      updateMessage(2, error?.response?.data?.message);
      dispatch(getOrderDetailAction(id));
      console.log("error", error);
    }
  };

  const printManifest = async () => {
    setLoading(true);
    try {
      const res = await http.post(`${ADMIN_API_ENDPOINT_V2}${PRINT_MANIFEST}`, {
        order_ids: [orderData?.ORDER_ID],
      });
      if (res?.data?.status === true) {
        if (res?.data?.data?.manifest_url) {
          download(res?.data?.data?.manifest_url, orderData?.ORDER_ID);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };

  // const trackOrder = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await http.get(
  //       `${ADMIN_API_ENDPOINT_V2}${TRACK_ORDER_URL}?order_id=${orderData?.ORDER_ID}`
  //     );
  //     if (res?.data?.status === true) {
  //       getOrderStatus(orderData?.ORDER_ID);
  //       if (res?.data?.data?.tracking_data?.shipment_track_activities) {
  //         setTrackingData([
  //           ...res?.data?.data?.tracking_data?.shipment_track_activities,
  //         ]);
  //       }
  //       setShowTracking(true);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("error", error);
  //   }
  // };

  const cancelOrder = async (label) => {
    setLoading(true);
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${
          label === "shipment" ? CANCEL_SHIPMENT_URL : CANCEL_ORDER_URL
        }`,
        label === "shipment"
          ? { awbs: [orderData.AWB] }
          : { ids: [orderData.ORDER_ID] }
      );
      if (res?.data?.status === true) {
        setLoading(false);
        getOrderStatus(orderData?.ORDER_ID);
        dispatch(getOrderDetailAction(id));
        if (label === "shipment") {
          setCancelMsg({ ...cancelMsg, msg1: res?.data?.message });
        } else {
          setCancelMsg({ ...cancelMsg, msg2: res?.data?.message });
        }
        setCancel({ label: "", val: false });
      }
    } catch (error) {
      setLoading(false);
      if (label === "shipment") {
        setCancelMsg({ ...cancelMsg, msg1: error.response?.data?.message });
      } else {
        setCancelMsg({ ...cancelMsg, msg2: error.response?.data?.message });
      }
      console.log("error", error);
    }
  };

  const openCourier = () => {
    setShowCourier(true);
    getCourierPartner(
      order?.pickup_code,
      order?.delivery_code,
      order?.cod,
      orderData?.ORDER_ID,
      order?.shipments.weight,
      order?.shipments.length,
      order?.shipments.breadth,
      order?.shipments.height
    );
  };

  return (
    <Container>
      <Grid item xs={12} position="relative" className={styles.topheader}>
        <Typography color="textPrimary" variant="h5">
          Order Details
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
          <Link
            color="textPrimary"
            component={RouterLink}
            to="/orders/learning-hub"
            variant="subtitle2"
          >
            Orders
          </Link>
          <Typography color="textSecondary" variant="subtitle2">
            Order Details
          </Typography>
        </Breadcrumbs>
      </Grid>
      <div>
        {loading ? (
          <div className={styles.circularProgressLoadingClass}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className={styles.tracking}>
              <div className={styles.left}>
                <h4 className={styles.heading}>Order Details</h4>
                <div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Order ID </span>{" "}
                    <span>{orderData?.OrderNumber}</span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>CourseTitle </span>{" "}
                    <span>{orderData?.CourseTitle}</span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Placed on </span>{" "}
                    <span>{getLocalTime(orderData?.CreatedOn)[2]}</span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Customer </span>{" "}
                    <span>{`${orderData?.GivenName}  ${
                      orderData?.FamilyName && orderData?.FamilyName
                    }`}</span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Email </span>{" "}
                    <span>{orderData?.Email}</span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Phone No </span>{" "}
                    <span>{orderData?.PhoneNumber}</span>
                  </div>

                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Payment Status </span>{" "}
                    <span>
                      {orderData?.PaymentStatus
                        ? paymentStatus?.[orderData?.PaymentStatus]
                        : "Pending"}
                    </span>
                  </div>

                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Payment Gateway </span>{" "}
                    <span>{orderData?.PaymentGateway}</span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Course Id</span>{" "}
                    <span>{orderData?.CourseId}</span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Course Price</span>{" "}
                    <span>{orderData?.CoursePrice}</span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Transaction Id</span>{" "}
                    <span>{orderData?.TransactionId}</span>
                  </div>
                  {orderData?.ORDER_ID 
                  && (
                    <div className={styles.rowwrap}>
                      <span className={styles.title}>
                        Customer Shipping Address
                      </span>{" "}
                      <span>{`${order?.customer_address}${
                        order?.customer_address_2 
                        && `, ${order?.customer_address_2}`
                      },${order?.customer_city}, ${order?.customer_country}-${
                        order?.customer_pincode
                      }`}</span>
                    </div>
                  )}
                  {orderData?.AWB_GENERATED_FLAG === 1 && (
                    <div className={styles.rowwrap}>
                      <span className={styles.title}>AWB No</span>{" "}
                      <span>{orderData?.AWB}</span>
                    </div>
                  )}
                </div>
              </div>
              {orderData?.ITEM_ID && orderData?.ORDER_ID && (
                <div className={styles.right}>
                  <h4 className={styles.heading}>Actions</h4>
                  <p className={styles.notes}>
                    <b>Note</b>:The button are in order of their execution. Eg.
                    1.Select Courier{`->`}2.Generate AWB...5.Generate Label.{" "}
                    <a
                      href="https://shiprocket.freshdesk.com/support/solutions/articles/43000337456-api-document-helpsheet"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Know More
                    </a>
                  </p>
                  <div className={styles.rowwrap}>
                    <Button
                      variant="contained"
                      className={styles.btn}
                      onClick={() => openCourier()}
                      disabled={disableCourier()}
                    >
                      {orderData?.AWB && orderData?.PICKUP_FLAG === "0"
                        ? "Reassign"
                        : "Select"}{" "}
                      Courier
                    </Button>
                    <span>{courier?.courier_name}</span>
                  </div>
                  {courier && (
                    <div className={styles.rowwrap}>
                      <Button
                        variant="contained"
                        className={styles.btn}
                        onClick={() => generateAWB()}
                        disabled={disableAWB()}
                      >
                        Generate AWB
                      </Button>
                      {message[0] && (
                        <span className={styles.msg}>{message[0]}</span>
                      )}
                      {orderData?.AWB_GENERATED_FLAG === 1 ? (
                        <span>
                          <CheckCircleOutlineIcon
                            className={styles.successsm}
                          />
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                  {orderData?.AWB_GENERATED_FLAG === 1 && (
                    <div className={styles.rowwrap}>
                      <Button
                        variant="contained"
                        className={styles.btn}
                        onClick={() => generatePickup()}
                        disabled={disablePickupBtn()}
                      >
                        Generate Pickup
                      </Button>
                      {message[1] && (
                        <span className={styles.msg}>{message[1]}</span>
                      )}

                      {orderData?.PICKUP_FLAG === "1" && (
                        <span>
                          <CheckCircleOutlineIcon
                            className={styles.successsm}
                          />
                        </span>
                      )}
                    </div>
                  )}
                  {orderData?.PICKUP_FLAG === "1" && (
                    <div className={styles.rowwrap}>
                      <Button
                        variant="contained"
                        className={styles.btn}
                        onClick={() => generateManifest()}
                        disabled={disableManifest()}
                      >
                        Generate Manifest
                      </Button>
                      <span className={styles.msg}>{message[2]}</span>
                      {orderData?.MANIFEST_GENERATED_FLAG === 1 ? (
                        <span>
                          <CheckCircleOutlineIcon
                            className={styles.successsm}
                          />
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  {orderData?.MANIFEST_GENERATED_FLAG === 1 && (
                    <div className={styles.rowwrap}>
                      <Button
                        variant="contained"
                        className={styles.btn}
                        onClick={() => generateLabel(3)}
                        disabled={disableLabel()}
                      >
                        Generate Label
                      </Button>
                      {orderData?.LABEL_GENERATED_FLAG === 1 ? (
                        <span>
                          <CheckCircleOutlineIcon
                            className={styles.successsm}
                          />
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  {orderData?.LABEL_GENERATED_FLAG === 1 && (
                    <div className={styles.rowwrap}>
                      <Button
                        variant="contained"
                        className={styles.btn}
                        onClick={() => printManifest()}
                        disabled={disableManifestPrint()}
                      >
                        Download Manifest
                      </Button>
                    </div>
                  )}

                  {orderData?.LABEL_GENERATED_FLAG === 1 && (
                    <div className={styles.rowwrap}>
                      <Button
                        variant="contained"
                        className={styles.btn}
                        onClick={() => generateLabel(4)}
                        disabled={disableDownloadLabel()}
                      >
                        Print Label
                      </Button>
                    </div>
                  )}
                  <div className={styles.rowwrap}>
                    <Button
                      variant="contained"
                      className={styles.btn}
                      onClick={() => generateInvoice()}
                    >
                      Download Invoice
                    </Button>
                  </div>
                  {orderData?.PICKUP_FLAG === "1" && (
                    <div className={styles.rowwrap}>
                      <Button
                        variant="contained"
                        className={`${styles.btn} ${styles.cancel}`}
                        onClick={() =>
                          setCancel({ label: "shipment", val: true })}
                        disabled={disableCancelShipment()}
                      >
                        Cancel Shipment
                      </Button>
                      {cancelMsg.msg1 && (
                        <span className={styles.msg}>{cancelMsg.msg1}</span>
                      )}
                      {/* {(!orderData?.PICKUP_FLAG && orderData?.COURIER_ID) ? (
                          <span>
                            <CheckCircleOutlineIcon
                              className={styles.successsm}
                            />
                          </span>
                        ) : (
                          ""
                        )} */}
                    </div>
                  )}

                  <div className={styles.rowwrap}>
                    <Button
                      variant="contained"
                      className={`${styles.btn} ${styles.cancel}`}
                      onClick={() => setCancel({ label: "order", val: true })}
                      disabled={disableCancelOrder()}
                    >
                      Cancel Order
                    </Button>
                    {cancelMsg?.msg2 && (
                      <span className={styles.msg}>{cancelMsg.msg2}</span>
                    )}
                  </div>
                  <h4 className={styles.heading}>Status</h4>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Tracking Id </span>{" "}
                    <span>{orderData?.ORDER_ID}</span>
                  </div>
                  <div className={styles.rowwrap}>
                    <span className={styles.title}>Status </span>{" "}
                    <span className={styles.bold}>{order?.status}</span>
                  </div>

                  <div className={styles.ordertrack}>
                    {orderData?.AWB && (
                      <a
                        href={`https://launchmycareer.shiprocket.co/tracking/${orderData?.AWB}`}
                        className={styles.anchor}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button variant="contained">Track Order</Button>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {cancel.val && (
          <>
            <Dialog
              open={cancel.val}
              className="aprovelPop"
              onClose={() => setCancel({ label: "", val: false })}
            >
              <DialogTitle>Cancel {cancel.label}</DialogTitle>
              <DialogContentText color="dimgrey">
                Are you sure, you want to cancel this {cancel.label}?
              </DialogContentText>
              {cancel.label === "shipment" && (
                <p className={styles.msg}>{cancelMsg?.msg1}</p>
              )}
              {cancel.label === "order" && (
                <p className={styles.msg}>{cancelMsg?.msg2}</p>
              )}
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    // setCancelMsg({ msg1: null, msg2: null });
                    setCancel({ label: "", val: false });
                  }}
                >
                  Close
                </Button>
                <Button
                  autoFocus
                  onClick={() => cancelOrder(cancel.label)}
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? "Processing" : "Cancel"}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
        {showCourier && (
          <>
            <Dialog
              open={showCourier}
              className="aprovelPop"
              onClose={() => setShowCourier(false)}
            >
              <DialogTitle>
                {orderData?.COURIER_ID && !orderData?.PICKUP_FLAG
                  ? "Reassign"
                  : "Select"}{" "}
                Courier Partner
              </DialogTitle>
              <FormControl>
                <InputLabel>
                  {orderData?.COURIER_ID && !orderData?.PICKUP_FLAG
                    ? "Reassign"
                    : "Select"}{" "}
                  Courier Partner
                </InputLabel>
                <MSelect
                  value={courier}
                  className={styles.selectBox}
                  label="Select Courier Partner"
                  onChange={(e) => setCourier(e.target.value)}
                >
                  {courierList?.map((item) => (
                    <MenuItem value={item} className={styles.row}>
                      <span>
                        {item.courier_name}{" "}
                        <sup className={styles.rating}>{item.rating}</sup>
                      </span>{" "}
                      <span>Freight Charges Rs.{item.freight_charge}</span>
                    </MenuItem>
                  ))}
                </MSelect>
              </FormControl>
              <DialogActions>
                <Button
                  autoFocus
                  variant="contained"
                  onClick={() => setShowCourier(false)}
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
    </Container>
  );
};

export default OrderDetail;
