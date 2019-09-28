const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(//type the mongodb connection path, {useMongoClient: true});

    mongoose.connection.on('open', () => {
        console.log('mongo connected');
    });

    mongoose.connection.on('error', (err) => {
        console.log('mongo error', err);
    });

    mongoose.Promise = global.Promise;

};