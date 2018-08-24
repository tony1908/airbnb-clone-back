const mongoose = require('mongoose');
const environment = process.env.NODE_ENV || 'development';
const config = {
    development: 'mongodb://db:27017/myapp',
    test: 'mongodb://db:27017/test',
    production: process.env.DB_URL
}

mongoose.connect(config[environment]);

module.exports = mongoose;