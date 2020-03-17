'use strict';

exports.postgres = {
  default: {
    // 连接池最大数量
    max: 20,
    // 查询超时
    idleTimeoutMillis: 30000,
    // 连接超时
    connectionTimeoutMillis: 2000,
  },
  app: true,
  agent: false,

  // 单数据库配置
  // client: {
  //   host: 'host',
  //   port: 'port',
  //   user: 'user',
  //   password: 'password',
  //   database: 'database',
  // },

  // 多数据库配置
  // clients: {
  //   db1: {
  //     host: 'host',
  //     port: 'port',
  //     user: 'user',
  //     password: 'password',
  //     database: 'database',
  //   },
  //   db2: {
  //     host: 'host',
  //     port: 'port',
  //     user: 'user',
  //     password: 'password',
  //     database: 'database',
  //   },
  // },
};
