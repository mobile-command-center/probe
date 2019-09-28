import {makeExecutableSchema} from 'graphql-tools'
import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas'
import {GraphQLSchema} from 'graphql'

import ConsultResolver from '../resolvers/ConsultResolver';
import EnrollResolver from '../resolvers/enrollResolver';

import ConsultTypeDef from '../types/ConsultTypeDef';
import EnrollTypeDef from '../types/enrollTypeDef';

const allTypes = mergeTypes([ConsultTypeDef, EnrollTypeDef]);
const allResolvers = mergeResolvers([ConsultResolver, EnrollResolver]);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: allTypes,
  resolvers: allResolvers
})

export default schema;