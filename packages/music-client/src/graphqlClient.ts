import { GraphQLClient } from "graphql-request";

// Use Vercel API Routes proxy to avoid Mixed Content issues
const getApiUrl = () => {
  // In production, use Vercel API Routes proxy
  if (import.meta.env.PROD) {
    // Get the current origin (protocol + hostname + port)
    const origin = window.location.origin;
    return `${origin}/api/proxy`;
  }
  
  // In development, use local proxy or direct connection
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  return apiUrl;
};

const endpoint = getApiUrl();

export const graphqlClient = new GraphQLClient(endpoint);
