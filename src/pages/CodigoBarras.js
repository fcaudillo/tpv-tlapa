import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import './styles/CodigoBarras.css';
import Producto from '../components/Producto'
import confLogo from '../images/badge-header.svg';


function CodigoBarras() {
  const lista = useSelector(store => store.listaConsulta);
  const dispatch = useDispatch();
  const listElements = lista.map((prod) =>
     <Producto key={prod.id} data={prod} />  
  );

  return (
    <div>
      <p> componente codigo de barras  una prueba</p>
      <ul>
         {listElements}
      </ul>
      <button onClick={() => dispatch(actions.addItemConsulta({'id':1,'description':'abc'}))}> Agregar producto </button>
      <Link className="btn btn-primary" to="/tpv">
                Ve a pagina  tpv
              </Link>
    </div>
  );
}


export default CodigoBarras;
