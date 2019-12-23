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

  type MemoConnection {
    edges: [Memo]
    pageInfo: PageInfo!
    totalCount: Int!
  }

  input getMemoInput {
    MEMO_ID: Int!
  }

  input readMemoInput {
    first: Int
    last: Int
    after: Int
    before: Int
  }

  input searchMemoInput {
    first: Int
    last: Int
    after: Int
    before: Int
    filter: searchMemoInputFilter!
  }

  input createMemoInput {
    WRTR_ID: String!
    CONST_ID: Int!
    DATE_REG: String
    DATE_MDF: String
    DATE_MEMO: String!
    CONTENT: String
    P_SUBSIDY_AMT: String
    ST: String
  }

  input updateMemoInput {
    MEMO_ID: Int!
    WRTR_ID: String!
    CONST_ID: Int
    DATE_REG: String
    DATE_MDF: String
    DATE_MEMO: String
    CONTENT: String
    P_SUBSIDY_AMT: String
    ST: String
  }

  input deleteMemoInput {
    MEMO_ID: Int!
  }

  input searchMemoInputFilter {
    WRTR_ID: MemoStringFilter
    CONST_ID: MemoIntFilter
    DATE_REG: MemoStringFilter
    DATE_MDF: MemoStringFilter
    DATE_MEMO: MemoStringFilter
    CONTENT: MemoStringFilter
    P_SUBSIDY_AMT: MemoStringFilter
    ST: MemoStringFilter
  }

  input MemoIntFilter {
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

  input MemoStringFilter {
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

  type Memo {
    MEMO_ID: Int!
    WRTR_ID: String
    CONST_ID: Int!
    DATE_REG: String
    DATE_MDF: String
    DATE_MEMO: String
    CONTENT: String
    P_SUBSIDY_AMT: String
    ST: String
  }

  type Query {
    getMemo(input: getMemoInput!): Memo!
    readMemo(input: readMemoInput!): MemoConnection!
    searchMemo(input: searchMemoInput): MemoConnection!
  }

  type Mutation {
    createMemo(input: createMemoInput!): Memo!
    updateMemo(input: updateMemoInput!): Memo!
    deleteMemo(input: deleteMemoInput!): Memo!
  }
`;

export default typeDefs;