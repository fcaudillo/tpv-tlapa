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

function EditItemConsulta(props) {
  const classes = useStyles();
  const onClose = props.onClose;
  const open = props.open;
  const cardEditItem = useSelector(store => store.cardEditItem);
  const originalCardEditItem = useSelector(store => store.copyCardEditItem);
  const onCancel = props.onCancel;
  const dispatch = useDispatch();
  //const [type,setType] = React.useState('quantity');
  const [disabledPrice,setDisabledPrice] =  React.useState(true);

  const handleClose = () => {
     onClose(cardEditItem);
  }

  const handleCancel = () => {
     dispatch(actions.modifyItemConsulta({...originalCardEditItem}));
     onClose(cardEditItem);
  }


  const  updateData = (quantity, quantityPrice,type) => { 
  	       //setType(type);
  	       const cantidad = (quantity == "" || quantity == "." ? 0 : parseFloat(quantity));
  	       const precioVenta = (quantityPrice == "" || quantityPrice == "." ? 0 : parseFloat(quantityPrice));
  	       dispatch(actions.modifyItemConsulta({...cardEditItem, "cantidad" : cantidad, "precioVenta": precioVenta}));
  	     }
   
  return (

    <Dialog onClose={handleClose} open={open}>

        <Box margin={2} >
          <Box >  
              <CardEditItem data={cardEditItem} />  
          </Box>
          <Box >               
             <Box width={490}>
                <Grid container  >


                    <Grid item xs={9}>
                       <Calculator type='quantity' quantity={"" + cardEditItem.cantidad} quantityPrice={"" + cardEditItem.precioVenta} updateData={ (quantity, quantityPrice, type) => {
                        
                        updateData(quantity, quantityPrice,type);
                       }} /> 

                    </Grid>
                    <Grid item xs={3}>
    
                           <Box spacing={2}>
                              <Button variant="outlined" className={classes.tecla} startIcon={ <Icon>check_circle_icon</Icon> } 
                                           onClick={(e) => {
                                              dispatch(actions.modifyListItemConsulta(cardEditItem));
                                              handleClose();
                                              e.stopPropagation();
                                           }}
                                         > 
                                         Aceptar
                           </Button>                       
                           <Button variant="outlined" className={classes.tecla} color="primary" startIcon={ <Icon>cancel</Icon> } 
                                 onClick={(e) => {
                                    handleCancel();
                                    e.stopPropagation();
                                 }}
                               > 
                               Cancelar
                           </Button> 
                         </Box>              
                    </Grid>

                </Grid> 
             </Box>
             

                 
 


           

          </Box>      
        </Box>
    </Dialog>
  );
}

export default EditItemConsulta;
