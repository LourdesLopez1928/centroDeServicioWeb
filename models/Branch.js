import mongoose from 'mongoose'

mongoose.models = {}

const branchSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  status: {
    type: Number, // 0 deleted 1 enable 2 disabled
    required: true,
    default: 1
  },
  userId: {
    type: mongoose.Types.ObjectId
  },
  companyId: {
    type: mongoose.Types.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

const Branch = mongoose.model('branches', branchSchema)

async function findAllBranchesWithCompanies(options = {}) {
  const { match = {} } = options
  return Branch.aggregate([
    {
      $match: match
    },
    {
      $lookup: {
        from: 'companies', //Ponemos la colecciona a la que queremos relacionar
        localField: 'companyId', //Colocamos el campo que queremos relacionar de la coleccion principal
        foreignField: '_id', // Colocamos el campo de companies que es con el que hara match
        as: 'company' //nombramos el campo en el que guaradara el resultado
      }
    }
    // {
    //   $lookup: {
    //     from: 'users', //Ponemos la colecciona a la que queremos relacionar
    //     localField: 'userId', //Colocamos el campo que queremos relacionar de la coleccion principal
    //     foreignField: '_id', // Colocamos el campo de companies que es con el que hara match
    //     as: 'manager' //nombramos el campo en el que guaradara el resultado
    //   }
    // }
  ])
}

module.exports = {
  Branch,
  findAllBranchesWithCompanies
}
