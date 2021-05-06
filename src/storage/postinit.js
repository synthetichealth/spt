// This file contains some helper methods to ensure certain functions
// only run after the DB is ready.
//
// To prevent circular dependencies, this file should not require anything.

const callbacks = [];

let isReady = false;

/**
 * Register a function to run once the DB is ready.
 * If the DB is already running, this will run the given callback immediately.
 */
function runWhenDBReady(callback) {
  if (isReady) {
    // db is ready, just call it immediately
    // TODO, could make this async
    callback();
  } else {
    callbacks.push(callback);
  }
}

/**
 * Mark the DB as ready, running all previously registered callbacks.
 */
function markDBReady() {
  isReady = true;

  // TODO, could make these async as well
  callbacks.forEach(c => c());
}

module.exports = { runWhenDBReady, markDBReady };
