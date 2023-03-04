const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  fullName:{
    type:String,
    required:true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function(fullName,email, password) {

  // validation
  if (!fullName || !email || !password) {
    throw Error('Все поля должны быть заполнены')
  }
  if (!validator.isEmail(email)) {
    throw Error('Эл. адрес не действителен')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Пароль недостаточно надежный')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Этот эл. адрес уже занят')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({fullName, email, password: hash })

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('Все поля должны быть заполнены')
  }
  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Неверный эл. адрес ')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Неверный пароль')
  }
  return user
}

module.exports = mongoose.model('User', userSchema)