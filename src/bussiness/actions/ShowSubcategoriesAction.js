import { SEARCH_PRODUCTS } from '../endpoints'
import { ajax } from 'rxjs/ajax'
import { Subject, BehaviorSubject, fromEvent, debounceTime, filter, map, mergeMap, toArray } from 'rxjs'
import Cookies from 'js-cookie'

import {
    SHOW_SUBCATEGORIES_SUCCESS,
    SHOW_SUBCATEGORIES_ERROR,
    SHOW_SUBCATEGORIES_PURGE
} from '../types'

export const ShowSubcategoresAction = (data, originCategory, source="") => {

     return (dispatch) => {

               dispatch({ type: SHOW_SUBCATEGORIES_SUCCESS, payload: data, source: source, originCategory})

      }

}