import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import './styles/CodigoBarras.css';
import Producto from '../components/Producto'
import LectorCodigoBarras from '../components/LectorCodigoBarras'

import confLogo from '../images/badge-header.svg';
import { Grid } from '@material-ui/core'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    gridContainer: {
      paddingLeft: "40px",
      paddingRight: "40px",
    },

});

function CodigoBarras() {
  const lista = useSelector(store => store.listaConsulta);
  const dispatch = useDispatch();
  const lector = LectorCodigoBarras("message");
  const listElements = lista.map((prod) =>
     <Producto key={prod.codigointerno} data={prod} />  
  );
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="primary" startIcon={ <DeleteIcon /> }> 
        Delete 6
      </Button>
      <p> componente codigo de barras  una prueba</p>
      <Grid container spacing={4} className={classes.gridContainer}>
        <Grid item xs={4} sm={4} md={4}>
           {listElements}
        </Grid>   
      </Grid>
      <button onClick={() => dispatch(actions.addItemConsulta({'codigointerno':1,'description':'abc'}))}> Agregar producto </button>
      <Link className="btn btn-primary" to="/tpv">
                Ve a pagina  tpv
              </Link>
    </div>
  );
}


export default CodigoBarras;
