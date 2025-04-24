import {
    SHOW_SUBCATEGORIES_SUCCESS,
    SHOW_SUBCATEGORIES_ERROR,
    SHOW_SUBCATEGORIES_PURGE
  } from '../bussiness/types'

  const initialState = {
    subcategoriesBusqueda : [],
    subcategoriesBusquedaOrigin: {}
 }

 const ShowSubcategoriesReducer = ( state = initialState, action ) => {
    
    switch (action.type){
      case SHOW_SUBCATEGORIES_SUCCESS:
        var result = { ...state, [action.source] : action.payload, [action.source + 'Origin']: action.originCategory }
        return result;
      case SHOW_SUBCATEGORIES_ERROR:
            return {['error' + action.source] : action.payload };
      case SHOW_SUBCATEGORIES_PURGE:
            return { ...initialState };
    }
    
    return state;
  }

  export default ShowSubcategoriesReducer;