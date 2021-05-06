import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { getPatientsByCity } from './api';


const PatientList = (props) => {
  const { city } = props;  
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPatients([]);
    setIsLoading(true);
    getPatientsByCity(city)
      .then(searchResultBundle => {
        console.log(searchResultBundle);
        setPatients(searchResultBundle.entry.map(e => e.resource));
        setIsLoading(false);
      });
  }, [city])

  const renderPatients = (patients) => {
    return patients.map(p => (
        <React.Fragment key={p.id}>
        <dt><Link to={{ search: `?city=${city}&patient=${p.id}` }}>{ p.name[0].family + ', ' + p.name[0].given.join(' ') } </Link></dt>
        <dd></dd>
        </React.Fragment>
      ) );
  }

  return (
    <div>
    <h3> { city } </h3>
    { isLoading ? 
      <img src="https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp" alt="loading..." /> 
      :
      <dl> { renderPatients(patients) } </dl> }
     </div> );
}

export default PatientList;