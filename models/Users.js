const { Schema, model } = require('mongoose')

const UsersSchema = Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  confirm_password: {
    type: String,
  },
  remember: {
    type: Boolean,
  },
  country: {
    type: String,
  },
  custom_country: {
    type: String,
  },
})

module.exports = model('Users', UsersSchema)