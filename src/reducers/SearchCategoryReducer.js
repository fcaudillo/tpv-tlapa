import {
    SEARCH_CATEGORY_SUCCESS,
    SEARCH_CATEGORY_ERROR,
    SEARCH_CATEGORY_PURGE
  } from '../bussiness/types'
  
  
    const initialState = {
       categoriesSearch : [],
       categoriesSearchError: {},
       categoriesSearchPurge: {}
    }
    
   const SearchCategoryReducer = ( state = initialState, action ) => {
      
      switch (action.type){
        case SEARCH_CATEGORY_SUCCESS:
          return {...state, categoriesSearch: action.payload};
        case SEARCH_CATEGORY_ERROR:
          return {...state, categoriesSearchError: action.payload};
        case SEARCH_CATEGORY_PURGE:
          return { ...initialState};
      }
      
      return state;
    }
  
    export default SearchCategoryReducer;