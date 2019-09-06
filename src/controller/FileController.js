const File = require('../models/File')
const Box = require('../models/Box')

// Classe de importação de arquivos
class FileController {
  async store (req, res) {
    try {
      const box = await Box.findById(req.params.id)
      const file = await File.create({
        title: req.file.originalname,
        path: req.file.key
      })

      box.files.push(file)

      await box.save()

      req.io.sockets.in(box._id).emit('file', file)

      // Criar arquivo
      return res.json(file)
    } catch (error) {
      console.log(error)
      if (error) res.status(404).send({ error: 'Could not upload the file' })
    }
  }
}

module.exports = new FileController()
