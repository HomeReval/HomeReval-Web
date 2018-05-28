import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { setLoggedIn, refreshLogin } from './actions/userActions'

import registerServiceWorker from './registerServiceWorker';

import App from './components/App'
import Store from './Store'
import './index.css'
import "typeface-roboto";

const root = document.getElementById('root')

if(Date.now() / 1000 < localStorage.getItem('expires')){
  Store.dispatch(setLoggedIn())
} else {
  Store.dispatch(refreshLogin())
}

ReactDOM.render(<Provider store={ Store }>
  <App />
</Provider>, root);

registerServiceWorker();
