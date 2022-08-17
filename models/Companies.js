import mongoose from 'mongoose'

mongoose.models = {}

const CompaniesSchema = new mongoose.Schema({

name:String,
address:String,
createdAt: {
    type: Date,
    default: Date.now
}
})

module.exports = mongoose.models.Companies || mongoose.model('Companies', CompaniesSchema)