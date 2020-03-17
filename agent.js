'use strict';

const postgres = require('./lib/postgres');

module.exports = agent => {
  if (agent.config.postgres.agent) postgres(agent);
};
