import mongoose from 'mongoose'

const StatusOrderSchema = new mongoose.Schema({

name:String,
type:Number,
createdAt: {
    type: Date,
    default: Date.now
}
})

module.exports = mongoose.models.StatusOrder || mongoose.model('StatusOrder', StatusOrderSchema)