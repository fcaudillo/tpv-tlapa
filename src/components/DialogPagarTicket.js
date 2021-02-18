import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import Calculator from '../components/Calculator'
import CardEditItem from '../components/CardEditItem'
import { Button, Box, Grid } from '@material-ui/core'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'

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

  const handleClose = () => {
     onClose();
  }

  const handleCancel = () => {
    // dispatch(actions.modifyItemConsulta({...originalCardEditItem}));
     onClose();
  }


  const  updateData = (quantity, quantityPrice,type) => { 
  	       const cantidad = (quantity == "" || quantity == "." ? 0 : parseFloat(quantity));
  	       const precioVenta = (quantityPrice == "" || quantityPrice == "." ? 0 : parseFloat(quantityPrice));

  	     }
   
  return (

    <Dialog onClose={handleClose} open={open}>
        <Grid container>
           <Grid item xs={4}>
        Formulario   
           </Grid>
                <Grid container item xs={8} >
                    <Grid item xs={9}>
                      <Box margin={2}>                       
                       <Calculator type='quantity' quantity={"" + cantidadRecibida} quantityPrice={"" + cantidadRecibida} updateData={ (quantity, quantityPrice, type) => {
                        
                        updateData(quantity, quantityPrice,type);
                       }} /> 
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
    
                           <Box spacing={2}>
                              <Button variant="outlined" className={classes.tecla} startIcon={ <Icon>check_circle_icon</Icon> } 
                                           onClick={(e) => {
                                              //dispatch(actions.modifyListItemConsulta(cardEditItem));
                                              handleClose();
                                              e.stopPropagation();
                                           }}
                                         > 
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
        </Grid>
    </Dialog>
  );
}

export default DialogPagarTicket;
