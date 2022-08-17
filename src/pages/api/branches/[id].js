import Joi from 'joi'
import nextConnect from 'next-connect'
import _get from 'lodash/get'
import { Branch } from '../../../../models/Branch'
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
      await issetBranch(id, res)
      const branch = await Branch.findById(id)
      res.status(200).json({
        status: 'success',
        branch
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

const branchSchema = Joi.object({
  name: Joi.string().trim(),
  address: Joi.string().trim(),
  phone: Joi.string().trim(),
  userId: Joi.string().trim(),
  companyId: Joi.string().trim(),
  status: Joi.number(),
}).required()
handler.put(
  withJWT(async (req, res) => {
    const {
      query: { id },
      body: BranchToUpdate
    } = req

    await connectDB()
    try {
      await issetBranch(id, res)
      const validatedBody = await branchSchema.validateAsync(BranchToUpdate)

      const branch = await Branch.findByIdAndUpdate(id, { $set: validatedBody }).then(updatedBranch => {
        return Branch.findById(updatedBranch._id)
      })

      res.status(200).json({
        status: 'success',
        branch
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
      await issetBranch(id, res)
      await Branch.findByIdAndUpdate(id, {
        $set: { status: 0 }
      }).then(updatedBranch => {
        return updatedBranch
      })
      res.status(200).json({
        status: 'success',
        message: 'The Branch has been removed'
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

async function issetBranch(id, res) {
  const issetBranch = await Branch.findById(id)
  if (!issetBranch) {
    res.status(404).json({ success: 'error', message: 'Not found' })
  }
}

export default handler
