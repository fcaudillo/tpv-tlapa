import React, {useState, useRef} from 'react';
import { Box, Grid } from '@mui/material'
import Navbar from './Navbar';
import TicketScreen from '../components/TicketScreen'
import { Link } from 'react-router-dom';
import { Form , Modal, Button } from 'antd'
import { useDispatch } from 'react-redux';
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
import SearchProducts from '../pages/SearchProducts'
import Busqueda from '../pages/Busqueda'
import { Subject, BehaviorSubject, fromEvent, debounceTime, filter, map, mergeMap, toArray } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { SearchProductAction  } from '../bussiness/actions/SearchProductAction';
import 'antd/dist/antd.css';

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

  React.useEffect(() => {
    // subscribe to 
    textSearch.current.asObservable()
          .pipe (
            debounceTime(500),
            filter( data => data.length > 3)
          ).subscribe( text => {
            
            ajax.post('http://localhost:8080/product/search/autocomplete',
                       {textSearch: text, maxOccurrences: 15},
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
          sizePage: 15
        }
      ))
  };

  const onChange = (data) => {
    setValue(data);
  };


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
              <Grid item xs={12}>
              <div class="btn-group">
                  <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    Producto
                  </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" onClick = {() => showCrearProducto() }>Crear producto</a></li>
                    <li>
                      <Link className="dropdown-item" to="/puntoventa/listacambioprecio">
                        Cambio de precios
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/puntoventa/ventadiaria">
                         Productos vendidos
                      </Link> 
                    </li>
                    <li><hr class="dropdown-divider"></hr></li>
                    <li>
                       <Link className="dropdown-item" to="/">
                        Punto de venta
                      </Link>
                    </li>
                  </ul>
              </div>
               <div>

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
               </div>


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
