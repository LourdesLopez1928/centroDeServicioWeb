// import StatusUser from '../../../models/StatusUser'
// import connectDB from '../../../lib/db'
// import nextConnect from 'next-connect'
// import withJWT from '../../../middleware/withJWT'

// const handler = nextConnect()
// handler.get(withJWT(async (req, res) => {}))

// handler.post(
//   withJWT(async (req, res) => {
//     await connectDB()
//     try {
//       const { name, type } = req.body

//       const createStatusUser = await StatusUser.create({
//         name: name,
//         type: type
//       })
//       res.status(201).json({ createStatusUser, message: 'Correcto' })
//     } catch (error) {
//       console.log(error)
//     }
//   })
// )

// export default handler
