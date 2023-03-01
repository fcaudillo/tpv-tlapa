import {  SUBCATEGORIES_OF_CATEGORIA_URL } from '../endpoints';
import {
  SEARCH_SUBCATEGORIES_SUCCESS,
  SEARCH_SUBCATEGORIES_ERROR,
  SEARCH_SUBCATEGORIES_PURGE
} from '../types'


export const findSubcategoriesAction = (keyName) => {

  const config={
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "GET"
    }

  console.log('findSubcategories :',`${SUBCATEGORIES_OF_CATEGORIA_URL}/${keyName}`, config);
  
  return ( dispatch ) => {
    
    if(keyName ===  'PURGE'){
      dispatch( { type: SEARCH_SUBCATEGORIES_PURGE, payload: 'PURGE'} )
    }else{
      var statusCode = 0
      fetch( `${SUBCATEGORIES_OF_CATEGORIA_URL}/${keyName}`, config )
      .then(json => {
        json.json().then((responseJson) => {
          if (json.status === 200) {
            dispatch({ type: SEARCH_SUBCATEGORIES_SUCCESS, payload: { statusCode: 200, isOk: true, data: [responseJson]}  })
          }else {
            dispatch({ type: SEARCH_SUBCATEGORIES_ERROR, payload: responseJson })
          }
        }); 
      }).catch(error => {
        dispatch({ type: SEARCH_SUBCATEGORIES_ERROR, payload: {code : 'code01', description:error} })
      });

    }
  }

}



