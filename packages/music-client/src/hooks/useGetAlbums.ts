import { graphqlClient } from "../graphqlClient";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

const GET_ALBUMS = gql`
  query GetAlbums {
    albums {
      id
      title
      artist {
        id
        name
      }
    }
  }
`;

export default function useGetAlbums() {
  return useQuery({
    queryKey: ["albums"],
    queryFn: async () => {
      const data = await graphqlClient.request<{
        albums: Album[];
      }>(GET_ALBUMS);
      return data.albums;
    },
    throwOnError: true,
  });
}
