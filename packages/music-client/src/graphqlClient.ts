import { GraphQLClient } from "graphql-request";

// Use Vercel API Routes proxy to avoid Mixed Content issues
const getApiUrl = () => {
  // In production, use Vercel API Routes proxy
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // Get the current origin (protocol + hostname + port)
    const origin = window.location.origin;
    return `${origin}/api/proxy`;
  }

  // In development, use Vite proxy with current origin
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api`;
  }

  // Fallback for SSR
  return "http://localhost:5173/api";
};

const endpoint = getApiUrl();

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
    "x-apollo-operation-name": "query",
    "apollo-require-preflight": "true",
  },
});
