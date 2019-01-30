const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27018/test', {useNewUrlParser: true})

const Person = mongoose.model('Person', {
  name: String,
  age: Number
})

const Post = mongoose.model('Post', {
  title: String,
  authorName: String
})

module.exports = {
  Person,
  Post
}
