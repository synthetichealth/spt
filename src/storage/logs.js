const db = require('./DataAccess');
const { LOGS, ERRORS, REQUESTS, NOTIFICATIONS } = require('./collections');
const debugConsole = require('debug');
const { v4: uuidv4 } = require('uuid');

function debug(location) {
  return message => {
    const logger = debugConsole(location);
    logger(message);
    const log = {
      id: uuidv4(),
      timestamp: Date.now(),
      message: message,
      location: location
    };
    db.insert(LOGS, log);
  };
}

function error(location) {
  return (error, notif) => {
    const logger = debugConsole(location);
    logger(error);
    const log = {
      id: uuidv4(),
      timestamp: Date.now(),
      error: error,
      location: location
    };
    db.insert(ERRORS, log);

    const notification = {
      id: uuidv4(),
      timestamp: Date.now(),
      notif: notif || error,
      viewed: false,
      type: 'error'
    };
    db.insert(NOTIFICATIONS, notification);
  };
}

function storeRequest(request) {
  const log = {
    id: uuidv4(),
    timestamp: Date.now(),
    url: request.url,
    body: request.body,
    headers: request.headers
  };
  db.insert(REQUESTS, log);
}

module.exports = { debug, error, storeRequest };
