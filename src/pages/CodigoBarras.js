import React, { useState, useRef } from 'react';
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
import FormProduct from './FormProduct'
import {loadProduct} from '../bussiness/actions/loadProduct'
import { loadProductMissing } from '../bussiness/actions/loadProductMissingAction'
import { Modal, Form } from 'antd'
import ProductMissing from './ProductMissing';

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
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const resultUdateProduct = useSelector(store => store.updateProduct)
  const INSTANCE_PRODUCT_MISSING = 'instanceCodigoBarras';
  
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



  const classes = useStyles();

  const openEditCalculator = () => {
     setIsOpen(true);
  }
  const closeEditCalculator = (value) => {
    setIsOpen(false);
  }

  React.useEffect( () => {
    if (resultUdateProduct && 'resultUpdate' in resultUdateProduct && resultUdateProduct.resultUpdate.isOk === true) {
      setVisible(false); 
    }
  },[resultUdateProduct])

  const editarProducto = (codigo) => {
    console.log("Nuevo editar producto ABC  ")
    dispatch(loadProduct('PURGE'))
    dispatch(loadProduct(codigo))
    setVisible(true); 
  }

  const editarProductoMissing = (codigo) => {
    console.log("Editar producto missing")
    dispatch(loadProductMissing('PURGE'))
    dispatch(loadProductMissing(codigo,INSTANCE_PRODUCT_MISSING))
  }

  const listElements = lista.map((prod) =>
  <Grid item xs={12} key={prod.id}>
    <Producto key={prod.id} data={prod} edit={editarProducto}  editProductMissing={editarProductoMissing}  />  
  </Grid>
  );

  const actualizarProducto = () => {
    console.log("llamando actionFormProduct con update")
    form.submit()
    console.log("fin ")
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

      <Modal
            title="Actualizar producto"
            centered
            visible={visible}
            onOk={() => actualizarProducto()}
            onCancel={() => setVisible(false)}
            width={1000}
          >
          
            <FormProduct formInstance={form}  hideModal={ () => setVisible(false)}  />
         </Modal>
         <ProductMissing instanceDialog = { INSTANCE_PRODUCT_MISSING} />
         
    </div>
  );
}


export default CodigoBarras;
