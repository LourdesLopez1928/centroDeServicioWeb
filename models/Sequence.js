import mongoose from 'mongoose'

const SequenceSchema = new mongoose.Schema({
    Collection: String,
    Sequence: Number
},{ collection: "sequences"});

module.exports = mongoose.models.Sequence || mongoose.model('Sequence', SequenceSchema)