import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import registerServiceWorker from './registerServiceWorker';

import App from './components/App'
import Store from './Store'
import './index.css'
import "typeface-roboto";

const root = document.getElementById('root')

ReactDOM.render(<Provider store={ Store }>
  <App />
</Provider>, root);

registerServiceWorker();
