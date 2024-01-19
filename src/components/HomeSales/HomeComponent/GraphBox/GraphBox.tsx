import {
  Box,
  Typography,
  Grid,
  Card,
  CircularProgress
} from '@material-ui/core';
import type { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts'
import { useTheme } from '@material-ui/core/styles';
import styles from "./GraphBox.module.css";
import NumberFormat from "../../../common/reusable/NumberFormat";

const GraphBox = ({ targetData }) => {
  const theme = useTheme();

  const getall = (): any => {
    if (targetData?.TagretAchieved === 0 || targetData?.MonthlyTarget === 0) {
      return 0
    }
    return ((targetData?.TagretAchieved / targetData?.MonthlyTarget) * 100)?.toFixed(2);
  }
  
  const data = {
    series: [
      {
        color: '#3D2AE7',
        data: parseFloat(getall()),
        name: 'Achieved'
      },
      {
        color: '#ACA3F5',
        data: 100 - getall(),
        name: 'Remaining'
      },
    ]
  };

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: data.series.map((item) => item.color),
    dataLabels: {
      enabled: false
    },
    labels: data.series.map((item) => item.name),
    legend: {
      show: false
    },
    stroke: {
      show: false
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = data.series.map((item) => item.data);

  return (
    <Box sx={{ pt: 3 }}>
      <Card style={{ background: "#130A5C", color: "#fff", padding: "20px 10px" }}>
        <Grid
          alignItems="center"
          container
          justifyContent="space-between"
          spacing={3}
          xs={12}
        >
          <Grid
            item
            md={6}
            sm={6}
            xs={12}
          >
            <Box className={styles.graphchartinn}>
              <Typography className={styles.graphchartinnpera}>{chartSeries[0]}% <span>Achieved</span></Typography>
              <Chart
                height="300"
                options={chartOptions}
                series={chartSeries}
                type="donut"
              />
            </Box>

          </Grid>
          <Grid
            item
            md={6}
            sm={6}
            xs={12}
            className={styles.graphright}
          >
            <Typography
              color="textPrimary"
              variant="h5"
            >
              <span>Target achieved</span>
              <b><NumberFormat Amount={targetData?.TagretAchieved} /></b>
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              <span>Monthly Target</span>
              <b><NumberFormat Amount={targetData?.MonthlyTarget} /></b>
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              <span>Days remaining</span>
              <b>{targetData?.DaysRemaining}</b>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
export default GraphBox;