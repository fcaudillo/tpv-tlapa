import React, {useState, useRef} from 'react';
import { Box, Grid } from '@mui/material'
import Navbar from './Navbar';
import TicketScreen from '../components/TicketScreen'
import { Link } from 'react-router-dom';
import { Form , Modal, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { SaveProductAction } from '../bussiness/actions/SaveProductAction'
import  FormProduct  from '../pages/FormProduct'
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { AutoComplete, Input } from 'antd';
import ScreenLoading  from './ScreenLoading';
import CodigoBarras from '../pages/CodigoBarras';
import ListaCambioPrecio from '../pages/ListaCambioPrecio';
import VentaDiaria from '../pages/VentaDiaria'
import SearchProducts from '../pages/SearchProducts';
import ListProductMissing from '../pages/ListProductMissing'
import ManagmentCategory from '../pages/ManagmentCategory'
import HierarchyCategory from '../pages/HierarchyCategory'
import { SEARCH_AUTOCOMPLETE } from '../bussiness/endpoints'
import { Subject, BehaviorSubject, fromEvent, debounceTime, filter, map, mergeMap, toArray } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { SearchProductAction  } from '../bussiness/actions/SearchProductAction';
import { SearchProductCategoryAction } from '../bussiness/actions/SearchProductCategoryAction';
import 'antd/dist/antd.css';
import * as actions from '../actions'
import { changeTabAction } from '../bussiness/actions/ChangeTabAction'
import { findAllProductsAction } from '../bussiness/actions/FindAllProductAction';
import { findAllCategoriesAction } from '../bussiness/actions/FindAllCategoriesAction';
import { SEARCH_PRODUCT_SUCCESS } from '../bussiness/types';
import * as funcs from '../bussiness'

function Layout(props) {
  const LOADING_CREAR_PRODUCTO = 0
  const dispatch = useDispatch()
  const [ form ] = Form.useForm()
  const [ load, setLoad ] = React.useState(true)
  const [ searchText, setSearchText] = React.useState("")
  const [ loadings, setLoadings ] = React.useState([])
  const [visibleCrearProducto, setVisibleCrearProducto] = React.useState(false)
  const textSearch = React.useRef(new BehaviorSubject(""));
  const [ tabActive, setTabActive ] = React.useState("lector");
  const globalCodebar = useSelector(store => store.reducer.globalCodebar);
  const [allProducts, setAllProducts] = React.useState([]);
  const [productsNormalize, setProductsNormalize] = React.useState({});
  const findAllProduct = useSelector(store => store.findAllProduct);
  const findAllCategories = useSelector(store => store.findAllCategories);
  const [allCategories, setAllCategories] = React.useState([]);
  const [categoriesNormalize, setCategoriesNormalize] = React.useState({});
  const listaTicket = useSelector(store => store.reducer.listaTicket);
  const listaTicketNormalizado = useSelector(store => store.reducer.listaTicketNormalizado);
  const updateGlobalProduct = useSelector(store => store.updateGlobalProduct);

  React.useEffect(() => {

    dispatch(findAllProductsAction());
    dispatch(findAllCategoriesAction());
    dispatch(funcs.findSubcategories("root"));
    // subscribe to 
    textSearch.current.asObservable()
          .pipe (
            debounceTime(500),
            filter( data => data.length > 3)
          ).subscribe( text => {
            
            ajax.post(SEARCH_AUTOCOMPLETE,
                       {textSearch: text, maxOccurrences: 200},
                       { 'Content-Type': 'application/json' })
                       .pipe(
                          map(r  => r.response.aggregations.autocomplete),
                          mergeMap( m => m.buckets),
                          map( e => ({value: e.key}) ),
                          toArray()
                       )
                       .subscribe (data => {
                          setOptions(data);
                          console.log('data = ' + data);
                       });
         });

  },[])

  React.useEffect( () => {

    if ( 'barcode' in globalCodebar) {
      //(globalCodebar.barcode);
      if (globalCodebar.barcode && globalCodebar.barcode.length < 4){

        if ( globalCodebar.barcode in categoriesNormalize ){
          var cat = allCategories[categoriesNormalize[globalCodebar.barcode]];
          var products = cat.products.map ( pr => 
              allProducts[productsNormalize[pr.sku]]
          );
          if (products && products.length > 0){
             dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: products});
             setTabActive("busqueda");
          }
          

        }else{
          dispatch(SearchProductCategoryAction(globalCodebar.barcode))
          setTabActive("busqueda");
        }

        
        
      }else if (globalCodebar.barcode && globalCodebar.barcode.length >= 4){
        var itemProduct = allProducts[productsNormalize[globalCodebar.barcode]];
        if (typeof(itemProduct) == "undefined"){
           return;
        }
        var item = {...itemProduct};
        item.id = guid();
        // Se copia con el fin de homologar a lo que antes se tenia.
        item.codigointerno = item.codigoInterno
        item.barcode = item.codigoBarras
        item.addToTicket = globalCodebar.addToTicket
        item.description = item.descripcion
        item.proveedorId = item.proveedor
        item.cantidad = globalCodebar.qty
        // find de homologacion

        console.log("Item");
        console.log(item);

        if ( 'addLector' in globalCodebar && globalCodebar.addLector == true) {
            dispatch(actions.addItemConsulta(item));
            dispatch(actions.activeItemConsulta(item.id));
        }
				
				//dispatch(actions.modifyGlobalCodebar({"barcode": item.codigointerno, "date": new Date()}));
				console.log("1.addToTicket: " + item.addToTicket)
				console.log(typeof(item.addToTicket))
				if (typeof(item.addToTicket) != "undefined"){
					if (item.addToTicket == 1){
							var productoTicket = listaTicketNormalizado[item.codigointerno];
							console.log("item from codebar lector : " + item.codigointerno)
							console.log(productoTicket)
							if (typeof(productoTicket) == "undefined") {
								dispatch(actions.addItemTicket({...item}));
							}else{
								var itemAModificar = listaTicket[productoTicket.index];
								itemAModificar.cantidad = itemAModificar.cantidad + item.cantidad;
								itemAModificar.total = itemAModificar.cantidad * itemAModificar.precioVenta;
								dispatch(actions.modifyItemTicket({...itemAModificar}));
							}
					}
				}



      }
      
      
    }
    
  },[globalCodebar])

  React.useEffect( () => {

    if (findAllProduct && 'resultAllProducts' in findAllProduct && findAllProduct.resultAllProducts.isOk == true){
      console.log("Todos los productos")
      setAllProducts(findAllProduct.resultAllProducts.data);
      setProductsNormalize(findAllProduct.resultAllProducts.mapProducts)
    }


  },[findAllProduct])

  React.useEffect(  () => {

    if (updateGlobalProduct && 'resultUpdate' in updateGlobalProduct
        && 'data' in updateGlobalProduct.resultUpdate 
        && updateGlobalProduct.resultUpdate.isOk == true){
        var product = updateGlobalProduct.resultUpdate.data;
        var item = allProducts[productsNormalize[product.codigoInterno]];
        if (item != null) {
           //Modificar la posicion del arreglo.
          item.codigoProveedor = product.codigoProveedor
          item.codigoBarras    = product.codigoBarras
          item.descripcion     = product.descripcion
          item.precioCompra    = product.precioCompra
          item.precioVenta     = product.precioVenta
          item.unidadVenta    = product.unidadVenta
          item.existencia     = product.existencia
          item.minimoExistencia = product.minimoExistencia
          item.maximoExistencia = product.maximoExistencia
          item.ubicacion        = product.ubicacion
          item.puedeVenderse    = product.puedeVenderse

        }

    }

  },[updateGlobalProduct])


  React.useEffect( () => {

    if (findAllCategories && 'resultAllCategories' in findAllCategories && findAllCategories.resultAllCategories.isOk == true){
      console.log("Todos los categories")
      console.log(findAllCategories.resultAllCategories.data);
      console.log(findAllCategories.resultAllCategories.mapCategories);
      setAllCategories(findAllCategories.resultAllCategories.data);
      setCategoriesNormalize(findAllCategories.resultAllCategories.mapCategories)
    }


  },[findAllCategories])

  const enterLoading = (index, status) => {
    const newLoadings = [...loadings]
    newLoadings[index] = status
    setLoadings(newLoadings)
  }

  const showCrearProducto = () => {
     dispatch(SaveProductAction("PURGE"))
     setVisibleCrearProducto(true)
     enterLoading(LOADING_CREAR_PRODUCTO,true)
  }

  const crearProducto = () => {
    console.log("Crear el producto desde layaout")
    form.submit();
  }

  const onChangePanel = (key) => {
    setTabActive(key)
    dispatch(changeTabAction( key));
  };

  const onSearch = (dataSearch) => {
    
    textSearch.current.next(dataSearch);
    console.log('on search ' + dataSearch);

    
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
    setTabActive("busqueda");
    dispatch(SearchProductAction(
        {
          type: "DESCRIPTION",
          description: data,
          page: 1,
          sizePage: 200
        },
        "autocomplete"
      ))
  };

  const onChange = (data) => {
    setValue(data);
  };

  const enviaTest = () => {
    dispatch(actions.modifyGlobalCodebar({"barcode": '1414', "date": new Date()}));
  }

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
  }

  return ( 
    <React.Fragment>

      <Navbar />
      <Grid container>

        <Grid item xs={3}>
          <Box>
          		<TicketScreen />
          </Box>

        </Grid>
        <Grid item xs={9}>
          <Grid container>
              <Grid item xs={3}>

              <div class="dropdown">
                  <button type="button" onClick = {() => showCrearProducto() }  class="btn btn-primary dropdown-toggle" >
                    Crear Producto
                  </button>
                  {/*  
                  <button type="button" onClick = {() => enviaTest() }  class="btn btn-primary dropdown-toggle" >
                     Test codigo producto.
                  </button>
                 */}
              </div>
              </Grid>
              <Grid item xs={3}>
               <span>

                <AutoComplete
                  value={value}
                  options={options}
                  style={{
                    width: 200,
                  }}
                  onSelect={onSelect}
                  onSearch={onSearch}
                  onChange={onChange}
                >
                  <Input.Search size="large" placeholder="Buscar productos..." enterButton />
                </AutoComplete>
               </span>
              

              </Grid>
              <Grid item xs={12}>
                  <Tabs activeKey={ tabActive } onChange={onChangePanel}>
                    <TabPane tab="Lector" key="lector">
                       <CodigoBarras  />
                    </TabPane>
                    <TabPane tab="Busqueda" key="busqueda">
                       <SearchProducts  />
                    </TabPane>
                    <TabPane tab="Precios" key="precios">
                      <ListaCambioPrecio />
                    </TabPane>
                    <TabPane tab="Diario" key="diario">
                      <VentaDiaria />
                    </TabPane>
                    <TabPane tab="Comprar" key="compra">
                      <ListProductMissing />
                    </TabPane>
                    <TabPane tab="Categorias" key="prodcate">
                      <ManagmentCategory />
                    </TabPane>
                    <TabPane tab="Jerarquia" key="hierarchy">
                      <HierarchyCategory />
                    </TabPane>
                    
                 </Tabs>
                </Grid>
             
          </Grid>
        </Grid>
      </Grid>

     
      <Modal 
            title="Crear producto"
            centered
            visible={visibleCrearProducto}
            onOk={() => crearProducto()}
            onCancel={() => {
                   setVisibleCrearProducto(false)
                   enterLoading(LOADING_CREAR_PRODUCTO,false)
               }
            }
            width={1000}
          >
          
            <FormProduct formInstance={form}  hideModal={ () => setVisibleCrearProducto(false)} 
             enterLoading={enterLoading}
             mode="Create"  />
      </Modal>
      
    </React.Fragment>
  );
}

export default Layout;
