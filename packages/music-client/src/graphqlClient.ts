import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_API_HOST || "http://localhost:4000";

export const graphqlClient = new GraphQLClient(endpoint);
