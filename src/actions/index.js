

export const addItemConsulta = payload => ({
   type: 'ADD_ITEM_CONSULTA',
   payload,
});

export const activeItemConsulta = payload => ({
   type: 'ACTIVE_ITEM_CONSULTA',
   payload,
});

export const modifyItemConsulta = payload => ({
   type: 'MODIFY_ITEM_CONSULTA',
   payload,
});

export const modifyListItemConsulta = payload => ({
   type: 'MODIFY_LISTA_CONSULTA',
   payload,
});


export const addItemTicket = payload => ({
   type: 'ADD_ITEM_TICKET',
   payload,
});

export const activeItemTicket = payload => ({
   type: 'ACTIVE_ITEM_TICKET',
   payload,
});

export const modifyItemTicket = payload => ({
   type: 'MODIFY_ITEM_TICKET',
   payload,
});

export const modifyListItemTicket = payload => ({
   type: 'MODIFY_LISTA_TICKET',
   payload,
});

export const deleteListItemTicket = payload => ({
   type: 'DELETE_ITEM_TICKET',
   payload,
});

export const fetchCatalogoProductos = () => ({
   type: 'FETCH_CATALOGO_PRODUCTOS',
});

export const fetchCatalogoProductosSuccess = payload => ({
   type: 'FETCH_CATALOGO_PRODUCTOS_SUCCESS',
   payload,
});
export const fetchCatalogoProductosFailed = () => ({ type: 'FETCH_CATALOGO_PRODUCTOS_FAILED'
});

export const sendTicket = payload => ({
   type: 'SEND_TICKET',
   payload,
});

export const printTicket = () => ({
   type: 'PRINT_TICKET',
});

export const printTicketSuccess = () => ({
   type: 'PRINT_TICKET_SUCCESS',
});

export const printTicketFail = payload => ({
  type: 'PRINT_TICKET_FAIL',
  payload,
});

export const showDialogPagar = payload => ({
  type: 'SHOW_DIALOG_PAGAR',
  payload,
});

export const addTicket = payload => ({
  type: 'ADD_TICKET',
  payload,
});

export const addTicketSuccess = payload => ({
  type: 'ADD_TICKET_SUCCESS',
  payload,
});

export const addTicketFail = payload => ({
  type: 'ADD_TICKET_FAIL',
  payload,
});

export const clearTicket = () => ({
  type: 'CLEAR_TICKET'
});

export const modifyCantidadRecibida = payload => ({
  type: 'MODIFY_CANTIDAD_RECIBIDA',
  payload,
});


