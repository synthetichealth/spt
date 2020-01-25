import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";

import StateMap from './components/StateMap';
import PatientViewer from './components/PatientViewer';
import PatientList from './components/PatientList';

export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <StateMap />
          <Route path="/city/:city">
            <PatientList />
          </Route>
          <Route path="/city/:city/patient/:id">
            <PatientViewer />
          </Route>
      </BrowserRouter>
    );
  }
}
