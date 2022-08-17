import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({

name:String,
type:Number,
createdAt: {
    type: Date,
    default: Date.now
}
})

module.exports = mongoose.models.Roles || mongoose.model('Roles', RoleSchema)