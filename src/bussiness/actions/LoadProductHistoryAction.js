import Cookies from 'js-cookie'

import { SEARCH_HISTORICO_PRODUCTO } from '../endpoints';
import {
  LOAD_PRODUCT_HISTORY_SUCCESS,
  LOAD_PRODUCT_HISTORY_ERROR,
  LOAD_PRODUCT_HISTORY_PURGE
} from '../types'

export const LoadProductHistoryAction = (data) => {

  console.log('RECUEST:',SEARCH_HISTORICO_PRODUCTO);
  
  return ( dispatch ) => {
    console.log("SE ESTA EJECUTando consulta a BASE DE DATOS")
    if(data === 'PURGE'){
      dispatch( { type: LOAD_PRODUCT_HISTORY_PURGE, payload: 'PURGE'} )
    }else{
         fetch(SEARCH_HISTORICO_PRODUCTO + "/" + data.proveedorId +"/" + data.codigoProveedor,{
            headers: {
               'Content-Type': 'application/json'
            }
         })
            .then(response => response.json())
            .then(dataHist => {
                console.log(dataHist)
                const response = {dataHistorico: dataHist, isOk: true}
                dispatch ({ type: LOAD_PRODUCT_HISTORY_SUCCESS, payload: response} )
            })
            .catch(error => {
              const responseError = {
                isOk: false,
                error: error
              }
              console.log('loadProduct: ',responseError);
              dispatch({ type: LOAD_PRODUCT_HISTORY_ERROR, payload: responseError })
            });

    }
  }

    


}
