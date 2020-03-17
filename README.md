# egg-postgres

PostgreSQL 插件是为 egg 提供 PostgreSQL 数据库访问的功能

此插件基于 [node-postgres](https://node-postgres.com/) 实现一个简单的配置封装，具体使用方法你还需要阅读 [node-postgres] 的文档。

## 安装

```bash
$ npm i egg-postgres --save
```

## 配置

通过 `config/plugin.js` 配置启动 PostgreSQL 插件:

```js
exports.postgres = {
  enable: true,
  package: 'egg-postgres',
};
```

在 `config/config.${env}.js` 配置各个环境的数据库连接信息：

### 单数据源

```js
exports.postgres = {
  // 单数据库信息配置
  client: {
    // host
    host: 'pg.com',
    // 端口号
    port: '15432',
    // 用户名
    user: 'test_user',
    // 密码
    password: 'test_password',
    // 数据库名
    database: 'test',    
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
```

使用方式：

```js
app.postgres.query(sql, values); // 单实例可以直接通过 app.postgres 访问
```

### 多数据源

```js
exports.postgres = {
  clients: {
    // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
    db1: {
      // host
      host: 'pg.com',
      // 端口号
      port: '15432',
      // 用户名
      user: 'test_user',
      // 密码
      password: 'test_password',
      // 数据库名
      database: 'test',
    },
    // ...
  },
  // 所有数据库配置的默认值
  default: {
    // 连接池最大数量
    max: 20,
    // 查询超时
    idleTimeoutMillis: 30000,
    // 连接超时
    connectionTimeoutMillis: 2000,
  },

  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
```

使用方式：

```js
const client1 = app.postgres.get('db1');
client1.query(sql, values);

const client2 = app.postgres.get('db2');
client2.query(sql, values);
```

## 扩展

### app.js

#### app.postgres

如果开启了 `config.postgres.app = true`，则会在 app 上注入 [node-postgres] 客户端 的 [Singleton 单例](https://github.com/eggjs/egg/blob/master/lib/core/singleton.js)。

```js
app.postgres.query(sql);
app.postgres.get('db1').query(sql);
```

### agent.js

#### agent.postgres

如果开启了 `config.postgres.agent = true`，则会在 agent 上注入 [node-postgres] 客户端 的 [Singleton 单例](https://github.com/eggjs/egg/blob/master/lib/core/singleton.js)。

```js
agent.postgres.query(sql);
agent.postgres.get('db1').query(sql);
```

## CRUD 使用指南

### Create

```js
// 插入
const result = await app.postgres.query('insert into t_user(name,age) values ($1,$2)',['张三',13]);
//计算数据库受影响记录
const insertSuccess = result.rowCount === 1;
```

### Read

```js
const {rows} = await app.postgres.query('select * from t_user where age=$1', [13]);
```

### Update

```js
const result= await app.postgres.query('update t_user set age=$1 where name=$2', [15,'张三']);
//计算数据库受影响记录
const updateSuccess = result.rowCount === 1;
```

### Delete

```js
const result= await app.postgres.query('delete from t_user');
//计算数据库受影响记录
const deleteSuccess = result.rowCount === 1;
```


## License

[MIT](LICENSE)


[node-postgres]: https://node-postgres.com/
