'use strict';

const assert = require('assert');
const mm = require('egg-mock');
const utility = require('utility');

describe('test/postgres.test.js', () => {
  let app;
  const uid = utility.randomString();

  before(() => {
    console.log('a');
    app = mm.app({
      baseDir: 'apps/postgresapp',
    });
    return app.ready();
  });

  beforeEach(async () => {
    console.log('b');
    // init test datas
    try {
      await app.postgres.query(`insert into npm_auth(user_id,password) values ('egg-${uid}-1', '1');`);
      await app.postgres.query(`insert into npm_auth(user_id,password) values ('egg-${uid}-2', '2');`);
      await app.postgres.query(`insert into npm_auth(user_id,password) values ('egg-${uid}-3', '3');`);
      await app.postgres.query(`select * from npm_auth where user_id = 'egg-${uid}-3';`);
    } catch (err) {
      console.log('init test datas error: %s', err);
    }
  });

  
  afterEach(async () => {
    // 清空测试数据
    await app.postgres.query('delete from npm_auth;');
  });

  after(done => {
    app.postgres.end(err => {
      app.close();
      done(err);
    });
  });

  afterEach(mm.restore);


  it('should query limit 2', async () => {
    const { rows } = await app.postgres.query('select * from npm_auth order by id desc limit 2');
    assert(rows.length === 2);
  });

  it('should update successfully', async () => {
    const { rows } = await app.postgres.query('select * from npm_auth order by id desc limit 10');
    const result = await app.postgres.query('update npm_auth set user_id=$1 where id=$2', [ `79744-${uid}-update`, rows[0].id ]);
    assert(result.rowCount === 1);
  });

  it('should delete successfully', async () => {
    const { rows } = await app.postgres.query('select * from npm_auth order by id desc limit 10');
    const result = await app.postgres.query('delete from npm_auth where id=$1', [ rows[0].id ]);
    assert(result.rowCount === 1);
  });
});
