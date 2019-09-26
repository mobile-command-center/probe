import { PlaygroundConfig } from "apollo-server-lambda";
import { readQuery, insertQuery, updateQuery } from "./queries";

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
        }
    ]
};

export default playgroundConfig;