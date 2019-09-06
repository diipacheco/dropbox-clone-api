const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/authentication/auth.json')
const crypto = require('crypto')

function generateToken (params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

class Authentication {
  async register (req, res) {
    const { email } = req.body
    try {
      if (await User.findOne({ email })) { return res.status(400).send({ error: 'User alredy exists' }) }
      const user = await User.create(req.body)
      user.password = undefined
      return res.send({ user, token: generateToken({ id: user._id }) })
    } catch (error) {
      console.log(error)
      if (error) { return res.status(400).send({ error: 'Registration failed' }) }
    }
  }

  async signin (req, res) {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email }).select('+password')

      if (!user) return res.status(400).send({ error: 'User not found' })

      if (!await bcrypt.compare(password, user.password)) return res.status(400).send({ error: 'Invalid password' })

      user.password = undefined

      res.send({ user, token: generateToken({ id: user._id }) })
    } catch (error) {
      console.log(error)
      if (error) res.status(400).send({ error: 'Something is going wrong, please try out again latter!' })
    }
  }
}

module.exports = new Authentication()
