import nextConnect from 'next-connect'
import Joi from 'joi'
import { Company, findAllCompanyWithBranches } from '../../../../models/Company'
import connectDB from '../../../../lib/db'
import withJWT from '../../../../lib/middleware/withJWT'
import _get from 'lodash/get'
import { errorWrapper } from '../../../../helpers/index'

const handler = nextConnect()
handler.get(
  withJWT(async (req, res) => {
    try {
      await connectDB()

      const companies = await findAllCompanyWithBranches({
        match: {
          status: { $ne: 0 }
        }
      })

      res.status(200).json({
        status: 'success',
        companies
      })
    } catch (error) {
      console.log(error)
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

const createCompanySchema = Joi.object({
  rfc: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  phone: Joi.string().trim().required(),
  personType: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  userId: Joi.string().trim().required(),
}).required()
handler.post(
  withJWT(async (req, res) => {
    try {
      await connectDB()
      const validatedBody = await createCompanySchema.validateAsync(req.body)
      const { address, userId, name } = validatedBody

      const createCompany = await Company.create(validatedBody)

      res.status(200).json({ status: 'success', company: createCompany })
    } catch (error) {
      console.log(error)
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

async function issetCompany(id, res) {
  const issetCompany = await Company.findById(id)
  if (!issetCompany) {
    res.status(404).json({ success: 'error', message: 'Not found' })
  }
}

export default handler
