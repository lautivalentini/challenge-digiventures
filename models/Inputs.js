const { Schema, model } = require('mongoose')

const InputsSchema = Schema({
  title: {
    type: String,
  },
  inputs: {
    type: Array,
  },
  name: {
    type: String,
  }
})

module.exports = model('Inputs', InputsSchema)