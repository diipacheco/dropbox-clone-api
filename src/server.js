const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())

// configutação de salas com socket IO
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box)
  })
})

mongoose.connect(
  'mongodb://192.168.99.100:27017/dropbox',
  {
    useNewUrlParser: true
  }
)

// configuração da socket com a aplicação rodando
app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

server.listen(process.env.PORT || 3333)
