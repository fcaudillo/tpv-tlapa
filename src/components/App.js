import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import TPV from '../pages/TPV';
import CodigoBarras from '../pages/CodigoBarras';
import NotFound from '../pages/NotFound';
import FormProduct from '../pages/FormProduct';
import ListaCambioPrecio from '../pages/ListaCambioPrecio';
import VentaDiaria from '../pages/VentaDiaria'

import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
     <React.Fragment>
      <Layout>
        <Switch>
          <Route exact path="/" component={CodigoBarras} />
          <Route exact path="/puntoventa" component={CodigoBarras} />
          <Route path="/puntoventa/add/:key" component={FormProduct} />
          <Route exact path="/puntoventa/add" component={FormProduct} />
          <Route exact path="/puntoventa/tpv" component={TPV} />
          <Route exact path="/puntoventa/listacambioprecio" component={ListaCambioPrecio} />
          <Route exact path="/puntoventa/ventadiaria" component={VentaDiaria} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
     </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
