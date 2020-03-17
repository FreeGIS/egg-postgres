'use strict';

module.exports = function(app) {
  const { controller } = app;
  app.get('/', controller.home.index);
};
