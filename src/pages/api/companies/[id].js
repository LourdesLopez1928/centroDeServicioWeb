import Joi from 'joi'
import nextConnect from 'next-connect'
import _get from 'lodash/get'
import { Company } from '../../../../models/Company'
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
      await issetCompany(id, res)
      const company = await Company.findById(id)
      res.status(200).json({
        status: 'success',
        company
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

const companySchema = Joi.object({
  rfc: Joi.string().trim(),
  name: Joi.string().trim(),
  address: Joi.string(),
  phone: Joi.string(),
  status: Joi.number(),
  email: Joi.string().email().trim(),
  personType: Joi.string().trim(),
}).required()
handler.put(
  withJWT(async (req, res) => {
    const {
      query: { id },
      body: CompanyToUpdate
    } = req

    await connectDB()
    try {
      await issetCompany(id, res)
      const validatedBody = await companySchema.validateAsync(CompanyToUpdate)

      const company = await Company.findByIdAndUpdate(id, { $set: validatedBody }).then(updatedCompany => {
        return Company.findById(updatedCompany._id)
      })

      res.status(200).json({
        status: 'success',
        company
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
      await issetCompany(id, res)
      await Company.findByIdAndUpdate(id, {
        $set: { status: 0 }
      }).then(updatedCompany => {
        return updatedCompany
      })
      res.status(200).json({
        status: 'success',
        message: 'The Company has been removed'
      })
    } catch (error) {
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
