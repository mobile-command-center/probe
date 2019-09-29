import {makeExecutableSchema} from 'graphql-tools'
import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas'
import {GraphQLSchema} from 'graphql'

import ConsultResolver from '../resolvers/ConsultResolver';
import EnrollResolver from '../resolvers/EnrollResolver';
import PayResolver from '../resolvers/PayResolver';
import ApplyResolver from '../resolvers/ApplyResolver';

import ConsultTypeDef from '../types/ConsultTypeDef';
import EnrollTypeDef from '../types/EnrollTypeDef';
import PayTypeDef from '../types/PayTypeDef';
import ApplyTypeDef from '../types/ApplyTypeDef';

const allTypes = mergeTypes([ConsultTypeDef, EnrollTypeDef, PayTypeDef, ApplyTypeDef]);
const allResolvers = mergeResolvers([ConsultResolver, EnrollResolver, PayResolver, ApplyResolver]);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: allTypes,
  resolvers: allResolvers
})

export default schema;