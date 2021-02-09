
const findItemActivo = (listaConsulta,id) => {
    for (var i = 0; i < listaConsulta.length; i++){
      if (listaConsulta[i].id == id){
          return listaConsulta[i];
      }
    } 
    return None;
}


const findItemActivoIndex = (listaConsulta,id) => {
    for (var i = 0; i < listaConsulta.length; i++){
      if (listaConsulta[i].id == id){
          return i;
      }
    } 
    return -1;
}

const reducer = (state,action) => {
    let activo;
    let index;
    switch (action.type) {
       case 'ADD_ITEM_CONSULTA':
          return {
          	  ...state,
          	  listaConsulta: [action.payload, ...state.listaConsulta.map(item => {
                                    item.active = false
                                    return item;
                                   })
                                 ],
          }
       case 'ACTIVE_ITEM_CONSULTA':    
            activo = findItemActivo(state.listaConsulta,action.payload);  
            console.log(activo);
            console.log('imprimiendo activo');
            activo.active = true;                          
            return {
              ...state,
              copyCardEditItem: {...activo},
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
       case 'ADD_ITEM_TICKET':
          action.payload.active = true
         
          return {
                  ...state,
                  itemTicket : action.payload,
                  listaTicket: [...state.listaTicket.map(item => {
                                    item.active = false
                                    return item;
                                   }),
                                   action.payload,
                                 ],
          }
       case 'MODIFY_ITEM_TICKET':
            activo = findItemActivo(state.listaTicket,action.payload.id);
            activo.cantidad = action.payload.cantidad;
            activo.precioVenta = action.payload.precioVenta;
            return {
               ...state,
               listaTicket: [...state.listaTicket],

            }
       case 'ACTIVE_ITEM_TICKET':
            activo = findItemActivo(state.listaTicket,action.payload);
            state.itemTicket.active = false;
            activo.active = true;
            return {
              ...state,
              itemTicket : activo,
              listaTicket: [...state.listaTicket]
          }
       case 'DELETE_ITEM_TICKET':
            activo = findItemActivo(state.listaTicket,action.payload);
            index = findItemActivoIndex(state.listaTicket,action.payload);
            state.listaTicket.splice(index,1)
            if (state.listaTicket.length == 1){
               activo = state.listaTicket[0]
               activo.active = true
            }
            else if (state.listaTicket.length > 1) {
               activo = state.listaTicket[index == 0 ? 0 : index - 1]
               activo.active = true
            }
            else {
               activo = {}
            }
            return {
               ...state,
               itemTicket  : activo,
               listaTicket : [...state.listaTicket],
            }
            
       default:   
          return state;

    }
	
}

export default reducer;
