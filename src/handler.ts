import { ApolloServer, gql } from 'apollo-server-lambda';
import { Handler } from 'aws-lambda';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const playground = {
    endpoint: '/graphql'
};

const server = new ApolloServer({ typeDefs, resolvers, playground });

export const graphqlHandler: Handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    }
});