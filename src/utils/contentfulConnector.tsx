// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri:
    "https://graphql.contentful.com/content/v1/spaces/" + process.env.SPACE_ID,
  headers: {
    Authorization: `Bearer ` + process.env.DELIVERY_ACCESS_TOKEN,
  },
  cache: new InMemoryCache(),
});

export default client;
