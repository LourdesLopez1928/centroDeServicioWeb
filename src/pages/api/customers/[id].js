import Joi from 'joi'
import nextConnect from 'next-connect'
import Customer from '../../../../models/Customer'
import connectDB from '../../../../lib/db'
import withJWT from '../../../../lib/middleware/withJWT'
import { set as _set, get as _get } from 'lodash'
import { errorWrapper } from '../../../../helpers/index'

const handler = nextConnect()

handler.get(
  withJWT(async (req, res) => {
    const {
      query: { id }
    } = req

    await connectDB()
    try {

      await issetCustomer(id, res)

      const customer = await Customer.findById(id)
      res.status(200).json({
        status: 'success',
        customer
      })
    } catch (error) {
      console.log(error)
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
      await issetCustomer(id, res)

      const validatedBody = await updatedUserSchema.validateAsync(userToUpdate)
      const currentCustomer = await Customer.findById(id)
      _set(
        validatedBody,
        'fullName',
        `${_get(validatedBody, 'name', _get(currentCustomer, 'name'))} ${_get(
          validatedBody,
          'lastName',
          _get(currentCustomer, 'lastName')
        )}`
      )
      await connectDB()

      const customer = await Customer.findByIdAndUpdate(id, { $set: validatedBody }).then(updatedUser => {
        return Customer.findById(updatedUser._id)
      })
      res.status(200).json({
        status: 'success',
        customer
      })
    } catch (error) {
      console.log(error)
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

handler.delete(
  withJWT(async (req, res) => {
    const {
      query: { id }
    } = req

    await connectDB()
    try {
      await issetCustomer(id, res)
      
      await Customer.findByIdAndUpdate(id, { $set: { status: 0 } }).then(updatedCustomer => {
        return updatedCustomer
      })
      res.status(200).json({
        status: 'success',
        message: 'The customer has been removed'
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)


async function issetCustomer(id, res) {
  const issetCustomer = await Customer.findById(id)
  if (!issetCustomer) {
    res.status(404).json({ success: 'error', message: "Not found"})
  }
}

export default handler
