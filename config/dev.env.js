'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  devServer: {
    allowedHosts: [
      'liuzile.com', // 允许访问的域名地址，即花生壳内网穿透的地址
      '.liuzile.com',   // .是二级域名的通配符
      'hello.com'
    ],
  },
})
