import mongoose from 'mongoose'

mongoose.models = {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: String,
  lastName: String,
  fullName: String,
  address: String,
  phone: String,
  role: Number,
  status: {
    type: Number, // 0 deleted 1 enable 2 disabled
    required: true,
    default: 1
  },
  permissions: Object,
  companyId: {
    type: mongoose.Types.ObjectId
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

module.exports = mongoose.models.User || mongoose.model('users', userSchema)
