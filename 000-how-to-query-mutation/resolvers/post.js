const models = require('../models')

module.exports = {
  author (source) {
    return models.Person.findOne({ name: source.authorName })
  }

}
