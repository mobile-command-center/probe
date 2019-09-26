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

  type ConsultationConnection {
    edges: [Consultation]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  input ConsultationInput {
    CONST_ID: String
    DATE: String
    WRTR_ID: String!
    EE_ID: String!
    C_TELL: String
    MEMO: String
    P_SUBSIDY_AMT: String
  }

  type Consultation {
    CONST_ID: String!
    DATE: String!
    WRTR_ID: String
    EE_ID: String
    C_TELL: String
    MEMO: String
    P_SUBSIDY_AMT: String
  }

  type Query {
    readConsultation(first: Int!, after: String): ConsultationConnection!
  }

  type Mutation {
    createConsultation(input: ConsultationInput!): Consultation!
    updateConsultation(input: ConsultationInput!): Consultation!
    deleteConsultation(input: ConsultationInput!): Consultation!
  }
`;

export default typeDefs;