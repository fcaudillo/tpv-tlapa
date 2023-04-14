import { SEARCH_PRODUCTS } from '../endpoints'
import { ajax } from 'rxjs/ajax'
import { Subject, BehaviorSubject, fromEvent, debounceTime, filter, map, mergeMap, toArray } from 'rxjs'
import Cookies from 'js-cookie'

import {
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_ERROR,
    SEARCH_PRODUCT_PURGE
} from '../types'

export const SearchProductAction = (data,source="") => {
     return (dispatch) => {
        console.log("SearchProductAction");
        if (data === 'PURGE') {
          dispatch ({type: SEARCH_PRODUCT_PURGE, payload: 'PURGE'})
        }else {
            ajax.post(SEARCH_PRODUCTS,
              data,
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
               dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: products, source: source})
             });

        }
    }
}