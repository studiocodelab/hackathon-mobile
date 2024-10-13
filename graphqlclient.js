
    import { ApolloClient, HttpLink, InMemoryCache, split, useSubscription } from "@apollo/client";
    import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
    import { createClient } from "graphql-ws";
    import { SubscriptionClient } from 'subscriptions-transport-ws'
    import { WebSocketLink } from '@apollo/client/link/ws'
    import gql from 'graphql-tag';
    import { ApolloProvider } from "@apollo/client";
    import { cacheSizes } from "@apollo/client/utilities";
    import { getMainDefinition } from '@apollo/client/utilities';

    const httpLink = new HttpLink({
    uri: 'http://192.168.150.132:3001/',
    });

    const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://192.168.150.132:3001/',
    }));

    const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    },
    wsLink,
    httpLink
    )

    const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true
    })

    export default apolloClient;

    // const DATA = gql`subscription Subscription {
    // somethingHappened
    // }`

    // export default function GQL(props) {
    //
    // const { data, loading } = useSubscription(
    //  DATA
    // );
    //
    // return <h4>New comment: {String(loading)} {JSON.stringify(data)}</h4>;
    //}
    