#!/usr/bin/env node

const { parse } =  require('csv-parse/sync');
const fs = require('fs');

const data = fs.readFileSync("concepts.csv");

let concepts = parse(data, {
  columns: ["system", "code", "display", null /* modules */],
  bom: true, // safe to include even if the file doesn't have a BOM
  skip_empty_lines: true
});

// only keep these two systems for now, since the UI doesn't expose any way to use the other types
// (CVX and LOINC)
concepts = concepts.filter(c => c["system"] == "SNOMED-CT" || c["system"] == "RxNorm");

fs.writeFileSync("concepts.json", JSON.stringify(concepts, null, 2));