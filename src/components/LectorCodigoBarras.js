import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'

const SOCKET_SERVER_URL = "https://192.168.100.9:5000";
const SEARCH_PRODUCT_BARCODE = "message"


const LectorCodigoBarras = (negocioId) => {
   const lista = useSelector(store => store.listaConsulta);
   const listaTicket = useSelector(store => store.listaTicket);
   const listaTicketNormalizado = useSelector(store => store.listaTicketNormalizado);
   const dispatch = useDispatch();
   const socketRef = useRef();

   useEffect(() => {
       socketRef.current = socketIOClient(SOCKET_SERVER_URL);

	   socketRef.current.on(SEARCH_PRODUCT_BARCODE, ( message ) => {
	   	  console.log('3. llego mensaje ');
	   	  console.log(message);
	      const item = JSON.parse ( message );
	      console.log(item);
	      dispatch(actions.addItemConsulta(item));
          dispatch(actions.activeItemConsulta(item.id));
		  console.log("1.addToTicket: " + item.addToTicket)
		  console.log(typeof(item.addToTicket))
          if (typeof(item.addToTicket) != "undefined"){
			  if (item.addToTicket == 1){
					var productoTicket = listaTicketNormalizado[item.codigointerno];
					console.log("item from codebar lector : " + item.codigointerno)
					console.log(productoTicket)
					if (typeof(productoTicket) == "undefined") {
						dispatch(actions.addItemTicket({...item}));
					}else{
						var itemAModificar = listaTicket[item.index];
						itemAModificar.cantidad = itemAModificar.cantidad + item.cantidad;
						itemAModificar.total = itemAModificar.cantidad * itemAModificar.precioVenta;
						dispatch(actions.modifyItemTicket({...itemAModificar}));
					}
			  }
		  }
	   })

	   return () => {
	   	 socketRef.current.disconnect();
	   }

   },[negocioId]); 


}

export default LectorCodigoBarras;
