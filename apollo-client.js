// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://sought-earwig-36.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
    headers: {
        'x-hasura-admin-secret': "SObMn0WiBhlzSvLbpgBgRSsJZRSCMwV2H8Nlj7nYpWWIPecKMTFc1Dpi4mflp97w"
    }
});

export default client;