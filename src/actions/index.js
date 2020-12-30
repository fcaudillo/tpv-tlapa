

export const addItemConsulta = payload => ({
   type: 'ADD_ITEM_CONSULTA',
   payload,
});

export const activeItemConsulta = payload => ({
   type: 'ACTIVE_ITEM_CONSULTA',
   payload,
});

export const modifyQtyCalculator = payload => ({
   type: 'MODIFY_QUANTITY_CALCULATOR',
   payload,
});

export const modifyTypeCalculator = payload => ({
   type: 'MODIFY_TYPE_CALCULATOR',
   payload,
});

export const modifyDisabledPrice = payload => ({
   type: 'MODIFY_DISABLED_PRICE',
   payload,
});