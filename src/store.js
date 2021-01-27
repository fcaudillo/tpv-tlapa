import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';

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
    cardEditItem : {
	},
	copyCardEditItem: { },
	listaConsulta: [

	],
}

const store = createStore(reducer, initialState,composeWithDevTools(
            /* logger must be the last middleware in chain to log actions */
            applyMiddleware(thunk, logger)  
        ));

export default store;
