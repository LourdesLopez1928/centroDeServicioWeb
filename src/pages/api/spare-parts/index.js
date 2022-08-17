import Joi from 'joi'
import nextConnect from 'next-connect'
import connectDB from '../../../../lib/db'
import withJWT from '../../../../lib/middleware/withJWT'
import SparePart from '../../../../models/SparePart'
import { errorWrapper } from '../../../../helpers/index'

const handler = nextConnect()

handler.get(
  withJWT(async (req, res) => {
    await connectDB()
    try {
      const spareParts = await SparePart.find({
        status: { $ne: 0 }
      })
      res.status(200).json({
        status: 'success',
        spareParts
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

const createSparePartSchema = Joi.object({
  sku: Joi.string().uppercase().trim().required(),
  brand: Joi.string().trim().required(),
  type: Joi.string().trim().required(),
  description: Joi.string().trim()
}).required()
handler.post(
  withJWT(async (req, res) => {
    try {
      const validatedBody = await createSparePartSchema.validateAsync(req.body)
      await connectDB()

      const { sku, brand, type, description = null } = validatedBody
      const issetSparePart = await SparePart.findOne({ sku })

      if (issetSparePart) {
        res.status(400).json({
          success: false,
          message: `La refacción con sku ${sku}, ya se encuantra registrado.`
        })
      }

      const createdSparePart = await SparePart.create({
        sku,
        brand,
        type,
        description
      })

      res.status(200).json({ status: 'success', sparePart: createdSparePart })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

export default handler
