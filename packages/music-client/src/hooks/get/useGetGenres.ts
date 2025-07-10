import { graphqlClient } from "@/graphqlClient";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const GET_GENRES = gql`
  query GetGenres {
    genres {
      id
      name
    }
  }
`;

export default function useGetGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const data = await graphqlClient.request<{
        genres: Genre[];
      }>(GET_GENRES);
      return data.genres;
    },
    throwOnError: true,
  });
}
