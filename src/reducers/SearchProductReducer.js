import {
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_ERROR,
  SEARCH_PRODUCT_PURGE
} from '../bussiness/types'


  const initialState = {
     products : [],
     source: '',
     productsError: {},
  }
  
 const SearchProductReducer = ( state = initialState, action ) => {
    
    switch (action.type){
      case SEARCH_PRODUCT_SUCCESS:
        return {...state, products: action.payload, source: action.source };
      case SEARCH_PRODUCT_ERROR:
        return {...state, productsError: action.payload, source: action.source };
      case SEARCH_PRODUCT_PURGE:
        return { ...initialState, productsPurge: action.payload };
    }
    
    return state;
  }

  export default SearchProductReducer;