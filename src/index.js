import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
import store from './store'
import { ProviderContext }  from './Context';
import { StyledEngineProvider } from '@mui/material/styles';
import 'antd/dist/reset.css';

import './global.css';
import App from './components/App';

const container = document.getElementById('app');
const root = createRoot(container);

function render() {
  root.render(
    <React.StrictMode>
      <ProviderContext>
        <Provider store={store}>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </Provider>
      </ProviderContext>
    </React.StrictMode>
  );
}

render();

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render()
  })
}
