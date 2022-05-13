import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap'

// Components
import { Root } from './components/Root'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/app.scss'

// Connect to Metamask
if (window.ethereum) {
  window.ethereum.enable()
}

ReactDOM.render(<Root />, document.getElementById('app'))

/* String Helper Methods */
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}
