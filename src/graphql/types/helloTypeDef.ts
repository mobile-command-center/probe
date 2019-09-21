import { gql } from 'apollo-server-lambda';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

export default typeDefs;

