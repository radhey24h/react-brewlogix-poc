import React from 'react';
import './App.css';
import BrewMenu from './BrewMenu';
import { Provider } from 'react-redux';
import store from '../src/store'

//window.store = store;

function App() {
  return (
    <Provider store={store}>
      <BrewMenu />
    </Provider>
  );
}

export default App;
