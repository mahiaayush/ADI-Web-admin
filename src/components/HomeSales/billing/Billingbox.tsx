import {
    Grid,
    TextField,
  } from '@material-ui/core';
  import MenuItem from "@material-ui/core/MenuItem";
  import { useState, useEffect } from 'react';
  import { useTheme } from '@material-ui/core/styles';
  import type { ChangeEvent } from "react";

  const Billingbox = (props) => {
    const [stateID, setStateID] = useState(null);
    const stateListData = [{ id: 1, state: "India" }, { id: 2, state: "Bhutan" }]

    return (
             <div>
            <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
            item
            md={12}
            pb={3}
            >
                  <Grid item sm={12} xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          name="address"
                          required
                        />
                  </Grid>    
            </Grid>
            
            <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
            item
            xs={12}
            pb={3}
            >
                  <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Street"
                          name="street"
                          required
                        />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Town/City"
                          name="city"
                          required
                        />
                  </Grid>    
            </Grid>
            <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
            item
            xs={12} 
            pb={3}
            >
                <Grid item sm={6} xs={12}>
                <TextField
                    fullWidth
                    type="number"
                    label="State/Provience"
                    name="state_provience"
                    value={stateID}
                    onChange={(e: ChangeEvent<any>) => setStateID(e.target.value)}
                    select
                    required
                >
                    <MenuItem value="">Select State</MenuItem>
                    {stateListData && stateListData.length > 0
                    ? stateListData.map((data, ind) => (
                        <MenuItem key={data.id} value={data?.id}>
                            {data.state}
                        </MenuItem>
                        ))
                    : null}
                </TextField>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                    fullWidth
                    type="number"
                    label="Country"
                    name="country"
                    value={stateID}
                    onChange={(e: ChangeEvent<any>) => setStateID(e.target.value)}
                    select
                    required
                    >
                    <MenuItem value="">Select State</MenuItem>
                    {stateListData && stateListData.length > 0
                    ? stateListData.map((data, ind) => (
                        <MenuItem key={data.id} value={data?.id}>
                            {data.state}
                        </MenuItem>
                        ))
                    : null}
                </TextField>
                  </Grid>    
            </Grid>
            <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
            item
            xs={12}
            pb={3}
            >
                  <Grid item sm={6} xs={12}>
                        <TextField
                          fullWidth
                          label="Zip/Post Code"
                          name="address"
                          type="number"
                          required
                        />
                  </Grid>    
            </Grid>
             </div>
      );
    };
  
  export default Billingbox;