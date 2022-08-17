import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  numberOrder: Number,
  dateRegister: {
    type: Date,
    default: Date.now,
  },
  company:{
    type: mongoose.Types.ObjectId

  },
  clientId: {
    type: mongoose.Types.ObjectId,
  },
  machines: [
    {
      nombre: String,
      marca: String,
      modelo: String,
      numeroDeSerie: String,
      aqueviene: String,
      description: String,
      accesorios: String,
      revision: [
        {
          diagnostigo: String,
          spareparts: [
            {
              spareparts: mongoose.Types.ObjectId,
              quantity:Number
            },
          ],
        },
      ],
      garantia: Boolean,
      reparacion: Boolean,
      costoDeRparacion: Number,
      iva: Number,
    },
  ],
  quienrecibe:{
    type: mongoose.Types.ObjectId

  },
  tecnico:{
    type: mongoose.Types.ObjectId

  },
  status:Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
