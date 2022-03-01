import Cookies from 'js-cookie'

import { SEARCH_HISTORICO_PRODUCTO, FIND_CODIGO_INTERNO } from '../endpoints';
import {
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_ERROR,
  LOAD_PRODUCT_PURGE
} from '../types'

export const loadProduct = (data) => {

  
  const config={
    method: 'POST',
    body:JSON.stringify(data),
    headers:{'Content-Type':'application/json'}
  };

  console.log('RECUEST:',FIND_CODIGO_INTERNO, config);
  
  return ( dispatch ) => {
    console.log("SE ESTA EJECUTando consulta a BASE DE DATOS")
    if(data === 'PURGE'){
      dispatch( { type: LOAD_PRODUCT_PURGE, payload: 'PURGE'} )
    }else{
      fetch(FIND_CODIGO_INTERNO + "/" + data )
      .then(response => response.json())
      .then(producto => {
         fetch(SEARCH_HISTORICO_PRODUCTO + "/" + producto.proveedorId +"/" + producto.codigoProveedor)
            .then(response => response.json())
            .then(dataHist => {
                console.log(producto)
                console.log(dataHist)
                const response = {data:producto, dataHistorico: dataHist, isOk: true}
                dispatch ({ type: LOAD_PRODUCT_SUCCESS, payload: response} )
            })
            .catch(error => {
              const responseError = {
                isOk: false,
                error: error
              }
              console.log('loadProduct: ',responseError);
              dispatch({ type: LOAD_PRODUCT_ERROR, payload: responseError })
            });

        });


    }
  }

    


}
