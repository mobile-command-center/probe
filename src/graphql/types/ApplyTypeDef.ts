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

  type ApplicationConnection {
    edges: [Application]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  input getApplicationInput {
    APL_ID: Int!
  }

  input readApplicationInput {
    first: Int
    last: Int
    after: Int
    before: Int
  }

  input searchApplicationInput {
    first: Int
    last: Int
    after: Int
    before: Int
    filter: searchApplicationInputFilter!
  }

  input createApplicationInput {
    DATE: String!
    WRTR_ID: String!
    UA: String
    FRM_DATA: String
  }

  input updateApplicationInput {
    APL_ID: Int!
    DATE: String
    WRTR_ID: String
    UA: String
    FRM_DATA: String
  }

  input deleteApplicationInput {
    APL_ID: String!
  }

  input searchApplicationInputFilter {
    CONST_ID: ApplicationFilter
    DATE: ApplicationFilter
    WRTR_ID: ApplicationFilter
    WRT_DATE: ApplicationFilter
    EE_ID: ApplicationFilter
    C_TEL: ApplicationFilter
    MEMO: ApplicationFilter
    P_SUBSIDY_AMT : ApplicationFilter
  }

  input ApplicationFilter {
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

  type Application {
    APL_ID: Int
    DATE: String
    WRTR_ID: String
    WRT_DATE: String
    UA: String
    FRM_DATA: String
  }

  type Query {
    getApplication(input: getApplicationInput!): Application!
    readApplication(input: readApplicationInput!): ApplicationConnection!
    searchApplication(input: searchApplicationInput!): ApplicationConnection!
  }

  type Mutation {
    createApplication(input: createApplicationInput!): Application!
    updateApplication(input: updateApplicationInput!): Application!
    deleteApplication(input: deleteApplicationInput!): Application!
  }
`;

export default typeDefs;