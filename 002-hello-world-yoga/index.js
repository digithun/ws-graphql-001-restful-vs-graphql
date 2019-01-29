const { GraphQLServer } = require("graphql-yoga")

const type_defs = `
  type Query {
    hello(name: String!): String!
  }
`

const resolvers = {
  Query: {
    hello(source, args, context, info) {
      return "Hello " + args.name
    }
  }
}

const server = new GraphQLServer({ typeDefs: type_defs, resolvers: resolvers })
server.start(() => console.log('Server is running on localhost:4000'))