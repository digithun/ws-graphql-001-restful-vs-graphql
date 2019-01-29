const { GraphQLServer } = require("graphql-yoga")
const resolvers = require("./resolvers")
const type_defs = require("./type-defs")
const express = require("express")
const session = require('express-session')
const MongoSessionStore = require('connect-mongo')(session);

const server = new GraphQLServer({
  typeDefs: type_defs,
  resolvers: resolvers,
  context: (args) => {
    const req = args.request
    return {}
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