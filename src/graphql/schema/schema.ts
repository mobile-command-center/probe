import {makeExecutableSchema} from 'graphql-tools'
import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas'
import {GraphQLSchema} from 'graphql'

import HelloResolver from '../resolvers/helloResolver';
import HelloTypeDef from '../types/helloTypeDef';

const allTypes = mergeTypes([HelloTypeDef]);
const allResolvers = mergeResolvers([HelloResolver]);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: allTypes,
  resolvers: allResolvers
})

export default schema;