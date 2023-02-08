import {
    CHANGE_TAB_ACTION
  } from '../bussiness/types'

  const stateTab = {
 }

 const ChangeTabReducer = ( state = stateTab, action ) => {
    
    switch (action.type){
      case CHANGE_TAB_ACTION:
        var result = { ...state,  ...action.payload }
        return { ...state,  ...action.payload };
    }
    
    return state;
  }

  export default ChangeTabReducer;