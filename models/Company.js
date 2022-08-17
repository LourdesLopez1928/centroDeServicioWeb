import mongoose from 'mongoose'

mongoose.models = {}

const companySchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  rfc: String,
  userId: {
    type: mongoose.Types.ObjectId
  },
  status: {
    type: Number, // 0 deleted 1 enable 2 disabled
    required: true,
    default: 1
  },
  personType: {
    type: String, // 0 deleted 1 enable 2 disabled
    required: true,
    default: 'Moral'
  },
  email: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const Company = mongoose.model('companies', companySchema)

async function findAllCompanyWithBranches(options = {}) {
  const { match = {} } = options
  return Company.aggregate([
    {
      $match: match
    },
    {
      $lookup: {
        from: 'branches', //Ponemos la colecciona a la que queremos relacionar
        localField: '_id', //Colocamos el campo que queremos relacionar de la coleccion principal
        foreignField: 'companyId', // Colocamos el campo de companies que es con el que hara match
        as: '_branches' //nombramos el campo en el que guaradara el resultado
      }
    }
    // {
    //   $lookup: {
    //     from: 'users', //Ponemos la colecciona a la que queremos relacionar
    //     localField: 'userId', //Colocamos el campo que queremos relacionar de la coleccion principal
    //     foreignField: '_id', // Colocamos el campo de companies que es con el que hara match
    //     as: '_general_manager' //nombramos el campo en el que guaradara el resultado
    //   }
    // }
  ])
}

module.exports = {
  Company,
  findAllCompanyWithBranches
}
