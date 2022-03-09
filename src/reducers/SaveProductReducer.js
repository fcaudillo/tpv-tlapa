import {
    SAVE_PRODUCT_SUCCESS,
    SAVE_PRODUCT_ERROR,
    SAVE_PRODUCT_PURGE
  } from '../bussiness/types'

  const initialState = {
    resultSave : {isOk: false},
    resultSaveError: {isOk : false},
  }
  
 const SaveProductReducer = ( state = initialState, action ) => {
    
    switch (action.type){
      case SAVE_PRODUCT_SUCCESS:
        return { resultSave: action.payload };
      case SAVE_PRODUCT_ERROR:
        return { resultSaveError: action.payload };
      case SAVE_PRODUCT_PURGE:
        return { ...initialState, saveProductPurge: action.payload };
    }
    
    return state;
  }

  export default SaveProductReducer;