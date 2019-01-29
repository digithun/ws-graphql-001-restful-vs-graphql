const { GraphQLServer } = require("graphql-yoga")
const { schema } = require("./schema")

const server = new GraphQLServer({ schema: schema })
server.start(() => console.log('Server is running on localhost:4000'))