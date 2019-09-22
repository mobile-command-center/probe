import HelloService from '../../services/helloService';

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
      hello: HelloService.getInstance().hello,
    },
};

export default resolvers;