import 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import * as actions from './actions'
import { ajax } from 'rxjs/ajax'
import { Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'


export const fetchCatalogoProductos = actions$ =>
        actions$.pipe(
           ofType("FETCH_CATALOGO_PRODUCTOS"),
           mergeMap(action => 
               ajax.getJSON("https://tlapape.elverde.mx/findAll")
                   .map( lista => actions.fetchCatalogoProductosSuccess(lista))
                   .catch( error => Observable.of(actions.fetchCatalogoProductosFailed()))	
           )
       );


const rootEpic = combineEpics (
    fetchCatalogoProductos
);

export default rootEpic;

