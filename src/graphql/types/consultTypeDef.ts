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
    DATE_REG: String
    DATE_MDF: String
    DATE_INSTALL: String
    WRTR_ID: String!
    C_TEL: String
    MEMO: String
    ST: String
    P_SUBSIDY_AMT: String
    AVAL_INQUIRY_PASS: Boolean
    PPSTY: String
  }

  input updateConsultationInput {
    CONST_ID: Int!
    DATE_REG: String
    DATE_MDF: String
    DATE_INSTALL: String
    WRTR_ID: String
    C_TEL: String
    MEMO: String
    ST: String
    P_SUBSIDY_AMT: String
    AVAL_INQUIRY_PASS: Boolean
    PPSTY: String
  }

  input deleteConsultationInput {
    CONST_ID: Int!
  }

  input searchConsultationInputFilter {
    DATE: ConsultationStringFilter
    WRTR_ID: ConsultationStringFilter
    DATE_REG: ConsultationStringFilter
    DATE_MDF: ConsultationStringFilter
    DATE_INSTALL: ConsultationStringFilter
    C_TEL: ConsultationStringFilter
    MEMO: ConsultationStringFilter
    ST: ConsultationStringFilter
    P_SUBSIDY_AMT : ConsultationStringFilter
    AVAL_INQUIRY_PASS: ConsultationBooleanFilter
    PPSTY: ConsultationStringFilter
  }

  input ConsultationBooleanFilter {
    ne: Boolean
    eq: Boolean
  }

  input ConsultationStringFilter {
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
    DATE_REG: String
    DATE_MDF: String
    DATE_INSTALL: String
    WRTR_ID: String
    C_TEL: String
    MEMO: String
    ST: String
    P_SUBSIDY_AMT: String
    AVAL_INQUIRY_PASS: Boolean
    PPSTY: String
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