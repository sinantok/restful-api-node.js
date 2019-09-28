const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20,
        minlength: 3
    },
    password: {
        type: String,
        maxlength: 15,
        minlength: 6
    },
    createdDate: {
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model('user', UserSchema);

