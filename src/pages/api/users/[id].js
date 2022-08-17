import Joi from 'joi'
import nextConnect from 'next-connect'
import User from '../../../../models/User'
import connectDB from '../../../../lib/db'
import withJWT from '../../../../lib/middleware/withJWT'
import { errorWrapper } from '../../../../helpers/index'

const handler = nextConnect()

handler.get(
  withJWT(async (req, res) => {
    const {
      query: { id }
    } = req

    await connectDB()
    try {
      await issetUser(id, res)
      const user = await User.findById(id)
      res.status(200).json({
        status: 'success',
        user
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

const updatedUserSchema = Joi.object({
  email: Joi.string().email().trim(),
  name: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string(),
  companyId: Joi.string(),
  status: Joi.number(),
  role: Joi.number()
}).required()
handler.put(
  withJWT(async (req, res) => {
    const {
      query: { id },
      body: userToUpdate
    } = req
    try {
      await connectDB()
      await issetUser(id, res)
      const validatedBody = await updatedUserSchema.validateAsync(userToUpdate)

      const user = await User.findByIdAndUpdate(id, { $set: validatedBody }).then(updatedUser => {
        return User.findById(updatedUser._id)
      })
      res.status(200).json({
        status: 'success',
        user
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

handler.delete(
  withJWT(async (req, res) => {
    const {
      query: { id }
    } = req

    try {
      await connectDB()
      await issetUser(id, res)

      await User.findByIdAndRemove(id)
      res.status(200).json({
        status: 'success',
        message: 'The user has been removed'
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

async function issetUser(id, res) {
  const issetUser = await User.findById(id)
  if (!issetUser) {
    res.status(404).json({ success: 'error', message: 'Not found' })
  }
}

export default handler
