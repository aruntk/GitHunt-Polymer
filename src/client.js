import { createNetworkInterface } from 'apollo-client';
import { PolymerApolloMixin } from 'polymer-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
// Polyfill fetch
import 'isomorphic-fetch';
import createApolloClient from './helpers/create-apollo-client';

const subscriptionsURL = process.env.NODE_ENV !== 'production'
  ? 'ws://localhost:3010/subscriptions'
  : 'ws://api.githunt.com/subscriptions';

const wsClient = new SubscriptionClient(subscriptionsURL, {
  reconnect: true,
});

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
  transportBatching: true,
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient,
);

export const apolloClient = createApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  initialState: window.__APOLLO_STATE__, // eslint-disable-line no-underscore-dangle
  ssrForceFetchDelay: 100,
});

// Enable Apollo dev tools
window.__APOLLO_CLIENT__ = apolloClient;

export const PolymerApolloClass = PolymerApolloMixin({ apolloClient }, Polymer.Element);
