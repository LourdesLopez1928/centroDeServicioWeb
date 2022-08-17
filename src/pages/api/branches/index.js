import nextConnect from 'next-connect'
import Joi from 'joi'
import { Branch } from '../../../../models/Branch'
import connectDB from '../../../../lib/db'
import withJWT from '../../../../lib/middleware/withJWT'
import _get from 'lodash/get'
import { errorWrapper } from '../../../../helpers/index'

const handler = nextConnect()
handler.get(
  withJWT(async (req, res) => {
    try {
      await connectDB()

      const branches = await Branch.find({
        status: { $ne: 0 }
      })
      res.status(200).json({
        status: 'success',
        branches
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

const createBranchSchema = Joi.object({
  name: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  userId: Joi.string().trim().required(),
  companyId: Joi.string().trim().required()
}).required()
handler.post(
  withJWT(async (req, res) => {
    try {
      await connectDB()
      const validatedBody = await createBranchSchema.validateAsync(req.body)
      const createBranch = await Branch.create(validatedBody)

      res.status(200).json({ status: 'success', branch: createBranch })
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
