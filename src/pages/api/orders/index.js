import nextConnect from 'next-connect'
import Joi from 'joi'
import { Order, getOrderSequence } from '../../../../models/Order'
import Sequence from '../../../../models/Sequence'
import connectDB from '../../../../lib/db'
import withJWT from '../../../../lib/middleware/withJWT'
import _get from 'lodash/get'
import _set from 'lodash/set'
import { errorWrapper } from '../../../../helpers/index'

const handler = nextConnect()
handler.get(
  withJWT(async (req, res) => {
    try {
      await connectDB()

      const orders = await Order.find({
        status: { $ne: 0 }
      })
      res.status(200).json({
        status: 'success',
        orders
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

const createOrderSchema = Joi.object({
  machines: Joi.array().items(
    Joi.object().keys({
      technicianId: Joi.string().trim(),
      serialNumber: Joi.string().trim().required(),
      brand: Joi.string().trim().required(),
      model: Joi.string().trim().required(),
      type: Joi.string().trim().required(),
      notes: Joi.string().trim(),
      warranty: Joi.boolean().default(false),
      diagnostic: Joi.object().keys({
        notes: Joi.string().trim(),
        images: Joi.array().items(
          Joi.object().keys({
            uri: Joi.string().trim(),
          })
        ),
        spareParts: Joi.array().items(
          Joi.object().keys({
            sku: Joi.string().trim(),
            brand: Joi.string().trim(),
            type: Joi.string().trim(),
            quantity: Joi.number(),
            notes: Joi.string().trim(),
            unitPrice: Joi.number(),
            totalPrice: Joi.number(),
          })
        ),
        sparePartsTotalPrice: Joi.number(),
        diagnosticPrice: Joi.number(),
        subTotalPrice: Joi.number(),
        taxPrice: Joi.number(),
        total: Joi.number(),
      }),
    })
  ),
  authorizeBy: Joi.string().trim(),
  customerId: Joi.string().trim(),
  registeredId: Joi.string().trim(),
  branchId: Joi.string().trim()
}).required()
handler.post(
  withJWT(async (req, res) => {
    try {
      await connectDB()
      const validatedBody = await createOrderSchema.validateAsync(req.body)
      _set(validatedBody, 'id', await getOrderSequence({ Sequence, Collection: 'orders' }))
      const createOrder = await Order.create(validatedBody)

      res.status(200).json({
        status: 'success',
        order: createOrder
      })
    } catch (error) {
      console.log(error)
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

async function issetOrder(id, res) {
  const issetOrder = await Order.findById(id)
  if (!issetOrder) {
    res.status(404).json({ success: 'error', message: 'Not found' })
  }
}

export default handler
