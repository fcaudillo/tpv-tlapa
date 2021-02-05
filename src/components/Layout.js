import React from 'react';
import { Button, Box, Grid } from '@material-ui/core'
import Navbar from './Navbar';
import TicketScreen from '../components/TicketScreen'

function Layout(props) {
 
  return (
    <React.Fragment>

      <Navbar />
      <Grid container>

        <Grid item xs={3}>
          <Box>
          		<TicketScreen />
          </Box>

        </Grid>
        <Grid item xs={9}>
				{props.children}
        </Grid>
      </Grid>
      
    </React.Fragment>
  );
}

export default Layout;
