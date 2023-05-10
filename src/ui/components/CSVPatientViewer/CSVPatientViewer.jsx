import React, { useState, useEffect } from 'react';
import {
  PatientVisualizer,
  ConditionsVisualizer,
  ObservationsVisualizer,
  ReportsVisualizer,
  MedicationsVisualizer,
  AllergiesVisualizer,
  CarePlansVisualizer,
  ProceduresVisualizer,
  EncountersVisualizer,
  ImmunizationsVisualizer,
  DocumentReferencesVisualizer
} from 'fhir-visualizers';
import { useLocation, useHistory } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import axios from 'axios';


const CSVPatientViewer = props => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const id = props.id || urlParams.get('patient');

  const [data, setData] = useState(null);


  useEffect(() => {
      async function fetchData() {
          const [
            patientResp,
            conditionsResp,
            medicationsResp,
            proceduresResp,
            encountersResp,
            observationsResp
          ] = await Promise.all([
            axios.get(`/collection/patients?Id=${id}`),
            axios.get(`/collection/conditions?PATIENT=${id}`),
            axios.get(`/collection/medications?PATIENT=${id}`),
            axios.get(`/collection/procedures?PATIENT=${id}`),
            axios.get(`/collection/encounters?PATIENT=${id}`),
            axios.get(`/collection/observations?PATIENT=${id}`)
          ]);

          setData({
            patient: patientResp.data,
            conditions: conditionsResp.data,
            medications: medicationsResp.data,
            procedures: proceduresResp.data,
            encounters: encountersResp.data,
            observations: observationsResp.data,
          });
      }
      fetchData();
  }, [id]);

  if (!data) return <div></div>;


  return (<div>
      { Object.keys(data).map(type => {
          const content = data[type];
          return <div>{type}<Table columns={Object.keys(content[0])} data={content} propertyAsKey="ID" /></div>;
      })}
    </div>);
};

const Table = ({ columns, data, propertyAsKey }) => //Deconstructs your props
    <table className='table'>
        <thead>
            <tr>{columns.map(col => <th key={`header-${col}`}>{col}</th>)}</tr>
        </thead>
        <tbody>
            {data.map((item,index) =>
                <tr key={`${item[propertyAsKey]||index}-row`}>
                    {columns.map((col,ii) => <td key={`${item[propertyAsKey]||ii}-${col}`}>{item[col]}</td>)}
                </tr>
            )}
        </tbody>
    </table>;


export default CSVPatientViewer;
