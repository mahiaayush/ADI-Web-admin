import moment from "moment";

export const getLocalTime = (d) => {
  const local = moment.utc(d).local().format("YYYY-MM-DD HH:mm:ss");
  const date = moment(local).format("DD/MM/YYYY");
  const time = moment(local).format("LT");
  const dateTime = moment(local).format("hh:mm Do MMMM YYYY");
  const dateTimeNew = moment(local).format("MMMM Do YYYY");
  const twentyFourHourFormat = moment(local).format("HH:mm");
  const newDateFormat = moment(local).format("MMMM Do YYYY");
  const postSessionFormat = moment(local).format("dddd MMMM Do YYYY");
  const dateTime24 = moment(local).format("HH:mm Do MMMM YYYY");
  const datenew = moment(local).format("Do MMMM YYYY");
  return [
    date,
    time,
    local,
    dateTime,
    dateTimeNew,
    twentyFourHourFormat,
    newDateFormat,
    postSessionFormat,
    dateTime24,
    datenew,
  ];
};

export const timeDiff = (date, dueDays = 0) => {
  const dueDate = moment(date).add(dueDays, 'days');
  const currentDate = moment();
  const overdue = dueDate < currentDate;
  
  const days = dueDate.diff(currentDate, 'days') + 1;
  const hrs = dueDate.diff(currentDate, 'hours');
  const min = hrs === 0 ? dueDate.diff(currentDate, 'minutes') : null;

  return {
    overdue,
    days,
    hrs,
    min,
  };
}

export const download = (dataurl, filename) => {
  const link = document.createElement("a");
  link.href = dataurl;
  link.target = "_blank";
  link.download = filename;
  link.click();
};

export const shiprocketStatus = [
  "AWB Assigned",
  "Label Generated",
  "Pickup Scheduled/Generated",
  "Pickup Queued",
  "Manifest Generated",
  "Shipped",
  "Delivered",
  "Cancelled",
  "RTO Initiated",
  "RTO Delivered",
  "Pending",
  "Lost",
  "Pickup Error",
  "RTO Acknowledged",
  "Pickup Rescheduled",
  "Cancellation Requested",
  "Out For Delivery",
  "In Transit",
  "Out For Pickup",
  "Pickup Exception",
  "Undelivered",
  "Delayed",
  "Partial_Delivered",
  "Destroyed",
  "Damaged",
  "Fulfilled",
  "Reached at Destination",
  "Misrouted",
  "RTO NDR",
  "RTO OFD",
  "Picked Up",
  "Self Fulfilled",
  "DISPOSED_OFF",
  "CANCELLED_BEFORE_DISPATCHED",
  "RTO_IN_TRANSIT",
  "QC Failed",
  "Reached Warehouse",
  "Custom Cleared",
  "In Flight",
  "Handover to Courier",
  "Shipment Booked",
  "In Transit Overseas",
  "Connection Aligned",
  "Reached Overseas Warehouse",
  "Custom Cleared Overseas",
  "Box Packing",
];