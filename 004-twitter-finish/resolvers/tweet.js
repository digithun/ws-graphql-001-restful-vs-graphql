const models = require("../models")
const timeAgo = require("time-ago/timeago")

module.exports = {
  user(source) {
    return models.User.findOne({ name: source.userName })
  },
  since(source) {
    return timeAgo.ago(source.createdAt)
  },
  createdAt(source) {
    return source.createdAt
  }
}