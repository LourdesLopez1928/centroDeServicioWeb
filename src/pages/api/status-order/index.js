// import StatusOrder from '../../../models/StatusOrder'
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

//       const createStatusOrder = await StatusOrder.create({
//         name: name,
//         type: type
//       })
//       res.status(201).json({ createStatusOrder, message: 'Correcto' })
//     } catch (error) {
//       console.log(error)
//     }
//   })
// )

// export default handler
