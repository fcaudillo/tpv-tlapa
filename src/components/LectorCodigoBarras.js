import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'

const SOCKET_SERVER_URL = "http://192.168.100.13:5000";
const SEARCH_PRODUCT_BARCODE = "message"


const LectorCodigoBarras = (negocioId) => {
   const lista = useSelector(store => store.listaConsulta);
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
	   })

	   return () => {
	   	 socketRef.current.disconnect();
	   }

   },[negocioId]); 


}

export default LectorCodigoBarras;