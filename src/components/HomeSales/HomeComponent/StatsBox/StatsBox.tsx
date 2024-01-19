import {
    Box,
    Button,
    Container,
    Typography,
    Grid,
    Card
  } from '@material-ui/core';
  import type { ApexOptions } from 'apexcharts';
  import Chart from 'react-apexcharts'
  import { useState } from 'react';
  import { useNavigate } from 'react-router';
  import { useTheme } from '@material-ui/core/styles';
  import styles from "./StatsBox.module.css"
  import Slider from '@material-ui/core/Slider';

  const StatsBox = ({ cardData }) => {
    const navigate = useNavigate();
    return (
      <Box sx={{ pt: 3 }}>
      <Card>
      <Grid
        alignItems="center"
        container
        justifyContent="space-between"
      >
        <Grid
          item
          md={2}
          sm={6}
          xs={12}
          sx={{
            borderRight: (theme) => (
              {
                md: `1px solid ${theme.palette.divider}`
              }
            ),
            borderBottom: (theme) => (
              {
                md: 'none',
                xs: `1px solid ${theme.palette.divider}`
              }
            ),
            p: 3,
            textAlign: 'center'
          }}
          className={styles.amountboxList}
          onClick={() => navigate('/home-sales/inventory')}
        >
          <Typography 
            className={styles.amountbox}
            color="textSecondary"
            sx={{ mt: 1 }}
            variant="overline"
          >
            Inventory <span>{cardData?.Inventory}</span>
          </Typography>
        </Grid>

        <Grid
          item
          md={2}
          sm={6}
          xs={12}
          sx={{
            borderRight: (theme) => (
              {
                md: `1px solid ${theme.palette.divider}`
              }
            ),
            borderBottom: (theme) => (
              {
                md: 'none',
                xs: `1px solid ${theme.palette.divider}`
              }
            ),
            p: 3,
            textAlign: 'center'
          }}
          className={styles.amountboxList}
        >
          <Typography 
            className={styles.amountbox}
            color="textSecondary"
            sx={{ mt: 1 }}
            variant="overline"
          >
            Available Cards <span>{cardData?.CardNotSold}</span>
          </Typography>
        </Grid>
        
        <Grid
          item
          md={2}
          sm={6}
          xs={12}
          sx={{
            borderRight: (theme) => (
              {
                md: `1px solid ${theme.palette.divider}`
              }
            ),
            borderBottom: (theme) => (
              {
                md: 'none',
                xs: `1px solid ${theme.palette.divider}`
              }
            ),
            p: 3,
            textAlign: 'center'
          }}
          className={styles.amountboxList}
        >
          <Typography 
            className={styles.amountbox}
            color="textSecondary"
            sx={{ mt: 1 }}
            variant="overline"
          >
            Card Sold <span>{cardData?.CardSold}</span>
          </Typography>
        </Grid>

        <Grid
          item
          md={2}
          sm={6}
          xs={12}
          sx={{
            borderRight: (theme) => (
              {
                md: `1px solid ${theme.palette.divider}`
              }
            ),
            borderBottom: (theme) => (
              {
                sm: 'none',
                xs: `1px solid ${theme.palette.divider}`
              }
            ),
            p: 3,
            textAlign: 'center'
          }}
          className={styles.amountboxList}
        >
          <Typography 
            className={styles.amountbox}
            color="textSecondary"
            sx={{ mt: 1 }}
            variant="overline"
          >
            Activated <span>{cardData?.Activated}</span>
          </Typography>
        </Grid>
        <Grid
          item
          md={2}
          sm={6}
          xs={12}
          sx={{
            borderRight: (theme) => (
              {
                md: `1px solid ${theme.palette.divider}`
              }
            ),
            borderBottom: (theme) => (
              {
                sm: 'none',
                xs: `1px solid ${theme.palette.divider}`
              }
            ),
            p: 3,
            textAlign: 'center'
          }}
          className={styles.amountboxList}
          onClick={() => navigate('/cash-in-hand')}
        >
          <Typography 
            className={styles.amountbox}
            color="textSecondary"
            sx={{ mt: 1 }}
            variant="overline"
          >
            Pending <span><b className={styles.redcolors}>{cardData?.Pending}</b></span>
          </Typography>
        </Grid>
      </Grid>
    </Card>
    </Box>
      );
    };
  export default StatsBox;