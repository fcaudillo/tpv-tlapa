import React, { useRef, useContext }  from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import Calculator from '../components/Calculator'
import CardEditItem from '../components/CardEditItem'
import { Input, Button, Box, Grid } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import { Observable, fromEvent } from 'rxjs';
import { ApplicationContext } from '../Context';

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
    tecla: {
      maxHeight: '46px', 
      minHeight: '46px',
      marginBottom: '20px',
    },

});

function DialogPagarTicket(props) {
  const classes = useStyles();
  const onClose = props.onClose;
  const open = props.open;
  const onCancel = props.onCancel;
  const dispatch = useDispatch();
  const [disabledPrice,setDisabledPrice] =  React.useState(true);
  const [cantidadRecibida, setCantidadRecibida ] = React.useState(0);
  const totalVenta = useSelector(store => store.listaTicket.reduce((cant,ticket) => cant + (ticket.cantidad * ticket.precioVenta),0));
  const cantidadLista = useSelector(store => store.listaTicket.length);
  const listaTicket = useSelector(store => store.listaTicket);

  const contadorItemTicket = useSelector(store => store.contadorItemTicket);
  const value = useContext(ApplicationContext);
  const { parametros } = value;

  const handleClose = () => { onClose();
  }

  const handleCancel = () => {
    // dispatch(actions.modifyItemConsulta({...originalCardEditItem}));
     onClose();
  }

  const createTemplate = () => {
   const adicionalEncabezado = parametros["TICKET_ADICIONAL"];
   const adicionalPie = parametros["TICKET_PIE"];
   const data = {
     "encabezado": {
        "giro": parametros["CLIENTE_GIRO"],
        "negocio": parametros["CLIENTE_NOMBRE"],
        "fecha": "27/08/2020 03:14",
        "adicional": adicionalEncabezado.split("|"),
     },
     "productos": [...listaTicket],
     "pie": {
       "numero_ticket": 1414,
       "adicional": adicionalPie.split("|"),

     }
   };
   return data;
  }

  const createTemplateMovimiento = (tipoimpresion) => {
    const data = {
      "tipo_movimiento": parametros["MOVIMIENTO_VENTA"],
      "total": totalVenta,
      "descripcion": parametros["DESCRIPCION_VENTA_PUBLICO"],
      "tipo_impresion": tipoimpresion,
      "items" : [...listaTicket]
     };
     return data;
  }


  const imprimirTicket = () => {
    const imprimirconticket = 1;
    const dataPrintTicket = createTemplate();
    const dataMovimiento = createTemplateMovimiento(imprimirconticket);
    const ticket = {
       movimiento: dataMovimiento,
       printTicket: dataPrintTicket,
    };
    dispatch(actions.sendTicket(ticket));
    console.log(data);
    alert("imprimir ticket");
  }


  const  updateData = (quantity, quantityPrice,type) => { 
  	       const cantidad = (quantity == "" || quantity == "." ? 0 : parseFloat(quantity));
  	       const precioVenta = (quantityPrice == "" || quantityPrice == "." ? 0 : parseFloat(quantityPrice));
               setCantidadRecibida(cantidad);
  	     }
   
  return (

    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="md" >
        <Grid container>
           <Grid item xs={3} />
           <Grid container item xs={5}>
              <Grid item xs={6}>
                 Total a cobrar
              </Grid>
              <Grid item xs={6}>
                 { totalVenta }
              </Grid>
              <Grid item xs={6}>
                Cantidad recibida
              </Grid>
              <Grid item xs={6}>
                <form>
                 <Input name="cantidad" value={cantidadRecibida} type="text"  onChange = { (evt) => {
                      const cantidad = evt.target.value;
                      updateData(cantidad,cantidad, "");
                  }}
                    />
               </form>
              </Grid>
              <Grid item xs={6}>
                 Cambio 
              </Grid>
              <Grid item xs={6}>
                 { cantidadRecibida - totalVenta }
              </Grid>
              <Grid item xs={12}>

                        <Box spacing={2} >
                           <Button name="btnImprime" 
                                   variant="outlined" 
                                   className={classes.tecla} 
                                   startIcon={ <Icon>check_circle_icon</Icon> }
                                   onClick = { (e) => {
                                      imprimirTicket();
                                      e.stopPropagation();
                                   }} >
                                         Aceptar
                           </Button>                       
                           <Button variant="outlined" className={classes.tecla} color="primary" startIcon={ <Icon>cancel</Icon> } 
                                 onClick={(e) => {
                                    handleClose();
                                    e.stopPropagation();
                                 }}
                               > 
                               Cancelar
                           </Button> 
                       </Box>              
               </Grid>
           </Grid>
           <Grid container item xs={4} >
                <Box margin={1}>                       
                       <Calculator type='quantity' quantity={"" + cantidadRecibida} quantityPrice={"" + cantidadRecibida} updateData={ (quantity, quantityPrice, type) => {
                        
                        updateData(quantity, quantityPrice,type);
                       }} /> 
                      </Box>
           </Grid> 
        </Grid>
   </Dialog>
  );
}

export default DialogPagarTicket;
