import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import Calculator from '../components/Calculator'
import { Button, Box, Grid } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import CardItemTicket from '../components/CardItemTicket'

const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    }, 
    gridList: {
       height: 350,
    },
    tecla: {
      maxHeight: '46px', 
      minHeight: '46px',
      marginBottom: '20px',
    },
    boxTicket: {
       height: '350px',
       color: 'red',
    },

});


function TicketScreen(props) {
  const classes = useStyles();
  const itemTicket = useSelector(store => store.itemTicket);
  const listaTicket = useSelector(store => store.listaTicket);
  const dispatch = useDispatch();
  const [disabledPrice,setDisabledPrice] =  React.useState(true);
  const getListaTicket = () => listaTicket;
  const getItemTicket = () => itemTicket;
  const totalVenta = useSelector(store => store.listaTicket.reduce((cant,ticket) => cant + (ticket.cantidad * ticket.precioVenta),0));
//  const totalCantidad = useSelector(store => store.listaTicket.reduce((cant,ticket) => cant + ticket.cantidad),0);

  const  updateData = (quantity, quantityPrice,type) => { 
  	       const cantidad = (quantity == "" || quantity == "." ? 0 : parseFloat(quantity));
  	       const precioVenta = (quantityPrice == "" || quantityPrice == "." ? 0 : parseFloat(quantityPrice));
  	       dispatch(actions.modifyItemTicket({...itemTicket, "cantidad" : cantidad, "precioVenta": precioVenta}));
  	     }
   
  return (

          <Box>               
                <Grid container  >

                    <Grid item xs={12}>
                      <Box className={classes.boxTicket}>
                          <div>


                             <GridList cellHeight='auto' className={classes.gridList} cols={1} component='div'>
                               {listaTicket.map(producto => (
                                  <GridListTile key={producto.id} cols={1} component='div' onClick={(e) => {
                                              dispatch(actions.activeItemTicket(producto.id));
                                          }}
                                  >
                                    <CardItemTicket data={producto} />
                                  </GridListTile>
                                ))}
                             </GridList>

                          </div>
                      </Box>
             
                    </Grid>

                    <Grid item xs={12}>
                      <div> Total items: {listaTicket.length} </div>
                      <div> Total venta: {totalVenta} </div>
                    </Grid>
                    <Grid item xs={12}>
                       <Box padding={2}>
                           <Calculator type='quantity' quantity={"" + itemTicket.cantidad} quantityPrice={"" + itemTicket.precioVenta} updateData={ (quantity, quantityPrice, type) => {
                            updateData(quantity, quantityPrice,type);
                           }} /> 
                       </Box>


                    </Grid>

                </Grid>


          </Box>      


  );
}

export default TicketScreen;
