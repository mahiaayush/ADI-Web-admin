import {
    Box,
    Button,
    Container,
    Typography,
    Grid,
    Card
  } from '@material-ui/core';
  import styles from "./RangeBox.module.css"
  import NumberFormat from "../../../common/reusable/NumberFormat";

  const RangeBox = ({ cashData }) => {
    const result = () => { 
      if (cashData?.InHand === 0 || cashData?.NeedToDeposit === 0) {
        return 0
       }
      return (cashData?.NeedToDeposit / cashData?.InHand) * 100  
    }

    return (
      <Card className={styles.cardpadding}>
      <Grid
      alignItems="center"
      container
      justifyContent="space-between"
      spacing={3}
      item
      xs={12}
      >
      <Grid item>
        <Typography
          color="textSecondary"
          variant="overline"
        >
          In-hand Cash 
        </Typography>
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {/* <b>₹ {cashData?.InHand?.toLocaleString()}</b> */}
          <b> <NumberFormat Amount={cashData?.InHand} decimalScale={2} /> </b>
        </Typography>
      </Grid>
       </Grid>
       <Grid
       alignItems="center"
       container
       justifyContent="space-between"
       spacing={3}
       item
       xs={12}
       className={styles.cardpaddingBottom}
       >
       <Grid 
       item 
       xs={12}
       >
         <Typography
           color="textSecondary"
           variant="overline"
           className={styles.rangetoppera}
         >
          Need to deposit today <b><NumberFormat Amount={cashData?.NeedToDeposit} /></b> / <NumberFormat Amount={cashData?.InHand} decimalScale={2} /> 
         </Typography>
          <div className={styles.rangesliderUp}>
          <div className={styles.rangeslider}>
            <cite style={{ width: `${result()}%` }}>r</cite>
          </div>
          <span style={{ left: `${result() - 1}%` }}>r</span>
          </div> 
          <br />
         <Typography
           color="textSecondary"
           variant="overline"
           className={styles.rangebotpera}
         >
          <b>Need To Deposit</b> <span>In-hand Amount</span>
         </Typography>
       </Grid>
     </Grid>
     </Card>
      );
    };
  export default RangeBox;