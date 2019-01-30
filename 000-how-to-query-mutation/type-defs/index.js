module.exports =
`
scalar DateTime
type Query {
  allPersons(name: String): [Person!]!
}

type Mutation {
  createPerson(name: String!, age: Int!): Person!
  createPost(title: String!, authorName: String!): Post!
}

type Person {
  name: String!
  age: Int!
  posts: [Post!]!
}

type Post {
  title: String!
  author: Person!
}
`
