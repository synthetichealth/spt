import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from "react-router-dom";

import StateMap from './components/StateMap';
import PatientViewer from './components/PatientViewer';
import PatientList from './components/PatientList';

export default class App extends React.Component {

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path={["/record_viewer", "/patient_viewer"]}>
            <PatientViewer />
          </Route>
          <Route path="/">
            <StateMap />
            <Route path="/city/:city">
              <PatientList />
              <Route path="/city/:city/patient/:id">
                <PatientViewer />
              </Route>
            </Route>
          </Route>
        </Switch>
      </HashRouter>
    );
  }
}
