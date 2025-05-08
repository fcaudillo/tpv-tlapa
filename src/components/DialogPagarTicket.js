import React, { useRef, useContext }  from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import Calculator from '../components/Calculator'
import { Input, Button, Box, Grid } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { makeStyles } from '@mui/styles'
import Icon from '@mui/material/Icon'
import { ApplicationContext } from '../Context';
import Cookies from 'js-cookie'
import { URL_ADD_TICKET, URL_PRINT_TICKET } from '../bussiness/endpoints'

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
  const totalVenta = useSelector(store => store.reducer.listaTicket.reduce((cant,ticket) => cant + (ticket.cantidad * ticket.precioVenta),0));
  const cantidadLista = useSelector(store => store.reducer.listaTicket.length);
  const listaTicket = useSelector(store => store.reducer.listaTicket);
  const cantidadRecibida = useSelector(store => store.reducer.ticket.cantidadRecibida);
  const contadorItemTicket = useSelector(store => store.reducer.contadorItemTicket);
  const value = useContext(ApplicationContext);
  const { parametros } = value;

  const handleClose = () => { onClose();
  }

  const handleCancel = () => {
    // dispatch(actions.modifyItemConsulta({...originalCardEditItem}));
     onClose();
  }

  const getFormatDate = (fecha) => {
      const dia = fecha.getDate().toString().padStart(2, '0');
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const anio = fecha.getFullYear().toString();
      const horas = fecha.getHours().toString().padStart(2, '0');
      const minutos = fecha.getMinutes().toString().padStart(2, '0');
      const segundos = fecha.getSeconds().toString().padStart(2, '0');
      
      const formatoFecha = `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
      return formatoFecha;
 
  }

  const createTemplate = (movimientoId, fecha) => {
   const adicionalEncabezado = parametros["TICKET_ADICIONAL"];
   const adicionalPie = parametros["TICKET_PIE"];
   const data = {
     "encabezado": {
        "giro": parametros["CLIENTE_GIRO"],
        "negocio": parametros["CLIENTE_NOMBRE"],
        "fecha": fecha,
        "adicional": adicionalEncabezado.split("|"),
     },
     "productos": [...listaTicket],
     "pie": {
       "numero_ticket": movimientoId,
       "adicional": adicionalPie.split("|"),

     }
   };
   return data;
  }

  const createTemplateMovimiento = (tipoimpresion) => {
    const data ={
      "ticket" : {
         "tipo_movimiento": parametros["MOVIMIENTO_VENTA"],
         "total": totalVenta,
         "descripcion": parametros["DESCRIPCION_VENTA_PUBLICO"],
         "tipo_impresion": tipoimpresion,
         "items" : [...listaTicket]
        }
     };
     return data;
  }

 const  imprimirTicket = async (imprimirconticket) => {
   const dataMovimiento = createTemplateMovimiento(imprimirconticket);
   const response = await fetch(URL_ADD_TICKET,
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(dataMovimiento)
      });

      if (response.status === 200) {
         console.log(response);
         const result = await response.json();
         if (imprimirconticket == 1){
           const dataPrintTicket = createTemplate(result.folio, result.fecha);
           const respImp = await fetch( URL_PRINT_TICKET,{
               headers: {'Content-Type':'application/json'},
               method: 'POST',
               body: JSON.stringify(dataPrintTicket)
             })
            console.log(dataPrintTicket);
            if (respImp.status != 200){
               alert("Error de impresion")
            } 
         }
         dispatch(actions.clearTicket())
         handleClose();
;
       }else {
         const errorMessage = await response.json()
         dispatch(actions.addTicketFail({message:errorMessage}));
       }
      
   
 }


  const  updateData = (quantity, quantityPrice,type) => { 
  	       const cantidad = (quantity == "" || quantity == "." ? 0 : parseFloat(quantity));
  	       const precioVenta = (quantityPrice == "" || quantityPrice == "." ? 0 : parseFloat(quantityPrice));
               dispatch(actions.modifyCantidadRecibida(cantidad));
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
                 { totalVenta.toFixed(2) }
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
                 { (cantidadRecibida - totalVenta).toFixed(2) }
              </Grid>
              <Grid item xs={12}>

                        <Box spacing={2} >

                           <Button variant="outlined" className={classes.tecla} color="primary" startIcon={ <Icon>cancel</Icon> } 
                                 onClick={(e) => {
                                    handleClose();
                                    e.stopPropagation();
                                 }}
                               > 
                               Cancelar
                           </Button> 
                           <Button variant="outlined" className={classes.tecla} color="primary" startIcon={ <Icon>cancel</Icon> } 
                                 onClick={(e) => {
                                    imprimirTicket(0);
                                    e.stopPropagation();
                                 }}
                               > 
                              Sin ticket 
                           </Button> 
                           <Button name="btnImprime" 
                                   variant="outlined" 
                                   className={classes.tecla} 
                                   startIcon={ <Icon>check_circle_icon</Icon> }
                                   onClick = { (e) => {
                                      imprimirTicket(1);
                                      e.stopPropagation();
                                   }} >
                                      Con Ticket 
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
