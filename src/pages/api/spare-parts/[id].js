import Joi from 'joi'
import nextConnect from 'next-connect'
import SparePart from '../../../../models/SparePart'
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
      const sparePart = await SparePart.findById(id)
      res.status(200).json({
        status: 'success',
        sparePart
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

const updatedSparePartSchema = Joi.object({
  sku: Joi.string().uppercase().trim(),
  brand: Joi.string().trim(),
  type: Joi.string().trim(),
  description: Joi.string().trim(),
  status: Joi.number(),
}).required()

handler.put(
  withJWT(async (req, res) => {
    const {
      query: { id },
      body: sparePartToUpdate
    } = req
    try {
      const validatedBody = await updatedSparePartSchema.validateAsync(sparePartToUpdate)
      await connectDB()

      const sparePart = await SparePart.findByIdAndUpdate(id, { $set: validatedBody }).then(sparePart => {
        return SparePart.findById(sparePart._id)
      })

      res.status(200).json({
        status: 'success',
        sparePart
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
      await SparePart.findByIdAndUpdate(id, { $set: { status: 0 } }).then(updatedSparePart => {
        return updatedSparePart
      })
      res.status(200).json({
        status: 'success',
        message: 'The Spare Part has been removed'
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

export default handler
