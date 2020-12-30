import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import Calculator from '../components/Calculator'
import { Button, Box } from '@material-ui/core'

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
       height: 300,
    },

});

function EditItemConsulta() {
  const lista = useSelector(store => store.listaConsulta);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(''); 
  const [quantityPrice, setQuantityPrice] = React.useState(''); 
  const [type,setType] = React.useState('quantity');
  const [disabledPrice,setDisabledPrice] =  React.useState(true);

  const  updateData = (quantity, quantityPrice,type) => { 
  	       setType(type);
  	       setQuantity(quantity);
  	       setQuantityPrice(quantityPrice);
  	     }

  return (
    <div>
      <p> Quantity : {quantity}, Quantity Price : {quantityPrice} Type: {type} </p>
      <Box width={300}>        
         <Calculator type={type} quantity={quantity} quantityPrice={quantityPrice} updateData={ (quantity, quantityPrice, type) => {
         	
         	updateData(quantity, quantityPrice,type);
         }} />  
      </Box>      
    </div>
  );
}

export default EditItemConsulta;
