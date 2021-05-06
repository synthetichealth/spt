/*
 * Options for an in-memory database include:
 * - TingoDB: https://github.com/sergeyksv/tingodb
 * - NeDB: https://github.com/louischatriot/nedb
 * - LokiJS: https://github.com/techfort/LokiJS
 * - lowdb: https://github.com/typicode/lowdb
 *
 * However most of these are not actively maintained.
 * I'm using LokiJS here because it does still see some active development.
 * Documentation is at http://techfort.github.io/LokiJS/
 */

const loki = require('lokijs');

const { markDBReady } = require('../postinit');

const isTest = process.env.NODE_ENV === 'test';

class Internal {
  constructor(persist = !isTest) {
    // By default, persist unless we are in the test environment.
    // But this can be overridden by the given arg.
    if (persist) {
      this.db = new loki('medmorph.db', {
        autoload: true,
        autoloadCallback: markDBReady,
        autosave: true,
        serializationMethod: 'pretty'
      });
    } else {
      this.db = new loki('medmorph.db');
    }
  }

  _getCollection(c) {
    let collection = this.db.getCollection(c);
    if (collection === null) {
      collection = this.db.addCollection(c, { disableMeta: true });
      // unfortunately LokiJS adds a "meta" field for metadata,
      // which could collide with the "meta" field on a FHIR resource
      // for now, just disable the LokiJS metadata, we don't need it
    }
    return collection;
  }

  insert(collectionName, value) {
    const collection = this._getCollection(collectionName);
    collection.insert(value); // may be a single object, or an array
  }

  select(collectionName, whereFn) {
    const collection = this._getCollection(collectionName);
    return collection.where(whereFn);
  }

  update(collectionName, whereFn, updateFn) {
    const collection = this._getCollection(collectionName);
    collection.updateWhere(whereFn, updateFn);
  }

  delete(collectionName, whereFn) {
    const collection = this._getCollection(collectionName);
    collection.removeWhere(whereFn);
    // note that this does not return anything. we may need to update that at some point
  }

  upsert(collectionName, value, whereFn) {
    const resultList = this.select(collectionName, whereFn);
    if (resultList.length > 0) {
      this.update(collectionName, whereFn, oldValue => Object.assign(oldValue, value));
    } else {
      this.insert(collectionName, value);
    }
  }
}

module.exports = Internal; /* constructor */
