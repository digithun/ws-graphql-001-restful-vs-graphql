const models = require("../models")
const timeAgo = require("time-ago/timeago")

module.exports = {
  user(source, args, context) {
    return context.userLoader.load(source.userName)
  },
  since(source) {
    return timeAgo.ago(source.createdAt)
  },
  createdAt(source) {
    return source.createdAt
  }
}