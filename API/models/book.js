const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
    isbn:{
        type: Number,
        default: 11111111,
    },
    bookName:{
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: " ",
        required: true
    },
    bookSnap: {
        type: String,
        default: ""
    },
    domain: {
        type: String,
        default :" "
    },
    bookDesc: {
        type: String,
        default:""
    },
    isIssued: {
        type: Boolean,
        default: false
    },
    isReserved: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});


module.exports = mongoose.model("Book", BooksSchema);