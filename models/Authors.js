const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name: {
        type: String,
        maxlength: 60,
        minlength: 3
    },
    surname: {
        type: String,
        maxlength: 60,
        minlength: 3
    },
    bio: {
        type: String,
        maxlength: 1000,
        minlength: 60
    },
    createdDate: {
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model('author', AuthorSchema);



