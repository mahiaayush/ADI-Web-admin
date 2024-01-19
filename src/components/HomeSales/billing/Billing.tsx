import {
    Box,
    Button,
    Typography,
    Grid,
    Card,
    Checkbox
  } from '@material-ui/core';
  import { useState, useEffect } from 'react';
  import { useTheme } from '@material-ui/core/styles';
  import styles from "./billing.module.css"
  import Billingbox from "./Billingbox"

  const Billing = (props) => {
    const [shipping, setShiiping] = useState(false)

    return (
             <Box sx={{ p: 0 }}>
             <Card className={styles.billcard}>
             <Typography
                color="textPrimary"
                variant="h5"
                className={styles.headfive}
             >
                Billing Information
            </Typography>

            <Billingbox />

            <Typography
                color="textPrimary"
                variant="h6"
                className={styles.headfive2}
            >
                Shipping Information
            </Typography>

            <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
            item
            xs={12}
            pb={3}
            >
                  <Grid item md={12}>
                            <Checkbox
                              onClick={(e) => setShiiping(!shipping)}
                              checked={shipping}
                            />
                            <cite className={styles.sameas}>Same as above</cite>
                            
                  </Grid>    
            </Grid>

           {shipping && <Billingbox />}
            
            <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
            item
            xs={12}
            pb={3}
            >
                  <Grid item md={12}>
                    <Button
                    color="primary"
                    variant="contained"
                    >
                    Proceed
                  </Button>
                  </Grid>    
            </Grid>

             </Card>
             
             </Box>
      );
    };
  
  export default Billing;