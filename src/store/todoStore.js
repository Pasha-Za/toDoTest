import thunkMiddleware from 'redux-thunk'
import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../reducers'

export default function nutrilonStore(initialState){
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
    )
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
