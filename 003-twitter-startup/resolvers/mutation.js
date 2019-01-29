const models = require("../models")

function checkUser(context) {
  if (!context.userName) {
    throw new Error("have no permission")
  }
}

module.exports = {
  async loginAs(source, args, context) {
    const user = await models.User.findOne({ name: args.name })
    if (user) {
      context.setUserName(user.name)
      return user
    }
    const newUser = await models.User.create({
      name: args.name
    })
    context.setUserName(newUser.name)
    return newUser
  },
  async tweet(source, args, context) {
    checkUser(context)
    return models.Tweet.create({
      message: args.message,
      userName: context.userName,
    })
  },
  async follow(source, args, context) {
    checkUser(context)
    const user = await models.User.findOne({ name: args.name })
    if (!user) {
      throw new Error("no user")
    }
    const count = await models.UserFollowing.findOne({
      userName: context.userName,
      followingName: user.name
    }).count()
    if (count > 0) {
      return false
    }
    await models.UserFollowing.create({
      userName: context.userName,
      followingName: user.name
    })
    return true
  },
  async unfollow(source, args, context) {
    checkUser(context)
    await models.UserFollowing.remove({
      userName: context.userName,
      followingName: args.name
    })
    return true
  }
}