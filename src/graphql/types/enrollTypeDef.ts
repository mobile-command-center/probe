import { gql } from 'apollo-server-lambda';

// Pagination 예제
// https://graphql.org/learn/pagination/
// GraphQL Schema Best Practice
// https://graphqlmastery.com/blog/graphql-best-practices-for-graphql-schema-design
const typeDefs = gql`
  type PageInfo {
    endCursor: String
    startCursor: String
  }

  type EnrollmentConnection {
    edges: [Enrollment]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  input getEnrollmentInput {
    EL_ID: Int!
  }

  input readEnrollmentInput {
    first: Int
    last: Int
    after: Int
    before: Int
  }

  input searchEnrollmentInput {
    first: Int
    last: Int
    after: Int
    before: Int
    filter: searchEnrollmentInputFilter!
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
    GIFT_AMT: String
  }

  input updateEnrollmentInput {
    EL_ID: Int!
    DATE: String
    WRTR_ID: String
    CONST_ID: String
    EE_ID: String
    APL_ID: String
    CPAN: String
    PROD: String
    ST: String
    GIFT_AMT: String
  }

  input deleteEnrollmentInput {
    EL_ID: Int!
  }

  input searchEnrollmentInputFilter {
    DATE: EnrollmentStringFilter
    WRTR_ID: EnrollmentStringFilter
    WRT_DATE: EnrollmentStringFilter
    CONST_ID: EnrollmentStringFilter
    EE_ID: EnrollmentStringFilter
    APL_ID: EnrollmentStringFilter
    CPAN: EnrollmentStringFilter
    PROD: EnrollmentStringFilter
    ST: EnrollmentStringFilter
    GIFT_AMT: EnrollmentStringFilter
  }

  input EnrollmentStringFilter {
    ne: String
    eq: String
    le: String
    lt: String
    ge: String
    gt: String
    contains: String
    notContains: String
    between: [String]
  }

  input EnrollmentNumberFilter {
    ne: Int
    eq: Int
    le: Int
    lt: Int
    ge: Int
    gt: Int
    contains: Int
    notContains: Int
    between: [Int]
  }

  type Enrollment {
    EL_ID: Int!
    DATE: String!
    WRTR_ID: String!
    WRT_DATE: String!
    CONST_ID: String
    EE_ID: String
    APL_ID: String
    CPAN: String
    PROD: String
    ST: String!
    GIFT_AMT: String
  }

  type Query {
    getEnrollment(input: getEnrollmentInput!): Enrollment!
    readEnrollment(input: readEnrollmentInput!): EnrollmentConnection!
    searchEnrollment(input: searchEnrollmentInput!): EnrollmentConnection!
  }

  type Mutation {
    createEnrollment(input: createEnrollmentInput!): Enrollment!
    updateEnrollment(input: updateEnrollmentInput!): Enrollment!
    deleteEnrollment(input: deleteEnrollmentInput!): Enrollment!
  }
`;

export default typeDefs;