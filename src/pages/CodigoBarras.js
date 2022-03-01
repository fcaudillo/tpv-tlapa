import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import './styles/CodigoBarras.css';
import Producto from '../components/Producto'
import LectorCodigoBarras from '../components/LectorCodigoBarras'
import EditItemConsulta from '../components/EditItemConsulta'
import { Grid  } from '@mui/material'
import { Button, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
    },
    gridList: {
       width: '97%',
       height: 560,
       overflowY: 'scroll',
       marginLeft: '0px',
    },

});

function CodigoBarras() {
  const lista = useSelector(store => store.reducer.listaConsulta);
  const cardItem = useSelector(store => store.reducer.cardEditItem);
  const dispatch = useDispatch();
  const lector = LectorCodigoBarras("message");
  const [isOpen, setIsOpen] = useState(false);
  {/* 
  const listElements = lista.map((prod) =>
     <GridListTile key={prod.id} cols={1} onClick={(e) => {
                                              dispatch(actions.activeItemConsulta(prod.id));
                                              console.log(cardItem);
                                          }} 
      >
        <Producto key={prod.id} data={prod} />  
     </GridListTile>
  );

  */}

  const listElements = lista.map((prod) =>
      <Grid item xs={12} key={prod.id}>
        <Producto key={prod.id} data={prod} />  
      </Grid>
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
      <Button variant="contained" disabled={lista.length == 0} color="primary" onClick={openEditCalculator} > 
         Editar        
      </Button>
      <br/>
      
      {/** 
      <GridList id="ax2" cellHeight={'auto'} spacing={5} className={classes.gridList} cols={1} >
           {listElements}
      </GridList>
      */}
      <Grid container cellHeight={'auto'} spacing={2} className={classes.gridList} cols={1}>

      {listElements}

      </Grid>
      

      <EditItemConsulta onClose={closeEditCalculator} open={isOpen}  data={cardItem}  />

         
    </div>
  );
}


export default CodigoBarras;
