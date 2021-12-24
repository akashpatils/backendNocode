const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = new Schema(
{
    // formId: { type: String, required: true },
    title: { type: String, required: true },
    formJson: { type: [String], required: true }
},
{ timestamps: true },
)


module.exports = mongoose.model('userSubmission', Users)