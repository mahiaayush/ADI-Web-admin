import {
    Container,
    Grid,
    Typography,
    Link,
    Breadcrumbs,
    Box,
    Card,
    CircularProgress,
    Button,
  } from "@material-ui/core";
  import Moment from "moment";
  import { Link as RouterLink } from "react-router-dom";
  import { useParams, useNavigate } from "react-router";
  import { Star, StarBorder, ArrowBackIos } from "@material-ui/icons";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "../../store";
  import { makeStyles } from "@material-ui/core/styles";
  import { GetLogisticDetailAction } from "src/store/actions/GetLogisticListAction";
  import { getLocalTime } from "src/utils/utility";
  
  const useStyles = makeStyles({
    topheader: {
      paddingTop: "16px",
      position: "relative",
    },
    backArrow: {
      marginTop: "8px",
      cursor: "pointer",
    },
    normal: {
      background: "transparent",
      textDecoration: "none !important",
      cursor: "pointer",
      paddingRight: "0",
      border: "none",
    },
    circularProgressLoadingClass: {
      "min-height": "80vh",
      "display": "flex",
      "justify-content": "center",
      "align-items": "center",
    }
  });
  
  const LogisticsDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const LogisticDetailData = useSelector(
      (state: any) => state?.getLogisticList?.getLogisticDetailResponse?.data?.data
    );

    const classes = useStyles();
    useEffect(() => {
      setLoading(true);
      dispatch(GetLogisticDetailAction(id)).then(() => setLoading(false))
    }, []);
  
    const backHandler = () => {
      navigate("/Logistic")
    };

    const cardAllocation = val => {
      switch (val) {
        case 'A':
          return "Auto";
          break;
        case 'M':
          return "Manual";
          break;
        default:
          return "";
          break;
      }
    };

    const printStatus = val => {
      switch (val) {
        case 'R':
          return "Ready To Print";
          break;
        case 'I':
          return "In Process";
          break;
        case 'P':
          return "Print";
          break;
        default:
          return "";
          break;
      }
    };

    const cardStatus = (val) => {
      switch (val) {
        case "A":
          return "Active";
          break;
        case "I":
          return "InActive";
          break;
        case "B":
          return "Blocked";
          break;
        case "L":
          return "Lost";
          break;
        default:
          return "";
          break;
      }
    };

    return (
      <>
        <Container className="userIndex">
          <Grid item xs={12} position="relative" className={classes.topheader}>
            <Typography color="textPrimary" variant="h5">
              Logistics Detail
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 1 }}>
              <Link
                color="textPrimary"
                component={RouterLink}
                to="/Logistic"
                variant="subtitle2"
              >
                Logistics
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                Logistics Detail
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Card>
              <Grid
                item
                className="counsellorApplicationListTable filterdataContner"
              >
                <div className="DetailScreenSessionsMain">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ArrowBackIos
                      className={classes.backArrow}
                      onClick={() => backHandler()}
                    />
                    <h4>Back</h4>
                  </div>
                  {LogisticDetailData && !loading ? (
                    <div className="DetailScreenSessionsMainInn sessionsDetailTog">
                      <div className="sessionsDetailTog">
                        <p>
                          <span>Card Lot:</span>{" "}
                          {LogisticDetailData?.CARD_LOT !== "" && LogisticDetailData?.CARD_LOT !== null
                            ? LogisticDetailData?.CARD_LOT
                            : "NA"}
                        </p>
                        <p>
                          <span>Card Serial: </span>
                          {LogisticDetailData?.CARD_SERIAL !== "" && LogisticDetailData?.CARD_SERIAL !== null
                            ? LogisticDetailData?.CARD_SERIAL
                            : "NA"}
                        </p>
                        <p>
                          <span>Card Digit: </span>{" "}
                          {LogisticDetailData?.CARD_DIGIT !== "" && LogisticDetailData?.CARD_DIGIT !== null
                            ? LogisticDetailData?.CARD_DIGIT
                            : "NA"}
                        </p>
                        <p>
                          <span>Card Allocation: </span>
                          {LogisticDetailData?.CARD_ALLOCATION !== "" && LogisticDetailData?.CARD_ALLOCATION !== null
                            ? cardAllocation(
                                LogisticDetailData?.CARD_ALLOCATION
                              )
                            : "NA"}
                        </p>
                        <p>
                          <span>Print Status: </span>
                          {LogisticDetailData?.PRINT_STATUS !== "" && LogisticDetailData?.PRINT_STATUS !== null
                            ? printStatus(LogisticDetailData?.PRINT_STATUS)
                            : "NA"}
                        </p>
                        <p>
                          <span>Card Status: </span>
                          {LogisticDetailData?.CARD_STATUS !== "" && LogisticDetailData?.CARD_STATUS !== null
                            ? cardStatus(LogisticDetailData?.CARD_STATUS)
                            : "NA"}
                        </p>
                        <p>
                          <span>Activated On: </span>
                          {LogisticDetailData?.ACTIVATED_ON !== "" && LogisticDetailData?.ACTIVATED_ON !== null
                            ? getLocalTime(LogisticDetailData?.ACTIVATED_ON)[9]
                            : "NA"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        margin: "20vh 0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress />
                    </div>
                  )}
                </div>
              </Grid>
            </Card>
          </Box>
        </Container>
      </>
    );
  };
  export default LogisticsDetail;