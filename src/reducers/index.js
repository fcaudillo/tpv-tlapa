
const reducer = (state,action) => {
    switch (action.type) {
       case 'ADD_ITEM_CONSULTA':
          return {
          	  ...state,
          	  listaConsulta: [...state.listaConsulta, action.payload]
          }
       case 'ACTIVE_ITEM_CONSULTA':                                      
            return {
              ...state,
              listaConsulta: state.listaConsulta.map(item => {
                                                       item.active =  (item.id == action.payload ? true: false);
                                                       return item; })
          }
       case 'MODIFY_QUANTITY_CALCULATOR':
          return {
             ...state,
             calculator: {...state.calculator, "cantidad": action.payload},
          }  
       case 'MODIFY_TYPE_CALCULATOR':  
          return {
             ...state,
             calculator: {...state.calculator, "type": action.payload},
          }         
       default:   
          return state;

    }
	
}

export default reducer;
