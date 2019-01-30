const models = require('../models')

module.exports = {
  posts (source) {
    return models.Post.find({ authorName: source.name }).sort({ createdAt: -1 })
  }

}
