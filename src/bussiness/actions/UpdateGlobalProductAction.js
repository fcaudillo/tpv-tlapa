
import {
  UPDATE_GLOBAL_PRODUCT_SUCCESS
} from '../types'

export const UpdateGlobalProductAction = (data) => {
  return ( dispatch ) => {
      dispatch( { type: UPDATE_GLOBAL_PRODUCT_SUCCESS, payload: data} )
  }

}

