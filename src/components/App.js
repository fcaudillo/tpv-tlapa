import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import TPV from '../pages/TPV';
import CodigoBarras from '../pages/CodigoBarras';
import NotFound from '../pages/NotFound';
import FormProduct from '../pages/FormProduct';
import ListaCambioPrecio from '../pages/ListaCambioPrecio';
import VentaDiaria from '../pages/VentaDiaria'
//import ListaProducto from '../pages/ListaProducto';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
     <React.Fragment>
      <Layout>
        <Switch>
          <Route path="/" element={<CodigoBarras />} />
          <Route path="/puntoventa" element={<CodigoBarras />} />
          <Route path="/puntoventa/add/:key" element={<FormProduct />} />

           {/* <Route path="/puntoventa/listaproducto" element={<ListaProducto />} />   */}
          <Route path="/puntoventa/listacambioprecio" element={<ListaCambioPrecio />} />
          <Route path="/puntoventa/ventadiaria" element={<VentaDiaria />} />
          <Route path="*" element={<NotFound />} />
        </Switch>
      </Layout>
     </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
