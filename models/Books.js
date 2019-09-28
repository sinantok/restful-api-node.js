const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    author_id: Schema.Types.ObjectId,
    title: {
        type : String,
        required : [true, '`{PATH}` alani zorunludur'],
        maxlength : [15, '`{PATH}` alani `{VALUE}`, {MAXLENGTH} karakterden küçük olmalıdır.'],
        minlength : [1, '`{PATH}` alani `{VALUE}`, {MINLENGTH} karakterden büyük olmalıdır.']  
    },
    category: {
        type: String,
        maxlength: 20,
        minlength: 3
    },
    country: {
        type: String,
        maxlength: 20,
        minlength: 3
    },
    published_date: {
        type: Number
    },
    pages: {
        type: Number,
        min: 10
    },
    scoring: {
        type: Number,
        min: 0,
        max: 10
    },
    created_date: {
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model('book', BookSchema);



