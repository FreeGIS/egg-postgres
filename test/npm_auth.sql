DROP TABLE IF EXISTS npm_auth;
CREATE TABLE npm_auth (
  id serial primary key,
  user_id text,
  "desc" text,
  "password" text
);
