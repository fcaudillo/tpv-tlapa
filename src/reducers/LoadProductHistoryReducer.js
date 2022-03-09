import {
    LOAD_PRODUCT_HISTORY_SUCCESS,
    LOAD_PRODUCT_HISTORY_ERROR,
    LOAD_PRODUCT_HISTORY_PURGE
  } from '../bussiness/types'

  const stateEditProductHistory = {
     dataHistorico:{},
     isOk: false
  }
  
 const LoadProductHistoryReducer = ( state = stateEditProductHistory, action ) => {
    
    switch (action.type){
      case LOAD_PRODUCT_HISTORY_SUCCESS:
        return { ...state,  ...action.payload };
      case LOAD_PRODUCT_HISTORY_ERROR:
        return { ...state, dataProductHistoryError: action.payload };
      case LOAD_PRODUCT_HISTORY_PURGE:
        return { ...stateEditProductHistory, dataProductHistoryPurge: action.payload };
    }
    
    return state;
  }

  export default LoadProductHistoryReducer;