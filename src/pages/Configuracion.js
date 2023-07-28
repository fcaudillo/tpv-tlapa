import React, { Component, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
import { TextField, Grid, Icon, FormControl, Input, FormHelperText } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'
import * as funcs from '../bussiness'
import * as actions from '../actions'
import './styles/SearchProducts.css'
import { ApplicationContext }  from '../Context'
import { TrendingUpOutlined } from '@mui/icons-material';
import  { SearchText } from '../ComponentsHtml/SearchText/SearchText';
import { Subject, BehaviorSubject, fromEvent, debounceTime, filter, map, mergeMap, toArray } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { SearchProductAction  } from '../bussiness/actions/SearchProductAction';
import { SearchCategoryAction } from '../bussiness/actions/SearchCategoryAction';
import { SEARCH_PRODUCT_SUCCESS } from '../bussiness/types';

const useStyles = makeStyles({
  div: {
    overflowY: 'scroll',
    height: "68vh"
  },
});

const Configuracion = (props) => {
  const classes = useStyles();
  const value = useContext(ApplicationContext);
  const { parametros, setParametros } = value;
  const [isCheckedButtonsPrice, setIsCheckedButtonsPrice] = useState(parametros["TABLE_PRICE_BUTTONS"] == "false" ? false : true);
  const searchProduct = useSelector(store => store.searchProduct);
  const searchCategory = useSelector(store => store.searchCategory);

  const {products, source, category}  = searchProduct
  const [productsSearch, setProductsSearch] = useState([]);
  const { categoriesSearch, sourceCategories } = searchCategory
  const [categoriesSearchText, setCategoriesSearchText] = useState([])
  const dispatch = useDispatch();
  const textSearch = React.useRef(new BehaviorSubject(""));
  const sourceScreen = "ScreenConfiguracion";
  const findAllProduct = useSelector(store => store.findAllProduct);
  const [allProducts, setAllProducts] = React.useState([]);
  const [productsNormalize, setProductsNormalize] = React.useState({});

  React.useEffect(async () => {

      textSearch.current.asObservable()
        .pipe (
          debounceTime(500),
          filter( data => data.length > 3)
        ).subscribe( text => {
            console.log("Buscando en base de datos : " + text);
            dispatch(SearchProductAction(
              {
                type: "DESCRIPTION",
                description: text,
                page: 1,
                sizePage: 20
              },sourceScreen
            ))

            dispatch(SearchCategoryAction(
              {
                textSearch: text,
                page: 1,
                sizePage: 20
              },sourceScreen
            ))
          /*
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
            */
      });
 
  },[])

  React.useEffect( () => {

    if (findAllProduct && 'resultAllProducts' in findAllProduct && findAllProduct.resultAllProducts.isOk == true){
      setAllProducts(findAllProduct.resultAllProducts.data);
      setProductsNormalize(findAllProduct.resultAllProducts.mapProducts)
    }


  },[findAllProduct])


  React.useEffect(() => {
    if (products != null && source === sourceScreen) {
        setProductsSearch(products);
    }

  },[products])

  React.useEffect( () => {
    if (categoriesSearch != null && sourceCategories === sourceScreen){
      setCategoriesSearchText(categoriesSearch);
    }

  },[categoriesSearch])

  const changeParameter = () => {
        console.log("cambiando el parametro  TABLE_PRICE_BUTTONS : " + parametros["TABLE_PRICE_BUTTONS"])
        parametros["TABLE_PRICE_BUTTONS"] = parametros["TABLE_PRICE_BUTTONS"] == "false" ? "true" : "false";
        console.log("cambiando el parametro  TABLE_PRICE_BUTTONS : " + parametros["TABLE_PRICE_BUTTONS"])
        setParametros({...parametros});
        setIsCheckedButtonsPrice (parametros["TABLE_PRICE_BUTTONS"] == "false" ? false : true);
        console.log("Por el valor de: " + parametros["TABLE_PRICE_BUTTONS"])
  }

  const onChangeTextSearch = (text) => {

 
      textSearch.current.next(text);




  }

  const onSelectSearch = (data) => {

      if ('category' in data) {
          console.log ("Categoria seleccionada ")
          dispatch(actions.modifyGlobalCodebar({"barcode": data.category.key, "qty": 1, "date": new Date()}));

      }else if ('products' in data ) {
          console.log("Productos seleccionados")
          console.log(data.products)
          dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: data.products, source : "ScreenSearchProducts", category: null});
 
      }else if ('sku' in data) {
         allProducts[productsNormalize[data.sku]]
         var products = [ allProducts[productsNormalize[data.sku]] ]
         dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: products, source : "ScreenSearchProducts", category: null});
             
      }else if ('barcode' in data) {
         allProducts[productsNormalize[data.sku]]
         var products = [ allProducts[productsNormalize[data.barcode]] ]
         dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: products, source : "ScreenSearchProducts", category: null});

      }

  }

  return (
    <div style={{height: "500px"}}>
      <div >
              <SearchText products={productsSearch} categories={categoriesSearchText} onChange={onChangeTextSearch} onSelect={onSelectSearch} />
      </div>
      <div class="container mt-4 row">
          <div class="col-4">
              <label>Habilitar/deshabilitar botones priceTable</label>
          </div>
          <div class="col-2"></div>
          <div class="col-4">
              <div class="form-check form-switch mt-4">
                
                <input class="form-check-input" type="checkbox" id="mySwitch" checked={isCheckedButtonsPrice} onChange={ () => changeParameter()} />
              </div>

          </div>
          
      </div>
    </div>
  );
}

export default Configuracion;
