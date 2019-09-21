import { ApolloServer } from 'apollo-server-lambda';
import { Handler } from 'aws-lambda';
import schema from './graphql/schema/schema';

// 참조 프로젝트 
// https://github.com/tomyitav/apollo-typed-lambda
// 참조영상
// https://www.youtube.com/watch?v=ZzHD04QTwI8&list=PL7jH19IHhOLOpU_yAYzCO4iQNvdou1AnK&index=4

const playground = {
    endpoint: '/graphql'
};

const server = new ApolloServer({ 
  schema,
  playground 
});

export const graphqlHandler: Handler = server.createHandler({
    cors: {
        origin: '*',
        credentials: true,
    }
});