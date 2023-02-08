
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

const initialState = {
   globalCodebar: {
       "codebar": "",
       "date": new Date()
   },
   calculatorEditItem: {
       "cantidad": "",
       "precio": "",
       "codigointerno": "",
       "fechamod": null
   },
   itemTicket: {},
   contadorItemTicket: 0,
   listaTicket: [
   ],
   showDialogPagar: false,
   updateDataProduct: {
       data: {},
       dataHistorico: {},
     },
   actionFormProduct: 'NONE',
   ticket: {
      isLoading: false,
      cantidadRecibida: 0,
      movimiento : {},
      printTicket : {},
      messages: [],
   },
   listaTicketNormalizado: {}, 
   cardEditItem : {
  },
  copyCardEditItem: { },
  listaConsulta: [
  ],
}


const reducer = (state = initialState, action) => {
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
                  calculatorEditItem: {
                     cantidad : "" + action.payload.cantidad,
                     precio  : "" + action.payload.precioVenta,
                     codigointerno: action.payload.codigointerno,
                     fechaMod: new Date(),
                     startEdit: false
                  },
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
            activo.cantidad = action.payload.cantidad;
            activo.precioVenta = action.payload.precioVenta;
            activo.total = activo.cantidad * activo.precioVenta;
            console.log("MODIFY_ITEM_TICKET ACTIVO");
            console.log(activo);
            calculatorEditItem = {...state.calculatorEditItem, startEdit: false };
            if (activo.active) { //Si el item a modificar es el activo, entonces modificar la cantidad para que se refleje en la calculadora
               calculatorEditItem = {
                  cantidad : "" + activo.cantidad,
                  precio  : "" + activo.precioVenta,
                  codigointerno: activo.codigointerno,
                  fechaMod: new Date(),
                  startEdit: true
               };
            }
            return {
               ...state,
               listaTicket: [...state.listaTicket],
               calculatorEditItem,
            }
       case 'ACTIVE_ITEM_TICKET':
            activo = findItemActivo(state.listaTicket,action.payload);
            activo.active = true;
            return {
              ...state,
              calculatorEditItem: {
                cantidad : "" + activo.cantidad,
                precio  : "" + activo.precioVenta,
                codigointerno : activo.codigointerno,
                fechaMod: new Date(),
                startEdit: false
              },
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
            calculatorEditItem = {
               cantidad : "",
               precio  : "" ,
               codigointerno : null,
               fechaMod: new Date(),
               startEdit: false
             };
            
            if (activo.active){
               calculatorEditItem = {
                  cantidad : "" + activo.cantidad,
                  precio  : "" + activo.precioVenta,
                  codigointerno : activo.codigointerno,
                  fechaMod: new Date(),
                  startEdit: false
                };

            }
      
            var lstTemporal = {};
            for (let i=0; i < state.listaTicket.length; i++){
               lstTemporal[state.listaTicket[i].codigointerno] = {'id': state.listaTicket[i].codigointerno, 'index': i};
            }
            return {
               ...state,
               itemTicket  : activo,
               calculatorEditItem,
               listaTicketNormalizado: lstTemporal, 
               listaTicket : [...state.listaTicket],
            }
       case 'SEND_TICKET':
            return {
              ...state,
              ticket: {
                 isLoading: true,
                 movimiento: action.payload.movimiento,
                 printTicket: action.payload.printTicket,
              }
            }
       case 'ADD_TICKET_SUCCESS':
            return {
                ...state,
                ticket: {
                    ...state.ticket,
                    printTicket: {
                       ...state.ticket.printTicket,
                       encabezado: { ...state.ticket.printTicket.encabezado, "fecha": action.payload.fecha},
                       pie: { ...state.ticket.printTicket.pie, "numero_ticket": action.payload.folio},
                    }
                }
            }
       case 'MODIFY_GLOBAL_CODEBAR':
            return {
               ...state,
               globalCodebar: action.payload
            }
       case 'PRINT_TICKET_SUCCESS':
            return {
              ...state,
              ticket: { ...state.ticket,
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
       case 'MODIFY_CANTIDAD_RECIBIDA':
            return {
               ...state,
               ticket: { ...state.ticket, cantidadRecibida: action.payload },
            }
       case 'CLEAR_TICKET':
            return {
              ...state,
              itemTicket: {},
              contadorItemTicket: 0,
              listaTicketNormalizado: {},
              listaTicket: [],
           }
      case 'MODIFY_CANTIDAD_ITEM_TICKET':
         console.log("Modificando calculatorEditItem: " + state.calculatorEditItem.codigointerno );
         console.log('cantidad: ' + action.payload.cantidad);
         console.log('precio: ' + action.payload.precio)
         var calculatorEditItem = {
            ...state.calculatorEditItem,
            cantidad : "" + action.payload.cantidad,
            precio  : "" + action.payload.precio,
            fechaMod: new Date(),
          };
         return {
            ...state,
            calculatorEditItem,
         }
      case 'MODIFY_START_ITEM':
         calculatorEditItem = {
               ...state.calculatorEditItem,
               startEdit: action.payload
            };

         return {
            ...state,
            calculatorEditItem,
         } 
         
      case 'UPDATE_DATA_FORM_PRODUCT':
         return {
            ...state,
            updateDataProduct: action.payload,
         }
      case 'ACTION_FORM_PRODUCT':
         console.log("action.payload " + action.payload)
         return {
            ...state,
            actionFormProduct: action.payload,
         }
    }

    return state;
	
}

export default reducer;
