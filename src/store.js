import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import promise from 'redux-promise-middleware'
import rootEpic from './epics'
import reduxPromiseMiddleware from 'redux-promise-middleware'
import { combineReducers } from 'redux';

import LoadProductReducer from './reducers/LoadProductReducer'
import UpdateProductReducer from './reducers/UpdateProductReducer'
import LoadProductHistoryReducer from './reducers/LoadProductHistoryReducer';
import SaveProductReducer from './reducers/SaveProductReducer'
import SearchProductReducer from './reducers/SearchProductReducer';


const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
    /* https://github.com/evgenyrodionov/redux-logger */
    collapsed: true,
    diff: true
});

const initialState = {
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

const rootReducer = combineReducers({
    reducer,
    editProduct: LoadProductReducer,
    updateProduct: UpdateProductReducer,
    historyProduct: LoadProductHistoryReducer,
    saveProduct: SaveProductReducer, 
    searchProduct: SearchProductReducer
});

/** ,epicMilddleware */
const store = createStore(rootReducer, initialState,composeWithDevTools(
            /* logger must be the last middleware in chain to log actions */
              applyMiddleware(thunk, epicMiddleware ,logger)
        ));

epicMiddleware.run(rootEpic);

export default store;
