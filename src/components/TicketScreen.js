import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import Calculator from '../components/Calculator'
import { Button, Box, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
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
       overflowY: 'scroll'
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
    divTicket: {
      height: '350px',
      overflowY: 'scroll'
    },

});


function TicketScreen(props) {
  const classes = useStyles();
  const itemTicket = useSelector(store => store.reducer.itemTicket);
  const listaTicket = useSelector(store => store.reducer.listaTicket);
  const dispatch = useDispatch();
  const [disabledPrice,setDisabledPrice] =  React.useState(true);
  const totalVenta = useSelector(store => store.reducer.listaTicket.reduce((cant,ticket) => cant + (ticket.cantidad * ticket.precioVenta),0));
  const cantidadLista = useSelector(store => store.reducer.listaTicket.length);
  const contadorItemTicket = useSelector(store => store.reducer.contadorItemTicket);
  const calculatorEditItem = useSelector(store => store.reducer.calculatorEditItem);
  //const [ isOpenDialogPagarTicket, setIsOpenDialogPagarTicket] = React.useState(false);
  const isOpenDialogPagarTicket = useSelector(store => store.reducer.showDialogPagar);
  const calculatorRef = useRef();
  const listaEndRef = useRef();
  const btnPagar = useRef();
  const [typeEditCalc, setTypeEditCalc] = React.useState("quantity");

  const scrollToBottom = () => {
     listaEndRef.current.scrollIntoView({ behavior: "smooth", block:'end', inline : 'nearest' })
  }
   
  const setIsOpenDialogPagarTicket = (value) => {
    dispatch(actions.modifyCantidadRecibida(0));
    dispatch(actions.showDialogPagar(value));
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

  const updateData = (quantity, quantityPrice,type) => { 
          console.log("1. quantity : " + quantity);
          console.log("1. quantityPice: " + quantityPrice);
          console.log("1. codigoInterno: " + calculatorEditItem.codigointerno);

          const cantidad = parseFloat(quantity == "" || quantity == "." ? "0" : quantity);
  	      const precioVenta = parseFloat(quantityPrice == "" || quantityPrice == "." ? "0" : quantityPrice);
  	      dispatch(actions.modifyItemTicket({...itemTicket, "cantidad" : cantidad, "precioVenta": precioVenta}));

          dispatch(actions.modifyCantidadTicketItemActive({
            "cantidad": quantity,
            "precio": quantityPrice,
          }));             
  	    }
  

  return (

          <Box>               
                <Grid container  >

                    <Grid item xs={12}>
                      <Box className={classes.boxTicket}>
                          <div>
                             <Grid container cellHeight='auto' className={classes.gridList} cols={1} component='div'>
                               {listaTicket.map(producto => (
                                  <Grid item key={producto.id} cols={1} component='div' onClick={(e) => {
                                              dispatch(actions.activeItemTicket(producto.id));
                                              calculatorRef.current.setTypeFromParent("quantity");
                                              console.log("cambiando a quantity")
                                          }}
                                  >
                                    <CardItemTicket data={producto} />
                                  </Grid>
                                ))}
        
                                <div ref={listaEndRef} />
                             </Grid>
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
                         Total a cobrar $ {(totalVenta).toFixed(2)}
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                       <Box padding={2}>
                           <Calculator ref={calculatorRef} type={typeEditCalc} quantity={"" + calculatorEditItem.cantidad} 
                                                           quantityPrice={"" + calculatorEditItem.precio} 
                                                           startEdit={calculatorEditItem.startEdit} 
                                                           onChangeToggle = { (type) => {
                                                                  dispatch(actions.modifyStartEditItemActivo(false));
                                                               }     
                                                           }

                                                           updateData={ (quantity, quantityPrice, type) => {
                                                              updateData(quantity, quantityPrice,type);
                                                           }} 
                            /> 
                       </Box>


                    </Grid>

                </Grid>
             
            <DialogPagarTicket onClose={closeDialogPagarTicket} open={isOpenDialogPagarTicket} />

          </Box>      


  );
}

export default TicketScreen;
