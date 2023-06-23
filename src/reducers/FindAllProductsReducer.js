
  import {
    FIND_ALL_PRODUCT_SUCCESS,
    FIND_ALL_PRODUCT_ERROR,
    FIND_ALL_PRODUCT_PURGE
  } from '../bussiness/types'

  const initialState = {
    resultAllProducts : {isOk: false},
    resultAllProductsError: {isOk : false},
    resultAllProductsPurge: {isOk : false},
  }
  
 const FindAllProductReducer = ( state = initialState, action ) => {
    
    switch (action.type){
      case FIND_ALL_PRODUCT_SUCCESS:
        if ('payload' in action && 'data' in action.payload) {
            var mapProducts = {}
            action.payload.data.forEach( (value, idx) => {
                mapProducts[value.codigoInterno] = idx;

                if (value.codigoBarras != null && value.codigoBarras != "" && value.codigoBarras.length > 4 ){ //No incluir codigos internos menores que 5
                   
                       mapProducts[value.codigoBarras] = idx;
                  
                      
                }
                
            });
            action.payload['mapProducts'] = mapProducts;

        }
        return { ...state, resultAllProducts: action.payload , resultAllProductsError: {isOk : false}};
      case FIND_ALL_PRODUCT_ERROR:
        return { ...state, resultAllProductsError: action.payload };
      case FIND_ALL_PRODUCT_PURGE:
        return { ...initialState };
    }
    
    return state;
  }

  export default FindAllProductReducer;