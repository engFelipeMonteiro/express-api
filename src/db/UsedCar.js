const mongoose = require('mongoose')

const collection_structure = new mongoose.Schema({
    marca: {
        type: String,
        require: true
    },
    modelo: {
        type: String,
        require: true
    },
    ano: {
        type: Number,
        require: true
    }
})

const collection_schema = {
    marca: String,
    modelo: String,
    Ano: Number,
  }
const Usedcar = mongoose.model('cars', collection_structure)

module.exports = Usedcar