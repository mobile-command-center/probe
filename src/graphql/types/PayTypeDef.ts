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

  input searchPaymentInput {
    first: Int
    last: Int
    after: Int
    before: Int
    filter: searchPaymentInputFilter!
  }

  input createPaymentInput {
    DATE: String!
    EE_ID: String
    PAY_TYPE: String
    PAY_AMT: String
    WRTR_ID: String!
    ST: String!
    EL_ID: Int
  }

  input updatePaymentInput {
    PYMT_ID: Int!
    DATE: String
    EE_ID: String
    PAY_TYPE: String
    PAY_AMT: String
    WRTR_ID: String
    WRT_DATE: String
    ST: String
    EL_ID: Int
  }

  input deletePaymentInput {
    PYMT_ID: Int!
  }

  input searchPaymentInputFilter {
    DATE: PaymentStringFilter
    EE_ID: PaymentStringFilter
    PAY_TYPE: PaymentStringFilter
    PAY_AMT: PaymentStringFilter
    WRTR_ID: PaymentStringFilter
    WRT_DATE: PaymentStringFilter
    ST: PaymentStringFilter
    EL_ID: PaymentNumberFilter
  }

  input PaymentStringFilter {
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

  input PaymentNumberFilter {
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

  type Payment {
    PYMT_ID: Int!
    DATE: String
    EE_ID: String
    PAY_TYPE: String
    PAY_AMT: String
    WRTR_ID: String
    WRT_DATE: String
    ST: String
    EL_ID: Int
  }

  type Query {
    getPayment(input: getPaymentInput!): Payment!
    readPayment(input: readPaymentInput!): PaymentConnection!
    searchPayment(input: searchPaymentInput!): PaymentConnection!
  }

  type Mutation {
    createPayment(input: createPaymentInput!): Payment!
    updatePayment(input: updatePaymentInput!): Payment!
    deletePayment(input: deletePaymentInput!): Payment!
  }
`;

export default typeDefs;