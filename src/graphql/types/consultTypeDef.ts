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

  input getConsultationInput {
    CONST_ID: String!
  }

  input readConsultationInput {
    CONST_ID: String!
    DATE: String
  }

  input createConsultationInput {
    DATE: String!
    WRTR_ID: String!
    EE_ID: String
    C_TELL: String
    MEMO: String
    P_SUBSIDY_AMT: String
  }

  input updateConsultationInput {
    CONST_ID: String!
    DATE: String
    WRTR_ID: String
    EE_ID: String
    C_TELL: String
    MEMO: String
    P_SUBSIDY_AMT: String
  }

  input deleteConsultationInput {
    CONST_ID: String!
  }

  type Consultation {
    CONST_ID: String!
    DATE: String!
    WRTR_ID: String
    WRT_DATE: String
    EE_ID: String
    C_TELL: String
    MEMO: String
    P_SUBSIDY_AMT: String
  }

  type Query {
    getConsultation(input: getConsultationInput!): Consultation!
    readConsultation(limit: Int!, input: readConsultationInput): ConsultationConnection!
  }

  type Mutation {
    createConsultation(input: createConsultationInput!): Consultation!
    updateConsultation(input: updateConsultationInput!): Consultation!
    deleteConsultation(input: deleteConsultationInput!): Consultation!
  }
`;

export default typeDefs;