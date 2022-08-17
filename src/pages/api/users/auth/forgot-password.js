// import bcrypt from 'bcryptjs/dist/bcrypt'
// import Joi from 'joi'
// import jwt from 'jsonwebtoken'
// import connectDB from '../../../../lib/db'
// import validate from '../../../../lib/middleware/validation'
// import User from '../../../../models/User'

// const schema = Joi.object({
//   email: Joi.string().email().required()
// }).required()

// export default validate({ body: schema }, async (req, res) => {
//   try {
//     await connectDB()
//     const { email } = req.body
//     const user = await User.findOne({ email })

//     if (!user) {
//       res.status(404).json({ status: 'error', error: 'Usuario no encontrado' })
//     }
//     if (user) {
//       const isValidPassword = await bcrypt.compare(password, user.password).then(isValidPassword => {
//         if (!isValidPassword) {
//           res.status(400).json({ status: 'error', error: 'Credenciales incorrectas.' })
//         }

//         return isValidPassword
//       })

//       if (isValidPassword) {
//         const payload = { user }

//         const token = await new Promise((resolve, reject) => {
//           jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' }, (err, token) => {
//             if (err) {
//               console.log(err)
//               reject(err)
//             }
//             resolve(token)
//           })
//         })

//         res.status(200).json({
//           status: 'success',
//           user,
//           session: {
//             token
//           }
//         })
//       }
//     }
//   } catch (error) {
//     console.log('Error en catch' + error)
//     res.status(400).json({
//       status: 'error',
//       error
//     })
//   }
// })
