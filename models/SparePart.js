import mongoose from 'mongoose'

mongoose.models = {}

const SparePart = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
    max: 1024,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
    max: 1024
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
  description: {
    type: String,
    default: null
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

module.exports = mongoose.models.SparePart || mongoose.model('spare_parts', SparePart)
