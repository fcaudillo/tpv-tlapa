import Cookies from 'js-cookie'

import { UPDATE_PRODUCT_URL } from '../endpoints';
import {
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_PURGE
} from '../types'

export const UpdateProductAction = (data) => {
 
  const config={
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(data)
    }

  console.log('Update Product :',UPDATE_PRODUCT_URL, config);
  
  return ( dispatch ) => {
    console.log("SE ESTA EJECUTando consulta a BASE DE DATOS")
    if(data === 'PURGE'){
      dispatch( { type: UPDATE_PRODUCT_PURGE, payload: 'PURGE'} )
    }else{
      fetch( UPDATE_PRODUCT_URL, config )
      //.then(response => response.json())
      .then(resp => {
            console.log("Actualizo con exito")
            if (resp.status == 200){
              dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: { statusCode: 200, isOk: true}  })
            }else {
              dispatch({ type: UPDATE_PRODUCT_ERROR, payload: {errorCode : resp.status, isOk : false} })
            }
            

        })
        .catch(error => {
          const responseError = {
            isOK: false,
            error: error
          }
          console.log('loadProduct: ',responseError);
          dispatch({ type: UPDATE_PRODUCT_ERROR, payload: responseError })
        });


    }
  }

    


}

