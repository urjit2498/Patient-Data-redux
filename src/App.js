import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AdmitForm from './components/admitUser/AdmitForm';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Chart from './components/admitUser/BarChart';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={AdmitForm} />
            <Route exact path='/chart' component={Chart} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
