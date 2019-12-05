import { createStore as createReduxStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'


import reducer from './reducers'
import mySaga from './sagas'


const createStore = (): Store => {
    const sagaMiddleware = createSagaMiddleware()

    const store: Store = createReduxStore(reducer, composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    ))

    sagaMiddleware.run(mySaga)

    return store
}

export default createStore