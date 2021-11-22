
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:3,
        max:20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        max: 50
    },
    name:{
        type: String,
        required: true,
        max: 50
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
    university:{
        type: String,
        default: "IIIT Bhubaneswar"
    },
    category:{
        type: String,
        required: true,
    },
    branch:{
        type: String,
        required:true
    },
    collegeId:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        max:50,
        default: " "
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true
});


module.exports = mongoose.model("User", UserSchema);