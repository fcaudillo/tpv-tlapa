import {
    UPDATE_GLOBAL_PRODUCT_SUCCESS
  } from '../bussiness/types'

  const initialState = {
    resultUpdate : {isOk: false},
    resultUpdateError: {isOk : false},
  }
  
 const UpdateGlobalProductReducer = ( state = initialState, action ) => {
    
    switch (action.type){
      case UPDATE_GLOBAL_PRODUCT_SUCCESS:
        return { ...state, resultUpdate: {data: action.payload, isOk : true}};
    }
    
    return state;
  }

  export default UpdateGlobalProductReducer;