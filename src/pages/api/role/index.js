// import Roles from '../../../models/Roles'
// import connectDB from '../../../lib/db'
// import nextConnect from 'next-connect'
// import withJWT from '../../../middleware/withJWT'

// const handler = nextConnect()
// handler.get(
//   withJWT(async (req, res) => {
//     try {
//       await connectDB()
//       const role = await Roles.find({})
//       res.status(201).json({ role, message: 'Correcto' })
//     } catch (error) {
//       console.log(error)
//     }
//   })
// )

// // creamos un Role
// handler.post(
//   withJWT(async (req, res) => {
//     await connectDB()
//     try {
//       const { name, type } = req.body

//       const createCompany = await Roles.create({
//         name: name,
//         type: type
//       })
//       res.status(201).json({ createCompany, message: 'Correcto' })
//     } catch (error) {
//       console.log(error)
//       res.status(400).json({ success: false, message: error })
//     }
//   })
// )

// export default handler
