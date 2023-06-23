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
import * as funcs from '../bussiness'
import { SearchProductCategoryAction } from '../bussiness/actions/SearchProductCategoryAction'
import * as actions from '../actions'
import './styles/SearchProducts.css'
import { Accordion } from 'react-bootstrap';
import { data } from 'jquery';
import { SEARCH_PRODUCT_SUCCESS } from '../bussiness/types';
import { TablePrice } from '../ComponentsHtml/TablePrice/TablePrice';
import { AirlineSeatReclineExtra } from '@mui/icons-material';

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
  //const [ products, setProducts] = React.useState(searchProduct.products != null ? searchProduct.products : []);
  const {products, source, category}  = searchProduct
  const [form] = Form.useForm()
  const INSTANCE_PRODUCT_MISSING = 'instanceSearchProduct';
  const [categories, setCategories] = React.useState([]);
  const categoryRef = useRef();
  const [arbol, setArbol] = React.useState([]);
  const subcategoriesSearch = useSelector(store => store.subcategoriesSearch);
  const updateGlobalProduct = useSelector(store => store.updateGlobalProduct);
  const [categoriesNivel1, setCategoriesNivel1] = React.useState([]);
  const [ dataAccordion, setDataAccordion ] = React.useState([]);
  const [ activeCategory, setActiveCategory] = React.useState({});
  const [ metadataBody, setMetadataBody] = React.useState([]); 
  const [ headers, setHeaders] = React.useState([]);

  const [activeKeys, setActiveKeys] = React.useState([]);
  const handleSelect = (eventKey) => setActiveKeys(eventKey);
  const handleToggleClick = () => {
     const index = activeKeys.indexOf(dataAccordion[0].id);
    if (index > -1) {
      activeKeys.splice(index, 1);
      setActiveKeys([...activeKeys]);
    } else {
      setActiveKeys(activeKeys.concat(dataAccordion[0].id));
    }
  }
  const handleCollapseClick = () => {
    setActiveKeys([]);
  }  
  
  React.useEffect(async () => {
    var categories = await funcs.findByCategories();
    setCategories(categories);
  },[])

  React.useEffect(() => {

    if (subcategoriesSearch && 'resultSubcategories' in subcategoriesSearch
                            && 'data' in subcategoriesSearch.resultSubcategories
                            && subcategoriesSearch.resultSubcategories.isOk == true) {
      var root = subcategoriesSearch.resultSubcategories.data;
      //setParents(root[0]);
      setArbol(root)
      setCategoriesNivel1(root ? root[0].categories: []);
      
    }
 
 
  },[subcategoriesSearch])
  
  React.useEffect( () => {
     console.log(products); 
     if (source && source == "autocomplete") {
        setActiveKeys([]);      
     }
     if (category != null) {
        if (category.body && category.body != "") {
            setMetadataBody( JSON.parse(category.body) );
        }
    
        if (category.headers && category.headers != "") {
            setHeaders(JSON.parse(category.headers))
        }

        setActiveCategory(category);

     }

  },[products,source, category])

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
   onChangeCategory();
   console.log("fin ")
 }

 const onChangeCategory = () => {
    if (categoryRef.current != null && categoryRef.current.value != null){
      dispatch(actions.modifyGlobalCodebar({"barcode": categoryRef.current.value, "qty": 1, "date": new Date()}));
      //Tambien funciona con este, pero no utiliza lo que esta en memoria.
      //dispatch(SearchProductCategoryAction(categoryRef.current.value))
    }

  }

  const changeNav = (cat) => {
    setDataAccordion(cat.categories);
    dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: []});
    setActiveKeys([]);
  }

  const changeSubcategoty = (cat) => {
    dispatch(actions.modifyGlobalCodebar({"barcode": cat.key, "qty": 1, "date": new Date()}));
 /*
    if (cat.key == "146"){
      alert(cat.body)
      alert(cat.headers)
    }
  
    if (cat.body && cat.body != "") {
       setMetadataBody( JSON.parse(cat.body) );
    }

    if (cat.headers && cat.headers != "") {
       setHeaders(JSON.parse(cat.headers))
    }

    */
    setActiveCategory(cat);
      
  }

  React.useEffect(  () => {
    //Cuando actualize un precio, se vuelvea setear el arreglo de productos, con el cambio de precio cambiado
    if (updateGlobalProduct && 'resultUpdate' in updateGlobalProduct
        && 'data' in updateGlobalProduct.resultUpdate 
        && updateGlobalProduct.resultUpdate.isOk == true){
          
          products.forEach( product => {
              if (product.codigoInterno == updateGlobalProduct.resultUpdate.data.codigoInterno) {
                product.precioVenta = updateGlobalProduct.resultUpdate.data.precioVenta;
              }
          });

          dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: [...products]}) 
    }

  },[updateGlobalProduct])

  /** Temporal */


  return (
    <div>
         <Grid container spacing={1}>

           <Grid item xs={12}>

              <nav id="navCategories">
                 <ul>
                    
                    {
                      categoriesNivel1.map ((cat) => <li> <a  onClick={() => changeNav(cat)} key="{cat.id}" href='#'> {cat.name} </a></li> )
                    
                    }                    


                 </ul>
                
                
              </nav> 
  

           </Grid>
           <Grid item xs={3}>
 
              <div className="flex" style={{ minWidth: "40%" }}>
                  <Accordion alwaysOpen activeKey={activeKeys} onSelect={handleSelect}>
                    {
                          dataAccordion.map (
                              (cat) =>
                                <Accordion.Item eventKey={cat.id}>
                                  <Accordion.Header>{cat.name}</Accordion.Header>
                                  <Accordion.Body>
                                      <ul>
                                        {
                                          cat.categories.map( (subcat) => 
                                            <li> <a class="subcategory" onClick={() => changeSubcategoty(subcat)} key={'sucat' + subcat.id} href='#'> {subcat.name} </a></li>

                                          )
                                        }
                                      </ul>
                                  </Accordion.Body>
                                </Accordion.Item>
                          )
                    }
                  </Accordion>
                  {/* 
                  <div className="mt-5 d-flex justify-content-between">
                    <Button onClick={handleToggleClick} >Toggle First</Button>
                    <Button onClick={handleCollapseClick}>Collapse All</Button>
                  </div> */}
                </div >        

           </Grid>
           <Grid item xs={9}>
               <div className={classes.divSearchProducts}>
                   {
                      activeCategory && activeCategory.body != null && activeCategory.body != ""  ?
                          <TablePrice  headersProps={headers} dataProps={products} metadataBodyProps={metadataBody} edit={editarProducto} editProductMissing={editarProductoMissing}  />
                       :
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
