/**
 * DataAccess API:
 *
 * The goal of the DataAccess class is to abstract away differences
 * between, e.g., an in-memory-only database and a full DB client.
 * However our choice of in-memory db may already align with a DB,
 * so rather than just invent new terms for their own sake,
 * this API may look very similar to a Mongo/LokiJS API.
 *
 *
 * Create:
 * - insert(collectionName, value)
 *   @param {string} collectionName - name of the collection to add to
 *   @param {object|array} value - object to add, or array of objects to add
 *   @return {void}
 *
 * Read:
 * - select(collectionName, whereFn)
 *   @param {string} collectionName - name of the collection to search
 *   @param {function(object): boolean} whereFn - function to filter results by
 *   @return {array} - array of matching objects
 *
 * Update:
 * - update(collectionName, whereFn, updateFn)
 *   @param {string} collectionName - name of collection to update
 *   @param {function(object): boolean} whereFn - function to identify rows to update
 *   @param {function(object): void} updateFn - function to apply to matching rows
 *   @return {void}
 *
 * Delete:
 * - delete(collectionName, whereFn)
 *   @param {string} collectionName - name of collection to delete from
 *   @param {function(object): boolean} whereFn - function to identify rows to delete
 *   @return {void}
 *
 * Insert or Update:
 * - upsert(collectionName, value, whereFn)
 *   @param {string} collectionName - name of the collection to add to
 *   @param {object} value - object to add or update
 *   @param {function(object): boolean} whereFn - function to identify rows to update
 *   @return {void}
 */

// TODO: eventually we want some kind of config setting to choose the impl
const Internal = require('./impl/Internal');

const instance = new Internal();

module.exports = instance;
