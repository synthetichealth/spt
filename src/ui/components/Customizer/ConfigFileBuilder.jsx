import React, { memo, useState, Fragment } from 'react';
import useStyles from './styles';

import { saveFile } from './utils';


import { Paper, TextField, Autocomplete, Button, Checkbox, Switch, Select, MenuItem, Tooltip, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

export const CONFIG_OPTIONS = [
  { key: "exporter.baseDirectory", defaultValue: "./output/", 
    categories: [],
    description: "This is the base folder in which all patient records will be exported. Files will be exported to subfolders based on their type. (For example FHIR records will be stored in the /fhir/ subfolder under this folder." },
  { key: "exporter.use_uuid_filenames", defaultValue: false, type: "boolean",
    categories: [],
    description: "If true, patient records will have filenames based only on their UUID. If false, patient records will have filenames including the patient's name. This is mostly intended as a debugging feature - if watching the terminal as patients are generating, this makes it easier to find the record once it is generated." },
  { key: "exporter.subfolders_by_id_substring", defaultValue: false, type: "boolean",
    categories: [],
    description: "If true, patient records will be grouped into subfolders based on their UUID, which is a randomly generated unique identifer. This reduces the number of files in any single folder, and ensures a roughly even distribution of files among folders. However there is no correlation between files in any given folder as the IDs are random." },
  { key: "exporter.pretty_print", defaultValue: true, type: "boolean",
    categories: ['fhir'],
    description: "Exporters that use XML or JSON, such as FHIR, can disable pretty-printing to reduce filesize and speed up export." },
  { key: "exporter.years_of_history", defaultValue: "0", type: "number",
    categories: [],
    description: "The number of years of patient history to include in patient records. For example, if set to 5, then all patient history older than 5 years old (from the time you execute the program) will not be included in the exported records. Note that conditions and medications that are currently active will still be exported, regardless of this setting. Set this to 0 to keep all history in the patient record." },
  { key: "exporter.split_records", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.split_records.duplicate_data", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.metadata.export", defaultValue: true, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.ccda.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "Change this setting to true to enable exporting patients in CCDA format." },
  { key: "exporter.fhir.export", defaultValue: true, type: "boolean",
    categories: [],
    description: "Change this setting to false to disable exporting patients in FHIR R4 format." },
  { key: "exporter.fhir_stu3.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "Change this setting to true to enable exporting patients in FHIR DSTU2 format." },
  { key: "exporter.fhir_dstu2.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "Change this setting to true to enable exporting patients in FHIR DSTU2 format." },
  { key: "exporter.fhir.use_shr_extensions", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.fhir.use_us_core_ig", defaultValue: true, type: "boolean",
    categories: ['fhir'],
    description: "Enable this setting to make exported resources conform to the US Core Implementation Guide for FHIR R4" },
  { key: "exporter.fhir.us_core_version", defaultValue: "5.0.1",
    categories: ['fhir'],
    description: "" },
  { key: "exporter.fhir.transaction_bundle", defaultValue: true, type: "boolean",
    categories: ['fhir'],
    description: "" },
  { key: "exporter.fhir.bulk_data", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.fhir.included_resources", defaultValue: "",
    categories: ['fhir'],
    description: "" },
  { key: "exporter.fhir.excluded_resources", defaultValue: "",
    categories: ['fhir'],
    description: "" },
  { key: "exporter.groups.fhir.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.hospital.fhir.export", defaultValue: true, type: "boolean",
    categories: [],
    description: "Change this setting to false to disable exporting hospital information in FHIR R4 format." },
  { key: "exporter.hospital.fhir_stu3.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "Change this setting to true to enable exporting hospital information in FHIR STU3 format." },
  { key: "exporter.hospital.fhir_dstu2.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "Change this setting to true to enable exporting hospital information in FHIR DSTU2 format." },
  { key: "exporter.practitioner.fhir.export", defaultValue: true, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.practitioner.fhir_stu3.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.practitioner.fhir_dstu2.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.encoding", defaultValue: "UTF-8",
    categories: [],
    description: "" },
  { key: "exporter.json.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.json.include_module_history", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.csv.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "Change this setting to true to enable exporting patient data in a comma-separated value format." },
  { key: "exporter.csv.append_mode", defaultValue: false, type: "boolean",
    categories: ['csv'],
    description: "Change this setting to true to enable append mode for the CSV exporter, where all new runs will be appended onto the existing CSV records, rather than overwriting the files. For instance, this could be used to help produce a single set of CSVs spanning patients across multiple states, since only one state can be run at a time." },
  { key: "exporter.csv.folder_per_run", defaultValue: false, type: "boolean",
    categories: ['csv'],
    description: "Change this setting to true to enable exporting CSVs in a separate subfolder per run of Synthea. Currently the CSVs get reset each time, so if you want to keep a run you have to specifically copy it off somewhere else. This option makes CSVs more like other export formats in that files will persist until manually deleted. Note that this setting will supersede exporter.csv.append_mode if both are true" },
  { key: "exporter.csv.included_files", defaultValue: "",
    categories: ['csv'],
    description: "" },
  { key: "exporter.csv.excluded_files", defaultValue: "patient_expenses.csv",
    categories: ['csv'],
    description: "" },
  { key: "exporter.cpcds.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.cpcds.append_mode", defaultValue: false, type: "boolean",
    categories: ['cpcds'],
    description: "" },
  { key: "exporter.cpcds.folder_per_run", defaultValue: false, type: "boolean",
    categories: ['cpcds'],
    description: "" },
  { key: "exporter.cpcds.single_payer", defaultValue: false, type: "boolean",
    categories: ['cpcds'],
    description: "" },
  { key: "exporter.bfd.export", defaultValue: false, type: "boolean",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.require_code_maps", defaultValue: true, type: "boolean",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.export_missing_codes", defaultValue: true, type: "boolean",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.bene_id_start", defaultValue: "-1000000", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.clm_id_start", defaultValue: "-100000000", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.clm_grp_id_start", defaultValue: "-100000000", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.pde_id_start", defaultValue: "-100000000", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.fi_doc_cntl_num_start", defaultValue: "-100000000", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.carr_clm_cntl_num_start", defaultValue: "-100000000", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.mbi_start", defaultValue: "1S00-E00-AA00",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.hicn_start", defaultValue: "T01000000A",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.partc_contract_start", defaultValue: "Y0001",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.partc_contract_count", defaultValue: "10", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.plan_benefit_package_start", defaultValue: "800", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.plan_benefit_package_count", defaultValue: "5", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.partd_contract_start", defaultValue: "Z0001",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.partd_contract_count", defaultValue: "10", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.clia_labs_start", defaultValue: "00A0000000",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.clia_labs_count", defaultValue: "10", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.bfd.cutoff_date", defaultValue: "20140529", type: "number",
    categories: ['bfd'],
    description: "" },
  { key: "exporter.cdw.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.text.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "Change this setting to true to enable exporting patients in a simple text-based format." },
  { key: "exporter.text.per_encounter_export", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.clinical_note.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.symptoms.csv.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.symptoms.mode", defaultValue: "0", type: "number",
    categories: [],
    description: "" },
  { key: "exporter.symptoms.csv.append_mode", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.symptoms.csv.folder_per_run", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "exporter.symptoms.text.export", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "generate.default_population", defaultValue: "1", type: "number",
    categories: [],
    description: "This is the number of living patients (population size) that Synthea will generate. Synthea will generate patients until the number of living patients reaches this value." },
  { key: "generate.thread_pool_size", defaultValue: "-1", type: "number",
    categories: [],
    description: "" },
  { key: "generate.log_patients.detail", defaultValue: "simple",
    categories: [],
    description: "Controls the level of detail reported on the command line as patients are generated. Options are 'none', 'simple', or 'detailed' (without quotes). Defaults to simple if another value is used. 'none' = print nothing to the console during generation. 'simple' = print patient names. 'detailed' = print patient names, atributes, vital signs, etc., and may slow down processing." },
  { key: "generate.timestep", defaultValue: "604800000", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.default_file", defaultValue: "geography/demographics.csv",
    categories: [],
    description: "" },
  { key: "generate.geography.zipcodes.default_file", defaultValue: "geography/zipcodes.csv",
    categories: [],
    description: "" },
  { key: "generate.geography.country_code", defaultValue: "US",
    categories: [],
    description: "" },
  { key: "generate.geography.timezones.default_file", defaultValue: "geography/timezones.csv",
    categories: [],
    description: "" },
  { key: "generate.geography.foreign.birthplace.default_file", defaultValue: "geography/foreign_birthplace.json",
    categories: [],
    description: "" },
  { key: "generate.geography.sdoh.default_file", defaultValue: "geography/sdoh.csv",
    categories: [],
    description: "" },
  { key: "generate.lookup_tables", defaultValue: "modules/lookup_tables/",
    categories: [],
    description: "" },
  { key: "generate.only_dead_patients", defaultValue: false, type: "boolean",
    categories: ['common'],
    description: "" },
  { key: "generate.only_alive_patients", defaultValue: false, type: "boolean",
    categories: ['common'],
    description: "" },
  { key: "generate.max_attempts_to_keep_patient", defaultValue: "1000", type: "number",
    categories: ['keep'],
    description: "" },
  { key: "generate.track_detailed_transition_metrics", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "generate.append_numbers_to_person_names", defaultValue: true, type: "boolean",
    categories: ['common'],
    description: "" },
  { key: "generate.middle_names", defaultValue: "0.80", type: "number",
    categories: [],
    description: "" },
  { key: "generate.veteran_population_override", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.weights.income", defaultValue: "0.2", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.weights.education", defaultValue: "0.7", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.weights.occupation", defaultValue: "0.1", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.score.low", defaultValue: "0.0", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.score.middle", defaultValue: "0.25", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.score.high", defaultValue: "0.66", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.education.less_than_hs.min", defaultValue: "0.0", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.education.less_than_hs.max", defaultValue: "0.5", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.education.hs_degree.min", defaultValue: "0.1", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.education.hs_degree.max", defaultValue: "0.75", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.education.some_college.min", defaultValue: "0.3", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.education.some_college.max", defaultValue: "0.85", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.education.bs_degree.min", defaultValue: "0.5", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.education.bs_degree.max", defaultValue: "1.0",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.income.poverty", defaultValue: "12880", type: "number",
    categories: [],
    description: "" },
  { key: "generate.demographics.socioeconomic.income.high", defaultValue: "75000", type: "number",
    categories: [],
    description: "" },
  { key: "generate.birthweights.default_file", defaultValue: "birthweights.csv",
    categories: [],
    description: "" },
  { key: "generate.birthweights.logging", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "generate.insurance.mandate.year", defaultValue: "2006", type: "number",
    categories: [],
    description: "" },
  { key: "generate.insurance.mandate.occupation", defaultValue: "0.2", type: "number",
    categories: [],
    description: "" },
  { key: "generate.costs.default_procedure_cost", defaultValue: "500.00",
    categories: [],
    description: "" },
  { key: "generate.costs.default_medication_cost", defaultValue: "255.00",
    categories: [],
    description: "" },
  { key: "generate.costs.default_encounter_cost", defaultValue: "125.00",
    categories: [],
    description: "" },
  { key: "generate.costs.default_immunization_cost", defaultValue: "136.00",
    categories: [],
    description: "" },
  { key: "generate.costs.default_lab_cost", defaultValue: "100.00",
    categories: [],
    description: "" },
  { key: "generate.costs.default_device_cost", defaultValue: "0.00", type: "number",
    categories: [],
    description: "" },
  { key: "generate.costs.default_supply_cost", defaultValue: "0.00", type: "number",
    categories: [],
    description: "" },
  { key: "generate.providers.hospitals.default_file", defaultValue: "providers/hospitals.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.longterm.default_file", defaultValue: "providers/longterm.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.nursing.default_file", defaultValue: "providers/nursing.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.rehab.default_file", defaultValue: "providers/rehab.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.hospice.default_file", defaultValue: "providers/hospice.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.dialysis.default_file", defaultValue: "providers/dialysis.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.homehealth.default_file", defaultValue: "providers/home_health_agencies.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.veterans.default_file", defaultValue: "providers/va_facilities.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.urgentcare.default_file", defaultValue: "providers/urgent_care_facilities.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.primarycare.default_file", defaultValue: "providers/primary_care_facilities.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.ihs.hospitals.default_file", defaultValue: "providers/ihs_facilities.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.ihs.primarycare.default_file", defaultValue: "providers/ihs_centers.csv",
    categories: [],
    description: "" },
  { key: "generate.providers.selection_behavior", defaultValue: "nearest",
    categories: [],
    description: "" },
  { key: "generate.providers.default_to_hospital_on_failure", defaultValue: true, type: "boolean",
    categories: [],
    description: "" },
  { key: "generate.providers.minimum", defaultValue: "1", type: "number",
    categories: [],
    description: "" },
  { key: "generate.providers.maximum_search_distance", defaultValue: "1000", type: "number",
    categories: [],
    description: "" },
  { key: "generate.payers.insurance_companies.default_file", defaultValue: "payers/insurance_companies.csv",
    categories: [],
    description: "" },
  { key: "generate.payers.insurance_plans.default_file", defaultValue: "payers/insurance_plans.csv",
    categories: [],
    description: "" },
  { key: "generate.payers.insurance_plans.eligibilities_file", defaultValue: "payers/insurance_eligibilities.csv",
    categories: [],
    description: "" },
  { key: "generate.payers.insurance_companies.medicare", defaultValue: "Medicare",
    categories: [],
    description: "" },
  { key: "generate.payers.insurance_companies.medicaid", defaultValue: "Medicaid",
    categories: [],
    description: "" },
  { key: "generate.payers.insurance_companies.dual_eligible", defaultValue: "Dual Eligible",
    categories: [],
    description: "" },
  { key: "generate.payers.insurance_plans.income_premium_ratio", defaultValue: "0.13", type: "number",
    categories: [],
    description: "" },
  { key: "generate.payers.selection_behavior", defaultValue: "priority",
    categories: [],
    description: "" },
  { key: "generate.payers.adjustment_behavior", defaultValue: "none",
    categories: [],
    description: "" },
  { key: "generate.payers.adjustment_rate", defaultValue: "0.10", type: "number",
    categories: [],
    description: "" },
  { key: "generate.payers.loss_of_care", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "lifecycle.quit_smoking.baseline", defaultValue: "0.01", type: "number",
    categories: [],
    description: "" },
  { key: "lifecycle.quit_smoking.timestep_delta", defaultValue: "-0.01", type: "number",
    categories: [],
    description: "" },
  { key: "lifecycle.quit_smoking.smoking_duration_factor_per_year", defaultValue: "1.0",
    categories: [],
    description: "" },
  { key: "lifecycle.quit_alcoholism.baseline", defaultValue: "0.001", type: "number",
    categories: [],
    description: "" },
  { key: "lifecycle.quit_alcoholism.timestep_delta", defaultValue: "-0.001", type: "number",
    categories: [],
    description: "" },
  { key: "lifecycle.quit_alcoholism.alcoholism_duration_factor_per_year", defaultValue: "1.0",
    categories: [],
    description: "" },
  { key: "lifecycle.adherence.baseline", defaultValue: "0.05", type: "number",
    categories: [],
    description: "" },
  { key: "lifecycle.death_by_natural_causes", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "lifecycle.death_by_loss_of_care", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "physiology.generators.enabled", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "physiology.state.enabled", defaultValue: false, type: "boolean",
    categories: [],
    description: "" },
  { key: "growtherrors", defaultValue: false, type: "boolean",
    categories: [],
    description: "" }

];

export const buildConfigFile = (configState) => {
  const configLines = [];
  for (const configOpt of CONFIG_OPTIONS) {
    const key = configOpt.key;
    const value = configState[key];
    if (value == null || value === configOpt.defaultValue) {
      continue;
    }

    configLines.push(key + ' = ' + value.toString().trim());
  }
  if (configLines.length > 0) {
    return configLines.join('\n');
  } else {
    return null;
  }
};

const intersection = (list1, list2) => {
  // https://stackoverflow.com/a/1885569
  return list1.filter(value => list2.includes(value));
}

const ConfigFileBuilder = (props) => {
  const classes = useStyles();
  const settings = CONFIG_OPTIONS.map(o => o.key);

  const { config, setConfig, configAsArgs, setConfigAsArgs, targetedCategories } = props;

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

    if (targetedCategories) {
      // if we are using the "targeted" version, show all targeted fields for the selected categories
      if (intersection(targetedCategories, configOpt.categories).length == 0) {
        continue;
      }
    } else if (config[key] == null) {
      // if not using the targeted version, show only the currently modified ones
      continue;
    }

    if (configOpt.type == 'boolean') {
      fields.push((<Fragment key={key}>
                    {key}
                      <Checkbox 
                        id={key} 
                        name={key} 
                        label={key}
                        defaultChecked={configOpt.defaultValue}
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

  return (
    <div className={classes.collection}>
     { !targetedCategories && (
     <Fragment>
     <h3>Config Builder</h3> 
     <Stack direction="row" spacing={3}>
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

        <Button variant="outlined" onClick={addSelectedConfigAsModified} style={{textTransform: "none"}}>Add Config</Button>
      </Stack>
      <br/>
      </Fragment>
      )}


      { fields }
      <br/>

      { !targetedCategories && (<Fragment>
      Use Custom Config File <Switch onChange={e => setConfigAsArgs(e.target.checked)} /> Set Config Directly in Dockerfile
      <br />
      <br />
      </Fragment>) }

      { !configAsArgs && !targetedCategories && <Button variant="outlined" onClick={() => saveFile(buildConfigFile(config), 'synthea.properties')} style={{textTransform: "none"}}>Download Config File</Button> }
    </div>
  );
}

export default memo(ConfigFileBuilder);
