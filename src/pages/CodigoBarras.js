import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import './styles/CodigoBarras.css';
import Producto from '../components/Producto'
import LectorCodigoBarras from '../components/LectorCodigoBarras'

import confLogo from '../images/badge-header.svg';
import { GridList, GridListTile } from '@material-ui/core'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    gridList: {
       width: 900,
       height: 300,
    },

});

function CodigoBarras() {
  const lista = useSelector(store => store.listaConsulta);
  const dispatch = useDispatch();
  const lector = LectorCodigoBarras("message");
  const listElements = lista.map((prod) =>
     <GridListTile key={prod.id} cols={1} onClick={(e) => dispatch(actions.activeItemConsulta(prod.id))} >
        <Producto key={prod.id} data={prod} />  
     </GridListTile>
  );
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="primary" startIcon={ <DeleteIcon /> }> 
        Delete 15
      </Button>
      <p> componente codigo de barras  una prueba</p>
      <GridList cellHeight={'auto'} spacing={5} className={classes.gridList} cols={1} >
           {listElements}
      </GridList>
      <button onClick={() => dispatch(actions.addItemConsulta({'codigointerno':1,'description':'abc'}))}> Agregar producto </button>
      <Link className="btn btn-primary" to="/tpv">
                Ve a pagina  tpv
              </Link>
    </div>
  );
}


export default CodigoBarras;
