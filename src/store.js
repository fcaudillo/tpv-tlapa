import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import promise from 'redux-promise-middleware'
import rootEpic from './epics'
import reduxPromiseMiddleware from 'redux-promise-middleware'

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
    /* https://github.com/evgenyrodionov/redux-logger */
    collapsed: true,
    diff: true
});

const initialState = {
    calculator: {
        "cantidad": "",
        "type": "quantity",
        "disabledPrice": true,
    },
    itemTicket: {},
    contadorItemTicket: 0,
    listaTicket: [
    ],
    showDialogPagar: false,
    ticket: {
       movimiento : {
          isLoading: false,
          data : {},
          result: {},
       },
       printTicket : {
          isLoading : false,
          data : {},
          result: {},
       },
    },
    listaTicketNormalizado: {}, 
    cardEditItem : {
	},
	copyCardEditItem: { },
	listaConsulta: [
                {
                   "id": 1,
                   "precioCompra":12.0,
                   "codigointerno":"358",
                   "proveedor":"trupper",
                   "description":"Palanca de plastico para wc",
                   "codigoProveedor":"49504",
                   "precioVenta":18.0,
                   "ubicacion":"",
                   "barcode":"7506240620037",
                   "existencia":7,
                   "cantidad": 1,
                   "total": 10.0,
                },
                {
                   "id": 2,
                   "precioCompra":14.0,
                   "codigointerno":"14",
                   "proveedor":"trupper",
                   "description":"Codo 13 x 90 cobre",
                   "codigoProveedor":"49506",
                   "precioVenta":10.0,
                   "ubicacion":"",
                   "barcode":"7506240621234",
                   "existencia":7,
                   "cantidad": 2,
                   "total": 20.0,
                   "active": false,
                },
                {
                   "id": 3,
                   "precioCompra":14.0,
                   "codigointerno":"14",
                   "proveedor":"trupper",
                   "description":"3. Codo 13 x 90 cobre",
                   "codigoProveedor":"49506",
                   "precioVenta":10.0,
                   "ubicacion":"",
                   "barcode":"7506240621234",
                   "existencia":7,
                   "cantidad": 2,
                   "total": 20.0,
                   "active": false,
                },
                {
                   "id": 4,
                   "precioCompra":14.0,
                   "codigointerno":"14",
                   "proveedor":"trupper",
                   "description":"4.Codo 13 x 90 cobre",
                   "codigoProveedor":"49506",
                   "precioVenta":10.0,
                   "ubicacion":"",
                   "barcode":"7506240621234",
                   "existencia":7,
                   "cantidad": 2,
                   "total": 20.0,
                   "active": false,
                },
                {
                   "id": 5,
                   "precioCompra":14.0,
                   "codigointerno":"14",
                   "proveedor":"trupper",
                   "description":"5. |Codo 13 x 90 cobre",
                   "codigoProveedor":"49506",
                   "precioVenta":10.0,
                   "ubicacion":"",
                   "barcode":"7506240621234",
                   "existencia":7,
                   "cantidad": 2,
                   "total": 20.0,
                   "active": false,
                },
                {
                   "id": 6,
                   "precioCompra":14.0,
                   "codigointerno":"14",
                   "proveedor":"trupper",
                   "description":"6. Codo 13 x 90 cobre",
                   "codigoProveedor":"49506",
                   "precioVenta":10.0,
                   "ubicacion":"",
                   "barcode":"7506240621234",
                   "existencia":7,
                   "cantidad": 2,
                   "total": 20.0,
                   "active": false,
                },
                {
                   "id": 7,
                   "precioCompra":14.0,
                   "codigointerno":"14",
                   "proveedor":"trupper",
                   "description":"7. Codo 13 x 90 cobre",
                   "codigoProveedor":"49506",
                   "precioVenta":10.0,
                   "ubicacion":"",
                   "barcode":"7506240621234",
                   "existencia":7,
                   "cantidad": 2,
                   "total": 20.0,
                   "active": false,
                },
	],
}


const store = createStore(reducer, initialState,composeWithDevTools(
            /* logger must be the last middleware in chain to log actions */
              applyMiddleware(thunk,epicMiddleware,logger)
        ));

epicMiddleware.run(rootEpic);

export default store;
