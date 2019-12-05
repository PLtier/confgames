import React, { FunctionComponent } from 'react'
import Routing from './Routes'
import GlobalStyles from './GlobalStyles'
import { Provider as StoreProvider } from 'react-redux'
import createStore from './store'
import Navbar from './components/shared/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import { Store } from 'redux'
import makeAction from './store/makeAction'
import { FETCH_COMPETITIONS_REQUESTED } from './store/actions'

const store: Store = createStore()

store.dispatch(makeAction(FETCH_COMPETITIONS_REQUESTED)({}))

const App: FunctionComponent = () => {
  return (
    <Router>
      <GlobalStyles />
      <StoreProvider store={store}>
        <Navbar />
        <Routing />
      </StoreProvider>
    </Router>
  );
}

export default App;
