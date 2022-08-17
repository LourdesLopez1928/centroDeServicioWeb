import mongoose from 'mongoose'

mongoose.models = {}
const SparePartSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  notes: {
    type: String,
    required: true,
    default: null
  },
  unitPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  }
})
const DiagnosticImageSchema = new mongoose.Schema({
  uri: {
    type: String,
    required: false,
    default: null
  }
})
const MachineSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: null
  },
  warranty: {
    type: Boolean,
    default: false
  },
  diagnostic: {
    notes: {
      type: String,
      default: null
    },
    images: {
      type: [DiagnosticImageSchema],
      default: []
    },
    spareParts: {
      type: [SparePartSchema],
      default: []
    },
    sparePartsTotalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    diagnosticPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    subTotalPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0
    },
    total: {
      type: Number,
      required: true,
      default: 0.0
    }
  },
  technicianId: {
    type: mongoose.Types.ObjectId,
    default: null
  }
})
const orderSchema = new mongoose.Schema({
  id: Number,
  status: {
    type: Number, // 0 deleted 1 enable 2 disabled
    required: true,
    default: 1
  },
  machines: {
    type: [MachineSchema],
    default: []
  },
  totalPriceWithTax: {
    type: Number,
    required: true,
    default: 0.0
  },
  authorizeBy: {
    type: String,
    default: null
  },
  customerId: {
    type: mongoose.Types.ObjectId
  },
  registeredId: {
    type: mongoose.Types.ObjectId
  },
  branchId: {
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

const Order = mongoose.model('orders', orderSchema)

async function findAllBranchesWithCompanies(options = {}) {
  const { match = {} } = options
  return Order.aggregate([
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

async function getOrderSequence(options) {
  const { Sequence, Collection } = options
  const nextSequence = await Sequence.findOneAndUpdate(
    {
      Collection
    },
    {
      $inc: {
        Sequence: 1
      }
    },
    {
      new: true,
      upsert: true
    }
  )

  return nextSequence.Sequence
}

module.exports = {
  Order,
  getOrderSequence,
  findAllBranchesWithCompanies
}
