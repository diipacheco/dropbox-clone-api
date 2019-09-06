const Box = require('../models/Box')

// Classe de criação das boxes
class BoxController {
  async store (req, res) {
    try {
      const box = await Box.create(req.body)
      return res.json(box)
    } catch (error) {
      console.log(error)
      if (error) res.status(404).send({ error: 'could not create the box' })
    }
  }

  async show (req, res) {
    try {
      const box = await Box.findById(req.params.id).populate({
        path: 'files',
        options: { sort: { createdAt: -1 } }
      })

      return res.json(box)
    } catch (error) {
      if (error) res.status(404).send({ error: 'could not find any box' })
    }
  }
}

module.exports = new BoxController()
