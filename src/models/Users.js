const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    passwordResetToken: {
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: String,
      select: false
    }

  },
  {
    timestamps: true
  }
)

User.pre('save', async function (next, res) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
  return res.send(console.log('Register with success'))
})

module.exports = mongoose.model('User', User)
