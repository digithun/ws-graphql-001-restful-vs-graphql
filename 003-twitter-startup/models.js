const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27018/test', {useNewUrlParser: true});

const User = mongoose.model('User',{
  name: { type: String, required: true, unique: true },
});

const UserFollowing = mongoose.model('UserFollowing', {
  userName: String,
  followingName: String,
})

const TweetSchema = new mongoose.Schema({
  message: String,
  userName: String,
}, { timestamps: true });

const Tweet = mongoose.model('Tweet', TweetSchema)

module.exports = {
  User,
  UserFollowing,
  Tweet,
}