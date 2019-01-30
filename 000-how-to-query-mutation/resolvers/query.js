const models = require('../models')

module.exports = {
  allPersons (source, args) {
    if (args.name) { return models.Person.find({name: args.name}) }
    return models.Person.find({})
  }

}
