const mongoose = require('mongoose')

const collection_structure = new mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    }
})

const collection_schema = {
    marca: String,
    modelo: String,
    Ano: Number,
  }
const Usedcar = mongoose.model('cars', collection_structure)

module.exports = Usedcar