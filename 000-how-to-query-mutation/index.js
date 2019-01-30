const { GraphQLServer } = require('graphql-yoga')

const session = require('express-session')
const MongoSessionStore = require('connect-mongo')(session)
const DataLoader = require('dataloader')
const resolvers = require('./resolvers')
const type_defs = require('./type-defs')
const models = require('./models')

const server = new GraphQLServer({
  typeDefs: type_defs,
  resolvers: resolvers,
  context: (args) => {
    const req = args.request
    const userName = req.session ? req.session.userName : null
    const isFollowingLoader = new DataLoader(async (keys) => {
      if (!userName) {
        return keys.map(() => false)
      }
      const followingUsers = await models.UserFollowing.find({
        userName: userName,
        followingName: { $in: keys }
      })
      return keys.map((key) => {
        const followingUser = followingUsers.find((_f) => {
          return _f.followingName === key
        })
        return followingUser !== undefined
      })
    })
    return {
      models: require('./models'),
      userName: userName,
      setUserName: (name) => {
        req.session.userName = name
        req.session.save()
      },
      isFollowingLoader
    }
  }
})

server.express.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: true,
  store: new MongoSessionStore({ url: 'mongodb://localhost:27018/test-session' })
}))
// server.express.use('/', express.static('public'))
server.start({
  endpoint: '/',
  playground: '/'
}, () => console.log('Server is running on localhost:4000'))
