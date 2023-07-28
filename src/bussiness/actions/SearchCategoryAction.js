import { SEARCH_CATEGORY } from '../endpoints'
import { ajax } from 'rxjs/ajax'
import { Subject, BehaviorSubject, fromEvent, debounceTime, filter, map, mergeMap, toArray } from 'rxjs'
import Cookies from 'js-cookie'

import {
    SEARCH_CATEGORY_SUCCESS,
    SEARCH_CATEGORY_ERROR,
    SEARCH_CATEGORY_PURGE
} from '../types'

export const SearchCategoryAction = (data,sourceCategories="") => {
     return (dispatch) => {
        console.log("SearchProductAction");
        if (data === 'PURGE') {
          dispatch ({type: SEARCH_CATEGORY_PURGE, payload: 'PURGE'})
        }else {
            ajax.post(SEARCH_CATEGORY,
              data,
              {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            )
            .pipe(
               map(
                r  => 
                   r.response)
            )
            .subscribe (categories => {
               console.log('data from Action = ' + categories);
               dispatch({ type: SEARCH_CATEGORY_SUCCESS, payload: categories, sourceCategories: sourceCategories})
             });

        }
    }
}