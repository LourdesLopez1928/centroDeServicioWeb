import mongoose from 'mongoose'

const UserRolesSchema = new mongoose.Schema({


})

module.exports = mongoose.models.UserRoles || mongoose.model('UserRoles', UserRolesSchema)