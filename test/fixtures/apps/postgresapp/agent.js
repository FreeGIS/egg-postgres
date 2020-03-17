'use strict';

const co = require('co');
const fs = require('fs');
const path = require('path');

module.exports = function(agent) {
  const done = agent.readyCallback('agent-postgres');
  const p = path.join(__dirname, 'run/agent_result.json');
  fs.existsSync(p) && fs.unlinkSync(p);

  co(async ()=>{
    const result = await agent.postgres.query('select now() as currentTime;');
    fs.writeFileSync(p, JSON.stringify(result));
  }).then(done, done);
};
