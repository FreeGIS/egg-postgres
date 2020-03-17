'use strict';

const assert = require('assert');
const { Pool } = require('pg');

let count = 0;

module.exports = app => {
  app.addSingleton('postgres', createOneClient);
};

function createOneClient(config, app) {
  console.log(config);
  assert(config.host && config.port && config.user && config.database,
    `[egg-postgres] 'host: ${config.host}', 'port: ${config.port}', 'user: ${config.user}', 'database: ${config.database}' are required on config`);

  app.coreLogger.info('[egg-postgres] connecting postgresql://%s@%s:%s/%s',
    config.user, config.host, config.port, config.database);

  const pool = new Pool(config);
  app.beforeStart(async () => {
    const { rows } = await pool.query('select now() as currentTime;');
    const index = count++;
    app.coreLogger.info(`[egg-postgres] instance[${index}] status OK, postgres currentTime: ${rows[0].currenttime}`);
  });
  return pool;
}
