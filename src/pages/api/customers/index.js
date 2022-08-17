import Joi from 'joi'
import nextConnect from 'next-connect'
import bcrypt from 'bcryptjs/dist/bcrypt'
import connectDB from '../../../../lib/db'
import withJWT from '../../../../lib/middleware/withJWT'
import Customer from '../../../../models/Customer'
import { errorWrapper } from '../../../../helpers/index'

const handler = nextConnect()

handler.get(
  withJWT(async (req, res) => {
    try {
      await connectDB()

      const customers = await Customer.find({
        status: { $ne: 0 }
      })
      res.status(200).json({
        status: 'success',
        customers
      })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

const createCustomerSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string(),
  companyId: Joi.string().required(),
  status: Joi.number().required(),
  role: Joi.number().required()
}).required()
handler.post(
  withJWT(async (req, res) => {
    try {
      const validatedBody = await createCustomerSchema.validateAsync(req.body)
      await connectDB()

      const {
        email,
        password,
        name,
        lastName,
        phone,
        status = 1,
        role = 2,
        permissionsGet = [],
        companyId
      } = validatedBody
      const fullName = `${name} ${lastName}`
      const salt = await bcrypt.genSalt(10)
      const encodedPassword = await bcrypt.hash(password, salt)
      const issetCustomer = await Customer.findOne({ email: email })

      if (issetCustomer) {
        res.status(200).json({ success: false, message: 'El E-Mail ya se encuantra registrado.' })
      }

      const createdCustomer = await Customer.create({
        email: email,
        password: encodedPassword,
        name: name,
        lastName: lastName,
        fullName: fullName,
        phone: phone,
        status: status,
        role: role,
        permissions: permissionsGet,
        companyId: companyId
      })

      res.status(200).json({ status: 'success', customer: createdCustomer })
    } catch (error) {
      res.status(400).json(errorWrapper.getError(error))
    }
  })
)

export default handler
