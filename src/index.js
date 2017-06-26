import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './containers/App.jsx'
import todoStore from './store/todoStore'

// styles
// import 'bootstrap/dist/css/bootstrap.css'
import './styles/app.scss'

const store = todoStore()

render(
  <Provider store={store}>
    <div id='wrapper'>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
)
