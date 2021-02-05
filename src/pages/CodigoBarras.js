import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import './styles/CodigoBarras.css';
import Producto from '../components/Producto'
import LectorCodigoBarras from '../components/LectorCodigoBarras'
import EditItemConsulta from '../components/EditItemConsulta'

import confLogo from '../images/badge-header.svg';
import { GridList, GridListTile } from '@material-ui/core'
import { Button, Box } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
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
       height: 500,
    },

});

function CodigoBarras() {
  const lista = useSelector(store => store.listaConsulta);
  const cardItem = useSelector(store => store.cardEditItem);
  const dispatch = useDispatch();
  const lector = LectorCodigoBarras("message");
  const [isOpen, setIsOpen] = useState(false);
  const listElements = lista.map((prod) =>
     <GridListTile key={prod.id} cols={1} onClick={(e) => {
                                              dispatch(actions.activeItemConsulta(prod.id));
                                              console.log(cardItem);
                                          }} 
      >
        <Producto key={prod.id} data={prod} />  
     </GridListTile>
  );
  const classes = useStyles();

  const openEditCalculator = () => {
     setIsOpen(true);
  }
  const closeEditCalculator = (value) => {
    setIsOpen(false);
  }

  return (
    <div>
      <Button variant="contained" disabled={lista.length == 0} color="primary" onClick={openEditCalculator} startIcon={ <EditIcon /> }> 
         Editar        
      </Button>
      <br/>
      <GridList cellHeight={'auto'} spacing={5} className={classes.gridList} cols={1} >
           {listElements}
      </GridList>
      <Link className="btn btn-primary" to="/tpv">
                Ve a pagina  tpv
              </Link>
      <EditItemConsulta onClose={closeEditCalculator} open={isOpen}  data={cardItem}  />
         
    </div>
  );
}


export default CodigoBarras;
