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

  input getEnrollmentInput {
    EL_ID: String!
  }

  input readEnrollmentInput {
    first: Int
    last: Int
    after: String
    before: String
  }

  input createEnrollmentInput {
    DATE: String!
    WRTR_ID: String!
    CONST_ID: String
    EE_ID: String
    APL_ID: String
    CPAN: String
    PROD: String
    ST: String!
    GIFT_AMT: Int
  }

  input updateEnrollmentInput {
    EL_ID: String!
    DATE: String
    WRTR_ID: String
    CONST_ID: String
    EE_ID: String
    APL_ID: String
    CPAN: String
    PROD: String
    ST: String
    GIFT_AMT: Int
  }

  input deleteEnrollmentInput {
    EL_ID: String!
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
    getEnrollment(input: getEnrollmentInput!): Enrollment!
    readEnrollment(input: readEnrollmentInput!): EnrollmentConnection!
  }

  type Mutation {
    createEnrollment(input: createEnrollmentInput!): Enrollment!
    updateEnrollment(input: updateEnrollmentInput!): Enrollment!
    deleteEnrollment(input: deleteEnrollmentInput!): Enrollment!
  }
`;

export default typeDefs;