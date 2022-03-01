import {
    LOAD_PRODUCT_SUCCESS,
    LOAD_PRODUCT_ERROR,
    LOAD_PRODUCT_PURGE
  } from '../bussiness/types'

  const stateEditProduct = {
     data:{},
     dataHistorico:{},
     isOk: false
  }
  
 const LoadProductReducer = ( state = stateEditProduct, action ) => {
    
    switch (action.type){
      case LOAD_PRODUCT_SUCCESS:
        return { ...state, data: action.payload.data, dataHistorico: action.payload.dataHistorico, isOk: action.payload.isOk };
      case LOAD_PRODUCT_ERROR:
        return { ...state, updateDataProductError: action.payload };
      case LOAD_PRODUCT_PURGE:
        return { ...stateEditProduct, updateDataProductPurge: action.payload };
    }
    
    return state;
  }

  export default LoadProductReducer;