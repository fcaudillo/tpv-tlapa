import React, { Component, useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ApplicationContext } from '../Context';
import Cookies from 'js-cookie'
import { TextField, Grid, Icon, FormControl, Input, FormHelperText } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { Modal, Button, Form } from 'antd';
import { Table, Tag, Space } from 'antd';
import FormProduct from './FormProduct';
import { useDispatch, useSelector } from 'react-redux'
import {loadProduct} from '../bussiness/actions/loadProduct'
import { loadProductMissing } from '../bussiness/actions/loadProductMissingAction'
import ProductoSearch from '../components/ProductoSearch'
import ProductMissing from './ProductMissing';

const useStyles = makeStyles({
  divSearchProducts: {
    overflowY: 'scroll',
    height: "68vh"
  },
});

const SearchProducts = (props) => {
  const classes = useStyles();
  const value = useContext(ApplicationContext);
  const [visible, setVisible] = React.useState(false);
  const resultUdateProduct = useSelector(store => store.updateProduct)
  const dispatch = useDispatch()
  const searchProduct = useSelector(store => store.searchProduct);
  const { products } = searchProduct
  const [form] = Form.useForm()
  const INSTANCE_PRODUCT_MISSING = 'instanceSearchProduct';
   
  
  React.useEffect( () => {
     console.log(products); 

  },[products])

  React.useEffect( () => {
    if (resultUdateProduct && 'resultUpdate' in resultUdateProduct && resultUdateProduct.resultUpdate.isOk === true) {
      setVisible(false); 
    }
  },[resultUdateProduct])


  const editarProducto = (codigo) => {
    console.log("Nuevo editar producto new implementation 2")
    dispatch(loadProduct('PURGE'))
    dispatch(loadProduct(codigo))
    setVisible(true); 
  }

  const editarProductoMissing = (codigo) => {
    console.log("Editar producto missing")
    dispatch(loadProductMissing('PURGE'))
    dispatch(loadProductMissing(codigo, INSTANCE_PRODUCT_MISSING))
  }

 
 const actualizarProducto = () => {
   console.log("llamando actionFormProduct con update")
   form.submit()
   console.log("fin ")
 }


  return (
    <div>
         <Grid container spacing={1}>
           
           <Grid item xs={12}>
               <div className={classes.divSearchProducts}>
                   {
                      products.map( (prod) => <ProductoSearch  key={prod.codigoInterno} data={prod} edit={editarProducto} editProductMissing={editarProductoMissing} />)
                   }
                  <p></p>
               </div>
           </Grid>

         </Grid>
        
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

export default SearchProducts;
