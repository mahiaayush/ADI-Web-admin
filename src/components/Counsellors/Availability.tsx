import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Grid,
} from "@material-ui/core";
// import "../CounselloApplication/DetailScreen.css";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCounsellorAvailability } from "../../store/actions/counsellorAvailabilityAction";
import { getCounsellorException } from "../../store/actions/counsellorExceptionAction";
import { getLocalTime } from '../../utils/utility';
import moment from 'moment';

const useStyles = makeStyles({
  topBox: {
    width: "100%",
  },
  boxright: {
    width: "45%",
  },
  boxleft: {
    width: "40%",
  },
  headingBoxes: {
    lineHeight: "20px",
    verticalAlign: "baseline",
  },
  trBorderBottom: {
    borderBottom: "1px solid rgba(145, 158, 171, 0.24)"
  },
  trNoBorderBottom: {
    borderBottom: "none",
    "& td": {
      borderBottom: "none",
    }
  }
});

const AvailabilityScreen = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
// 3533de22-2500-4229-bd40-2a41421e2dbf
  useEffect(() => {
    dispatch(getCounsellorAvailability(id))
  }, [])

  useEffect(() => {
    dispatch(getCounsellorException(id))
  }, [])

  const { counsellorAvailability } = useSelector((state: any) => state);
  const getAvailability = counsellorAvailability?.counsellorAvailability?.data;

  const { counsellorException } = useSelector((state: any) => state);
  const getException = counsellorException?.counsellorAvailability?.data;

  const keys = getException?.Overrides?.map(item => Object.keys(item));

  /* const changeToLocalTime = (time) => {
  const localDate = new Date(time);
  const localLastDate = localDate.toString();
  const myArray = localLastDate.split(" ");
  const displayTime = myArray[4]
  const timeWithSec = displayTime.toString();
  const hourMin = timeWithSec.split(":");
  hourMin.pop()
  const localTime = hourMin.join(":")
    return localTime;
  } */

  const changeToLocalDate = (date) => {
    const localDate = new Date(date);
    const localLastDate = localDate.toString();
    const myArray = localLastDate.split(" ");
    myArray.pop();
    myArray.pop();
    myArray.pop();
    myArray.pop();
    myArray.pop();
    const displayLocalDate = myArray.join(" ");
    return displayLocalDate;
  }

  const convertToLocalTime = (createdDate, slot) => {
    const date = moment(createdDate).utc().format('YYYY-MM-DD');
    let array = [];
    for (let i = 0; i <= slot.length - 1; i++) {
      const startTime = getLocalTime(`${date} ${slot[i].StartTime}`)[5];
      const endTime = getLocalTime(`${date} ${slot[i].EndTime}`)[5];
      array = [...array, { StartTime: startTime, EndTime: endTime }];
    }
    return array;
  };

  let mondayTime
  let tuesdayTime
  let wednesdayTime
  let thusdayTime
  let friTime
  let saturdayTime
  let sundayTime

  if (Object.keys(getAvailability).length !== 0) {
    mondayTime = convertToLocalTime(getAvailability?.CREATED_ON, getAvailability?.DAY_MON);
    tuesdayTime = convertToLocalTime(getAvailability?.CREATED_ON, getAvailability?.DAY_TUE);
    wednesdayTime = convertToLocalTime(getAvailability?.CREATED_ON, getAvailability?.DAY_WED);
    thusdayTime = convertToLocalTime(getAvailability?.CREATED_ON, getAvailability?.DAY_THU);
    friTime = convertToLocalTime(getAvailability?.CREATED_ON, getAvailability?.DAY_FRI);
    saturdayTime = convertToLocalTime(getAvailability?.CREATED_ON, getAvailability?.DAY_SAT);
    sundayTime = convertToLocalTime(getAvailability?.CREATED_ON, getAvailability?.DAY_SUN);
  }
 
  let availabilityView;
  if (props.availability && Object.keys(getAvailability).length !== 0) {
    availabilityView = (<Grid sx={{ display: "flex", columnGap: 10, mt: 0 }}>
    <Grid xs={12} md={12}>
      <Card className="availabilityMainDiv customTableAlign">
        <Table>
          <TableBody>
            <TableRow className={classes.trBorderBottom}>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="h5"
                  sx={{ mb: 2.2, ml: 2 }}
                >
                  Availability Data
                </Typography>
              </TableCell>
              <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
              <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
            </TableRow>

            <TableRow className={classes.trBorderBottom}>
              <TableCell>
                <Typography
                  variant="subtitle2"
                //   lineHeight="40px"
                >
                  DAYS.
                </Typography>
              </TableCell>
              <TableRow>
                  
                <TableCell>
                    <Typography
                        variant="subtitle2"
                       //   lineHeight="40px"
                    >
                           Start Time
                    </Typography> 
                </TableCell>
                <TableCell>
                    <Typography
                        variant="subtitle2"
                       //   lineHeight="40px"
                    >
                          End Time
                    </Typography> 
                </TableCell>
              </TableRow>
            </TableRow>

            <TableRow className={classes.trBorderBottom}>
              <TableCell>
                <Typography
                  variant="subtitle2"
                //   lineHeight="40px"
                >
                  Monday
                </Typography>
              </TableCell>
              {mondayTime?.map((item, i) => {
                  return (
                <TableRow>
                    <TableCell>{item?.StartTime}</TableCell>
                    <TableCell>{item?.EndTime}</TableCell>
                </TableRow>
                  )
              })}
              
            </TableRow>

            <TableRow className={classes.trBorderBottom}>
              <TableCell>
                <Typography
                  variant="subtitle2"
                //   lineHeight="40px"
                >
                  Tuesday
                </Typography>
              </TableCell>
              {tuesdayTime.map((item, i) => {
                  return (
                <TableRow>
                    <TableCell>{item?.StartTime}</TableCell>
                    <TableCell>{item?.EndTime}</TableCell>
                </TableRow>
                  )
              })}
            </TableRow>

            <TableRow className={classes.trBorderBottom}>
              <TableCell>
                <Typography
                  variant="subtitle2"
                //   lineHeight="40px"
                >
                  Wednesday
                </Typography>
              </TableCell>
              {wednesdayTime.map((item, i) => {
                  return (
                <TableRow>
                    <TableCell>{item?.StartTime}</TableCell>
                    <TableCell>{item?.EndTime}</TableCell>
                </TableRow>
                  )
              })}
            </TableRow>

            <TableRow className={classes.trBorderBottom}>
              <TableCell>
                <Typography
                  variant="subtitle2"
                //   lineHeight="40px"
                >
                  Thursday
                </Typography>
              </TableCell>
              {thusdayTime.map((item, i) => {
                  return (
                <TableRow>
                    <TableCell>{item?.StartTime}</TableCell>
                    <TableCell>{item?.EndTime}</TableCell>
                </TableRow>
                  )
              })}
              
            </TableRow>

            <TableRow className={classes.trBorderBottom}>
              <TableCell>
                <Typography
                  variant="subtitle2"
                //   lineHeight="40px"
                >
                  Friday
                </Typography>
              </TableCell>
              {friTime.map((item, i) => {
                  return (
                <TableRow>
                    <TableCell>{item?.StartTime}</TableCell>
                    <TableCell>{item?.EndTime}</TableCell>
                </TableRow>
                  )
              })}
            </TableRow>

            <TableRow className={classes.trBorderBottom}>
              <TableCell>
                <Typography
                  variant="subtitle2"
                //   lineHeight="40px"
                >
                  Saturday
                </Typography>
              </TableCell>
              {saturdayTime.map((item, i) => {
                  return (
                <TableRow>
                    <TableCell>{item?.StartTime}</TableCell>
                    <TableCell>{item?.EndTime}</TableCell>
                </TableRow>
                  )
              })}
            </TableRow>

            <TableRow className={classes.trBorderBottom}>
              <TableCell>
                <Typography
                  variant="subtitle2"
                //   lineHeight="40px"
                >
                  Sunday
                </Typography>
              </TableCell>
              {sundayTime.map((item, i) => {
                  return (
                <TableRow>
                    <TableCell>{item?.StartTime}</TableCell>
                    <TableCell>{item?.EndTime}</TableCell>
                </TableRow>
                  )
              })}
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Grid>
    <Grid xs={12} md={12}>
      <Card className="availabilityMainDiv">
        <Table>
          <TableBody>
            <TableRow className={classes.trBorderBottom}>
              <TableCell>
                <Typography
                  color="textPrimary"
                  variant="h5"
                  sx={{ mb: 2.2, ml: 2 }}
                >
                  Override Data
                </Typography>
              </TableCell>
              <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
              <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
            </TableRow>

           {getException?.Overrides?.length > 0 ? (<>
            <TableRow className={classes.trBorderBottom}>
              <TableCell>
                <Typography
                  variant="subtitle2"
                //   lineHeight="40px"
                >
                  Date
                </Typography>
              </TableCell>
              <TableRow>
                  
                <TableCell>
                    <Typography
                        variant="subtitle2"
                       //   lineHeight="40px"
                    >
                           Start Time
                    </Typography> 
                </TableCell>
                <TableCell>
                    <Typography
                        variant="subtitle2"
                       //   lineHeight="40px"
                    >
                          End Time
                    </Typography> 
                </TableCell>
              </TableRow>
            </TableRow>
            </>) : <h3 style={{ textAlign: "center" }}>No Data found in Override</h3>}

           {getException?.Overrides?.map((item, index) =>
              item[keys[index][0]].map((element, id) => {
                return (
                  <TableRow className={classes.trBorderBottom}>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                      //   lineHeight="40px"
                      > 
                      {changeToLocalDate(keys[index][0])}
                      </Typography>
                    </TableCell>
                      <TableRow>
                          <TableCell>{getLocalTime(`${keys[index][0]}T${element.StartTime}Z`)[5]}</TableCell>
                          <TableCell>{getLocalTime(`${keys[index][0]}T${element.EndTime}Z`)[5]}</TableCell>
                      </TableRow>
                  </TableRow>
                );
              }))}
          </TableBody>
        </Table>
      </Card>
    </Grid>
  </Grid>)
  } else if (props.availability && Object.keys(getAvailability).length === 0) {
    availabilityView = <h2 style={{ padding: 20 }}>No Data Found In Availability</h2>
  }

  return (
    <>
    {availabilityView}
    </>
  );
};
export default AvailabilityScreen;