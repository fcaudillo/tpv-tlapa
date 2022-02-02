import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';
import TPV from '../pages/TPV';
import CodigoBarras from '../pages/CodigoBarras';
import NotFound from '../pages/NotFound';
import FormProduct from '../pages/FormProduct';

function App() {
  return (
    <BrowserRouter>
     <React.Fragment>
      <Layout>
        <Switch>
          <Route exact path="/" component={CodigoBarras} />
          <Route exact path="/puntoventa" component={CodigoBarras} />
          <Route exact path="/puntoventa/add" component={FormProduct} />
          <Route exact path="/puntoventa/tpv" component={TPV} />

          
          <Route component={NotFound} />
        </Switch>
      </Layout>
     </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
