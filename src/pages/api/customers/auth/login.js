import bcrypt from 'bcryptjs/dist/bcrypt'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import connectDB from '../../../../../lib/db'
import Customer from '../../../../../models/Customer'
import _get from 'lodash/get'

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
}).required()

export default async function handler(req, res) {
  await connectDB()
  try {
    const validatedBody = await schema.validateAsync(req.body)
    const { email, password } = validatedBody
    const user = await Customer.findOne({ email })

    if (!user) {
      res.status(404).json({ status: 'error', error: 'Cliente no encontrado' })
    }
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password).then(isValidPassword => {
        if (!isValidPassword) {
          res.status(400).json({ status: 'error', error: 'Credenciales incorrectas.' })
        }

        return isValidPassword
      })

      if (isValidPassword) {
        const payload = { user }

        const token = await new Promise((resolve, reject) => {
          jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '4h' }, (err, token) => {
            if (err) {
              console.log(err)
              reject(err)
            }
            resolve(token)
          })
        })

        res.status(200).json({
          status: 'success',
          user,
          session: {
            token
          }
        })
      }
    }
  } catch (error) {
    let message = error
    if (error.isJoi) {
      message = _get(error, 'details[0].message', 'Something went wrong!')
    }

    res.status(400).json({
      status: 'error',
      message
    })
  }
}
