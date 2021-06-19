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


const store = createStore(reducer, initialState,composeWithDevTools(
            /* logger must be the last middleware in chain to log actions */
              applyMiddleware(thunk,epicMiddleware,logger)
        ));

epicMiddleware.run(rootEpic);

export default store;
