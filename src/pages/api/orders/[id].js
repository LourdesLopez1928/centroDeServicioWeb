import Joi from 'joi'
import nextConnect from 'next-connect'
import _get from 'lodash/get'
import { Order } from '../../../../models/Order'
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
      await issetOrder(id, res)
      const order = await Order.findById(id)
      res.status(200).json({
        status: 'success',
        order
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({
        status: 'error',
        message: error
      })
    }
  })
)

const orderSchema = Joi.object({
  status: Joi.number(),
    machines: Joi.array().items(
      Joi.object().keys({
        technicianId: Joi.string().trim(),
        serialNumber: Joi.string().trim(),
        brand: Joi.string().trim(),
        model: Joi.string().trim(),
        type: Joi.string().trim(),
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
handler.put(
  withJWT(async (req, res) => {
    const {
      query: { id },
      body: OrderToUpdate
    } = req

    await connectDB()
    try {
      await issetOrder(id, res)
      const validatedBody = await orderSchema.validateAsync(OrderToUpdate)

      const order = await Order.findByIdAndUpdate(id, { $set: validatedBody }).then(updatedOrder => {
        return Order.findById(updatedOrder._id)
      })

      res.status(200).json({
        status: 'success',
        order
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

    await connectDB()
    try {
      await issetOrder(id, res)
      await Order.findByIdAndUpdate(id, {
        $set: { status: 0 }
      }).then(updatedOrder => {
        return updatedOrder
      })
      res.status(200).json({
        status: 'success',
        message: 'The Order has been removed'
      })
    } catch (error) {
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
