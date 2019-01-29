module.exports = 
`
scalar DateTime
type User {
  name: String!
  followings: [User!]!
  followers: [User!]!
  tweets: [Tweet!]!
  timelines: [Tweet!]!
  isFollowing: Boolean!
}

type Tweet {
  message: String!
  user: User!
  since: String!
  createdAt: DateTime!
}

input TweetFilter {
  message: String
}

type Query {
  tweets(filter: TweetFilter): [Tweet!]!
  user(name: String!): User
  users: [User!]!
  me: User
}

type Mutation {
  tweet(message: String!): Tweet!
  follow(name: String!): Boolean!
  unfollow(name: String!): Boolean!
  loginAs(name: String!): User!
}
`
