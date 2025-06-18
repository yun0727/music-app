import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_API_HOST;

export const GraphQLClient = new GraphQLClientient(endpoint);
