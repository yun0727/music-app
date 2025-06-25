import { useQuery } from "@tanstack/react-query";

export default function useGetRecommendations(tags: string[]) {
  return useQuery({
    queryKey: ["recommendations", ...tags],
    queryFn: async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_HOST
        }/music/recommendations?tags=${tags.join(",")}`
      );
      const songs = await response.json();
      return songs;
    },
    enabled: tags.length > 0,
  });
}
