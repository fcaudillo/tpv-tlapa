import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import ListProductMissing from '../pages/ListProductMissing';
import TPV from '../pages/TPV';
import CodigoBarras from '../pages/CodigoBarras';
import NotFound from '../pages/NotFound';
import FormProduct from '../pages/FormProduct';
import ListaCambioPrecio from '../pages/ListaCambioPrecio';
import VentaDiaria from '../pages/VentaDiaria'
//import ListaProducto from '../pages/ListaProducto';
import './styles/App.css';
import 'antd/dist/reset.css';
import 'antd/dist/reset.css';
function App() {
  return (
    <Router>
     <React.Fragment>
      <Layout>
        <Routes>
          <Route path="/" element={<CodigoBarras />} />
          <Route path="/puntoventa" element={<CodigoBarras />} />
          <Route path="/puntoventa/add/:key" element={<FormProduct />} />
          <Route path="/puntoventa/listafaltantes" element={<ListProductMissing />} />
          <Route path="/puntoventa/listacambioprecio" element={<ListaCambioPrecio />} />
          <Route path="/puntoventa/ventadiaria" element={<VentaDiaria />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
     </React.Fragment>
    </Router>
  );
}

export default App;
