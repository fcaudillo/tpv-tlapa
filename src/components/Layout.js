import React from 'react';
import { Box, Grid } from '@mui/material'
import Navbar from './Navbar';
import TicketScreen from '../components/TicketScreen'
import { Link } from 'react-router-dom';
import { Form , Modal, Button } from 'antd'
import { useDispatch } from 'react-redux';
import { SaveProductAction } from '../bussiness/actions/SaveProductAction'
import  FormProduct  from '../pages/FormProduct'

function Layout(props) {
  const dispatch = useDispatch()
  const [ form ] = Form.useForm()
  const [visibleCrearProducto, setVisibleCrearProducto] = React.useState(false)

  const showCrearProducto = () => {
     dispatch(SaveProductAction("PURGE"))
     setVisibleCrearProducto(true)
  }

  const crearProducto = () => {
    console.log("Crear el producto desde layaout")
    form.submit();
  }

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
                  <Button onClick = {() => showCrearProducto() } >
                      Crear producto 
                  </Button>
                  <Link className="btn btn-primary" to="/puntoventa/tpv">
                      TPV
                  </Link>
                  <Link className="btn btn-primary" to="/puntoventa/listacambioprecio">
                      Cambio de precios
                  </Link>
                  <Link className="btn btn-primary" to="/">
                      Punto de venta
                  </Link>

              </Grid>
              <Grid item xs={12}>
                  {props.children}
              </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Modal
            title="Crear producto"
            centered
            visible={visibleCrearProducto}
            onOk={() => crearProducto()}
            onCancel={() => setVisibleCrearProducto(false)}
            width={1000}
          >
          
            <FormProduct formInstance={form}  hideModal={ () => setVisibleCrearProducto(false)}  mode="Create"  />
      </Modal>
      
    </React.Fragment>
  );
}

export default Layout;
