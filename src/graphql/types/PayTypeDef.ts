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

  type PaymentConnection {
    edges: [Payment]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  input getPaymentInput {
    PYMT_ID: Int!
  }

  input readPaymentInput {
    first: Int
    last: Int
    after: Int
    before: Int
  }

  input createPaymentInput {
    DATE: String!
    EE_ID: String
    PAY_TYPE: String
    PAY_AMT: Int
    WRTR_ID: String!
    ST: String!
    CONST_ID: String
    EL_ID: String
  }

  input updatePaymentInput {
    PYMT_ID: Int!
    DATE: String
    EE_ID: String
    PAY_TYPE: String
    PAY_AMT: Int
    WRTR_ID: String
    WRT_DATE: String
    ST: String
    CONST_ID: String
    EL_ID: String
  }

  input deletePaymentInput {
    PYMT_ID: Int!
  }

  type Payment {
    PYMT_ID: Int!
    DATE: String
    EE_ID: String
    PAY_TYPE: String
    PAY_AMT: Int
    WRTR_ID: String
    WRT_DATE: String
    ST: String
    CONST_ID: String
    EL_ID: String
  }

  type Query {
    getPayment(input: getPaymentInput!): Payment!
    readPayment(input: readPaymentInput!): PaymentConnection!
  }

  type Mutation {
    createPayment(input: createPaymentInput!): Payment!
    updatePayment(input: updatePaymentInput!): Payment!
    deletePayment(input: deletePaymentInput!): Payment!
  }
`;

export default typeDefs;