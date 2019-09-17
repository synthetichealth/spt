import React from 'react';
import './App.css';

import bundle from './demo_data.json';

const DSTU2 = '1.0.2';
const STU3 = '3.0.1';
const R4 = '4.0.0';

const allResources = bundle.entry.map(e => e.resource);
const patient = allResources.find(r => r.resourceType === 'Patient');
const conditions = allResources.filter(r => r.resourceType === 'Condition');
const observations = allResources.filter(r => r.resourceType === 'Observation');

patient.extension = patient.extension || [];
const raceExt = patient.extension.find((e) => { return e.url === 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-race'});
let race;
if (raceExt) {
  race = raceExt.extension[0].valueString || raceExt.extension[0].valueCoding.display;
} else {
  race = null;
}

const ethExt = patient.extension.find((e) => { return e.url === 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity'});
let ethnicity;
if (ethExt) {
  ethnicity = ethExt.extension[0].valueString || ethExt.extension[0].valueCoding.display;
} else {
  ethnicity = null;
}


const searchableObs = observations.slice().reverse();

const height_obs = searchableObs.find(o => o.code.coding[0].display === 'Body Height');
const weight_obs = searchableObs.find(o => o.code.coding[0].display === 'Body Weight');

const cause_of_death_obs = null;

const round = function (num, digits) {
  return Number.parseFloat(num).toFixed(digits);
}

const obsValue = (entry) => {
  if (entry == null) {
    return '';
  } else if (entry.valueQuantity) {
    return round(entry.valueQuantity.value, 2) + ' ' + entry.valueQuantity.code;
  } else if (entry.valueCodeableConcept) { 
    return entry.valueCodeableConcept.coding[0].display;
  } else if (entry.valueString) {
    return entry.valueString;
  }

  if (entry.code.coding[0].display === "Blood Pressure") {

    if (!entry.component[0].valueQuantity) {
      return ''; // WTF!!
    }
    
    const v1 = Number.parseFloat(entry.component[0].valueQuantity.value);
    const v2 = Number.parseFloat(entry.component[1].valueQuantity.value);

    const s1 = v1.toFixed(0);
    const s2 = v2.toFixed(0);

    if (v1 > v2) {
      return s1 + ' / ' + s2 + ' mmHg';
    } else {
      return s2 + ' / ' + s1 + ' mmHg';
    }
  }

  return '';
}


class PatientVisualizer extends React.Component {
	render() {
		return (
      <div>
      <div class="health-record__header"><div class="header-title">Patient</div><div class="header-divider"></div></div>
			<div id="p_brief" class="row">
		    <div id="p_brief_records" class="col-5">
		      <div id="p_brief_name_address" class="p_block">
		        <dl class="dl-horizontal p_brief_family">
		          <dt>Name</dt>
		            <dd>{ patient.name[0].family }, { patient.name[0].given.join(' ') }</dd>
		          <dt>Gender</dt>
		            <dd>{ patient.gender }</dd>
		          <dt>Date of Birth</dt>
		            <dd>{ patient.birthDate }</dd>
		          <dt>Address</dt>
		            <dd>{ patient.address[0].line.join(' ') }</dd>
		          <dt>City, State</dt>
		            <dd>{ patient.address[0].city }, { patient.address[0].state }</dd>
		          <dt>Postal Code</dt>
		            <dd>{ patient.address[0].postalCode }</dd>
	              <dt>Date of Death</dt>
		            <dd>{ patient.deceasedDateTime }</dd>
		        </dl>
		      </div>
		    </div>
		    <div id="p_brief_records" class="col-5">
		      <div id="p_brief_name_address" class="p_block">
		        <dl class="dl-horizontal p_brief_family">
		          <dt>Height</dt>
		            <dd>{ obsValue(height_obs) }</dd>
		          <dt>Weight</dt>
		            <dd>{ obsValue(weight_obs) }</dd>
		          <dt>Race</dt>
		            <dd>{ race || 'unk.' }</dd>
		          <dt>Ethnicity</dt>
		            <dd>{ ethnicity || 'unk.' }</dd>
		          <dt>Language</dt>
		            <dd>{ patient.communication[0].language.coding[0].display }</dd>
		          <dt>Blood Type</dt>
		            <dd>unknown</dd>
		          <dt>Cause of Death</dt>
		            <dd>{ cause_of_death_obs }</dd>
		        </dl>
		      </div>
		    </div>
	    </div>
      </div>
		);
	}
}

class GenericVisualizer extends React.Component {
    /*
      columns: [
        { title: 'SNOMED', getter: (c) => c.code.coding[0].code, versions: ['1.0.2', '3.0.1', '4.0.0'] }
      ],
      rows: // fhir[]
      keyFn: (c) => c.id
    */

  renderHeaderLine() {
    const columns =
      this.props.columns
        .filter(c => c.versions === '*' || c.versions.includes(this.props.version))
        .map(c => c.title);

    return columns.map(c => <th scope="col">{c}</th>);
  }

  renderBodyLine(line) {
    const columns =
      this.props.columns
      .filter(c => c.versions === '*' || c.versions.includes(this.props.version))
      .map(c => c.getter);

    return (
          <tr key={this.props.keyFn(line)}>
            { columns.map(c => <td>{ c(line) }</td>) }
          </tr>
      );
    // TODO: multi-liners
  }

  render() {
    return (
      <div id={this.props.title}>
        <div class="health-record__header"><div class="header-title">{ this.props.title }</div><div class="header-divider"></div></div>
        <table class="table table-sm table-hover">
        <thead id={ `p_${this.props.title}_head` }>
          <tr>
            { this.renderHeaderLine() }
          </tr>
        </thead>
        <tbody id={ `p_${this.props.title}_list` }>
          { this.props.rows.slice().reverse().map(c => this.renderBodyLine(c)) }
        </tbody>
        </table>
      </div>
    );
  }
}

class ConditionsVisualizer extends GenericVisualizer {
  static defaultProps = {
    title: 'Conditions',
    columns: [
        { title: 'SNOMED', versions: '*', getter: c => c.code.coding[0].code },
        { title: 'Condition', versions: '*', getter: c => c.code.coding[0].display },
        { title: 'Date of Onset', versions: '*', getter: c => c.onsetDateTime },
        { title: 'Date Resolved', 'versions': '*', getter: c => c.abatementDateTime || 'N/A' }
      ],
      rows: conditions,
      keyFn: c => c.id
  };
}


class ObservationsVisualizer extends GenericVisualizer {
  static defaultProps = {
    title: 'Observations',
    columns: [
        { title: 'LOINC', versions: '*', getter: o => o.code.coding[0].code },
        { title: 'Observation', versions: '*', getter: o => o.code.coding[0].display },
        { title: 'Value', versions: '*', getter: o => obsValue(o) },
        { title: 'Date Recorded', 'versions': '*', getter: o => o.effectiveDateTime }
      ],
      rows: observations,
      keyFn: o => o.id
  };
}


class ReportsVisualizer extends GenericVisualizer {
  static defaultProps = {
    title: 'Conditions',
    columns: [
        { title: 'SNOMED', versions: '*', getter: c => c.code.coding[0].code },
        { title: 'Condition', versions: '*', getter: c => c.code.coding[0].display },
        { title: 'Date of Onset', versions: '*', getter: c => c.onsetDateTime },
        { title: 'Date Resolved', 'versions': '*', getter: c => c.abatementDateTime || 'N/A' }
      ],
      rows: conditions,
      keyFn: c => c.id
  };
}

class MedicationsVisualizer extends GenericVisualizer {
  static defaultProps = {
    title: 'Conditions',
    columns: [
        { title: 'SNOMED', versions: '*', getter: c => c.code.coding[0].code },
        { title: 'Condition', versions: '*', getter: c => c.code.coding[0].display },
        { title: 'Date of Onset', versions: '*', getter: c => c.onsetDateTime },
        { title: 'Date Resolved', 'versions': '*', getter: c => c.abatementDateTime || 'N/A' }
      ],
      rows: conditions,
      keyFn: c => c.id
  };
}

class AllergiesVisualizer extends GenericVisualizer {
  static defaultProps = {
    title: 'Conditions',
    columns: [
        { title: 'SNOMED', versions: '*', getter: c => c.code.coding[0].code },
        { title: 'Condition', versions: '*', getter: c => c.code.coding[0].display },
        { title: 'Date of Onset', versions: '*', getter: c => c.onsetDateTime },
        { title: 'Date Resolved', 'versions': '*', getter: c => c.abatementDateTime || 'N/A' }
      ],
      rows: conditions,
      keyFn: c => c.id
  };
}

class CarePlansVisualizer extends GenericVisualizer {
  static defaultProps = {
    title: 'Conditions',
    columns: [
        { title: 'SNOMED', versions: '*', getter: c => c.code.coding[0].code },
        { title: 'Condition', versions: '*', getter: c => c.code.coding[0].display },
        { title: 'Date of Onset', versions: '*', getter: c => c.onsetDateTime },
        { title: 'Date Resolved', 'versions': '*', getter: c => c.abatementDateTime || 'N/A' }
      ],
      rows: conditions,
      keyFn: c => c.id
  };
}

class ProceduresVisualizer extends GenericVisualizer {
  static defaultProps = {
    title: 'Conditions',
    columns: [
        { title: 'SNOMED', versions: '*', getter: c => c.code.coding[0].code },
        { title: 'Condition', versions: '*', getter: c => c.code.coding[0].display },
        { title: 'Date of Onset', versions: '*', getter: c => c.onsetDateTime },
        { title: 'Date Resolved', 'versions': '*', getter: c => c.abatementDateTime || 'N/A' }
      ],
      rows: conditions,
      keyFn: c => c.id
  };
}

class EncountersVisualizer extends GenericVisualizer {
  static defaultProps = {
    title: 'Conditions',
    columns: [
        { title: 'SNOMED', versions: '*', getter: c => c.code.coding[0].code },
        { title: 'Condition', versions: '*', getter: c => c.code.coding[0].display },
        { title: 'Date of Onset', versions: '*', getter: c => c.onsetDateTime },
        { title: 'Date Resolved', 'versions': '*', getter: c => c.abatementDateTime || 'N/A' }
      ],
      rows: conditions,
      keyFn: c => c.id
  };
}

class VaccinationsVisualizer extends GenericVisualizer {
  static defaultProps = {
    title: 'Conditions',
    columns: [
        { title: 'SNOMED', versions: '*', getter: c => c.code.coding[0].code },
        { title: 'Condition', versions: '*', getter: c => c.code.coding[0].display },
        { title: 'Date of Onset', versions: '*', getter: c => c.onsetDateTime },
        { title: 'Date Resolved', 'versions': '*', getter: c => c.abatementDateTime || 'N/A' }
      ],
      rows: conditions,
      keyFn: c => c.id
  };
}

export {
	PatientVisualizer,
	ConditionsVisualizer,
  ObservationsVisualizer,
  ReportsVisualizer,
  MedicationsVisualizer,
  AllergiesVisualizer,
  CarePlansVisualizer,
  ProceduresVisualizer,
  EncountersVisualizer,
  VaccinationsVisualizer

};