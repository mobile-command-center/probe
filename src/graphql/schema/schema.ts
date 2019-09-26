import {makeExecutableSchema} from 'graphql-tools'
import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas'
import {GraphQLSchema} from 'graphql'

import ConsultResolver from '../resolvers/ConsultResolver';
import ConsultTypeDef from '../types/ConsultTypeDef';

const allTypes = mergeTypes([ConsultTypeDef]);
const allResolvers = mergeResolvers([ConsultResolver]);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: allTypes,
  resolvers: allResolvers
})

export default schema;