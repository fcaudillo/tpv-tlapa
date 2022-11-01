import {
    LOAD_MISSING_PRODUCT_SUCCESS,
    LOAD_MISSING_PRODUCT_ERROR,
    LOAD_MISSING_PRODUCT_PURGE
  } from '../bussiness/types'

  const stateEditProductMissing = {
     data:{},
     isOk: false
  }
  
 const LoadProductMissingReducer = ( state = stateEditProductMissing, action ) => {
    
    switch (action.type){
      case LOAD_MISSING_PRODUCT_SUCCESS:
        return { ...state, data: action.payload.data, isOk: true, instanceDialog: action.payload.instanceDialog };
      case LOAD_MISSING_PRODUCT_ERROR:
        return { ...state, updateDataProductError: action.payload };
      case LOAD_MISSING_PRODUCT_PURGE:
        return { ...stateEditProductMissing, updateDataProductPurge: action.payload };
    }
    
    return state;
  }

  export default LoadProductMissingReducer;