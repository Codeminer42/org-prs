require('babel-core/register');
require('babel-polyfill');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

require('./app/server');
