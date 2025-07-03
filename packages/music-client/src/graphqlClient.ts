import { GraphQLClient } from "graphql-request";

// Use Vercel API Routes proxy to avoid Mixed Content issues
const getApiUrl = () => {
  // In production, use Vercel API Routes proxy
  if (import.meta.env.PROD) {
    // Get the current origin (protocol + hostname + port)
    const origin = window.location.origin;
    return `${origin}/api/proxy`;
  }

  // In development, also use AWS server for consistency
  return "http://13.209.99.4:4000";
};

const endpoint = getApiUrl();

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    "x-apollo-operation-name": "query",
    "apollo-require-preflight": "true",
  },
});
