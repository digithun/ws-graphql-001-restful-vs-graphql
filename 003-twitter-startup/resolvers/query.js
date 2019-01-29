const models = require("../models")

module.exports = {
  tweets(source, args) {
    return models.Tweet.find(
      args.filter && args.filter.message
        ? {
          message: { $regex: new RegExp(args.filter.message) }
        }
        : {}
    )
  },
  user(source, args, context){
    return models.User.findOne({ name: args.name })
  },
  users() {
    return models.User.find({})
  },
  me(source, args, context) {
    if (!context.userName) {
      return null
    }
    return models.User.findOne({ name: context.userName })
  }
}