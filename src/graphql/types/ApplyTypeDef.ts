import { gql } from 'apollo-server-lambda';

// Pagination 예제
// https://graphql.org/learn/pagination/
// GraphQL Schema Best Practice
// https://graphqlmastery.com/blog/graphql-best-practices-for-graphql-schema-design
const typeDefs = gql`
  type PageInfo {
    endCursor: String
    startCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type ApplicationConnection {
    edges: [Application]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  input readApplicationInput {
    APL_ID: String!
    DATE: String
  }

  input createApplicationInput {
    DATE: String!
    WRTR:ID: String!
    UA: String
    FRM_DATA: String
  }

  input updateApplicationInput {
    APL_ID: String!
    DATE: String
    WRTR:ID: String
    UA: String
    FRM_DATA: String
  }

  input deleteApplicationInput {
    APL_ID: String!
  }

  type Application {
    APL_ID: String
    DATE: String
    WRTR:ID: String
    WRT_DATE: String
    UA: String
    FRM_DATA: String
  }

  type Query {
    readApplication(limit: Int!, input: readApplicationInput): ApplicationConnection!
  }

  type Mutation {
    createApplication(input: createApplicationInput!): Application!
    updateApplication(input: updateApplicationInput!): Application!
    deleteApplication(input: deleteApplicationInput!): Application!
  }
`;

export default typeDefs;