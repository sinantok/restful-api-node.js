const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://sinantok:123456s@ds023603.mlab.com:23603/heroku_2mhnkxv7', {useMongoClient: true});

    mongoose.connection.on('open', () => {
        console.log('mongo connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('mongo error', err);
    });

    mongoose.Promise = global.Promise;

};