import Joi from 'joi'
import nextConnect from 'next-connect'
import connectDB from '../../../../../lib/db'
import withJWT from '../../../../../lib/middleware/withJWT'
import _get from 'lodash/get'
import { Order } from '../../../../../models/Order'
import { errorWrapper } from '../../../../../helpers/index'

const handler = nextConnect()

handler.get(
  withJWT(async (req, res) => {
    try {
      await connectDB()
      
      const orders = await Order.find({
        customerId: _get(req, 'session._id', '')
      })
      res.status(200).json({
        status: 'success',
        orders
      })
    } catch (error) {
      console.log(error)
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

export default handler
