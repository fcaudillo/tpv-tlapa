import React, { forwardRef, useRef, useImperativeHandle } from 'react';
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
import { Observable, fromEvent } from 'rxjs'
import DialogPagarTicket from '../components/DialogPagarTicket'

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
  const totalVenta = useSelector(store => store.listaTicket.reduce((cant,ticket) => cant + (ticket.cantidad * ticket.precioVenta),0));
  const cantidadLista = useSelector(store => store.listaTicket.length);
  const contadorItemTicket = useSelector(store => store.contadorItemTicket);
  const [ isOpenDialogPagarTicket, setIsOpenDialogPagarTicket] = React.useState(false);

  const calculatorRef = useRef();
  const listaEndRef = useRef();
  const btnPagar = useRef();

  const scrollToBottom = () => {
     listaEndRef.current.scrollIntoView({ behavior: "smooth", block:'end', inline : 'nearest' })
  }
   

  React.useEffect(() => {
     calculatorRef.current.setHabilitar(cantidadLista == 0);
  },[cantidadLista])

  React.useEffect(() => {
    scrollToBottom()
  },[contadorItemTicket])

  React.useEffect(() => {
    const clickPagar$ = fromEvent(btnPagar.current,'click')
                        .subscribe(evento => openDialogPagarTicket() );

    return () => clickPagar$.unsubscribe(); 

  },[])

  const openDialogPagarTicket = () => {
    setIsOpenDialogPagarTicket(true);
  } 

  const closeDialogPagarTicket = () => {
    setIsOpenDialogPagarTicket(false);
  }

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
        
                                <div ref={listaEndRef} />
                             </GridList>
                          </div>
                      </Box>
             
                    </Grid>

                    <Grid item xs={12}>
                      <div> Total items: {listaTicket.length} </div>
                      <Button ref={btnPagar}
                         variant="outlined"
                         color = "primary"
                         disabled = { listaTicket.length == 0 }
                         fullWidth={true}
                         style={{ justifyContent: "flex-end"}}>
                         Total a cobrar $ {totalVenta}
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                       <Box padding={2}>
                           <Calculator ref={calculatorRef} type='quantity' quantity={"" + itemTicket.cantidad} quantityPrice={"" + itemTicket.precioVenta} updateData={ (quantity, quantityPrice, type) => {
                            updateData(quantity, quantityPrice,type);
                           }} /> 
                       </Box>


                    </Grid>

                </Grid>
             
            <DialogPagarTicket onClose={closeDialogPagarTicket} open={isOpenDialogPagarTicket} />

          </Box>      


  );
}

export default TicketScreen;
