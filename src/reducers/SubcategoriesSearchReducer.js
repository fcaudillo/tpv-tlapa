
  import {
    SEARCH_SUBCATEGORIES_SUCCESS,
    SEARCH_SUBCATEGORIES_ERROR,
    SEARCH_SUBCATEGORIES_PURGE
  } from '../bussiness/types'

  const initialState = {
    resultSubcategories : {isOk: false},
    resultSubcategoriesError: {isOk : false},
    resultSubcategoriesPurge: {isOk : false},
  }
  
 const SubcategoriesSearchReducer = ( state = initialState, action ) => {
    
    switch (action.type){
      case SEARCH_SUBCATEGORIES_SUCCESS:
        return { ...state, resultSubcategories: action.payload , resultSubcategoriesError: {isOk : false}};
      case SEARCH_SUBCATEGORIES_ERROR:
        return { ...state, resultSubcategoriesError: action.payload };
      case SEARCH_SUBCATEGORIES_PURGE:
        return { ...initialState };
    }
    
    return state;
  }

  export default SubcategoriesSearchReducer;