const db = require('../storage/DataAccess');
const parse = require('csv-parse');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

async function loadCsvFromDirectory(dir) {
  console.log(`loading from ${dir}`);
  glob(`${dir}/*.csv`, function(error, files) {
    // TODO error?
    if (error) console.error(error);
    files.forEach(async f => {
      console.log(f);
      const parser = fs.createReadStream(f).pipe(parse({ columns: true }));

      const extension = path.extname(f);
      const filename = path.basename(f, extension);
      // collection name is the filename
      for await (const record of parser) {
        // console.log(`inserting record into ${filename}`);
        db.insert(filename, record);
      }
      console.log(`done ${f}`);
    });
  });
}

module.exports = { loadCsvFromDirectory };
