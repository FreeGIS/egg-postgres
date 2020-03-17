'use strict';

const execSync = require('child_process').execSync;

execSync('psql -U postgres -c "create database test;"');
execSync('psql -U postgres -d test -f test/npm_auth.sql');
console.log('create table success');
