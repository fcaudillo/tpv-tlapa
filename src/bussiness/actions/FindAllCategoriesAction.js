
import { FIND_ALL_CATEGORIES_URL } from '../endpoints';
import {
  FIND_ALL_CATEGORIES_SUCCESS,
  FIND_ALL_CATEGORIES_ERROR,
  FIND_ALL_CATEGORIES_PURGE
} from '../types'

export const findAllCategoriesAction = (data) => {

 
  console.log('findAllCategoriesAction:',FIND_ALL_CATEGORIES_URL);
  
  return ( dispatch ) => {
    
    if(data === 'PURGE'){
      dispatch( { type: FIND_ALL_CATEGORIES_PURGE, payload: 'PURGE'} )
    }else{
      fetch(FIND_ALL_CATEGORIES_URL, {
        method: 'GET',
        headers:  new Headers({'content-type': 'application/json'})
      })
      .then(json => {

          json.json().then((responseJson) => {
            if (json.status === 200) {
              dispatch({ type: FIND_ALL_CATEGORIES_SUCCESS, payload: { statusCode: 200, isOk: true, data: responseJson}  })
            }else {
              dispatch({ type: FIND_ALL_CATEGORIES_ERROR, payload: responseJson })
            }
          }); 

        })
        .catch(error => {
          const responseError = {
            isOk: false,
            error: error
          }
          console.log('findAllCategoriesAction: ',responseError);
          dispatch({ type: FIND_ALL_CATEGORIES_ERROR, payload: responseError })
        });


    }
  }

}
