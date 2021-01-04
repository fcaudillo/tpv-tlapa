import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import Calculator from '../components/Calculator'
import CardEditItem from '../components/CardEditItem'
import { Button, Box } from '@material-ui/core'
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

});

function EditItemConsulta(props) {
  const onClose = props.onClose;
  const open = props.open;
  const cardEditItem = useSelector(store => store.cardEditItem);
  const dispatch = useDispatch();
  //const [type,setType] = React.useState('quantity');
  const [disabledPrice,setDisabledPrice] =  React.useState(true);

  const handleClose = () => {
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
        <DialogTitle id='simple-dialog-title'>Capture la cantidad deseada </DialogTitle>
        <div>
          <Box width={500}>  
              <CardEditItem data={cardEditItem} />  
          </Box>
          <Box width={300}>  
                 
             <Calculator type='quantity' quantity={"" + cardEditItem.cantidad} quantityPrice={"" + cardEditItem.precioVenta} updateData={ (quantity, quantityPrice, type) => {
             	
             	updateData(quantity, quantityPrice,type);
             }} />  

             <Button variant="contained" color="primary" startIcon={ <Icon>done</Icon> } 
                             onClick={(e) => {
                                dispatch(actions.modifyListItemConsulta(cardEditItem));
                                handleClose();
                                e.stopPropagation();
                             }}
                           > 

             </Button>

          </Box>      
        </div>
    </Dialog>
  );
}

export default EditItemConsulta;
