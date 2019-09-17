import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PatientVisualizer, ConditionsVisualizer, ObservationsVisualizer } from './Visualizers';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <PatientVisualizer />
        <ConditionsVisualizer />
        <ObservationsVisualizer />
      </div>
    );
  }
}