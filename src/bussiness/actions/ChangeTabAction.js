import {
    CHANGE_TAB_ACTION
  } from '../types'


export const changeTabAction = (key) => {
  
    return ( dispatch ) => {
      console.log("SE ESTA EJECUTando consulta a BASE DE DATOS")
        dispatch( { type: CHANGE_TAB_ACTION, payload: { tab : key }  } )

    }
  
  }
  