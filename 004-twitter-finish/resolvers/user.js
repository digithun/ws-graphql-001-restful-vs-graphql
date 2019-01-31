const models = require("../models")

module.exports = {
  async followings(source) {
    const followings = await models.UserFollowing.find({ userName: source.name })
    return models.User.find({ name: { $in: followings.map(f => f.followingName) } })
  },
  async followers(source) {
    const followings = await models.UserFollowing.find({ followingName: source.name })
    return models.User.find({ name: { $in: followings.map(f => f.userName) } })
  },
  async tweets(source) {
    return models.Tweet.find({ userName: source.name }).sort({ createdAt: -1 })
  },
  async timelines(source) {
    const followingUsers = await models.UserFollowing.find({ userName: source.name })
    const followingNames = followingUsers
      .map((followingUser) => followingUser.followingName)
      .concat([source.name])
    return models.Tweet.find({ userName: { $in: followingNames } }).sort({ createdAt: -1 })
  },
  async isFollowing(source, args, context) {
    if (!context.userName) {
      return false
    }
    const following =  await models.UserFollowing.findOne({
      userName: context.userName,
      followingName: source.name,
    })
    return following !== null
  }
}