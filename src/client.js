import { createNetworkInterface } from 'apollo-client';
import { PolymerApollo } from 'polymer-apollo';
import { Client } from 'subscriptions-transport-ws';
// Polyfill fetch
import 'isomorphic-fetch';

import createApolloClient from './helpers/create-apollo-client';
import addGraphQLSubscriptions from './helpers/subscriptions';

const wsClient = new Client('ws://localhost:8080');

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

export const PolymerApolloBehavior = new PolymerApollo({ apolloClient });
window.PolymerApolloBehavior = PolymerApolloBehavior;

