import {makeExecutableSchema} from 'graphql-tools'
import {mergeTypes, mergeResolvers} from 'merge-graphql-schemas'
import {GraphQLSchema} from 'graphql'

import ConsultResolver from '../resolvers/ConsultResolver';
import EnrollResolver from '../resolvers/EnrollResolver';
import PayResolver from '../resolvers/PayResolver';
import ApplyResolver from '../resolvers/ApplyResolver';
import MemoResolver from '../resolvers/MemoResolver';

import ConsultTypeDef from '../types/ConsultTypeDef';
import EnrollTypeDef from '../types/EnrollTypeDef';
import PayTypeDef from '../types/PayTypeDef';
import ApplyTypeDef from '../types/ApplyTypeDef';
import MemoTypeDef from '../types/MemoTypeDef';

const allTypes = mergeTypes([ConsultTypeDef, EnrollTypeDef, PayTypeDef, ApplyTypeDef, MemoTypeDef]);
const allResolvers = mergeResolvers([ConsultResolver, EnrollResolver, PayResolver, ApplyResolver, MemoResolver]);

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: allTypes,
  resolvers: allResolvers
})

export default schema;