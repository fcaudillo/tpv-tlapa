import {
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_ERROR,
    UPDATE_PRODUCT_PURGE
  } from '../bussiness/types'

  const initialState = {
    resultUpdate : {isOk: false},
    resultUpdateError: {isOk : false},
  }
  
 const UpdateProductReducer = ( state = initialState, action ) => {
    
    switch (action.type){
      case UPDATE_PRODUCT_SUCCESS:
        return { ...state, resultUpdate: action.payload };
      case UPDATE_PRODUCT_ERROR:
        return { ...state, resultUpdateError: action.payload };
      case UPDATE_PRODUCT_PURGE:
        return { ...initialState, updateDataProductPurge: action.payload };
    }
    
    return state;
  }

  export default UpdateProductReducer;