const fs = require('fs');
require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: 'wcjjqrlziwspwa',
    password: '39e574dc77f819b98224072e80aab452f57a1e93be2f4c610edf26e43433aa88',
    database: 'd5sm3dhc7c5c85',
    host: 'ec2-3-228-75-39.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
    }
  }
};