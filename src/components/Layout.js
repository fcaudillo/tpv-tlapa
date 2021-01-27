import React from 'react';
import { Button, Box, Grid } from '@material-ui/core'
import Navbar from './Navbar';

function Layout(props) {
  // const children = props.children;

  return (
    <React.Fragment>

      <Navbar />
      <Grid container>

        <Grid item xs={3}>
          <Box>
          		Datos ticketc
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
