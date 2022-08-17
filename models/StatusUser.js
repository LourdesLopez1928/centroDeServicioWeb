import mongoose from 'mongoose'

const StatusUserSchema = new mongoose.Schema({

name:String,
type:Number,
createdAt: {
    type: Date,
    default: Date.now
}
})

module.exports = mongoose.models.StatusUser || mongoose.model('StatusUser', StatusUserSchema)