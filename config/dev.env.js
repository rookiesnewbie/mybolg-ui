'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://127.0.0.1:8088"',
  // BASE_API: '"http://123.56.147.137:8088"',
  // BASE_API: '"http://ltlee.cn:8088"',

})
