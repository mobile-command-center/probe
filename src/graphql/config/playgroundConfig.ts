import { PlaygroundConfig } from "apollo-server-lambda";
import { readQuery, insertQuery, updateQuery, deleteQuery } from "./queries";

const playgroundConfig: PlaygroundConfig = {
    endpoint: '/playground',
    tabs: [
        {
            name: 'read',
            endpoint: `graphql`,
            query: readQuery
        },
        {
            name: 'insert',
            endpoint: `graphql`,
            query: insertQuery
        },
        {
            name: 'update',
            endpoint: `graphql`,
            query: updateQuery
        },
        {
            name: 'delete',
            endpoint: `graphql`,
            query: deleteQuery
        }
    ]
};

export default playgroundConfig;