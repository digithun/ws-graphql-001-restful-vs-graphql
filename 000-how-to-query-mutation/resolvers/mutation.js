const models = require('../models')

module.exports = {

  async createPerson (source, args, context) {
    return models.Person.create({
      name: args.name,
      age: args.age
    })
  },

  async createPost (source, args, context) {
    return models.Post.create({
      title: args.title,
      authorName: args.authorName
    })
  }

}
