
const reducer = (state,action) => {
    switch (action.type) {
       case 'ADD_ITEM_CONSULTA':
          return {
          	  ...state,
          	  listaConsulta: [...state.listaConsulta, action.payload]
          }
       default:   
          return state;
    }
	
}

export default reducer;
