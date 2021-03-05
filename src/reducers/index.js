
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
          action.payload.active = true;
          action.payload.total = action.payload.cantidad * action.payload.precioVenta;
          console.log(state.listaTicketNormalizado) 
          state.listaTicketNormalizado[action.payload.codigointerno] = {'id': action.payload.codigointerno, 'index': state.listaTicket.length};
          return {
                  ...state,
                  itemTicket : action.payload,
                  contadorItemTicket: state.contadorItemTicket + 1,
                  listaTicketNormalizado: {...state.listaTicketNormalizado } , 
                  listaTicket: [...state.listaTicket.map(item => {
                                    item.active = false
                                    return item;
                                   }),
                                   action.payload,
                                 ],
          }
       case 'MODIFY_ITEM_TICKET':
            activo = findItemActivo(state.listaTicket,action.payload.id);
            activo.cantidad = activo.cantidad + action.payload.cantidad;
            activo.precioVenta = action.payload.precioVenta;
            activo.total = activo.cantidad * activo.precioVenta;
            console.log("MODIFY_ITEM_TICKET ACTIVO");
            console.log(activo);
            return {
               ...state,
               listaTicket: [...state.listaTicket],

            }
       case 'ACTIVE_ITEM_TICKET':
            activo = findItemActivo(state.listaTicket,action.payload);
            activo.active = true;
            return {
              ...state,
              itemTicket : activo,
              listaTicket: state.listaTicket.map(item => {
                                                       item.active =  (item.id == action.payload ? true: false);
                                                       return item; })
          }
       case 'DELETE_ITEM_TICKET':
            activo = findItemActivo(state.listaTicket,action.payload);
            index = findItemActivoIndex(state.listaTicket,action.payload);
            state.listaTicket.splice(index,1)
            state.listaTicket.forEach( item => item.active = false)
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
            var lstTemporal = {};
            for (let i=0; i < state.listaTicket.length; i++){
               lstTemporal[state.listaTicket[i].codigointerno] = {'id': state.listaTicket[i].codigointerno, 'index': i};
            }
            return {
               ...state,
               itemTicket  : activo,
               listaTicketNormalizado: lstTemporal, 
               listaTicket : [...state.listaTicket],
            }
       case 'SEND_TICKET':
            return {
              ...state,
              ticket: {
                 movimiento: { data: action.payload.movimiento, isLoading: true, result : {} },
                 printTicket: { data: action.payload.printTicket, isLoading: true, result: {} },
              }
            }
       case 'PRINT_TICKET_SUCCESS':
            return {
              ...state,
              ticket: { ...state.ticket,
                        printTicket: { ...state.ticket.printTicket, isLoading: false}
                       },
            }
       case 'PRINT_TICKET_FAIL':
            return {
              ...state,
            }
       case 'SHOW_DIALOG_PAGAR':
            return {
              ...state,
              showDialogPagar: action.payload,
            }
            
       default:   
          return state;

    }
	
}

export default reducer;
