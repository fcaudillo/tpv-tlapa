import { URL_UPLOAD_URL } from '../endpoints'
import { ajax } from 'rxjs/ajax'
import { Subject, BehaviorSubject, fromEvent, debounceTime, filter, map, mergeMap, toArray } from 'rxjs'


import {
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_ERROR,
    SEARCH_PRODUCT_PURGE
} from '../types'

export const SearchProductCategoryAction = (data) => {
     return (dispatch) => {
        console.log(`${URL_UPLOAD_URL}/category/${data}/products`);
        if (data === 'PURGE') {
          dispatch ({type: SEARCH_PRODUCT_PURGE, payload: 'PURGE'})
        }else {
            ajax.get(`${URL_UPLOAD_URL}/category/${data}/products`,
              {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            )
            .pipe(
               map(r  => r.response.products)
            )
            .subscribe (products => {
               console.log('data from Action = ' + products);
               var result = products.map(pr => pr.product);
               dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: result})
             });

        }
    }
}

