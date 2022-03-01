import React from 'react';
import { Box, Grid } from '@mui/material'
import Navbar from './Navbar';
import TicketScreen from '../components/TicketScreen'
import { Link } from 'react-router-dom';

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
          <Grid container>
              <Grid item xs={12}>
                  <Link className="btn btn-primary" to="/puntoventa/add">
                      Crear producto 
                  </Link>
                  <Link className="btn btn-primary" to="/puntoventa/tpv">
                      TPV
                  </Link>
                  <Link className="btn btn-primary" to="/puntoventa/listacambioprecio">
                      Cambio de precios
                  </Link>

              </Grid>
              <Grid item xs={12}>
                  {props.children}
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      
    </React.Fragment>
  );
}

export default Layout;
