const { GraphQLScalarType, Kind } = require("graphql")

module.exports = new GraphQLScalarType({
  name: 'DateTime',
  parseValue(value) {
    return new Date(value)
  },
  serialize(value) {
    return value.toISOString()
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }
    throw new Error("DateTime support only Kind.STRING")
  },
})