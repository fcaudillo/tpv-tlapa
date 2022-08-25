import Cookies from 'js-cookie'

import { SEARCH_HISTORICO_PRODUCTO, FIND_CODIGO_INTERNO } from '../endpoints';
import {
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_ERROR,
  LOAD_PRODUCT_PURGE
} from '../types'


const findHistorico = (producto) => {
  console.log("producto")
  console.log(producto)
  return new Promise ( (resolve, reject) => {
        fetch(SEARCH_HISTORICO_PRODUCTO + "/" + producto.proveedorId +"/" + producto.codigoProveedor + "/",{
              method: 'GET',
              headers:  new Headers({'content-type': 'application/json'})
            })
            .then( response => {
               if (response.status == 200) { 
                  response.json().then( (dataHist) => {
                     return resolve({data:producto, dataHistorico: dataHist, isOk: true})
                  })
                  
               }else{
                  return resolve ({data:producto, dataHistorico: {}, isOk: true})
               }

            })
            .catch(error => {
              return resolve ({data:producto, dataHistorico: {}, isOk: true})
            });

        });  

}

export const loadProduct = (data) => {

 
  console.log('RECUEST:',FIND_CODIGO_INTERNO + "/" + data + "/");
  
  return ( dispatch ) => {
    console.log("SE ESTA EJECUTando consulta a BASE DE DATOS")
    if(data === 'PURGE'){
      dispatch( { type: LOAD_PRODUCT_PURGE, payload: 'PURGE'} )
    }else{
      fetch(FIND_CODIGO_INTERNO + "/" + data  + "/", {
        method: 'GET',
        headers:  new Headers({'content-type': 'application/json'})
      })
      .then(response => response.json())
      .then(producto => findHistorico(producto))
      .then(dat => {
          console.log(dat)
          dispatch ({ type: LOAD_PRODUCT_SUCCESS, payload: dat} )
        })
        .catch(error => {
          const responseError = {
            isOk: false,
            error: error
          }
          console.log('loadProduct: ',responseError);
          dispatch({ type: LOAD_PRODUCT_ERROR, payload: responseError })
        });


    }
  }

    


}
