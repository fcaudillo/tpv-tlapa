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
  

  React.useEffect(() => {
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
        dispatch(SearchProductCategoryAction(globalCodebar.barcode))
        setTabActive("busqueda");
      }
      
    }
    
  },[globalCodebar])

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
        }
      ))
  };

  const onChange = (data) => {
    setValue(data);
  };

  const enviaTest = () => {
    dispatch(actions.modifyGlobalCodebar({"barcode": '100', "date": new Date()}));
  }

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);


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
