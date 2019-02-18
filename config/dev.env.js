'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SOUNDCLOUD_CLIENT_ID: '"a281614d7f34dc30b665dfcaa3ed7505"',
});
