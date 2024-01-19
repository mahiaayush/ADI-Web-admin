import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import {
  Article
} from "@material-ui/icons";
import { useState, useEffect } from 'react';
import "../CounselloApplication/DetailScreen.css";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getCounsellorDetails } from "../../store/actions/counsellorDetailsAction"
import { useParams } from "react-router-dom";
import { getLocalTime } from "../../utils/utility";

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
});

const ProfileTab = (props) => {
  const [counsellorDetail, setCounsellorDetail] = useState()
  const dispatch = useDispatch();

  const { id } = useParams();

  // 3533de22-2500-4229-bd40-2a41421e2dbf
  useEffect(() => {
    dispatch(getCounsellorDetails(id))
  }, [])

  const { counsellorDetails } = useSelector((state: any) => state);
  const getDetails = counsellorDetails?.counsellorDetails?.data;

  const lastDate = getDetails.LastModified;
  const localDate = new Date(lastDate);
  const localLastDate = localDate.toString();
  const myArray = localLastDate.split(" ");
  myArray.pop()
  myArray.pop()
  myArray.pop()
  myArray.pop()
  const displayLocalDate = myArray.join(" ");

  const changetolocal = (utcTime) => {
    const timeArr = getLocalTime(utcTime);
    return timeArr[3]
  }

  useEffect(() => {
    setCounsellorDetail(getDetails)
  }, [])

  const classes = useStyles();
  return (
    <>
      {props.profile && Object.keys(getDetails).length !== 0 ? (
        <Grid sx={{ display: "flex", columnGap: 5, mt: 0 }}>
          <Grid xs={6} md={6}>
            <Card>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{ mb: 2.2, ml: 2 }}
                      >
                        About
                      </Typography>
                    </TableCell>
                    <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                    <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        First Name
                      </Typography>
                    </TableCell>
                    <TableCell> {getDetails.FirstName}</TableCell>
                    <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Last Name
                      </Typography>
                    </TableCell>
                    <TableCell>{getDetails.LastName}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="subtitle2"
                        lineHeight="40px"
                      >
                        Email
                      </Typography>
                    </TableCell>
                    {
                      // @ts-ignore
                      <TableCell>{getDetails.Email}</TableCell>
                    }
                    <TableCell>{/* {data.UserCountry} */}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className={classes.headingBoxes}>
                      <Typography color="textPrimary" variant="subtitle2">
                        Professional Synopsis
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <span style={{ wordBreak: 'break-word' }}>{getDetails.ProfessionalSynopsis}</span>
                    </TableCell>
                    <TableCell> </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </Card>

            {getDetails.Languages.length > 0 ? (<Card
              sx={{
                marginTop: "40px",
              }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{ mb: 3, ml: 2 }}
                      //   sx={{ mb: 2.2, ml: 2 }}
                      >
                        Languages
                      </Typography>
                    </TableCell>
                    <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                    <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                  </TableRow>

                  {getDetails.Languages.map((item, i) => {
                    return (
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle2">
                            {item}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })}

                </TableBody>
              </Table>
            </Card>) : " "}

            {getDetails.Expertise.length > 0 ? (
              <Card
                sx={{
                  marginTop: "40px",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="h5"
                          sx={{ mb: 3, ml: 2 }}
                        //   sx={{ mb: 2.2, ml: 2 }}
                        >
                          Expertise
                        </Typography>
                      </TableCell>
                      <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                      <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                    </TableRow>

                    {getDetails.Expertise.map((item, i) => {
                      return (
                        <TableRow>
                          <TableCell>
                            <Typography variant="subtitle2">
                              {item}
                            </Typography>
                          </TableCell>
                          <TableCell> </TableCell>
                          <TableCell>
                            <Grid sx={{ display: "flex", columnGap: 2 }}>
                              {/* <ApproveButton />
                      <RejectButton />  */}
                            </Grid>
                          </TableCell>
                        </TableRow>
                      )
                    })}

                  </TableBody>
                </Table>
              </Card>) : " "}

            {getDetails.Expertise.length > 0 ? (
              <Card
                sx={{
                  marginTop: "40px",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="h5"
                          sx={{ mb: 3, ml: 2 }}
                        //   sx={{ mb: 2.2, ml: 2 }}
                        >
                          Qualifications
                        </Typography>
                      </TableCell>
                      <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                      <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                    </TableRow>

                    {getDetails.Qualifications.map((item, i) => {
                      return (
                        <TableRow>
                          <TableCell>
                            <Typography variant="subtitle2">
                              {item}
                            </Typography>
                          </TableCell>
                          <TableCell> </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Card>) : " "}

          </Grid>

          <Grid xs={6} md={6}>
            <Card
              sx={{
                marginTop: "40px",
              }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{ mb: 2.2, ml: 2 }}
                      >
                        Actions
                      </Typography>
                    </TableCell>
                    <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                    <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">
                        Last Modified On
                      </Typography>
                    </TableCell>
                    <TableCell>{displayLocalDate}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
            {getDetails.Qualifications.length > 0 ? (
              <Card
                sx={{
                  marginTop: "40px",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="h5"
                          sx={{ mb: 2.2, ml: 2 }}
                        >
                          Certification
                        </Typography>
                      </TableCell>
                      <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                      <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                    </TableRow>
                    {getDetails.Certification.map((item, i) => {
                      return (
                        <TableRow>
                          <TableCell>
                            <Typography variant="subtitle2">
                              {item}
                            </Typography>
                          </TableCell>
                          <TableCell> </TableCell>
                          <TableCell> </TableCell>
                        </TableRow>
                      )
                    })}

                  </TableBody>
                </Table>
              </Card>) : " "}
            <Card
              sx={{
                marginTop: "40px",
              }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{ mb: 2.2, ml: 2 }}
                      >
                        Experience
                      </Typography>
                    </TableCell>
                    <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                    <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">
                        No. of years of experience
                      </Typography>
                    </TableCell>
                    <TableCell>{getDetails.ExperienceYear} </TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                  {/* <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">
                    No. of Sessions
                  </Typography>
                </TableCell>
                <TableCell>{getDetails.TotalSession}</TableCell>
                <TableCell> </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">
                    Hours Completed
                  </Typography>
                </TableCell>
                <TableCell>{getDetails.HoursCompleted}</TableCell>
                <TableCell> </TableCell>
              </TableRow> */}
                </TableBody>
              </Table>
            </Card>

            <Card
              sx={{
                marginTop: "40px",
              }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="h5"
                        sx={{ mb: 2.2, ml: 2 }}
                      >
                        Bank Details
                      </Typography>
                    </TableCell>
                    <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                    <TableCell>{/* {data.UserAddressLineOne} */}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">
                        PAN
                      </Typography>
                    </TableCell>
                    <TableCell>{getDetails.PAN}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">
                        Account Number
                      </Typography>
                    </TableCell>
                    <TableCell>{getDetails.AccountNumber}</TableCell>
                    <TableCell> </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>

            {getDetails?.Documents?.length > 0 ? (
              <Card
                sx={{
                  marginTop: "40px",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="h5"
                          sx={{ mb: 2.2, ml: 2 }}
                        >
                          Documents
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <div className="documentCard">
                      {getDetails?.Documents?.map((item, i) => {
                        return (
                          <div className="document_detail">
                            <a href={item?.Link} rel="noreferrer" target="_blank"><Article className="articleIcon" />{' '} </a>
                            <div className="documentName">
                              {item?.Document}
                            </div>
                            <div className="uploadedTime">
                              Uploaded: {changetolocal(item?.Time)}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </TableBody>
                </Table>
              </Card>) : " "}

          </Grid>
        </Grid>
      ) : props.activeTab === 1 ? (
        <div className="loading">
        <CircularProgress />
      </div>
      ) : ("")}
    </>
  );
};
export default ProfileTab;
