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
    PYMT_ID: String!
  }

  input readPaymentInput {
    PYMT_ID: String!
    DATE: String
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
    PYMT_ID: String!
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
    PYMT_ID: String!
  }

  type Payment {
    PYMT_ID: String!
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
    readPayment(first: Int!, input: readPaymentInput): PaymentConnection!
  }

  type Mutation {
    createPayment(input: createPaymentInput!): Payment!
    updatePayment(input: updatePaymentInput!): Payment!
    deletePayment(input: deletePaymentInput!): Payment!
  }
`;

export default typeDefs;