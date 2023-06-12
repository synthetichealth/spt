import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';

import { saveFile } from './utils';


import { Paper, TextField, Autocomplete, Button, Checkbox, Switch, Select, MenuItem, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export const CONFIG_OPTIONS = [
  { key: "exporter.baseDirectory", defaultValue: "./output/", 
    description: "This is the base folder in which all patient records will be exported. Files will be exported to subfolders based on their type. (For example FHIR records will be stored in the /fhir/ subfolder under this folder." },
  { key: "exporter.use_uuid_filenames", defaultValue: "false", type: "boolean" },
  { key: "exporter.subfolders_by_id_substring", defaultValue: "false", type: "boolean" },
  { key: "exporter.years_of_history", defaultValue: "0", type: "number" },
  { key: "exporter.split_records", defaultValue: "false", type: "boolean" },
  { key: "exporter.split_records.duplicate_data", defaultValue: "false", type: "boolean" },
  { key: "exporter.metadata.export", defaultValue: "true", type: "boolean" },
  { key: "exporter.ccda.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.fhir.export", defaultValue: "true", type: "boolean" },
  { key: "exporter.fhir_stu3.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.fhir_dstu2.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.fhir.use_shr_extensions", defaultValue: "false", type: "boolean" },
  { key: "exporter.fhir.use_us_core_ig", defaultValue: "true", type: "boolean" },
  { key: "exporter.fhir.us_core_version", defaultValue: "5.0.1" },
  { key: "exporter.fhir.transaction_bundle", defaultValue: "true", type: "boolean" },
  { key: "exporter.fhir.bulk_data", defaultValue: "false", type: "boolean" },
  { key: "exporter.fhir.included_resources", defaultValue: "" },
  { key: "exporter.fhir.excluded_resources", defaultValue: "" },
  { key: "exporter.groups.fhir.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.hospital.fhir.export", defaultValue: "true", type: "boolean" },
  { key: "exporter.hospital.fhir_stu3.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.hospital.fhir_dstu2.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.practitioner.fhir.export", defaultValue: "true", type: "boolean" },
  { key: "exporter.practitioner.fhir_stu3.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.practitioner.fhir_dstu2.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.encoding", defaultValue: "UTF-8" },
  { key: "exporter.json.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.json.include_module_history", defaultValue: "false", type: "boolean" },
  { key: "exporter.csv.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.csv.append_mode", defaultValue: "false", type: "boolean" },
  { key: "exporter.csv.folder_per_run", defaultValue: "false", type: "boolean" },
  { key: "exporter.csv.included_files", defaultValue: "" },
  { key: "exporter.csv.excluded_files", defaultValue: "patient_expenses.csv" },
  { key: "exporter.cpcds.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.cpcds.append_mode", defaultValue: "false", type: "boolean" },
  { key: "exporter.cpcds.folder_per_run", defaultValue: "false", type: "boolean" },
  { key: "exporter.cpcds.single_payer", defaultValue: "false", type: "boolean" },
  { key: "exporter.bfd.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.bfd.require_code_maps", defaultValue: "true", type: "boolean" },
  { key: "exporter.bfd.export_missing_codes", defaultValue: "true", type: "boolean" },
  { key: "exporter.bfd.bene_id_start", defaultValue: "-1000000", type: "number" },
  { key: "exporter.bfd.clm_id_start", defaultValue: "-100000000", type: "number" },
  { key: "exporter.bfd.clm_grp_id_start", defaultValue: "-100000000", type: "number" },
  { key: "exporter.bfd.pde_id_start", defaultValue: "-100000000", type: "number" },
  { key: "exporter.bfd.fi_doc_cntl_num_start", defaultValue: "-100000000", type: "number" },
  { key: "exporter.bfd.carr_clm_cntl_num_start", defaultValue: "-100000000", type: "number" },
  { key: "exporter.bfd.mbi_start", defaultValue: "1S00-E00-AA00" },
  { key: "exporter.bfd.hicn_start", defaultValue: "T01000000A" },
  { key: "exporter.bfd.partc_contract_start", defaultValue: "Y0001" },
  { key: "exporter.bfd.partc_contract_count", defaultValue: "10", type: "number" },
  { key: "exporter.bfd.plan_benefit_package_start", defaultValue: "800", type: "number" },
  { key: "exporter.bfd.plan_benefit_package_count", defaultValue: "5", type: "number" },
  { key: "exporter.bfd.partd_contract_start", defaultValue: "Z0001" },
  { key: "exporter.bfd.partd_contract_count", defaultValue: "10", type: "number" },
  { key: "exporter.bfd.clia_labs_start", defaultValue: "00A0000000" },
  { key: "exporter.bfd.clia_labs_count", defaultValue: "10", type: "number" },
  { key: "exporter.bfd.cutoff_date", defaultValue: "20140529", type: "number" },
  { key: "exporter.cdw.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.text.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.text.per_encounter_export", defaultValue: "false", type: "boolean" },
  { key: "exporter.clinical_note.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.symptoms.csv.export", defaultValue: "false", type: "boolean" },
  { key: "exporter.symptoms.mode", defaultValue: "0", type: "number" },
  { key: "exporter.symptoms.csv.append_mode", defaultValue: "false", type: "boolean" },
  { key: "exporter.symptoms.csv.folder_per_run", defaultValue: "false", type: "boolean" },
  { key: "exporter.symptoms.text.export", defaultValue: "false", type: "boolean" },
  { key: "generate.default_population", defaultValue: "1", type: "number" },
  { key: "generate.thread_pool_size", defaultValue: "-1", type: "number" },
  { key: "generate.log_patients.detail", defaultValue: "simple" },
  { key: "generate.timestep", defaultValue: "604800000", type: "number" },
  { key: "generate.demographics.default_file", defaultValue: "geography/demographics.csv" },
  { key: "generate.geography.zipcodes.default_file", defaultValue: "geography/zipcodes.csv" },
  { key: "generate.geography.country_code", defaultValue: "US" },
  { key: "generate.geography.timezones.default_file", defaultValue: "geography/timezones.csv" },
  { key: "generate.geography.foreign.birthplace.default_file", defaultValue: "geography/foreign_birthplace.json" },
  { key: "generate.geography.sdoh.default_file", defaultValue: "geography/sdoh.csv" },
  { key: "generate.lookup_tables", defaultValue: "modules/lookup_tables/" },
  { key: "generate.only_dead_patients", defaultValue: "false", type: "boolean" },
  { key: "generate.only_alive_patients", defaultValue: "false", type: "boolean" },
  { key: "generate.max_attempts_to_keep_patient", defaultValue: "1000", type: "number" },
  { key: "generate.track_detailed_transition_metrics", defaultValue: "false", type: "boolean" },
  { key: "generate.append_numbers_to_person_names", defaultValue: "true", type: "boolean" },
  { key: "generate.middle_names", defaultValue: "0.80", type: "number" },
  { key: "generate.veteran_population_override", defaultValue: "false", type: "boolean" },
  { key: "generate.demographics.socioeconomic.weights.income", defaultValue: "0.2", type: "number" },
  { key: "generate.demographics.socioeconomic.weights.education", defaultValue: "0.7", type: "number" },
  { key: "generate.demographics.socioeconomic.weights.occupation", defaultValue: "0.1", type: "number" },
  { key: "generate.demographics.socioeconomic.score.low", defaultValue: "0.0", type: "number" },
  { key: "generate.demographics.socioeconomic.score.middle", defaultValue: "0.25", type: "number" },
  { key: "generate.demographics.socioeconomic.score.high", defaultValue: "0.66", type: "number" },
  { key: "generate.demographics.socioeconomic.education.less_than_hs.min", defaultValue: "0.0", type: "number" },
  { key: "generate.demographics.socioeconomic.education.less_than_hs.max", defaultValue: "0.5", type: "number" },
  { key: "generate.demographics.socioeconomic.education.hs_degree.min", defaultValue: "0.1", type: "number" },
  { key: "generate.demographics.socioeconomic.education.hs_degree.max", defaultValue: "0.75", type: "number" },
  { key: "generate.demographics.socioeconomic.education.some_college.min", defaultValue: "0.3", type: "number" },
  { key: "generate.demographics.socioeconomic.education.some_college.max", defaultValue: "0.85", type: "number" },
  { key: "generate.demographics.socioeconomic.education.bs_degree.min", defaultValue: "0.5", type: "number" },
  { key: "generate.demographics.socioeconomic.education.bs_degree.max", defaultValue: "1.0" },
  { key: "generate.demographics.socioeconomic.income.poverty", defaultValue: "12880", type: "number" },
  { key: "generate.demographics.socioeconomic.income.high", defaultValue: "75000", type: "number" },
  { key: "generate.birthweights.default_file", defaultValue: "birthweights.csv" },
  { key: "generate.birthweights.logging", defaultValue: "false", type: "boolean" },
  { key: "generate.insurance.mandate.year", defaultValue: "2006", type: "number" },
  { key: "generate.insurance.mandate.occupation", defaultValue: "0.2", type: "number" },
  { key: "generate.costs.default_procedure_cost", defaultValue: "500.00" },
  { key: "generate.costs.default_medication_cost", defaultValue: "255.00" },
  { key: "generate.costs.default_encounter_cost", defaultValue: "125.00" },
  { key: "generate.costs.default_immunization_cost", defaultValue: "136.00" },
  { key: "generate.costs.default_lab_cost", defaultValue: "100.00" },
  { key: "generate.costs.default_device_cost", defaultValue: "0.00", type: "number" },
  { key: "generate.costs.default_supply_cost", defaultValue: "0.00", type: "number" },
  { key: "generate.providers.hospitals.default_file", defaultValue: "providers/hospitals.csv" },
  { key: "generate.providers.longterm.default_file", defaultValue: "providers/longterm.csv" },
  { key: "generate.providers.nursing.default_file", defaultValue: "providers/nursing.csv" },
  { key: "generate.providers.rehab.default_file", defaultValue: "providers/rehab.csv" },
  { key: "generate.providers.hospice.default_file", defaultValue: "providers/hospice.csv" },
  { key: "generate.providers.dialysis.default_file", defaultValue: "providers/dialysis.csv" },
  { key: "generate.providers.homehealth.default_file", defaultValue: "providers/home_health_agencies.csv" },
  { key: "generate.providers.veterans.default_file", defaultValue: "providers/va_facilities.csv" },
  { key: "generate.providers.urgentcare.default_file", defaultValue: "providers/urgent_care_facilities.csv" },
  { key: "generate.providers.primarycare.default_file", defaultValue: "providers/primary_care_facilities.csv" },
  { key: "generate.providers.ihs.hospitals.default_file", defaultValue: "providers/ihs_facilities.csv" },
  { key: "generate.providers.ihs.primarycare.default_file", defaultValue: "providers/ihs_centers.csv" },
  { key: "generate.providers.selection_behavior", defaultValue: "nearest" },
  { key: "generate.providers.default_to_hospital_on_failure", defaultValue: "true", type: "boolean" },
  { key: "generate.providers.minimum", defaultValue: "1", type: "number" },
  { key: "generate.providers.maximum_search_distance", defaultValue: "1000", type: "number" },
  { key: "generate.payers.insurance_companies.default_file", defaultValue: "payers/insurance_companies.csv" },
  { key: "generate.payers.insurance_plans.default_file", defaultValue: "payers/insurance_plans.csv" },
  { key: "generate.payers.insurance_plans.eligibilities_file", defaultValue: "payers/insurance_eligibilities.csv" },
  { key: "generate.payers.insurance_companies.medicare", defaultValue: "Medicare" },
  { key: "generate.payers.insurance_companies.medicaid", defaultValue: "Medicaid" },
  { key: "generate.payers.insurance_companies.dual_eligible", defaultValue: "Dual Eligible" },
  { key: "generate.payers.insurance_plans.income_premium_ratio", defaultValue: "0.13", type: "number" },
  { key: "generate.payers.selection_behavior", defaultValue: "priority" },
  { key: "generate.payers.adjustment_behavior", defaultValue: "none" },
  { key: "generate.payers.adjustment_rate", defaultValue: "0.10", type: "number" },
  { key: "generate.payers.loss_of_care", defaultValue: "false", type: "boolean" },
  { key: "lifecycle.quit_smoking.baseline", defaultValue: "0.01", type: "number" },
  { key: "lifecycle.quit_smoking.timestep_delta", defaultValue: "-0.01", type: "number" },
  { key: "lifecycle.quit_smoking.smoking_duration_factor_per_year", defaultValue: "1.0" },
  { key: "lifecycle.quit_alcoholism.baseline", defaultValue: "0.001", type: "number" },
  { key: "lifecycle.quit_alcoholism.timestep_delta", defaultValue: "-0.001", type: "number" },
  { key: "lifecycle.quit_alcoholism.alcoholism_duration_factor_per_year", defaultValue: "1.0" },
  { key: "lifecycle.adherence.baseline", defaultValue: "0.05", type: "number" },
  { key: "lifecycle.death_by_natural_causes", defaultValue: "false", type: "boolean" },
  { key: "lifecycle.death_by_loss_of_care", defaultValue: "false", type: "boolean" },
  { key: "physiology.generators.enabled", defaultValue: "false", type: "boolean" },
  { key: "physiology.state.enabled", defaultValue: "false", type: "boolean" },
  { key: "growtherrors", defaultValue: "false", type: "boolean" }

];

export const buildConfigFile = (configState) => {
  const configLines = [];
  for (const configOpt of CONFIG_OPTIONS) {
      const key = configOpt.key;
      const value = configState[key];
      if (value == null) {
        continue;
      }

      configLines.push(key + ' = ' + value.trim());
    }
    return configLines.join('\n');
};

const ConfigFileBuilder = (props) => {
  const classes = useStyles();
  const settings = CONFIG_OPTIONS.map(o => o.key);

  const { config, setConfig, configAsArgs, setConfigAsArgs } = props;

  const [selected, setSelected] = useState();

  const addSelectedConfigAsModified = () => {
    if (!selected) return;
    const defaultValue = CONFIG_OPTIONS.find(e => e.key === selected.key).defaultValue;
    setConfig({
      ...config,
      [selected.key]: defaultValue
    });
  };
  const handleChangeText = (evt) => {
    debugger;
    setConfig({
      ...config,
      [evt.target.name]: evt.target.value
    });
  }

  const handleChangeBoolean = (evt) => {
    setConfig({
      ...config,
      [evt.target.name]: evt.target.checked.toString()
    });
  }

  const fields = [];

  for (const configOpt of CONFIG_OPTIONS) {
    const key = configOpt.key;
    if (config[key] == null) {
      continue;
    }

    if (configOpt.type == 'boolean') {
      fields.push((<Fragment key={key}>
                    {key}
                      <Checkbox 
                        id={key} 
                        name={key} 
                        label={key}
                        defaultValue={configOpt.defaultValue}
                        onChange={handleChangeBoolean} />
                      <Tooltip title={configOpt.description} disableInteractive>
                        <span>
                          <Button disabled><InfoIcon fontSize="small" /></Button>
                        </span>
                      </Tooltip>
                      <br />
                    </Fragment>));
    } else {
      fields.push((<Fragment key={key} >
                     <TextField 
                        id={key} 
                        name={key} 
                        type={configOpt.type} 
                        label={key}
                        defaultValue={configOpt.defaultValue}
                        variant="outlined"
                        onChange={handleChangeText} 
                        />
                      <Tooltip title={configOpt.description} disableInteractive>
                        <span>
                          <Button disabled><InfoIcon fontSize="small" /></Button>
                        </span>
                      </Tooltip>
                      <br />
                    </Fragment>));

    }
  }

  return (<div className={classes.collection}> 
   <h3>Config Builder</h3> 
   <br />
   Use Custom Config File <Switch onChange={e => setConfigAsArgs(e.target.checked)} /> Set Config via Command Line Args <br />
   <div style={{
          display: 'flex',
          alignItems: 'center'
         }}>
   <Autocomplete
      disablePortal
      sx={{ width: 600 }}
      onChange={(event, value) => setSelected(value)}
      id="combo-box-demo"
      options={CONFIG_OPTIONS}
      renderInput={(params) => <TextField {...params} label="Choose Setting" />}
      getOptionLabel={(option) => option.key}
      renderOption={(props, option, state) => <li {...props}>{option.key}&nbsp;&nbsp;&nbsp;<br /><span style={{fontSize:"0.8em"}}>{option.description || ""}</span></li> }
    />
    <Button variant="text" onClick={addSelectedConfigAsModified}>+</Button></div>
    <br/>
    { fields }
    <br/>
    { !configAsArgs && <Button variant="text" onClick={() => saveFile(buildConfigFile(config), 'synthea.properties')}>Download</Button> }
    </div>);
}

export default memo(ConfigFileBuilder);