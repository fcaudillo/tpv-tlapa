import {
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_ERROR,
  SEARCH_PRODUCT_PURGE
} from '../bussiness/types'


  const initialState = {
     products : [],
     category : null,
     source: '',
     productsError: {},
  }
  
 const SearchProductReducer = ( state = initialState, action ) => {
    
    switch (action.type){
      case SEARCH_PRODUCT_SUCCESS:
        return {...state, products: action.payload, source: action.source, category: action.category };
      case SEARCH_PRODUCT_ERROR:
        return {...state, productsError: action.payload, category: null,  source: action.source };
      case SEARCH_PRODUCT_PURGE:
        return { ...initialState, productsPurge: action.payload };
    }
    
    return state;
  }

  export default SearchProductReducer;