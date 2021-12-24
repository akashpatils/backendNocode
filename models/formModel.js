const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Forms = new Schema(
{
    title: { type: String, required: true },
    submissionCount : {type:Number},
    formJson: { type: [String], required: true }
},
{ timestamps: true },
)


    

module.exports = mongoose.model('formmaster', Forms)