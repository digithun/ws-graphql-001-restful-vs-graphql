const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLSchema } = require("graphql")

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (source, args, context, info) => {
        return "hello " + args.name
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: Query
})

module.exports.schema = schema
