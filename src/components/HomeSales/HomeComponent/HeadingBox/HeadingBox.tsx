import {
    Box,
    Button,
    Container,
    Typography,
    Grid,
    Card
  } from '@material-ui/core';
  import { useState } from 'react';
  import { useTheme } from '@material-ui/core/styles';
  import styles from "./HomeDashbaord.module.css"
  import Slider from '@material-ui/core/Slider';
  import OfferCardListPopup from 'src/components/AddMore/PlanSelection/OfferCardList/OfferCardList';
  import useAuth from "../../../../hooks/useAuth";
  
  const HeadingBox = ({ loading, updateMsg }) => {
    const [offers, setOffers] = useState(false);
    const [offerDetails, setOfferDetails] = useState({});

    const { user } = useAuth();
    return (
       <div>
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
            Welcome,
          </Typography>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {user?.name}
          </Typography>
        </Grid>
        <Grid item>
          <Button 
            tabIndex={0} onClick={() => setOffers(true)} onKeyDown={() => setOffers(true)}
            color="primary"
            variant="contained"
          >
            Offers
          </Button>
        </Grid>
      </Grid>
       {offers && <OfferCardListPopup addDialog={offers} setAddDialog={setOffers} setOfferDetails={setOfferDetails} apply={false} loading={loading} updateMsg={updateMsg} price={null} gst={null} />}
       </div>
      );
    };
  export default HeadingBox;