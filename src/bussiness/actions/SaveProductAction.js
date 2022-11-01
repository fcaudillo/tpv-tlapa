import Cookies from 'js-cookie'

import { SAVE_PRODUCT_URL } from '../endpoints';
import {
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_ERROR,
  SAVE_PRODUCT_PURGE
} from '../types'

export const SaveProductAction = (data) => {

  const config={
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    }

  console.log('SAVE Product :',SAVE_PRODUCT_URL, config);
  
  return ( dispatch ) => {
    console.log("SE ESTA EJECUTando SALAVAR a BASE DE DATOS")
    if(data ===  'PURGE'){
      dispatch( { type: SAVE_PRODUCT_PURGE, payload: 'PURGE'} )
    }else{
      var statusCode = 0
      fetch( SAVE_PRODUCT_URL, config )
      //.then(response => response.json())
      .then(res => {
          statusCode = res.status
          return res.json()
        })
      .then(resp => {
            console.log("Actualizo con exito")
            console.log(statusCode)
            if (statusCode == 200){
              dispatch({ type: SAVE_PRODUCT_SUCCESS, payload: { statusCode: 200, isOk: true, folio: resp.folio}  })
            }else if (statusCode == 404) {
              // el registro esta duplicado
              dispatch({ type: SAVE_PRODUCT_ERROR, payload: {errorCode : '404', isOk : true} })
            }else {
              dispatch({ type: SAVE_PRODUCT_ERROR, payload: {errorCode : resp.status, isOk : true} })
            }

        })
        .catch(error => {
          const responseError = {
            isOK: false,
            error: error
          }
          console.log('loadProduct: ',responseError);
          dispatch({ type: SAVE_PRODUCT_ERROR, payload: responseError })
        });


    }
  }

    


}

