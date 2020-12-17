import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
import store from './store'

import './global.css';
import App from './components/App';

const container = document.getElementById('app');
function render() {
  ReactDOM.render(
  	  <Provider store={store}>
  	      <App />
      </Provider>
  	, container);
}
render()

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render()
  })
}
