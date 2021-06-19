import 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import * as actions from './actions'
import { ajax } from 'rxjs/ajax'
import { Observable, of } from 'rxjs'
import { mergeMap, map, catchError } from 'rxjs/operators'
import Cookies from 'js-cookie'


export const fetchCatalogoProductos = actions$ =>
        actions$.pipe(
           ofType("FETCH_CATALOGO_PRODUCTOS"),
           mergeMap(action => 
               ajax.getJSON("https://tlapape.elverde.mx/findAll")
                   .map( lista => actions.fetchCatalogoProductosSuccess(lista))
                   .catch( error => Observable.of(actions.fetchCatalogoProductosFailed()))	
           )
       );

export const printTicketEpic = (actions$,state$) =>
       actions$.pipe(
         ofType("ADD_TICKET_SUCCESS"),
         mergeMap(action =>  {
            if (state$.value.ticket.movimiento.tipo_impresion === 0) { //No imprimir el ticket
               return of(actions.printTicketSuccess({}));
            }

            return ajax({
              url: 'http://192.168.100.9:5001/print_ticket/',
              headers: {'Content-Type':'application/json'},
              method: 'POST',
              body: state$.value.ticket.printTicket,
            }).pipe(
              map ( result => {
                if (result.status ===200) {
                  return actions.printTicketSuccess({});
                } else {
                  return actions.printTicketFail({message: result.errorMessage});
                }
              }),
              catchError(error  => of(actions.printTicketFail({message: 'Fallo al imprimir el recibo'})))
            )
  
        })
      );     

export const addTicketEpic = (actions$, state$) =>
   actions$.pipe(
      ofType ("SEND_TICKET"),
      mergeMap(action =>
         ajax({
           // url: 'http://192.168.100.9:5001/tickets/add',
           url: 'https://tlapape.elverde.mx/tickets/add',
           headers: {'Content-Type':'application/json','X-HTTP-Method-Override': 'PUT', 'X-CSRFToken': Cookies.get('csrftoken')},
           method: 'POST',
           body: state$.value.ticket.movimiento,
         }).pipe(
            map (result => {
               if (result.status === 200) {
                 console.log(result.response);
                 return actions.addTicketSuccess(result.response);
               }else {
                 return actions.addTicketFail({message:result.errorMessage});
               }

            }),
            catchError(error => oof(actions.addTicketFail({message:'Fallo al enviar el ticket'})))
         )
      )

   );

export const clearTicket = (actions$, state$) =>
   actions$.pipe(
      ofType ("PRINT_TICKET_SUCCESS"),
      mergeMap(action => 
         of(actions.clearTicket())
      )
   );

export const closeTicket = (actions$, state$) =>
   actions$.pipe(
      ofType('CLEAR_TICKET'),
      mergeMap(action => of(actions.showDialogPagar(false)))
   );

const rootEpic = (action$, store$, dependencies) =>
   combineEpics(printTicketEpic,addTicketEpic,clearTicket,closeTicket)(action$,store$,dependencies).pipe(
     catchError((error,source) => {
        console.log(error);
        return source;
     })
);

export default rootEpic;

