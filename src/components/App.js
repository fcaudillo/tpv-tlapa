import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import TPV from '../pages/TPV';
import CodigoBarras from '../pages/CodigoBarras';
import NotFound from '../pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={CodigoBarras} />
          <Route exact path="/puntoventa/" component={CodigoBarras} />
          <Route exact path="/puntoventa/tpv" component={TPV} />

          
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
