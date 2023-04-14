
import { FIND_ALL_PRODUCTS_URL } from '../endpoints';
import {
  FIND_ALL_PRODUCT_SUCCESS,
  FIND_ALL_PRODUCT_ERROR,
  FIND_ALL_PRODUCT_PURGE
} from '../types'

export const findAllProductsAction = (data) => {

 
  console.log('findAllProductsAction:',FIND_ALL_PRODUCTS_URL);
  
  return ( dispatch ) => {
    console.log("SE ESTA EJECUTando consulta a BASE DE DATOS")
    if(data === 'PURGE'){
      dispatch( { type: FIND_ALL_PRODUCT_PURGE, payload: 'PURGE'} )
    }else{
      fetch(FIND_ALL_PRODUCTS_URL, {
        method: 'GET',
        headers:  new Headers({'content-type': 'application/json'})
      })
      .then(json => {

          json.json().then((responseJson) => {
            if (json.status === 200) {
              dispatch({ type: FIND_ALL_PRODUCT_SUCCESS, payload: { statusCode: 200, isOk: true, data: responseJson}  })
            }else {
              dispatch({ type: FIND_ALL_PRODUCT_ERROR, payload: responseJson })
            }
          }); 

        })
        .catch(error => {
          const responseError = {
            isOk: false,
            error: error
          }
          console.log('findAllProductsAction: ',responseError);
          dispatch({ type: FIND_ALL_PRODUCT_ERROR, payload: responseError })
        });


    }
  }

}
