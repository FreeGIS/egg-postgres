'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    const { service } = this;
    const users = await service.user.list();

    this.body = {
      status: 'success',
      users
    };
  }
}

module.exports = HomeController;
