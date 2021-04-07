import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import App from './containers/App/index.js';
import { rootReducer } from './redusers/rootReducer';


const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {}

const store = createStore(rootReducer, persistedState, compose(
  applyMiddleware(
    thunk
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <div id="modal"></div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
