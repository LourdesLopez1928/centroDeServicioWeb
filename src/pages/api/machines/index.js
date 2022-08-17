import Joi from 'joi'
import nextConnect from 'next-connect'
import connectDB from '../../../../lib/db'
import withJWT from '../../../../lib/middleware/withJWT'
import Machine from '../../../../models/Machine'
import { errorWrapper } from '../../../../helpers/index'

const handler = nextConnect()

handler.get(
  withJWT(async (req, res) => {
    await connectDB()
    try {
      const machines = await Machine.find({
        status: { $ne: 0 }
      })
      res.status(200).json({
        status: 'success',
        machines
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

const createMachineSchema = Joi.object({
  type: Joi.string().trim().uppercase().required(),
  brand: Joi.string().trim().uppercase().required(),
  model: Joi.string().trim().uppercase().required()
}).required()
handler.post(
  withJWT(async (req, res) => {
    try {
      const validatedBody = await createMachineSchema.validateAsync(req.body)
      await connectDB()

      const { type, brand, model } = validatedBody
      const issetMachine = await Machine.findOne({ model })

      if (issetMachine) {
        res.status(400).json({
          success: false,
          message: `La maquina con modelo ${model}, ya se encuantra registrado.`
        })
      }

      const createdMachine = await Machine.create({
        type,
        brand,
        model
      })

      res.status(200).json({ status: 'success', machine: createdMachine })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

export default handler
