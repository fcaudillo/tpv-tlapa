
  import {
    FIND_ALL_CATEGORIES_SUCCESS,
    FIND_ALL_CATEGORIES_ERROR,
    FIND_ALL_CATEGORIES_PURGE
  } from '../bussiness/types'

  const initialState = {
    resultAllCategories : {isOk: false},
    resultAllCategoriesError: {isOk : false},
    resultAllCategoriesPurge: {isOk : false},
  }
  
 const FindAllCategoriesReducer = ( state = initialState, action ) => {
    
    switch (action.type){
      case FIND_ALL_CATEGORIES_SUCCESS:
        if ('payload' in action && 'data' in action.payload) {
            var mapCategories = {}
            action.payload.data.forEach( (value, idx) => {
                //mapCategories[value.id] = idx;
                value["categoryId"] = value.id;
                if (value.key != null && value.key != ""){
                    mapCategories[value.key] = idx;
                }
                
            });
            action.payload['mapCategories'] = mapCategories;

        }
        return { ...state, resultAllCategories: action.payload , resultAllCategoriesError: {isOk : false}};
      case FIND_ALL_CATEGORIES_ERROR:
        return { ...state, resultAllCategoriesError: action.payload };
      case FIND_ALL_CATEGORIES_PURGE:
        return { ...initialState };
    }
    
    return state;
  }

  export default FindAllCategoriesReducer;