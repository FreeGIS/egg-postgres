'use strict';

const postgres = require('./lib/postgres');

module.exports = app => {
  if (app.config.postgres.app) postgres(app);
};
