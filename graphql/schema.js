const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Post {
    _id: ID!
    title: String!
    author: String!
    text: String!
    createdAt: String
    updatedAt: String
  }

  input PostInput {
    title: String!
    author: String!
    text: String!
  }

  type Query {
    getPost(id: ID!): Post
    getAllPosts: [Post!]!
  }

  type Mutation {
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): String
  }
`);

module.exports = schema;
