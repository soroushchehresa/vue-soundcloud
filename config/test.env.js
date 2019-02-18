'use strict';
const merge = require('webpack-merge');
const devEnv = require('./dev.env');

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  SOUNDCLOUD_CLIENT_ID: '"a281614d7f34dc30b665dfcaa3ed7505"',
});
