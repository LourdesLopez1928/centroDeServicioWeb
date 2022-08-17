import mongoose from 'mongoose'

mongoose.models = {}

const MachineSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    max: 1024
  },
  model: {
    type: String,
    required: true,
    max: 1024,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    max: 1024
  },
  status: {
    type: Number,  // 0 deleted 1 enable 2 disabled
    required: true,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.models.Machine || mongoose.model('machines', MachineSchema)
