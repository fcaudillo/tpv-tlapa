import { createStore } from 'redux';
import reducer from './reducers';

const initialState = {

	listaConsulta: [{'id':2,'description':'texto default'}],
}

const store = createStore(reducer, initialState);

export default store;