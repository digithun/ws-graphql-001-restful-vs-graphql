const { GraphQLServer } = require("graphql-yoga")
const express = require("express")
const session = require('express-session')
const MongoSessionStore = require('connect-mongo')(session);
const DataLoader = require('dataloader')
const resolvers = require("./resolvers")
const type_defs = require("./type-defs")
const models = require("./models")

const server = new GraphQLServer({
  typeDefs: type_defs,
  resolvers: resolvers,
  context: (args) => {
    const req = args.request
    const userName = req.session ? req.session.userName : null
    const userLoader = new DataLoader(async (userNames) => {
      const users = await models.User.find({ name: { $in: userNames } })
      return userNames.map((userName) => {
        return users.find((user) => user.name === userName)
      })
    })
    return {
      models: require("./models"),
      userName: userName,
      setUserName: (name) => {
        req.session.userName = name
        req.session.save()
      },
      userLoader,
    }
  }
})

server.express.use(session({
  secret: "1234",
  resave: false,
  saveUninitialized: true,
  store: new MongoSessionStore({ url: 'mongodb://localhost:27018/test-session' })
}))
server.express.use("/", express.static("public"))
server.start({
  endpoint: "/api",
  playground: "/api"
}, () => console.log('Server is running on localhost:4000'))