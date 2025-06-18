import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_API_HOST;

export const graphqlClient = new GraphQLClient(endpoint);
