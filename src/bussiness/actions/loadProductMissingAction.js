import {  URL_PRODUCT_MISSING } from '../endpoints';
import {
  LOAD_MISSING_PRODUCT_SUCCESS,
  LOAD_MISSING_PRODUCT_ERROR,
  LOAD_MISSING_PRODUCT_PURGE
} from '../types'



export const loadProductMissing = (data, instanceDialog) => {

 
  console.log('RECUEST:',URL_PRODUCT_MISSING + "?sku=" + data );
  
  return ( dispatch ) => {
    console.log("SE ESTA EJECUTando consulta a BASE DE DATOS")
    if(data === 'PURGE'){
      dispatch( { type: LOAD_MISSING_PRODUCT_PURGE, payload: 'PURGE'} )
    }else{
      fetch(URL_PRODUCT_MISSING + "?sku=" + data , {
        method: 'GET',
        headers:  new Headers({'content-type': 'application/json'})
      })
      .then(response => response.json())
      .then(dat => {
          console.log(dat.items)
          var data = {}
          if (dat.items.length > 0){
            data = dat.items[0];
          }
          dispatch ({ type: LOAD_MISSING_PRODUCT_SUCCESS, payload: {data, instanceDialog} } )
        })
        .catch(error => {
          const responseError = {
            isOk: false,
            error: error
          }
          console.log('loadProductMissing: ',responseError);
          dispatch({ type: LOAD_MISSING_PRODUCT_ERROR, payload: responseError })
        });


    }
  }

    


}
