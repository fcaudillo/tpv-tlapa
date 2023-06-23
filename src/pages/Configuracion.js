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

  React.useEffect(async () => {
 
  },[])

  const changeParameter = () => {
        console.log("cambiando el parametro  TABLE_PRICE_BUTTONS : " + parametros["TABLE_PRICE_BUTTONS"])
        parametros["TABLE_PRICE_BUTTONS"] = parametros["TABLE_PRICE_BUTTONS"] == "false" ? "true" : "false";
        console.log("cambiando el parametro  TABLE_PRICE_BUTTONS : " + parametros["TABLE_PRICE_BUTTONS"])
        setParametros({...parametros});
        setIsCheckedButtonsPrice (parametros["TABLE_PRICE_BUTTONS"] == "false" ? false : true);
        console.log("Por el valor de: " + parametros["TABLE_PRICE_BUTTONS"])
  }

  const onChangeTextSearch = (text) => {

      console.log("Va a buscar producto = " + text)
  }


  return (
    <div class="container mt-4 row">
        <div class="col-12">
            <SearchText />

        </div>
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
  );
}

export default Configuracion;
