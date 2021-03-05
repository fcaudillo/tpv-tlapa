import 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import * as actions from './actions'
import { ajax } from 'rxjs/ajax'
import { Observable } from 'rxjs'
import { mergeMap, map, catchError } from 'rxjs/operators'


export const fetchCatalogoProductos = actions$ =>
        actions$.pipe(
           ofType("FETCH_CATALOGO_PRODUCTOS"),
           mergeMap(action => 
               ajax.getJSON("https://tlapape.elverde.mx/findAll")
                   .map( lista => actions.fetchCatalogoProductosSuccess(lista))
                   .catch( error => Observable.of(actions.fetchCatalogoProductosFailed()))	
           )
       );

export const printTicket = actions$ =>
       actions$.pipe(
         ofType("SEND_TICKET"),
         mergeMap(action =>
            ajax({
              url: 'http://192.168.100.9:5001/print_ticket/',
              headers: {'Content-Type':'application/json'},
              method: 'POST',
              body: action.payload,
            }).pipe(
              map ( result => actions.showDialogPagar(false)),
              catchError(error  => Observable.of(actions.printTicketFail({fail: 'fallo'})))
            )
        )
      );     

export const addTicket = (actions$, states$) =>
   actions$.pipe(
      ofType ("ADD_TICKET"),
      mergeMap(action =>
         ajax({
           url: 'http://192.168.100.9.5001/tickets/add',
           headers: {"X-HTTP-Method-Override": "PUT", "X-CSRFToken": "$.cookie('csrftoken')"},
           method: 'POST',
           body: action.payload,
         }).pipe(
            map (result => actions.addTicketSuccess(result)),
            catchError(error => Observable.of(actions.addTicketFail(error)))
         )
      )

   );

/*
const rootEpic = combineEpics (
    fetchCatalogoProductos,
    printTicket
);
*/

const rootEpic = (action$, store$, dependencies) =>
   combineEpics(printTicket,addTicket)(action$,store$,dependencies).pipe(
     catchError((error,source) => {
        console.log(error);
        return source;
     })
);

export default rootEpic;

