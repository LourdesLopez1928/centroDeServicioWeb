import Joi from 'joi'
import nextConnect from 'next-connect'
import Machine from '../../../../models/Machine'
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
      await issetMachine(id, res)

      const machine = await Machine.findById(id)
      res.status(200).json({
        status: 'success',
        machine
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

const updatedMachineSchema = Joi.object({
  type: Joi.string().trim().uppercase(),
  brand: Joi.string().trim().uppercase(),
  model: Joi.string().trim().uppercase(),
  status: Joi.number(),
}).required()

handler.put(
  withJWT(async (req, res) => {
    const {
      query: { id },
      body: machineToUpdate
    } = req
    try {
      await issetMachine(id, res)
      const validatedBody = await updatedMachineSchema.validateAsync(machineToUpdate)
      await connectDB()

      const machine = await Machine.findByIdAndUpdate(id, { $set: validatedBody }).then(updatedUser => {
        return Machine.findById(updatedUser._id)
      })
      res.status(200).json({
        status: 'success',
        machine
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
      await issetMachine(id, res)
      await Machine.findByIdAndUpdate(id, { $set: { status: 0 } }).then(updatedMachine => {
        return updatedMachine
      })
      res.status(200).json({
        status: 'success',
        message: 'The machine has been removed'
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

async function issetMachine(id, res) {
  const issetMachine = await Machine.findById(id)
  if (!issetMachine) {
    res.status(404).json({ success: 'error', message: "Not found"})
  }
}

export default handler
