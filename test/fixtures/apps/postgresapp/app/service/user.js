'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async list() {
     const { app } = this;
     const {rows} = await app.postgres.query('select * from npm_auth');
     return rows;
  }
}

module.exports = UserService;
