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

  type EnrollmentConnection {
    edges: [Enrollment]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  input EnrollmentInput {
    EL_ID: String!
    DATE: String!
    WRTR_ID: String!
    WRT_DATE: String!
    CONST_ID: String
    EE_ID: String
    APL_ID: String
    CPAN: String
    PROD: String
    ST: String!
    GIFT_AMT: Int
  }

  type Enrollment {
    EL_ID: String!
    DATE: String!
    WRTR_ID: String!
    WRT_DATE: String!
    CONST_ID: String
    EE_ID: String
    APL_ID: String
    CPAN: String
    PROD: String
    ST: String!
    GIFT_AMT: Int
  }

  type Query {
    readEnrollment(limit: Int!, elId: String): EnrollmentConnection!
  }

  type Mutation {
    createEnrollment(input: EnrollmentInput!): Enrollment!
    updateEnrollment(input: EnrollmentInput!): Enrollment!
    deleteEnrollment(input: EnrollmentInput!): Enrollment!
  }
`;

export default typeDefs;