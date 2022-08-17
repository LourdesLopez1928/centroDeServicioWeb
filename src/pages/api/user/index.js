import User from '../../../../models/User'
import connectDB from '../../../../lib/db'
import nextConnect from 'next-connect'
import bcrypt from 'bcryptjs/dist/bcrypt'
import withJWT from 'lib/middleware/withJWT'
import verifyToken from 'lib/middleware/verifytoken'

const handler = nextConnect()

// Consultamos al usuario por su id obtenido del jwt
handler.get(
  withJWT(async (req, res) => {
    try {
      await connectDB()
      let token = req?.headers?.authorization
      let { user } = await verifyToken(token)

      // Traemos el modelo User que es donde queremos hacer la relacion a companies
      const usersAsCompany = await User.aggregate([
        {
          $lookup: {
            from: 'companies', //Ponemos la colecciona a la que queremos relacionar
            localField: 'companyId', //Colocamos el campo que queremos relacionar de la coleccion principal
            foreignField: '_id', // Colocamos el campo de companies que es con el que hara match
            as: 'company' //nombramos el campo en el que guaradara el resultado
          }
        },
        {
          $lookup: {
            from: 'roles',
            localField: 'role',
            foreignField: 'type',
            as: 'asRole'
          }
        },
        {
          $lookup: {
            from: 'statususers',
            localField: 'status',
            foreignField: 'type',
            as: 'asStatus'
          }
        }
      ])
      const me = usersAsCompany.find(res => res._id.toString() === user._id.toString())

      res.status(200).json({ me, message: 'Correcto' })
    } catch (error) {
      console.log(error)
    }
  })
)

// creamos un usuario
handler.post(async (req, res) => {
  await connectDB()
  try {
    const { email, password, name, phone, status = 1, role = 2, permissionsGet = [], companyId } = req.body
    const salt = await bcrypt.genSalt(10)
    const encodedPassword = await bcrypt.hash(password, salt)

    const searchEmail = await User.findOne({ email: email })
    if (searchEmail) {
      return res.status(200).json({ success: false, message: 'El E-Mail ya se encuantra registrado.' })
    }

    const createUser = await User.create({
      email: email,
      password: encodedPassword,
      name: name,
      phone: phone,
      status: status,
      role: role,
      permissions: permissionsGet,
      companyId: companyId
    })

    return res.status(201).json({ createUser, message: 'Correcto' })

    // const isOneCapital = /[A-Z]+/;
    // const isOneLower = /[a-z]+/;
    // if (!isOneLower.test(password)) {
    //  return { message: 'Correcto' }
    // }
    // if (!isOneCapital.test(password)) {
    //     return { message: 'Correcto' }
    // }
    // if (password?.length < 8) {
    //     return { message: 'Correcto' }
    // }
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error })
  }
})

export default handler