
const findItemActivo = (listaConsulta,id) => {
    for (var i = 0; i < listaConsulta.length; i++){
      if (listaConsulta[i].id == id){
          return listaConsulta[i]
      }
    } 
    return None;
}


const reducer = (state,action) => {
    let activo;
    switch (action.type) {
       case 'ADD_ITEM_CONSULTA':
          return {
          	  ...state,
          	  listaConsulta: [...state.listaConsulta, action.payload]
          }
       case 'ACTIVE_ITEM_CONSULTA':    
            activo = findItemActivo(state.listaConsulta,action.payload);  
            activo.active = true;                          
            return {
              ...state,
              cardEditItem : {...activo},
              listaConsulta: state.listaConsulta.map(item => {
                                                       item.active =  (item.id == action.payload ? true: false);
                                                       return item; })
          }  
       case 'MODIFY_LISTA_CONSULTA':
          return {
             ...state,
             listaConsulta: state.listaConsulta.map(item => {
                                                     return (item.id == action.payload.id ? action.payload: item);
                                                     })            
          } 
       case 'MODIFY_ITEM_CONSULTA':
          return {
            ...state,
            cardEditItem: {...action.payload}
          }       
       default:   
          return state;

    }
	
}

export default reducer;
