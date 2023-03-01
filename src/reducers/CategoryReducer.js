
  import {
    ADD_CATEGORY_TO_CATEGORY_SUCCESS,
    ADD_CATEGORY_TO_CATEGORY_ERROR,
    ADD_CATEGORY_TO_CATEGORY_PURGE
  } from '../bussiness/types'

  const initialState = {
    resultAddCategoryToCategory : {isOk: false},
    resultAddCategoryToCategoryError: {isOk : false},
    resultAddCategoryToCategoryPurge: {isOk : false},
  }
  
 const CategoryReducer = ( state = initialState, action ) => {
    
    switch (action.type){
      case ADD_CATEGORY_TO_CATEGORY_SUCCESS:
        return { ...state, resultAddCategoryToCategory: action.payload, resultAddCategoryToCategoryError: {isOk : false}};
      case ADD_CATEGORY_TO_CATEGORY_ERROR:
        return { ...state, resultAddCategoryToCategoryError: action.payload, resultAddCategoryToCategory : {isOk: false} };
      case ADD_CATEGORY_TO_CATEGORY_PURGE:
        return { ...initialState };
    }
    
    return state;
  }

  export default CategoryReducer;