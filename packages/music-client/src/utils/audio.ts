// Convert relative audio paths to use Vercel API proxy in production
export const getAudioUrl = (path: string): string => {
  if (!path) return "";

  // If it's already a full URL, return as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // In production, use Vercel API proxy
  if (import.meta.env.PROD) {
    return `${window.location.origin}/api/audio${path}`;
  }

  // In development, use local server
  return `http://localhost:4000${path}`;
};
