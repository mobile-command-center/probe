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

  type ConsultationConnection {
    edges: [Consultation]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  input getConsultationInput {
    CONST_ID: Int!
  }

  input readConsultationInput {
    first: Int
    last: Int
    after: Int
    before: Int
  }

  input searchConsultationInput {
    first: Int
    last: Int
    after: Int
    before: Int
    filter: searchConsultationInputFilter!
  }

  input createConsultationInput {
    DATE: String!
    WRTR_ID: String!
    EE_ID: String
    C_TEL: String
    MEMO: String
    P_SUBSIDY_AMT: String
  }

  input updateConsultationInput {
    CONST_ID: Int!
    DATE: String
    WRTR_ID: String
    EE_ID: String
    C_TEL: String
    MEMO: String
    P_SUBSIDY_AMT: String
  }

  input deleteConsultationInput {
    CONST_ID: Int!
  }

  input searchConsultationInputFilter {
    DATE: ConsultationFilter
    WRTR_ID: ConsultationFilter
    WRT_DATE: ConsultationFilter
    EE_ID: ConsultationFilter
    C_TEL: ConsultationFilter
    MEMO: ConsultationFilter
    P_SUBSIDY_AMT : ConsultationFilter
  }

  input ConsultationFilter {
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

  type Consultation {
    CONST_ID: Int!
    DATE: String!
    WRTR_ID: String
    WRT_DATE: String
    EE_ID: String
    C_TEL: String
    MEMO: String
    P_SUBSIDY_AMT: String
  }

  type Query {
    getConsultation(input: getConsultationInput!): Consultation!
    readConsultation(input: readConsultationInput!): ConsultationConnection!
    searchConsultation(input: searchConsultationInput): ConsultationConnection!
  }

  type Mutation {
    createConsultation(input: createConsultationInput!): Consultation!
    updateConsultation(input: updateConsultationInput!): Consultation!
    deleteConsultation(input: deleteConsultationInput!): Consultation!
  }
`;

export default typeDefs;